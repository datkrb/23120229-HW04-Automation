#!/usr/bin/env node
// Static check of spec files for data-driven rules and assertion-pattern variety.
// Heuristic only: it reports candidates for a human to confirm, it does not prove compliance.
//
// Usage: node check-data-driven.mjs <spec file or dir> [...] [--ignore <substring>] [--min-patterns 3] [--json]
// Exit 1 if an inline data array/object is found, a spec loads no data file, or the suite uses
// fewer assertion patterns than --min-patterns.
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const targets = [];
const ignore = [];
let minPatterns = 3;
let asJson = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--ignore') ignore.push(args[++i]);
  else if (args[i] === '--min-patterns') minPatterns = Number(args[++i]);
  else if (args[i] === '--json') asJson = true;
  else targets.push(args[i]);
}
if (!targets.length) {
  console.error('Usage: node check-data-driven.mjs <spec file|dir>... [--ignore substr] [--min-patterns 3] [--json]');
  process.exit(2);
}

function walk(p) {
  const st = fs.statSync(p);
  if (st.isFile()) return [p];
  return fs.readdirSync(p).flatMap((n) => (n === 'node_modules' ? [] : walk(path.join(p, n))));
}
const files = targets.flatMap(walk)
  .filter((f) => /\.(spec|test)\.[cm]?[jt]s$/.test(f))
  .filter((f) => !ignore.some((s) => f.replace(/\\/g, '/').includes(s)));

// Assertion pattern families (matcher -> family)
const FAMILIES = {
  'web-first content': /\.(toHaveText|toContainText|toHaveValue|toHaveValues)\(/,
  'visibility/state': /\.(toBeVisible|toBeHidden|toBeEnabled|toBeDisabled|toBeEditable|toBeChecked|toBeFocused|toBeAttached|toBeEmpty)\(/,
  'url/title': /\.(toHaveURL|toHaveTitle)\(/,
  count: /\.toHaveCount\(/,
  'attribute/css/validity': /\.(toHaveAttribute|toHaveClass|toHaveCSS|toHaveJSProperty|toHaveAccessibleName)\(|validity|checkValidity|validationMessage/,
  'response/api': /waitForResponse|request\.(get|post|put|delete|fetch)\(|\.status\(\)|toBeOK\(/,
  soft: /expect\.soft\(/,
  'poll/generic value': /expect\.poll\(|\.(toBe|toEqual|toBeCloseTo|toBeGreaterThan|toBeLessThan|toMatch|toMatchObject)\(/,
  screenshot: /toHaveScreenshot\(|toMatchAriaSnapshot\(/,
};
const DATA_IMPORT = /(import\s+[\w{}\s,*]+\s+from\s+['"][^'"]+\.(json|csv)['"])|(readFileSync\([^)]*\.(json|csv))|(require\(['"][^'"]+\.json['"]\))/;
// Inline data: an array literal of >=2 object literals, or test.each/for..of over a literal array.
const INLINE_ARRAY_OF_OBJECTS = /=\s*\[\s*\{[^\]]*\}\s*,\s*\{/s;
const LOOP_OVER_LITERAL = /(for\s*\(\s*const\s+\w+\s+of\s*\[)|(\.each\s*\(\s*\[)|(\[\s*\{[^\]]*\}\s*,\s*\{[^\]]*\]\s*\.forEach)/s;

const report = [];
const used = new Map();
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
  const issues = [];
  if (!DATA_IMPORT.test(code)) issues.push('does not load a .json/.csv data file');
  if (INLINE_ARRAY_OF_OBJECTS.test(code)) issues.push('inline array of data objects');
  if (LOOP_OVER_LITERAL.test(code)) issues.push('loop/test.each over a literal array');
  if (/waitForTimeout\(|setTimeout\(/.test(code)) issues.push('hard wait (waitForTimeout/setTimeout) - flaky risk (warning)');
  if (/test\.fail\(|test\.fixme\(/.test(code)) issues.push('test.fail/fixme present - check it does not hide a SUT bug (warning)');
  const fams = Object.entries(FAMILIES).filter(([, re]) => re.test(code)).map(([k]) => k);
  for (const k of fams) used.set(k, [...(used.get(k) ?? []), path.basename(f)]);
  report.push({ file: f, assertionFamilies: fams, issues });
}
const hardIssues = report.flatMap((r) => r.issues.filter((i) => !i.endsWith('(warning)')).map((i) => `${r.file}: ${i}`));
const patternCount = used.size;
const out = {
  files: report,
  suitePatterns: Object.fromEntries(used),
  patternCount,
  minPatterns,
  ok: hardIssues.length === 0 && patternCount >= minPatterns && files.length > 0,
};
if (asJson) console.log(JSON.stringify(out, null, 2));
else {
  for (const r of report) console.log(`${r.file}\n  patterns: ${r.assertionFamilies.join(', ') || '-'}\n  issues: ${r.issues.join('; ') || 'none'}`);
  console.log(`\nSuite assertion pattern families: ${patternCount} (min ${minPatterns}) -> ${[...used.keys()].join(', ')}`);
  console.log(out.ok ? 'OK' : `NOT OK${files.length ? '' : ' (no spec files matched)'}`);
}
process.exit(out.ok ? 0 : 1);
