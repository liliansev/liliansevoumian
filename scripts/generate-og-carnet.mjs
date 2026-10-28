import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

/* Vignette sociale de l'accueil, dans la grammaire du « Carnet ». La source
   est une page HTML (script./og-carnet/index.html) qui charge les vraies polices
   et la vraie photo : agent-browser la photographie à 1200 × 630, sharp
   recompresse le PNG. */
const sourcePath = fileURLToPath(new URL('./og-carnet/index.html', import.meta.url));
const outputPath = fileURLToPath(new URL('../public/og-carnet.png', import.meta.url));
const session = ['--session', 'og-carnet'];

const run = (...args) => execFileSync('agent-browser', [...session, ...args], { stdio: 'inherit' });

try {
  run('set', 'viewport', '1200', '630');
  run('open', `file://${sourcePath}`);
  run('wait', '600');
  run('screenshot', `${outputPath}.tmp.png`);
} finally {
  execFileSync('agent-browser', [...session, 'close'], { stdio: 'ignore' });
}

await sharp(`${outputPath}.tmp.png`).png({ compressionLevel: 9, palette: false }).toFile(outputPath);
execFileSync('rm', [`${outputPath}.tmp.png`]);
console.log(`Generated ${outputPath}`);
