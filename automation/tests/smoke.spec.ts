/**
 * Infrastructure smoke check only (HW04 P00). NOT one of the >=12 feature test cases.
 * Verifies that the Web storefront and the Admin login page load in every browser project.
 */
import { expect, test } from '@playwright/test';
import { ADMIN_URL, WEB_URL } from '../support/env';

test.describe('@smoke infrastructure', () => {
  test('web home page loads', async ({ page }) => {
    const response = await page.goto(WEB_URL);
    expect(response?.status()).toBe(200);
    await expect(page.locator('#root')).not.toBeEmpty();
  });

  test('admin login page loads', async ({ page }) => {
    const response = await page.goto(ADMIN_URL);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
    await expect(page.getByPlaceholder('Email')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });
});
