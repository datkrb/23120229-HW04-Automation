import { Locator, Page } from '@playwright/test';

export interface RegisterInput {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

export class RegisterPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly card: Locator;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmInput: Locator;
  readonly submitButton: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Đăng Ký Tài Khoản' });
    this.card = this.heading.locator('..');
    this.form = this.card.locator('form');
    this.nameInput = this.fieldByLabel('Họ Tên');
    this.emailInput = this.fieldByLabel('Email');
    this.passwordInput = this.fieldByLabel('Mật khẩu');
    this.confirmInput = this.fieldByLabel('Xác nhận mật khẩu');
    this.submitButton = page.getByRole('button', { name: 'Đăng Ký' });
    this.errorBanner = this.card.locator(':scope > div');
  }

  private fieldByLabel(label: string): Locator {
    return this.form
      .locator('div')
      .filter({ has: this.page.locator('label', { hasText: label }) })
      .locator('input');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async fill(input: RegisterInput) {
    if (input.name !== undefined) await this.nameInput.fill(input.name);
    if (input.email !== undefined) await this.emailInput.fill(input.email);
    if (input.password !== undefined) await this.passwordInput.fill(input.password);
    if (input.confirm !== undefined) await this.confirmInput.fill(input.confirm);
  }

  async submit() {
    await this.submitButton.click();
  }
}
