# HW04 — Working context (chat B thực hiện)

Cập nhật: 2026-11-15 ~18:45 (+07:00), sau P03. Hỗ trợ tiếp tục công việc; không thay prompt/output nguyên văn trong AI log.

## Vai trò

- Chat A (phân tích/điều phối): session `local_8f71b54f-a935-4aab-b94a-932f8a30f545`; tài liệu A ở `HW04/docs/` (không phải AI log).
- Chat B (thực hiện, Claude Code desktop — Opus 5.5): session ghi trong `HW04/docs/prompt-plan.md` là `local_3a36d9d4-…`; log tại `HW04/ai-log/execution/chat-b/`.

## Đề và phạm vi

- Đề: `HW04/2026.HW04.Automation Testing_En.pdf` (8 tr.). Bản đồ yêu cầu: `HW04/submission-manifest.md`.
- Student ID `23120229`. Feature: A FR-01 Đăng ký (Web :5173), B FR-08 Checkout (Web :5173), C FR-17 Coupon CRUD (Admin :5174). TC nguồn: `HW02/features/{a-fr01-register-web,b-fr08-checkout-web,c-fr17-coupon-admin}/04-test-cases.md`.
- Được phép: đăng GitHub Issues lên `datkrb/SUT_Issue` (bước sau). Không: tạo repo GitHub, push, upload YouTube (sinh viên tự làm). Video giọng thật do sinh viên quay.

## Trạng thái

| Bước | Trạng thái | Ghi chú |
|---|---|---|
| P00 intake + setup | completed, A đã chấp nhận | manifest, git local, Playwright 3 browser, SUT up, smoke 3/3 browser pass |
| P01 Agent Skill | completed, A đã chấp nhận | skill `playwright-data-driven-automation` (nguồn `_tools/skills/`, bản nộp `HW04/skills/`); 3 script chạy thật trên smoke; npm `matrix`, `matrix:smoke`, `verify:reports`, `check:data` |
| P02 FR-01 | completed, A đã chấp nhận | 20 TC; final 3 browser 9 pass/11 fail mỗi browser (2026-11-15, code 4993ad4); reports `automation/reports/fr01-*`; BC-A1/A2 trùng #1/#2, BC-A3/A4/A5 mới (chưa đăng) — `features/A-FR01/results.md` |
| P03 FR-08 | completed (chờ A đối soát) | 13 TC; final 3 browser 7 pass/6 fail mỗi browser (2026-11-15, code c1888f8); reports `automation/reports/fr08-*`; bug đều trùng #4/#5/#6/#15 — `features/B-FR08/results.md` |
| P04–P07 | chưa nhận prompt | xem `HW04/docs/prompt-plan.md` |

## Hạ tầng

- Repo git local: `HW04/` (branch `main`). Commit P00: `7baba14`, `6db6086`, `7529ef7` (+ commit log/context P00).
- Playwright `@playwright/test` 1.56.1, TypeScript; browser: chromium-1194, firefox-1495, webkit-2215 (`%LOCALAPPDATA%/ms-playwright`).
- `automation/playwright.config.ts`: project chromium/firefox/webkit; env `WEB_URL`, `ADMIN_URL`, `API_URL`, `STUDENT_ID`, `RUN_LABEL`, `REPORT_DIR`, `WORKERS`, `RETRIES`. HTML report title `EShop HW04 — <label> — Run by: 23120229 — <ISO+07:00>` + metadata cùng giá trị; json results trong cùng thư mục.
- Report chính thức sau này: `automation/reports/<feature>-<browser>/` (được track). `reports/_scratch/` bị ignore.
- Verifier report: `_tools/HW04/verify-report-runby.js <automationDir> <reportDir> <png>` (mở report bằng chromium headless, kiểm "Run by: 23120229" + ISO, chụp ảnh).

## SUT

- Khởi động: `powershell -NoProfile -ExecutionPolicy Bypass -File eshop-sut/start.ps1` (không `-Mobile`). Dừng: `stop.ps1`. Backend DROP + seed mỗi lần khởi động.
- API đăng nhập thật là `POST /api/login` (không phải `/api/auth/login`).
- Baseline SUT trước/sau: `_tools/HW04/work/sut-baseline-before.txt`, `sut-baseline-after-P00.txt` — không đổi ngoài `backend/database.sqlite` (runtime). Thay đổi có sẵn từ trước HW04: `frontend-mobile/App.js` modified, untracked `.gitignore`, `LOCAL_SETUP.md`, `start.ps1`, `stop.ps1`.
- Quan sát ngoài phạm vi: response `/api/login` trả `user.password` plaintext. A quyết định (P01): chỉ ghi chú, không đăng issue.

## Evidence P00

- `_tools/HW04/work/sut-health-P00.txt` (HTTP 200 ×3, 5 sản phẩm, login 2 tài khoản; token đã che).
- `_tools/HW04/work/p00-smoke-reports/smoke-{chromium,firefox,webkit}/` + `p00-smoke-report-*.png`.

## Evidence P01

- `_tools/HW04/work/p01-skill-check/RESULTS.md` (bảng kiểm tra script, kể cả kiểm tra âm tính), `summary.{md,json}`, `failcheck-summary.md`, ảnh report, `fixtures/`.

## Lưu ý P02

- Report có trace: fr01-* tổng ~22 MB → cân nhắc tắt trace/tách ZIP trước P07.
- Máy khởi động lại 2026-11-15; SUT khởi động lại bằng `start.ps1` (DB seed lại).
- Probe khám phá FR-01: `_tools/HW04/probe-fr01.js` (tạo tài khoản trùng `test@eshop.com` trong DB đang chạy — đã mất sau restart; không chạy lại khi đang test FR-08 dùng `test@eshop.com`).

## Bước tiếp

Chờ prompt P04 (FR-17) từ chat A. Commit chạm `.spec.ts` tới P03: 7 (cần ≥8 cho cả bài). Khi làm feature: lưu bản AI đầu vào `automation/ai-draft/<feature>/` và commit riêng trước khi sửa; chạy `npm run matrix -- --feature …`, `npm run verify:reports`, `npm run check:data`.
