import { test } from '@playwright/test';

test.use({ viewport: { width: 1920, height: 1080 } });

test('find 404 resources', async ({ page }) => {
  const failed404s: string[] = [];

  page.on('response', response => {
    if (response.status() === 404) {
      failed404s.push(response.url());
    }
  });

  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('404 resources found:', failed404s.length);
  failed404s.forEach(url => console.log(' - 404:', url));
});
