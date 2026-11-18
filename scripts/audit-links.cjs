// 体检：把 dist 里所有页面中出现的站内链接逐个落到文件系统上核对
// 输出：200 / 重定向(无尾斜杠) / 404 / 站外
const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '../dist');
const SITE = 'https://chinastarterhub.com';

function walk(dir, rel = '', out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) walk(full, r, out);
    else if (e.name.endsWith('.html')) out.push({ full, rel: '/' + r.replace(/\\/g, '/') });
  }
  return out;
}

const pages = walk(DIST);
const exists = new Set(pages.map(p => p.rel));
const ok = new Set();
for (const p of pages) {
  ok.add(p.rel);
  // /en/cities/beijing-guide/index.html  ->  /en/cities/beijing-guide/
  ok.add(p.rel.replace(/index\.html$/, ''));
}

const results = new Map(); // url -> { status, from: Set }

function classify(raw) {
  let u = raw.trim();
  if (!u || u.startsWith('#') || u.startsWith('mailto:') || u.startsWith('tel:') || u.startsWith('javascript:')) return null;
  if (u.startsWith(SITE)) u = u.slice(SITE.length) || '/';
  if (!u.startsWith('/')) return null; // 站外或相对
  u = u.split('#')[0].split('?')[0];
  if (u === '') u = '/';
  if (/\.[a-zA-Z0-9]{2,5}$/.test(u)) return null; // 静态资源
  if (u.startsWith('/_astro/')) return null;
  if (ok.has(u)) return 'ok';
  // 无尾斜杠 → Cloudflare 会 308 到带斜杠版
  if (!u.endsWith('/') && ok.has(u + '/')) return 'redirect';
  return '404';
}

for (const p of pages) {
  const html = fs.readFileSync(p.full, 'utf8');
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    const st = classify(h);
    if (!st || st === 'ok') continue;
    if (!results.has(h)) results.set(h, { status: st, from: new Set() });
    results.get(h).from.add(p.rel);
  }
}

const bad = [...results.entries()].sort((a, b) => b[1].from.size - a[1].from.size);
const redirects = bad.filter(([, v]) => v.status === 'redirect');
const missing = bad.filter(([, v]) => v.status === '404');

console.log('pages:', pages.length);
console.log('\n=== 指向不存在页面（404）: ' + missing.length + ' 个 ===');
for (const [u, v] of missing) console.log(`  ${u}   ← ${v.from.size} 页引用，例如 ${[...v.from][0]}`);

console.log('\n=== 指向无尾斜杠地址（会 308）: ' + redirects.length + ' 个 ===');
for (const [u, v] of redirects) console.log(`  ${u}   ← ${v.from.size} 页引用，例如 ${[...v.from][0]}`);

// 另外统计 noindex
console.log('\n=== noindex 页面 ===');
for (const p of pages) {
  const html = fs.readFileSync(p.full, 'utf8');
  if (/name="robots"[^>]*noindex|noindex[^"]*"[^>]*name="robots"/i.test(html)) console.log('  ' + p.rel);
}
