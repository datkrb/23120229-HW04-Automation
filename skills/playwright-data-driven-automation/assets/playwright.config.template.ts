// Template: copy to <automation>/playwright.config.ts and adjust defaults.
// Every run shows "Run by: <STUDENT_ID>" + an ISO 8601 timestamp (taken at run start) in the
// HTML report title and metadata, and writes results.json next to index.html for run-matrix.mjs.
import { defineConfig, devices } from '@playwright/test';

const STUDENT_ID = process.env.STUDENT_ID ?? 'CHANGE_ME';
const WEB_URL = process.env.WEB_URL ?? 'http://localhost:5173';
const ADMIN_URL = process.env.ADMIN_URL ?? 'http://localhost:5174';
const API_URL = process.env.API_URL ?? 'http://localhost:3000';

function isoLocal(d = new Date()): string {
  const p = (n: number) => String(Math.trunc(Math.abs(n))).padStart(2, '0');
  const off = -d.getTimezoneOffset();
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}${off >= 0 ? '+' : '-'}${p(off / 60)}:${p(off % 60)}`;
}

// Frozen once in the main process; worker processes inherit it through env.
process.env.RUN_STARTED_AT ??= isoLocal();
const RUN_STARTED_AT = process.env.RUN_STARTED_AT;
const RUN_LABEL = process.env.RUN_LABEL ?? 'adhoc';
const REPORT_DIR = process.env.REPORT_DIR ?? `reports/_scratch/${RUN_LABEL}-${RUN_STARTED_AT.replace(/[:+]/g, '')}`;

export default defineConfig({
  testDir: './tests',
  outputDir: `test-results/${RUN_LABEL}`,
  workers: Number(process.env.WORKERS ?? 1),
  retries: Number(process.env.RETRIES ?? 0),
  timeout: 30_000,
  expect: { timeout: 7_000 },
  reporter: [
    ['list'],
    ['html', { outputFolder: REPORT_DIR, open: 'never', title: `${RUN_LABEL} — Run by: ${STUDENT_ID} — ${RUN_STARTED_AT}` }],
    ['json', { outputFile: `${REPORT_DIR}/results.json` }],
  ],
  metadata: {
    'Run by': STUDENT_ID,
    'Run started (ISO 8601)': RUN_STARTED_AT,
    'Run label': RUN_LABEL,
    'Web URL': WEB_URL,
    'Admin URL': ADMIN_URL,
    'API URL': API_URL,
  },
  use: { baseURL: WEB_URL, screenshot: 'only-on-failure', trace: 'retain-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
