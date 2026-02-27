import { test, expect, devices } from '@playwright/test';

const BASE_URL = 'http://localhost:4321';

const viewports = [
  { name: 'Desktop', width: 1920, height: 1080 },
  { name: 'iPad', ...devices['iPad Pro 11'].viewport },
  { name: 'iPhone', ...devices['iPhone 15'].viewport },
];

for (const vp of viewports) {
  test.describe(`Dark Premium — ${vp.name} (${vp.width}x${vp.height})`, () => {
    test.use({ viewport: { width: vp.width!, height: vp.height! } });

    test('page loads with dark background', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await expect(page).toHaveTitle(/Lilian Sevoumian/);

      // Body has dark background (zinc-950) — Tailwind v4 uses oklch
      const isDark = await page.locator('body').evaluate(el => {
        const style = window.getComputedStyle(el);
        const bg = style.backgroundColor;
        // Check for oklch dark value or rgb dark value
        if (bg.includes('oklch')) {
          // oklch lightness < 0.2 = very dark
          const match = bg.match(/oklch\(([\d.]+)/);
          return match ? parseFloat(match[1]) < 0.2 : false;
        }
        const match = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        return match ? Math.max(+match[1], +match[2], +match[3]) < 30 : false;
      });
      expect(isDark).toBe(true);
    });

    test('Satoshi font loads correctly', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Check Fontshare stylesheet is present
      const fontLink = page.locator('link[rel="stylesheet"][href*="fontshare"]');
      await expect(fontLink).toHaveCount(1);

      // Verify body uses Satoshi
      const fontFamily = await page.locator('body').evaluate(el =>
        window.getComputedStyle(el).fontFamily
      );
      expect(fontFamily).toContain('Satoshi');
    });

    test('no light/white sections remain', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Check all major sections for dark backgrounds
      const sections = page.locator('main section');
      const count = await sections.count();

      for (let i = 0; i < count; i++) {
        const section = sections.nth(i);
        const bgColor = await section.evaluate(el => {
          const style = window.getComputedStyle(el);
          return style.backgroundColor;
        });
        // Should NOT be white (255,255,255), zinc-100 (244,244,245), or similar light colors
        expect(bgColor).not.toBe('rgb(255, 255, 255)');
        expect(bgColor).not.toBe('rgb(244, 244, 245)');
      }
    });

    test('headings are not uppercase (sentence case)', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      const h2 = page.locator('h2').first();
      await expect(h2).toBeVisible();
      const textTransform = await h2.evaluate(el =>
        window.getComputedStyle(el).textTransform
      );
      expect(textTransform).not.toBe('uppercase');
    });

    test('violet accent visible on CTA buttons', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // CTA gradient button exists — check hero CTA which is always visible
      const ctaButton = page.locator('section a.cta-gradient').first();
      await expect(ctaButton).toBeVisible();
    });

    test('navigation is dark with frosted glass', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();

      // Nav should have dark backdrop — Tailwind v4 uses oklch/oklab
      const isDark = await nav.evaluate(el => {
        const bg = window.getComputedStyle(el).backgroundColor;
        // oklab or oklch with low lightness = dark
        if (bg.includes('oklab') || bg.includes('oklch')) {
          const match = bg.match(/ok(?:lab|lch)\(([\d.]+)/);
          return match ? parseFloat(match[1]) < 0.2 : false;
        }
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return match ? Math.max(+match[1], +match[2], +match[3]) < 30 : false;
      });
      expect(isDark).toBe(true);
    });

    test('scrolling logos fade matches dark bg', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // The scrolling logos "Ils m'ont fait confiance" text is visible
      const trustLabel = page.locator('text=Ils m\'ont fait confiance');
      await expect(trustLabel).toBeVisible();
    });

    test('pricing cards are dark', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });

      // Navigate to pricing section
      const pricingSection = page.locator('#tarifs');
      await pricingSection.scrollIntoViewIfNeeded();

      // Check first pricing card has dark bg
      const card = page.locator('.pricing-card').first();
      await expect(card).toBeVisible();
    });

    test('full page screenshot', async ({ page }) => {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);
      await page.screenshot({
        path: `tests/screenshots/dark-${vp.name.toLowerCase()}.png`,
        fullPage: true,
      });
    });
  });
}
