import { expect, test } from '@playwright/test';
import rows from '../data/fr08-checkout.json';
import { CartLine, CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { API_URL } from '../support/env';

type Row = (typeof rows)[number];

const formatVnd = (n: number) => n.toLocaleString('vi-VN');

test.describe('FR-08 Checkout', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ page, request }, testInfo) => {
      const input = row.input as any;
      const expected = row.expected as any;

      // Arrange: catalog prices
      const products: { name: string; price: number }[] = await (await request.get(`${API_URL}/api/products`)).json();
      const priceOf = (name: string) => Number(products.find((p) => p.name === name)!.price);
      const cart = (input.cart ?? []) as CartLine[];
      const finalCart = (input.updateTo ?? cart) as CartLine[];
      const expectedTotal = finalCart.reduce((s, l) => s + priceOf(l.product) * l.qty, 0);

      // Arrange: user
      let token: string | undefined;
      if (input.auth === 'user') {
        const email = `b${testInfo.project.name}${Date.now()}@example.test`;
        await request.post(`${API_URL}/api/register`, { data: { name: 'FR08 User', email, password: 'Aa1!bcdefg' } });
        token = (await (await request.post(`${API_URL}/api/login`, { data: { email, password: 'Aa1!bcdefg' } })).json()).token;
        await page.addInitScript((t) => localStorage.setItem('token', t), token!);
      }

      const cartPage = new CartPage(page);
      const checkout = new CheckoutPage(page);

      if (expected.kind === 'api-unauthorized') {
        const res = await request.post(`${API_URL}/api/checkout`, { data: input.body });
        expect(res.status()).toBe(401);
        return;
      }

      // Act: build cart via UI
      await cartPage.addAll(cart);
      await cartPage.open();

      if (expected.kind === 'empty-cart') {
        await expect(cartPage.emptyHeading).toBeVisible();
        await expect(cartPage.checkoutButton).toHaveCount(0);
        return;
      }

      if (input.updateTo) {
        await cartPage.removeLine(cart[0].product);
        await cartPage.addAll(input.updateTo);
        await cartPage.open();
      }

      if (expected.kind === 'guest-blocked') {
        page.on('dialog', (d) => d.accept());
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/\/login/);
        await expect(checkout.successHeading).toHaveCount(0);
        return;
      }

      await cartPage.proceedToCheckout();
      await expect(checkout.heading).toBeVisible();

      // Assert: list + total
      await expect(checkout.items).toHaveCount(finalCart.length);
      for (const line of finalCart) {
        await expect(checkout.items.filter({ hasText: line.product })).toContainText(`x ${line.qty}`);
      }
      await expect(checkout.totalText).toContainText(formatVnd(expectedTotal));

      if (expected.kind === 'structure') {
        await expect(page.locator('h1')).toHaveCount(expected.h1Count);
        await expect(checkout.totalText).toContainText('₫');
        return;
      }

      if (expected.kind === 'total-not-editable') {
        await expect(checkout.totalInput).not.toBeEditable();
        return;
      }

      if (expected.kind === 'server-recalculates') {
        await page.route('**/api/checkout', async (route) => {
          const body = route.request().postDataJSON();
          body.total_amount = input.tamperTotal;
          await route.continue({ postData: JSON.stringify(body) });
        });
      }

      await checkout.confirm();
      await expect(checkout.successHeading).toBeVisible();

      const orders = await (
        await request.get(`${API_URL}/api/orders/my-orders`, { headers: { Authorization: `Bearer ${token}` } })
      ).json();
      expect(orders[0].total_amount).toBe(expectedTotal);

      if (expected.cartClearedAfter) {
        await cartPage.open();
        await expect(cartPage.emptyHeading).toBeVisible();
      }
    });
  }
});
