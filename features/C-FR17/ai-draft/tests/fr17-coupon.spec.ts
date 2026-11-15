import { expect, test } from '@playwright/test';
import rows from '../data/fr17-coupon.json';
import { AdminCouponPage, CouponInput } from '../pages/AdminCouponPage';
import { ADMIN_URL, API_URL } from '../support/env';

type Row = (typeof rows)[number];
const AUTH_FILE = 'test-results/.auth/admin.json';

test.use({ baseURL: ADMIN_URL });

let adminToken = '';

test.beforeAll(async ({ browser, request }) => {
  const page = await browser.newPage({ baseURL: ADMIN_URL });
  const admin = new AdminCouponPage(page);
  await admin.login('admin@eshop.com', 'Admin123!');
  await page.getByRole('heading', { name: 'EShop Admin' }).waitFor();
  await page.context().storageState({ path: AUTH_FILE });
  await page.close();
  const res = await request.post(`${API_URL}/api/login`, { data: { email: 'admin@eshop.com', password: 'Admin123!' } });
  adminToken = (await res.json()).token;
});

test.describe('FR-17 Quản lý mã giảm giá', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ browser, request }, testInfo) => {
      const code = `HW4${testInfo.project.name}${Date.now()}`.toUpperCase();
      const input = { ...(row.input as any) };
      if (input.code === '{{code}}') input.code = code;
      const expected = row.expected as any;

      if (expected.kind === 'api-forbidden') {
        const login = await request.post(`${API_URL}/api/login`, { data: { email: input.email, password: input.password } });
        const userToken = (await login.json()).token;
        const res = await request.post(`${API_URL}/api/admin/coupons`, {
          headers: { Authorization: `Bearer ${userToken}` },
          data: {
            code: input.code,
            type: input.type,
            discount_value: Number(input.discount),
            min_order_amount: Number(input.minimum),
            expired_at: input.expiry,
            max_uses_per_user: Number(input.uses),
          },
        });
        expect(res.status()).toBe(403);
        return;
      }

      if (expected.kind === 'access-denied') {
        const context = await browser.newContext({ baseURL: ADMIN_URL });
        const page = await context.newPage();
        if (input.auth === 'user') {
          const admin = new AdminCouponPage(page);
          page.on('dialog', (d) => d.accept());
          await admin.login(input.email, input.password);
        } else {
          await page.goto('/');
        }
        await expect(page.getByRole('heading', { name: 'Quản lý Mã Giảm Giá' })).not.toBeVisible();
        await expect(page.getByRole('heading', { name: 'EShop Admin' })).not.toBeVisible();
        await context.close();
        return;
      }

      const context = await browser.newContext({ baseURL: ADMIN_URL, storageState: AUTH_FILE });
      const page = await context.newPage();
      const admin = new AdminCouponPage(page);
      await page.goto('/');
      await admin.openCoupons();

      if (expected.kind === 'type-options') {
        const values = await admin.type.locator('option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
        expect(values).toEqual(expected.options);
        await context.close();
        return;
      }

      if (expected.kind === 'structure') {
        await expect.soft(page.locator('h1')).toHaveCount(expected.h1Count);
        for (const field of expected.requiredFields) {
          await expect.soft(page.locator('label', { hasText: '*' }).filter({ hasText: field })).toHaveCount(1);
        }
        await context.close();
        return;
      }

      if (input.precreate) {
        await admin.fillForm(input);
        await admin.submit();
        await expect(admin.row(input.code)).toBeVisible();
      }

      if (expected.kind === 'deleted') {
        await admin.deleteCoupon(input.code);
        await expect(admin.row(input.code)).toHaveCount(0);
        await page.reload();
        await admin.openCoupons();
        await expect(admin.row(input.code)).toHaveCount(0);
        await context.close();
        return;
      }

      page.on('dialog', (d) => d.accept());
      await admin.fillForm(input);
      await admin.submit();

      if (expected.kind === 'created') {
        const row = admin.row(input.code);
        await expect(row).toBeVisible();
        await expect(row).toContainText(expected.row.type);
        await expect(row).toContainText(expected.row.value);
        await expect(row).toContainText(expected.row.expiry);
        await expect(row).toContainText(expected.row.uses);
        await page.reload();
        await admin.openCoupons();
        await expect(admin.row(input.code)).toBeVisible();
      } else {
        await page.waitForTimeout(1000);
        const list = await (await request.get(`${API_URL}/api/coupons`, { headers: { Authorization: `Bearer ${adminToken}` } })).json();
        const matches = list.filter((c: any) => c.code === input.code);
        expect(matches.length).toBe(expected.kind === 'rejected-duplicate' ? 1 : 0);
      }

      // cleanup
      const list = await (await request.get(`${API_URL}/api/coupons`, { headers: { Authorization: `Bearer ${adminToken}` } })).json();
      for (const c of list.filter((c: any) => c.code === input.code)) {
        await request.delete(`${API_URL}/api/admin/coupons/${c.id}`, { headers: { Authorization: `Bearer ${adminToken}` } });
      }
      await context.close();
    });
  }
});
