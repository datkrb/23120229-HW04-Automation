# HW04 — Bản đồ yêu cầu → sản phẩm (submission manifest)

Tạo bởi chat B (thực hiện) ở bước P00, 2026-11-13 (Asia/Saigon, +07:00). Trạng thái cập nhật theo sự kiện thật; `planned` = chưa làm. Đây là tài liệu theo dõi, không phải bằng chứng đã nộp.

Nguồn: `HW04/2026.HW04.Automation Testing_En.pdf` (8 trang, đọc toàn văn bằng `pdftotext -layout` ngày 2026-11-13), `___2026.Homework.Policies.md`, `HW04/docs/assignment-analysis.md` (phân tích của chat A, đã đối chiếu lại với đề).

Student ID `23120229`. Phạm vi: A = FR-01 Đăng ký (Web :5173), B = FR-08 Checkout (Web :5173), C = FR-17 Coupon CRUD (Admin :5174) — cùng 3 feature HW02 theo §5.

## Bảng yêu cầu

| # | Yêu cầu | Nguồn (§ / trang PDF) | Sản phẩm dự kiến | Loại | Trạng thái |
|---|---|---|---|---|---|
| R1 | Tự động hóa đúng 3 feature web đã chọn ở HW02 (Pool A/B/C), không dùng Pool D | §5, tr.3–4 | `automation/tests/fr01-*.spec.ts`, `fr08-*`, `fr17-*` | bắt buộc | planned |
| R2 | Dẫn AI **từng bước** (không một prompt chung) chuyển ≥12 TC/feature thành script; positive/negative/edge đều tính | §2, §6 T1, tr.1, 4 | spec + AI log B theo bước; snapshot bản AI đầu | bắt buộc | planned |
| R3 | Data-driven: dữ liệu trong tệp `.json`/`.csv` riêng, **không** mảng/đối tượng inline trong script | §6 T1, tr.4 | `automation/data/<feature>.json` | bắt buộc | planned |
| R4 | ≥3 assertion pattern khác nhau | §6 T1, tr.4 | spec + bảng pattern trong report | bắt buộc | planned |
| R5 | ≥3 browser; **mỗi** feature chạy cả 3 → ≥9 run | §6 T1, tr.4 | Playwright project chromium/firefox/webkit | bắt buộc | hạ tầng xong (P00 smoke) |
| R6 | Mỗi run sinh HTML report (Allure/Playwright) hiển thị “Run by: 23120229” | §6 T1 tr.4; §11 tr.6 | `automation/reports/<feature>-<browser>/index.html` | bắt buộc | hạ tầng xong (P00), report feature planned |
| R7 | Report có “Run by” **kèm ISO timestamp**, không do AI bịa/tạo giả | §11, tr.6 | metadata reporter sinh lúc chạy thật | bắt buộc (anti-cheat) | hạ tầng xong (P00) |
| R8 | Human review + fix script AI; báo AI sai/thiếu gì (selector giòn, assertion yếu, thiếu edge case, wait flaky) và **vì sao** (prompt, giới hạn model, đặc tính feature) | §6 T1, tr.4 | gap analysis trong report + diff bản AI → bản cuối | bắt buộc | planned |
| R9 | Suite chạy end-to-end, output đầy đủ nhất có thể | §6 T1, tr.4 | 9 report + test summary | bắt buộc | planned |
| R10 | Assertion fail lộ defect thật → bug report Markdown **và** GitHub Issues, mỗi issue có screenshot | §6 T1, tr.4 | `bug-report.md`, issue trên `datkrb/SUT_Issue` | bắt buộc nếu có bug | planned (đăng ở bước sau, đã được phép) |
| R11 | Liệt kê TC không automate được + lý do | §6 T1, tr.4 | mục trong report | bắt buộc | planned |
| R12 | Video YouTube unlisted ≥5 phút, giọng Việt, chạy 1 script end-to-end gồm multi-browser + HTML report; kể ≥1 fix với script AI; có face-cam **hoặc** terminal `whoami` và `hostname` | §6 T2, tr.5; §11 tr.6 | link video | bắt buộc (15đ) | **sinh viên tự quay/upload**; AI chỉ soạn kịch bản |
| R13 | Agent Skill tái dùng (data-driven, đa browser, sinh & bảo trì script) + video demo dùng skill end-to-end trên 1 feature | §7, tr.5 | skill + link YouTube | khuyến khích (10đ) | skill xong P01 (`HW04/skills/playwright-data-driven-automation/`, script đã chạy thật); demo trên 1 feature + video do sinh viên: planned |
| R14 | Khai công cụ trong AI Audit Report (AI, Playwright, reporter) | §8, tr.5 | `ai-audit.md` | bắt buộc | planned |
| R15 | AI Audit Report: tên tool, ngày giờ, prompt, output cho từng tương tác; câu khai “I use AI tools for the following tasks” | §9, tr.5–6 | `ai-audit.md` + PDF, dẫn record ID của log B | bắt buộc | log B bắt đầu từ P00 |
| R16 | AI Critique 200–300 từ (AI sai/thiên lệch/thiếu ở đâu, vì sao, nguyên tắc rút ra) | §10, tr.6 | `ai-critique.md` + PDF | bắt buộc | planned |
| R17 | Repo GitHub **public**, ≥8 commit **thay đổi tệp `.spec.ts`** (commit chỉ README/PDF không tính); commit log dạng text | §12, tr.6 | git local `HW04/` + `git-log.txt` | bắt buộc | git local khởi tạo P00; **tạo repo public/push do sinh viên** |
| R18 | Commit message rõ cho từng bước của từng yêu cầu | Policy “Version Control” | lịch sử git | bắt buộc | đang áp dụng |
| R19 | Báo cáo chính Markdown + PDF gồm automation report + review/gap analysis | §14, tr.7; Policy “PDF Copies” | `report.md` + `report.pdf` | bắt buộc | planned |
| R20 | ZIP `23120229_HW04_AI_Automation_<NNN>.zip` (NNN 3 chữ số 000–100) chứa: report MD+PDF, link repo public, các HTML report, link video, AI Critique + Audit (MD+PDF), git log text, bug report + **ảnh chụp trang GitHub Issues**, README.md | §14, tr.7; Policy | ZIP | bắt buộc | planned |
| R21 | README.md: bảng self-assessment §15 + test summary (số feature; số TC automated/executed/passed/failed; số browser run; số bug; link video) | §14–15, tr.7–8 | `HW04/README.md` | bắt buộc | planned |
| R22 | Moodle ≤20 tệp, ≤20 MB/tệp; không lạm dụng link online | Policy “Submission Guidelines” | kiểm tra kích thước ZIP | bắt buộc | planned |
| R23 | Thiếu tài liệu bắt buộc → 0 điểm; không chép prompt giữa sinh viên | §17, tr.8 | QA cuối | bắt buộc | planned |
| R24 | Oral defense ngẫu nhiên 30% | §13, tr.6–7 | sinh viên chuẩn bị | thông tin | — |

