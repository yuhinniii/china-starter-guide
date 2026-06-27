/**
 * 百度翻译批量翻译脚本 v3
 * 修复了 v1/v2 中发现的 6 个 bug
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const BAIDU_APPID = '20260624002637569';
const BAIDU_KEY = 'wjVRVZoCcxeez3GVPynf';
const SRC_DIR = path.resolve(__dirname, '..', 'src', 'pages', 'en');
const DST_DIR = path.resolve(__dirname, '..', 'src', 'pages', 'zh');
const BATCH_SIZE = 10;
const MAX_RETRIES = 3;

// Cache
const translationCache = new Map();
const CACHE_FILE = path.resolve(__dirname, '..', '.translate-cache.json');
function loadCache() {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
      for (const [k, v] of Object.entries(data)) translationCache.set(k, v);
      console.log(`  Loaded cache: ${translationCache.size} strings\n`);
    }
  } catch (e) {}
}
function saveCache() {
  try { fs.writeFileSync(CACHE_FILE, JSON.stringify(Object.fromEntries(translationCache), null, 2), 'utf-8'); } catch (e) {}
}

// Baidu Translate API
function md5(str) { return crypto.createHash('md5').update(str, 'utf8').digest('hex'); }

function baiduTranslate(texts, from = 'en', to = 'zh') {
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

async function translateWithRetry(texts) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try { return await baiduTranslate(texts); } catch (err) {
      if (err.message.includes('20003')) {
        console.log(`  Sensitive word, single-translate (${texts.length} items)...`);
        const results = [];
        for (const t of texts) {
          try { results.push((await baiduTranslate([t]))[0]); } catch (e2) { results.push(t); }
          await new Promise(r => setTimeout(r, 200));
        }
        return results;
      }
      if (attempt < MAX_RETRIES) { await new Promise(r => setTimeout(r, 2000 * attempt)); }
      else throw err;
    }
  }
}

// ============ FIXED EXTRACTION ============
const EXCLUDED_BRANDS = new Set([
  'Alipay','WeChat','DiDi','WhatsApp','Google','YouTube','Instagram','Facebook','Twitter',
  'Visa','Mastercard','eSIM','VPN','iOS','Android','iPhone','iPad','Airbnb','Uber','COVA',
  'Amap','Trip.com','Yelp','ExpressVPN','NordVPN','WireGuard','OpenVPN','Hellobike',
  'Meituan','Dianping','Weibo','Bilibili','TikTok'
]);

function extractAndPlaceholderize(content) {
  const placeholders = [];
  const seen = new Set();
  let idx = 0;

  function addString(str, ctx) {
    const t = str.trim();
    if (!t) return null;
    if (/^\d+$/.test(t)) return null;
    if (/^[\s.,!?;:\-–—/\\(){}\[\]'"]+$/.test(t)) return null;
    if (/^[\u4e00-\u9fff]+$/.test(t)) return null; // pure Chinese
    if (t.startsWith('http') || t.startsWith('/')) return null;
    if (t.startsWith('const ') || t.startsWith('import ')) return null;
    if (EXCLUDED_BRANDS.has(t)) return null;
    if (t.length < 3) return null;
    const key = t.toLowerCase().replace(/\s+/g, ' ');
    if (seen.has(key)) return null;
    seen.add(key);
    const ph = `___TRPH_${idx++}_`;
    placeholders.push({ placeholder: ph, original: t, context: ctx });
    return ph;
  }

  // Strip scripts
  const scripts = [];
  let result = content.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, m => {
    scripts.push(m); return `<___SCRIPT_${scripts.length - 1}___/>`;
  });
  result = result.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, m => {
    scripts.push(m); return `<___SCRIPT_${scripts.length - 1}___/>`;
  });

  // FIX BUG 1: Support BOTH single and double quotes for frontmatter
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

  // Extract HTML text nodes
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

  // FIX BUG 3: Use split/join instead of regex (replaces ALL occurrences)
  htmlReplacements.sort((a, b) => b.text.length - a.text.length);
  for (const { text, ph } of htmlReplacements) {
    result = result.split('>' + text + '<').join('>' + ph + '<');
  }

  // Restore scripts
  for (let i = 0; i < scripts.length; i++) {
    result = result.replace(`<___SCRIPT_${i}___/>`, scripts[i]);
  }

  return { modifiedContent: result, placeholders };
}

// ============ MAIN ============
async function main() {
  console.log('=== China Starter Guide - Baidu Translate v3 (Bug Fixed) ===\n');
  loadCache();

  // Test API
  try {
    const test = await baiduTranslate(['Hello']);
    console.log(`  API OK: "Hello" -> "${test[0]}"\n`);
  } catch (err) {
    console.error(`  API FAIL: ${err.message}`);
    console.error('  Recharge at: https://fanyi-api.baidu.com/');
    process.exit(1);
  }

  // FIX BUG 5: Include index.astro and search.astro
  function getAstroFiles(dir, baseDir = dir) {
    const files = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.relative(baseDir, full);
      if (entry.isDirectory()) files.push(...getAstroFiles(full, baseDir));
      else if (entry.name.endsWith('.astro')) files.push({ enPath: full, zhPath: path.join(DST_DIR, rel), relativePath: rel });
    }
    return files;
  }

  const files = getAstroFiles(SRC_DIR);
  console.log(`  Found ${files.length} files (including index/search)\n`);

  // Extract + placeholderize
  const fileData = [];
  const allPlaceholders = [];
  for (const file of files) {
    const content = fs.readFileSync(file.enPath, 'utf-8');
    const { modifiedContent, placeholders } = extractAndPlaceholderize(content);
    fileData.push({ file, modifiedContent, placeholders });
    allPlaceholders.push(...placeholders);
  }
  console.log(`  Extracted ${allPlaceholders.length} text segments\n`);

  // Dedup
  const unique = [...new Map(allPlaceholders.map(p => [p.original, p.original])).keys()];
  console.log(`  After dedup: ${unique.length} unique strings\n`);

  const toTrans = unique.filter(s => !translationCache.has(s));
  console.log(`  To translate: ${toTrans.length} (cached: ${unique.length - toTrans.length})\n`);

  // Translate
  const transMap = new Map();
  for (const [k, v] of translationCache) transMap.set(k, v);

  if (toTrans.length > 0) {
    for (let i = 0; i < toTrans.length; i += BATCH_SIZE) {
      const batch = toTrans.slice(i, i + BATCH_SIZE);
      const n = Math.floor(i / BATCH_SIZE) + 1;
      const total = Math.ceil(toTrans.length / BATCH_SIZE);
      process.stdout.write(`  Batch ${n}/${total} (${batch.length} items)... `);
      const results = await translateWithRetry(batch);
      for (let j = 0; j < batch.length; j++) {
        transMap.set(batch[j], results[j] || batch[j]);
        translationCache.set(batch[j], results[j] || batch[j]);
      }
      console.log('ok');
      saveCache();
      if (i + BATCH_SIZE < toTrans.length) await new Promise(r => setTimeout(r, 300));
    }
    console.log();
  }

  // Generate zh files
  for (const { file, modifiedContent, placeholders } of fileData) {
    let zhContent = modifiedContent;
    for (const p of placeholders) {
      if (transMap.has(p.original)) {
        zhContent = zhContent.split(p.placeholder).join(transMap.get(p.original));
      }
    }

    // Fix lang
    zhContent = zhContent.replace(/\blang="en"/g, 'lang="zh"');
    zhContent = zhContent.replace(/\blang='en'/g, "lang='zh'");

    // FIX BUG 4: Replace /en/ in ALL contexts (not just JS strings)
    // This handles: href="/en/...", href='/en/...', href={.../en/...}, to="/en/...", etc.
    zhContent = zhContent.replace(/["']\/en\//g, match => match[0] + '/zh/');
    // Also handle template expressions that contain /en/
    zhContent = zhContent.replace(/\'\/en\'/g, "'/zh'");
    zhContent = zhContent.replace(/"\/en"/g, '"/zh"');
    // Astro template expressions
    zhContent = zhContent.replace(/\/en\//g, '/zh/');

    const dir = path.dirname(file.zhPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(file.zhPath, zhContent, 'utf-8');
    console.log(`  ${file.relativePath}`);
  }

  console.log(`\n=== DONE! ${files.length} zh pages generated ===`);
}

main().catch(err => {
  console.error('\nFailed:', err.message);
  process.exit(1);
});
