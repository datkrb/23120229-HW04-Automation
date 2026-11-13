Vai trò: Chat thực hiện.
Dùng skill software-testing-ai-first (`D:/KI7/testing/_tools/skills/software-testing-ai-first/SKILL.md`) cho HW04 — Automation Testing môn Kiểm thử phần mềm. Một chat khác phụ trách phân tích/điều phối; bạn thực hiện bước này và tự ghi AI log của chính chat bạn. Trao đổi tiếng Việt. Không tạo chat/session/subagent khác để chuyển việc.

Workspace: `D:/KI7/testing` (đọc `AGENTS.md`). Thư mục bài: `D:/KI7/testing/HW04`. Script phụ trợ (QA, đóng gói, thao tác tạm) đặt ở `D:/KI7/testing/_tools/HW04/`, output tạm ở `_tools/HW04/work/`.

Nguồn cần đọc:
- Đề: `HW04/2026.HW04.Automation Testing_En.pdf` (toàn bộ 8 trang) và phân tích của chat A: `HW04/docs/assignment-analysis.md` (đối chiếu lại với đề, không tin mù quáng).
- Quy định chung: `___2026.Homework.Policies.md`.
- Slide: `slide/S12_Automation testing.pdf` tr.12–13,18; `slide/EN.Automation & Regression Testing AI-First (Redesigned).pdf` tr.12–15, 28–30.
- SRS: `eshop-sut/README.md` mục FR-01, FR-08, FR-12, FR-17 và §1 tài khoản; `eshop-sut/LOCAL_SETUP.md`, `eshop-sut/start.ps1`, `eshop-sut/stop.ps1`.
- TC nguồn HW02: `HW02/features/a-fr01-register-web/04-test-cases.md`, `HW02/features/b-fr08-checkout-web/04-test-cases.md`, `HW02/features/c-fr17-coupon-admin/04-test-cases.md`.
- Mẫu log/audit: `_tools/skills/software-testing-ai-first/references/templates.md`, `two-chat-workflow.md`; helper `_tools/skills/software-testing-ai-first/scripts/append_ai_log.py`.

Phạm vi đã chốt: 3 feature web của HW02 — A: FR-01 Đăng ký (Web :5173), B: FR-08 Checkout (Web :5173), C: FR-17 Quản lý coupon (Admin :5174). Student ID `23120229`. Playwright + TypeScript, 3 project chromium/firefox/webkit. Người dùng cho phép AI đăng GitHub Issues lên `datkrb/SUT_Issue` (ở bước sau, không phải bước này); **không** tạo repo GitHub, không push, không upload YouTube.

Bước này (P00 — intake + setup, chưa viết test feature):
1. Intake: kiểm tra đề/phân tích A, ghi bản đồ yêu cầu → sản phẩm của bạn tại `HW04/submission-manifest.md` (yêu cầu | nguồn §/trang | sản phẩm | bắt buộc/khuyến khích | trạng thái). Ghi sai lệch nếu thấy phân tích A sai.
2. Khởi tạo git repo local tại `HW04/` (nếu chưa có), `.gitignore` hợp lý (node_modules, test-results, work tạm; **giữ** thư mục reports chính thức sau này). Không đụng repo SUT.
3. Tạo dự án Playwright trong `HW04/automation/`: `package.json`, `playwright.config.ts` với 3 project (chromium, firefox, webkit), baseURL web/admin cấu hình qua env, HTML reporter có tiêu đề/metadata hiển thị rõ “Run by: 23120229” + ISO timestamp lúc chạy (ví dụ `2026-11-13T19:30:00+07:00`), `outputFolder` cho phép chọn qua env để mỗi run feature×browser ra một report riêng. Cài browser Playwright nếu thiếu. Xác minh report thật hiển thị dòng Run by (mở HTML hoặc đọc nội dung/screenshot).
4. Khởi động SUT bằng `eshop-sut/start.ps1` (không `-Mobile`), kiểm tra :3000/:5173/:5174 trả 200 và đăng nhập tài khoản mẫu qua API. Không sửa mã SUT.
5. Viết 1 smoke spec tạm (`tests/smoke.spec.ts`) mở trang chủ Web + Admin login, chạy trên cả 3 browser, sinh report; ghi kết quả thật. Đây chỉ là kiểm tra hạ tầng, không tính vào ≥12 TC.
6. Tạo `HW04/working-context.md` (vai trò, phạm vi, trạng thái, log, bước tiếp).
7. Commit từng bước có message rõ (ví dụ `chore(hw04): init playwright project`, `test(smoke): add infra smoke spec`).

Artifact: `HW04/submission-manifest.md`, `HW04/automation/**`, `HW04/working-context.md`, `HW04/ai-log/execution/chat-b/`.
Tiêu chí kiểm tra: 3 browser chạy được smoke; report HTML có “Run by: 23120229” + ISO timestamp; git log có commit; SUT không bị sửa.
AI log: `HW04/ai-log/execution/chat-b/prompt_log.jsonl` (+ Markdown do helper sinh), ID `EXEC-P00-001`…; lưu prompt nhận nguyên văn (prompt này do AI điều phối — Claude Code chat A — soạn và gửi), output nguyên văn của bạn, công cụ/model nếu biết, thời gian Asia/Saigon thật; phần không capture được ghi `partial` + `missing`.
Checkpoint: trả danh sách tệp tạo/sửa, lệnh kiểm chứng + kết quả, giới hạn/blocker, log ID/path, commit hash. Dừng sau P00, chờ prompt tiếp theo.
