import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly items: Locator;
  /** Any control that holds the payable total (SUT renders an <input type=number>). */
  readonly totalInput: Locator;
  readonly totalText: Locator;
  readonly confirmButton: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    const main = page.getByRole('main');
    this.heading = page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' });
    this.items = main.getByRole('listitem');
    this.totalInput = main.getByRole('spinbutton');
    this.totalText = main.getByText(/^Tổng thanh toán:/);
    this.confirmButton = page.getByRole('button', { name: 'Xác Nhận Thanh Toán' });
    this.successHeading = page.getByRole('heading', { name: 'Thanh toán thành công!' });
  }

  item(product: string): Locator {
    return this.items.filter({ hasText: product });
  }

  async confirm() {
    await this.confirmButton.click();
  }
}
