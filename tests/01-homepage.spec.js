const { test, expect } = require('@playwright/test');

test.describe('Homepage Basic Tests', () => {
  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/');

    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(/CRINSURANCE/i);
  });

  test('hero section is visible', async ({ page }) => {
    await page.goto('/');

    const heroText = page.getByText(/HELPING.*EMBRYOLOGIST.*BEAT THE ODDS/i);
    await expect(heroText).toBeVisible();
  });

  test('logo is visible', async ({ page }) => {
    await page.goto('/');

    const logo = page.locator('img[src*="CrinsuranceWeb-Logo"]').first();
    await expect(logo).toBeVisible();
  });
});
