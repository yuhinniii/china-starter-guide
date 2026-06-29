/**
 * Generate sitemap.xml and sitemap-index.xml
 * Run after `astro build`. Generates sitemap from built HTML files in dist/.
 *
 * Usage: node scripts/generate-sitemap.cjs
 */

const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '../dist');
const SITE_URL = 'https://chinastarterhub.com';

// Locales with their hreflang codes
const LOCALES = {
  en: 'en',
  zh: 'zh',
  ja: 'ja',
  ko: 'ko',
  fr: 'fr',
  th: 'th',
  ru: 'ru',
  es: 'es',
  ar: 'ar',
};

const EXCLUDE = ['/search/', '/404'];

// Collect all HTML pages
function walkDir(dir, relativePath = '') {
  const entries = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    const rel = relativePath ? relativePath + '/' + item.name : item.name;
    if (item.isDirectory()) {
      entries.push(...walkDir(full, rel));
    } else if (item.name === 'index.html') {
      let urlPath = '/' + rel.replace('/index.html', '').replace(/\\/g, '/');
      if (urlPath.endsWith('/index')) urlPath = urlPath.slice(0, -6);
      // Check exclusion
      if (EXCLUDE.some(e => urlPath.includes(e))) continue;
      entries.push({
        loc: SITE_URL + urlPath,
        lastmod: new Date().toISOString().split('T')[0],
      });
    }
  }
  return entries;
}

const allPages = walkDir(DIST);

// Group by content path (strip locale prefix)
function getContentPath(url) {
  const p = new URL(url).pathname;
  const match = p.match(/^\/([a-z]{2})\/(.+)/);
  if (match) return match[2];
  return null;
}

// Build the sitemap-index.xml (one entry per content path with alternates)
const contentMap = new Map(); // contentPath -> { locales: {lang: url} }

for (const page of allPages) {
  const p = new URL(page.loc).pathname;
  const match = p.match(/^\/([a-z]{2})\/(.*)/);
  if (match) {
    const lang = match[1];
    const contentPath = match[2];
    if (!contentMap.has(contentPath)) {
      contentMap.set(contentPath, { locales: {} });
    }
    contentMap.get(contentPath).locales[lang] = page.loc;
  }
}

// Write individual sitemap files per locale (for smaller file size)
for (const [locale, langCode] of Object.entries(LOCALES)) {
  const localePages = [];
  for (const [contentPath, data] of contentMap) {
    if (data.locales[locale]) {
      const url = data.locales[locale];
      // Build alternates
      const alternates = Object.entries(data.locales)
        .filter(([l]) => l !== locale)
        .map(([l, u]) => `      <xhtml:link rel="alternate" hreflang="${LOCALES[l]}" href="${u}" />`)
        .join('\n');

      localePages.push({
        url,
        alternates,
        hasAlternates: Object.keys(data.locales).length > 1,
      });
    }
  }

  // Sort for stability
  localePages.sort((a, b) => a.url.localeCompare(b.url));

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;
  for (const p of localePages) {
    sitemap += `  <url>
    <loc>${p.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
`;
    if (p.hasAlternates) {
      sitemap += p.alternates + '\n';
    }
    sitemap += `  </url>
`;
  }
  sitemap += `</urlset>
`;

  const outFile = path.join(DIST, `sitemap-${locale}.xml`);
  fs.writeFileSync(outFile, sitemap, 'utf8');
  console.log(`✅ sitemap-${locale}.xml — ${localePages.length} URLs`);
}

// Write sitemap index
let index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
for (const locale of Object.keys(LOCALES)) {
  index += `  <sitemap>
    <loc>${SITE_URL}/sitemap-${locale}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
`;
}
index += `</sitemapindex>
`;

fs.writeFileSync(path.join(DIST, 'sitemap-index.xml'), index, 'utf8');
console.log(`✅ sitemap-index.xml — ${Object.keys(LOCALES).length} locale sitemaps`);
console.log(`\nTotal unique pages: ${contentMap.size}`);
