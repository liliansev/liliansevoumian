import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4321';

test.describe('Neon dark theme - Manifeste, ExpertiseCards, Methodology', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('page loads correctly', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await expect(page).toHaveTitle(/Lilian Sevoumian/);
  });

  test('Manifeste section - neon green label and dark background', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const section = page.locator('#manifeste');
    await expect(section).toBeVisible();

    // Check the neon green label
    const label = section.locator('span').filter({ hasText: 'Manifeste' }).first();
    await expect(label).toBeVisible();

    // Check text-reveal h2 is present
    const h2 = section.locator('h2.text-reveal');
    await expect(h2).toBeVisible();

    // Screenshot
    await section.screenshot({ path: 'tests/screenshots/manifeste-neon.png' });
    console.log('Manifeste screenshot saved');
  });

  test('ExpertiseCards - glass cards and neon accents', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const section = page.locator('#expertise');
    await expect(section).toBeVisible();

    // Check glass cards exist
    const glassCards = section.locator('.glass-card');
    await expect(glassCards).toHaveCount(3);

    // Check neon label
    const label = section.locator('span').filter({ hasText: 'Expertise' }).first();
    await expect(label).toBeVisible();

    // Check stack tools section
    const stackLabel = section.locator('p').filter({ hasText: 'Ma stack' });
    await expect(stackLabel).toBeVisible();

    // Screenshot
    await section.screenshot({ path: 'tests/screenshots/expertise-neon.png' });
    console.log('Expertise screenshot saved');
  });

  test('Methodology - timeline layout with neon nodes', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const section = page.locator('#process');
    await expect(section).toBeVisible();

    // Check neon label
    const label = section.locator('span').filter({ hasText: 'Méthode' }).first();
    await expect(label).toBeVisible();

    // Check h2 with text-reveal
    const h2 = section.locator('h2.text-reveal');
    await expect(h2).toBeVisible();

    // Check phase numbers in timeline nodes
    await expect(section.locator('text=01')).toHaveCount(2); // node + desktop text
    await expect(section.locator('text=02')).toHaveCount(2);
    await expect(section.locator('text=03')).toHaveCount(2);

    // Screenshot
    await section.screenshot({ path: 'tests/screenshots/methodology-neon.png' });
    console.log('Methodology screenshot saved');
  });

  test('full page screenshot at 1920x1080', async ({ page }) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    await page.screenshot({
      path: 'tests/screenshots/full-neon-desktop.png',
      fullPage: true,
    });
    console.log('Full page screenshot saved');
  });

  test('console has no JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    console.log('Console errors found:', errors.length);
    errors.forEach(e => console.log(' -', e));
    expect(errors).toHaveLength(0);
  });
});
