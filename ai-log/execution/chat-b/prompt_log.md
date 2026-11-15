<!-- generated-by: software-testing-ai-first/append_ai_log.py -->

# AI prompt/output log

Canonical source: the accompanying JSONL. Human review is recorded separately.

## EXEC-P00-001

```text
{
  "id": "EXEC-P00-001",
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "prompt_origin": "AI orchestrator chat A (Claude Code session local_8f71b54f-a935-4aab-b94a-932f8a30f545) authored and sent this prompt; not student-authored",
  "source": "Prompt: the session-start message received by chat B, saved verbatim to P00-prompt.txt. Output: the checkpoint message B produced, saved verbatim to checkpoint-P00.md. Tool calls and their results are not serialized here; artifacts and evidence paths are listed.",
  "capture_status": "partial",
  "missing": [
    "Exact prompt receipt time is unavailable. The earliest tool-observed time in this turn is 2026-11-13T19:30:28+07:00 (sut-baseline-before.txt). Smoke runs happened 19:42:30-19:42:53+07:00. recorded_at is capture time only.",
    "Full tool call/result transcript (reads, shell commands, outputs) is not exported. Only the resulting artifacts and evidence files are kept.",
    "Short progress notes B sent to the user mid-turn are not included.",
    "The final chat reply appends the hash of the commit that contains this log, which was not known when the record was written."
  ],
  "artifact_paths": [
    "HW04/submission-manifest.md",
    "HW04/.gitignore",
    "HW04/automation/package.json",
    "HW04/automation/playwright.config.ts",
    "HW04/automation/tsconfig.json",
    "HW04/automation/support/env.ts",
    "HW04/automation/README.md",
    "HW04/automation/tests/smoke.spec.ts",
    "HW04/working-context.md",
    "_tools/HW04/verify-report-runby.js",
    "_tools/HW04/work/sut-health-P00.txt",
    "_tools/HW04/work/sut-baseline-before.txt",
    "_tools/HW04/work/sut-baseline-after-P00.txt",
    "_tools/HW04/work/p00-smoke-reports/",
    "_tools/HW04/work/p00-smoke-report-chromium.png",
    "_tools/HW04/work/p00-smoke-report-firefox.png",
    "_tools/HW04/work/p00-smoke-report-webkit.png"
  ],
  "redactions": [
    "JWT tokens in sut-health-P00.txt replaced by <redacted>"
  ],
  "recorded_at": "2026-11-13T19:45:24+07:00"
}
```


### Prompt (verbatim)

```text
Background (from the session that started this one):
HW04 Automation Testing (Playwright, data-driven, 3 browser) cho môn Kiểm thử phần mềm FIT HCMUS, sinh viên 23120229. Người dùng chọn quy trình hai chat như HW03: chat A (session gửi prompt này) phân tích/điều phối và tự gửi từng prompt; chat B (bạn) thực hiện và tự ghi AI log của mình. Feature: FR-01 đăng ký, FR-08 checkout, FR-17 coupon admin. Chỉ được phép đăng GitHub Issues (ở bước sau); không tạo repo public, không push, không upload YouTube — sinh viên tự làm. Video có giọng nói thật do sinh viên quay.

Task:
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

Shared notes folder for this group of sessions (outside the repo; read siblings' notes there, leave hand-over notes or large findings there instead of pasting them into messages): C:\Users\ADMIN\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\side-session-notes\local_8f71b54f-a935-4aab-b94a-932f8a30f545
```


### AI output (verbatim)

```text
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
```


## EXEC-P01-001

```text
{
  "id": "EXEC-P01-001",
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "prompt_origin": "AI orchestrator chat A (Claude Code session local_8f71b54f-a935-4aab-b94a-932f8a30f545) authored and sent this prompt as a cross-session message; not student-authored",
  "source": "Prompt: cross-session message received by chat B, saved verbatim to P01-prompt.txt (the transport wrapper is not included). Output: the checkpoint message B produced, saved verbatim to checkpoint-P01.md. Tool calls are not serialized. Skill files and evidence are listed in artifact_paths.",
  "capture_status": "partial",
  "missing": [
    "Exact prompt receipt time is unavailable. Tool-observed times in this turn: matrix run 2026-11-13T19:49:30+07:00 to 19:51:17+07:00. recorded_at is capture time only.",
    "The full tool call/result transcript is not exported, including the skill-creator skill text that was loaded for format guidance.",
    "Short progress notes B sent mid-turn are not included.",
    "The hash of the commit that contains this log is reported only in the final chat reply."
  ],
  "artifact_paths": [
    "_tools/skills/playwright-data-driven-automation/",
    "HW04/skills/playwright-data-driven-automation/",
    "HW04/automation/package.json",
    "HW04/automation/README.md",
    "HW04/working-context.md",
    "HW04/submission-manifest.md",
    "_tools/HW04/work/p01-skill-check/RESULTS.md",
    "_tools/HW04/work/p01-skill-check/summary.md",
    "_tools/HW04/work/p01-skill-check/failcheck-summary.md",
    "_tools/HW04/work/p01-skill-check/fixtures/"
  ],
  "redactions": [],
  "recorded_at": "2026-11-13T19:53:01+07:00"
}
```


### Prompt (verbatim)

```text
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
```


### AI output (verbatim)

```text
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
```


## EXEC-P02-001

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P02-001",
  "prompt_origin": "AI orchestrator chat A (session local_8f71b54f-a935-4aab-b94a-932f8a30f545) authored and sent this prompt as a cross-session message; not student-authored",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: cross-session message received by B, saved verbatim in P02-prompt.txt. Output: B's end-of-turn status messages from 2026-11-13, saved in P02-interim-outputs-2026-11-13.md. The final output for P02 is in EXEC-P02-005.",
  "missing": [
    "Exact receipt time unknown. Tool-observed times 2026-11-13: draft run started 19:57 (12:57Z), final run 20:46-20:55 +07:00.",
    "Full tool call/result transcript not exported.",
    "The turn that ran commit + final run3 was interrupted when the machine restarted, so it has no closing message."
  ],
  "artifact_paths": [
    "HW04/features/A-FR01/",
    "HW04/automation/data/fr01-register.json",
    "HW04/automation/pages/RegisterPage.ts",
    "HW04/automation/tests/fr01-register.spec.ts"
  ],
  "recorded_at": "2026-11-15T18:19:03+07:00"
}
```


### Prompt (verbatim)

```text
Vai trò: Chat thực hiện. Tiếp tục HW04 (P02 — Feature A: FR-01 Đăng ký, Web :5173). A đã đối soát P01: chấp nhận (skill + scripts run-matrix/verify-report/check-data-driven, commit 55ad041…8761ca8). Dùng `run-matrix`, `verify-report`, `check-data-driven` của skill khi chạy/kiểm.

Áp dụng skill `playwright-data-driven-automation` (đọc SKILL.md của nó trước) + software-testing-ai-first. Oracle = SRS FR-01 (`eshop-sut/README.md`), không lấy hành vi code làm expected.

Làm theo từng bước, **commit sau mỗi bước** có chạm `.spec.ts` khi phù hợp (đề §12 yêu cầu ≥8 commit chạm spec cho cả bài):
1. Chọn ≥12 TC (khuyến nghị 12–16) từ `HW02/features/a-fr01-register-web/04-test-cases.md`, phủ positive/negative/edge (bắt buộc trường, định dạng email, email trùng, mỗi điều kiện mật khẩu mạnh, biên 7/8 ký tự, ký tự đặc biệt ngoài tập, confirm không khớp, chuyển trang Login sau thành công…). Ghi mapping HW02 TC → HW04 auto ID và TC không automate + lý do tại `HW04/features/A-FR01/selection.md`.
2. Khảo sát DOM thật trang đăng ký (role/label/placeholder/test-id, thông báo lỗi, HTML5 validation) và ghi locator inventory.
3. Data file `HW04/automation/data/fr01-register.json` (không inline array trong spec). Email duy nhất sinh theo run từ template trong data (vd. `{{unique}}`), không hard-code email đã tồn tại trừ case trùng (`test@eshop.com`).
4. Sinh bản **AI draft** của POM + spec (`pages/RegisterPage.ts`, `tests/fr01-register.spec.ts`) bằng prompt riêng từng bước; lưu nguyên văn bản draft vào `HW04/features/A-FR01/ai-draft/` và commit nguyên trạng (`test(fr01): AI draft data-driven register spec`).
5. Chạy draft trên chromium/firefox/webkit, ghi kết quả thật.
6. Human-review checklist của skill: liệt kê lỗi AI (selector, assertion, edge thiếu, wait, isolation, oracle), sửa, commit từng nhóm sửa (`fix(fr01): ...`). ≥3 assertion pattern khác nhau, ghi pattern nào ở TC nào. Lưu diff draft→final `HW04/features/A-FR01/review.md` (lỗi | bằng chứng | sửa | vì sao AI sai).
7. Chạy bản cuối từng browser ra report riêng tại `HW04/automation/reports/fr01-<browser>/index.html` (đúng quy ước P00; Run by: 23120229 + ISO). Fail do SUT giữ nguyên fail (không `test.fail`/skip để che), xác minh là bug thật bằng tay/ảnh; flaky thì sửa test. Ghi bảng kết quả `HW04/features/A-FR01/results.md` (TC × browser) và bug candidates (kèm screenshot) — chưa đăng Issues ở bước này. Đối chiếu bug HW02 đã có ở `datkrb/SUT_Issue` (#1–#11, đọc công khai) để tránh trùng.

AI log: `HW04/ai-log/execution/chat-b/`, ID `EXEC-P02-…`, ghi riêng từng prompt sinh code của bước 4 (đó là bằng chứng "drive AI step by step"); prompt này do chat A soạn và gửi.
Checkpoint: số TC automated/pass/fail theo browser, bug candidates, tệp, commit hash, log ID. Dừng sau P02.
```


### AI output (verbatim)

```text
Các tin nhắn trạng thái chat B gửi ở cuối mỗi lượt ngày 2026-11-13, trong lúc bản draft FR-01 chạy nền. Đây là nguyên văn đã thấy trong chat; định dạng Markdown có thể khác chút về xuống dòng.

--- (1) cuối lượt nhận prompt P02 ---
Bản draft AI đang chạy trên 3 browser. Tôi chưa có checkpoint P02 nào để báo.

- **Tốc độ:** draft chạy chậm, mỗi test chờ hết timeout 30 giây. Có thể do draft luôn điền vào ô “Xác nhận mật khẩu”, mà ô này không có trên trang. Ước tính khoảng 10 phút cho mỗi browser.
- **Đã xong và commit:**
  - `2368783`: chọn 19 TC, khảo sát DOM thật trên 3 browser, file data JSON.
  - `ea21d8a`: bản AI draft nguyên trạng (D1 page object, D2 khung spec, D3 assertion), kèm prompt của từng bước.
- **Bản sửa sau review:** đã soạn ở `_tools/HW04/work/fr01-stage/`. Tôi chờ draft chạy xong mới chép vào dự án, để không làm sai kết quả chạy draft.

Khi draft chạy xong, tôi tiếp tục với review, chạy bản cuối và checkpoint P02.

--- (2) sau sự kiện monitor chromium ---
Đã có kết quả draft trên chromium: hầu hết test hết thời gian ở bước `locator.fill`. Nguyên nhân có thể là draft điền vào ô xác nhận mật khẩu, mà ô này không có trên trang; tôi sẽ kiểm tra khi viết review. Firefox và webkit vẫn đang chạy, tôi chưa đổi gì trong `automation/`.

--- (3) sau sự kiện monitor firefox ---
Firefox cho kết quả giống chromium: các test đều hết thời gian ở `locator.fill`. Tôi đang chờ webkit chạy xong rồi mới chép bản đã sửa vào dự án.

--- (4) sau sự kiện monitor webkit bắt đầu ---
Webkit đang chạy, đây là browser cuối của bản draft. Khi xong tôi sẽ chép bản đã sửa vào dự án.

--- (5) lượt bị ngắt khi máy khởi động lại ---
Không có tin nhắn kết thúc; lệnh commit + chạy lại cuối (run3) bị ngắt giữa firefox. Commit 1fb5055 và 4993ad4 đã được ghi trước khi ngắt (git log 2026-11-15 xác nhận).
```


## EXEC-P02-002

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P02-002",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P02 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/A-FR01/ai-draft/prompts/D1-page-object.txt (verbatim). Output: the draft file(s) written verbatim by B in reply, committed unchanged in ea21d8a.",
  "missing": [
    "Exact time unknown. The draft was committed in ea21d8a on 2026-11-13, before the 19:57 +07:00 draft run.",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat. Generation conditions are disclosed rather than a clean-room prompt."
  ],
  "artifact_paths": [
    "HW04/features/A-FR01/ai-draft/prompts/D1-page-object.txt",
    "HW04/features/A-FR01/ai-draft/pages/RegisterPage.ts"
  ],
  "recorded_at": "2026-11-15T18:19:03+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P02-002 · bước D1 · prompt B tự soạn từ khung P-c của skill playwright-data-driven-automation]
Dùng locator đã chốt trong HW04/features/A-FR01/locator-inventory.md (khảo sát DOM thật /register trên 3 browser):
- tiêu đề: getByRole('heading', { name: 'Đăng Ký Tài Khoản' }); card = heading.locator('..')
- input không có label liên kết: neo bằng div chứa <label> có text "Họ Tên" / "Email" / "Mật khẩu" / "Xác nhận mật khẩu" rồi lấy input trong div đó
- nút: getByRole('button', { name: 'Đăng Ký' })
- banner lỗi app: div con trực tiếp của card (không role)
Viết automation/pages/RegisterPage.ts (Playwright + TypeScript): mỗi locator một thuộc tính, action goto(), fill(input) điền name/email/password/confirm, submit(). Không chứa assertion, không dùng waitForTimeout.
```


### AI output (verbatim)

```text
// ===== features/A-FR01/ai-draft/pages/RegisterPage.ts =====
import { Locator, Page } from '@playwright/test';

export interface RegisterInput {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

export class RegisterPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly card: Locator;
  readonly form: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmInput: Locator;
  readonly submitButton: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Đăng Ký Tài Khoản' });
    this.card = this.heading.locator('..');
    this.form = this.card.locator('form');
    this.nameInput = this.fieldByLabel('Họ Tên');
    this.emailInput = this.fieldByLabel('Email');
    this.passwordInput = this.fieldByLabel('Mật khẩu');
    this.confirmInput = this.fieldByLabel('Xác nhận mật khẩu');
    this.submitButton = page.getByRole('button', { name: 'Đăng Ký' });
    this.errorBanner = this.card.locator(':scope > div');
  }

  private fieldByLabel(label: string): Locator {
    return this.form
      .locator('div')
      .filter({ has: this.page.locator('label', { hasText: label }) })
      .locator('input');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async fill(input: RegisterInput) {
    if (input.name !== undefined) await this.nameInput.fill(input.name);
    if (input.email !== undefined) await this.emailInput.fill(input.email);
    if (input.password !== undefined) await this.passwordInput.fill(input.password);
    if (input.confirm !== undefined) await this.confirmInput.fill(input.confirm);
  }

  async submit() {
    await this.submitButton.click();
  }
}
```


## EXEC-P02-003

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P02-003",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P02 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/A-FR01/ai-draft/prompts/D2-spec.txt (verbatim). Output: the draft file(s) written verbatim by B in reply, committed unchanged in ea21d8a.",
  "missing": [
    "Exact time unknown. The draft was committed in ea21d8a on 2026-11-13, before the 19:57 +07:00 draft run.",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat. Generation conditions are disclosed rather than a clean-room prompt."
  ],
  "artifact_paths": [
    "HW04/features/A-FR01/ai-draft/prompts/D2-spec.txt",
    "HW04/features/A-FR01/ai-draft/tests/fr01-register.spec.d2-skeleton.ts"
  ],
  "recorded_at": "2026-11-15T18:19:04+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P02-003 · bước D2 · prompt B tự soạn từ khung P-d của skill]
Viết automation/tests/fr01-register.spec.ts: import rows từ ../data/fr01-register.json (không định nghĩa dữ liệu trong spec), lặp sinh test tên `${row.id} ${row.title}`, theo 3A (Arrange: RegisterPage.goto; Act: fill + submit; Assert theo expected.kind). Thay placeholder {{unique}} trong input bằng giá trị duy nhất theo project + thời gian để 3 browser không trùng email. Mỗi test tự setup, không phụ thuộc test khác. Rẽ nhánh theo expected.kind: success, reject, success-then-duplicate, structure. Assertion chi tiết để bước D3.
```


### AI output (verbatim)

```text
// ===== features/A-FR01/ai-draft/tests/fr01-register.spec.d2-skeleton.ts =====
import { test } from '@playwright/test';
import rows from '../data/fr01-register.json';
import { RegisterPage, RegisterInput } from '../pages/RegisterPage';

type Row = (typeof rows)[number];

function materialize(input: RegisterInput, unique: string): RegisterInput {
  const out: RegisterInput = {};
  for (const [k, v] of Object.entries(input)) {
    (out as Record<string, string>)[k] = typeof v === 'string' ? v.replace('{{unique}}', unique) : v;
  }
  return out;
}

test.describe('FR-01 Đăng ký tài khoản', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ page }, testInfo) => {
      // Arrange
      const unique = `a${testInfo.project.name}${Date.now()}`;
      const input = materialize(row.input as RegisterInput, unique);
      const register = new RegisterPage(page);
      await register.goto();

      // Act
      await register.fill(input);
      await register.submit();

      // Assert — chi tiết ở bước D3 theo row.expected.kind
      switch (row.expected.kind) {
        case 'success':
          break;
        case 'reject':
          break;
        case 'success-then-duplicate':
          break;
        case 'structure':
          break;
      }
    });
  }
});
```


## EXEC-P02-004

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P02-004",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P02 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/A-FR01/ai-draft/prompts/D3-assertions.txt (verbatim). Output: the draft file(s) written verbatim by B in reply, committed unchanged in ea21d8a.",
  "missing": [
    "Exact time unknown. The draft was committed in ea21d8a on 2026-11-13, before the 19:57 +07:00 draft run.",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat. Generation conditions are disclosed rather than a clean-room prompt."
  ],
  "artifact_paths": [
    "HW04/features/A-FR01/ai-draft/prompts/D3-assertions.txt",
    "HW04/features/A-FR01/ai-draft/tests/fr01-register.spec.ts"
  ],
  "recorded_at": "2026-11-15T18:19:04+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P02-004 · bước D3 · prompt B tự soạn từ khung P-e của skill]
Oracle (SRS FR-01/21/22, HW02 §3): OK = response đăng ký thành công + tới trang có chức năng Đăng nhập (/login); REJ = không hoàn tất đăng ký (không chuyển trang, không có request đăng ký thành công) + có tín hiệu validation gắn với trường sai (native validity của ô đó hoặc banner lỗi app nhắc tới trường), không ép wording; structure = có ô xác nhận, email type=email, password/confirm type=password, nhãn bắt buộc có *, đúng 1 h1.
Với từng expected.kind chọn assertion web-first, dùng ít nhất 3 pattern khác nhau trong suite (URL, response, nội dung/visible, attribute/validity, count, soft). Negative phải kiểm "không được xảy ra". Không test.fail/test.skip để né; nghi SUT sai thì giữ assertion theo đặc tả.
```


