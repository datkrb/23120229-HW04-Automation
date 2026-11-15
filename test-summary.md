# HW04 — Test summary report

Số liệu sinh tự động từ `automation/reports/summary.json` (run-matrix, 2026-11-15T19:18:16+07:00) và `results.json` của từng run — không nhập tay. Lần chạy chính thức: SUT khởi động lại sạch (seed 2 user, 4 coupon), code HW04 `beec3c8`, workers 1, retries 0. Human review của sinh viên: pending.

## 1. Tổng quan

| Chỉ số | Giá trị |
|---|---|
| Số feature | 3 (A FR-01, B FR-08, C FR-17) |
| TC automated (duy nhất) | 51 (20 + 13 + 18) |
| Browser | 3 (chromium, firefox, webkit) |
| Browser run (feature × browser) | 9 |
| TC executed (TC × browser) | 153 |
| Passed | 81 |
| Failed | 72 |
| Flaky | 0 |
| Skipped | 0 |
| TC thiết kế HW02 không automate | 12 (A 5, B 3, C 4) — lý do ở `features/*/selection.md` |

## 2. Theo feature × browser

| Feature | Browser | Report | Bắt đầu (ISO) | Total | Pass | Fail | Flaky |
|---|---|---|---|---|---|---|---|
| A FR-01 Đăng ký | chromium | `automation/reports/fr01-chromium/index.html` | 2026-11-15T19:02:25+07:00 | 20 | 9 | 11 | 0 |
| A FR-01 Đăng ký | firefox | `automation/reports/fr01-firefox/index.html` | 2026-11-15T19:04:28+07:00 | 20 | 9 | 11 | 0 |
| A FR-01 Đăng ký | webkit | `automation/reports/fr01-webkit/index.html` | 2026-11-15T19:07:43+07:00 | 20 | 9 | 11 | 0 |
| B FR-08 Checkout | chromium | `automation/reports/fr08-chromium/index.html` | 2026-11-15T19:09:59+07:00 | 13 | 7 | 6 | 0 |
| B FR-08 Checkout | firefox | `automation/reports/fr08-firefox/index.html` | 2026-11-15T19:10:56+07:00 | 13 | 7 | 6 | 0 |
| B FR-08 Checkout | webkit | `automation/reports/fr08-webkit/index.html` | 2026-11-15T19:12:38+07:00 | 13 | 7 | 6 | 0 |
| C FR-17 Coupon admin | chromium | `automation/reports/fr17-chromium/index.html` | 2026-11-15T19:13:54+07:00 | 18 | 11 | 7 | 0 |
| C FR-17 Coupon admin | firefox | `automation/reports/fr17-firefox/index.html` | 2026-11-15T19:14:50+07:00 | 18 | 11 | 7 | 0 |
| C FR-17 Coupon admin | webkit | `automation/reports/fr17-webkit/index.html` | 2026-11-15T19:17:03+07:00 | 18 | 11 | 7 | 0 |

## 3. Theo feature (cộng 3 browser)

| Feature | TC | Executed | Pass | Fail | Pass/TC mỗi browser |
|---|---|---|---|---|---|
| A FR-01 Đăng ký | 20 | 60 | 27 | 33 | 9/9/9 |
| B FR-08 Checkout | 13 | 39 | 21 | 18 | 7/7/7 |
| C FR-17 Coupon admin | 18 | 54 | 33 | 21 | 11/11/11 |

## 4. Kiểm ổn định (chạy lại toàn suite lần 2)

| Feature | Browser | Lần 1 pass/fail | Lần 2 pass/fail | Flaky lần 2 |
|---|---|---|---|---|
| fr01 | chromium | 9/11 | 9/11 | 0 |
| fr01 | firefox | 9/11 | 9/11 | 0 |
| fr01 | webkit | 9/11 | 9/11 | 0 |
| fr08 | chromium | 7/6 | 7/6 | 0 |
| fr08 | firefox | 7/6 | 7/6 | 0 |
| fr08 | webkit | 7/6 | 7/6 | 0 |
| fr17 | chromium | 11/7 | 11/7 | 0 |
| fr17 | firefox | 11/7 | 11/7 | 0 |
| fr17 | webkit | 11/7 | 11/7 | 0 |

So từng test × browser: **153/153 có cùng trạng thái** ở 2 lần chạy; khác nhau: không có. Output lần 2: `_tools/HW04/work/p05-rerun/` (bắt đầu 2026-11-15T19:19:21+07:00), không ghi đè report chính thức.

## 5. Bug

| Loại | Số |
|---|---|
| Bug mới HW04 (issue mới) | 5 (HW04-BUG-01…05) |
| Bug đã có issue HW02/HW03 được automation tái hiện (comment) | 10 |
| Tổng bug phát hiện/tái hiện | 15 |

Chi tiết: `bug-report.md`; URL: `docs/github-issues.md`.

