/**
 * FR-17 Quản lý mã giảm giá (Admin :5174) — data-driven UI tests, plus one FR-12 API authorization check.
 * Data: ../data/fr17-coupon.json (mapping in features/C-FR17/selection.md).
 * Oracle: SRS FR-17 / FR-12 / FR-21 / FR-22 and HW02 C-TC design — never the SUT's current behaviour.
 */
import { APIRequestContext, Browser, expect, test, TestInfo } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import rows from '../data/fr17-coupon.json';
import { AdminCouponPage, COUPON_COLUMNS, CouponField, CouponInput } from '../pages/AdminCouponPage';
import { ADMIN_URL, API_URL } from '../support/env';

type Row = (typeof rows)[number];
interface Input extends CouponInput {
  auth?: 'guest' | 'user' | 'user-api';
  email?: string;
  password?: string;
  precreate?: boolean;
}
interface Expected {
  kind:
    | 'created'
    | 'rejected'
    | 'rejected-duplicate'
    | 'deleted'
    | 'access-denied'
    | 'type-options'
    | 'api-forbidden'
    | 'structure';
  field?: CouponField;
  row?: Partial<Record<(typeof COUPON_COLUMNS)[number], string>>;
  options?: string[];
  requiredFields?: CouponField[];
  h1Count?: number;
}
interface Coupon {
  id: number;
  code: string;
}

// SRS §1 demo admin account (test fixture, not a secret).
const ADMIN = { email: 'admin@eshop.com', password: 'Admin123!' };

test.use({ baseURL: ADMIN_URL });

let adminToken = '';
let authFile = '';

/** Admin login once per browser project through the real Admin Login form, saved as storageState. */
test.beforeAll(async ({ browser, request }, testInfo) => {
  authFile = path.join(testInfo.project.outputDir, '.auth', `admin-${testInfo.project.name}.json`);
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
  const context = await browser.newContext({ baseURL: ADMIN_URL });
  const admin = new AdminCouponPage(await context.newPage());
  await admin.login(ADMIN.email, ADMIN.password);
  await expect(admin.adminHeading, 'fixture: admin đăng nhập được').toBeVisible();
  await context.storageState({ path: authFile });
  await context.close();
  // Token for read-only checks and cleanup through the API.
  const res = await request.post(`${API_URL}/api/login`, { data: ADMIN });
  expect(res.ok(), 'fixture: token admin').toBe(true);
  adminToken = (await res.json()).token;
});

async function couponsWithCode(request: APIRequestContext, code: string): Promise<Coupon[]> {
  const res = await request.get(`${API_URL}/api/coupons`, { headers: { Authorization: `Bearer ${adminToken}` } });
  expect(res.ok(), 'đọc danh sách coupon (admin)').toBe(true);
  return ((await res.json()) as Coupon[]).filter((c) => c.code === code);
}

async function adminPage(browser: Browser) {
  const context = await browser.newContext({ baseURL: ADMIN_URL, storageState: authFile });
  const page = await context.newPage();
  return { context, page, admin: new AdminCouponPage(page) };
}

function uniqueCode(testInfo: TestInfo) {
  // Upper case because the form upper-cases what is typed.
  return `HW4${testInfo.project.name.slice(0, 2)}${Date.now()}R${testInfo.retry}`.toUpperCase();
}