### AI output (verbatim)

```text
// ===== features/A-FR01/ai-draft/tests/fr01-register.spec.ts =====
import { expect, test } from '@playwright/test';
import rows from '../data/fr01-register.json';
import { RegisterInput, RegisterPage } from '../pages/RegisterPage';

type Row = (typeof rows)[number];

function materialize(input: RegisterInput, unique: string): RegisterInput {
  const out: RegisterInput = {};
  for (const [k, v] of Object.entries(input)) {
    (out as Record<string, string>)[k] = typeof v === 'string' ? v.replace('{{unique}}', unique) : v;
  }
  return out;
}

const FIELD_KEYWORDS: Record<string, RegExp> = {
  name: /họ tên|tên/i,
  email: /email/i,
  password: /mật khẩu/i,
  confirm: /xác nhận/i,
};

test.describe('FR-01 Đăng ký tài khoản', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ page }, testInfo) => {
      // Arrange
      const unique = `a${testInfo.project.name}${Date.now()}`;
      const input = materialize(row.input as RegisterInput, unique);
      const register = new RegisterPage(page);
      await register.goto();

      if (row.expected.kind === 'structure') {
        const exp = row.expected as any;
        // Pattern: soft assertions over attributes / count
        for (const label of exp.requiredLabels) {
          await expect.soft(page.locator('label', { hasText: label })).toContainText('*');
        }
        await expect.soft(register.confirmInput).toBeVisible();
        await expect.soft(register.emailInput).toHaveAttribute('type', exp.types.email);
        await expect.soft(register.passwordInput).toHaveAttribute('type', exp.types.password);
        await expect.soft(register.confirmInput).toHaveAttribute('type', exp.types.confirm);
        await expect.soft(page.locator('h1')).toHaveCount(exp.h1Count);
        return;
      }

      // Act
      await register.fill(input);
      const registerResponse = page.waitForResponse(
        (r) => r.url().endsWith('/api/register') && r.request().method() === 'POST',
      );
      await register.submit();

      // Assert
      if (row.expected.kind === 'success') {
        const res = await registerResponse;
        expect(res.ok()).toBeTruthy();
        await expect(page).toHaveURL(/\/login$/);
      } else if (row.expected.kind === 'reject') {
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(/\/register$/);
        const field = (row.expected as any).field as string;
        await expect(register.errorBanner).toContainText(FIELD_KEYWORDS[field]);
      } else if (row.expected.kind === 'success-then-duplicate') {
        const res = await registerResponse;
        expect(res.ok()).toBeTruthy();
        await expect(page).toHaveURL(/\/login$/);
        // second attempt with the same email
        await register.goto();
        await register.fill(input);
        await register.submit();
        await expect(page).toHaveURL(/\/register$/);
        await expect(register.errorBanner).toContainText(/email/i);
      }
    });
  }
});
```


## EXEC-P02-005

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P02-005",
  "prompt_origin": "AI orchestrator chat A sent this resume message as a cross-session message after the machine restart; not student-authored",
  "occurred_at": "2026-11-15T18:05:00+07:00",
  "timestamp_source": "observed",
  "capture_status": "partial",
  "source": "Prompt: cross-session message (P02-resume-prompt.txt, verbatim). Output: checkpoint-P02.md (verbatim checkpoint). occurred_at is approximate, taken from the SUT restart just after receipt (backend started ~18:0x; first final run at 18:09:14 +07:00).",
  "missing": [
    "occurred_at is approximate to the minute, not the exact receipt time.",
    "Full tool call/result transcript not exported.",
    "The hash of the commit containing this log is only in the final chat reply."
  ],
  "artifact_paths": [
    "HW04/features/A-FR01/review.md",
    "HW04/features/A-FR01/results.md",
    "HW04/automation/reports/fr01-chromium/",
    "HW04/automation/reports/fr01-firefox/",
    "HW04/automation/reports/fr01-webkit/",
    "HW04/working-context.md"
  ],
  "recorded_at": "2026-11-15T18:19:04+07:00"
}
```


### Prompt (verbatim)

```text
Tiếp tục P02 (FR-01) sau khi máy khởi động lại (2026-11-15): SUT hiện tắt (:3000/:5173/:5174 không phản hồi) — khởi động lại bằng `eshop-sut/start.ps1`. Trạng thái A thấy: commit tới 4993ad4; chưa track `automation/reports/fr01-*`, `features/A-FR01/final-run/`, `features/A-FR01/evidence/report-shots/`, `ai-log/execution/chat-b/P02-prompt.txt`; còn thiếu `features/A-FR01/review.md`, `results.md`, bug candidates + screenshot, và log `EXEC-P02-…`. Nếu report fr01-* chạy trước khi sửa cuối (4993ad4) thì chạy lại 3 browser để report khớp code. Hoàn tất các bước 6–7 của P02, commit, ghi log, rồi trả checkpoint. Không ghi đè/xóa lịch sử đã có.
```


### AI output (verbatim)

```text
## Checkpoint P02 — Feature A: FR-01 Đăng ký (chat B)

**Kết quả:** 20 TC được automate (19 TC từ HW02 + 1 TC bổ sung). Chạy cuối trên 3 browser ngày 2026-11-15, code `4993ad4`:

| Browser | Pass | Fail |
|---|---|---|
| chromium | 9 | 11 |
| firefox | 9 | 11 |
| webkit | 9 | 11 |

- Tổng 60 lần chạy: 27 pass, 33 fail, 0 flaky, 0 skipped.
- 3/3 report hiển thị “Run by: 23120229” + ISO timestamp (`verify-report` exit 0).
- Mọi fail đều do SUT, đã phân loại trong `features/A-FR01/results.md`. Không dùng `test.fail` hay `skip`.

### Bug candidates (chưa đăng Issues)
- BC-A1, mật khẩu hợp lệ theo SRS bị từ chối: **trùng #1**.
- BC-A2, thiếu ô xác nhận, thiếu `*`, email `type=text`, không có `h1`: **trùng #2**.
- **Mới:**
  - BC-A3: mật khẩu dùng dấu cách thay ký tự đặc biệt vẫn được chấp nhận (A-AUTO-20, 3 browser).
  - BC-A4: email thiếu `@` vẫn đăng ký được (probe P1).
  - BC-A5: email trùng `test@eshop.com` vẫn đăng ký được, tạo user id 4 (probe P2, đề xuất High).
- BC-A4/A5 bị BC-A1 che trong suite: A-AUTO-13/14 fail vì thông báo mật khẩu. Bằng chứng cô lập lấy từ probe khám phá chạy trên chromium ngày 2026-11-13. Ảnh và JSON ở `features/A-FR01/evidence/`.

### Bản AI draft → review
- Bản draft (commit `ea21d8a`, 3 prompt D1–D3) chạy **0/19 pass trên cả 3 browser**. Mọi test timeout ở `fill` của ô confirm không tồn tại.
- `features/A-FR01/review.md` ghi 10 lỗi AI. Mỗi lỗi có bằng chứng, commit sửa và nguyên nhân (prompt, model hay feature). Các nhóm chính:
  - xử lý control thiếu;
  - locator `hasText` khớp chuỗi con;
  - `waitForTimeout`;
  - REJ bỏ sót native validation;
  - `field` ghép `email|confirm`;
  - `waitForResponse` treo;
  - oracle OK chưa chứng minh trang Đăng nhập;
  - structure soft-timeout;
  - thiếu biên dấu cách;
  - thông điệp REJ mơ hồ.
- Có ghi minh bạch 1 lỗi do chính reviewer tạo rồi tự sửa: `has:` neo vào form nên không bao giờ khớp.
- 7 assertion pattern (`check-data-driven` OK): URL, visible, content, count, attribute/validity, response, soft, poll. Bảng TC dùng pattern nào có trong review.md.

### TC không automate
A-TC-019 (màu và ngôn ngữ), A-TC-020 (Tab order), A-TC-021 (Step Indicator, form 1 bước), A-TC-022 (phụ thuộc ô confirm), A-TC-023 (API). Lý do ở `selection.md`.

### Tệp
- `features/A-FR01/`: `selection.md`, `locator-inventory.md`, `dom-survey-register.json`, `ai-draft/**` (prompts D1–D3 + draft nguyên văn), `draft-run-summary.md`, `review.md`, `results.md`, `final-run/summary.{md,json}`, `evidence/{failures,report-shots,probe-*}`.
- `automation/`: `data/fr01-register.json` (20 dòng), `pages/RegisterPage.ts`, `tests/fr01-register.spec.ts`, `reports/fr01-{chromium,firefox,webkit}/`.
- `_tools/HW04/`: `survey-dom.js`, `probe-fr01.js`, `work/debug-fr01.spec.ts`, các log chạy `work/p02-*.log`.
- `working-context.md`

### Commit
| Commit | Nội dung | Có đổi spec? |
|---|---|---|
| `2368783` | chọn TC, khảo sát DOM, data | không |
| `ea21d8a` | AI draft | có |
| `7a5abb3` | review fix | có |
| `b6be9ae` | structure fix | có |
| `1fb5055` | A-AUTO-20 + probe evidence | không (chỉ data) |
| `4993ad4` | REJ fix | có |
| `d1a7706` | reports + review/results | không |

Thêm 1 commit log/context; hash nằm ở tin nhắn trả lời. Có 4 commit thay đổi `.spec.ts`, đóng góp vào yêu cầu ≥8 của §12.

### Giới hạn / lưu ý cho A
- Report có trace nên khá nặng: fr01-chromium 3.9 MB, firefox 14 MB, webkit 4.4 MB. 9 report có thể vượt giới hạn Moodle 20 MB/tệp khi đóng ZIP. Cân nhắc tắt trace cho lần chạy chính thức ở P05, hoặc tách ZIP.
- A-AUTO-09 (`#` ngoài tập) và A-AUTO-20 là diễn giải SRS của AI, chờ sinh viên xác nhận.
- Probe khám phá dùng mật khẩu chọn sau khi đọc code để cô lập lỗi bị che; không dùng làm oracle.
- Máy khởi động lại giữa chừng. Lần chạy 2026-11-13 lúc 20:5x bị ngắt khi đang chạy firefox, nên đã chạy lại toàn bộ ngày 2026-11-15 sau khi `start.ps1` (DB được seed lại).
- Human review của sinh viên: pending.

