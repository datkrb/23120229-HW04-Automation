# HW04 — Phân tích đề (chat A phân tích/điều phối)

Ngày 2026-11-13, Asia/Saigon (+07:00). Tài liệu điều phối của chat A; **không phải AI log**. AI log chỉ của chat B thực hiện.

## Nguồn đã đọc

- `HW04/2026.HW04.Automation Testing_En.pdf` (8 trang, đọc toàn văn).
- `___2026.Homework.Policies.md` (Markdown + PDF, Git từng bước, ZIP `StudentID_..._Grade`, Moodle ≤20 tệp/≤20 MB, link online không lạm dụng).
- `slide/S12_Automation testing.pdf` (27 tr.; tr.12–13 chọn TC để automate, tr.18 kế hoạch: scope → tool → test data → design & execute → maintain → report).
- `slide/EN.Automation & Regression Testing AI-First (Redesigned).pdf` (37 tr.; tr.12 3A's, tr.13 framework/data-driven, tr.14 POM/DRY, tr.15 flaky, tr.29–30 Playwright web-first assertion, role/label locator, data-driven; tr.28/36 human-in-the-loop).
- `eshop-sut/README.md` (SRS FR-01, FR-08, FR-17, FR-12) và `eshop-sut/LOCAL_SETUP.md` (backend DROP+seed khi restart).
- HW02: `HW02/scope.md`, `HW02/features/{a-fr01-register-web,b-fr08-checkout-web,c-fr17-coupon-admin}/04-test-cases.md` (≈23/12/20 TC thiết kế).

## Phạm vi đã chốt

§5 đề: cùng 3 feature web của HW02, Pool D không dùng.

| Pool | Feature HW02 | Nền tảng | Nguồn TC |
|---|---|---|---|
| A | FR-01 Đăng ký tài khoản | Web `:5173` | `HW02/features/a-fr01-register-web/04-test-cases.md` |
| B | FR-08 Checkout | Web `:5173` | `HW02/features/b-fr08-checkout-web/04-test-cases.md` |
| C | FR-17 Quản lý coupon (CRUD) | Admin `:5174` | `HW02/features/c-fr17-coupon-admin/04-test-cases.md` |

Không trùng nhóm: người dùng xác nhận ở HW02; HW04 dùng lại, không kiểm độc lập được.
Student ID: `23120229` (từ hồ sơ HW03). GitHub: `datkrb`; Issues SUT: `datkrb/SUT_Issue` (đã có HW02 #1–11, HW03 #12–…).

## Bản đồ yêu cầu

| Yêu cầu | Nguồn | Sản phẩm | Loại | Bằng chứng | Trạng thái |
|---|---|---|---|---|---|
| ≥12 TC/feature → script, AI dẫn từng bước | §6 T1 | `tests/<feature>.spec.ts` | bắt buộc | AI log B, snapshot bản AI đầu | planned |
| Data-driven, dữ liệu ở `.json/.csv` riêng | §6 T1 | `data/<feature>.json` | bắt buộc | không có mảng dữ liệu inline trong spec | planned |
| ≥3 assertion pattern khác nhau | §6 T1 | spec | bắt buộc | bảng pattern trong report | planned |
| 3 browser × 3 feature ≥9 run, mỗi run HTML report có “Run by: 23120229” + ISO timestamp | §6 T1, §11 | `reports/<feature>-<browser>/index.html` | bắt buộc | report thật, không bịa | planned |
| Review/fix + gap analysis (AI sai gì, vì sao) | §6 T1 | report + diff bản AI → bản cuối | bắt buộc | diff, log | planned |
| Bug thật → Markdown + GitHub Issues kèm ảnh | §6 T1 | `bug-report.md`, issue URL | bắt buộc nếu có bug | screenshot, readback | **được phép đăng Issues** |
| TC không automate được + lý do | §6 T1 | report | bắt buộc | — | planned |
| Video ≥5 phút, giọng Việt, sinh viên tự quay, có fix AI, whoami/hostname hoặc face-cam | §6 T2, §11 | link YouTube unlisted | bắt buộc (15đ) | **sinh viên tự quay/upload** | AI chỉ chuẩn bị kịch bản |
| Agent Skill + video demo dùng skill end-to-end | §7 | skill + link YouTube | khuyến khích (10đ) | skill chạy thật trên 1 feature | planned; upload do sinh viên |
| AI Audit Report (tool, thời gian, prompt, output) | §9 | `ai-audit.md` + PDF | bắt buộc | AI log B | planned |
| AI Critique 200–300 từ | §10 | `ai-critique.md` + PDF | bắt buộc | đếm từ | planned |
| Repo GitHub **public**, ≥8 commit chạm `.spec.ts` | §12 | repo + `git-log.txt` | bắt buộc | `git log --stat` | local; **push do sinh viên** (chưa được phép tạo repo/push) |
| README self-assessment + test summary | §14 | `README.md` | bắt buộc | số liệu từ run thật | planned |
| Report Markdown + PDF; ZIP `23120229_HW04_AI_Automation_<grade>.zip` | §14, policy | ZIP | bắt buộc | QA PDF/ZIP | planned |

Rubric §15: A 25 · B 25 · C 25 · Video 15 · Agent Skill 10. Không áp rubric HW02/HW03.

## Điểm chưa rõ / giới hạn

- Video Task 2 và giọng đọc phải là thật của sinh viên (§11) — AI không được tạo. Không có video → mất 15đ và có thể bị coi là thiếu tài liệu bắt buộc (§17). Đây là việc của sinh viên.
- Repo public và YouTube: người dùng chỉ cho phép AI đăng GitHub Issues. Repo được chuẩn bị local với lịch sử commit thật; sinh viên tự tạo repo public, push, upload video, rồi điền link.
- Số TC: dùng TC HW02 làm nguồn; nếu cần thêm TC mới để đủ ≥12/feature thì ghi rõ là bổ sung ở HW04, có trace SRS.
- Expected result theo SRS; không lấy hành vi code làm oracle. Test fail do bug SUT được giữ fail (không `test.fail` che lỗi) và báo bug; phân biệt lỗi môi trường/flaky.
- Backend reset dữ liệu khi restart → dùng email/coupon code duy nhất theo run để test độc lập.
