import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Directories to scan
const imageDirs = [
    'public/images/beijing', 'public/images/shanghai',
    'public/images/shanghai/food', 'public/images/shenzhen',
    'public/images/guangzhou', 'public/images/chengdu',
    'public/images/hainan', 'public/images/didi',
    'public/images/arrival-card', 'public/images'
];

// Collect all images
const allImages = [];
for (const dir of imageDirs) {
    const full = path.join(__dirname, dir);
    if (!fs.existsSync(full)) continue;
    for (const f of fs.readdirSync(full)) {
        if (f.match(/\.(jpg|jpeg|png)$/i)) {
            allImages.push(path.join(dir, f));
        }
    }
}

async function convert(imgPath) {
    const inputPath = path.join(__dirname, imgPath);
    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(dir, basename + '.webp');

    const inSize = fs.statSync(inputPath).size;

    // Skip if webp already exists and is smaller
    if (fs.existsSync(outputPath)) {
        const outSize = fs.statSync(outputPath).size;
        if (outSize < inSize) {
            return { img: imgPath, status: 'SKIP (webp exists+smaller)', inSize, outSize };
        }
    }

    const img = sharp(inputPath);
    const metadata = await img.metadata();

    // Resize if too large (max 1200px)
    let pipeline = img;
    const maxDim = 1200;
    if (metadata.width > maxDim || metadata.height > maxDim) {
        pipeline = img.resize({
            width: Math.min(metadata.width, maxDim),
            height: Math.min(metadata.height, maxDim),
            fit: 'inside',
            withoutEnlargement: true
        });
    }

    await pipeline.webp({ quality: 80, effort: 4 }).toFile(outputPath);

    const outSize = fs.statSync(outputPath).size;
    return {
        img: imgPath,
        status: 'OK',
        inSize, outSize,
        inW: metadata.width, inH: metadata.height,
        savings: inSize - outSize
    };
}

(async () => {
    let totalIn = 0, totalOut = 0, okCount = 0;

    for (const img of allImages) {
        const r = await convert(img);
        totalIn += r.inSize || 0;
        totalOut += r.outSize || 0;

        if (r.status === 'OK') {
            okCount++;
            const pct = ((1 - r.outSize / r.inSize) * 100).toFixed(0);
            console.log(`✅ ${img}: ${(r.inSize/1024).toFixed(0)}KB → ${(r.outSize/1024).toFixed(0)}KB (-${pct}%)`);
        } else {
            console.log(`⏭️  ${img}: ${(r.inSize/1024).toFixed(0)}KB (${r.status})`);
        }
    }

    const saved = totalIn - totalOut;
    console.log(`\n📊 Summary: ${(totalIn/1024/1024).toFixed(1)}MB → ${(totalOut/1024/1024).toFixed(1)}MB`);
    console.log(`   Saved: ${(saved/1024/1024).toFixed(1)}MB (${(saved/totalIn*100).toFixed(0)}%)`);
    console.log(`   Converted: ${okCount}/${allImages.length} images`);
})();