### Log
`HW04/ai-log/execution/chat-b/prompt_log.jsonl` + `.md`:
- `EXEC-P02-001`: prompt P02 từ A, kèm các tin nhắn trạng thái ngày 11-13.
- `EXEC-P02-002`, `003`, `004`: các bước D1, D2, D3 sinh draft.
- `EXEC-P02-005`: prompt tiếp tục sau khởi động lại, output là checkpoint này.

Dừng sau P02, chờ prompt tiếp theo.
```


## EXEC-P03-001

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P03-001",
  "prompt_origin": "AI orchestrator chat A (session local_8f71b54f-a935-4aab-b94a-932f8a30f545) authored and sent this prompt as a cross-session message; not student-authored",
  "occurred_at": "2026-11-15T18:19:57+07:00",
  "timestamp_source": "observed",
  "capture_status": "partial",
  "source": "Prompt: cross-session message, saved verbatim to P03-prompt.txt. Output: checkpoint-P03.md (verbatim). occurred_at is the first tool-observed time after receipt (`date -Iseconds` at the start of the turn).",
  "missing": [
    "occurred_at is the first tool-observed time in the turn, not the exact receipt time.",
    "Full tool call/result transcript not exported; short progress notes sent mid-turn are not included.",
    "The hash of the commit containing this log is only in the final chat reply."
  ],
  "artifact_paths": [
    "HW04/features/B-FR08/",
    "HW04/automation/data/fr08-checkout.json",
    "HW04/automation/pages/CartPage.ts",
    "HW04/automation/pages/CheckoutPage.ts",
    "HW04/automation/tests/fr08-checkout.spec.ts",
    "HW04/automation/reports/fr08-chromium/",
    "HW04/automation/reports/fr08-firefox/",
    "HW04/automation/reports/fr08-webkit/",
    "_tools/HW04/survey-fr08.js"
  ],
  "recorded_at": "2026-11-15T18:40:42+07:00"
}
```


### Prompt (verbatim)

```text
Vai trò: Chat thực hiện. Tiếp tục HW04 (P03 — Feature B: FR-08 Checkout, Web :5173). A đã đối soát P02: chấp nhận (20 TC × 3 browser, review 10 lỗi AI, commit 4993ad4…ff5f10f). Giữ cùng chuẩn chất lượng review như FR-01.

Áp dụng skill `playwright-data-driven-automation` (đọc SKILL.md của nó trước) + software-testing-ai-first. Oracle = SRS FR-08 (fixture giỏ theo FR-06/07, coupon FR-09 chỉ khi cần) (`eshop-sut/README.md`), không lấy hành vi code làm expected.

Làm theo từng bước, **commit sau mỗi bước** có chạm `.spec.ts` khi phù hợp (đề §12 yêu cầu ≥8 commit chạm spec cho cả bài):
1. Chọn ≥12 TC từ `HW02/features/b-fr08-checkout-web/04-test-cases.md` (12 TC; thiếu thì bổ sung TC mới có trace SRS, ghi rõ "bổ sung HW04"): guest bị chặn, 1 dòng/nhiều dòng/quantity, tổng tự tính và không sửa được, backend tính lại khi client gửi `total_amount` sai (dùng `page.route` hoặc API request để chứng minh), giỏ xóa sau thành công, giỏ rỗng, địa chỉ bắt buộc/biên nếu UI có… Mapping + TC không automate tại `HW04/features/B-FR08/selection.md`. Setup giỏ qua API/UI trong fixture, mỗi test độc lập (dùng user riêng đăng ký theo run nếu cần để không đụng giỏ nhau khi chạy song song 3 browser).
2. Khảo sát DOM thật giỏ/checkout/xác nhận đơn và ghi locator inventory.
3. Data file `HW04/automation/data/fr08-checkout.json` (giỏ fixture, số lượng, giá kỳ vọng tính độc lập, địa chỉ; không inline array trong spec). Giá lấy từ API catalog lúc chạy và so với công thức trong data, không hard-code tổng từ UI.
4. Sinh bản **AI draft** của POM + spec (`pages/CartPage.ts`, `pages/CheckoutPage.ts`, `tests/fr08-checkout.spec.ts`) bằng prompt riêng từng bước; lưu nguyên văn bản draft vào `HW04/features/B-FR08/ai-draft/` và commit nguyên trạng (`test(fr08): AI draft data-driven checkout spec`).
5. Chạy draft trên chromium/firefox/webkit, ghi kết quả thật.
6. Human-review checklist của skill: liệt kê lỗi AI (selector, assertion, edge thiếu, wait, isolation, oracle), sửa, commit từng nhóm sửa (`fix(fr08): ...`). ≥3 assertion pattern khác nhau, ghi pattern nào ở TC nào. Lưu diff draft→final `HW04/features/B-FR08/review.md` (lỗi | bằng chứng | sửa | vì sao AI sai).
7. Chạy bản cuối từng browser ra report riêng: `HW04/automation/reports/fr08-<browser>/index.html` (Run by: 23120229 + ISO). Fail do SUT giữ nguyên fail (không `test.fail`/skip để che), xác minh là bug thật bằng tay/ảnh; flaky thì sửa test. Ghi bảng kết quả `HW04/features/B-FR08/results.md` (TC × browser) và bug candidates (kèm screenshot) — chưa đăng Issues ở bước này. Đối chiếu bug HW02 đã có ở `datkrb/SUT_Issue` (#1–#11) để tránh trùng.

AI log: `HW04/ai-log/execution/chat-b/`, ID `EXEC-P03-…`, ghi riêng từng prompt sinh code của bước 4 (đó là bằng chứng "drive AI step by step"); prompt này do chat A soạn và gửi.
Checkpoint: số TC automated/pass/fail theo browser, bug candidates, tệp, commit hash, log ID. Dừng sau P03.
```


### AI output (verbatim)

