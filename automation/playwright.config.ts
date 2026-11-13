import { defineConfig, devices } from '@playwright/test';
import { ADMIN_URL, API_URL, STUDENT_ID, WEB_URL, isoLocal } from './support/env';

// Freeze the run timestamp once in the main process; workers inherit it via env.
process.env.RUN_STARTED_AT ??= isoLocal();
const RUN_STARTED_AT = process.env.RUN_STARTED_AT;

// Label for this run (e.g. "fr01-chromium"); used in the report title and default folder.
const RUN_LABEL = process.env.RUN_LABEL ?? 'adhoc';
// Each feature x browser run writes its own report: set REPORT_DIR, e.g. reports/fr01-chromium.
const REPORT_DIR =
  process.env.REPORT_DIR ?? `reports/_scratch/${RUN_LABEL}-${RUN_STARTED_AT.replace(/[:+]/g, '')}`;

const RUN_BY = `Run by: ${STUDENT_ID}`;

export default defineConfig({
  testDir: './tests',
  outputDir: `test-results/${RUN_LABEL}`,
  fullyParallel: false,
  workers: Number(process.env.WORKERS ?? 1),
  retries: Number(process.env.RETRIES ?? 0),
  forbidOnly: !!process.env.CI,
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: REPORT_DIR,
        open: 'never',
        title: `EShop HW04 — ${RUN_LABEL} — ${RUN_BY} — ${RUN_STARTED_AT}`,
      },
    ],
    ['json', { outputFile: `${REPORT_DIR}/results.json` }],
  ],
  // Shown in the "metadata" section of the Playwright HTML report.
  metadata: {
    'Run by': STUDENT_ID,
    'Run started (ISO 8601)': RUN_STARTED_AT,
    'Run label': RUN_LABEL,
    'Web URL': WEB_URL,
    'Admin URL': ADMIN_URL,
    'API URL': API_URL,
    Host: process.env.COMPUTERNAME ?? process.env.HOSTNAME ?? 'unknown',
  },
  use: {
    baseURL: WEB_URL,
    locale: 'vi-VN',
    timezoneId: 'Asia/Saigon',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
