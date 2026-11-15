# C — FR-17: human review bản AI draft → bản cuối (gap analysis)

Chat B (AI) thực hiện review theo checklist R1–R13 của skill `playwright-data-driven-automation`. **Sinh viên chưa review**, trạng thái pending.

- **Bản AI draft:** [ai-draft/](ai-draft/), commit `61518fd`. Prompt từng bước (D1 page object, D2 khung spec, D3 assertion) nằm trong `ai-draft/prompts/`.
- **Bản cuối:**
  - `automation/pages/AdminCouponPage.ts` và `data/fr17-coupon.json`, commit `1065a4a`.
  - `automation/tests/fr17-coupon.spec.ts`, commit `ec9c5ae`.
- **Diff:** `git diff 61518fd ec9c5ae -- automation/`.
- **Lưu ý về commit:** `1065a4a` đổi API của page object (bỏ `type`/`discount`… dạng thuộc tính riêng). Vì vậy spec draft ở commit đó **không biên dịch được**; `ec9c5ae` mới hoàn tất cặp sửa.

## 1. Kết quả chạy bản AI draft (thật, 2026-11-15)

| Browser | Total | Pass | Fail |
|---|---|---|---|
| chromium | 18 | 10 | 8 |
| firefox | 18 | 10 | 8 |
| webkit | 18 | 10 | 8 |

Nguồn: [draft-run-summary.md](draft-run-summary.md). Phân loại các fail và pass đáng chú ý:

