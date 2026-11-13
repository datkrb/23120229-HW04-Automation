/**
 * FR-01 Đăng ký tài khoản — data-driven UI tests (Web :5173).
 * Data: ../data/fr01-register.json (one row = one automated TC, mapping in features/A-FR01/selection.md).
 * Oracle: SRS FR-01 / FR-21 / FR-22 and HW02 §3 (OK / REJ), never the SUT's current behaviour.
 */
import { expect, test } from '@playwright/test';
import rows from '../data/fr01-register.json';
import { RegisterField, RegisterInput, RegisterPage } from '../pages/RegisterPage';

type Row = (typeof rows)[number];
interface Expected {
  kind: 'success' | 'reject' | 'success-then-duplicate' | 'structure';
  field?: string;
  requiredLabels?: string[];
  types?: Record<'email' | 'password' | 'confirm', string>;
  h1Count?: number;
}

/** Keyword that an app error banner must mention to count as a validation signal for that field. */
const FIELD_KEYWORD: Record<RegisterField, RegExp> = {
  name: /họ tên|tên/i,
  email: /email/i,
  password: /mật khẩu/i,
  confirm: /xác nhận/i,
};

function materialize(input: RegisterInput, unique: string): RegisterInput {
  const out: RegisterInput = {};
  for (const [k, v] of Object.entries(input)) {
    if (typeof v === 'string') out[k as RegisterField] = v.replaceAll('{{unique}}', unique);
  }
  return out;
}

/** OK (FR-01): registration accepted by the backend and the user lands on the Login page. */
async function expectRegistered(register: RegisterPage) {
  const { page } = register;
  await expect(page, 'FR-01: sau khi đăng ký thành công phải chuyển tới trang Đăng nhập').toHaveURL(/\/login$/);
  await expect(page.getByRole('link', { name: 'Quên mật khẩu?' }), 'trang đích có chức năng Đăng nhập').toBeVisible();
  expect(register.registerResponses.some((r) => r.ok()), 'POST /api/register trả 2xx').toBe(true);
}

/**
 * REJ (HW02 §3): registration is not completed AND a validation signal tied to one of the wrong fields
 * is shown — native constraint validation on that input, or an app message that mentions the field.
 */
async function expectRejected(register: RegisterPage, fields: RegisterField[]) {
  const { page } = register;
  const nativeInvalid = async () => {
    const flags = await Promise.all(fields.map((f) => register.isNativelyInvalid(f)));
    return fields.filter((_, i) => flags[i]);
  };
  // Web-first wait for *some* feedback (native invalid state or app banner) instead of a fixed sleep.
  await expect
    .poll(async () => (await register.errorBanner.isVisible()) || (await nativeInvalid()).length > 0, {
      message: 'có phản hồi validation sau khi bấm Đăng Ký',
    })
    .toBe(true);

  await expect(page, 'không được chuyển sang trang Đăng nhập').toHaveURL(/\/register$/);
  expect(register.registerResponses.filter((r) => r.ok()), 'không có POST /api/register thành công').toHaveLength(0);

  const invalid = await nativeInvalid();
  if (invalid.length === 0) {
    const keyword = new RegExp(fields.map((f) => FIELD_KEYWORD[f].source).join('|'), 'i');
    await expect(register.errorBanner, `thông báo lỗi phải gắn với trường: ${fields.join(' / ')}`).toContainText(
      keyword,
    );
  }
}

test.describe('FR-01 Đăng ký tài khoản', () => {
  for (const row of rows as Row[]) {
    const expected = row.expected as Expected;

    test(`${row.id} ${row.title}`, { tag: [`@${row.type}`] }, async ({ page }, testInfo) => {
      // Arrange
      const unique = `a${testInfo.project.name}${Date.now()}r${testInfo.retry}`;
      const input = materialize(row.input as RegisterInput, unique);
      const register = new RegisterPage(page);
      await register.goto();

      try {
        if (expected.kind === 'structure') {
          // FR-01/21/22 form structure: independent checks, all reported in one run (soft assertions).
          for (const label of expected.requiredLabels ?? []) {
            const field = (['name', 'email', 'password', 'confirm'] as RegisterField[]).find((f) =>
              ({ name: 'Họ Tên', email: 'Email', password: 'Mật khẩu', confirm: 'Xác nhận mật khẩu' })[f] === label,
            )!;
            await expect.soft(register.label(field), `FR-01: có nhãn "${label}"`).toHaveCount(1);
            await expect.soft(register.label(field), `FR-22: nhãn "${label}" có dấu *`).toContainText('*', {
              timeout: 1000,
            });
          }
          await expect.soft(register.input('confirm'), 'FR-01: có ô Xác nhận mật khẩu').toHaveCount(1);
          for (const [field, type] of Object.entries(expected.types ?? {})) {
            await expect.soft(register.input(field as RegisterField), `FR-22: ô ${field} có type="${type}"`)
              .toHaveAttribute('type', type, { timeout: 1000 });
          }
          await expect.soft(page.locator('h1'), 'FR-21: trang có đúng 1 thẻ h1').toHaveCount(expected.h1Count ?? 1);
          return;
        }

        const fields = (expected.field ?? '').split('|').filter(Boolean) as RegisterField[];
        // A confirm-only oracle cannot be evaluated without the confirm control (FR-01 requires it).
        if (fields.length > 0 && fields.every((f) => f === 'confirm')) {
          await expect(register.input('confirm'), 'FR-01: phải có trường Xác nhận mật khẩu').toHaveCount(1);
        }

        // Act
        const missing = await register.fill(input);
        for (const m of missing) {
          testInfo.annotations.push({ type: 'missing-control', description: `${m}: không có ô nhập (xem A-AUTO-19)` });
        }
        await register.submit();

        // Assert
        if (expected.kind === 'success') {
          await expectRegistered(register);
        } else if (expected.kind === 'reject') {
          await expectRejected(register, fields);
        } else if (expected.kind === 'success-then-duplicate') {
          await expectRegistered(register);
          // Same email again, from a fresh form reached by real navigation.
          const again = new RegisterPage(page);
          await again.goto();
          await again.fill(input);
          await again.submit();
          await expectRejected(again, fields);
        }
      } finally {
        if (await register.errorBanner.isVisible().catch(() => false)) {
          testInfo.annotations.push({ type: 'app-message', description: await register.errorBanner.innerText() });
        }
      }
    });
  }
});
