---
name: playwright-data-driven-automation
description: "Quy trình dùng AI có kiểm soát để chuyển test case thiết kế sẵn thành script Playwright + TypeScript data-driven (dữ liệu ở .json/.csv riêng), chạy đa trình duyệt (chromium/firefox/webkit) với HTML report ghi 'Run by: <StudentID>' + ISO timestamp, rồi human review, phân tích lỗi của AI, phân loại fail và báo bug. Dùng khi người dùng muốn tự động hóa test case web/admin bằng Playwright, sinh/sửa/bảo trì spec do AI viết, viết test data-driven, chạy ma trận feature × browser, tổng hợp kết quả hay review script AI — kể cả khi chỉ nói 'automate các TC này', 'viết Playwright cho feature X', 'chạy 3 browser ra report'. Không dùng cho thiết kế test case thủ công, mobile native hay load test."
---

# Playwright data-driven automation (AI-first, human-in-the-loop)

Skill này biến **một bộ test case đã thiết kế** thành **suite Playwright data-driven chạy đa trình duyệt**, có bằng chứng thật và có phần review AI. AI soạn từng bước, người làm bài review và chịu trách nhiệm. Quy trình bám kế hoạch tự động hóa ở slide S12 tr.18: phạm vi → công cụ → test data → thiết kế & chạy → bảo trì → báo cáo.

Skill chỉ giữ **phương pháp**. Số TC tối thiểu, số browser, rubric, chuỗi “Run by”, nơi đăng bug… lấy từ đề hiện tại hoặc yêu cầu của người dùng, không coi là mặc định của skill. Với bài môn học, kết hợp skill quy trình chung (ví dụ `software-testing-ai-first`) để ghi AI log và audit.

## Khi nào đọc tệp nào

| Bước | Đọc |
|---|---|
| Chuẩn bị prompt cho AI từng bước | [references/prompt-templates.md](references/prompt-templates.md) |
| Schema data và cách nạp JSON/CSV | [references/data-and-assertions.md](references/data-and-assertions.md) |
| Review script AI, viết gap analysis | [references/review-checklist.md](references/review-checklist.md) |
| Phân loại fail, viết bug report / issue | [references/triage-and-bugs.md](references/triage-and-bugs.md) |
| Dựng config Playwright mới | [assets/playwright.config.template.ts](assets/playwright.config.template.ts) |

Script trong `scripts/` (Node ≥18, chạy từ bất kỳ đâu, dùng Playwright của dự án đích):

| Script | Việc |
|---|---|
| `run-matrix.mjs` | Chạy feature × browser, mỗi run một HTML report riêng, gom `results.json` → `summary.json` + `summary.md` |
| `verify-report.mjs` | Mở từng HTML report bằng chromium headless, kiểm tra có “Run by: <ID>” + ISO timestamp, chụp ảnh làm bằng chứng |
| `check-data-driven.mjs` | Quét spec, tìm mảng/đối tượng dữ liệu inline và spec không nạp data file; kiểm tra số assertion pattern |

## Quy trình

### 0. Hạ tầng (một lần cho dự án)

- Dự án `automation/` có `package.json`, `@playwright/test` ghim version, `tsconfig.json`, và config dựa trên [template](assets/playwright.config.template.ts). Template có 3 project, URL qua env, HTML report có title và metadata `Run by` + ISO timestamp lấy **lúc chạy**, `REPORT_DIR` và `RUN_LABEL` qua env, và `results.json` nằm cạnh report.
- Cài browser: `npx playwright install chromium firefox webkit`.
- Viết một smoke spec (mở trang chính) và chạy `run-matrix.mjs` để chắc hạ tầng chạy trên cả 3 browser trước khi viết test feature. Smoke **không** tính vào số TC của feature.
- Ghi baseline SUT (git HEAD, status) để sau này chứng minh không sửa SUT.

Timestamp phải do reporter sinh khi chạy. Không sửa tay report hay viết timestamp cố định, vì report là bằng chứng chống gian lận.

