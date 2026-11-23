// Generate 1200x1200 square OG image (light cream + site logo, centered, large)
// usage: node scripts/make-og-image.cjs
const sharp = require('sharp');
const path = require('path');

const LOGO = `
<g transform="translate(600,510) scale(0.95) translate(-313.5,-316.5)">
<g transform="translate(-139 -138)">
<path d="M384.428 156.376 385.624 156.964 385.3 157.716 384.871 157.532 369.687 192.805C299.792 162.717 218.852 194.728 188.902 264.303 158.952 333.878 191.333 414.67 261.228 444.758 331.122 474.845 412.062 442.835 442.012 373.26L475.781 387.796 468.016 403.595C424.668 481.572 328.659 515.655 245.228 479.74 156.236 441.431 115.253 337.988 153.692 248.693 192.131 159.399 295.435 118.067 384.428 156.376Z" fill="#C2352B"/>
<path d="M401 169.939 433.467 169.939 443.5 139 453.533 169.939 486 169.939 459.733 189.061 469.766 220 443.5 200.878 417.234 220 427.267 189.061Z" fill="#D4A23A"/>
<path d="M278.006 280.825 401.861 229.439 352.7 354.194Z" stroke="#D4A23A" stroke-width="1.33" fill="#C2352B"/>
<path d="M351.631 355.282 227.776 406.668 276.937 281.913Z" stroke="#D4A23A" stroke-width="1.33" fill="#D4A23A"/>
</g>
</g>`;

const svg = `<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, Arial, Helvetica, sans-serif">
<rect width="1200" height="1200" fill="#FAF7F2"/>
<rect width="1200" height="28" fill="#C2352B"/>
${LOGO}
<text x="600" y="770" font-size="92" font-weight="600" fill="#2C2C2A" text-anchor="middle">China Starter Hub</text>
<text x="600" y="848" font-size="40" fill="#5F5E5A" text-anchor="middle">Visas · Payments · Trains · Food</text>
<rect x="440" y="900" width="320" height="95" rx="47" fill="#C2352B"/>
<text x="600" y="962" font-size="36" fill="#FFFFFF" text-anchor="middle">Start planning</text>
</svg>`;

const out = path.resolve(__dirname, '../public/images/og-default.png');
sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(out)
  .then(info => console.log('written', info.width + 'x' + info.height, Math.round(info.size / 1024) + 'KB'))
  .catch(e => { console.error(e); process.exit(1); });
