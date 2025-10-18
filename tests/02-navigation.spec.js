const { test, expect } = require('@playwright/test');

test.describe('02 - Navigation Tests', () => {
  test('main navigation links are present', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: /ARDI/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /ABOUT US/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /CONTACT/i }).first()).toBeVisible();
  });

  test('ARDI navigation link scrolls to section', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /^ARDI$/i }).first().click();
    await page.waitForTimeout(1000);

    const ardiSection = page.getByText(/WHAT IS THE ARDI/i);
    await expect(ardiSection).toBeInViewport();
  });

  test('ABOUT US navigation link scrolls to section', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /ABOUT US/i }).first().click();
    await page.waitForTimeout(1000);

    const aboutSection = page.getByText(/Fertility is a probability game/i);
    await expect(aboutSection).toBeInViewport();
  });

  test('CONTACT navigation link scrolls to section', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('link', { name: /CONTACT/i }).first().click();
    await page.waitForTimeout(1000);

    const contactForm = page.locator('form');
    await expect(contactForm).toBeInViewport();
  });

  test('external links open in new tab', async ({ page, context }) => {
    await page.goto('/');

    const linkedInLink = page.locator('a[href*="linkedin"]').first();
    await expect(linkedInLink).toHaveAttribute('target', '_blank');

    const emailLink = page.locator('a[href^="mailto"]').first();
    await expect(emailLink).toHaveAttribute('target', '_blank');
  });
});
