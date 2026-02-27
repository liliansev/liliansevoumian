import { chromium } from '@playwright/test';

const SCREENSHOTS_DIR = '/Users/a1207/CODE/landings/liliansevoumian/tests/screenshots';
const URL = 'http://localhost:4321';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 19_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/19.0 Mobile/15E148 Safari/604.1',
  });

  const page = await context.newPage();

  console.log('Navigating to', URL);
  await page.goto(URL, { waitUntil: 'networkidle' });

  // Disable animations for clean screenshots
  await page.addStyleTag({ content: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
    .fade-in-section, .mc-card, .stat-item, .tool-cell, .mobile-menu-link, .stat-row {
      opacity: 1 !important;
      transform: none !important;
    }
  `});

  // Wait for fonts/content to load
  await page.waitForTimeout(2000);

  // Full page screenshot
  console.log('Taking full page screenshot...');
  await page.screenshot({
    path: `${SCREENSHOTS_DIR}/mobile-fullpage.png`,
    fullPage: true
  });
  console.log('Full page screenshot saved.');

  // Hero - top of page
  console.log('Taking hero screenshot...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/mobile-hero.png` });

  // Discover all sections
  const sectionInfo = await page.evaluate(() => {
    const results = [];
    const allEls = document.querySelectorAll('section, footer, nav, [id]');
    allEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset;
      results.push({
        tag: el.tagName,
        id: el.id || '',
        className: (el.className?.toString() || '').substring(0, 150),
        text: (el.textContent || '').substring(0, 100).trim(),
        top: Math.round(rect.top + scrollTop),
        height: Math.round(rect.height),
      });
    });
    return results;
  });

  console.log('\n=== PAGE SECTIONS ===');
  sectionInfo
    .filter(s => s.tag === 'SECTION' || s.tag === 'FOOTER' || s.tag === 'NAV')
    .forEach(s => console.log(`${s.tag} #${s.id} top=${s.top} h=${s.height} text="${s.text.substring(0, 60)}"`));

  // Screenshot targets
  const targets = [
    { name: 'mobile-trustlogos', findBy: 'text', text: 'confiance' },
    { name: 'mobile-expertise', findBy: 'id', id: 'expertise' },
    { name: 'mobile-tools', findBy: 'text', text: 'Arsenal' },
    { name: 'mobile-parcours', findBy: 'id', id: 'parcours' },
    { name: 'mobile-pricing', findBy: 'id', id: 'tarifs' },
    { name: 'mobile-testimonials', findBy: 'id', id: 'temoignages' },
    { name: 'mobile-cta', findBy: 'id', id: 'contact' },
    { name: 'mobile-footer', findBy: 'tag', tag: 'footer' },
  ];

  for (const target of targets) {
    console.log(`\nTaking screenshot: ${target.name}...`);
    let scrolled = false;

    if (target.findBy === 'id') {
      const el = await page.$(`#${target.id}`);
      if (el) {
        await el.scrollIntoViewIfNeeded();
        scrolled = true;
        console.log(`  Found by id #${target.id}`);
      }
    }

    if (target.findBy === 'tag') {
      const el = await page.$(target.tag);
      if (el) {
        await el.scrollIntoViewIfNeeded();
        scrolled = true;
        console.log(`  Found by tag ${target.tag}`);
      }
    }

    if (target.findBy === 'text') {
      try {
        const el = page.locator(`text=${target.text}`).first();
        if (await el.isVisible({ timeout: 2000 })) {
          await el.scrollIntoViewIfNeeded();
          scrolled = true;
          console.log(`  Found by text "${target.text}"`);
        }
      } catch (e) {
        console.log(`  Text "${target.text}" not found`);
      }
    }

    if (!scrolled) {
      console.log(`  WARNING: Could not find target, using fallback scroll`);
    }

    await page.waitForTimeout(500);
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/${target.name}.png` });
  }

  // Also take sequential viewport screenshots for complete coverage
  console.log('\n=== SEQUENTIAL VIEWPORT SCREENSHOTS ===');
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log('Total page height:', pageHeight);

  const viewportH = 844;
  const overlap = 100;
  let i = 1;
  for (let y = 0; y < pageHeight; y += viewportH - overlap) {
    await page.evaluate(scrollY => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(300);
    const name = String(i).padStart(2, '0');
    await page.screenshot({ path: `${SCREENSHOTS_DIR}/mobile-seq-${name}.png` });
    console.log(`  Viewport ${i}: y=${y}`);
    i++;
  }

  console.log(`\nAll done! ${i - 1} sequential + section screenshots saved.`);
  await browser.close();
}

run().catch(console.error);
