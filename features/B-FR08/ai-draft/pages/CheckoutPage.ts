import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly items: Locator;
  readonly totalInput: Locator;
  readonly totalText: Locator;
  readonly confirmButton: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' });
    this.items = page.getByRole('main').getByRole('listitem');
    this.totalInput = page.getByRole('main').getByRole('spinbutton');
    this.totalText = page.getByText(/^Tổng thanh toán:/);
    this.confirmButton = page.getByRole('button', { name: 'Xác Nhận Thanh Toán' });
    this.successHeading = page.getByRole('heading', { name: 'Thanh toán thành công!' });
  }

  async confirm() {
    await this.confirmButton.click();
  }
}
