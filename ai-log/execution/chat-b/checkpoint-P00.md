## Checkpoint P00 — intake + setup (chat B)

**Kết quả:** smoke 2 test pass trên cả 3 browser (chromium, firefox, webkit). Cả 3 HTML report có tiêu đề `EShop HW04 — smoke-<browser> — Run by: 23120229 — 2026-11-13T19:42:xx+07:00`, giá trị đó cũng nằm trong mục Metadata. SUT không bị sửa mã. Đã có 3 commit trong git local `HW04/`.

### Tệp tạo/sửa
- `HW04/submission-manifest.md`: 24 yêu cầu, mỗi yêu cầu có §/trang, sản phẩm, loại, trạng thái. Kèm 6 điểm đối chiếu phân tích A.
- `HW04/.gitignore`: bỏ qua `node_modules`, `test-results`, `playwright-report`, `reports/_scratch`, `work/`; vẫn track `automation/reports/<feature>-<browser>/`.
- `HW04/automation/`: `package.json` (`@playwright/test` 1.56.1, TS 5.7.2), `package-lock.json`, `playwright.config.ts`, `tsconfig.json`, `support/env.ts`, `README.md`, `tests/smoke.spec.ts`.
- `HW04/working-context.md`
- `HW04/ai-log/execution/chat-b/`: `P00-prompt.txt`, `checkpoint-P00.md`, `prompt_log.jsonl`, `prompt_log.md`
- Ngoài repo: `_tools/HW04/verify-report-runby.js`. Trong `_tools/HW04/work/` có `sut-baseline-before.txt`, `sut-baseline-after-P00.txt`, `sut-health-P00.txt`, `p00-smoke-reports/`, `p00-smoke-report-{chromium,firefox,webkit}.png`.

### Kiểm chứng
- `npx tsc --noEmit` → OK.
- `start.ps1` (không `-Mobile`) → backend/web/admin đã khởi động. `curl`: `/api/products` 200 (5 sản phẩm), `:5173` 200, `:5174` 200.
- Đăng nhập qua API: lần đầu tôi gọi sai `/api/auth/login` nên nhận 404 (lỗi của tôi). Sau khi đọc `server.js`, gọi đúng `POST /api/login` thì admin@eshop.com và test@eshop.com đều 200; token đã che trong evidence.
- `RUN_LABEL=smoke-$b REPORT_DIR=reports/_scratch/smoke-$b npx playwright test tests/smoke.spec.ts --project=$b`:
  - chromium: 2 passed (2.9s)
  - firefox: 2 passed (9.9s)
  - webkit: 2 passed (3.5s)
- `node _tools/HW04/verify-report-runby.js …` mở từng report bằng chromium headless → `runByInTitle`/`runByInBody` true, có ISO timestamp, `ok: true` cho cả 3. Đã xem ảnh webkit: header hiển thị rõ dòng Run by và timestamp.
- So baseline SUT trước/sau: HEAD `85af3ba`. Ngoài `backend/database.sqlite` (DB runtime, bị DROP + seed khi khởi động) thì không đổi. `frontend-mobile/App.js` và các tệp untracked đã thay đổi sẵn từ trước HW04.

### Sai lệch so với phân tích A (chi tiết trong manifest)
1. §14 yêu cầu ảnh chụp trang GitHub Issues trong ZIP. Đây là yêu cầu riêng, ngoài việc đính ảnh vào từng issue.
2. Video Task 2 phải có cả multi-browser run lẫn HTML report.
3. Commit smoke có đổi `.spec.ts` nhưng chỉ là spec hạ tầng, không nên dựa vào nó để đạt ≥8 commit.
4. Video demo skill “không lời” là lựa chọn của A, đề không yêu cầu.
5. Slide EN tr.30 minh họa mảng dữ liệu inline, nhưng đề HW04 cấm cách này.

### Giới hạn / quan sát
- Report smoke để ở `reports/_scratch` (gitignored) và đã sao lưu sang `_tools/HW04/work/p00-smoke-reports/`. Đây không phải report chính thức.
- Ngoài phạm vi, chưa xác minh là bug: response `/api/login` trả `user.password` dạng plaintext. Chờ A quyết định.
- SUT đang chạy (PID backend 1052, web 15700, admin 18928); chưa dừng.
- Repo SUT báo “dubious ownership”. Tôi chỉ đọc bằng `git -c safe.directory='*'` cho từng lệnh, không sửa global config.

### Log
`HW04/ai-log/execution/chat-b/prompt_log.jsonl` + `prompt_log.md`, record `EXEC-P00-001`.

Dừng sau P00, chờ prompt tiếp theo.
