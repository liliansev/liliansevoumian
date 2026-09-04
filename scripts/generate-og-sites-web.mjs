import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const fontPath = fileURLToPath(
  new URL('../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2', import.meta.url),
);
const outputPath = fileURLToPath(new URL('../public/og-sites-web.png', import.meta.url));
const font = (await readFile(fontPath)).toString('base64');

/* Source reproductible de la vignette sociale. Le concept seed 244476c3 est
   celui de la direction « Le dossier de fabrication » retenue pour la page. */
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <style>
    @font-face {
      font-family: Geist;
      src: url(data:font/woff2;base64,${font}) format('woff2');
      font-weight: 100 900;
    }
    text { font-family: Geist, Arial, sans-serif; fill: #111111; }
  </style>
  <rect width="1200" height="630" fill="#cdf564"/>
  <text x="72" y="92" font-size="28" font-weight="650">Lilian Sevoumian</text>
  <text x="72" y="248" font-size="88" font-weight="720" letter-spacing="-4">Je crée votre site.</text>
  <text x="72" y="372" font-size="88" font-weight="720" letter-spacing="-4">Puis je le fais</text>
  <path d="M616 290 L1080 296 L1075 390 L612 384 Z" fill="#ffffff"/>
  <text x="630" y="372" font-size="88" font-weight="720" letter-spacing="-4">avancer.</text>
  <line x1="72" y1="480" x2="1128" y2="480" stroke="#111111" stroke-opacity="0.28"/>
  <text x="72" y="548" font-size="28" font-weight="620" letter-spacing="0.5">BUILD · CARE · GROWTH</text>
  <text x="1128" y="548" text-anchor="end" font-size="24" font-weight="520">dès 1 900 € HT</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(outputPath);
console.log(`Generated ${outputPath}`);