```text
## Checkpoint P03 — Feature B: FR-08 Checkout (chat B)

**Kết quả:** 13 TC được automate (9 từ HW02 + 4 bổ sung ở HW04). Chạy cuối trên 3 browser ngày 2026-11-15, code `c1888f8`:

| Browser | Pass | Fail |
|---|---|---|
| chromium | 7 | 6 |
| firefox | 7 | 6 |
| webkit | 7 | 6 |

- Tổng 39 lần chạy: 21 pass, 18 fail, 0 flaky.
- 3/3 report có “Run by: 23120229” + ISO timestamp (`verify-report` OK).
- Mọi fail là bug SUT, không có lỗi test hay môi trường. Không dùng `test.fail` hay `skip`.

### Bug candidates (chưa đăng)
Cả 4 đều **trùng issue đã có**, nên không đề xuất tạo mới:
- BC-B1, tổng sửa được: #4.
- BC-B2, backend lưu `total_amount` client (1 / 900000000 / -100000): #5. Trường hợp tổng âm có thể dùng làm bằng chứng bổ sung cho #5.
- BC-B3, checkout không có `h1`: #6.
- BC-B4, giỏ không xóa sau khi thanh toán thành công: #15 (HW03).

Ảnh nằm ở `features/B-FR08/evidence/failures/`. Bằng chứng backend là giá trị đọc từ `GET /api/orders/my-orders`, có trong thông điệp assertion của report.

### Bản AI draft → review
- Bản draft (commit `7e01cf6`, prompt D1–D3) chạy 5/13 pass trên mỗi browser.
- 4 fail của draft là lỗi fixture:
  - `page.goto` làm mất giỏ (giỏ chỉ ở state client);
  - lần bấm đầu ở trang chi tiết bị bỏ qua (#21), nên dòng số lượng lớn hơn 1 không được thêm.
- 2 TC pass với oracle sai hoặc quá chặt: guest bị ép redirect `/login`; API bị ép đúng mã 401.
- `review.md` ghi 12 lỗi AI kèm commit sửa và nguyên nhân. Sửa thành 2 nhóm commit: `a61087b` (fixture/POM) và `c1888f8` (oracle). Riêng `a61087b` không biên dịch được vì spec vẫn là bản draft; điều này đã ghi rõ.
- 8 nhóm assertion pattern; bảng TC dùng pattern nào có trong review.

### Fixture
- Mỗi test có user riêng, tạo và đăng nhập qua API, token đặt vào `localStorage`.
- Giỏ dựng bằng UI, giá lấy từ `/api/products` lúc chạy, tổng kỳ vọng tính bằng Σ giá × số lượng.
- Kiểm giỏ fixture (số dòng, số lượng) trước khi checkout.

### TC không automate
- B-TC-009: Tab order.
- B-TC-010: checkout không có trường bắt buộc, nên điều kiện của TC không kích hoạt.
- B-TC-012: không tạo được phiên hết hạn nếu không sửa token.
- Phần màu/ngôn ngữ của B-TC-008 và phần icon giỏ rỗng.

### Tệp
- `features/B-FR08/`: `selection.md`, `locator-inventory.md`, `dom-survey-checkout.json`, `ai-draft/**`, `draft-run-summary.md`, `review.md`, `results.md`, `final-run/summary.{md,json}`, `evidence/{failures,report-shots}`.
- `automation/`: `data/fr08-checkout.json`, `pages/CartPage.ts`, `pages/CheckoutPage.ts`, `tests/fr08-checkout.spec.ts`, `reports/fr08-{chromium,firefox,webkit}/` (4.6 / 9.2 / 4.7 MB).
- `_tools/HW04/survey-fr08.js`, `_tools/HW04/work/p03-*.log`.

### Commit
| Commit | Nội dung | Có đổi spec? |
|---|---|---|
| `3a9bf45` | chọn TC, khảo sát DOM, data | không |
| `7e01cf6` | AI draft | có |
| `a61087b` | fix fixture | không (chỉ POM) |
| `c1888f8` | fix oracle | có |
| `7cff12d` | reports + docs | không |

Thêm 1 commit log/context; hash nằm ở tin nhắn trả lời. Tổng số commit thay đổi `.spec.ts` từ đầu bài tới nay: 7 (smoke 1, fr01 4, fr08 2).

### Giới hạn
- Survey FR-08 và mỗi lần chạy test đều tạo user/đơn thật trong DB SUT. Dữ liệu này mất khi backend khởi động lại.
- Human review của sinh viên: pending.

### Log
`EXEC-P03-001` (prompt P03 → checkpoint này), `EXEC-P03-002`, `003`, `004` (các bước D1, D2, D3 sinh draft).

Dừng sau P03, chờ prompt tiếp theo.
```


## EXEC-P03-002

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P03-002",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P03 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/B-FR08/ai-draft/prompts/D1-page-objects.txt (verbatim). Output: draft file(s) written verbatim by B in reply, committed unchanged in 7e01cf6.",
  "missing": [
    "Exact time unknown. The draft was generated between 18:20 and 18:24 +07:00 on 2026-11-15 (the draft run started 18:24:02).",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat."
  ],
  "artifact_paths": [
    "HW04/features/B-FR08/ai-draft/prompts/D1-page-objects.txt",
    "HW04/features/B-FR08/ai-draft/pages/CartPage.ts",
    "HW04/features/B-FR08/ai-draft/pages/CheckoutPage.ts"
  ],
  "recorded_at": "2026-11-15T18:40:42+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P03-002 · bước D1 · prompt B tự soạn từ khung P-c của skill playwright-data-driven-automation]
Dùng locator đã chốt trong HW04/features/B-FR08/locator-inventory.md (khảo sát DOM thật trên 3 browser). Viết hai Page Object Playwright + TypeScript:
- automation/pages/CartPage.ts: thêm sản phẩm theo tên từ trang chủ (nút "Thêm vào giỏ" trong thẻ có h2 tên) với số lượng (qty>1 qua trang chi tiết: ô spinbutton + nút "Thêm vào giỏ hàng"), mở giỏ qua link "Giỏ hàng" ở header, đọc dòng giỏ, xóa dòng, bấm "Tiến hành thanh toán", nhận biết giỏ rỗng.
- automation/pages/CheckoutPage.ts: heading "Xác Nhận Đơn Hàng", listitem sản phẩm, ô tổng, dòng "Tổng thanh toán:", nút "Xác Nhận Thanh Toán", heading thành công "Thanh toán thành công!".
Lưu ý: giỏ chỉ nằm ở state client, page.goto làm mất giỏ — điều hướng bằng link. Action không chứa assertion, không waitForTimeout.
```


### AI output (verbatim)

```text
// ===== features/B-FR08/ai-draft/pages/CartPage.ts =====
import { Locator, Page } from '@playwright/test';

export interface CartLine {
  product: string;
  qty: number;
}

export class CartPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly homeLink: Locator;
  readonly heading: Locator;
  readonly emptyHeading: Locator;
  readonly rows: Locator;
  readonly checkoutButton: Locator;
  readonly subtotal: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByRole('banner').getByRole('link', { name: 'Giỏ hàng' });
    this.homeLink = page.getByRole('banner').getByRole('link', { name: 'EShop' });
    this.heading = page.getByRole('heading', { name: 'Giỏ Hàng' });
    this.emptyHeading = page.getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' });
    this.rows = page.getByRole('table').getByRole('row');
    this.checkoutButton = page.getByRole('button', { name: 'Tiến hành thanh toán' });
    this.subtotal = page.getByText(/Tổng tạm tính/);
  }

  productCard(name: string): Locator {
    return this.page
      .locator('main div')
      .filter({ has: this.page.getByRole('heading', { level: 2, name }) })
      .last();
  }

  async openHome() {
    await this.page.goto('/');
  }

  async addProduct(line: CartLine) {
    const card = this.productCard(line.product);
    if (line.qty === 1) {
      await card.getByRole('button', { name: 'Thêm vào giỏ' }).click();
    } else {
      await card.getByRole('link', { name: 'Xem chi tiết' }).click();
      await this.page.getByRole('spinbutton').fill(String(line.qty));
      await this.page.getByRole('button', { name: 'Thêm vào giỏ hàng' }).click();
      await this.homeLink.click();
    }
  }

  async addAll(lines: CartLine[]) {
    await this.openHome();
    for (const line of lines) await this.addProduct(line);
  }

  async open() {
    await this.cartLink.click();
  }

  row(product: string): Locator {
    return this.rows.filter({ hasText: product });
  }

  async removeLine(product: string) {
    await this.row(product).getByRole('button', { name: 'Xóa' }).click();
  }

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }
}

// ===== features/B-FR08/ai-draft/pages/CheckoutPage.ts =====
import { Locator, Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly items: Locator;
  readonly totalInput: Locator;
  readonly totalText: Locator;
  readonly confirmButton: Locator;
  readonly successHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Xác Nhận Đơn Hàng' });
    this.items = page.getByRole('main').getByRole('listitem');
    this.totalInput = page.getByRole('main').getByRole('spinbutton');
    this.totalText = page.getByText(/^Tổng thanh toán:/);
    this.confirmButton = page.getByRole('button', { name: 'Xác Nhận Thanh Toán' });
    this.successHeading = page.getByRole('heading', { name: 'Thanh toán thành công!' });
  }

  async confirm() {
    await this.confirmButton.click();
  }
}
```


## EXEC-P03-003

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P03-003",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P03 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/B-FR08/ai-draft/prompts/D2-spec.txt (verbatim). Output: draft file(s) written verbatim by B in reply, committed unchanged in 7e01cf6.",
  "missing": [
    "Exact time unknown. The draft was generated between 18:20 and 18:24 +07:00 on 2026-11-15 (the draft run started 18:24:02).",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat."
  ],
  "artifact_paths": [
    "HW04/features/B-FR08/ai-draft/prompts/D2-spec.txt",
    "HW04/features/B-FR08/ai-draft/tests/fr08-checkout.spec.d2-skeleton.ts"
  ],
  "recorded_at": "2026-11-15T18:40:43+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P03-003 · bước D2 · prompt B tự soạn từ khung P-d của skill]
Viết automation/tests/fr08-checkout.spec.ts: import rows từ ../data/fr08-checkout.json (không định nghĩa dữ liệu trong spec), sinh test `${row.id} ${row.title}` theo 3A. Fixture: mỗi test đăng ký user riêng qua POST /api/register (email duy nhất theo project + thời gian), login qua POST /api/login, đặt token vào localStorage trước khi tải trang (addInitScript); auth "guest" thì bỏ qua; auth "none-api" chỉ dùng request. Lấy giá từ GET /api/products lúc chạy và tính tổng kỳ vọng = Σ price × qty theo data. Dựng giỏ bằng CartPage.addAll rồi mở giỏ/checkout bằng link. Rẽ nhánh theo expected.kind: guest-blocked, checkout-success, total-not-editable, server-recalculates (page.route sửa total_amount trong body POST /api/checkout), structure, empty-cart, api-unauthorized. Assertion chi tiết ở bước D3.
```


### AI output (verbatim)

```text
// ===== features/B-FR08/ai-draft/tests/fr08-checkout.spec.d2-skeleton.ts =====
import { test } from '@playwright/test';
import rows from '../data/fr08-checkout.json';
import { CartLine, CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { API_URL } from '../support/env';

type Row = (typeof rows)[number];

test.describe('FR-08 Checkout', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ page, request }, testInfo) => {
      // Arrange: catalog prices
      const products: { name: string; price: number }[] = await (await request.get(`${API_URL}/api/products`)).json();
      const priceOf = (name: string) => Number(products.find((p) => p.name === name)!.price);
      const cart = ((row.input as any).cart ?? []) as CartLine[];
      const expectedTotal = cart.reduce((s, l) => s + priceOf(l.product) * l.qty, 0);

      // Arrange: user
      let token: string | undefined;
      if (row.input.auth === 'user') {
        const email = `b${testInfo.project.name}${Date.now()}@example.test`;
        await request.post(`${API_URL}/api/register`, { data: { name: 'FR08 User', email, password: 'Aa1!bcdefg' } });
        token = (await (await request.post(`${API_URL}/api/login`, { data: { email, password: 'Aa1!bcdefg' } })).json()).token;
        await page.addInitScript((t) => localStorage.setItem('token', t), token!);
      }

      const cartPage = new CartPage(page);
      const checkout = new CheckoutPage(page);

      // Act + Assert theo row.expected.kind — chi tiết ở bước D3
      switch (row.expected.kind) {
        case 'guest-blocked':
        case 'checkout-success':
        case 'total-not-editable':
        case 'server-recalculates':
        case 'structure':
        case 'empty-cart':
        case 'api-unauthorized':
          break;
      }
      void cartPage; void checkout; void expectedTotal;
    });
  }
});
```


## EXEC-P03-004

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P03-004",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P03 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/B-FR08/ai-draft/prompts/D3-assertions.txt (verbatim). Output: draft file(s) written verbatim by B in reply, committed unchanged in 7e01cf6.",
  "missing": [
    "Exact time unknown. The draft was generated between 18:20 and 18:24 +07:00 on 2026-11-15 (the draft run started 18:24:02).",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat."
  ],
  "artifact_paths": [
    "HW04/features/B-FR08/ai-draft/prompts/D3-assertions.txt",
    "HW04/features/B-FR08/ai-draft/tests/fr08-checkout.spec.ts"
  ],
  "recorded_at": "2026-11-15T18:40:43+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P03-004 · bước D3 · prompt B tự soạn từ khung P-e của skill]
Oracle (SRS FR-08/21, HW02 B-TC): checkout-success = checkout liệt kê đủ từng sản phẩm với số lượng, tổng hiển thị = tổng kỳ vọng, bấm xác nhận → "Thanh toán thành công!", và GET /api/orders/my-orders có đơn mới total_amount = tổng kỳ vọng; nếu cartClearedAfter thì mở giỏ phải trống. guest-blocked = không có thông báo thành công, không có POST /api/checkout 2xx. total-not-editable = người dùng không thay được tổng (không có control sửa được; tổng vẫn = kỳ vọng). server-recalculates = sửa total_amount trong request bằng page.route; đơn không được lưu với giá trị client (bị từ chối hoặc lưu đúng tổng giỏ). structure = đúng 1 h1, dòng tổng có ₫ và phân cách nghìn. empty-cart = thông báo giỏ trống, không có nút tiến hành thanh toán. api-unauthorized = POST /api/checkout không token → không 2xx.
Dùng ≥3 pattern khác nhau (URL/visible/text, count, attribute/editable, response/API). Negative phải kiểm điều không được xảy ra. Không test.fail/test.skip để né; nghi SUT sai thì giữ assertion theo đặc tả.
```


### AI output (verbatim)

```text
// ===== features/B-FR08/ai-draft/tests/fr08-checkout.spec.ts =====
import { expect, test } from '@playwright/test';
import rows from '../data/fr08-checkout.json';
import { CartLine, CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { API_URL } from '../support/env';

type Row = (typeof rows)[number];

const formatVnd = (n: number) => n.toLocaleString('vi-VN');

test.describe('FR-08 Checkout', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ page, request }, testInfo) => {
      const input = row.input as any;
      const expected = row.expected as any;

      // Arrange: catalog prices
      const products: { name: string; price: number }[] = await (await request.get(`${API_URL}/api/products`)).json();
      const priceOf = (name: string) => Number(products.find((p) => p.name === name)!.price);
      const cart = (input.cart ?? []) as CartLine[];
      const finalCart = (input.updateTo ?? cart) as CartLine[];
      const expectedTotal = finalCart.reduce((s, l) => s + priceOf(l.product) * l.qty, 0);

      // Arrange: user
      let token: string | undefined;
      if (input.auth === 'user') {
        const email = `b${testInfo.project.name}${Date.now()}@example.test`;
        await request.post(`${API_URL}/api/register`, { data: { name: 'FR08 User', email, password: 'Aa1!bcdefg' } });
        token = (await (await request.post(`${API_URL}/api/login`, { data: { email, password: 'Aa1!bcdefg' } })).json()).token;
        await page.addInitScript((t) => localStorage.setItem('token', t), token!);
      }

      const cartPage = new CartPage(page);
      const checkout = new CheckoutPage(page);

      if (expected.kind === 'api-unauthorized') {
        const res = await request.post(`${API_URL}/api/checkout`, { data: input.body });
        expect(res.status()).toBe(401);
        return;
      }

      // Act: build cart via UI
      await cartPage.addAll(cart);
      await cartPage.open();

      if (expected.kind === 'empty-cart') {
        await expect(cartPage.emptyHeading).toBeVisible();
        await expect(cartPage.checkoutButton).toHaveCount(0);
        return;
      }

      if (input.updateTo) {
        await cartPage.removeLine(cart[0].product);
        await cartPage.addAll(input.updateTo);
        await cartPage.open();
      }

      if (expected.kind === 'guest-blocked') {
        page.on('dialog', (d) => d.accept());
        await cartPage.proceedToCheckout();
        await expect(page).toHaveURL(/\/login/);
        await expect(checkout.successHeading).toHaveCount(0);
        return;
      }

      await cartPage.proceedToCheckout();
      await expect(checkout.heading).toBeVisible();

      // Assert: list + total
      await expect(checkout.items).toHaveCount(finalCart.length);
      for (const line of finalCart) {
        await expect(checkout.items.filter({ hasText: line.product })).toContainText(`x ${line.qty}`);
      }
      await expect(checkout.totalText).toContainText(formatVnd(expectedTotal));

      if (expected.kind === 'structure') {
        await expect(page.locator('h1')).toHaveCount(expected.h1Count);
        await expect(checkout.totalText).toContainText('₫');
        return;
      }

      if (expected.kind === 'total-not-editable') {
        await expect(checkout.totalInput).not.toBeEditable();
        return;
      }

      if (expected.kind === 'server-recalculates') {
        await page.route('**/api/checkout', async (route) => {
          const body = route.request().postDataJSON();
          body.total_amount = input.tamperTotal;
          await route.continue({ postData: JSON.stringify(body) });
        });
      }

      await checkout.confirm();
      await expect(checkout.successHeading).toBeVisible();

      const orders = await (
        await request.get(`${API_URL}/api/orders/my-orders`, { headers: { Authorization: `Bearer ${token}` } })
      ).json();
      expect(orders[0].total_amount).toBe(expectedTotal);

      if (expected.cartClearedAfter) {
        await cartPage.open();
        await expect(cartPage.emptyHeading).toBeVisible();
      }
    });
  }
});
```


## EXEC-P04-001

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P04-001",
  "prompt_origin": "AI orchestrator chat A (session local_8f71b54f-a935-4aab-b94a-932f8a30f545) authored and sent this prompt as a cross-session message; not student-authored",
  "occurred_at": "2026-11-15T18:41:26+07:00",
  "timestamp_source": "observed",
  "capture_status": "partial",
  "source": "Prompt: cross-session message, saved verbatim to P04-prompt.txt. Output: checkpoint-P04.md (verbatim). occurred_at is the first tool-observed time after receipt (`date -Iseconds` at the start of the turn).",
  "missing": [
    "occurred_at is the first tool-observed time in the turn, not the exact receipt time.",
    "The full tool call/result transcript is not exported, and short progress notes sent mid-turn are not included.",
    "The hash of the commit containing this log is only in the final chat reply."
  ],
  "artifact_paths": [
    "HW04/features/C-FR17/",
    "HW04/automation/data/fr17-coupon.json",
    "HW04/automation/pages/AdminCouponPage.ts",
    "HW04/automation/tests/fr17-coupon.spec.ts",
    "HW04/automation/reports/fr17-chromium/",
    "HW04/automation/reports/fr17-firefox/",
    "HW04/automation/reports/fr17-webkit/",
    "_tools/HW04/survey-fr17.js",
    "_tools/HW04/work/p04-draft-leftover-coupons.txt"
  ],
  "recorded_at": "2026-11-15T19:00:51+07:00"
}
```


### Prompt (verbatim)

```text
Vai trò: Chat thực hiện. Tiếp tục HW04 (P04 — Feature C: FR-17 Quản lý coupon CRUD, Admin :5174). A đã đối soát P03: chấp nhận (13 TC × 3 browser, review 12 mục, commit c1888f8…5eb4262). Giữ cùng chuẩn review như FR-01/FR-08.

Áp dụng skill `playwright-data-driven-automation` (đọc SKILL.md của nó trước) + software-testing-ai-first. Oracle = SRS FR-17 (+FR-12 phân quyền admin) (`eshop-sut/README.md`), không lấy hành vi code làm expected.

Làm theo từng bước, **commit sau mỗi bước** có chạm `.spec.ts` khi phù hợp (đề §12 yêu cầu ≥8 commit chạm spec cho cả bài):
1. Chọn ≥12 TC từ `HW02/features/c-fr17-coupon-admin/04-test-cases.md` (20 TC): tạo hợp lệ, mã trùng, biên giá trị %/số tiền, ngày hết hạn quá khứ/biên, giới hạn lượt dùng, sửa, xóa có xác nhận, danh sách cập nhật, user thường không vào được trang admin coupon… Mapping + TC không automate tại `HW04/features/C-FR17/selection.md`. Mã coupon duy nhất theo run; dọn dữ liệu tạo ra sau test nếu có thể.
2. Khảo sát DOM thật Admin login + trang coupon (form, bảng, dialog xác nhận) và ghi locator inventory.
3. Data file `HW04/automation/data/fr17-coupon.json` (không inline array trong spec); dùng `storageState` cho đăng nhập admin.
4. Sinh bản **AI draft** của POM + spec (`pages/AdminCouponPage.ts`, `tests/fr17-coupon.spec.ts`) bằng prompt riêng từng bước; lưu nguyên văn bản draft vào `HW04/features/C-FR17/ai-draft/` và commit nguyên trạng (`test(fr17): AI draft data-driven coupon spec`).
5. Chạy draft trên chromium/firefox/webkit, ghi kết quả thật.
6. Human-review checklist của skill: liệt kê lỗi AI (selector, assertion, edge thiếu, wait, isolation, oracle), sửa, commit từng nhóm sửa (`fix(fr17): ...`). ≥3 assertion pattern khác nhau, ghi pattern nào ở TC nào. Lưu diff draft→final `HW04/features/C-FR17/review.md` (lỗi | bằng chứng | sửa | vì sao AI sai).
7. Chạy bản cuối từng browser ra report riêng: `HW04/automation/reports/fr17-<browser>/index.html` (Run by: 23120229 + ISO). Fail do SUT giữ nguyên fail (không `test.fail`/skip để che), xác minh là bug thật bằng tay/ảnh; flaky thì sửa test. Ghi bảng kết quả `HW04/features/C-FR17/results.md` (TC × browser) và bug candidates (kèm screenshot) — chưa đăng Issues ở bước này. Đối chiếu bug HW02 đã có ở `datkrb/SUT_Issue` (#1–#11) để tránh trùng.

AI log: `HW04/ai-log/execution/chat-b/`, ID `EXEC-P04-…`, ghi riêng từng prompt sinh code của bước 4 (đó là bằng chứng "drive AI step by step"); prompt này do chat A soạn và gửi.
Checkpoint: số TC automated/pass/fail theo browser, bug candidates, tệp, commit hash, log ID. Dừng sau P04.
```


