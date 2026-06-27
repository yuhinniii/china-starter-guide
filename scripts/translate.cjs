/**
 * 百度翻译批量翻译脚本 v5 (MULTILINGUAL + 9 locales)
 * 支持任意目标语言，一次配置多语言可用
 *
 * 使用方式:
 *   node scripts/translate.cjs                # 默认 en→zh
 *   node scripts/translate.cjs ja             # en→日文
 *   node scripts/translate.cjs ko             # en→韩文
 *   node scripts/translate.cjs fr             # en→法文
 *   node scripts/translate.cjs zh ja ko fr th ru es ar  # 批量生成多个语言
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const BAIDU_APPID = '20260624002637569';
const BAIDU_KEY = 'wjVRVZoCcxeez3GVPynf';
const SRC_DIR = path.resolve(__dirname, '..', 'src', 'pages', 'en');
const SRC_LANG = 'en';         // Source language code (Baidu)
const DEFAULT_TARGET = 'zh';   // Default target language (site code)
const BATCH_SIZE = 10;
const MAX_RETRIES = 3;

// Site language code -> Baidu API language code
// https://fanyi-api.baidu.com/doc/21
const BAIDU_LANG_MAP = {
  en: 'en',    // English
  zh: 'zh',    // 中文
  ja: 'jp',    // 日本語 (Baidu uses jp)
  ko: 'kor',   // 한국어 (Baidu uses kor)
  fr: 'fra',   // Français (Baidu uses fra)
  th: 'th',    // ไทย
  ru: 'ru',    // Русский
  es: 'spa',   // Español (Baidu uses spa)
  ar: 'ara',   // العربية (Baidu uses ara)
};

const SUPPORTED_LANGS = Object.keys(BAIDU_LANG_MAP);
const RTL_LANGS = new Set(['ar']);

function getBaiduLang(siteLang) {
  return BAIDU_LANG_MAP[siteLang] || siteLang;
}

// Cache per language
const CACHE_DIR = path.resolve(__dirname, '..');
function getCacheFile(lang) { return path.join(CACHE_DIR, `.translate-cache-${lang}.json`); }

// ====== Baidu API ======
function md5(str) { return crypto.createHash('md5').update(str, 'utf8').digest('hex'); }

function baiduTranslate(texts, from, to) {
  return new Promise((resolve, reject) => {
    if (!texts || texts.length === 0) { resolve([]); return; }
    const rawQ = texts.join('\n');
    const salt = Date.now();
    const sign = md5(BAIDU_APPID + rawQ + salt + BAIDU_KEY);
    const postData = `q=${encodeURIComponent(rawQ)}&from=${from}&to=${to}&appid=${BAIDU_APPID}&salt=${salt}&sign=${sign}`;
    const req = https.request({
      hostname: 'fanyi-api.baidu.com', path: '/api/trans/vip/translate', method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error_code) { reject(new Error(`Baidu error ${json.error_code}: ${json.error_msg}`)); return; }
          resolve((json.trans_result || []).map(r => r.dst));
        } catch (e) { reject(new Error(`Parse error: ${e.message}`)); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function translateWithRetry(texts, from, to) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try { return await baiduTranslate(texts, from, to); } catch (err) {
      if (err.message.includes('20003')) {
        console.log(`  Sensitive word, single-translate (${texts.length} items)...`);
        const results = [];
        for (const t of texts) {
          try { results.push((await baiduTranslate([t], from, to))[0]); } catch (e2) { results.push(t); }
          await new Promise(r => setTimeout(r, 200));
        }
        return results;
      }
      if (attempt < MAX_RETRIES) { await new Promise(r => setTimeout(r, 2000 * attempt)); }
      else throw err;
    }
  }
}

// ====== Extraction ======
const EXCLUDED_BRANDS_RAW = [
  'Alipay','WeChat','WeChat Pay','AliPay','DiDi','WhatsApp','Google','YouTube','Instagram','Facebook','Twitter','X',
  'Visa','Mastercard','eSIM','VPN','iOS','Android','iPhone','iPad','Airbnb','Uber','COVA',
  'Amap','Trip.com','Yelp','ExpressVPN','NordVPN','WireGuard','OpenVPN','Hellobike',
  'Meituan','Dianping','Weibo','Bilibili','TikTok','UnionPay','PayPal'
];
const EXCLUDED_BRANDS = new Set(EXCLUDED_BRANDS_RAW.map(s => s.toLowerCase()));

function isExcludedBrand(t) {
  const lower = t.toLowerCase();
  // Exact match case-insensitive
  if (EXCLUDED_BRANDS.has(lower)) return true;
  // Whole-word / whole-phrase match for multi-word brands
  for (const b of EXCLUDED_BRANDS_RAW) {
    const re = new RegExp('\\b' + b.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+') + '\\b', 'i');
    if (re.test(t)) return true;
  }
  return false;
}

function looksLikeEnglishText(t) {
  // Treat as translatable if it contains at least one Latin letter
  return /[a-zA-Z]/.test(t);
}

function extractAndPlaceholderize(content) {
  const placeholders = [];
  const seen = new Set();
  let idx = 0;

  function addString(str, ctx) {
    const t = str.trim();
    if (!t) return null;
    if (/^\d+$/.test(t)) return null;
    if (/^[\s.,!?;:\-–—/\\(){}\[\]'"]+$/.test(t)) return null;
    // Skip URLs, paths, code
    if (t.startsWith('http') || t.startsWith('/')) return null;
    if (t.startsWith('const ') || t.startsWith('import ')) return null;
    // Skip already-translated non-English text (heuristic: no Latin letters)
    if (!looksLikeEnglishText(t)) return null;
    if (isExcludedBrand(t)) return null;
    if (t.length < 3) return null;
    const key = t.toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) return null;
    seen.add(key);
    const ph = `___TRPH_${idx++}_`;
    placeholders.push({ placeholder: ph, original: t, context: ctx });
    return ph;
  }

  const scripts = [];
  let result = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, m => {
    scripts.push(m); return `<___SCRIPT_${scripts.length - 1}___/>`;
  });
  result = result.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, m => {
    scripts.push(m); return `<___SCRIPT_${scripts.length - 1}___/>`;
  });

  const fmTitle = result.match(/const\s+title\s*=\s*['"]([^'"]+)['"]/);
  if (fmTitle) {
    const ph = addString(fmTitle[1], 'fm-title');
    if (ph) result = result.replace(new RegExp(`(const\\s+title\\s*=\\s*['"])${fmTitle[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`), '$1' + ph + '$2');
  }

  const fmDesc = result.match(/const\s+description\s*=\s*['"]([^'"]+)['"]/);
  if (fmDesc) {
    const ph = addString(fmDesc[1], 'fm-desc');
    if (ph) result = result.replace(new RegExp(`(const\\s+description\\s*=\\s*['"])${fmDesc[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(['"])`), '$1' + ph + '$2');
  }

  const textPattern = />([^<]+)</g;
  let match;
  const htmlReplacements = [];
  while ((match = textPattern.exec(result)) !== null) {
    const text = match[1].trim();
    if (text && !text.startsWith('{') && !text.startsWith('</') && !text.startsWith('<!--') && !text.startsWith('___')) {
      const ph = addString(text, 'html-text');
      if (ph) htmlReplacements.push({ text, ph });
    }
  }

  htmlReplacements.sort((a, b) => b.text.length - a.text.length);
  for (const { text, ph } of htmlReplacements) {
    result = result.split('>' + text + '<').join('>' + ph + '<');
  }

  for (let i = 0; i < scripts.length; i++) {
    result = result.replace(`<___SCRIPT_${i}___/>`, scripts[i]);
  }

  return { modifiedContent: result, placeholders };
}

// ====== Main ======
async function translateTo(targetLang) {
  const baiduLang = getBaiduLang(targetLang);
  const DST_DIR = path.resolve(__dirname, '..', 'src', 'pages', targetLang);
  const cacheFile = getCacheFile(targetLang);

  console.log(`\n=== Translating en → ${targetLang} (Baidu: ${baiduLang}) ===\n`);

  // Load language-specific cache
  const cache = new Map();
  try {
    if (fs.existsSync(cacheFile)) {
      const data = JSON.parse(fs.readFileSync(cacheFile, 'utf-8'));
      for (const [k, v] of Object.entries(data)) cache.set(k, v);
      console.log(`  Cache: ${cache.size} strings\n`);
    }
  } catch (e) {}

  function saveCache() {
    try { fs.writeFileSync(cacheFile, JSON.stringify(Object.fromEntries(cache), null, 2), 'utf-8'); } catch (e) {}
  }

  // Test API
  try {
    const test = await baiduTranslate(['Hello'], SRC_LANG, baiduLang);
    console.log(`  API OK: "Hello" -> "${test[0]}"\n`);
  } catch (err) {
    console.error(`  API FAIL (${targetLang}): ${err.message}`);
    if (targetLang === DEFAULT_TARGET) {
      console.error('  Recharge at: https://fanyi-api.baidu.com/');
      process.exit(1);
    }
    return; // Skip this language but continue with others
  }

  // Get files
  function getAstroFiles(dir, baseDir = dir) {
    const files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.relative(baseDir, full);
      if (entry.isDirectory()) files.push(...getAstroFiles(full, baseDir));
      else if (entry.name.endsWith('.astro')) files.push({ enPath: full, targetPath: path.join(DST_DIR, rel), relativePath: rel });
    }
    return files;
  }

  const files = getAstroFiles(SRC_DIR);
  console.log(`  Files: ${files.length}\n`);

  // Extract + placeholderize
  const fileData = [];
  const allPlaceholders = [];
  for (const file of files) {
    const content = fs.readFileSync(file.enPath, 'utf-8');
    const { modifiedContent, placeholders } = extractAndPlaceholderize(content);
    fileData.push({ file, modifiedContent, placeholders });
    allPlaceholders.push(...placeholders);
  }
  console.log(`  Extracted: ${allPlaceholders.length} segments\n`);

  const unique = [...new Set(allPlaceholders.map(p => p.original))];
  console.log(`  Unique: ${unique.length}\n`);

  const toTrans = unique.filter(s => !cache.has(s));
  console.log(`  To translate: ${toTrans.length} (cached: ${unique.length - toTrans.length})\n`);

  // Translate
  const transMap = new Map();
  for (const [k, v] of cache) transMap.set(k, v);

  if (toTrans.length > 0) {
    for (let i = 0; i < toTrans.length; i += BATCH_SIZE) {
      const batch = toTrans.slice(i, i + BATCH_SIZE);
      const n = Math.floor(i / BATCH_SIZE) + 1;
      const total = Math.ceil(toTrans.length / BATCH_SIZE);
      process.stdout.write(`  Batch ${n}/${total}... `);
      const results = await translateWithRetry(batch, SRC_LANG, baiduLang);
      for (let j = 0; j < batch.length; j++) {
        transMap.set(batch[j], results[j] || batch[j]);
        cache.set(batch[j], results[j] || batch[j]);
      }
      console.log('ok');
      saveCache();
      if (i + BATCH_SIZE < toTrans.length) await new Promise(r => setTimeout(r, 300));
    }
    console.log();
  }

  // Generate target language files
  for (const { file, modifiedContent, placeholders } of fileData) {
    let targetContent = modifiedContent;
    for (const p of placeholders) {
      if (transMap.has(p.original)) {
        targetContent = targetContent.split(p.placeholder).join(transMap.get(p.original));
      }
    }

    // Fix lang attribute on <html> and <Layout lang="...">
    targetContent = targetContent.replace(/\blang="en"/g, `lang="${targetLang}"`);
    targetContent = targetContent.replace(/\blang='en'/g, `lang='${targetLang}'`);

    // Add dir="rtl" for Arabic (only if not already present and inside html/Layout)
    if (RTL_LANGS.has(targetLang)) {
      targetContent = targetContent.replace(/(<html\b[^>]*)>/gi, `$1 dir="rtl">`);
    }

    // Replace /en/ paths with /{lang}/ — precise replacements only
    // Double-quoted paths: "/en/..."
    targetContent = targetContent.replace(/"\/en\/([^"]*)"/g, `"/${targetLang}/$1"`);
    // Single-quoted paths: '/en/...'
    targetContent = targetContent.replace(/'\/en\/([^']*)'/g, `'/${targetLang}/$1'`);
    // Bare /en/ as a full path value
    targetContent = targetContent.replace(/"\/en"/g, `"/${targetLang}"`);
    targetContent = targetContent.replace(/'\/en'/g, `'/${targetLang}'`);

    const dir = path.dirname(file.targetPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file.targetPath, targetContent, 'utf-8');
    console.log(`  ${file.relativePath}`);
  }

  console.log(`\n=== ${targetLang}: ${files.length} pages generated ===`);
}

// ====== Entry ======
const rawTargetLangs = process.argv.slice(2).length > 0
  ? process.argv.slice(2)
  : [DEFAULT_TARGET];

// Validate languages
const invalid = rawTargetLangs.filter(l => !SUPPORTED_LANGS.includes(l));
if (invalid.length > 0) {
  console.error(`\nUnsupported language(s): ${invalid.join(', ')}`);
  console.error(`Supported: ${SUPPORTED_LANGS.join(', ')}`);
  process.exit(1);
}
const targetLangs = rawTargetLangs;

async function main() {
  console.log(`=== Baidu Translate v5 (Multilingual, ${SUPPORTED_LANGS.length} locales) ===`);
  console.log(`Source: ${SRC_LANG}`);
  console.log(`Targets: ${targetLangs.join(', ')}`);

  for (const lang of targetLangs) {
    await translateTo(lang);
  }
  console.log('\n=== ALL DONE ===');
}

main().catch(err => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
