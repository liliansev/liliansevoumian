import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 393, height: 852 },
  deviceScaleFactor: 3,
  isMobile: true,
});
const page = await context.newPage();
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

await page.addStyleTag({ content: `
  .fade-in-section, .mc-card, .stat-item, .tool-cell, .mobile-menu-link, .stat-row {
    opacity: 1 !important;
    transform: none !important;
    animation: none !important;
    transition: none !important;
  }
`});
await page.waitForTimeout(500);

// Get actual page height
const pageHeight = await page.evaluate(() => document.body.scrollHeight);
console.log('Page height:', pageHeight);

// Take viewport-sized screenshots at different scroll positions
const viewportH = 852;
let i = 1;
for (let y = 0; y < pageHeight; y += viewportH - 100) {
  await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
  await page.waitForTimeout(200);
  const name = String(i).padStart(2, '0');
  await page.screenshot({ path: `/tmp/m-${name}.png` });
  i++;
}

await browser.close();
console.log('Done - ' + (i-1) + ' screenshots');
