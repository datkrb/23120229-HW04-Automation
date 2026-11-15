/**
 * FR-08 Checkout — data-driven UI tests (Web :5173).
 * Data: ../data/fr08-checkout.json (one row = one automated TC; mapping in features/B-FR08/selection.md).
 * Oracle: SRS FR-08 / FR-21 and HW02 B-TC design. Expected totals are computed from catalog prices at run
 * time (GET /api/products) and the row's quantities — never read from the UI under test.
 */
import { APIRequestContext, expect, Response, test, TestInfo } from '@playwright/test';
import rows from '../data/fr08-checkout.json';
import { CartLine, CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { API_URL } from '../support/env';

type Row = (typeof rows)[number];
interface Input {
  auth: 'user' | 'guest' | 'none-api';
  cart?: CartLine[];
  updateTo?: CartLine[];
  typeTotal?: string;
  tamperTotal?: number;
  body?: Record<string, unknown>;
}
interface Expected {
  kind:
    | 'guest-blocked'
    | 'checkout-success'
    | 'total-not-editable'
    | 'server-recalculates'
    | 'structure'
    | 'empty-cart'
    | 'api-unauthorized';
  cartClearedAfter?: boolean;
  h1Count?: number;
}
interface Order {
  id: number;
  total_amount: number | string;
}

/** Fixture: a fresh user per test (no shared cart/orders across browsers), logged in via API. */
async function createUser(request: APIRequestContext, testInfo: TestInfo) {
  const email = `fr08-${testInfo.project.name}-${Date.now()}-${testInfo.retry}@example.test`;
  const password = 'Aa1!bcdefg';
  const reg = await request.post(`${API_URL}/api/register`, { data: { name: 'FR08 User', email, password } });
  expect(reg.ok(), 'fixture: tạo user qua API').toBe(true);
  const login = await request.post(`${API_URL}/api/login`, { data: { email, password } });
  expect(login.ok(), 'fixture: đăng nhập user qua API').toBe(true);
  return (await login.json()).token as string;
}

async function myOrders(request: APIRequestContext, token: string): Promise<Order[]> {
  const res = await request.get(`${API_URL}/api/orders/my-orders`, { headers: { Authorization: `Bearer ${token}` } });
  expect(res.ok(), 'đọc đơn hàng của user test').toBe(true);
  return res.json();
}

/** Thousands-grouped amount in any common separator (FR-21), e.g. 8.000.000 / 8,000,000. */
function amountPattern(n: number): RegExp {
  const grouped = Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '[.,\\s\\u202f]');
  return new RegExp(`${n < 0 ? '-' : ''}${grouped}\\s*₫`);
}