### AI output (verbatim)

```text
## Checkpoint P04 — Feature C: FR-17 Quản lý mã giảm giá (chat B)

**Kết quả:** 18 TC được automate (16 lấy từ HW02, 2 bổ sung ở HW04). Chạy cuối trên 3 browser ngày 2026-11-15, code `ec9c5ae`:

| Browser | Pass | Fail |
|---|---|---|
| chromium | 11 | 7 |
| firefox | 11 | 7 |
| webkit | 11 | 7 |

- Tổng 54 lượt chạy: 33 pass, 21 fail, 0 flaky.
- 3/3 report có “Run by: 23120229” + ISO timestamp.
- Mọi fail là bug SUT. Không dùng `test.fail` hay `skip`.
- Cleanup hoạt động: sau lần chạy, DB chỉ còn 4 coupon seed.

### Bug candidates (chưa đăng)

Trùng issue đã có:
- BC-C1, minimum rỗng vẫn tạo được: #8.
- BC-C3, discount −1 và 0 được chấp nhận: #9.
- BC-C4, minimum −1 được chấp nhận: #10.
- BC-C6, 6 trường bắt buộc không có `*`/nhãn: #11.

**Mới:**
- **BC-C2:** để trống “Số lần dùng tối đa/người” vẫn tạo được coupon, hệ thống tự gán 1 (C-AUTO-07, có ảnh).
- **BC-C5 (FR-12, đề xuất High):** user thường gọi `POST /api/admin/coupons` bằng token của mình thì nhận HTTP 200 và coupon được lưu (C-AUTO-17). Bằng chứng là thông điệp assertion kèm JSON coupon trong report. Ảnh chụp trang report sẽ làm khi đăng issue.

Ảnh ở `features/C-FR17/evidence/failures/`.

### Bản AI draft → review

- Bản draft (commit `61518fd`, prompt D1–D3) chạy 10/18 pass trên mỗi browser.
- C-AUTO-02 timeout vì placeholder ô giá trị đổi theo loại coupon.
- C-AUTO-14/15 pass với assertion phủ định không có điểm đồng bộ, nên có thể là pass rỗng.
- C-AUTO-17 ép đúng mã 403.
- Locator dấu `*` lọc theo chữ `code`.
- Cleanup chỉ chạy khi test pass, nên **18 coupon `HW4…` bị rò**. Đã xóa qua API admin (18 × HTTP 200); danh sách lưu ở `_tools/HW04/work/p04-draft-leftover-coupons.txt`.
- `review.md` ghi 12 lỗi kèm commit sửa và nguyên nhân. Sửa theo 2 nhóm commit:
  - `1065a4a`: page object và data. Riêng commit này không biên dịch được vì spec vẫn là bản draft; đã ghi rõ trong review.
  - `ec9c5ae`: spec.
- 8 nhóm assertion pattern; bảng pattern theo TC có trong review.

### Ngoài SRS / không automate

- Prompt điều phối có nhắc “sửa coupon”, “xóa có xác nhận”, “ngày hết hạn quá khứ”. SRS FR-17 chỉ yêu cầu Thêm/Xem/Xóa, không có quy tắc ngày, và HW02 dặn không ép dialog. Không có oracle nên không automate; lý do ở `selection.md`.
- Không automate các TC: C-TC-004/010 phần server, C-TC-016, C-TC-019 phần màu, C-TC-020.

### Tệp

- `features/C-FR17/`: `selection.md`, `locator-inventory.md`, `dom-survey-coupon.json`, `ai-draft/**`, `draft-run-summary.md`, `review.md`, `results.md`, `final-run/summary.{md,json}`, `evidence/{failures,report-shots}`.
- `automation/`: `data/fr17-coupon.json`, `pages/AdminCouponPage.ts`, `tests/fr17-coupon.spec.ts`, `reports/fr17-{chromium,firefox,webkit}/` (5.1 / 5.0 / 4.6 MB).
- `_tools/HW04/survey-fr17.js`, `_tools/HW04/work/p04-*`.

### Commit

| Commit | Nội dung | Đổi spec? |
|---|---|---|
| `3a921a8` | chọn TC, khảo sát, data | không |
| `61518fd` | AI draft | có |
| `1065a4a` | fix page object + data | không |
| `ec9c5ae` | fix spec | có |
| `5832bd5` | reports + docs | không |

Còn 1 commit log/context; hash nằm trong tin nhắn trả lời.

Tổng số commit thay đổi `.spec.ts` từ đầu bài: **9** (smoke 1, fr01 4, fr08 2, fr17 2), đạt yêu cầu ≥8 của §12.

### Lưu ý cho A

- 9 report chính thức (fr01/fr08/fr17 × 3) tổng khoảng 55 MB vì có trace. Cần quyết định trước P07: tắt trace và chạy lại, hoặc tách ZIP.
- Human review của sinh viên: pending.

### Log

`EXEC-P04-001` (prompt P04 → checkpoint này), `EXEC-P04-002`, `003`, `004` (các bước D1–D3 sinh draft).

Dừng sau P04, chờ prompt tiếp theo.
```


## EXEC-P04-002

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P04-002",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P04 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/C-FR17/ai-draft/prompts/D1-page-object.txt (verbatim). Output: draft file(s) written verbatim by B in reply, committed unchanged in 61518fd.",
  "missing": [
    "Exact time unknown. The draft was generated between 18:41 and 18:44 +07:00 on 2026-11-15; the draft run started at 18:44:24.",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat."
  ],
  "artifact_paths": [
    "HW04/features/C-FR17/ai-draft/prompts/D1-page-object.txt",
    "HW04/features/C-FR17/ai-draft/pages/AdminCouponPage.ts"
  ],
  "recorded_at": "2026-11-15T19:00:52+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P04-002 · bước D1 · prompt B tự soạn từ khung P-c của skill playwright-data-driven-automation]
Dùng locator đã chốt trong HW04/features/C-FR17/locator-inventory.md (khảo sát DOM thật Admin :5174 trên 3 browser). Viết automation/pages/AdminCouponPage.ts (Playwright + TypeScript):
- login(email, password) qua form Admin Login (placeholder Email/Password, nút Login);
- openCoupons(): bấm mục "Mã Giảm Giá" ở sidebar (là <li>, không phải link), chờ heading "Quản lý Mã Giảm Giá";
- fillForm(data) cho 6 trường (placeholder như inventory; type là select percent/fixed; expiry là input date), submit() bấm "Tạo mã";
- row(code) dòng bảng có ô mã đúng code; deleteCoupon(code) bấm "Xóa" trong dòng đó.
Không chứa assertion, không waitForTimeout.
```


### AI output (verbatim)

```text
// ===== features/C-FR17/ai-draft/pages/AdminCouponPage.ts =====
import { Locator, Page } from '@playwright/test';

export interface CouponInput {
  code?: string;
  type?: string;
  discount?: string;
  minimum?: string;
  expiry?: string;
  uses?: string;
}

export class AdminCouponPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly code: Locator;
  readonly type: Locator;
  readonly discount: Locator;
  readonly minimum: Locator;
  readonly expiry: Locator;
  readonly uses: Locator;
  readonly createButton: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Quản lý Mã Giảm Giá' });
    this.code = page.getByPlaceholder('Mã coupon (VD: SAVE10)');
    this.type = page.locator('select');
    this.discount = page.getByPlaceholder('Giá trị % (VD: 10)');
    this.minimum = page.getByPlaceholder('Đơn tối thiểu (₫)');
    this.expiry = page.getByPlaceholder('Ngày hết hạn');
    this.uses = page.getByPlaceholder('Số lần dùng tối đa/người');
    this.createButton = page.getByRole('button', { name: 'Tạo mã' });
    this.rows = page.locator('tbody tr');
  }

  async login(email: string, password: string) {
    await this.page.goto('/');
    await this.page.getByPlaceholder('Email').fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async openCoupons() {
    await this.page.getByText('Mã Giảm Giá').click();
    await this.heading.waitFor();
  }

  async fillForm(data: CouponInput) {
    if (data.code !== undefined) await this.code.fill(data.code);
    if (data.type !== undefined) await this.type.selectOption(data.type);
    if (data.discount !== undefined) await this.discount.fill(data.discount);
    if (data.minimum !== undefined) await this.minimum.fill(data.minimum);
    if (data.expiry !== undefined) await this.expiry.fill(data.expiry);
    if (data.uses !== undefined) await this.uses.fill(data.uses);
  }

  async submit() {
    await this.createButton.click();
  }

  row(code: string): Locator {
    return this.rows.filter({ hasText: code });
  }

  async deleteCoupon(code: string) {
    await this.row(code).getByRole('button', { name: 'Xóa' }).click();
  }
}
```


## EXEC-P04-003

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P04-003",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P04 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/C-FR17/ai-draft/prompts/D2-spec.txt (verbatim). Output: draft file(s) written verbatim by B in reply, committed unchanged in 61518fd.",
  "missing": [
    "Exact time unknown. The draft was generated between 18:41 and 18:44 +07:00 on 2026-11-15; the draft run started at 18:44:24.",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat."
  ],
  "artifact_paths": [
    "HW04/features/C-FR17/ai-draft/prompts/D2-spec.txt",
    "HW04/features/C-FR17/ai-draft/tests/fr17-coupon.spec.d2-skeleton.ts"
  ],
  "recorded_at": "2026-11-15T19:00:52+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P04-003 · bước D2 · prompt B tự soạn từ khung P-d của skill]
Viết automation/tests/fr17-coupon.spec.ts: import rows từ ../data/fr17-coupon.json (không định nghĩa dữ liệu trong spec), sinh test `${row.id} ${row.title}` theo 3A. Admin: đăng nhập một lần qua form Admin Login (admin@eshop.com / Admin123! theo SRS §1) và lưu storageState (localStorage adminToken), các test admin dùng lại storageState đó; baseURL = ADMIN_URL. Thay {{code}} bằng mã duy nhất theo project + thời gian (chữ hoa). Với input.precreate tạo trước coupon cùng mã qua form. Dọn coupon do test tạo sau mỗi test (DELETE /api/admin/coupons/:id bằng token admin). Rẽ nhánh theo expected.kind: created, rejected, rejected-duplicate, deleted, access-denied, type-options, api-forbidden, structure. Assertion chi tiết ở D3.
```


### AI output (verbatim)

```text
// ===== features/C-FR17/ai-draft/tests/fr17-coupon.spec.d2-skeleton.ts =====
import { test } from '@playwright/test';
import rows from '../data/fr17-coupon.json';
import { AdminCouponPage, CouponInput } from '../pages/AdminCouponPage';
import { ADMIN_URL, API_URL } from '../support/env';

type Row = (typeof rows)[number];
const AUTH_FILE = 'test-results/.auth/admin.json';

test.use({ baseURL: ADMIN_URL });

test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage({ baseURL: ADMIN_URL });
  const admin = new AdminCouponPage(page);
  await admin.login('admin@eshop.com', 'Admin123!');
  await page.getByRole('heading', { name: 'EShop Admin' }).waitFor();
  await page.context().storageState({ path: AUTH_FILE });
  await page.close();
});

test.describe('FR-17 Quản lý mã giảm giá', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ browser, request }, testInfo) => {
      const code = `HW4${testInfo.project.name}${Date.now()}`.toUpperCase();
      const input = { ...(row.input as CouponInput) };
      if (input.code === '{{code}}') input.code = code;

      const context = await browser.newContext({ baseURL: ADMIN_URL, storageState: AUTH_FILE });
      const page = await context.newPage();
      const admin = new AdminCouponPage(page);

      // Act + Assert theo row.expected.kind — chi tiết ở D3
      switch (row.expected.kind) {
        default:
          break;
      }
      void admin; void request; void API_URL;
      await context.close();
    });
  }
});
```


## EXEC-P04-004

```text
{
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "redactions": [],
  "id": "EXEC-P04-004",
  "prompt_origin": "Self-authored by execution chat B from the skill's prompt template (P-c/P-d/P-e), as the step-by-step generation prompt required by P04 step 4. The same model wrote the prompt and the code within one session; it was not a separate AI tool or chat.",
  "occurred_at": null,
  "timestamp_source": "unknown",
  "capture_status": "partial",
  "source": "Prompt: features/C-FR17/ai-draft/prompts/D3-assertions.txt (verbatim). Output: draft file(s) written verbatim by B in reply, committed unchanged in 61518fd.",
  "missing": [
    "Exact time unknown. The draft was generated between 18:41 and 18:44 +07:00 on 2026-11-15; the draft run started at 18:44:24.",
    "The draft was generated in-context with access to the DOM survey and the earlier conversation, not in an isolated fresh chat."
  ],
  "artifact_paths": [
    "HW04/features/C-FR17/ai-draft/prompts/D3-assertions.txt",
    "HW04/features/C-FR17/ai-draft/tests/fr17-coupon.spec.ts"
  ],
  "recorded_at": "2026-11-15T19:00:52+07:00"
}
```


### Prompt (verbatim)

```text
[EXEC-P04-004 · bước D3 · prompt B tự soạn từ khung P-e của skill]
Oracle (SRS FR-17/FR-12/FR-21/22, HW02 C-TC): created = coupon xuất hiện trong bảng với mã, loại, giá trị, hạn, giới hạn đúng dữ liệu và vẫn còn sau reload; rejected = không tạo bản ghi có mã đó (kiểm bảng + GET /api/coupons), có tín hiệu từ chối (native validity của ô sai hoặc alert lỗi), không ép wording/HTTP code; rejected-duplicate = chỉ một coupon mang mã đó; deleted = dòng biến mất và không còn sau reload; access-denied = guest/user thường không thấy heading quản lý coupon/sidebar admin; type-options = select chỉ có percent/fixed; api-forbidden = POST /api/admin/coupons bằng token user thường không 2xx và không tạo coupon; structure = mỗi trường bắt buộc có * cạnh nhãn, đúng 1 h1.
Dùng ≥3 pattern khác nhau (visible/count, attribute/validity, response/API, soft). Không waitForTimeout. Không test.fail/test.skip để né; nghi SUT sai thì giữ assertion theo đặc tả.
```


### AI output (verbatim)

```text
// ===== features/C-FR17/ai-draft/tests/fr17-coupon.spec.ts =====
import { expect, test } from '@playwright/test';
import rows from '../data/fr17-coupon.json';
import { AdminCouponPage, CouponInput } from '../pages/AdminCouponPage';
import { ADMIN_URL, API_URL } from '../support/env';

type Row = (typeof rows)[number];
const AUTH_FILE = 'test-results/.auth/admin.json';

test.use({ baseURL: ADMIN_URL });

let adminToken = '';

test.beforeAll(async ({ browser, request }) => {
  const page = await browser.newPage({ baseURL: ADMIN_URL });
  const admin = new AdminCouponPage(page);
  await admin.login('admin@eshop.com', 'Admin123!');
  await page.getByRole('heading', { name: 'EShop Admin' }).waitFor();
  await page.context().storageState({ path: AUTH_FILE });
  await page.close();
  const res = await request.post(`${API_URL}/api/login`, { data: { email: 'admin@eshop.com', password: 'Admin123!' } });
  adminToken = (await res.json()).token;
});

test.describe('FR-17 Quản lý mã giảm giá', () => {
  for (const row of rows as Row[]) {
    test(`${row.id} ${row.title}`, async ({ browser, request }, testInfo) => {
      const code = `HW4${testInfo.project.name}${Date.now()}`.toUpperCase();
      const input = { ...(row.input as any) };
      if (input.code === '{{code}}') input.code = code;
      const expected = row.expected as any;

      if (expected.kind === 'api-forbidden') {
        const login = await request.post(`${API_URL}/api/login`, { data: { email: input.email, password: input.password } });
        const userToken = (await login.json()).token;
        const res = await request.post(`${API_URL}/api/admin/coupons`, {
          headers: { Authorization: `Bearer ${userToken}` },
          data: {
            code: input.code,
            type: input.type,
            discount_value: Number(input.discount),
            min_order_amount: Number(input.minimum),
            expired_at: input.expiry,
            max_uses_per_user: Number(input.uses),
          },
        });
        expect(res.status()).toBe(403);
        return;
      }

      if (expected.kind === 'access-denied') {
        const context = await browser.newContext({ baseURL: ADMIN_URL });
        const page = await context.newPage();
        if (input.auth === 'user') {
          const admin = new AdminCouponPage(page);
          page.on('dialog', (d) => d.accept());
          await admin.login(input.email, input.password);
        } else {
          await page.goto('/');
        }
        await expect(page.getByRole('heading', { name: 'Quản lý Mã Giảm Giá' })).not.toBeVisible();
        await expect(page.getByRole('heading', { name: 'EShop Admin' })).not.toBeVisible();
        await context.close();
        return;
      }

      const context = await browser.newContext({ baseURL: ADMIN_URL, storageState: AUTH_FILE });
      const page = await context.newPage();
      const admin = new AdminCouponPage(page);
      await page.goto('/');
      await admin.openCoupons();

      if (expected.kind === 'type-options') {
        const values = await admin.type.locator('option').evaluateAll((os) => os.map((o) => (o as HTMLOptionElement).value));
        expect(values).toEqual(expected.options);
        await context.close();
        return;
      }

      if (expected.kind === 'structure') {
        await expect.soft(page.locator('h1')).toHaveCount(expected.h1Count);
        for (const field of expected.requiredFields) {
          await expect.soft(page.locator('label', { hasText: '*' }).filter({ hasText: field })).toHaveCount(1);
        }
        await context.close();
        return;
      }

      if (input.precreate) {
        await admin.fillForm(input);
        await admin.submit();
        await expect(admin.row(input.code)).toBeVisible();
      }

      if (expected.kind === 'deleted') {
        await admin.deleteCoupon(input.code);
        await expect(admin.row(input.code)).toHaveCount(0);
        await page.reload();
        await admin.openCoupons();
        await expect(admin.row(input.code)).toHaveCount(0);
        await context.close();
        return;
      }

      page.on('dialog', (d) => d.accept());
      await admin.fillForm(input);
      await admin.submit();

      if (expected.kind === 'created') {
        const row = admin.row(input.code);
        await expect(row).toBeVisible();
        await expect(row).toContainText(expected.row.type);
        await expect(row).toContainText(expected.row.value);
        await expect(row).toContainText(expected.row.expiry);
        await expect(row).toContainText(expected.row.uses);
        await page.reload();
        await admin.openCoupons();
        await expect(admin.row(input.code)).toBeVisible();
      } else {
        await page.waitForTimeout(1000);
        const list = await (await request.get(`${API_URL}/api/coupons`, { headers: { Authorization: `Bearer ${adminToken}` } })).json();
        const matches = list.filter((c: any) => c.code === input.code);
        expect(matches.length).toBe(expected.kind === 'rejected-duplicate' ? 1 : 0);
      }

      // cleanup
      const list = await (await request.get(`${API_URL}/api/coupons`, { headers: { Authorization: `Bearer ${adminToken}` } })).json();
      for (const c of list.filter((c: any) => c.code === input.code)) {
        await request.delete(`${API_URL}/api/admin/coupons/${c.id}`, { headers: { Authorization: `Bearer ${adminToken}` } });
      }
      await context.close();
    });
  }
});
```


## EXEC-P05-001

```text
{
  "id": "EXEC-P05-001",
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "prompt_origin": "AI orchestrator chat A (session local_8f71b54f-a935-4aab-b94a-932f8a30f545) authored and sent this prompt as a cross-session message; not student-authored",
  "occurred_at": "2026-11-15T19:01:42+07:00",
  "timestamp_source": "observed",
  "capture_status": "partial",
  "source": "Prompt: cross-session message, saved verbatim to P05-prompt.txt. Output: checkpoint-P05.md (verbatim). occurred_at is the first tool-observed time in the turn.",
  "missing": [
    "occurred_at is the first tool-observed time in the turn, not the exact receipt time.",
    "Full tool call/result transcript is not exported. Interim status messages sent while background runs were in progress are not included.",
    "The permission-denial message for `git push` is summarized, not exported verbatim.",
    "The hash of the commit containing this log is only in the final chat reply."
  ],
  "artifact_paths": [
    "HW04/automation/reports/",
    "HW04/evidence/reports/",
    "HW04/evidence/bugs/",
    "HW04/test-summary.md",
    "HW04/bug-report.md",
    "HW04/docs/github-issues.md",
    "HW04/docs/issue-bodies/",
    "_tools/HW04/build_p05_summary.py",
    "_tools/HW04/repro_p05.js",
    "_tools/HW04/repro_p05_bug03_shot.js",
    "_tools/HW04/render_p05_issues.py",
    "_tools/HW04/publish_p05.py",
    "_tools/HW04/gh_api.py",
    "_tools/HW04/work/p05-rerun/"
  ],
  "redactions": [
    "GitHub token obtained from GCM was kept in memory only and is not present in any artifact"
  ],
  "recorded_at": "2026-11-15T19:39:58+07:00"
}
```


### Prompt (verbatim)

```text
Vai trò: Chat thực hiện. Tiếp tục HW04 (P05 — chạy cuối toàn suite + bug report + GitHub Issues). A đã đối soát P04: chấp nhận (18 TC × 3 browser, commit 3a921a8…beec3c8). Hiện có 9 commit chạm `*.spec.ts`; tổng 51 TC automated (20+13+18).

1. Khởi động lại SUT sạch (stop/start, backend seed lại) rồi chạy `run-matrix` cho 3 feature × 3 browser = 9 run, mỗi run một HTML report trong `HW04/automation/reports/<feature>-<browser>/` (title/metadata Run by: 23120229 + ISO). Không sửa report bằng tay. Chạy `verify-report` cho cả 9 và lưu ảnh chụp header report vào `HW04/evidence/reports/`. Report các lần chạy P02–P04 được thay bằng lần chạy cuối này (git giữ lịch sử).
2. Kiểm ổn định: chạy lại toàn suite thêm 1 lần (không ghi đè report chính thức, output vào `_tools/HW04/work/`) để chứng minh fail là ổn định (bug thật) chứ không flaky; ghi bảng so sánh.
3. `HW04/test-summary.md`: số feature; số TC automated, executed (TC × browser), passed, failed theo feature/browser; số browser run; số bug; flaky; TC không automate. Số liệu lấy từ `results.json` thật (`summary.json` của run-matrix).
4. `HW04/bug-report.md` theo S08 (`slide/S08_Test Report.pdf`): ID, title, feature/FR, TC tự động phát hiện, browser, bước tái hiện, expected (trích SRS), actual, severity/priority, screenshot (`HW04/evidence/bugs/*.png`, lấy từ attachment của Playwright hoặc chụp lại), trace. Chỉ bug được xác nhận bằng tay là thật; ghi rõ cách xác nhận.
5. Đăng GitHub Issues lên `datkrb/SUT_Issue` (người dùng đã cho phép): mỗi bug một issue mới, nhãn tiêu đề `[HW04][FR-xx] ...`, body gồm các trường trên + ảnh. Bug trùng nội dung với issue HW02/HW03 đã có → comment vào issue cũ kèm bằng chứng HW04 thay vì tạo issue mới (ghi quyết định). Ảnh host như HW03 (tham khảo `_tools/HW03/publish_issues.py`, `HW03/docs/github-publication-P14B.md`: nhánh evidence riêng trên `datkrb/SUT_Issue`, URL pin theo commit) — chỉ trong repo `datkrb/SUT_Issue`, không tạo repo mới. Dùng credential GCM sẵn có, token chỉ trong memory, không ghi vào log/artifact. Readback GET từng issue/ảnh, ghi bảng mapping bug → URL trong `HW04/docs/github-issues.md`, và chụp ảnh trang Issues (đề yêu cầu "screenshots of the bugs on the GitHub Issues page") vào `HW04/evidence/issues/`.
6. Commit từng bước.

AI log `EXEC-P05-…`; prompt do chat A soạn và gửi. Checkpoint: bảng 9 run, tổng TC/pass/fail, số bug, URL issue, commit. Dừng sau P05.
```


### AI output (verbatim)

```text
## Checkpoint P05 — chạy cuối toàn suite + bug report + GitHub Issues (chat B)

**Kết quả:** đã xong bước 1–4. Bước 5 (đăng GitHub) **bị chặn**: lệnh push nhánh evidence bị chính sách quyền của phiên Claude Code từ chối (auto mode, lý do “Unsanctioned Communication”). Chat B không lách và không tạo issue hay comment nào. Mọi nội dung đăng đã chuẩn bị sẵn, chờ người dùng quyết định.

### 1. Chạy chính thức: 9 run

SUT được khởi động lại sạch lúc 19:02 (+07:00), seed 2 user và 4 coupon. Code `beec3c8`, workers 1, retries 0.

| Run | Bắt đầu (ISO) | Total | Pass | Fail | Flaky |
|---|---|---|---|---|---|
| fr01-chromium | 2026-11-15T19:02:25+07:00 | 20 | 9 | 11 | 0 |
| fr01-firefox | 2026-11-15T19:04:28+07:00 | 20 | 9 | 11 | 0 |
| fr01-webkit | 2026-11-15T19:07:43+07:00 | 20 | 9 | 11 | 0 |
| fr08-chromium | 2026-11-15T19:09:59+07:00 | 13 | 7 | 6 | 0 |
| fr08-firefox | 2026-11-15T19:10:56+07:00 | 13 | 7 | 6 | 0 |
| fr08-webkit | 2026-11-15T19:12:38+07:00 | 13 | 7 | 6 | 0 |
| fr17-chromium | 2026-11-15T19:13:54+07:00 | 18 | 11 | 7 | 0 |
| fr17-firefox | 2026-11-15T19:14:50+07:00 | 18 | 11 | 7 | 0 |
| fr17-webkit | 2026-11-15T19:17:03+07:00 | 18 | 11 | 7 | 0 |
| **Tổng** | | **153** | **81** | **72** | **0** |

- 51 TC được automate, chạy trên 3 browser, ra 153 lượt thực thi.
- `verify-report`: 9/9 report có “Run by: 23120229” + ISO timestamp. Ảnh header nằm ở `evidence/reports/`.

### 2. Kiểm ổn định

Chạy lại toàn suite lần 2 (19:19–19:35, output ở `_tools/HW04/work/p05-rerun/`). Kết quả: **153/153 test × browser có cùng trạng thái** với lần 1, 0 flaky. Bảng chi tiết ở `test-summary.md` §4.

### 3. `test-summary.md`

Số liệu sinh bằng script từ `summary.json` và `results.json`. Gồm tổng quan; bảng feature × browser; bảng theo feature; bảng ổn định; số bug; số TC HW02 không automate (12).

### 4. `bug-report.md` (theo S08)

**5 bug mới**, mỗi bug được tái hiện độc lập ngoài suite bằng script (19:35), có ảnh chụp và đọc lại qua API:

| ID | Feature | Mô tả | Severity / Priority |
|---|---|---|---|
| BUG-01 | FR-01 | mật khẩu dùng dấu cách thay ký tự đặc biệt vẫn được chấp nhận | Medium / Medium |
| BUG-02 | FR-01 | email thiếu `@` vẫn đăng ký được | Medium / Medium |
| BUG-03 | FR-01 | đăng ký trùng `test@eshop.com`, có ảnh 2 user cùng email | Serious / High |
| BUG-04 | FR-17 | để trống số lần dùng vẫn tạo coupon, tự gán 1 | Medium / Low |
| BUG-05 | FR-12 | token user thường tạo được coupon qua API admin | Serious / High |

**10 bug đã có issue** (#1, #2, #4, #5, #6, #15, #8, #9, #10, #11) được automation tái hiện; dự kiến chỉ comment bằng chứng vào issue cũ.

Giới hạn: việc xác nhận là do AI chạy script; **chưa có xác nhận thao tác tay của sinh viên**.

### 5. GitHub — chưa đăng

Đã chuẩn bị:
- Xác thực GCM, chỉ đọc: tài khoản `datkrb`, có quyền push.
- Nhánh local `hw04-23120229-evidence`, commit `79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8`, chỉ chứa 29 PNG trong `evidence/HW04_23120229/`. **Chưa push.**
- 15 body (5 issue + 10 comment) trong `docs/issue-bodies/`.
- Script `_tools/HW04/publish_p05.py` (push-assets → verify-assets → publish, idempotent, có readback).
- `docs/github-issues.md` ghi kế hoạch mapping với URL đang để “chưa đăng”.

Chưa làm: ảnh chụp trang Issues trong `evidence/issues/`. Việc này chỉ làm được sau khi đã đăng.

### Commit
| Commit | Nội dung |
|---|---|
| `959305b` | 9 report chính thức |
| `eda249a` | test summary + attachments |
| `c31cd6a` | bug report + repro evidence |

Còn 1 commit chứa docs GitHub, log và context; hash nằm ở tin nhắn trả lời. Repo SUT_Issue chỉ có commit local, chưa push.

### Log
`EXEC-P05-001` (prompt P05 → checkpoint này).

Dừng sau P05. Cần người dùng quyết định cách đăng GitHub: cấp quyền cho phiên, hoặc tự chạy 3 lệnh trong `docs/github-issues.md`.
```


## EXEC-P06-001

```text
{
  "id": "EXEC-P06-001",
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "prompt_origin": "AI orchestrator chat A (session local_8f71b54f-a935-4aab-b94a-932f8a30f545) authored and sent this prompt as a cross-session message; not student-authored",
  "occurred_at": "2026-11-15T19:41:22+07:00",
  "timestamp_source": "observed",
  "capture_status": "partial",
  "source": "Prompt: cross-session message, saved verbatim to P06-prompt.txt. Output: checkpoint-P06.md (verbatim). occurred_at is the first tool-observed time in the turn.",
  "missing": [
    "occurred_at is the first tool-observed time in the turn, not the exact receipt time.",
    "The full tool call/result transcript is not exported, and short progress notes sent mid-turn are not included.",
    "The hash of the final commit (log + git-log.txt) is only in the final chat reply."
  ],
  "artifact_paths": [
    "HW04/report.md",
    "HW04/ai-audit.md",
    "HW04/ai-critique.md",
    "HW04/README.md",
    "HW04/user-handoff.md",
    "HW04/git-log.txt",
    "HW04/docs/spec-commit-count.md",
    "HW04/demo/",
    "_tools/HW04/record_skill_demo.js",
    "_tools/HW04/count_words.py"
  ],
  "redactions": [],
  "recorded_at": "2026-11-15T19:53:27+07:00"
}
```


### Prompt (verbatim)

```text
Vai trò: Chat thực hiện. Tiếp tục HW04 (P06 — tài liệu nộp). A đã đối soát P05 bước 1–4 (9 run 153 lượt 81P/72F, rerun trùng 153/153, bug-report 5 mới + 10 trùng; commit 959305b…4d3a8da). Bước 5 (đăng Issues) chờ sinh viên quyết định — A sẽ xử lý riêng; KHÔNG tự thử push/đăng lại. Trong tài liệu, URL issue mới để placeholder `<issue URL sau khi đăng>` và trỏ `docs/github-issues.md`; issue cũ #1–#15 dùng URL có sẵn.

Mọi số liệu phải lấy từ artifact thật (results/summary/review/bug-report/AI log); chưa làm thì ghi chưa làm. Tiếng Việt, Markdown.

1. `HW04/report.md` — báo cáo chính: thông tin SV/SUT/môi trường (version Playwright/browser/OS), phạm vi 3 feature, quy trình AI-first từng bước (dẫn record ID log), thiết kế framework (POM, data-driven, fixture, config 3 browser, reporter Run by), bảng TC automated cho mỗi feature (ID, HW02 trace, loại, assertion pattern), bảng ≥3 assertion pattern, kết quả 9 run (link report local), **review & gap analysis** tổng hợp từ `features/*/review.md` (AI sai/thiếu gì, bằng chứng, sửa, vì sao: prompt / giới hạn model / đặc tính feature), TC không automate + lý do, bug summary + link issue, giới hạn.
2. `HW04/ai-audit.md` — AI Audit Report (§9): câu khai "I use AI tools for the following tasks", với mỗi tương tác: tool, ngày giờ, prompt, output (nguyên văn hoặc dẫn snapshot/hash trong `ai-log/`), verdict VALID/INVALID/INCOMPLETE + lý do + bản sửa theo mẫu AI-02 (`_tools/skills/software-testing-ai-first/references/templates.md`); thống kê verdict. Khai trung thực: prompt do chat A (Claude Code) soạn, chat B thực hiện; human review của sinh viên ghi `pending` nếu chưa có.
3. `HW04/ai-critique.md` — 200–300 từ (đếm bằng script, ghi số từ), trả lời 3 câu hỏi §10, dựa trên lỗi AI thật trong review.
4. `HW04/ai-disclosure.md` nếu cần theo mẫu AI-03 (gộp được vào audit).
5. `HW04/git-log.txt` — `git log --stat --date=iso` đầy đủ; thêm `HW04/docs/spec-commit-count.md` đếm số commit chạm `*.spec.ts` (phải ≥8; nếu thiếu báo ngay, **không** tạo commit giả).
6. `HW04/demo/task2-video-script.md` — kịch bản ≥5 phút cho **sinh viên tự quay, tự nói tiếng Việt**: mở terminal `whoami` + `hostname`, giới thiệu suite, chạy 1 spec (đề xuất feature có bug) trên 3 browser bằng lệnh thật, mở HTML report thấy "Run by: 23120229" + ISO time, mở review.md và **kể 1 fix cụ thể** đối với script AI (chọn fix có diff rõ), tổng kết; có timeline theo phút và câu thoại gợi ý; checklist upload YouTube Unlisted. Không tạo giọng/AI voice.
7. Video demo Agent Skill (§7): ghi một video màn hình thật (Playwright/ffmpeg như HW03 `HW03/demo/README.md`) cho thấy dùng skill `playwright-data-driven-automation` end-to-end trên một feature (đọc SKILL → data → spec → run-matrix 3 browser → verify-report → review), lưu `HW04/demo/skill-demo.webm` + `metadata.json` (thời lượng, SHA). Nếu không quay được, ghi rõ và soạn kịch bản để sinh viên quay. Upload YouTube do sinh viên.
8. `HW04/README.md` — bảng self-assessment theo §15 (A25/B25/C25/Video15/Skill10) với điểm tự chấm có căn cứ (phần video/skill-video ghi điều kiện: đủ điểm khi sinh viên đã upload và điền link), test summary (số feature; TC automated/executed/passed/failed; browser runs; số bug; link video), link repo public (placeholder `<điền sau khi push>`), mục lục tệp nộp, hướng dẫn chạy lại (`npm ci`, `npx playwright install`, start SUT, `npm run matrix`).
9. `HW04/user-handoff.md` — danh sách việc sinh viên phải tự làm, theo thứ tự: review & ký nhận, tạo repo GitHub public + push (lệnh cụ thể), quay/upload video Task 2, upload video skill, điền link vào README/report, chạy lại bước đóng gói.
10. Commit từng phần.

AI log `EXEC-P06-…`. Checkpoint: tệp, số từ critique, số commit spec, commit. Dừng sau P06.
```


