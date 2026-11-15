import { Locator, Page } from '@playwright/test';

export interface CouponInput {
  code?: string;
  type?: string;
  discount?: string;
  minimum?: string;
  expiry?: string;
  uses?: string;
}

export type CouponField = 'code' | 'type' | 'discount' | 'minimum' | 'expiry' | 'uses';

/** Column order of the coupon table (FR-17 "Xem"). */
export const COUPON_COLUMNS = ['code', 'type', 'value', 'minimum', 'expiry', 'uses', 'action'] as const;

/**
 * Admin (:5174) login + "Quản lý Mã Giảm Giá". The form has no <label>s, so inputs are located by
 * placeholder inside the form. The discount placeholder depends on the selected type, hence a regex.
 */
export class AdminCouponPage {
  readonly page: Page;
  readonly loginHeading: Locator;
  readonly adminHeading: Locator;
  readonly navCoupons: Locator;
  readonly heading: Locator;
  readonly form: Locator;
  readonly fields: Record<CouponField, Locator>;
  readonly createButton: Locator;
  readonly bodyRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginHeading = page.getByRole('heading', { name: 'Admin Login' });
    this.adminHeading = page.getByRole('heading', { level: 1, name: 'EShop Admin' });
    this.navCoupons = page.getByText('Mã Giảm Giá', { exact: true });
    this.heading = page.getByRole('heading', { name: 'Quản lý Mã Giảm Giá' });
    this.form = page.getByRole('heading', { name: 'Tạo mã giảm giá mới' }).locator('..');
    this.fields = {
      code: this.form.getByPlaceholder('Mã coupon (VD: SAVE10)'),
      type: this.form.getByRole('combobox'),
      discount: this.form.getByPlaceholder(/^(Giá trị %|Số tiền) \(VD:/),
      minimum: this.form.getByPlaceholder('Đơn tối thiểu (₫)'),
      expiry: this.form.getByPlaceholder('Ngày hết hạn'),
      uses: this.form.getByPlaceholder('Số lần dùng tối đa/người'),
    };
    this.createButton = this.form.getByRole('button', { name: 'Tạo mã' });
    this.bodyRows = page.getByRole('table').getByRole('row').filter({ has: page.getByRole('button', { name: 'Xóa' }) });
  }

  async gotoLogin() {
    await this.page.goto('/');
    await this.loginHeading.waitFor();
  }

  async login(email: string, password: string) {
    await this.gotoLogin();
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  /** Full load of the admin app (already authenticated via storageState) and open the coupon tab. */
  async open() {
    await this.page.goto('/');
    await this.adminHeading.waitFor();
    await this.navCoupons.click();
    await this.heading.waitFor();
  }

  /** Fills the form in UI order; type first because it changes the discount placeholder. */
  async fillForm(data: CouponInput) {
    if (data.type !== undefined) await this.fields.type.selectOption(data.type);
    for (const f of ['code', 'discount', 'minimum', 'expiry', 'uses'] as const) {
      const v = data[f];
      if (v !== undefined) await this.fields[f].fill(v);
    }
  }

  async submit() {
    await this.createButton.click();
  }

  row(code: string): Locator {
    return this.bodyRows.filter({ has: this.page.getByRole('cell', { name: code, exact: true }) });
  }

  cell(code: string, column: (typeof COUPON_COLUMNS)[number]): Locator {
    return this.row(code).getByRole('cell').nth(COUPON_COLUMNS.indexOf(column));
  }

  async deleteCoupon(code: string) {
    await this.row(code).getByRole('button', { name: 'Xóa' }).click();
  }

  /** true when browser constraint validation marks the field invalid. */
  async isNativelyInvalid(field: CouponField): Promise<boolean> {
    return this.fields[field].evaluate((el) => !(el as HTMLInputElement).validity.valid);
  }

  /** Visible label text of a control (its <label>s or aria-label); '' when it has none. */
  async labelText(field: CouponField): Promise<string> {
    return this.fields[field].evaluate((el) => {
      const input = el as HTMLInputElement;
      const fromLabels = Array.from(input.labels ?? []).map((l) => l.textContent ?? '').join(' ');
      return `${fromLabels} ${input.getAttribute('aria-label') ?? ''}`.trim();
    });
  }
}
