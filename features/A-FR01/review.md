# A — FR-01: human review bản AI draft → bản cuối (gap analysis)

Chat B (AI) thực hiện review theo checklist R1–R13 của skill `playwright-data-driven-automation`. **Sinh viên chưa review**, trạng thái pending.

- Bản AI draft: [ai-draft/](ai-draft/) (nguyên văn), commit `ea21d8a`. Prompt từng bước D1 page object, D2 khung spec, D3 assertion nằm trong [ai-draft/prompts/](ai-draft/prompts/).
- Bản cuối: `automation/pages/RegisterPage.ts`, `automation/tests/fr01-register.spec.ts`, `automation/data/fr01-register.json` tại commit `4993ad4`.
- Diff: `git diff ea21d8a 4993ad4 -- automation/` cho ra 3 tệp, +199/−67.

## 1. Kết quả chạy bản AI draft (thật, 2026-11-13)

| Browser | Total | Pass | Fail | Thời gian |
|---|---|---|---|---|
| chromium | 19 | 0 | 19 | 611 s |
| firefox | 19 | 0 | 19 | 638 s |
| webkit | 19 | 0 | 19 | 611 s |

Nguồn: [draft-run-summary.md](draft-run-summary.md) (report ở `reports/_scratch/fr01-draft/`, gitignored).

- A-AUTO-01…18 đều **timedOut 30 s** tại `locator.fill` của ô “Xác nhận mật khẩu”. Ô này không tồn tại nên lời gọi chờ tới hết timeout.
- A-AUTO-19: các soft assertion dồn timeout, trang bị đóng giữa chừng (“Target page… has been closed”), nên các kiểm tra type và h1 không được đánh giá.

Không fail nào ở bản draft là bằng chứng về SUT: tất cả là lỗi của script.

## 2. Lỗi AI và cách sửa

| # | Vị trí bản AI | Hạng mục | Lỗi / bằng chứng | Sửa (commit) | Vì sao AI sai |
|---|---|---|---|---|---|
| 1 | `pages/RegisterPage.ts:50`, `fill()` | R6 / R9 | Luôn `fill` ô confirm dù ô không tồn tại → 18/19 test timeout 30 s trên cả 3 browser. Một control thiếu (lỗi SUT) làm hỏng toàn bộ suite và che mọi oracle khác | `fill()` kiểm `hasControl` trước, bỏ qua và trả về danh sách control thiếu (ghi annotation `missing-control`). Case chỉ dựa vào confirm (15, 16) assert `toHaveCount(1)` với thông điệp FR-01 (`7a5abb3`) | **Prompt + feature.** Prompt D1 liệt kê locator confirm “theo đặc tả” dù inventory đã ghi ô này không tồn tại; model sinh POM theo đặc tả thay vì theo DOM thật |
| 2 | `RegisterPage.ts:38`, `hasText: label` | R1 | `hasText` là so khớp chuỗi con, nên “Mật khẩu” cũng khớp “Xác nhận mật khẩu”. Khi SUT sửa và thêm ô confirm, locator password sẽ khớp 2 input (lỗi tiềm ẩn) | Neo nhãn bằng regex đầy đủ `^Mật khẩu\s*\*?$`, chịu được dấu `*` theo FR-22 (`7a5abb3`) | **Model**: mặc định dùng `hasText` chuỗi, không xét nhãn chứa nhau |
| 3 | spec `:58`, `waitForTimeout(1000)` | R5 | Wait cứng (slide tr.15) | `expect.poll` chờ tín hiệu: native invalid, banner, hoặc rời trang (`7a5abb3`, `4993ad4`) | **Model** quen mẫu chờ cứng. Prompt D3 không nêu tên `waitForTimeout` là cấm |
| 4 | spec `:58–61`, nhánh reject | R2 / R3 | REJ chỉ kiểm URL và banner. Lỗi native `required` (họ tên/email/mật khẩu trống) không có banner nên test sẽ fail sai. Không kiểm “không có POST /api/register 2xx” | REJ gồm 3 phần: (a) có phản hồi; (b) vẫn ở `/register`; (c) không có response đăng ký 2xx; (d) tín hiệu gắn đúng trường: `validity.valid=false` của ô đó **hoặc** banner nhắc tên trường (`7a5abb3`) | **Prompt** D3 có nêu “native validity hoặc banner”, nhưng model chỉ hiện thực nhánh banner; thiếu hiểu biết feature (validation 2 tầng) |
| 5 | spec `:61`, `FIELD_KEYWORDS[field]` | R2 | A-AUTO-17 có `field: "email\|confirm"`, tra map ra `undefined` nên `toContainText(undefined)` lỗi | Tách `field` theo `\|`, ghép regex các trường (`7a5abb3`) | **Model** không đọc hết các dạng `expected` trong data đã cho |
| 6 | spec `:47–54`, `waitForResponse` | R5 / R6 | Promise `waitForResponse` tạo ở mọi nhánh. Nhánh reject không await; nhánh success thì nếu client từ chối, promise treo tới timeout | POM thu mọi response `POST /api/register` qua `page.on('response')`; assert trên mảng (`7a5abb3`) | **Model**: mẫu “arrange promise trước click” áp máy móc cho cả case không có request |
| 7 | spec, nhánh success | R2 / R8 | OK chỉ kiểm `res.ok()` + URL `/login`. Trang Login của SUT có heading “Đăng Ký”, nên URL không chứng minh “trang có chức năng Đăng nhập” | Thêm assert link “Quên mật khẩu?” hiển thị (chức năng chỉ có ở trang Login), thông điệp trích FR-01 (`7a5abb3`) | **Feature**: heading Login sai (lỗi GUI riêng); AI không khảo sát trang đích |
| 8 | spec `:35–41`, structure | R9 / R11 | Label `hasText` khớp chuỗi con. Các soft assertion dùng timeout mặc định 7 s nên dồn quá 30 s, trang đóng, các kiểm tra sau không được đánh giá | Dùng `RegisterPage.label()` / `fieldOfLabel` (DRY), timeout 1.5 s cho trang tĩnh, thông điệp ghi FR (`7a5abb3`, `b6be9ae`) | **Model** không ước lượng tổng thời gian soft assert khi nhiều phần tử thiếu |
| 9 | data | R4 | Thiếu biên “dấu cách thay ký tự đặc biệt”, chỉ lộ ra khi probe khám phá (email thiếu `@` vẫn đăng ký được bằng mật khẩu có dấu cách) | Thêm A-AUTO-20 (`1fb5055`) | **Feature**: validator SUT sai theo cách không đoán được từ SRS; AI và TC HW02 đều chỉ sinh biên theo tập ký tự SRS |
| 10 | reject khi SUT chấp nhận sai | R2 | Bản sửa đầu: khi đăng ký sai được chấp nhận và rời trang, test fail với thông điệp mơ hồ “không có phản hồi” | Poll kết thúc cả khi rời trang, rồi assert URL với thông điệp rõ (`4993ad4`) | Lỗi trong bản sửa của chính chat B, phát hiện khi chạy A-AUTO-20 |