| TC | Kết quả draft | Thuộc về |
|---|---|---|
| C-AUTO-02 | timeout 30 s | **Lỗi test**: locator ô giá trị (lỗi #1 bên dưới) |
| C-AUTO-06, 07, 09, 10, 11 | coupon sai được tạo | Bug SUT, fail đúng |
| C-AUTO-17 | 200 thay vì 403 | Bug SUT, nhưng oracle ép đúng mã 403 |
| C-AUTO-18 | locator lọc nhãn theo chữ `code` | **Lỗi test**: locator vô nghĩa; fail đúng hướng nhưng sai lý do |
| C-AUTO-14, 15 | pass | **Có thể pass rỗng**: `not.toBeVisible()` chạy ngay, không chờ kết quả đăng nhập (lỗi #6). Kết quả pass không chứng minh được việc chặn truy cập |

**Rò dữ liệu:** bản draft chỉ dọn coupon khi test pass. Sau lần chạy draft còn **18 coupon `HW4…`** trong DB (6 mỗi browser). Danh sách lưu ở `_tools/HW04/work/p04-draft-leftover-coupons.txt`; chat B đã xóa chúng qua API admin (18 × HTTP 200) trước khi chạy bản sửa. Sau lần chạy cuối, DB chỉ còn 4 coupon seed.

## 2. Lỗi AI và cách sửa

| # | Vị trí bản AI | Hạng mục | Lỗi / bằng chứng | Sửa (commit) | Vì sao AI sai |
|---|---|---|---|---|---|
| 1 | `AdminCouponPage`: `discount = getByPlaceholder('Giá trị % (VD: 10)')`; `fillForm` chọn type **sau** khi điền | R1 | Chọn `fixed` đổi placeholder thành “Số tiền (VD: 50000)”, nên C-AUTO-02 timeout 30 s trên cả 3 browser | Placeholder dùng regex cho cả 2 dạng; chọn type trước rồi mới điền (`1065a4a`) | **Prompt** D1 chỉ đưa một placeholder (khảo sát ở trạng thái mặc định). **Đặc tính feature**: placeholder phụ thuộc trạng thái |
| 2 | `type = page.locator('select')`, ô nhập dùng `page.getByPlaceholder` toàn trang | R1 | Locator không giới hạn trong form; trang admin có nhiều tab và form khác | Mọi field được scope trong `form` (`1065a4a`) | **Model** chỉ nhìn một màn hình |
| 3 | `row(code) = rows.filter({ hasText: code })` | R1 | Khớp chuỗi con | Khớp ô mã chính xác; chỉ lấy hàng dữ liệu (`1065a4a`) | Mặc định của model |
| 4 | spec: dọn dữ liệu ở cuối thân test | R6 / R7 | Test fail thì không dọn, 18 coupon bị rò (bằng chứng ở trên) | `afterEach` dọn theo mã do test tạo, kể cả khi fail (`ec9c5ae`) | **Model** viết cleanup theo happy path |
| 5 | spec: `waitForTimeout(1000)` trước khi đọc API ở nhánh reject | R5 | Wait cứng. Nếu POST chậm hơn 1 s, test “không có bản ghi” sẽ pass giả | Poll tới khi có tín hiệu (native invalid, `alert`, hoặc response POST), rồi mới kiểm (`ec9c5ae`) | **Model**. Prompt D3 có nói “không waitForTimeout” nhưng vẫn bị vi phạm |
| 6 | spec: access-denied dùng `not.toBeVisible()` ngay sau click Login | R2 / R5 | Assertion phủ định có thể qua ngay trước khi đăng nhập xử lý xong (pass rỗng); không có điểm đồng bộ nên pass không có giá trị chứng minh | Chờ kết quả đăng nhập (dialog hoặc admin shell), rồi kiểm không có shell, không có mục coupon và vẫn ở form đăng nhập (`ec9c5ae`) | **Model**: assertion phủ định không có điểm đồng bộ |
| 7 | spec: nhánh reject chỉ đếm bản ghi qua API | R2 / R8 | Không kiểm tín hiệu từ chối như HW02 yêu cầu; không kiểm bảng UI; không kiểm response POST | Kiểm thêm không có POST 2xx, không có dòng trên bảng, có tín hiệu native hoặc thông báo (`ec9c5ae`) | **Prompt** D3 có nêu, nhưng model chỉ hiện thực một phần |
| 8 | spec: `expect(res.status()).toBe(403)` | R8 | Ép mã không có nguồn; không kiểm coupon có bị tạo hay không | Soft `!res.ok()` + kiểm không có coupon nào được tạo bởi user thường (`ec9c5ae`) | **Model** đoán mã chuẩn REST |
| 9 | spec: structure `label.filter({ hasText: field })` | R1 / R2 | Lọc nhãn theo khóa tiếng Anh `code`/`type`…, nên kiểm tra sai thứ | Đọc nhãn thật của từng control (`labels`/`aria-label`) và tìm `*` (`ec9c5ae`) | **Model** nhầm khóa data với text UI |
| 10 | data/spec: created kiểm `toContainText('10')`, không kiểm cột minimum | R2 / R4 | `'10'` cũng khớp `'100'`; cột “Đơn tối thiểu” không được kiểm | So từng ô theo cột với text chính xác, thêm minimum vào data (`1065a4a`, `ec9c5ae`) | **Model** chọn assertion lỏng; data D-step thiếu cột |
| 11 | spec: storageState một file chung `test-results/.auth/admin.json` | R7 | 3 project cùng ghi một file nếu chạy song song | File theo `project.outputDir` + tên project (`ec9c5ae`) | **Model** bỏ qua chạy đa browser |
| 12 | spec: mã `HW4<project><Date.now()>` không kèm retry | R6 | Retry có thể trùng mã | Thêm `R<retry>` (`ec9c5ae`) | Nhỏ |

## 3. Assertion pattern dùng trong bản cuối

Chạy `check-data-driven.mjs` cho kết quả 8 nhóm pattern, OK.

| Pattern | Matcher | TC dùng |
|---|---|---|
| Số lượng | `toHaveCount` dòng coupon (1/0), mục nav, heading, `h1` | 01, 02, 03–13, 14, 15, 18 |
| Nội dung (web-first) | `toHaveText` từng ô của bảng | 01, 02 |
| Hiển thị / trạng thái | `toBeVisible` / `toBeHidden` heading admin, login | 14, 15 |
| Validity HTML5 | `validity.valid` của ô bị sai | 03–12 |
| Response / backend | response `POST /api/admin/coupons`, `GET /api/coupons` theo mã, status API | 01–13, 17 |
| Poll | `expect.poll` chờ kết quả submit hoặc login | 03–12, 15 |
| Soft | `expect.soft` | 17, 18 |
| Giá trị generic | `toEqual` danh sách option, `toHaveLength`, `toContain('*')` | 03–13, 16, 17, 18 |
