## Checkpoint P01 — Agent Skill `playwright-data-driven-automation` (chat B)

**Kết quả:** skill đã viết xong và cả 3 script đã chạy thật trên `HW04/automation`. Smoke ma trận 3 browser: 6/6 pass, 3/3 report có “Run by: 23120229” + ISO timestamp. Các kiểm tra âm tính đều ra exit 1 như mong đợi. Chưa viết spec feature.

### Tệp tạo/sửa
- Baseline do A/đề tạo: commit `2a9f839` gồm `2026.HW04.Automation Testing_En.pdf` và `docs/`. Lưu ý: `docs/prompts/` lúc commit đã có cả nháp P01–P04 của A.
- Nguồn skill `_tools/skills/playwright-data-driven-automation/`; bản nộp `HW04/skills/playwright-data-driven-automation/` (giống hệt, đã kiểm bằng `diff -r`):
  - `SKILL.md`: frontmatter name/description gồm khi nào dùng và khi nào không. Thân có 8 bước: hạ tầng → chọn TC (S12 tr.12–13) → data JSON → AI từng bước + `ai-draft/` → ≥3 assertion → chạy ma trận → human review → triage/bug → báo cáo. Mỗi bước dẫn slide S12 tr.18 và AI-First tr.12–15, 28–30.
  - `references/prompt-templates.md`: 6 khung prompt từng bước (data → locator thật → POM → spec → assertion → review).
  - `references/data-and-assertions.md`: schema `id/title/type/input/expected/trace`, placeholder dữ liệu duy nhất, 7 pattern assertion.
  - `references/review-checklist.md`: 13 mục R1–R13, bảng gap analysis, phân loại nguyên nhân prompt/model/feature.
  - `references/triage-and-bugs.md`: phân loại bug SUT/lỗi test/môi trường/flaky/thiếu oracle, mẫu bug report, cách đăng issue.
  - `assets/playwright.config.template.ts`
  - `scripts/run-matrix.mjs`, `scripts/verify-report.mjs`, `scripts/check-data-driven.mjs`
- `HW04/automation/package.json`: thêm npm `matrix`, `matrix:smoke`, `verify:reports`, `check:data`, trỏ tới `../skills/...`.
- `HW04/automation/README.md`
- `HW04/working-context.md`
- `HW04/submission-manifest.md` (R13)
- Evidence trong `_tools/HW04/work/p01-skill-check/`: `RESULTS.md`, `summary.{md,json}`, `failcheck-summary.md`, `smoke-*-report.png`, `fixtures/`.

### Kiểm chứng (chạy thật, 2026-11-13 +07:00)
- `run-matrix.mjs --feature smoke=tests/smoke.spec.ts --browsers chromium,firefox,webkit --student-id 23120229` → exit 0, 3 report.
  - Summary: chromium 2/2 (19:49:30), firefox 2/2 (19:49:37), webkit 2/2 (19:49:51), tổng 6/6.
  - Bảng trạng thái từng test × browser đúng.
- `--summarize-only` → exit 0.
- Spec fail tạm `tests/zz-tmp-fail.spec.ts` (đã xóa ngay) → exit 1, summary ghi Failed 1, `FAIL (failed)`.
- `verify-report.mjs --student-id 23120229` → 3/3 ok, exit 0, có ảnh. Với ID sai `99999999` → 0/3, exit 1.
- `check-data-driven.mjs`:
  - Spec xấu (mảng inline + `waitForTimeout`) → exit 1, báo inline array, không nạp data, hard wait, 1 pattern.
  - Spec tốt (import JSON, 3 pattern) → exit 0.
  - `tests/` (smoke) → exit 1, đúng vì smoke không nạp data.
- `npm run matrix:smoke` → exit 0, 6/6 pass (19:50:55–19:51:17).

### Giới hạn
- `check-data-driven` dò bằng regex, không phân tích AST. Kết quả chỉ là gợi ý để người review xác nhận.
- Chưa chạy vòng eval with/without-skill của skill-creator, vì vòng đó cần subagent mà prompt cấm. Mới dùng skill-creator để định dạng.
- Demo skill end-to-end trên một feature và video §7 chưa làm. Video do sinh viên quay/upload.
- Ghi chú `/api/login` trả mật khẩu plaintext: chỉ lưu trong `working-context.md`, không đăng issue.

### Log
`HW04/ai-log/execution/chat-b/prompt_log.jsonl` + `prompt_log.md`, record `EXEC-P01-001`.

Dừng sau P01, chờ prompt tiếp theo.
