import { test } from '@playwright/test';
import rows from '../data/fr01-register.json';
import { RegisterPage, RegisterInput } from '../pages/RegisterPage';

type Row = (typeof rows)[number];

function materialize(input: RegisterInput, unique: string): RegisterInput {
  const out: RegisterInput = {};
  for (const [k, v] of Object.entries(input)) {
    (out as Record<string, string>)[k] = typeof v === 'string' ? v.replace('{{unique}}', unique) : v;
  }
  return out;
}

test.describe('FR-01 Đăng ký tài khoản', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ page }, testInfo) => {
      // Arrange
      const unique = `a${testInfo.project.name}${Date.now()}`;
      const input = materialize(row.input as RegisterInput, unique);
      const register = new RegisterPage(page);
      await register.goto();

      // Act
      await register.fill(input);
      await register.submit();

      // Assert — chi tiết ở bước D3 theo row.expected.kind
      switch (row.expected.kind) {
        case 'success':
          break;
        case 'reject':
          break;
        case 'success-then-duplicate':
          break;
        case 'structure':
          break;
      }
    });
  }
});
