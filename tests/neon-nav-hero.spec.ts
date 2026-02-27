import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:4321';

test.describe('Dark neon-green Navigation & Hero', () => {

  test('Desktop 1920x1080 - nav and hero render correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Nav is fixed and visible
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Logo "Lilian." is present
    const logo = nav.locator('a[href="/"]');
    await expect(logo).toBeVisible();
    await expect(logo).toContainText('Lilian.');

    // Green dot in logo
    const dot = logo.locator('div.rounded-full').first();
    await expect(dot).toBeVisible();

    // Disponible badge is visible
    const badge = nav.locator('text=Disponible');
    await expect(badge).toBeVisible();

    // CTA in nav
    const navCta = nav.locator('a[href*="lilian.yt"]');
    await expect(navCta).toBeVisible();

    // Nav links
    const expertise = nav.locator('a[href="#expertise"]');
    await expect(expertise).toBeVisible();
    await expect(expertise).toContainText('Expertise');

    // Hero H1 visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Hero badge
    const heroBadge = page.locator('text=Lilian Sevoumian - Expert Automatisation');
    await expect(heroBadge).toBeVisible();

    // CTAs visible
    const primaryCta = page.locator('a[href*="lilian.yt"]').first();
    await expect(primaryCta).toBeVisible();

    const secondaryCta = page.locator('a[href="#process"]').first();
    await expect(secondaryCta).toBeVisible();

    // Tech badges Make, n8n, Airtable
    await expect(page.locator('text=Make').first()).toBeVisible();
    await expect(page.locator('text=n8n').first()).toBeVisible();
    await expect(page.locator('text=Airtable').first()).toBeVisible();

    // Stats
    await expect(page.locator('.stat-counter').first()).toBeVisible();

    // Logos band
    const trustLabel = page.locator('text=Ils m\'ont fait confiance');
    await expect(trustLabel).toBeVisible();

    // Screenshot
    await page.screenshot({ path: 'tests/screenshots/nav-hero-desktop.png', fullPage: false });
    console.log('Desktop screenshot saved');
  });

  test('Mobile 393x852 - mobile menu toggle works', async ({ page }) => {
    await page.setViewportSize({ width: 393, height: 852 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Mobile menu button visible
    const menuBtn = page.locator('#mobile-menu-btn');
    await expect(menuBtn).toBeVisible();

    // Mobile menu hidden initially
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).not.toBeVisible();

    // Click to open
    await menuBtn.click();
    await page.waitForTimeout(400);
    await expect(mobileMenu).toBeVisible();

    // Links are visible when open
    await expect(page.locator('#mobile-menu a[href="#expertise"]')).toBeVisible();
    await expect(page.locator('#mobile-menu a[href="#tarifs"]')).toBeVisible();

    // Screenshot open menu
    await page.screenshot({ path: 'tests/screenshots/nav-mobile-open.png', fullPage: false });

    // Close with ESC
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await expect(mobileMenu).not.toBeVisible();

    // Hero still visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    await page.screenshot({ path: 'tests/screenshots/hero-mobile.png', fullPage: false });
    console.log('Mobile screenshots saved');
  });

  test('No console JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    if (errors.length > 0) {
      console.log('JS errors found:', errors);
    }
    expect(errors).toHaveLength(0);
  });
});