### 1. Chọn TC để automate (S12 tr.12–13)

Từ bộ TC thiết kế, lập bảng `TC | loại positive/negative/edge | automate? | lý do`. Nên chọn:

- TC lặp lại nhiều lần, nhiều bộ dữ liệu, cùng flow → data-driven (lợi nhất).
- TC rủi ro cao, dễ sai khi làm tay, hoặc cần chạy trên nhiều browser/nền tảng.
- TC có oracle rõ trong spec (SRS), quan sát được trên UI/API.

Không automate (ghi lý do vào báo cáo):

- Yêu cầu hay thay đổi, ad-hoc/exploratory, đánh giá chủ quan (thẩm mỹ, usability).
- Cần can thiệp ngoài tầm UI/API được phép (sửa DB/SUT, đổi đồng hồ hệ thống, email thật, CAPTCHA).
- Oracle chưa rõ trong spec: ghi “thiếu oracle”, không tự lấy hành vi code làm expected.

Gom các TC cùng flow thành **một test data-driven**. Mỗi dòng data vẫn là một TC có ID riêng để đếm và truy vết.

### 2. Tách test data ra tệp riêng

- `data/<feature>.json` (hoặc `.csv`). Mỗi dòng có `id`, `title`, `type` (`positive|negative|edge`), `input`, `expected`, `trace` (FR/rule trong SRS, TC nguồn). Schema và cách nạp: [data-and-assertions.md](references/data-and-assertions.md).
- Spec chỉ **nạp** dữ liệu (`import rows from '../data/fr01.json'` hoặc đọc CSV) rồi lặp để sinh test. Không có mảng/đối tượng dữ liệu inline trong spec. Slide minh họa `const cases = [...]` nhưng nhiều đề cấm cách đó. Chạy `check-data-driven.mjs` để kiểm.
- Dữ liệu cần duy nhất (email, mã coupon) dùng **placeholder** trong JSON (ví dụ `"{{uniqueEmail}}"`) và được thay lúc chạy bằng hậu tố theo run, browser và test. Như vậy test độc lập, chạy lại được khi backend không reset, và 3 browser không giẫm dữ liệu của nhau.
- Expected lấy từ SRS/TC thiết kế, không từ code hay hành vi đang chạy.

### 3. Dẫn AI từng bước, lưu bản nháp gốc

Không dùng một prompt chung kiểu “viết hết script”. Đi theo các bước dưới đây, mỗi bước một prompt với khung trong [prompt-templates.md](references/prompt-templates.md):

1. **Khảo sát DOM/locator thật**: AI hoặc người chạy mở trang (Playwright codegen, `page.getByRole` explorer, accessibility snapshot) và liệt kê locator theo thứ tự ưu tiên role → label → placeholder → text → test-id → CSS. Không đoán locator khi chưa nhìn trang.
2. **Page Object** (slide AI-First tr.14): mỗi trang một class trong `pages/`, locator và action đặt ở đó (DRY), test đọc như ý định người dùng.
3. **Spec data-driven**: nạp data file và sinh test theo `id`, theo 3A (Arrange–Act–Assert, tr.12). Mỗi test tự setup trạng thái của nó.
4. **Assertion**: áp ≥3 pattern khác nhau (bước 4), mỗi test có assertion có ý nghĩa với expected.

Trước khi sửa, lưu **nguyên văn** output đầu tiên của AI vào `ai-draft/<feature>/` (spec, page object, data). Commit bản nháp này riêng, rồi mới commit bản đã review. Diff giữa hai commit là bằng chứng human review. Ghi prompt/output vào AI log nếu bài yêu cầu.

### 4. Assertion pattern (≥3 loại khác nhau)

Chọn theo oracle của từng TC (chi tiết và ví dụ ở [data-and-assertions.md](references/data-and-assertions.md)):

