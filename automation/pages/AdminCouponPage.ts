import { Locator, Page } from '@playwright/test';

export interface CouponInput {
  code?: string;
  type?: string;
  discount?: string;
  minimum?: string;
  expiry?: string;
  uses?: string;
}

export class AdminCouponPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly code: Locator;
  readonly type: Locator;
  readonly discount: Locator;
  readonly minimum: Locator;
  readonly expiry: Locator;
  readonly uses: Locator;
  readonly createButton: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Quản lý Mã Giảm Giá' });
    this.code = page.getByPlaceholder('Mã coupon (VD: SAVE10)');
    this.type = page.locator('select');
    this.discount = page.getByPlaceholder('Giá trị % (VD: 10)');
    this.minimum = page.getByPlaceholder('Đơn tối thiểu (₫)');
    this.expiry = page.getByPlaceholder('Ngày hết hạn');
    this.uses = page.getByPlaceholder('Số lần dùng tối đa/người');
    this.createButton = page.getByRole('button', { name: 'Tạo mã' });
    this.rows = page.locator('tbody tr');
  }

  async login(email: string, password: string) {
    await this.page.goto('/');
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async openCoupons() {
    await this.page.getByText('Mã Giảm Giá').click();
    await this.heading.waitFor();
  }

  async fillForm(data: CouponInput) {
    if (data.code !== undefined) await this.code.fill(data.code);
    if (data.type !== undefined) await this.type.selectOption(data.type);
    if (data.discount !== undefined) await this.discount.fill(data.discount);
    if (data.minimum !== undefined) await this.minimum.fill(data.minimum);
    if (data.expiry !== undefined) await this.expiry.fill(data.expiry);
    if (data.uses !== undefined) await this.uses.fill(data.uses);
  }

  async submit() {
    await this.createButton.click();
  }

  row(code: string): Locator {
    return this.rows.filter({ hasText: code });
  }

  async deleteCoupon(code: string) {
    await this.row(code).getByRole('button', { name: 'Xóa' }).click();
  }
}
