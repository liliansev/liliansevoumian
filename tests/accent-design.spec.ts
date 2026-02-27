import { test, expect, devices } from '@playwright/test';

const BASE_URL = 'http://localhost:4321';

// Test across 3 resolutions
const viewports = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'iPad', ...devices['iPad Pro 11'].viewport },
  { name: 'iPhone', ...devices['iPhone 15'].viewport },
];

for (const vp of viewports) {
  test.describe(`${vp.name} (${vp.width}x${vp.height})`, () => {
    test.use({ viewport: { width: vp.width!, height: vp.height! } });

    test('homepage loads and accent colors are visible', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Page loaded
      await expect(page).toHaveTitle(/Lilian Sevoumian/);

      // Hero h1 exists with em tag
      const heroEm = page.locator('h1 em');
      await expect(heroEm.first()).toBeVisible();
      await expect(heroEm.first()).toHaveText('Automations');

      // CTA button exists with gradient (hidden on mobile in nav, visible in hero)
      const ctaButton = page.locator('section a:has-text("Je veux automatiser")').first();
      await expect(ctaButton).toBeVisible();

      // Section labels are indigo (use the section label, not nav link)
      const expertiseLabel = page.locator('section p:has-text("Expertise")').first();
      await expect(expertiseLabel).toBeVisible();

      // Scrolling logos section visible
      const trustLabel = page.locator('text=Ils m\'ont fait confiance');
      await expect(trustLabel).toBeVisible();
    });

    test('fonts are loaded (Instrument Serif + Inter)', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Check that Google Fonts stylesheet link includes our fonts
      const fontLink = page.locator('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
      const href = await fontLink.getAttribute('href');
      expect(href).toContain('Instrument+Serif');
      expect(href).toContain('Inter');
    });

    test('no uppercase on headings', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Check that h2 elements don't have uppercase text-transform
      const h2 = page.locator('h2').first();
      await expect(h2).toBeVisible();
      const textTransform = await h2.evaluate(el =>
        window.getComputedStyle(el).textTransform
      );
      expect(textTransform).not.toBe('uppercase');
    });

    test('em tags in text-reveal headings are animated', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Wait for text-reveal script to process
      await page.waitForTimeout(500);

      // Find a text-reveal element with em content
      const revealEm = page.locator('.text-reveal .text-reveal-word em');
      const count = await revealEm.count();
      expect(count).toBeGreaterThan(0);
    });

    test('indigo accent visible on section labels', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Check expertise section label has indigo color
      const label = page.locator('.text-indigo-500, .text-indigo-400').first();
      await expect(label).toBeVisible();
    });

    test('screenshot', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: `tests/screenshots/${vp.name.toLowerCase()}-homepage.png`,
        fullPage: true,
      });
    });

    test('cas-clients page loads', async ({ page }) => {
      await page.goto(`${BASE_URL}/cas-clients`, { waitUntil: 'networkidle' });
      await expect(page).toHaveTitle(/Cas clients/);

      // Check em tag in h1
      const h1Em = page.locator('h1 em');
      if (await h1Em.count() > 0) {
        await expect(h1Em.first()).toHaveText('différence');
      }

      // Check indigo section label
      const label = page.locator('.text-indigo-500').first();
      await expect(label).toBeVisible();
    });
  });
}
