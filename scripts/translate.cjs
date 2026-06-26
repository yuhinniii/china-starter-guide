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
// 文件缓存 — 如果脚本中断，下次可以恢复进度
const CACHE_FILE = path.resolve(__dirname, '..', '.translate-cache.json');
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      for (const [k, v] of Object.entries(data)) {
        translationCache.set(k, v);
      }
      console.log(`  加载缓存: ${translationCache.size} 个已翻译文本\n`);
    }
  } catch (e) { /* ignore */ }
}
function saveCache() {
  try {
    const obj = Object.fromEntries(translationCache);
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2), 'utf-8');
  } catch (e) { /* ignore */ }
}

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

/** 带重试的翻译 — 遇到敏感词错误时逐个翻译并跳过有问题文本 */
async function translateWithRetry(texts) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await baiduTranslate(texts);
    } catch (err) {
      if (err.message.includes('20003')) {
        // 敏感词错误 — 逐个翻译，跳过有问题的
        console.log(`  ⚠️ 敏感词错误，逐个尝试翻译 ${texts.length} 条...`);
        const results = [];
        for (const t of texts) {
          try {
            const r = await baiduTranslate([t]);
            results.push(r[0]);
          } catch (e2) {
            if (e2.message.includes('20003')) {
              console.log(`  ⚠️ 跳过敏感文本: "${t.substring(0, 50)}..."`);
              results.push(t); // 保留原文
            } else {
              throw e2;
            }
          }
          await new Promise((r) => setTimeout(r, 200));
        }
        return results;
      }
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

  // 保存原始内容用于 HTML 文本节点提取和替换
  const originalContent = cleanContent;

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
    // 跳过品牌名/技术术语（已知的专有名词）
    const brands = new Set(['Alipay','WeChat','DiDi','WhatsApp','Google','YouTube','Instagram','Facebook','Twitter','Visa','Mastercard','eSIM','VPN','iOS','Android','iPhone','iPad','Airbnb','Uber','COVA']);
    if (brands.has(trimmed)) return;
    // 去重
    const key = trimmed.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);

    const placeholder = `__TR_${index}__`;
    strings.push({ key: placeholder, original: trimmed, context });
    index++;
    return placeholder;
  }

  // 1. 提取 frontmatter 中的 title/description（使用原始内容）
  const fmTitleMatch = originalContent.match(/const\s+title\s*=\s*'([^']+)'/);
  if (fmTitleMatch) addString(fmTitleMatch[1], 'frontmatter title');

  const fmDescMatch = originalContent.match(/const\s+description\s*=\s*'([^']+)'/);
  if (fmDescMatch) addString(fmDescMatch[1], 'frontmatter description');

  // 2. 提取 HTML 文本节点（使用原始内容，因为需要准确的 >text< 模式）
  const textPattern = />([^<]+)</g;
  let match;
  while ((match = textPattern.exec(originalContent)) !== null) {
    const text = match[1].trim();
    // 过滤掉 HTML 属性、JS 表达式、标签等
    if (text && !text.startsWith('{') && !text.startsWith('</') && !text.startsWith('<!--') && !text.startsWith('&') && !text.startsWith('--')) {
      addString(text, 'html text');
    }
  }

  // 3. JS 字符串提取已禁用 — Astro 模板语法导致代码被破坏
  // 核心页面（index.astro, search.astro）的 JS 模板内容在生成后手动修正即可

  return strings;
}

/**
 * 将翻译结果应用到文件内容中
 * translationsMap: { original -> translated }
 */
function applyTranslations(content, translationsMap, strings) {
  let result = content;

  // 1. 替换 HTML 文本节点（处理前后可能有空白）
  for (const s of strings) {
    if (s.context === 'html text' && translationsMap.has(s.original)) {
      const translated = translationsMap.get(s.original);
      // 使用正则替换，处理原文前后可能有换行/空格的情况
      const escaped = s.original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(new RegExp(`>\\s*${escaped}\\s*<`), `>${translated}<`);
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
      const fullPath = path.join(dir, entry.name);
      // 手动维护的文件不自动翻译
      const relativePath = path.relative(baseDir, fullPath);
      if (relativePath === 'index.astro' || relativePath === 'search.astro') continue;
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

  // 加载缓存
  loadCache();

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

  // 筛选出未缓存的需要翻译的文本
  const toTranslate = uniqueStrings.filter(s => !translationCache.has(s));
  console.log(`  其中 ${toTranslate.length} 个需要新翻译 (${uniqueStrings.length - toTranslate.length} 个已缓存)\n`);

  // 分批翻译
  const translationsMap = new Map();
  // 先把缓存中的加入 translationsMap
  for (const [k, v] of translationCache) {
    translationsMap.set(k, v);
  }

  for (let i = 0; i < toTranslate.length; i += BATCH_SIZE) {
    const batch = toTranslate.slice(i, i + BATCH_SIZE);
    console.log(`  翻译批次 ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(toTranslate.length / BATCH_SIZE)} (${batch.length} 条)...`);
    
    const results = await translateWithRetry(batch);
    for (let j = 0; j < batch.length; j++) {
      const translated = results[j] || batch[j];
      translationsMap.set(batch[j], translated);
      translationCache.set(batch[j], translated);
    }
    console.log(`    → 完成: "${batch[0].substring(0, 30)}..." → "${(results[0] || '').substring(0, 30)}..."`);
    
    // 每批保存缓存
    saveCache();
    
    // 避免触发 API 限流
    if (i + BATCH_SIZE < toTranslate.length) {
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