### AI output (verbatim)

```text
## Checkpoint P06 — tài liệu nộp (chat B)

**Kết quả:** đã soạn đủ tài liệu P06 từ artifact thật. Đã quay video demo skill. Video Task 2, upload YouTube, repo public và đăng Issues vẫn chờ sinh viên. Trong lượt này không thử push hay đăng lại.

### Tệp

| Tệp | Nội dung |
|---|---|
| `report.md` | Báo cáo chính (§1–11), xem chi tiết bên dưới |
| `ai-audit.md` | Câu khai §9; 17 tương tác (EXEC-P00…P06) theo mẫu AI-02, có hash prompt/output, verdict, bản sửa, Human review = pending; mục AI Disclosure (AI-03) gộp ở cuối |
| `ai-critique.md` | 295 từ, đếm bằng `_tools/HW04/count_words.py`; trả lời đủ 3 câu §10 dựa trên lỗi thật |
| `docs/spec-commit-count.md` | Bảng các commit chạm `*.spec.ts` |
| `git-log.txt` | `git log --stat --date=iso`, sinh ở commit cuối của P06 |
| `demo/task2-video-script.md` | Kịch bản Task 2 cho sinh viên tự quay (xem bên dưới) |
| `demo/skill-demo.webm` | Video demo skill (xem bên dưới) |
| `README.md` | Self-assessment, test summary, mục lục tệp nộp, hướng dẫn chạy lại |
| `user-handoff.md` | Việc sinh viên phải làm (xem bên dưới) |
| `_tools/HW04/` | `record_skill_demo.js`, `count_words.py` |

**`report.md`** gồm:
- môi trường: Playwright 1.56.1, Chromium 141.0.7390.37, Firefox 142.0.1, WebKit 26.0, Windows 11 10.0.26200, Node 22.21.0;
- phạm vi; quy trình AI-first dẫn record ID; framework;
- 3 bảng TC kèm assertion pattern; bảng 8 nhóm pattern;
- 9 run có link report;
- gap analysis tổng hợp **34 lỗi AI** (10 + 12 + 12) theo nhóm và nguyên nhân (prompt / model / feature);
- TC không automate; bug (URL issue mới để placeholder, issue cũ dùng link thật); giới hạn.

**`ai-audit.md`**, thống kê verdict:

| Verdict | Số |
|---|---|
| VALID | 6 |
| INVALID | 6 (đều là bản AI draft D1/D3) |
| INCOMPLETE | 5 |

**`demo/task2-video-script.md`**:
- timeline 0:00–7:00: `whoami`/`hostname` → giới thiệu suite → data/spec → chạy FR-17 trên 3 browser vào `reports/_scratch/video` → mở report Run by → kể fix placeholder ở C-AUTO-02 (`git diff 61518fd 1065a4a`) → tổng kết;
- checklist upload YouTube Unlisted.

**`demo/skill-demo.webm`**:
- quay màn hình thật bằng Playwright recordVideo, ngày 2026-11-15 lúc 19:45:53–19:52:14;
- dài **6:20.84**, 1280×720, VP8, không âm thanh, 29.427.236 byte, SHA-256 `419e54dba1e17c7a…`;
- nội dung: SKILL → data → spec/POM → check-data-driven → **run-matrix chạy thật FR-08 trên 3 browser** (mỗi browser 7P/6F, giống lần chạy chính thức) → verify-report → 3 report → summary → review;
- kèm `demo/metadata.json`, `skill-demo-events.json` và 5 frame đã xem lại.

**`README.md`**, self-assessment:

| Hạng mục | Hiện tại | Khi hoàn tất phần sinh viên |
|---|---|---|
| A | 22 | 25 |
| B | 22 | 25 |
| C | 22 | 25 |
| Video | 0 | 15 |
| Skill | 5 | 10 |
| **Tổng** | **71** | **100** |

Link video và link repo để placeholder.

**`user-handoff.md`**, thứ tự việc của sinh viên:
1. review và ký;
2. đăng Issues bằng 3 lệnh `publish_p05.py`;
3. tạo repo public và push (có lệnh);
4. video Task 2;
5. upload video skill;
6. cập nhật điểm, git-log, đóng gói (lưu ý giới hạn 20 MB).

### Số commit chạm spec
**9** (≥8, đạt). Nếu không tính commit smoke `7529ef7` thì còn 8. Không tạo commit giả.

### Commit P06

| Commit | Nội dung |
|---|---|
| `cb1bff3` | report |
| `fcae188` | audit + critique |
| `e0a1a9f` | kịch bản video Task 2 |
| `11cc787` | README, handoff, đếm commit spec |
| `2747f68` | video skill |

Còn 1 commit chứa log, context và git-log; hash nằm trong tin nhắn trả lời.

### Giới hạn
- Video skill 29 MB, vượt giới hạn Moodle 20 MB/tệp, nên chỉ nộp bằng link YouTube.
- Trong video, lệnh `run-matrix` thoát với mã 1 vì có test fail do bug SUT; đây là kết quả đúng.
- Human review của sinh viên vẫn pending.

### Log
`EXEC-P06-001`.

Dừng sau P06.
```


