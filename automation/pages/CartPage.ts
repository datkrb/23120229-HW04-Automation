import { expect, Locator, Page, TestInfo } from '@playwright/test';

export interface CartLine {
  product: string;
  qty: number;
}

/**
 * Home + product detail + cart views. The cart lives only in client (React) state, so after the first
 * page load every move must use in-app links; page.goto/reload would silently empty the cart.
 */
export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly homeLink: Locator;
  readonly homeHeading: Locator;
  readonly heading: Locator;
  readonly emptyHeading: Locator;
  readonly bodyRows: Locator;
  readonly checkoutButton: Locator;
  readonly subtotal: Locator;

  constructor(page: Page) {
    this.page = page;
    const banner = page.getByRole('banner');
    this.cartLink = banner.getByRole('link', { name: 'Giỏ hàng' });
    this.homeLink = banner.getByRole('link', { name: 'EShop' });
    this.homeHeading = page.getByRole('heading', { name: 'Danh sách sản phẩm' });
    this.heading = page.getByRole('heading', { name: 'Giỏ Hàng', exact: true });
    this.emptyHeading = page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' });
    // data rows only (the header row has no "Xóa" button)
    this.bodyRows = page.getByRole('table').getByRole('row').filter({ has: page.getByRole('button', { name: 'Xóa' }) });
    this.checkoutButton = page.getByRole('button', { name: 'Tiến hành thanh toán' });
    this.subtotal = page.getByText(/Tổng tạm tính/);
  }

  productCard(name: string): Locator {
    // innermost card div that contains the product's h2
    return this.page
      .getByRole('main')
      .locator('div')
      .filter({ has: this.page.getByRole('heading', { level: 2, name, exact: true }) })
      .last();
  }

  /** First (and only) full page load of a test. */
  async start() {
    await this.page.goto('/');
    await this.homeHeading.waitFor();
  }

  async goHome() {
    await this.homeLink.click();
    await this.homeHeading.waitFor();
  }

  /**
   * Adds one cart line through the UI (FR-06/07 fixture).
   * qty 1: home quick-add. qty > 1: product detail quantity box. On the detail page the first click on
   * "Thêm vào giỏ hàng" is ignored by the SUT (known FR-06/07 defect, issue #21), so the fixture clicks
   * until the button confirms "Đã thêm" (at most twice) and records an annotation.
   */
  async addLine(line: CartLine, testInfo?: TestInfo) {
    const card = this.productCard(line.product);
    if (line.qty === 1) {
      await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
      return;
    }
    await card.getByRole('link', { name: 'Xem chi tiết' }).click();
    await this.page.getByRole('heading', { level: 1, name: line.product }).waitFor();
    await this.page.getByRole('spinbutton').fill(String(line.qty));
    const add = this.page.getByRole('button', { name: /^(Thêm vào giỏ hàng|Đã thêm)$/ });
    for (let attempt = 1; attempt <= 2; attempt++) {
      await add.click();
      try {
        await expect(add).toHaveText('Đã thêm', { timeout: 1500 });
        if (attempt > 1) {
          testInfo?.annotations.push({
            type: 'fixture-workaround',
            description: `${line.product}: lần bấm đầu "Thêm vào giỏ hàng" không thêm (issue #21), bấm lại`,
          });
        }
        break;
      } catch (e) {
        if (attempt === 2) throw e;
      }
    }
    await this.goHome();
  }

  /** Builds the cart from the home page; assumes the home page is displayed. */
  async addLines(lines: CartLine[], testInfo?: TestInfo) {
    for (const line of lines) await this.addLine(line, testInfo);
  }

  async open() {
    await this.cartLink.click();
    await expect(this.heading.or(this.emptyHeading)).toBeVisible();
  }

  row(product: string): Locator {
    return this.bodyRows.filter({ has: this.page.getByRole('cell', { name: product, exact: true }) });
  }

  async removeLine(product: string) {
    await this.row(product).getByRole('button', { name: 'Xóa' }).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}
