const { test, expect } = require('@playwright/test');

test.describe('04 - Accessibility Tests', () => {
  test('page has language attribute', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    await expect(html).toHaveAttribute('lang');
  });

  test('images should have alt attributes', async ({ page }) => {
    await page.goto('/');

    const images = await page.locator('img').all();
    const imagesWithoutAlt = [];

    for (const img of images) {
      const alt = await img.getAttribute('alt');
      const src = await img.getAttribute('src');

      if (alt === null || alt === '') {
        imagesWithoutAlt.push(src);
      }
    }

    if (imagesWithoutAlt.length > 0) {
      console.log('Images without alt text:', imagesWithoutAlt.length);
      console.log('First few:', imagesWithoutAlt.slice(0, 5));
    }

    expect(imagesWithoutAlt.length).toBe(0);
  });

  test('heading hierarchy starts with h1', async ({ page }) => {
    await page.goto('/');

    const h1Count = await page.locator('h1').count();

    expect(h1Count).toBeGreaterThan(0);
  });

  test('links have discernible text', async ({ page }) => {
    await page.goto('/');

    const links = await page.locator('a').all();
    const linksWithoutText = [];

    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');

      if ((!text || text.trim() === '') && !ariaLabel) {
        const href = await link.getAttribute('href');
        linksWithoutText.push(href);
      }
    }

    if (linksWithoutText.length > 0) {
      console.log('Links without text:', linksWithoutText.length);
    }

    expect(linksWithoutText.length).toBeLessThan(5);
  });

  test('form inputs have labels or placeholders', async ({ page }) => {
    await page.goto('/');

    const inputs = await page.locator('input[type="text"], input[type="email"], textarea').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const placeholder = await input.getAttribute('placeholder');

      const hasLabel = id ? await page.locator(`label[for="${id}"]`).count() > 0 : false;

      expect(hasLabel || placeholder).toBeTruthy();
    }
  });
});