### Lỗi do reviewer (chat B) tạo rồi tự sửa

Ở lần chạy sửa đầu (iter1), `filter({ has: this.form.locator('label') })` không bao giờ khớp: `has:` cần locator không bị neo vào phần tử khác. Mọi input bị xem là “thiếu”. Lỗi phát hiện bằng spec debug tạm (đã xóa) và được sửa trước khi commit `7a5abb3`. Ghi lại để minh bạch: bản sửa của AI cũng cần chạy thật mới tin được.

### Điều đã cân nhắc nhưng giữ nguyên

- **A-AUTO-13/14/17** (email sai định dạng / trùng) fail vì banner nói về mật khẩu, không phải email. Lý do: validator mật khẩu của SUT từ chối mọi mật khẩu hợp lệ theo SRS, nên tầng kiểm email không bao giờ được chạm. Test **giữ fail** theo oracle (REJ phải gắn với trường sai). Không đổi sang mật khẩu “mà SUT chấp nhận”, vì làm vậy là lấy hành vi code làm dữ liệu chuẩn. Lỗi email bị che này được tách bằng probe khám phá, xem [results.md](results.md).
- **Ô confirm thiếu với các case positive**: không fail thêm ở case positive vì oracle FR-01 về thành công vẫn đánh giá được. Thiếu ô được báo ở A-AUTO-15/16/19 và annotation `missing-control`. Không dùng `test.fail` hay `skip` ở đâu cả.

## 3. Assertion pattern dùng trong bản cuối (≥3)

`check-data-driven.mjs tests --ignore smoke` phát hiện 7 nhóm pattern, OK.

| Pattern | Matcher | TC dùng |
|---|---|---|
| URL / điều hướng | `toHaveURL(/\/login$/)`, `toHaveURL(/\/register$/)` | 01–03, 18 (OK); 04–14, 17, 20 (REJ) |
| Hiển thị (web-first) | `toBeVisible()` link “Quên mật khẩu?” | 01–03, 18 |
| Nội dung (web-first) | `toContainText(keyword)` banner; `toContainText('*')` nhãn | REJ không có native invalid (04–09, 13, 14, 17, 20); 19 |
| Số lượng | `toHaveCount(1)` ô/nhãn confirm, `toHaveCount(1)` h1 | 15, 16, 19 |
| Thuộc tính / validity HTML5 | `toHaveAttribute('type', …)`, `validity.valid` | 19; native REJ 10–12 |
| Response / backend | mảng `POST /api/register` → `.ok()` = có/không 2xx | tất cả OK và REJ |
| Soft | `expect.soft(...)` | 19 |
| Poll | `expect.poll(...)` chờ tín hiệu | mọi REJ |
