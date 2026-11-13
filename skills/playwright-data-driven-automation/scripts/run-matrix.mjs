#!/usr/bin/env node
// Run a feature x browser matrix with Playwright; one HTML report per run, then summarise.
//
// Usage:
//   node run-matrix.mjs --project-dir <automation> --feature <name>=<spec path or dir> [--feature ...]
//        [--browsers chromium,firefox,webkit] [--student-id ID] [--reports-dir reports]
//        [--summary-dir <dir>] [--summarize-only] [--extra "<args passed to playwright test>"]
//
// Requires the project's playwright.config to honour RUN_LABEL / REPORT_DIR / STUDENT_ID env vars
// and to write a JSON reporter file at <REPORT_DIR>/results.json (see assets/playwright.config.template.ts).
// A failing test does not stop the matrix; the exit code is 1 if any run had failures or errors.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  const a = { feature: [], browsers: 'chromium,firefox,webkit', reportsDir: 'reports', extra: '' };
  for (let i = 0; i < argv.length; i++) {
    const k = argv[i];
    const v = () => argv[++i];
    if (k === '--project-dir') a.projectDir = v();
    else if (k === '--feature') a.feature.push(v());
    else if (k === '--browsers') a.browsers = v();
    else if (k === '--student-id') a.studentId = v();
    else if (k === '--reports-dir') a.reportsDir = v();
    else if (k === '--summary-dir') a.summaryDir = v();
    else if (k === '--summarize-only') a.summarizeOnly = true;
    else if (k === '--extra') a.extra = v();
    else if (k === '-h' || k === '--help') a.help = true;
    else throw new Error(`Unknown argument: ${k}`);
  }
  return a;
}

