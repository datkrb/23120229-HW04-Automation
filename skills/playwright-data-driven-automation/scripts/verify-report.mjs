#!/usr/bin/env node
// Verify each Playwright HTML report visibly shows "Run by: <ID>" and an ISO 8601 timestamp.
// Opens the real index.html in headless Chromium (Playwright resolved from the target project),
// reads the rendered text and saves a screenshot as evidence.
//
// Usage:
//   node verify-report.mjs --project-dir <automation> (--reports-dir reports | --report <dir> ...)
//        --student-id ID [--shots-dir <dir>]
// Exit code 1 if any report fails the check.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const a = { report: [] };
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const k = argv[i];
  const v = () => argv[++i];
  if (k === '--project-dir') a.projectDir = v();
  else if (k === '--reports-dir') a.reportsDir = v();
  else if (k === '--report') a.report.push(v());
  else if (k === '--student-id') a.studentId = v();
  else if (k === '--shots-dir') a.shotsDir = v();
  else throw new Error(`Unknown argument: ${k}`);
}
if (!a.projectDir || !a.studentId || (!a.reportsDir && a.report.length === 0)) {
  console.error('Usage: node verify-report.mjs --project-dir <dir> (--reports-dir <dir> | --report <dir>...) --student-id ID [--shots-dir <dir>]');
  process.exit(2);
}
const projectDir = path.resolve(a.projectDir);
let reports = a.report.map((r) => path.resolve(projectDir, r));
if (a.reportsDir) {
  const root = path.resolve(projectDir, a.reportsDir);
  reports.push(
    ...fs.readdirSync(root, { withFileTypes: true })
      .filter((d) => d.isDirectory() && !d.name.startsWith('_') && fs.existsSync(path.join(root, d.name, 'index.html')))
      .map((d) => path.join(root, d.name)),
  );
}
const require = createRequire(path.join(projectDir, 'package.json'));
const { chromium } = require('playwright');

const ISO = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})/;
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const RUN_BY = new RegExp(`Run by:?[ \\t]*${escapeRe(a.studentId)}`);

const browser = await chromium.launch();
const results = [];
for (const dir of reports) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto(pathToFileURL(path.join(dir, 'index.html')).href);
  await page.waitForLoadState('networkidle');
  const title = await page.title();
  const body = await page.locator('body').innerText();
  let shot = null;
  if (a.shotsDir) {
    fs.mkdirSync(path.resolve(a.shotsDir), { recursive: true });
    shot = path.resolve(a.shotsDir, `${path.basename(dir)}-report.png`);
    await page.screenshot({ path: shot, fullPage: true });
  }
  const r = {
    report: path.relative(projectDir, dir),
    title,
    runByVisible: RUN_BY.test(body),
    isoVisible: (body.match(ISO) ?? [null])[0],
    screenshot: shot,
  };
  r.ok = r.runByVisible && !!r.isoVisible;
  results.push(r);
  console.log(JSON.stringify(r));
  await page.close();
}
await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`${results.length - failed}/${results.length} reports show "Run by: ${a.studentId}" + ISO timestamp`);
process.exit(failed || results.length === 0 ? 1 : 0);
