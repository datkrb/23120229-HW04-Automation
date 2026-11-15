# HW04 — Kế hoạch prompt (chat A)

Tài liệu điều phối của chat A, không phải AI log. Trạng thái ghi theo sự kiện thật: `draft` → `sent` → `completed`/`needs-fix`.

| ID | Tệp prompt | Mục tiêu | Trạng thái |
|---|---|---|---|
| P00 | `prompts/P00-INTAKE-SETUP.md` | Intake nguồn, repo HW04 local, Playwright TS 3 browser, reporter “Run by: 23120229” + ISO time, khởi động SUT, smoke, AI log | completed (A đối soát OK) — chat B `local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb` |
| P01 | `prompts/P01-SKILL.md` | Xây Agent Skill tái dùng `playwright-data-driven-automation` (data-driven, đa browser, review AI) | completed (A OK) |
| P02 | `prompts/P02-FEATURE-A.md` | FR-01: chọn ≥12 TC → data JSON → AI draft spec (snapshot) → chạy 3 browser → review/fix có diff → bug candidate | completed (A OK 2026-11-15) |
| P03 | `prompts/P03-FEATURE-B.md` | FR-08: như P02 | completed (A OK 2026-11-15) |
| P04 | `prompts/P04-FEATURE-C.md` | FR-17: như P02 | completed (A OK 2026-11-15) |
| P05 | `prompts/P05-FINAL-RUN-BUGS.md` | Chạy cuối 9 report, test summary, bug report + đăng GitHub Issues kèm ảnh (đã được phép) | completed (bước 5 do A chạy theo đồng ý SV: #39–#43 + 10 comment) |
| P06 | `prompts/P06-DOCS.md` | report.md, gap analysis, AI audit/critique/disclosure, README self-assessment, git-log.txt, kịch bản video Task 2 cho sinh viên, video demo skill (không lời) | completed (A OK) |
| P07 | `prompts/P07-PDF-ZIP.md` | PDF render, QA, ZIP `23120229_HW04_AI_Automation_<grade>.zip` | sent 2026-11-15 |

Mỗi bước A đọc checkpoint/artifact/log/commit của B rồi mới gửi bước kế tiếp. Video giọng thật, repo public/push, upload YouTube: sinh viên làm.