test.describe('FR-08 Checkout', () => {
  for (const row of rows as Row[]) {
    const input = row.input as Input;
    const expected = row.expected as Expected;

    test(`${row.id} ${row.title}`, { tag: [`@${row.type}`] }, async ({ page, request }, testInfo) => {
      // ---------- Arrange ----------
      if (expected.kind === 'api-unauthorized') {
        // API complement of B-AUTO-01: the server itself must refuse an unauthenticated checkout.
        const res = await request.post(`${API_URL}/api/checkout`, { data: input.body });
        expect(res.ok(), `POST /api/checkout không token phải bị từ chối (nhận ${res.status()})`).toBe(false);
        expect(res.status(), 'mã lỗi phía client (4xx), không phải lỗi server').toBeGreaterThanOrEqual(400);
        expect(res.status()).toBeLessThan(500);
        return;
      }

      const catalog: { name: string; price: number | string }[] = await (
        await request.get(`${API_URL}/api/products`)
      ).json();
      const priceOf = (name: string) => {
        const p = catalog.find((c) => c.name === name);
        expect(p, `fixture: sản phẩm "${name}" có trong catalog`).toBeTruthy();
        return Number(p!.price);
      };
      const cart = input.cart ?? [];
      const finalCart = input.updateTo ?? cart;
      const expectedTotal = finalCart.reduce((s, l) => s + priceOf(l.product) * l.qty, 0);

      const token = input.auth === 'user' ? await createUser(request, testInfo) : undefined;
      if (token) await page.addInitScript((t) => localStorage.setItem('token', t), token);

      const dialogs: string[] = [];
      page.on('dialog', async (d) => {
        dialogs.push(d.message());
        await d.accept();
      });
      const checkoutResponses: Response[] = [];
      page.on('response', (r) => {
        if (r.url().endsWith('/api/checkout') && r.request().method() === 'POST') checkoutResponses.push(r);
      });

      const cartPage = new CartPage(page);
      const checkout = new CheckoutPage(page);

      await cartPage.start();
      if (token) await expect(page.getByRole('button', { name: 'Thoát' }), 'fixture: đã đăng nhập').toBeVisible();
      await cartPage.addLines(cart, testInfo);
      await cartPage.open();
      if (input.updateTo) {
        // FR-08 B-TC-004: change the cart, then checkout must use the updated cart.
        for (const line of cart) await cartPage.removeLine(line.product);
        await cartPage.goHome();
        await cartPage.addLines(input.updateTo, testInfo);
        await cartPage.open();
      }

      // Fixture check: the cart really is the one the row describes (otherwise the test is not about FR-08).
      await expect(cartPage.bodyRows, 'fixture: số dòng giỏ').toHaveCount(finalCart.length);
      for (const line of finalCart) {
        await expect(cartPage.row(line.product).getByRole('cell').nth(2), `fixture: số lượng ${line.product}`).toHaveText(
          String(line.qty),
        );
      }

      // ---------- Act + Assert ----------
      if (expected.kind === 'empty-cart') {
        await expect(cartPage.emptyHeading).toBeVisible();
        await expect(cartPage.checkoutButton, 'giỏ rỗng không cho tiến hành thanh toán').toHaveCount(0);
        return;
      }

      if (expected.kind === 'guest-blocked') {
        await cartPage.proceedToCheckout();
        // Wait for the outcome of the click (a message or a navigation), whatever form it takes.
        await expect.poll(() => dialogs.length > 0 || !page.url().endsWith('/cart'), { message: 'có phản hồi' }).toBe(true);
        // If a guest can still reach the confirm button, try to pay: it must not succeed.
        if (await checkout.confirmButton.isVisible()) await checkout.confirm();
        await expect(checkout.successHeading, 'guest không được thanh toán thành công').toBeHidden();
        expect(checkoutResponses.filter((r) => r.ok()), 'không có POST /api/checkout thành công').toHaveLength(0);
        return;
      }

      await cartPage.proceedToCheckout();
      await expect(checkout.heading).toBeVisible();

      // FR-08: the checkout shows every ordered line with its quantity.
      await expect(checkout.items).toHaveCount(finalCart.length);
      for (const line of finalCart) {
        await expect(checkout.item(line.product)).toContainText(new RegExp(`x\\s*${line.qty}\\b`));
      }
      // FR-08: payable total is computed from the cart.
      await expect(checkout.totalText, `tổng = Σ giá × số lượng = ${expectedTotal}`).toContainText(
        amountPattern(expectedTotal),
      );

      if (expected.kind === 'structure') {
        await expect.soft(page.locator('h1'), 'FR-21: trang có đúng 1 thẻ h1').toHaveCount(expected.h1Count ?? 1);
        await expect.soft(checkout.totalText, 'FR-21: ₫ + phân cách hàng nghìn').toContainText(/\d{1,3}([.,\s]\d{3})+\s*₫/);
        await expect.soft(checkout.items.first(), 'FR-21: thành tiền dòng có ₫ + phân cách').toContainText(
          /\d{1,3}([.,\s]\d{3})+\s*₫/,
        );
        return;
      }

      if (expected.kind === 'total-not-editable') {
        // A user must not be able to change the payable total directly (FR-08).
        await expect.soft(checkout.totalInput, 'không có ô tổng cho phép sửa').not.toBeEditable({ timeout: 1500 });
        if ((await checkout.totalInput.count()) > 0 && (await checkout.totalInput.isEditable())) {
          await checkout.totalInput.fill(input.typeTotal ?? '1'); // ordinary typing, no DOM forcing
        }
        await expect(checkout.totalText, 'tổng vẫn tự tính từ giỏ sau khi người dùng thử sửa').toContainText(
          amountPattern(expectedTotal),
        );
        return;
      }

      if (expected.kind === 'server-recalculates') {
        // B-TC-006/007: change only total_amount of the request the Web sends for this click.
        await page.route('**/api/checkout', async (route) => {
          if (route.request().method() !== 'POST') return route.continue();
          const body = route.request().postDataJSON();
          testInfo.annotations.push({
            type: 'tamper',
            description: `total_amount ${body.total_amount} → ${input.tamperTotal}`,
          });
          await route.continue({ postData: JSON.stringify({ ...body, total_amount: input.tamperTotal }) });
        });
      }

      await checkout.confirm();
      // Outcome: success view, or an error message (alert) from the SUT.
      await expect
        .poll(async () => dialogs.length > 0 || (await checkout.successHeading.isVisible()), {
          message: 'có kết quả thanh toán',
        })
        .toBe(true);
      const orders = await myOrders(request, token!);

      if (expected.kind === 'server-recalculates') {
        // Accepting the client value is the violation; a rejection or the cart total both satisfy FR-08.
        const totals = orders.map((o) => Number(o.total_amount));
        expect(totals, `backend không được lưu total_amount client (${input.tamperTotal})`).not.toContain(
          input.tamperTotal,
        );
        for (const t of totals) expect(t, 'đơn (nếu tạo) phải có tổng tính lại từ giỏ').toBe(expectedTotal);
        return;
      }

      // checkout-success
      await expect(checkout.successHeading).toBeVisible();
      expect(dialogs, 'không có thông báo lỗi').toHaveLength(0);
      expect(orders, 'đúng 1 đơn được tạo').toHaveLength(1);
      expect(Number(orders[0].total_amount), 'tổng đơn lưu ở backend = tổng giỏ').toBe(expectedTotal);

      if (expected.cartClearedAfter) {
        await cartPage.open();
        await expect(cartPage.emptyHeading, 'FR-08: sau thanh toán thành công giỏ được xóa').toBeVisible();
      }
    });
  }
});
