import { expect, test } from '@playwright/test';
import rows from '../data/fr01-register.json';
import { RegisterInput, RegisterPage } from '../pages/RegisterPage';

type Row = (typeof rows)[number];

function materialize(input: RegisterInput, unique: string): RegisterInput {
  const out: RegisterInput = {};
  for (const [k, v] of Object.entries(input)) {
    (out as Record<string, string>)[k] = typeof v === 'string' ? v.replace('{{unique}}', unique) : v;
  }
  return out;
}

const FIELD_KEYWORDS: Record<string, RegExp> = {
  name: /họ tên|tên/i,
  email: /email/i,
  password: /mật khẩu/i,
  confirm: /xác nhận/i,
};

test.describe('FR-01 Đăng ký tài khoản', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ page }, testInfo) => {
      // Arrange
      const unique = `a${testInfo.project.name}${Date.now()}`;
      const input = materialize(row.input as RegisterInput, unique);
      const register = new RegisterPage(page);
      await register.goto();

      if (row.expected.kind === 'structure') {
        const exp = row.expected as any;
        // Pattern: soft assertions over attributes / count
        for (const label of exp.requiredLabels) {
          await expect.soft(page.locator('label', { hasText: label })).toContainText('*');
        }
        await expect.soft(register.confirmInput).toBeVisible();
        await expect.soft(register.emailInput).toHaveAttribute('type', exp.types.email);
        await expect.soft(register.passwordInput).toHaveAttribute('type', exp.types.password);
        await expect.soft(register.confirmInput).toHaveAttribute('type', exp.types.confirm);
        await expect.soft(page.locator('h1')).toHaveCount(exp.h1Count);
        return;
      }

      // Act
      await register.fill(input);
      const registerResponse = page.waitForResponse(
        (r) => r.url().endsWith('/api/register') && r.request().method() === 'POST',
      );
      await register.submit();

      // Assert
      if (row.expected.kind === 'success') {
        const res = await registerResponse;
        expect(res.ok()).toBeTruthy();
        await expect(page).toHaveURL(/\/login$/);
      } else if (row.expected.kind === 'reject') {
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/register$/);
        const field = (row.expected as any).field as string;
        await expect(register.errorBanner).toContainText(FIELD_KEYWORDS[field]);
      } else if (row.expected.kind === 'success-then-duplicate') {
        const res = await registerResponse;
        expect(res.ok()).toBeTruthy();
        await expect(page).toHaveURL(/\/login$/);
        // second attempt with the same email
        await register.goto();
        await register.fill(input);
        await register.submit();
        await expect(page).toHaveURL(/\/register$/);
        await expect(register.errorBanner).toContainText(/email/i);
      }
    });
  }
});
