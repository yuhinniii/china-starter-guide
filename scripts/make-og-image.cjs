// Generate 1200x1200 square OG image (light cream + site logo)
// Layout: logo and text share one visual centre; gaps tightened; whole block scaled up.
// usage: node scripts/make-og-image.cjs
const sharp = require('sharp');
const path = require('path');

// Logo artwork in its native coordinate space (~x 115-486, y 118-516)
const LOGO_PATHS = `
<path d="M384.428 156.376 385.624 156.964 385.3 157.716 384.871 157.532 369.687 192.805C299.792 162.717 218.852 194.728 188.902 264.303 158.952 333.878 191.333 414.67 261.228 444.758 331.122 474.845 412.062 442.835 442.012 373.26L475.781 387.796 468.016 403.595C424.668 481.572 328.659 515.655 245.228 479.74 156.236 441.431 115.253 337.988 153.692 248.693 192.131 159.399 295.435 118.067 384.428 156.376Z" fill="#C2352B"/>
<path d="M401 169.939 433.467 169.939 443.5 139 453.533 169.939 486 169.939 459.733 189.061 469.766 220 443.5 200.878 417.234 220 427.267 189.061Z" fill="#D4A23A"/>
<path d="M278.006 280.825 401.861 229.439 352.7 354.194Z" stroke="#D4A23A" stroke-width="1.33" fill="#C2352B"/>
<path d="M351.631 355.282 227.776 406.668 276.937 281.913Z" stroke="#D4A23A" stroke-width="1.33" fill="#D4A23A"/>`;

async function measure(markup) {
  const probe = `<svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg"><g>${markup}</g></svg>`;
  const { data, info } = await sharp(Buffer.from(probe))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * info.channels + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { minX, minY, maxX, maxY, w: maxX - minX + 1, h: maxY - minY + 1 };
}

(async () => {
  const box = await measure(LOGO_PATHS);

  // Vertical rhythm — every element scaled together, gaps tightened
  const LOGO_H = 484;
  const LOGO_TOP = 190;
  const TITLE_SIZE = 118;
  const SUB_SIZE = 51;
  const BTN_W = 410;
  const BTN_H = 122;
  const BTN_R = BTN_H / 2;
  const BTN_FONT = 46;

  const s = LOGO_H / box.h;
  const tx = 600 - s * ((box.minX + box.maxX) / 2);
  const ty = LOGO_TOP - s * box.minY;
  const logoBottom = LOGO_TOP + LOGO_H;

  const titleBase = logoBottom + 42 + Math.round(TITLE_SIZE * 0.72);
  const subBase = titleBase + 68;
  const btnTop = subBase + 46;

  const svg = `<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, Helvetica, sans-serif">
<rect width="1200" height="1200" fill="#FAF7F2"/>
<rect width="1200" height="28" fill="#C2352B"/>
<g transform="translate(${tx.toFixed(2)},${ty.toFixed(2)}) scale(${s.toFixed(4)})">${LOGO_PATHS}</g>
<text x="600" y="${titleBase}" font-size="${TITLE_SIZE}" font-weight="600" fill="#2C2C2A" text-anchor="middle">China Starter Hub</text>
<text x="600" y="${subBase}" font-size="${SUB_SIZE}" fill="#5F5E5A" text-anchor="middle">Visas · Payments · Trains · Food</text>
<rect x="${600 - BTN_W / 2}" y="${btnTop}" width="${BTN_W}" height="${BTN_H}" rx="${BTN_R}" fill="#C2352B"/>
<text x="600" y="${btnTop + Math.round(BTN_H / 2) + Math.round(BTN_FONT * 0.36)}" font-size="${BTN_FONT}" fill="#FFFFFF" text-anchor="middle">Start planning</text>
</svg>`;

  const out = path.resolve(__dirname, '../public/images/og-default.png');
  const info = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  console.log('written', info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB');
  console.log('logo bbox', JSON.stringify(box), 'scale', s.toFixed(4), 'translate', tx.toFixed(1), ty.toFixed(1));
})().catch(e => { console.error(e); process.exit(1); });
