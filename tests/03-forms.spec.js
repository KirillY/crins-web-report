const { test, expect } = require('@playwright/test');

test.describe('03 - Contact Form Tests', () => {
  test('contact form is visible', async ({ page }) => {
    await page.goto('/');

    const form = page.locator('form').first();
    await expect(form).toBeVisible();
  });

  test('form has all required fields', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('input[name="et_pb_contact_name_0"]')).toBeVisible();
    await expect(page.locator('input[name="et_pb_contact_email_0"]')).toBeVisible();
    await expect(page.locator('textarea[name="et_pb_contact_message_0"]')).toBeVisible();
  });

  test('form has submit button', async ({ page }) => {
    await page.goto('/');

    const submitButton = page.locator('button[type="submit"], input[type="submit"]').first();
    await expect(submitButton).toBeVisible();
  });

  test('form fields have placeholders', async ({ page }) => {
    await page.goto('/');

    const nameField = page.locator('input[name="et_pb_contact_name_0"]');
    await expect(nameField).toHaveAttribute('placeholder', /name/i);

    const emailField = page.locator('input[name="et_pb_contact_email_0"]');
    await expect(emailField).toHaveAttribute('placeholder', /email/i);

    const messageField = page.locator('textarea[name="et_pb_contact_message_0"]');
    await expect(messageField).toHaveAttribute('placeholder', /message/i);
  });

  test('contact information is visible', async ({ page }) => {
    await page.goto('/');

    const phone = page.getByText(/\+54 9 2215 98-4673/);
    await expect(phone).toBeVisible();

    const email = page.getByText(/info@crinsurancelife\.com/);
    await expect(email).toBeVisible();
  });
});
