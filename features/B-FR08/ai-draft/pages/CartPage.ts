import { Locator, Page } from '@playwright/test';

export interface CartLine {
  product: string;
  qty: number;
}

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly homeLink: Locator;
  readonly heading: Locator;
  readonly emptyHeading: Locator;
  readonly rows: Locator;
  readonly checkoutButton: Locator;
  readonly subtotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('banner').getByRole('link', { name: 'Giỏ hàng' });
    this.homeLink = page.getByRole('banner').getByRole('link', { name: 'EShop' });
    this.heading = page.getByRole('heading', { name: 'Giỏ Hàng' });
    this.emptyHeading = page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' });
    this.rows = page.getByRole('table').getByRole('row');
    this.checkoutButton = page.getByRole('button', { name: 'Tiến hành thanh toán' });
    this.subtotal = page.getByText(/Tổng tạm tính/);
  }

  productCard(name: string): Locator {
    return this.page
      .locator('main div')
      .filter({ has: this.page.getByRole('heading', { level: 2, name }) })
      .last();
  }

  async openHome() {
    await this.page.goto('/');
  }

  async addProduct(line: CartLine) {
    const card = this.productCard(line.product);
    if (line.qty === 1) {
      await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
    } else {
      await card.getByRole('link', { name: 'Xem chi tiết' }).click();
      await this.page.getByRole('spinbutton').fill(String(line.qty));
      await this.page.getByRole('button', { name: 'Thêm vào giỏ hàng' }).click();
      await this.homeLink.click();
    }
  }

  async addAll(lines: CartLine[]) {
    await this.openHome();
    for (const line of lines) await this.addProduct(line);
  }

  async open() {
    await this.cartLink.click();
  }

  row(product: string): Locator {
    return this.rows.filter({ hasText: product });
  }

  async removeLine(product: string) {
    await this.row(product).getByRole('button', { name: 'Xóa' }).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
