# HW04 — Automation Testing (AI-first) · 23120229

Đề tài: dùng Playwright + TypeScript tự động hóa kiểm thử data-driven trên 3 trình duyệt cho 3 feature web của EShop:

| Pool | Feature | Nền tảng |
|---|---|---|
| A | FR-01 Đăng ký | Web |
| B | FR-08 Checkout | Web |
| C | FR-17 Quản lý mã giảm giá | Admin |

Bài làm theo quy trình AI-first: AI sinh bản draft, sau đó review và sửa, có ghi audit.

> Trạng thái: phần AI làm đã xong. Phần **sinh viên phải tự làm** liệt kê trong [user-handoff.md](user-handoff.md): review và ký, tạo repo public, quay video. GitHub Issues đã đăng (chat A, theo đồng ý của sinh viên). Human review: **pending**.

## Test summary

Số liệu từ lần chạy chính thức 2026-11-15, chi tiết ở [test-summary.md](test-summary.md).

| Chỉ số | Giá trị |
|---|---|
| Số feature | 3 |
| TC automated | **51** (A 20 · B 13 · C 18) |
| Browser | 3: Chromium 141, Firefox 142, WebKit 26 |
| Browser run (feature × browser), mỗi run 1 HTML report có “Run by: 23120229” + ISO time | **9** |
| TC executed (TC × browser) | **153** |
| Passed | **81** |
| Failed (đều do bug SUT, ổn định qua 2 lần chạy) | **72** |
| Flaky | 0 |
| Bug | **15**: 5 mới (HW04-BUG-01…05) + 10 đã có issue từ HW02/HW03 được automation tái hiện |
| GitHub Issues | **đã đăng**: [#39](https://github.com/datkrb/SUT_Issue/issues/39), [#40](https://github.com/datkrb/SUT_Issue/issues/40), [#41](https://github.com/datkrb/SUT_Issue/issues/41), [#42](https://github.com/datkrb/SUT_Issue/issues/42), [#43](https://github.com/datkrb/SUT_Issue/issues/43) + 10 comment vào #1, #2, #4, #5, #6, #8, #9, #10, #11, #15; ảnh chụp ở `evidence/issues/`; xem [docs/github-issues.md](docs/github-issues.md) |
| Video Task 2 (YouTube Unlisted) | `<điền link sau khi upload>` |
| Video demo Agent Skill | `<điền link sau khi upload>` (bản ghi local: `demo/skill-demo.webm`) |
| Repo GitHub public | `<điền sau khi push>` |

## Self-assessment (§15)

| No. | Criteria | Grade | Tự chấm hiện tại | Tự chấm khi hoàn tất phần sinh viên | Căn cứ |
|---|---|---|---|---|---|
| 1 | Task 1 – Feature A (FR-01) | 25 | 22 | 25 | 20 TC data-driven (JSON), 7 nhóm assertion, 3 report Run by, review 10 lỗi AI có diff, 5 bug (3 mới). Trừ vì human review chưa có (Issues đã đăng) |
| 1 | Task 1 – Feature B (FR-08) | 25 | 22 | 25 | 13 TC, fixture user/giỏ độc lập, tamper bằng `page.route`, review 12 lỗi AI, 4 bug trùng issue cũ. Trừ như trên |
| 1 | Task 1 – Feature C (FR-17) | 25 | 22 | 25 | 18 TC, `storageState`, cleanup, kiểm FR-12 ở API, review 12 lỗi AI, 2 bug mới. Trừ như trên |
| 2 | Task 2 – Demo video | 15 | 0 | 15 | Kịch bản ở [demo/task2-video-script.md](demo/task2-video-script.md). Đủ điểm chỉ khi sinh viên đã quay bằng giọng thật, có `whoami`/`hostname`, đã upload Unlisted và điền link |
| 3 | Agent Skills | 10 | 5 | 10 | Skill [playwright-data-driven-automation](skills/playwright-data-driven-automation/SKILL.md) đã dùng cho cả 3 feature. Video demo local đã ghi; đủ điểm khi upload YouTube và điền link |
| | **Total** | **100** | **71** | **100** | Tên ZIP dùng điểm sinh viên tự quyết sau khi review, ví dụ `23120229_HW04_AI_Automation_<NNN>.zip` |

Điểm do AI đề xuất theo căn cứ trên; sinh viên quyết định điểm cuối cùng.

## Tệp nộp

| Tệp / thư mục | Nội dung |
|---|---|
| [report.md](report.md) | Báo cáo chính: môi trường, framework, TC, assertion pattern, 9 run, review & gap analysis, TC không automate, bug |
| [test-summary.md](test-summary.md) | Test summary và bảng kiểm tra độ ổn định |
| [bug-report.md](bug-report.md) | Bug report theo S08 |
| [ai-audit.md](ai-audit.md) | AI Audit Report (§9) kèm AI Disclosure |
| [ai-critique.md](ai-critique.md) | AI Critique, 295 từ (§10) |
| [git-log.txt](git-log.txt), [docs/spec-commit-count.md](docs/spec-commit-count.md) | Git log và số commit chạm `*.spec.ts` |
| `automation/` | Dự án Playwright: `playwright.config.ts`, `pages/`, `tests/`, `data/`, `reports/<feature>-<browser>/index.html` (9 report) |
| `features/A-FR01`, `B-FR08`, `C-FR17` | Chọn TC, khảo sát DOM, **bản AI draft nguyên văn và prompt**, review, kết quả, evidence |
| `skills/playwright-data-driven-automation/` | Agent Skill (§7) |
| `evidence/` | Ảnh header report, ảnh bug (attachment Playwright và tái hiện độc lập) |
| `ai-log/execution/chat-b/` | AI log nguyên văn (JSONL + MD) |
| `demo/` | Kịch bản video Task 2, video demo skill local và metadata |
| [docs/github-issues.md](docs/github-issues.md), `docs/issue-bodies/` | Nội dung và kế hoạch đăng Issues |
| [submission-manifest.md](submission-manifest.md) | Bản đồ yêu cầu của đề → sản phẩm |

## Chạy lại

```
cd automation
npm ci
npx playwright install chromium firefox webkit
powershell -NoProfile -ExecutionPolicy Bypass -File ..\..\eshop-sut\start.ps1
npm run matrix -- --feature fr01=tests/fr01-register.spec.ts --feature fr08=tests/fr08-checkout.spec.ts --feature fr17=tests/fr17-coupon.spec.ts
npm run verify:reports
npm run check:data
```

- `npm run matrix` ghi đè `reports/<feature>-<browser>/`. Muốn giữ report đã nộp thì thêm `--reports-dir reports/_scratch/<tên>`.
- Lệnh `start.ps1` dùng đường dẫn tương đối theo workspace `D:\KI7\testing`. SUT nằm ở `eshop-sut`; backend seed lại dữ liệu mỗi lần khởi động.
