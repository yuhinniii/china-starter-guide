/**
 * Update all .astro files to reference .webp instead of .jpg/.png
 * Also move arrival card .png screenshots from src/pages/ to public/images/
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Step 1: Update image references in all .astro files
// Pattern: /images/xxx.jpg or /images/xxx.png → /images/xxx.webp (if .webp exists)
console.log('=== Step 1: Updating image references in .astro files ===');

// Collect all available .webp files
const webpFiles = new Set();
for (const root of ['public/images']) {
    const full = path.join(__dirname, root);
    if (!fs.existsSync(full)) continue;
    const walk = (dir) => {
        for (const f of fs.readdirSync(dir)) {
            const fp = path.join(dir, f);
            if (fs.statSync(fp).isDirectory()) {
                walk(fp);
            } else if (f.endsWith('.webp')) {
                // Store relative path from public/
                const rel = path.relative(path.join(__dirname, 'public'), fp).replace(/\\/g, '/');
                // Also store the basename without extension
                const baseName = f.replace('.webp', '');
                webpFiles.add(baseName.toLowerCase());
                webpFiles.add(rel);
            }
        }
    };
    walk(full);
}

console.log(`Found ${webpFiles.size} .webp entries available`);

// Update all .astro files
let updatedCount = 0;
const astroFiles = [];
const walkAstro = (dir) => {
    for (const f of fs.readdirSync(dir)) {
        const fp = path.join(dir, f);
        if (fs.statSync(fp).isDirectory()) {
            walkAstro(fp);
        } else if (f.endsWith('.astro')) {
            astroFiles.push(fp);
        }
    }
};
walkAstro(path.join(__dirname, 'src/pages'));

for (const fp of astroFiles) {
    let content = fs.readFileSync(fp, 'utf-8');
    let modified = false;

    // Replace image references: /images/xxx.jpg?v=N → /images/xxx.webp
    // and /images/xxx.png → /images/xxx.webp
    const replaced = content.replace(
        /\/images\/([^"']+?)\.(jpg|png|jpeg)(\?v=\d+)?/g,
        (match, name, ext, version) => {
            const webpPath = `/images/${name}.webp`;
            // Only replace if we know the .webp exists
            const nameLower = name.toLowerCase().replace(/\\/g, '/');
            const webpName = nameLower.split('/').pop(); // Get just the filename
            if (webpFiles.has(nameLower) || webpFiles.has(webpName)) {
                return webpPath;
            }
            return match; // Keep original if no webp
        }
    );

    if (replaced !== content) {
        fs.writeFileSync(fp, replaced, 'utf-8');
        modified = true;
        const relPath = path.relative(__dirname, fp);
        const matches = (content.match(/\/images\/[^"']+?\.(jpg|png|jpeg)/g) || []).length;
        console.log(`  ✅ ${relPath}: ${matches} references updated`);
        updatedCount++;
    }
}

console.log(`\nUpdated ${updatedCount} .astro files`);

// Step 2: Move arrival card screenshots from src/pages/ to public/
console.log('\n=== Step 2: Handling arrival card screenshots ===');

const arrivalSrcs = [];
for (const root of ['src/pages/en/visa/arrival-card', 'src/pages/zh/visa/arrival-card']) {
    const full = path.join(__dirname, root);
    if (!fs.existsSync(full)) continue;
    for (const f of fs.readdirSync(full)) {
        if (f.endsWith('.png')) {
            arrivalSrcs.push(path.join(full, f));
        }
    }
}

console.log(`Found ${arrivalSrcs.length} arrival card .png screenshots`);

// The .jpg versions already exist in public/images/arrival-card/ and were compressed to webp
// The .png in src/pages/ are duplicates - we need to update references in astro files
// to point to the public/ versions

// Check if arrival card .astro files reference the png directly
for (const lang of ['en', 'zh', 'fr', 'ja', 'ko', 'th']) {
    const arrivalAstro = path.join(__dirname, `src/pages/${lang}/visa/arrival-card/index.astro`);
    if (!fs.existsSync(arrivalAstro)) continue;
    let content = fs.readFileSync(arrivalAstro, 'utf-8');
    const orig = content;

    // Replace stepX-homepage.png references with /images/arrival-card/stepX-homepage.webp
    // The .webp files exist in public/images/arrival-card/
    content = content.replace(
        /src=["']([^"']*?)step\d+-(?:homepage|notice|upload|basic-empty|basic-filled|personal-empty|personal-visa|companion-prompt|travel-empty|submit)\.png["']/g,
        (match, prefix) => {
            const pngName = match.match(/step\d+-[^.]+\.png/)[0];
            const webpName = pngName.replace('.png', '.webp');
            return `src="/images/arrival-card/${webpName}"`;
        }
    );

    if (content !== orig) {
        fs.writeFileSync(arrivalAstro, content, 'utf-8');
        const changes = (orig.match(/\.png/g) || []).length;
        console.log(`  ✅ ${lang}/visa/arrival-card/index.astro: ${changes} references updated to /images/arrival-card/`);
    }
}

console.log('\n=== Image reference update complete! ===');
console.log('Next: Delete old .jpg/.png files (optional)');
