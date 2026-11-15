import { test } from '@playwright/test';
import rows from '../data/fr08-checkout.json';
import { CartLine, CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { API_URL } from '../support/env';

type Row = (typeof rows)[number];

test.describe('FR-08 Checkout', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ page, request }, testInfo) => {
      // Arrange: catalog prices
      const products: { name: string; price: number }[] = await (await request.get(`${API_URL}/api/products`)).json();
      const priceOf = (name: string) => Number(products.find((p) => p.name === name)!.price);
      const cart = ((row.input as any).cart ?? []) as CartLine[];
      const expectedTotal = cart.reduce((s, l) => s + priceOf(l.product) * l.qty, 0);

      // Arrange: user
      let token: string | undefined;
      if (row.input.auth === 'user') {
        const email = `b${testInfo.project.name}${Date.now()}@example.test`;
        await request.post(`${API_URL}/api/register`, { data: { name: 'FR08 User', email, password: 'Aa1!bcdefg' } });
        token = (await (await request.post(`${API_URL}/api/login`, { data: { email, password: 'Aa1!bcdefg' } })).json()).token;
        await page.addInitScript((t) => localStorage.setItem('token', t), token!);
      }

      const cartPage = new CartPage(page);
      const checkout = new CheckoutPage(page);

      // Act + Assert theo row.expected.kind — chi tiết ở bước D3
      switch (row.expected.kind) {
        case 'guest-blocked':
        case 'checkout-success':
        case 'total-not-editable':
        case 'server-recalculates':
        case 'structure':
        case 'empty-cart':
        case 'api-unauthorized':
          break;
      }
      void cartPage; void checkout; void expectedTotal;
    });
  }
});
