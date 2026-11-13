Vai trò: Chat thực hiện. Tiếp tục HW04 (P01). A đã đối soát checkpoint P00 của bạn: chấp nhận (report webkit/chromium/firefox có Run by + ISO, smoke 3/3, commit 7baba14…87944b9).

Trước khi làm: commit baseline riêng các tệp chưa track do A/đề tạo — `HW04/2026.HW04.Automation Testing_En.pdf` và `HW04/docs/` (tài liệu điều phối của A, không phải AI log của bạn; message vd. `docs(hw04): add assignment PDF and coordinator docs`). Quan sát `/api/login` trả `user.password` plaintext: ngoài phạm vi 3 feature, chỉ ghi chú, không đăng issue.

Bước này (P01 — Agent Skill, §7 đề, 10 điểm): xây một Agent Skill tái dùng được cho quy trình automation của bài này, đặt tên theo năng lực, **không theo số HW**: `playwright-data-driven-automation`.

Vị trí: nguồn skill tại `D:/KI7/testing/_tools/skills/playwright-data-driven-automation/` và bản nộp copy vào `HW04/skills/playwright-data-driven-automation/`. Dùng skill `anthropic-skills:skill-creator` nếu có để định dạng đúng (frontmatter `name`, `description` nói rõ khi nào kích hoạt).

Nội dung skill phải là quy trình làm được, gắn slide (S12 tr.18; AI-First Automation tr.12–15, 29–30), không chung chung:
1. Chọn TC để automate từ bộ TC thiết kế (tiêu chí S12 tr.12–13), ghi TC không automate + lý do.
2. Tách test data ra `data/<feature>.json` (schema: id, title, type positive/negative/edge, input, expected, trace SRS); cấm mảng dữ liệu inline trong spec.
3. Prompt AI từng bước (khung prompt mẫu): khảo sát DOM/locator thật → POM → spec data-driven → assertion; lưu bản AI đầu nguyên văn (`ai-draft/`) trước khi sửa.
4. ≥3 assertion pattern (vd. web-first `toBeVisible/toHaveText`, `toHaveURL`, API/response hoặc trạng thái backend, `toHaveCount`, `toHaveAttribute`/validity HTML5, soft assertion).
5. Chạy đa browser: lệnh/script chạy feature×browser ra report riêng có “Run by: <StudentID>” + ISO timestamp.
6. Checklist human review AI script: selector giòn, assertion yếu/thiếu, edge case thiếu, wait cứng/flaky, phụ thuộc thứ tự/dữ liệu, oracle lấy từ code thay vì spec, `test.fail`/skip che bug. Ghi diff bản AI → bản cuối và lý do AI sai (prompt/model/feature).
7. Phân loại fail: bug SUT vs lỗi test vs môi trường; bug → Markdown + GitHub Issue kèm ảnh.
8. Script tiện ích (trong `scripts/` của skill) nếu hữu ích: ví dụ `run-matrix.mjs` chạy feature×browser và tổng hợp kết quả JSON → bảng Markdown. Kiểm tra script chạy thật trên dự án `HW04/automation` (smoke) và ghi kết quả.

Cập nhật dự án `HW04/automation` dùng script của skill nếu áp dụng (không bắt buộc). Commit có message rõ (vd. `feat(skill): add playwright-data-driven-automation skill`).
Không viết spec feature A/B/C ở bước này.
AI log: tiếp tục `HW04/ai-log/execution/chat-b/`, ID `EXEC-P01-…`; prompt này do AI điều phối (chat A) soạn và gửi.
Checkpoint: tệp tạo/sửa, kiểm chứng (script chạy thật ra gì), log ID, commit. Dừng sau P01.
