/**
 * 百度翻译批量翻译脚本
 * 将 src/pages/en/ 下的 .astro 页面自动翻译为 src/pages/zh/ 中文版本
 *
 * 使用方式: node scripts/translate.js
 * 环境变量: BAIDU_APPID, BAIDU_KEY (或在脚本中直接设置)
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

// ====== 配置 ======
const BAIDU_APPID = '20260624002637569';
const BAIDU_KEY = 'wjVRVZoCcxeez3GVPynf';
const SRC_DIR = path.resolve(__dirname, '..', 'src', 'pages', 'en');
const DST_DIR = path.resolve(__dirname, '..', 'src', 'pages', 'zh');
const BATCH_SIZE = 10; // 每批翻译的字符串数
const MAX_RETRIES = 3;

// ====== 缓存已翻译内容（避免重复翻译）=====
const translationCache = new Map();

// ====== 辅助函数 ======

/** 生成 MD5 签名 */
function md5(str) {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
}

/** 调用百度翻译 API */
function baiduTranslate(texts, from = 'en', to = 'zh') {
  return new Promise((resolve, reject) => {
    if (!texts || texts.length === 0) {
      resolve([]);
      return;
    }

    // 批量拼接（Baidu API 用 \n 分隔多个文本）
    const rawQ = texts.join('\n');
    const salt = Date.now();
    // 签名 = MD5(appid + q + salt + key)，q 使用原始字符串
    const sign = md5(BAIDU_APPID + rawQ + salt + BAIDU_KEY);

    // 构建 POST body (URL encoded)
    const postData = `q=${encodeURIComponent(rawQ)}&from=${from}&to=${to}&appid=${BAIDU_APPID}&salt=${salt}&sign=${sign}`;

    const options = {
      hostname: 'fanyi-api.baidu.com',
      path: '/api/trans/vip/translate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error_code) {
            reject(new Error(`Baidu API error ${json.error_code}: ${json.error_msg}`));
            return;
          }
          // 返回翻译结果列表
          const translations = (json.trans_result || []).map((r) => r.dst);
          resolve(translations);
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}, raw: ${data.substring(0, 200)}`));
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

/** 带重试的翻译 */
async function translateWithRetry(texts) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await baiduTranslate(texts);
    } catch (err) {
      if (attempt < MAX_RETRIES) {
        console.log(`  Retry ${attempt}/${MAX_RETRIES}: ${err.message}`);
        await new Promise((r) => setTimeout(r, 2000 * attempt));
      } else {
        throw err;
      }
    }
  }
}

// ====== 文本提取与替换 ======

/**
 * 从 Astro 文件内容中提取所有可翻译的英文字符串
 * 返回 [{ key, original, context }]
 * key = 占位符, original = 原文, context = 位置描述
 * 注意: <script> 和 <style> 块会被自动排除
 */
function extractStrings(content) {
  const strings = [];
  let index = 0;
  const seen = new Set();

  // 预处理：移除 <script> 和 <style> 块，避免 JS/CSS 代码被翻译
  let cleanContent = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '<--SCRIPT_BLOCK_REMOVED-->');
  cleanContent = cleanContent.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '<--STYLE_BLOCK_REMOVED-->');

  // 收集需要翻译的文本
  function addString(str, context = '') {
    const trimmed = str.trim();
    // 跳过空字符串、纯数字、纯URL、纯标点
    if (!trimmed || /^\d+$/.test(trimmed) || /^[.,!?;:\-–—/\\()\[\]{}""''（）【】《》。，！？；：、…—·]+$/.test(trimmed)) return;
    // 跳过已经是中文的
    if (/[\u4e00-\u9fff]/.test(trimmed) && !/[a-zA-Z]/.test(trimmed)) return;
    // 跳过明显不是自然语言的
    if (trimmed.startsWith('http') || trimmed.startsWith('/')) return;
    if (trimmed.length < 3 && !/[A-Z]/.test(trimmed)) return;
    // 跳过品牌名/技术术语（短的大写词）
    if (/^[A-Z][a-z]*$/.test(trimmed) && trimmed.length < 15) return;
    // 去重
    const key = trimmed.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);

    const placeholder = `__TR_${index}__`;
    strings.push({ key: placeholder, original: trimmed, context });
    index++;
    return placeholder;
  }

  // 1. 提取 frontmatter 中的 title/description
  const fmTitleMatch = cleanContent.match(/const\s+title\s*=\s*'([^']+)'/);
  if (fmTitleMatch) addString(fmTitleMatch[1], 'frontmatter title');

  const fmDescMatch = cleanContent.match(/const\s+description\s*=\s*'([^']+)'/);
  if (fmDescMatch) addString(fmDescMatch[1], 'frontmatter description');

  // 2. 提取 HTML 文本节点 (在 > 和 < 之间的文本)
  // 使用更精确的匹配：>text< 或 >text\n< 模式
  const textPattern = />([^<]+)</g;
  let match;
  while ((match = textPattern.exec(cleanContent)) !== null) {
    const text = match[1].trim();
    // 过滤掉 HTML 属性、JS 表达式、标签等
    if (text && !text.startsWith('{') && !text.startsWith('</') && !text.startsWith('<!--') && !text.startsWith('&') && !text.startsWith('--')) {
      addString(text, 'html text');
    }
  }

  // 3. 提取 JS 模板字符串中的文本 (如 `'Some text'`, `"Some text"`)
  // 在 Astro 的 {[...].map(...)} 和对象字面量中
  const jsStringPattern = /['"]([^'"]{4,})['"]/g;
  while ((match = jsStringPattern.exec(cleanContent)) !== null) {
    const text = match[1];
    // 排除 URL、文件路径、CSS 类名、JS 标识符等
    if (/^[a-z][a-z0-9]*$/i.test(text) && text.length < 30) continue; // 可能是变量名
    if (text.includes('/') || text.includes('.')) continue; // 可能是路径
    if (text.startsWith('#')) continue; // 可能是hash
    if (/^[a-z-]+$/i.test(text) && text.length < 20) continue; // 可能是CSS类
    if (text.startsWith(':') || text.startsWith('hover:') || text.startsWith('focus:')) continue;
    if (text.startsWith('bg-') || text.startsWith('text-') || text.startsWith('border-')) continue;
    if (text.startsWith('dark:')) continue;
    if (text.startsWith('md:') || text.startsWith('lg:') || text.startsWith('sm:')) continue;
    if (text.startsWith('group-')) continue;
    addString(text, 'js string');
  }

  return strings;
}

/**
 * 将翻译结果应用到文件内容中
 * translationsMap: { original -> translated }
 */
function applyTranslations(content, translationsMap, strings) {
  let result = content;

  // 1. 替换 HTML 文本节点
  for (const s of strings) {
    if (s.context === 'html text' && translationsMap.has(s.original)) {
      const translated = translationsMap.get(s.original);
      // 精确替换 >original< 模式
      result = result.replace(`>${s.original}<`, `>${translated}<`);
    }
  }

  // 2. 替换 JS 字符串
  for (const s of strings) {
    if (s.context === 'js string' && translationsMap.has(s.original)) {
      const translated = translationsMap.get(s.original);
      // 替换 'original' 模式 (也包括 ${template} 里的)
      result = result.replace(`'${s.original}'`, `'${translated}'`);
    }
  }

  // 3. 替换 frontmatter
  for (const s of strings) {
    if (s.context === 'frontmatter title' && translationsMap.has(s.original)) {
      result = result.replace(`const title = '${s.original}'`, `const title = '${translationsMap.get(s.original)}'`);
    }
    if (s.context === 'frontmatter description' && translationsMap.has(s.original)) {
      result = result.replace(`const description = '${s.original}'`, `const description = '${translationsMap.get(s.original)}'`);
    }
  }

  // 4. 替换所有 JS 字符串中的 /en/ 路径为 /zh/
  result = result.replace(/'\/en\//g, "'/zh/");
  result = result.replace(/"\/en\//g, '"/zh/');

  return result;
}

// ====== 文件遍历 ======

/** 获取所有需要翻译的 .astro 文件 */
function getAstroFiles(dir, baseDir = dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);
    if (entry.isDirectory()) {
      files.push(...getAstroFiles(fullPath, baseDir));
    } else if (entry.name.endsWith('.astro') && !entry.name.includes('_updated')) {
      // 跳过 _updated 文件（备份文件）
      files.push({
        enPath: fullPath,
        zhPath: path.join(DST_DIR, relativePath),
        relativePath,
      });
    }
  }
  return files;
}

// ====== 主流程 ======

async function main() {
  console.log('=== China Starter Guide - 百度翻译批量翻译 ===\n');

  // 检查 API 连接
  try {
    const test = await baiduTranslate(['Hello']);
    console.log(`  API 连接成功: "Hello" → "${test[0]}"\n`);
  } catch (err) {
    console.error(`  API 连接失败: ${err.message}`);
    console.error('  请检查 BAIDU_APPID 和 BAIDU_KEY 是否正确\n');
    process.exit(1);
  }

  // 获取所有文件
  const files = getAstroFiles(SRC_DIR);
  console.log(`  找到 ${files.length} 个 .astro 文件需要翻译\n`);

  // 收集所有需要翻译的字符串
  const allStrings = [];
  const fileStringsMap = new Map(); // relativePath -> [strings]

  for (const file of files) {
    const content = fs.readFileSync(file.enPath, 'utf-8');
    const strings = extractStrings(content);
    fileStringsMap.set(file.relativePath, strings);
    allStrings.push(...strings);
  }

  console.log(`  共提取 ${allStrings.length} 个需要翻译的文本片段\n`);

  // 去重并批量翻译
  const uniqueStrings = [...new Map(allStrings.map((s) => [s.original, s.original])).keys()];
  console.log(`  去重后 ${uniqueStrings.length} 个唯一文本片段\n`);

  // 分批翻译
  const translationsMap = new Map();
  for (let i = 0; i < uniqueStrings.length; i += BATCH_SIZE) {
    const batch = uniqueStrings.slice(i, i + BATCH_SIZE);
    console.log(`  翻译批次 ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(uniqueStrings.length / BATCH_SIZE)} (${batch.length} 条)...`);
    
    const results = await translateWithRetry(batch);
    for (let j = 0; j < batch.length; j++) {
      translationsMap.set(batch[j], results[j] || batch[j]);
    }
    console.log(`    → 完成: "${batch[0].substring(0, 30)}..." → "${(results[0] || '').substring(0, 30)}..."`);
    
    // 避免触发 API 限流
    if (i + BATCH_SIZE < uniqueStrings.length) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log(`\n  翻译完成，共处理 ${translationsMap.size} 个文本片段\n`);

  // 生成中文文件
  for (const file of files) {
    const content = fs.readFileSync(file.enPath, 'utf-8');
    const strings = fileStringsMap.get(file.relativePath) || [];

    // 应用翻译
    let zhContent = applyTranslations(content, translationsMap, strings);

    // 替换语言标记
    zhContent = zhContent.replace(/\blang="en"/g, 'lang="zh"');

    // 替换 URL 路径 (仅替换 href 和 src 中的 /en/ 路径)
    zhContent = zhContent.replace(/(href=")\/en\//g, '$1/zh/');

    // 创建目标目录
    const dir = path.dirname(file.zhPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(file.zhPath, zhContent, 'utf-8');
    console.log(`  ✅ ${file.relativePath} → ${path.relative(DST_DIR, file.zhPath)}`);
  }

  console.log(`\n=== 全部完成! 共生成 ${files.length} 个中文页面 ===`);
}

main().catch((err) => {
  console.error('\n❌ 脚本执行失败:', err.message);
  process.exit(1);
});
