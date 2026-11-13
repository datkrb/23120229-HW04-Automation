# HW04 automation (Playwright + TypeScript)

Student ID `23120229`. SUT: EShop (`eshop-sut`), Web `:5173`, Admin `:5174`, API `:3000`.

## Setup

```bash
npm install
npx playwright install chromium firefox webkit
```

Start the SUT first: `powershell -NoProfile -ExecutionPolicy Bypass -File ../../eshop-sut/start.ps1`.

## Running one feature x browser (one HTML report per run)

Environment variables (all optional):

| Variable | Default | Purpose |
|---|---|---|
| `WEB_URL` / `ADMIN_URL` / `API_URL` | `http://localhost:5173` / `:5174` / `:3000` | SUT endpoints |
| `STUDENT_ID` | `23120229` | shown as `Run by: …` in report title + metadata |
| `RUN_LABEL` | `adhoc` | e.g. `fr01-chromium`, shown in the report title |
| `REPORT_DIR` | `reports/_scratch/<label>-<time>` | HTML report folder (official: `reports/<feature>-<browser>`) |
| `WORKERS`, `RETRIES` | `1`, `0` | execution tuning |

```bash
RUN_LABEL=fr01-chromium REPORT_DIR=reports/fr01-chromium npx playwright test tests/fr01 --project=chromium
```

The report title is `EShop HW04 — <label> — Run by: 23120229 — <ISO 8601 start time with offset>`, and the
same values appear in the report Metadata section. The timestamp is taken at run start, never written by hand.

## Matrix helpers (from the `playwright-data-driven-automation` skill in `../skills/`)

| npm script | What it does |
|---|---|
| `npm run matrix -- --feature fr01=tests/fr01.spec.ts ...` | runs each feature on chromium/firefox/webkit → `reports/<feature>-<browser>/` + `reports/summary.{md,json}` |
| `npm run matrix:smoke` | same for the smoke spec, into `reports/_scratch/smoke/` |
| `npm run verify:reports` | opens every `reports/*/index.html`, checks "Run by: 23120229" + ISO timestamp |
| `npm run check:data` | static check: specs load data files, no inline data arrays, ≥3 assertion patterns |

`tests/smoke.spec.ts` is an infrastructure check only and is not counted toward the ≥12 test cases per feature.
