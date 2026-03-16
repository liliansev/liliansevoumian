import { test } from '@playwright/test';
test('logos pills', async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  const page = await ctx.newPage();
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.querySelectorAll('.fade-in-section').forEach(el => el.classList.add('is-visible')));
  await page.waitForTimeout(300);
  const el = page.locator('#expertise');
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'tests/screenshots/v4-expertise-pills.png' });
  await ctx.close();
});