test.describe('FR-17 Quản lý mã giảm giá', () => {
  /** Codes created by the current test; removed afterwards even when the test fails (isolation). */
  let createdCodes: string[] = [];
  test.afterEach(async ({ request }) => {
    for (const code of createdCodes) {
      for (const c of await couponsWithCode(request, code)) {
        await request.delete(`${API_URL}/api/admin/coupons/${c.id}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      }
    }
    createdCodes = [];
  });

  for (const row of rows as Row[]) {
    const expected = row.expected as Expected;

    test(`${row.id} ${row.title}`, { tag: [`@${row.type}`] }, async ({ browser, request }, testInfo) => {
      // ---------- Arrange ----------
      const code = uniqueCode(testInfo);
      const input = { ...(row.input as Input) };
      if (input.code === '{{code}}') input.code = code;
      if (input.code) createdCodes.push(input.code);

      // FR-12 at API level: a non-admin token must not create coupons.
      if (expected.kind === 'api-forbidden') {
        const login = await request.post(`${API_URL}/api/login`, { data: { email: input.email, password: input.password } });
        expect(login.ok(), 'fixture: đăng nhập user thường').toBe(true);
        const user = await login.json();
        expect(user.user.role, 'fixture: tài khoản không phải admin').not.toBe('admin');
        const res = await request.post(`${API_URL}/api/admin/coupons`, {
          headers: { Authorization: `Bearer ${user.token}` },
          data: {
            code: input.code,
            type: input.type,
            discount_value: Number(input.discount),
            min_order_amount: Number(input.minimum),
            expired_at: input.expiry,
            max_uses_per_user: Number(input.uses),
          },
        });
        expect.soft(res.ok(), `FR-12: token role=user phải bị từ chối (nhận ${res.status()})`).toBe(false);
        expect(await couponsWithCode(request, input.code!), 'không có coupon nào được tạo bởi user thường').toHaveLength(0);
        return;
      }

      // FR-12 at UI level: guest / regular user must not reach coupon management.
      if (expected.kind === 'access-denied') {
        const context = await browser.newContext({ baseURL: ADMIN_URL });
        const page = await context.newPage();
        const admin = new AdminCouponPage(page);
        const dialogs: string[] = [];
        page.on('dialog', async (d) => {
          dialogs.push(d.message());
          await d.accept();
        });
        if (input.auth === 'user') {
          await admin.login(input.email!, input.password!);
          // Wait for the outcome of the login attempt (a message or the admin shell), not a fixed time.
          await expect
            .poll(async () => dialogs.length > 0 || (await admin.adminHeading.isVisible()), { message: 'có kết quả đăng nhập' })
            .toBe(true);
        } else {
          await admin.gotoLogin();
        }
        await expect(admin.adminHeading, 'không vào được giao diện quản trị').toBeHidden();
        await expect(admin.navCoupons, 'không thấy mục Mã Giảm Giá').toHaveCount(0);
        await expect(admin.heading, 'không thấy trang quản lý coupon').toHaveCount(0);
        await expect(admin.loginHeading, 'vẫn ở màn hình đăng nhập').toBeVisible();
        await context.close();
        return;
      }

      const { context, page, admin } = await adminPage(browser);
      const dialogs: string[] = [];
      page.on('dialog', async (d) => {
        dialogs.push(d.message());
        await d.accept();
      });
      try {
        await admin.open();

        if (expected.kind === 'type-options') {
          const values = await admin.fields.type
            .locator('option')
            .evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
          expect(values, 'FR-17: type chỉ gồm percent / fixed').toEqual(expected.options);
          return;
        }

        if (expected.kind === 'structure') {
          await expect.soft(page.locator('h1'), 'FR-21: đúng 1 thẻ h1').toHaveCount(expected.h1Count ?? 1);
          for (const field of expected.requiredFields ?? []) {
            expect.soft(await admin.labelText(field), `FR-22: trường bắt buộc "${field}" có nhãn kèm *`).toContain('*');
          }
          return;
        }

        if (input.precreate) {
          // Own fixture coupon with the same code, created through the form and verified in the list.
          await admin.fillForm(input);
          await admin.submit();
          await expect(admin.row(input.code!), 'fixture: coupon tạo trước có trong danh sách').toHaveCount(1);
        }

        // ---------- Act + Assert ----------
        if (expected.kind === 'deleted') {
          await admin.deleteCoupon(input.code!);
          await expect(admin.row(input.code!), 'FR-17: coupon đã xóa không còn trong danh sách').toHaveCount(0);
          await admin.open(); // reload
          await expect(admin.row(input.code!), 'không còn sau khi tải lại').toHaveCount(0);
          expect(await couponsWithCode(request, input.code!), 'backend không còn coupon').toHaveLength(0);
          return;
        }

        const before = (await couponsWithCode(request, input.code ?? '')).length;
        const createResponse = page
          .waitForResponse((r) => r.url().endsWith('/api/admin/coupons') && r.request().method() === 'POST', {
            timeout: 5000,
          })
          .catch(() => null);
        await admin.fillForm(input);
        await admin.submit();

        if (expected.kind === 'created') {
          const res = await createResponse;
          expect(res?.ok(), 'POST tạo coupon thành công').toBe(true);
          await expect(admin.row(input.code!), 'FR-17: coupon mới hiện trong danh sách').toHaveCount(1);
          for (const [col, text] of Object.entries(expected.row ?? {})) {
            await expect(admin.cell(input.code!, col as (typeof COUPON_COLUMNS)[number]), `cột ${col}`).toHaveText(text);
          }
          await admin.open(); // reload
          await expect(admin.row(input.code!), 'vẫn còn sau khi tải lại').toHaveCount(1);
          return;
        }

        // rejected / rejected-duplicate
        const field = expected.field!;
        // Outcome of the submit: native invalid state, an app message, or a create request.
        await expect
          .poll(async () => dialogs.length > 0 || (await admin.isNativelyInvalid(field)) || (await createResponse) !== null, {
            message: 'có phản hồi sau khi bấm Tạo mã',
          })
          .toBe(true);
        const res = await createResponse;
        const after = await couponsWithCode(request, input.code ?? '');
        if (expected.kind === 'rejected-duplicate') {
          expect(after, 'FR-17: chỉ một coupon mang mã này').toHaveLength(before);
          expect(res?.ok() ?? false, 'request tạo mã trùng không được thành công').toBe(false);
        } else {
          expect(res?.ok() ?? false, `dữ liệu sai (${field}) không được tạo thành công`).toBe(false);
          expect(after, 'không có bản ghi mới').toHaveLength(0);
          if (input.code) await expect(admin.row(input.code), 'không có dòng mới trong danh sách').toHaveCount(0);
        }
        // A rejection must carry a signal: native validation of the field or an app message.
        const native = await admin.isNativelyInvalid(field);
        expect(native || dialogs.length > 0, `có tín hiệu từ chối (native "${field}" hoặc thông báo)`).toBe(true);
      } finally {
        if (dialogs.length) testInfo.annotations.push({ type: 'app-message', description: dialogs.join(' | ') });
        await context.close();
      }
    });
  }
});
