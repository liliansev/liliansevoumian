import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 1920, height: 1080 } });

test('methodology section screenshot', async ({ page }) => {
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const section = page.locator('#process');
  await expect(section).toBeVisible();
  await section.screenshot({ path: 'tests/screenshots/methodology-neon.png' });
  console.log('Methodology screenshot saved');
});