function isoLocal(d = new Date()) {
  const p = (n) => String(Math.trunc(Math.abs(n))).padStart(2, '0');
  const off = -d.getTimezoneOffset();
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}${off >= 0 ? '+' : '-'}${p(off / 60)}:${p(off % 60)}`;
}

// Walk Playwright JSON report suites -> [{file, title, project, status, duration}]
function collectTests(suite, file, out, titles = []) {
  const f = suite.file ?? file;
  const t = suite.title && suite.title !== f ? [...titles, suite.title] : titles;
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const results = test.results ?? [];
      const last = results[results.length - 1];
      out.push({
        file: spec.file ?? f,
        title: [...t, spec.title].join(' › '),
        project: test.projectName,
        status: test.status, // expected | unexpected | flaky | skipped
        result: last?.status ?? 'not-run',
        attempts: results.length,
        duration: results.reduce((s, r) => s + (r.duration ?? 0), 0),
      });
    }
  }
  for (const child of suite.suites ?? []) collectTests(child, f, out, t);
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || !args.projectDir || args.feature.length === 0) {
    console.log(fs.readFileSync(new URL(import.meta.url)).toString().split('\n').slice(1, 12).join('\n'));
    process.exit(args.help ? 0 : 2);
  }
  const projectDir = path.resolve(args.projectDir);
  const browsers = args.browsers.split(',').map((s) => s.trim()).filter(Boolean);
  const features = args.feature.map((f) => {
    const i = f.indexOf('=');
    if (i < 1) throw new Error(`--feature must be name=path, got ${f}`);
    return { name: f.slice(0, i), spec: f.slice(i + 1) };
  });
  const runs = [];
  for (const feat of features) {
    for (const browser of browsers) {
      const label = `${feat.name}-${browser}`;
      const reportRel = path.posix.join(args.reportsDir.replace(/\\/g, '/'), label);
      const reportAbs = path.join(projectDir, reportRel);
      const run = { feature: feat.name, browser, label, report: reportRel, spec: feat.spec };
      if (!args.summarizeOnly) {
        const env = { ...process.env, RUN_LABEL: label, REPORT_DIR: reportRel };
        delete env.RUN_STARTED_AT; // fresh timestamp per run
        if (args.studentId) env.STUDENT_ID = args.studentId;
        const cmd = `npx playwright test "${feat.spec}" --project=${browser} ${args.extra}`.trim();
        console.log(`\n=== ${label}: ${cmd}`);
        const started = isoLocal();
        const r = spawnSync(cmd, { cwd: projectDir, env, stdio: 'inherit', shell: true });
        run.started = started;
        run.exitCode = r.status;
      }
      const jsonPath = path.join(reportAbs, 'results.json');
      if (fs.existsSync(jsonPath)) {
        const rep = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        run.stats = rep.stats;
        run.metadata = rep.config?.metadata ?? {};
        run.tests = (rep.suites ?? []).flatMap((s) => collectTests(s, s.file, []));
        run.errors = (rep.errors ?? []).map((e) => e.message?.split('\n')[0]);
      } else {
        run.missing = `no results.json at ${jsonPath}`;
      }
      runs.push(run);
    }
  }
  const summaryDir = path.resolve(projectDir, args.summaryDir ?? args.reportsDir);
  fs.mkdirSync(summaryDir, { recursive: true });
  const summary = { generatedAt: isoLocal(), projectDir, runs };
  fs.writeFileSync(path.join(summaryDir, 'summary.json'), JSON.stringify(summary, null, 2));
  fs.writeFileSync(path.join(summaryDir, 'summary.md'), toMarkdown(summary));
  console.log(`\nSummary: ${path.join(summaryDir, 'summary.md')}`);
  const bad = runs.some((r) => r.missing || (r.stats && (r.stats.unexpected > 0)) || (r.errors && r.errors.length) || (r.exitCode && r.exitCode !== 0));
  process.exit(bad ? 1 : 0);
}

function toMarkdown(summary) {
  const L = [];
  L.push(`# Test run summary`, '', `Generated: ${summary.generatedAt}`, '');
  L.push('| Run | Run by | Started (report) | Total | Passed | Failed | Flaky | Skipped | Report |');
  L.push('|---|---|---|---|---|---|---|---|---|');
  const tot = { total: 0, passed: 0, failed: 0, flaky: 0, skipped: 0 };
  for (const r of summary.runs) {
    if (!r.stats) { L.push(`| ${r.label} | – | – | – | – | – | – | – | missing: ${r.missing ?? 'no stats'} |`); continue; }
    const s = r.stats;
    const total = s.expected + s.unexpected + s.flaky + s.skipped;
    tot.total += total; tot.passed += s.expected; tot.failed += s.unexpected; tot.flaky += s.flaky; tot.skipped += s.skipped;
    L.push(`| ${r.label} | ${r.metadata['Run by'] ?? '?'} | ${r.metadata['Run started (ISO 8601)'] ?? s.startTime} | ${total} | ${s.expected} | ${s.unexpected} | ${s.flaky} | ${s.skipped} | \`${r.report}/index.html\` |`);
  }
  L.push(`| **Total (${summary.runs.length} runs)** | | | **${tot.total}** | **${tot.passed}** | **${tot.failed}** | **${tot.flaky}** | **${tot.skipped}** | |`, '');
  // Per-test x browser matrix, grouped by feature
  const byFeature = new Map();
  for (const r of summary.runs) {
    if (!byFeature.has(r.feature)) byFeature.set(r.feature, { browsers: [], tests: new Map() });
    const g = byFeature.get(r.feature);
    g.browsers.push(r.browser);
    for (const t of r.tests ?? []) {
      if (!g.tests.has(t.title)) g.tests.set(t.title, {});
      g.tests.get(t.title)[r.browser] = t.status === 'expected' ? 'pass' : t.status === 'unexpected' ? `FAIL (${t.result})` : t.status;
    }
  }
  for (const [feature, g] of byFeature) {
    L.push(`## ${feature}`, '', `| Test | ${g.browsers.join(' | ')} |`, `|---|${g.browsers.map(() => '---').join('|')}|`);
    for (const [title, res] of g.tests) L.push(`| ${title.replace(/\|/g, '\\|')} | ${g.browsers.map((b) => res[b] ?? '–').join(' | ')} |`);
    L.push('');
  }
  const errs = summary.runs.filter((r) => r.errors?.length);
  if (errs.length) { L.push('## Run-level errors', ''); for (const r of errs) L.push(`- ${r.label}: ${r.errors.join('; ')}`); }
  return L.join('\n') + '\n';
}

main();
