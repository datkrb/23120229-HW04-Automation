# HW04 — Working context (chat B thực hiện)

Cập nhật: 2026-11-13 ~19:50 (+07:00), sau P00. Hỗ trợ tiếp tục công việc; không thay prompt/output nguyên văn trong AI log.

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
| P00 intake + setup | completed (chờ A đối soát) | manifest, git local, Playwright 3 browser, SUT up, smoke 3/3 browser pass |
| P01–P07 | chưa nhận prompt | xem `HW04/docs/prompt-plan.md` |

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
- Quan sát ngoài phạm vi (chưa xác minh là bug, không thuộc FR-01/08/17): response `/api/login` trả `user.password` dạng plaintext. Ghi lại để A quyết định.

## Evidence P00

- `_tools/HW04/work/sut-health-P00.txt` (HTTP 200 ×3, 5 sản phẩm, login 2 tài khoản; token đã che).
- `_tools/HW04/work/p00-smoke-reports/smoke-{chromium,firefox,webkit}/` + `p00-smoke-report-*.png`.

## Bước tiếp

Chờ prompt P01 (Agent Skill) hoặc P02 (FR-01) từ chat A.