| Pattern | Ví dụ | Khi dùng |
|---|---|---|
| Web-first trạng thái/nội dung | `toBeVisible`, `toHaveText`, `toContainText` | thông báo lỗi/thành công |
| Điều hướng | `toHaveURL(/\/login/)` | redirect sau submit |
| Số lượng | `toHaveCount(n)` | danh sách item, dòng bảng |
| Thuộc tính / validity HTML5 | `toHaveAttribute`, `toBeDisabled`, `el.validity.valid` | ràng buộc form phía client |
| Response / trạng thái backend | `page.waitForResponse` + `expect(res.status())`, `request.get` đối chiếu | oracle backend (tổng tiền, lưu DB) |
| Soft assertion | `expect.soft(...)` | kiểm nhiều trường độc lập trên một màn hình |
| Phủ định | `not.toBeVisible`, `not.toHaveURL` | negative: không được chuyển trang |

Dùng web-first assertion (tự retry). Không dùng `waitForTimeout` để “đợi cho chắc” (tr.15, 29).

### 5. Chạy đa trình duyệt, mỗi run một report

```bash
node <skill>/scripts/run-matrix.mjs --project-dir automation \
  --feature fr01=tests/fr01-register.spec.ts --feature fr08=tests/fr08-checkout.spec.ts \
  --browsers chromium,firefox,webkit --student-id 23120229 --reports-dir reports
node <skill>/scripts/verify-report.mjs --project-dir automation --reports-dir reports --student-id 23120229
```

- Mỗi run tạo `reports/<feature>-<browser>/index.html` và `results.json`. `summary.md` có bảng run và bảng trạng thái từng TC × browser.
- Muốn chạy lại một ô ma trận thì chạy lại đúng feature/browser đó. Report cũ bị ghi đè nên ghi số lần chạy lại vào báo cáo; không trộn kết quả các lần.
- `retries` mặc định 0. Retry chỉ là tín hiệu flaky, không phải cách sửa (tr.15). Nếu bật retry, báo riêng số test `flaky`.

### 6. Human review script AI

Đi qua [review-checklist.md](references/review-checklist.md): selector giòn, assertion yếu/thiếu, edge case thiếu, wait cứng/flaky, phụ thuộc thứ tự/dữ liệu, oracle lấy từ code, `test.fail`/`skip` che bug, dữ liệu inline, test không độc lập giữa browser.

Với mỗi lỗi, ghi: `# | vị trí trong bản AI | vấn đề | bản sửa | vì sao AI sai (prompt / giới hạn model / đặc tính feature)`. Gap analysis phải dựa trên diff thật giữa `ai-draft/` và bản cuối, không viết lỗi giả định.

### 7. Phân loại fail và báo bug

Mỗi test fail được xếp vào một nhóm: **bug SUT**, **lỗi test**, **môi trường**, hoặc **chưa kết luận**. Cách phân biệt xem [triage-and-bugs.md](references/triage-and-bugs.md).

- Bug SUT: giữ test **fail** (không đổi expected theo hành vi sai, không `test.fail()` che). Viết bug report Markdown kèm ảnh, và đăng issue chỉ khi người dùng cho phép.
- Lỗi test: sửa script, ghi vào gap analysis.
- Môi trường hoặc chưa kết luận: ghi riêng, không tính là pass hay fail của SUT.

### 8. Báo cáo

Lấy số liệu từ `summary.json` của lần chạy cuối: số feature, số TC automated (dòng data), executed, passed, failed, flaky, skipped, số browser run, số bug. Kèm bảng TC không automate và lý do, bảng assertion pattern, gap analysis, link report. Không báo pass cho test chưa chạy.

## Nguồn

- S12 Automation testing tr.12–13 (chọn TC), tr.18 (kế hoạch automation).
- Automation & Regression Testing AI-First tr.12 (3A), tr.13 (data-driven), tr.14 (POM/DRY), tr.15 (flaky), tr.28 (human-in-the-loop), tr.29–30 (web-first assertion, role locator, data-driven).
- Playwright docs: HTML reporter `title`, config `metadata`, `test.describe`/parameterized tests.
