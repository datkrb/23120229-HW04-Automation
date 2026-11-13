import { Locator, Page, Response } from '@playwright/test';

export interface RegisterInput {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

export type RegisterField = 'name' | 'email' | 'password' | 'confirm';

/** Visible label text of each field (FR-01). A trailing "*" (FR-22) is tolerated. */
const LABELS: Record<RegisterField, string> = {
  name: 'Họ Tên',
  email: 'Email',
  password: 'Mật khẩu',
  confirm: 'Xác nhận mật khẩu',
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/**
 * Page Object for /register.
 * The inputs have no programmatic label (no for/id/aria-label - see locator-inventory.md), so each input is
 * anchored by the exact visible text of the <label> in the same wrapper div.
 */
export class RegisterPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly card: Locator;
  readonly form: Locator;
  readonly submitButton: Locator;
  /** App error banner: the card's direct child div (it has no ARIA role). */
  readonly errorBanner: Locator;
  /** Every POST /api/register response seen on this page. */
  readonly registerResponses: Response[] = [];

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Đăng Ký Tài Khoản' });
    this.card = this.heading.locator('..');
    this.form = this.card.locator('form');
    this.submitButton = this.form.getByRole('button', { name: 'Đăng Ký' });
    this.errorBanner = this.card.locator(':scope > div');
    page.on('response', (r) => {
      if (r.url().endsWith('/api/register') && r.request().method() === 'POST') this.registerResponses.push(r);
    });
  }

  private labelText(field: RegisterField): RegExp {
    return new RegExp(`^\\s*${escapeRe(LABELS[field])}\\s*\\*?\\s*$`);
  }

  label(field: RegisterField): Locator {
    return this.form.locator('label').filter({ hasText: this.labelText(field) });
  }

  input(field: RegisterField): Locator {
    // The `has:` locator must not be rooted at another element (a form-rooted one never matches),
    // so it is built from the page and evaluated relative to each candidate div.
    const label = this.page.locator('label').filter({ hasText: this.labelText(field) });
    return this.form.locator('div').filter({ has: label }).locator('input');
  }

  /** Maps a visible label text from the test data back to its field (single source of truth: LABELS). */
  static fieldOfLabel(label: string): RegisterField {
    const field = (Object.keys(LABELS) as RegisterField[]).find((f) => LABELS[f] === label);
    if (!field) throw new Error(`Unknown register label in test data: ${label}`);
    return field;
  }

  async goto() {
    await this.page.goto('/register');
    await this.heading.waitFor();
  }

  async hasControl(field: RegisterField): Promise<boolean> {
    return (await this.input(field).count()) === 1;
  }

  /**
   * Fills the fields given in `input`. A field whose control does not exist is not typed anywhere else
   * (no DOM forcing); its name is returned so the test can decide whether that blocks its oracle.
   */
  async fill(input: RegisterInput): Promise<RegisterField[]> {
    const missing: RegisterField[] = [];
    for (const field of ['name', 'email', 'password', 'confirm'] as RegisterField[]) {
      const value = input[field];
      if (value === undefined) continue;
      if (!(await this.hasControl(field))) {
        missing.push(field);
        continue;
      }
      await this.input(field).fill(value);
    }
    return missing;
  }

  async submit() {
    await this.submitButton.click();
  }

  /** true when the browser's constraint validation marks the field invalid (e.g. required, type=email). */
  async isNativelyInvalid(field: RegisterField): Promise<boolean> {
    if (!(await this.hasControl(field))) return false;
    return this.input(field).evaluate((el) => !(el as HTMLInputElement).validity.valid);
  }
}
