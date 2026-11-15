# HW04 — Automation Testing (AI-first) · Báo cáo chính

| | |
|---|---|
| Sinh viên | MSSV **23120229** |
| Bài | HW04-AI Automation Testing, môn Kiểm thử phần mềm, FIT HCMUS |
| Ngày | 2026-11-13 → 2026-11-15 (Asia/Saigon, +07:00) |
| Repo GitHub public | [https://github.com/datkrb/23120229-HW04-Automation](https://github.com/datkrb/23120229-HW04-Automation) |
| Trạng thái review | AI (chat B) đã tự review và sửa script; **human review của sinh viên: pending** |

Báo cáo do AI (Claude Code, chat B thực hiện) soạn từ các artifact thật trong repo. Mọi con số lấy từ `automation/reports/*/results.json`, `automation/reports/summary.json`, `features/*/review.md`, `bug-report.md` và `ai-log/`. Phần nào chưa làm thì ghi “chưa làm”.

## 1. SUT và môi trường

| Thành phần | Giá trị |
|---|---|
| SUT | EShop — `eshop-sut` HEAD `85af3ba`, chạy local bằng `start.ps1`: Web `http://localhost:5173`, Admin `http://localhost:5174`, API `http://localhost:3000` |
| Hệ điều hành | Microsoft Windows 11 Home Single Language 10.0.26200 |
| Node.js | v22.21.0 |
| Công cụ | `@playwright/test` **1.56.1**, TypeScript 5.7.2 |
| Browser | Chromium **141.0.7390.37**, Firefox **142.0.1**, WebKit **26.0** (bản do Playwright cài) |
| Reporter | Playwright HTML reporter (mỗi run một report) + JSON reporter |
| Code test của lần chạy chính thức | `beec3c8`; SUT khởi động lại sạch lúc 2026-11-15 19:02 |

## 2. Phạm vi

Đề §5 yêu cầu dùng lại 3 feature web đã chọn ở HW02, mỗi pool một feature. Pool D (mobile) không dùng.

| Pool | Feature | Nền tảng | TC thiết kế HW02 | TC automate HW04 |
|---|---|---|---|---|
| A | FR-01 Đăng ký tài khoản | Web | 23 | **20** (18 từ HW02 + 2 bổ sung) |
| B | FR-08 Checkout | Web | 12 | **13** (9 từ HW02 + 4 bổ sung) |
| C | FR-17 Quản lý mã giảm giá (CRUD) | Admin | 20 | **18** (16 từ HW02 + 2 bổ sung) |
| | **Tổng** | | 55 | **51** |

Oracle là SRS (`eshop-sut/README.md`: FR-01, FR-08, FR-12, FR-17, FR-21, FR-22) cùng thiết kế TC của HW02. Không lấy hành vi của code làm expected.

## 3. Quy trình AI-first theo từng bước

Bài làm theo quy trình hai chat:

- **Chat A** (Claude Code, phiên điều phối) đọc đề và soạn prompt cho từng bước.
- **Chat B** (Claude Code, Opus 5.5, phiên thực hiện) làm bài và ghi AI log tại `ai-log/execution/chat-b/prompt_log.jsonl`.

Riêng bước sinh script, chat B tự soạn prompt theo khung của skill và tách thành 3 prompt (D1 page object → D2 khung spec → D3 assertion). Không dùng một prompt chung kiểu “viết hết script”. Các prompt này được lưu nguyên văn trong `features/*/ai-draft/prompts/`.

| Bước (S12 tr.18) | Việc | AI log |
|---|---|---|
| Phạm vi + công cụ | Đọc đề/SRS/slide, lập bản đồ yêu cầu `submission-manifest.md`; dựng Playwright 3 browser, reporter có Run by; smoke test | EXEC-P00-001 |
| Skill tái dùng | Agent Skill `playwright-data-driven-automation` gồm 3 script: run-matrix, verify-report, check-data-driven | EXEC-P01-001 |
| FR-01 | Chọn TC → khảo sát DOM thật → data JSON → AI draft (D1/D2/D3) → chạy draft 3 browser → review/sửa → chạy cuối | EXEC-P02-001…005 |
| FR-08 | Như trên | EXEC-P03-001…004 |
| FR-17 | Như trên | EXEC-P04-001…004 |
| Chạy cuối + bug | 9 run chính thức, chạy lại kiểm độ ổn định, bug report, chuẩn bị GitHub Issues; sau P06 điền URL #39–#43 + chụp trang Issues (đăng do chat A, SV đồng ý) | EXEC-P05-001, EXEC-P05-002 |
| Tài liệu | Báo cáo này, audit, critique, README | EXEC-P06-001 |

Mỗi feature có bản AI draft nguyên văn được commit **trước** khi sửa: `ea21d8a` (FR-01), `7e01cf6` (FR-08), `61518fd` (FR-17). Diff từ bản draft đến bản cuối là bằng chứng cho phần human review và gap analysis.

## 4. Thiết kế framework

| Thành phần | Mô tả | Tệp |
|---|---|---|
| Config 3 browser | Project `chromium` / `firefox` / `webkit`; URL Web/Admin/API lấy từ env; workers 1, retries 0 (retry chỉ là tín hiệu flaky, không phải cách sửa — slide tr.15) | `automation/playwright.config.ts`, `support/env.ts` |
| Reporter “Run by” | Title HTML report có dạng `EShop HW04 — <feature>-<browser> — Run by: 23120229 — <ISO start +07:00>`; cùng giá trị nằm trong Metadata. Timestamp được cố định một lần lúc chạy, không viết tay | config |
| Một report cho mỗi run | `RUN_LABEL` / `REPORT_DIR` theo env; `run-matrix.mjs` chạy feature × browser và gom `results.json` thành `summary.{md,json}` | `skills/playwright-data-driven-automation/scripts/` |
| Page Object Model | `RegisterPage`, `CartPage`, `CheckoutPage`, `AdminCouponPage`: locator và action ở POM, assertion ở spec (slide tr.14) | `automation/pages/` |
| Data-driven | Dữ liệu ở `data/fr01-register.json`, `fr08-checkout.json`, `fr17-coupon.json` (id/title/type/input/expected/trace). Spec chỉ import rồi lặp. `check-data-driven.mjs`: không có mảng dữ liệu inline, 8 nhóm assertion pattern | `automation/data/` |
| Fixture / isolation | FR-01: email `{{unique}}` theo project+thời gian+retry. FR-08: mỗi test một user tạo qua API, giỏ dựng bằng UI, giá lấy từ `/api/products` lúc chạy. FR-17: admin `storageState` riêng cho mỗi project, mã coupon duy nhất, `afterEach` xóa coupon do test tạo | spec |
| 3A + web-first | Arrange/Act/Assert (slide tr.12); dùng `expect`/`expect.poll` tự retry, không dùng `waitForTimeout` (tr.15, 29) | spec |

## 5. Test case đã automate

Assertion pattern được viết tắt như sau:

| Ký hiệu | Pattern |
|---|---|
| U | URL |
| V | visible / hidden |
| T | text / nội dung |
| N | số lượng (count) |
| A | attribute / validity HTML5 / editable |
| R | response / backend API |
| P | poll |
| S | soft assertion |
| G | giá trị generic |

### 5.1 FR-01 Đăng ký (`tests/fr01-register.spec.ts`)

| ID | HW02 | Loại | Mục tiêu | Pattern |
|---|---|---|---|---|
| A-AUTO-01 | A-TC-002 | positive | Mật khẩu 8 ký tự hợp lệ → thành công | U, V, R |
| A-AUTO-02 | A-TC-003 | positive | Mật khẩu 9 ký tự hợp lệ → thành công | U, V, R |
| A-AUTO-03 | A-TC-008 | edge | Đúng 1 chữ thường → thành công | U, V, R |
| A-AUTO-04 | A-TC-001 | edge | Mật khẩu 7 ký tự → từ chối | P, U, R, T |
| A-AUTO-05…08 | A-TC-004…007 | negative | Thiếu chữ hoa / chữ thường / chữ số / ký tự đặc biệt → từ chối | P, U, R, T |
| A-AUTO-09 | bổ sung HW04 | edge | Ký tự đặc biệt ngoài tập (`#`) → từ chối | P, U, R, T |
| A-AUTO-10…12 | A-TC-009…011 | negative | Mật khẩu / họ tên / email trống → từ chối | P, U, R, A (validity) |
| A-AUTO-13 | A-TC-012 | negative | Email thiếu `@` → từ chối | P, U, R, T |
| A-AUTO-14 | A-TC-013 | negative | Email đã tồn tại → từ chối | P, U, R, T |
| A-AUTO-15, 16 | A-TC-014, 015 | negative | Xác nhận lệch / trống → từ chối | N, P, U, R, T |
| A-AUTO-17 | A-TC-016 | negative | Email trùng + xác nhận lệch → từ chối | P, U, R, T |
| A-AUTO-18 | A-TC-017 | edge | Đăng ký thành công rồi đăng ký lại cùng email → lần 2 bị từ chối | U, V, R, P, T |
| A-AUTO-19 | A-TC-018 | edge | Cấu trúc form: ô xác nhận, type, `*`, đúng 1 `h1` | S, N, A, T |
| A-AUTO-20 | bổ sung HW04 | edge | Dấu cách thay cho ký tự đặc biệt → từ chối | P, U, R |

### 5.2 FR-08 Checkout (`tests/fr08-checkout.spec.ts`)

| ID | HW02 | Loại | Mục tiêu | Pattern |
|---|---|---|---|---|
| B-AUTO-01 | B-TC-001 | negative | Guest không thanh toán được | P, V, R |
| B-AUTO-02 | B-TC-002 | positive | P×1: danh sách, tổng, thành công, đơn lưu đúng tổng | N, T, V, R, G |
| B-AUTO-03 | B-TC-003 | positive | P×2 + Q×1 và giỏ phải xóa sau thành công | N, T, V, R |
| B-AUTO-04 | B-TC-004 | positive | Giỏ cập nhật từ P×1 thành P×2 | N, T, V, R |
| B-AUTO-05 | B-TC-005 | negative | Tổng không sửa được | A (editable), S, T |
| B-AUTO-06, 07 | B-TC-006, 007 | negative | Sửa `total_amount` thành 1 / 900.000.000 (`page.route`) | P, R, G |
| B-AUTO-08 | B-TC-008 | edge | Đúng 1 `h1`; `₫` và phân cách hàng nghìn | S, N, T |
| B-AUTO-09 | B-TC-011 | edge | Giỏ rỗng | V, N |
| B-AUTO-10 | bổ sung HW04 | edge | P×3 | N, T, R |
| B-AUTO-11 | bổ sung HW04 | positive | 3 sản phẩm khác nhau | N, T, R |
| B-AUTO-12 | bổ sung HW04 | negative | `total_amount` âm | P, R, G |
| B-AUTO-13 | bổ sung HW04 | negative | API checkout không token | R, G |

### 5.3 FR-17 Coupon (`tests/fr17-coupon.spec.ts`)

| ID | HW02 | Loại | Mục tiêu | Pattern |
|---|---|---|---|---|
| C-AUTO-01, 02 | C-TC-001, 002 | positive | Tạo percent / fixed hợp lệ, xem đúng từng cột, còn sau reload | R, N, T |
| C-AUTO-03…07 | C-TC-003, 005…008 | negative | Code / discount / expiry / minimum / uses trống → từ chối | P, R, N, A (validity), G |
| C-AUTO-08 | C-TC-009 | negative | Mã trùng → chỉ 1 bản ghi | P, R, G |
| C-AUTO-09…12 | C-TC-011…014 | edge | discount −1 / 0, minimum −1, uses 0 | P, R, N, A, G |
| C-AUTO-13 | C-TC-015 | positive | Xóa coupon của test | N, R |
| C-AUTO-14, 15 | C-TC-017, 018 | negative | Guest / user thường không vào được Admin | P, V, N |
| C-AUTO-16 | C-TC-004/010 (phần UI) | edge | Loại chỉ có percent / fixed | G |
| C-AUTO-17 | bổ sung HW04 | negative | Token user thường gọi API tạo coupon (FR-12) | S, R, G |
| C-AUTO-18 | C-TC-019 | edge | `*` cho 6 trường bắt buộc + đúng 1 `h1` | S, N, G |

### 5.4 Assertion pattern

Yêu cầu tối thiểu 3 pattern; suite dùng 8 nhóm (theo `check-data-driven.mjs`):

| Pattern | Matcher Playwright | Ví dụ |
|---|---|---|
| URL | `toHaveURL` | A-AUTO-01 (`/login`), A-AUTO-04 (vẫn ở `/register`) |
| Hiển thị / trạng thái | `toBeVisible`, `toBeHidden` | B-AUTO-01, C-AUTO-14 |
| Nội dung (web-first) | `toContainText`, `toHaveText` | A-AUTO-05 (banner nhắc mật khẩu), C-AUTO-01 (từng ô bảng) |
| Số lượng | `toHaveCount` | B-AUTO-11 (3 dòng), A-AUTO-19 (`h1`) |
| Thuộc tính / validity HTML5 | `toHaveAttribute`, `validity.valid`, `not.toBeEditable` | A-AUTO-19, C-AUTO-03, B-AUTO-05 |
| Response / backend | response `/api/*`, `GET /api/orders/my-orders`, `GET /api/coupons` | B-AUTO-06 (tổng đơn backend), C-AUTO-17 |
| Soft | `expect.soft` | A-AUTO-19, B-AUTO-08, C-AUTO-18 |
| Poll | `expect.poll` | mọi case REJ |

## 6. Kết quả 9 run (chính thức, 2026-11-15)

| Run | Report | Bắt đầu | Total | Pass | Fail | Flaky |
|---|---|---|---|---|---|---|
| fr01-chromium | [index.html](automation/reports/fr01-chromium/index.html) | 19:02:25 | 20 | 9 | 11 | 0 |
| fr01-firefox | [index.html](automation/reports/fr01-firefox/index.html) | 19:04:28 | 20 | 9 | 11 | 0 |
| fr01-webkit | [index.html](automation/reports/fr01-webkit/index.html) | 19:07:43 | 20 | 9 | 11 | 0 |
| fr08-chromium | [index.html](automation/reports/fr08-chromium/index.html) | 19:09:59 | 13 | 7 | 6 | 0 |
| fr08-firefox | [index.html](automation/reports/fr08-firefox/index.html) | 19:10:56 | 13 | 7 | 6 | 0 |
| fr08-webkit | [index.html](automation/reports/fr08-webkit/index.html) | 19:12:38 | 13 | 7 | 6 | 0 |
| fr17-chromium | [index.html](automation/reports/fr17-chromium/index.html) | 19:13:54 | 18 | 11 | 7 | 0 |
| fr17-firefox | [index.html](automation/reports/fr17-firefox/index.html) | 19:14:50 | 18 | 11 | 7 | 0 |
| fr17-webkit | [index.html](automation/reports/fr17-webkit/index.html) | 19:17:03 | 18 | 11 | 7 | 0 |
| **Tổng** | | | **153** | **81** | **72** | **0** |

- `verify-report.mjs`: 9/9 report hiển thị “Run by: 23120229” + ISO timestamp. Ảnh header ở `evidence/reports/`.
- Chạy lại toàn suite lần 2 (19:19–19:35): 153/153 test × browser có cùng trạng thái, nên các fail là ổn định. Chi tiết ở [test-summary.md](test-summary.md).
- **72 fail đều do bug SUT**: không có fail nào thuộc lỗi test hoặc môi trường. Không dùng `test.fail` hay `skip` để che bug.
- Bảng TC × browser của từng feature: [A](features/A-FR01/results.md) · [B](features/B-FR08/results.md) · [C](features/C-FR17/results.md).

## 7. Review và gap analysis bản AI draft

### 7.1 Kết quả chạy bản draft (trước human review)

| Feature | Draft pass / TC (mỗi browser) | Fail do lỗi test của AI | Pass rỗng hoặc oracle sai |
|---|---|---|---|
| FR-01 | **0 / 19** | 18 test timeout 30 s ở `fill` vào ô xác nhận không tồn tại; A-AUTO-19 mất soft assert vì trang bị đóng | — |
| FR-08 | 5 / 13 | 4 test (03/04/08/10) hỏng fixture: `page.goto` xóa giỏ; lần bấm đầu ở trang chi tiết bị bỏ qua (#21) | B-AUTO-01 ép redirect `/login`; B-AUTO-13 ép mã 401 |
| FR-17 | 10 / 18 | C-AUTO-02 timeout vì placeholder đổi theo loại; C-AUTO-18 dùng locator vô nghĩa | C-AUTO-14/15 assertion phủ định không đồng bộ (có thể pass rỗng); C-AUTO-17 ép mã 403; **18 coupon bị rò** vì chỉ dọn khi pass |

Tổng cộng ghi nhận **34 lỗi AI**: 10 ở FR-01, 12 ở FR-08, 12 ở FR-17. Mỗi lỗi có vị trí trong bản AI, bằng chứng, commit sửa và nguyên nhân. Xem [A](features/A-FR01/review.md), [B](features/B-FR08/review.md), [C](features/C-FR17/review.md).

### 7.2 AI sai hoặc thiếu gì

| Nhóm (checklist skill) | Ví dụ thật | Sửa |
|---|---|---|
| **Locator giòn** (R1) | `hasText: 'Mật khẩu'` khớp cả “Xác nhận mật khẩu” (FR-01); placeholder ô giá trị cố định, nhưng UI đổi placeholder khi chọn fixed (FR-17); `rows.filter({hasText})` khớp chuỗi con (FR-08/17) | Regex khớp đủ nhãn, regex cho cả hai dạng placeholder, khớp ô bảng chính xác |
| **Assertion yếu / thiếu** (R2, R3) | REJ chỉ kiểm banner nên bỏ sót validation native `required`; created kiểm `toContainText('10')` (khớp cả “100”) và bỏ cột minimum; không kiểm “không có POST 2xx” | REJ gồm 4 phần: có phản hồi, vẫn ở trang, không có request 2xx, tín hiệu gắn đúng trường. Kiểm từng ô theo cột |
| **Edge case thiếu** (R4) | Không có biên “dấu cách thay ký tự đặc biệt”; probe khám phá cho thấy SUT chấp nhận | Thêm A-AUTO-20 |
| **Wait cứng / flaky** (R5) | `waitForTimeout(1000)` ở FR-01 và FR-17 | `expect.poll` theo tín hiệu thật |
| **Phụ thuộc dữ liệu / isolation** (R6, R7) | Cleanup chỉ chạy khi pass (rò 18 coupon); `storageState` dùng chung một file cho 3 project; email không kèm retry | `afterEach` cleanup; file auth riêng mỗi project; dữ liệu duy nhất kèm retry |
| **Oracle lấy từ hành vi SUT** (R8) | Ép redirect `/login` (lấy từ khảo sát); ép 401/403 (chép từ middleware); tamper chỉ chấp nhận “thành công + đúng tổng” trong khi HW02 cho phép backend từ chối | Oracle theo SRS/HW02, ghi rõ các cách đạt được chấp nhận |
| **Fixture không được xác minh** (R13) | Không kiểm giỏ đã dựng đúng chưa, nên lỗi FR-07 bị báo thành lỗi FR-08 | Kiểm số dòng / số lượng trong giỏ trước khi hành động, thông điệp `fixture:` |
| **Control bị thiếu** | FR-01 luôn `fill` ô xác nhận; khi ô này không tồn tại thì toàn bộ suite timeout | `fill` bỏ qua control thiếu và ghi annotation; case cần ô xác nhận assert ô đó phải tồn tại |

Reviewer (chat B) cũng tự tạo một lỗi khi sửa FR-01: `has:` neo vào form nên không bao giờ khớp. Lỗi này phát hiện khi chạy và đã sửa trước commit. Đây là bằng chứng rằng bản sửa của AI cũng phải được chạy thật.

### 7.3 Vì sao AI sai

| Nguyên nhân | Ví dụ |
|---|---|
| **Prompt** | D1 FR-01 liệt kê locator ô xác nhận “theo đặc tả” dù inventory đã ghi ô này không có. D1 FR-17 chỉ đưa placeholder ở trạng thái mặc định. Có những ràng buộc đã nằm trong prompt (“page.goto làm mất giỏ”, “không waitForTimeout”, “từ chối hoặc lưu đúng tổng”) nhưng model vẫn vi phạm khi viết helper tái dùng hoặc khi chọn oracle happy-path |
| **Giới hạn model** | Mặc định `hasText` chuỗi con; viết cleanup theo happy path; assertion phủ định không có điểm đồng bộ; chép mã HTTP và định dạng số từ code; định dạng tiền tái hiện logic của SUT |
| **Đặc tính feature** | Giỏ chỉ nằm ở state client; placeholder phụ thuộc trạng thái; lỗi FR-07 (#21) chen vào fixture FR-08; validator mật khẩu sai che mọi kiểm tra email (A-AUTO-13/14 chỉ cô lập được bằng probe); trang Login có heading “Đăng Ký” |

## 8. TC không automate

| Feature | TC HW02 | Lý do |
|---|---|---|
| A | A-TC-019 (màu/ngôn ngữ), A-TC-020 (Tab order), A-TC-021 (Step Indicator — form chỉ 1 bước), A-TC-022 (vị trí lỗi — phụ thuộc ô xác nhận không tồn tại), A-TC-023 (API contract, ngoài web frontend) | Đánh giá chủ quan / cần sơ đồ layout / điều kiện không kích hoạt / ngoài phạm vi UI (S12 tr.13) |
| B | B-TC-009 (Tab order), B-TC-010 (form không có trường bắt buộc), B-TC-012 (phiên hết hạn — không tạo được nếu không sửa token, HW02 cấm) | Như trên / Blocked |
| C | C-TC-016 (danh sách rỗng — cần xóa dữ liệu dùng chung), C-TC-020 (Tab order), phần server của C-TC-004/010 (UI không cho nhập), phần màu của C-TC-019 | Như trên |

Ngoài ra, prompt điều phối có yêu cầu “sửa coupon”, “xóa có xác nhận”, “ngày quá khứ”. Các yêu cầu này **không có trong SRS FR-17** nên không có oracle để automate. Chi tiết ở `features/*/selection.md`.

## 9. Bug

Chi tiết ở [bug-report.md](bug-report.md) (theo S08). Có 15 bug được suite phát hiện hoặc tái hiện.

**5 bug mới** (đã tái hiện độc lập ngoài suite bằng script, có ảnh và đọc lại qua API):

| ID | Tóm tắt | Severity / Priority | Issue |
|---|---|---|---|
| HW04-BUG-01 | [FR-01] Chấp nhận mật khẩu dùng dấu cách thay ký tự đặc biệt | Medium / Medium | [#39](https://github.com/datkrb/SUT_Issue/issues/39) |
| HW04-BUG-02 | [FR-01] Chấp nhận email thiếu `@` | Medium / Medium | [#40](https://github.com/datkrb/SUT_Issue/issues/40) |
| HW04-BUG-03 | [FR-01] Đăng ký trùng email, tạo 2 tài khoản `test@eshop.com` | Serious / High | [#41](https://github.com/datkrb/SUT_Issue/issues/41) |
| HW04-BUG-04 | [FR-17] Tạo coupon khi “Số lần dùng tối đa/người” để trống | Medium / Low | [#42](https://github.com/datkrb/SUT_Issue/issues/42) |
| HW04-BUG-05 | [FR-12] Token user thường tạo được coupon qua API admin | Serious / High | [#43](https://github.com/datkrb/SUT_Issue/issues/43) |

**10 bug đã có issue**, automation tái hiện và đã comment bằng chứng (link comment trong [docs/github-issues.md](docs/github-issues.md)):

| Issue | Nội dung |
|---|---|
| [#1](https://github.com/datkrb/SUT_Issue/issues/1) | Mật khẩu hợp lệ bị từ chối |
| [#2](https://github.com/datkrb/SUT_Issue/issues/2) | Thiếu ô xác nhận / `*` / type email / `h1` |
| [#4](https://github.com/datkrb/SUT_Issue/issues/4) | Tổng tiền sửa được |
| [#5](https://github.com/datkrb/SUT_Issue/issues/5) | Backend tin `total_amount` của client (kể cả số âm) |
| [#6](https://github.com/datkrb/SUT_Issue/issues/6) | Checkout không có `h1` |
| [#8](https://github.com/datkrb/SUT_Issue/issues/8) | Minimum trống vẫn tạo được |
| [#9](https://github.com/datkrb/SUT_Issue/issues/9) | Discount −1 / 0 được chấp nhận |
| [#10](https://github.com/datkrb/SUT_Issue/issues/10) | Minimum −1 được chấp nhận |
| [#11](https://github.com/datkrb/SUT_Issue/issues/11) | Form coupon thiếu nhãn `*` |
| [#15](https://github.com/datkrb/SUT_Issue/issues/15) | Giỏ không được xóa sau thanh toán |

**Trạng thái đăng:** **đã đăng** (5 issue + 10 comment). Đăng ngày 2026-11-15 (13:56 UTC, tức 20:56 +07:00) bởi **chat A**, sau khi sinh viên đồng ý, bằng `_tools/HW04/publish_p05.py` (push-assets → verify-assets → publish) với tài khoản `datkrb`. Chat B (phiên thực hiện) **không** chạy lệnh đăng; chat B chỉ soạn nội dung/script trước đó, rồi sau khi đăng thì điền URL và chụp trang Issues công khai ở chế độ chỉ đọc. Mapping đầy đủ ở [docs/github-issues.md](docs/github-issues.md); ảnh chụp trang Issues ở `evidence/issues/`.

## 10. Agent Skill (§7)

Skill `playwright-data-driven-automation` nằm ở [skills/playwright-data-driven-automation/](skills/playwright-data-driven-automation/SKILL.md), gồm 8 bước gắn với slide, 4 tài liệu tham khảo, template config và 3 script. Cả 3 feature đều chạy qua `run-matrix` / `verify-report` / `check-data-driven`. Video demo: [https://youtu.be/TD4otNQzsFU](https://youtu.be/TD4otNQzsFU) (Unlisted, do **chat A** upload ngày 2026-11-15 qua Claude in Chrome theo đồng ý của sinh viên; bản upload là bản nén 8 fps từ `demo/skill-demo.webm`); metadata ở `demo/`.

## 11. Giới hạn và trung thực

- Human review và chữ ký của sinh viên: **pending**. Toàn bộ script, review và tài liệu do AI soạn.
- Prompt sinh code D1–D3 do **chính chat B tự soạn** theo khung skill, trong cùng phiên đã có kết quả khảo sát DOM. Đây không phải một chat sạch tách biệt; đã khai trong AI log.
- Xác nhận bug do AI chạy script; **chưa có thao tác tay của sinh viên**.
- A-AUTO-09 / A-AUTO-20 dựa trên cách AI hiểu “tập ký tự đặc biệt” trong SRS; cần sinh viên xác nhận.
- GitHub Issues: đã đăng bởi chat A theo đồng ý của sinh viên (không phải chat B). Repo public [https://github.com/datkrb/23120229-HW04-Automation](https://github.com/datkrb/23120229-HW04-Automation) do **chat A** tạo và push `main` (tới `dcb14ed`) ngày 2026-11-15 sau khi sinh viên đồng ý; chat B không push. Video Task 2: sinh viên tự quay và upload, link `<điền sau khi upload>`.
- 9 report có trace, tổng khoảng 55 MB; cần lưu ý giới hạn Moodle 20 MB/tệp khi đóng gói.
- Một số lượt chạy tạo dữ liệu thật trong DB local của SUT (user/đơn/coupon test). Dữ liệu này mất khi backend khởi động lại; coupon do test tạo đã được dọn.