## EXEC-P05-002

```text
{
  "id": "EXEC-P05-002",
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "prompt_origin": "AI orchestrator chat A (session local_8f71b54f-a935-4aab-b94a-932f8a30f545) sent this follow-up as a cross-session message after P06; not student-authored. Publishing itself was done by chat A with the student's consent, not by B.",
  "occurred_at": "2026-11-15T20:57:00+07:00",
  "timestamp_source": "estimated",
  "capture_status": "partial",
  "source": "Prompt: cross-session message, saved verbatim to P05-issues-followup-prompt.txt. Output: checkpoint-P05-issues.md (verbatim).",
  "missing": [
    "occurred_at estimated from screenshot file times (first shot run ~20:57-20:58 +07:00); exact receipt time not observed.",
    "The full tool call/result transcript is not exported.",
    "The commit hash is only in the final chat reply."
  ],
  "artifact_paths": [
    "HW04/evidence/issues/",
    "HW04/docs/github-issues.md",
    "HW04/bug-report.md",
    "HW04/report.md",
    "HW04/README.md",
    "HW04/user-handoff.md",
    "HW04/submission-manifest.md",
    "HW04/features/*/results.md",
    "HW04/working-context.md",
    "_tools/HW04/shoot_issues.js",
    "_tools/HW04/fill_issue_urls.py"
  ],
  "redactions": [],
  "recorded_at": "2026-11-15T21:03:00+07:00"
}
```


### Prompt (verbatim)

```text
Thông tin từ chat A (làm sau khi xong P06, như phần bổ sung P05 bước 5): sinh viên đã cho phép và chat A đã chạy `_tools/HW04/publish_p05.py` push-assets → verify-assets (25 PNG dùng trong body, readback OK) → publish. Kết quả: 5 issue mới datkrb/SUT_Issue #39 (BUG-01), #40, #41, #42, #43 (BUG-05) và 10 comment vào #1, #2, #4, #5, #6, #15, #8, #9, #10, #11; receipts + readback tại `_tools/HW04/work/P05/receipts.json`, `assets-verified.json`. Việc của bạn: (1) điền URL thật vào `HW04/docs/github-issues.md`, `bug-report.md`, README/report (thay placeholder), ghi rõ việc publish do chat A chạy theo đồng ý của sinh viên; (2) chụp trang Issues công khai (danh sách + từng issue #39–#43 có ảnh hiển thị) bằng Playwright headless, chỉ đọc, lưu `HW04/evidence/issues/`; (3) commit; ghi AI log `EXEC-P05-…`/`EXEC-P06-…` cho phần bạn làm. Không đăng/sửa gì thêm trên GitHub.
```


### AI output (verbatim)

