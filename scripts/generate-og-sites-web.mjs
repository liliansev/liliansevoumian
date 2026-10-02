import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const fontPath = fileURLToPath(
  new URL('../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2', import.meta.url),
);
const outputPath = fileURLToPath(new URL('../public/og-sites-web.png', import.meta.url));
const font = (await readFile(fontPath)).toString('base64');

/* Source reproductible de la vignette sociale. Le concept seed 244476c3 est
   celui de la direction « Le dossier de fabrication » retenue pour la page.
   Couleurs de la direction « nuit et pêche » : fond nuit, texte blanc, bande
   pêche arrondie et penchée derrière le fragment surligné, écrit en nuit. Le
   titre et le prix reprennent ceux du hero de /sites-web-abonnement. */
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <style>
    @font-face {
      font-family: Geist;
      src: url(data:font/woff2;base64,${font}) format('woff2');
      font-weight: 100 900;
    }
    text { font-family: Geist, Arial, sans-serif; fill: #ffffff; }
  </style>
  <rect width="1200" height="630" fill="#111827"/>
  <text x="72" y="92" font-size="28" font-weight="650">Lilian Sevoumian</text>
  <text x="72" y="248" font-size="80" font-weight="720" letter-spacing="-3.5">Un site pour vos clients.</text>
  <text x="72" y="368" font-size="80" font-weight="720" letter-spacing="-3.5">Une app pour</text>
  <rect x="566" y="292" width="476" height="96" rx="14" fill="#ffb38a" transform="rotate(1.3 804 340)"/>
  <text x="586" y="368" font-size="80" font-weight="720" letter-spacing="-3.5" style="fill: #111827">vos équipes.</text>
  <line x1="72" y1="480" x2="1128" y2="480" stroke="#ffffff" stroke-opacity="0.22"/>
  <text x="72" y="548" font-size="28" font-weight="620" letter-spacing="0.5" style="fill: #c3c9d4">Sites web · Applications métier</text>
  <text x="1128" y="548" text-anchor="end" font-size="24" font-weight="520" style="fill: #c3c9d4">dès 1 500 € HT</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outputPath);
console.log(`Generated ${outputPath}`);
