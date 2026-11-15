import { test } from '@playwright/test';
import rows from '../data/fr17-coupon.json';
import { AdminCouponPage, CouponInput } from '../pages/AdminCouponPage';
import { ADMIN_URL, API_URL } from '../support/env';

type Row = (typeof rows)[number];
const AUTH_FILE = 'test-results/.auth/admin.json';

test.use({ baseURL: ADMIN_URL });

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage({ baseURL: ADMIN_URL });
  const admin = new AdminCouponPage(page);
  await admin.login('admin@eshop.com', 'Admin123!');
  await page.getByRole('heading', { name: 'EShop Admin' }).waitFor();
  await page.context().storageState({ path: AUTH_FILE });
  await page.close();
});

test.describe('FR-17 Quản lý mã giảm giá', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ browser, request }, testInfo) => {
      const code = `HW4${testInfo.project.name}${Date.now()}`.toUpperCase();
      const input = { ...(row.input as CouponInput) };
      if (input.code === '{{code}}') input.code = code;

      const context = await browser.newContext({ baseURL: ADMIN_URL, storageState: AUTH_FILE });
      const page = await context.newPage();
      const admin = new AdminCouponPage(page);

      // Act + Assert theo row.expected.kind — chi tiết ở D3
      switch (row.expected.kind) {
        default:
          break;
      }
      void admin; void request; void API_URL;
      await context.close();
    });
  }
});
