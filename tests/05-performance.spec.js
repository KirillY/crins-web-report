const { test, expect } = require('@playwright/test');

test.describe('05 - Performance Tests', () => {
  test('page loads in reasonable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    console.log('Page load time:', loadTime, 'ms');

    expect(loadTime).toBeLessThan(5000);
  });

  test('page has reasonable number of requests', async ({ page }) => {
    const requests = [];

    page.on('request', request => {
      requests.push(request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    console.log('Total requests:', requests.length);

    expect(requests.length).toBeLessThan(150);
  });

  test('images are loaded', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const images = await page.locator('img').all();
    let brokenImages = 0;

    for (const img of images) {
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      if (naturalWidth === 0) {
        brokenImages++;
      }
    }

    console.log('Broken images:', brokenImages);
    expect(brokenImages).toBe(0);
  });

  test('video element is present and has source', async ({ page }) => {
    await page.goto('/');

    const video = page.locator('video').first();
    await expect(video).toBeVisible();

    const source = await video.evaluate(el => el.src || el.querySelector('source')?.src);
    expect(source).toBeTruthy();
  });

  test('external resources use HTTPS', async ({ page }) => {
    const nonHttpsResources = [];

    page.on('request', request => {
      const url = request.url();
      if (url.startsWith('http://') && !url.includes('localhost')) {
        nonHttpsResources.push(url);
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    if (nonHttpsResources.length > 0) {
      console.log('Non-HTTPS resources:', nonHttpsResources);
    }

    expect(nonHttpsResources.length).toBe(0);
  });
});