Rubric §15: Feature A 25 · B 25 · C 25 · Video 15 · Agent Skill 10 = 100.

## Đối chiếu phân tích của chat A

Phân tích A khớp đề ở các điểm chính (phạm vi §5, ≥12 TC, data-driven tệp riêng, ≥3 assertion, ≥9 run, Run by + ISO timestamp, video, skill, audit, critique, ≥8 commit spec, README, ZIP, rubric). Sai lệch / bổ sung chat B ghi nhận:

1. **Ảnh chụp trang GitHub Issues trong ZIP** (§14 “Bug report, with screenshots of the bugs on the GitHub Issues page”) là yêu cầu riêng, ngoài việc đính screenshot vào từng issue (§6). Bảng A chỉ ghi “GitHub Issues kèm ảnh” — cần thêm sản phẩm ảnh chụp trang issue để đưa vào ZIP.
2. **Video Task 2 phải gồm multi-browser run và HTML report** (§6 T2), không chỉ “có fix AI”. A ghi thiếu chi tiết này.
3. Đếm ≥8 commit: §12 tính commit **thay đổi** tệp test-script (`.spec.js`/`.spec.ts` tương đương). A ghi “chạm `.spec.ts`” — tương đương; lưu ý commit smoke spec P00 có thay đổi `.spec.ts` nhưng là spec hạ tầng, nên khi báo cáo không dựa vào nó để đạt 8.
4. Video demo Agent Skill (§7): đề không yêu cầu giọng nói hay authorship evidence như Task 2; `prompt-plan.md` ghi “không lời” là lựa chọn, không phải yêu cầu đề. Vẫn do sinh viên upload YouTube.
5. Slide EN tr.30 minh họa data-driven bằng mảng inline `const cases = [...]`; **đề HW04 cấm cách này** (§6 T1). Dữ liệu phải ở `.json/.csv`.
6. §5 yêu cầu “không trùng nhóm như HW02”: không kiểm độc lập được trong workspace; dựa vào xác nhận HW02 của người dùng (A đã ghi đúng).

## Ghi chú môi trường (P00)

- SUT git HEAD `85af3ba875c88283615e22cb108f13e2fccaf0e9`; trạng thái có sẵn trước P00 (không do HW04): `M backend/database.sqlite`, `M frontend-mobile/App.js`, untracked `.gitignore`, `LOCAL_SETUP.md`, `start.ps1`, `stop.ps1`. Baseline + hash: `_tools/HW04/work/sut-baseline-before.txt`.
- `backend/database.sqlite` thay đổi mỗi lần backend khởi động (DROP + seed theo `LOCAL_SETUP.md`) — dữ liệu runtime, không phải sửa mã SUT.