```text
## Checkpoint P05 bước 5 (bổ sung) — điền URL Issues + chụp trang Issues (chat B)

**Ai đăng:** chat A chạy `publish_p05.py` ngày 2026-11-15 (13:56 UTC) sau khi sinh viên đồng ý. Chat B **không** đăng, không sửa gì trên GitHub; lượt này chỉ đọc trang công khai.

### Điền URL (`_tools/HW04/fill_issue_urls.py`, nguồn `_tools/HW04/work/P05/receipts.json`, 15/15 `readback_verified`)
- `docs/github-issues.md`: trạng thái ĐÃ ĐĂNG + ai đăng; bảng mapping có URL thật; mục ảnh chụp; phần bị chặn trước đó giữ làm lịch sử.
- `bug-report.md`: dòng **GitHub issue** dưới mỗi BUG-01…05 (#39–#43); cột “Comment đã đăng” cho DUP-01…10.
- `report.md` §9/§11, `README.md` (dòng GitHub Issues, căn cứ tự chấm), `user-handoff.md` (bước 2 đã xong), `submission-manifest.md` R10, `features/*/results.md` (tiêu đề bug candidates), `working-context.md`.
- Không đổi điểm tự chấm; chỉ sửa căn cứ (còn trừ vì human review pending).

### Ảnh chụp trang Issues (`_tools/HW04/shoot_issues.js`)
- Playwright headless Chromium, không đăng nhập, chỉ GET; 2026-11-15 khoảng 20:58 +07:00.
- `evidence/issues/issues-list.png`: danh sách (43 results), 5 issue HW04 ở đầu.
- `HW04-BUG-0x-issue-NN.png` ×5: trang issue đầy đủ.
- `HW04-DUP-xx-issue-NN-comment.png` ×10: khối comment HW04 trên issue cũ.
- Kiểm tra ảnh: mọi `<img>` trong body có `naturalWidth > 0` — issue 3+2+3+3+1 = 12, comment 13, tổng 25 ảnh (khớp 25 PNG A đã verify); kết quả ở `evidence/issues/issues-screenshots.json`. Đã xem lại bằng mắt ảnh danh sách, #43 và comment #9.
- Lỗi trong lượt: lần đầu `waitUntil: networkidle` timeout trên GitHub → đổi sang `load` + chờ markdown body; ảnh comment ban đầu chỉ chụp header 37 px (anchor `#issuecomment-id`) → sửa sang khối `.react-issue-comment` chứa anchor, chụp lại toàn bộ.

### Log
`EXEC-P05-002`.
```

## EXEC-P07-001

```text
{
  "id": "EXEC-P07-001",
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "occurred_at": "2026-11-15T21:08:00+07:00",
  "timestamp_source": "estimated",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "prompt_origin": "AI orchestrator chat A (session local_8f71b54f-a935-4aab-b94a-932f8a30f545) authored and sent this prompt as a cross-session message; not student-authored",
  "source": "Prompt: cross-session message, saved verbatim to P07-prompt.txt. Output: checkpoint-P07.md (verbatim).",
  "capture_status": "partial",
  "missing": [
    "occurred_at estimated (commit cd234a1 is the first observable action of the turn); exact receipt time not observed.",
    "The full tool call/result transcript is not exported.",
    "Final QA ZIP sizes/SHA-256 and the hash of the commit holding this record are only in the final chat reply and _tools/HW04/work/P07/qa-package/ (the ZIP is rebuilt after this commit)."
  ],
  "artifact_paths": [
    "HW04/pdf/",
    "HW04/README.md",
    "HW04/user-handoff.md",
    "HW04/test-summary.md",
    "HW04/report.md",
    "HW04/evidence/issues/",
    "_tools/HW04/render_pdfs.py",
    "_tools/HW04/print_pdfs.js",
    "_tools/HW04/package_submission.py",
    "_tools/HW04/sync_p07_docs.py",
    "_tools/HW04/shoot_issues.js",
    "_tools/HW04/work/P07/"
  ],
  "redactions": [],
  "recorded_at": "2026-11-15T21:08:42+07:00"
}
```


### Prompt (verbatim)

```text
Vai trò: Chat thực hiện. Tiếp tục HW04 (P07 — PDF + đóng gói). A đã đối soát P06 (critique 295 từ, skill demo 6:20) và phần điền URL Issues #39–#43. Trước khi render: cập nhật README self-assessment/test summary vì Issues ĐÃ đăng (bỏ khoản trừ "Issues chưa đăng", giữ khoản human review pending), đồng bộ report/user-handoff (bỏ bước "đăng Issues" khỏi việc của sinh viên).

1. Render PDF thật từ Markdown cho: `report.md`, `ai-audit.md`, `ai-critique.md` (+ disclosure nếu tách), `bug-report.md`, `test-summary.md`, `README.md` vào `HW04/pdf/`. Tái dùng công cụ render đã có (xem `_tools/README.md`, `_tools/HW03/`), script mới đặt ở `_tools/HW04/`. Mở/xem từng PDF (render ảnh trang đầu) kiểm tra tiếng Việt, bảng, ảnh không vỡ.
2. Script đóng gói `_tools/HW04/package_submission.py`: staging theo §14 (report MD+PDF, README, audit/critique MD+PDF, git-log.txt, bug-report + ảnh issues, 9 HTML report thư mục đầy đủ, automation source không có node_modules/test-results, data, skill, demo script/metadata, evidence) → `HW04-submission/23120229_HW04_AI_Automation_<grade>.zip`, kiểm ≤20 MB/tệp (nếu vượt, tách theo chính sách), `SHA256SUMS.txt`, liệt kê nội dung zip. Grade lấy từ README self-assessment.
Lưu ý: `demo/skill-demo.webm` 29 MB > 20 MB/tệp → không đưa vào ZIP (nộp link YouTube; giữ trong repo/local), ghi rõ trong README. Tạo **2 ZIP**: bản hiện tại `23120229_HW04_AI_Automation_<tổng tự chấm hiện tại>.zip` chỉ để QA nội bộ trong `_tools/HW04/work/` (không phải bản nộp), và script hỗ trợ tham số `--grade NNN` để sinh viên đóng gói lại sau khi điền link/video. Bản nộp chính thức đặt `HW04-submission/` chỉ khi grade do sinh viên chọn.
3. QA: mọi link tương đối trong MD trỏ tới tệp có trong zip; không chứa token/mật khẩu thật ngoài tài khoản demo SRS; không chứa `_tools` nguyên khối, DB, cache.
4. Commit (commit riêng trước tiên các thay đổi tài liệu điều phối A chưa track trong `HW04/docs/` — prompt-plan và prompts P02–P07 — message `docs(hw04): update coordinator prompts (chat A)`).

AI log `EXEC-P07-…`. Checkpoint: đường dẫn ZIP, kích thước, SHA, danh sách việc còn lại của sinh viên. Dừng sau P07.
```


### AI output (verbatim)

```text
## Checkpoint P07 — PDF + đóng gói (chat B)

### Đồng bộ tài liệu (Issues đã đăng) — `_tools/HW04/sync_p07_docs.py`
- `README.md`: A/B/C 22 → **24** (bỏ khoản trừ Issues; vẫn trừ 1 mỗi feature vì human review pending), tổng **71 → 77**; ghi rõ `demo/skill-demo.webm` (29 MB) không có trong ZIP, nộp bằng link YouTube; mục lục thêm `pdf/`, `evidence/issues/`.
- `user-handoff.md`: bỏ bước “Đăng GitHub Issues” khỏi việc của sinh viên (còn 5 bước), thêm lệnh đóng gói `--grade NNN`.
- `test-summary.md`, `report.md` §3: ghi Issues #39–#43 + 10 comment đã đăng (chat A, SV đồng ý), thêm EXEC-P05-002.

### PDF — `pdf/` (`_tools/HW04/render_pdfs.py` + `print_pdfs.js`)
- Markdown → HTML → Chromium print (Playwright). Không dùng lại renderer ReportLab của HW03 vì nó trải mọi bảng thành dòng “tiêu đề: giá trị” và bỏ code block; HW04 nhiều bảng/code.
- 6 PDF: report 8 tr, ai-audit 4, ai-critique 1, bug-report 21 (có phụ lục 16 ảnh trang GitHub Issues, bản JPEG thu nhỏ), test-summary 2, README 3. Footer “HW04 · 23120229 · <tài liệu> · human review pending · x/y”.
- QA: 0 ký tự thay thế (U+FFFD), 34 link tương đối viết lại theo `pdf/` và đều tồn tại; ảnh trong HTML đều tải được trước khi in. Đã xem bằng mắt: report tr.1 và tr.5 (bảng), bug-report tr.15 (ảnh comment), ai-audit tr.1–2.
- Phát hiện khi xem: ảnh comment GitHub bị thanh tiêu đề sticky che 1 dòng → sửa `shoot_issues.js` (tắt sticky/fixed trước khi chụp), chụp lại 16 ảnh, kiểm lại 25/25 ảnh trong body hiển thị.

### Đóng gói — `_tools/HW04/package_submission.py`
- Nội dung = `git ls-files --cached --others --exclude-standard` của HW04 (nên không có node_modules, test-results kể cả `.auth` storageState, reports/_scratch), trừ `demo/skill-demo.webm`.
- Mặc định (không `--grade`): bản **QA nội bộ** với điểm README (077) ở `_tools/HW04/work/P07/qa-package/` — **không phải bản nộp**. `--grade NNN` → `HW04-submission/` (chưa tạo, chờ sinh viên chọn điểm).
- Vượt 20 MB nên tách: ZIP chính (tài liệu, PDF, source, data, skill, features, evidence, ai-log, demo metadata) + 3 ZIP report (mỗi thư mục report giữ nguyên). Tổng 5 tệp nộp kể cả `SHA256SUMS.txt`; mỗi ZIP có `.contents.txt`.
- QA tự động: 89 link tương đối trong MD → 0 hỏng; 0 token GitHub/khóa trong tệp text; quét 3353 mục trong trace zip: 0 token GitHub, mật khẩu chỉ có `Admin123!`/`Test1234!` (tài khoản demo SRS) và dữ liệu test trong `data/*.json`; 0 đường dẫn cấm (`_tools`, DB, cache, node_modules).
- Kích thước/SHA của bản QA cuối: xem `_tools/HW04/work/P07/qa-package/SHA256SUMS.txt` và `package-qa.json` (ZIP được build lại sau commit chứa log này, nên SHA cuối nằm trong tin nhắn trả lời).

### Commit
- `cd234a1` docs(hw04): update coordinator prompts (chat A)
- `c6729be` đồng bộ tài liệu + 6 PDF + chụp lại ảnh comment
- commit log/checkpoint P07: hash trong tin nhắn trả lời

### Việc còn lại của sinh viên (`user-handoff.md`)
1. Review và ký (`ai-audit.md` Human review, cam đoan), tự kiểm 5 bug mới.
2. Tạo repo GitHub public, push, điền link repo.
3. Quay video Task 2 (giọng thật, `whoami`/`hostname`), upload Unlisted, điền link.
4. Upload `demo/skill-demo.webm` lên YouTube, điền link.
5. Chọn điểm, chạy lại `git log --stat --date=iso > git-log.txt`, rồi `python _tools/HW04/package_submission.py --grade NNN` → nộp các tệp trong `HW04-submission/`.

### Log
`EXEC-P07-001`. Dừng sau P07.
```

## EXEC-P08-001

```text
{
  "id": "EXEC-P08-001",
  "tool": "Claude Code desktop app (Code tab), execution chat B",
  "model": "claude-opus-5-5 (Opus 5.5, per system environment)",
  "occurred_at": "2026-11-15T21:20:00+07:00",
  "timestamp_source": "estimated",
  "chat_role": "execution B",
  "chat_alias": "chat-b",
  "thread_id": "local_3a36d9d4-84fe-4f01-9e0b-d07eb815edfb (as listed by chat A in HW04/docs/prompt-plan.md; not independently verified by B)",
  "prompt_origin": "AI orchestrator chat A (session local_8f71b54f-a935-4aab-b94a-932f8a30f545) sent this as a cross-session message; not student-authored. Repo creation/push was done by chat A with the student's consent, not by B.",
  "source": "Prompt: cross-session message, saved verbatim to P08-prompt.txt. Output: checkpoint-P08.md (verbatim).",
  "capture_status": "partial",
  "missing": [
    "occurred_at estimated; exact receipt time not observed.",
    "The full tool call/result transcript is not exported.",
    "Final QA ZIP sizes/SHA-256 and the commit hashes after e71a4a4 are only in the final chat reply and _tools/HW04/work/P07/qa-package/."
  ],
  "artifact_paths": [
    "HW04/README.md",
    "HW04/report.md",
    "HW04/user-handoff.md",
    "HW04/ai-audit.md",
    "HW04/submission-manifest.md",
    "HW04/working-context.md",
    "HW04/pdf/",
    "HW04/git-log.txt",
    "_tools/HW04/sync_p08_repo.py",
    "_tools/HW04/work/P07/qa-package/"
  ],
  "redactions": [],
  "recorded_at": "2026-11-15T21:14:55+07:00"
}
```


### Prompt (verbatim)

```text
Thông tin từ chat A (P08 nhỏ): sinh viên đã cho phép và chat A đã tạo repo **public** https://github.com/datkrb/23120229-HW04-Automation và push `main` tới `dcb14ed` (GET ẩn danh 200, HEAD khớp). Việc của bạn: thay mọi placeholder link repo (`<điền sau khi push>`…) trong `README.md`, `report.md`, `user-handoff.md` (đánh dấu bước 2 đã xong do chat A thực hiện theo đồng ý của sinh viên), render lại các PDF bị ảnh hưởng, regenerate `git-log.txt`, chạy lại `package_submission.py` bản QA, commit, ghi log `EXEC-P08-…`. KHÔNG push (chat A sẽ push sau khi đối soát). Video vẫn là việc của sinh viên. Trả checkpoint ngắn.
```


### AI output (verbatim)

```text
## Checkpoint P08 — link repo public (chat B)

- Repo https://github.com/datkrb/23120229-HW04-Automation do **chat A** tạo/push (tới `dcb14ed`) theo đồng ý của sinh viên. Chat B **không push**.
- Điền link bằng `_tools/HW04/sync_p08_repo.py`: `README.md` (dòng Repo GitHub public, trạng thái), `report.md` (bảng đầu + §11), `user-handoff.md` (bước 2 ĐÃ XONG, còn 4 bước của sinh viên), `ai-audit.md` (dòng “Phần sinh viên tự làm”: Issues/repo do chat A làm, không phải thao tác tay của sinh viên), `submission-manifest.md` R17, `working-context.md`. Không còn placeholder `<điền sau khi push>` ngoài văn bản prompt của A.
- Render lại 6 PDF (`render_pdfs.py`): 34 link tương đối, 0 hỏng; README.pdf và report.pdf có link repo.
- `git-log.txt` tạo lại; ZIP QA 077 build lại ở `_tools/HW04/work/P07/qa-package/` (không phải bản nộp; kích thước/SHA trong `SHA256SUMS.txt` và tin nhắn trả lời).
- Còn lại của sinh viên: review & ký; video Task 2 + YouTube; upload video skill; chọn điểm → `package_submission.py --grade NNN`.
- Log `EXEC-P08-001`.
```
