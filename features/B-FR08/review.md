# B — FR-08: human review bản AI draft → bản cuối (gap analysis)

Chat B (AI) review theo checklist R1–R13 của skill `playwright-data-driven-automation`. **Sinh viên chưa review**, trạng thái pending.

- Bản AI draft: [ai-draft/](ai-draft/), commit `7e01cf6`. Prompt từng bước D1 page objects, D2 khung spec, D3 assertion nằm trong `ai-draft/prompts/`.
- Bản cuối: `automation/pages/CartPage.ts`, `automation/pages/CheckoutPage.ts`, `automation/tests/fr08-checkout.spec.ts`, ở commit `a61087b` (fixture/POM) và `c1888f8` (oracle).
- Diff: `git diff 7e01cf6 c1888f8 -- automation/`.
- Lưu ý: commit `a61087b` chỉ chứa page object. Spec ở commit đó vẫn là bản draft (gọi `addAll`), nên **riêng commit này không biên dịch được**; `c1888f8` hoàn tất cặp sửa. Hai commit được tách để nhóm lỗi fixture và lỗi oracle riêng.

## 1. Kết quả chạy bản AI draft (thật, 2026-11-15)

| Browser | Total | Pass | Fail |
|---|---|---|---|
| chromium | 13 | 5 | 8 |
| firefox | 13 | 5 | 8 |
| webkit | 13 | 5 | 8 |

Nguồn: [draft-run-summary.md](draft-run-summary.md). Phân tích 8 fail của bản draft:

| TC | Lỗi draft | Thuộc về |
|---|---|---|
| B-AUTO-03, 08 | `items toHaveCount(2)` nhận 1 | **Lỗi test**: dòng P×2 không được thêm vào giỏ (xem lỗi #1–2 bên dưới) |
| B-AUTO-04, 10 | timeout 30 s | **Lỗi test**: `addAll` gọi `page.goto('/')` nên giỏ bị xóa; nút tiến hành thanh toán không tồn tại |
| B-AUTO-05 | ô tổng editable | Bug SUT (#4), fail đúng |
| B-AUTO-06, 07, 12 | đơn lưu 1 / 900000000 / -100000 | Bug SUT (#5), fail đúng nhưng oracle quá chặt (lỗi #4) |

Bản draft có 5 pass (01, 02, 09, 11, 13). Hai trong số đó pass với oracle sai hoặc quá chặt (lỗi #5–6): một là B-AUTO-01, ép redirect `/login` và không kiểm request; một là B-AUTO-13, ép đúng mã 401.

## 2. Lỗi AI và cách sửa

| # | Vị trí bản AI | Hạng mục | Lỗi / bằng chứng | Sửa (commit) | Vì sao AI sai |
|---|---|---|---|---|---|
| 1 | `CartPage.addAll()` → `openHome()` → `page.goto('/')` | R6 / R13 | Giỏ chỉ ở state client. Ở B-AUTO-04, `goto` lần hai (sau khi xóa dòng) làm mất giỏ, nên B-AUTO-04/10 timeout 30 s | `start()` là lần tải trang duy nhất; sau đó điều hướng bằng link EShop/Giỏ hàng trên header (`a61087b`) | **Prompt có nêu** “page.goto làm mất giỏ”, nhưng model vẫn gói `goto` trong helper `addAll` để tiện tái dùng. Ràng buộc trong prompt chưa được áp vào code tái dùng |
| 2 | `CartPage.addProduct`, nhánh qty > 1 | R13 / R6 | Bấm “Thêm vào giỏ hàng” một lần. SUT bỏ qua lần bấm đầu (#21), nên P×2/P×3 không vào giỏ và FR-08 fail vì lỗi fixture của FR-07 | Bấm tối đa 2 lần tới khi nút báo “Đã thêm”; ghi annotation `fixture-workaround` (có ở 03/04/08/10 trên cả 3 browser) (`a61087b`) | **Feature**: lỗi FR-07 không có trong đặc tả FR-08; locator inventory có ghi #21 nhưng model không nối thông tin đó vào action |
| 3 | spec (không có) | R2 / R6 | Không kiểm giỏ fixture trước khi checkout, nên fixture hỏng bị báo thành lỗi FR-08 (03/08 “Expected 2 Received 1” ở danh sách checkout) | Kiểm số dòng và số lượng trong giỏ trước khi hành động, thông điệp `fixture:` (`c1888f8`) | **Model**: Arrange chỉ thực hiện, không xác nhận trạng thái đã dựng |
| 4 | spec, nhánh tamper | R8 | Đòi `successHeading` hiện **và** `orders[0].total_amount === expectedTotal`. Theo B-TC-006, backend **từ chối** request cũng đạt FR-08; draft sẽ fail sai nếu SUT từ chối | Chấp nhận cả hai cách đạt; chỉ fail khi đơn lưu đúng giá trị client gửi, hoặc khi đơn được tạo với tổng khác tổng giỏ (`c1888f8`) | **Prompt** D3 có nêu “bị từ chối hoặc lưu đúng tổng giỏ”, nhưng model chọn oracle happy-path |
| 5 | spec, nhánh guest | R8 / R3 | Ép `toHaveURL(/login/)`. HW02 B-TC-001 cấm ép redirect. Không kiểm việc không có `POST /api/checkout` 2xx | Chờ kết quả cú click (dialog hoặc điều hướng). Nếu guest vẫn tới được nút xác nhận thì thử thanh toán. Kiểm không có trang thành công và không có checkout 2xx (`c1888f8`) | **Model** lấy hành vi đang quan sát (redirect `/login` trong khảo sát) làm oracle, tức oracle lấy từ hành vi SUT |
| 6 | spec, API không token | R8 | `toBe(401)`: ép mã cụ thể không có nguồn | Kiểm không 2xx và là 4xx (`c1888f8`) | **Model** chép mã từ code `authenticateToken` |
| 7 | spec, nhánh total-not-editable | R2 | Chỉ `not.toBeEditable()`. Nếu SUT đổi control, assertion trên phần tử không tồn tại sẽ fail sai, và không chứng minh “tổng vẫn tự tính” | Soft-assert không sửa được, rồi **thử gõ như người dùng**, sau đó assert dòng tổng vẫn bằng Σ giá × số lượng. Bằng chứng: “Tổng thanh toán: 1 ₫” (`c1888f8`) | **Model** kiểm thuộc tính thay vì hành vi FR-08 mô tả |
| 8 | spec `formatVnd = toLocaleString('vi-VN')` | R1 / R8 | So khớp tổng bằng định dạng tính trong test, theo locale cố định; khác browser hay khác locale sẽ fail giả. Lại gần như tái hiện logic hiển thị của SUT | Regex số nhóm 3 chữ số với dấu phân cách bất kỳ + `₫` (`amountPattern`) (`c1888f8`) | **Model** sao chép cách SUT format thay vì diễn đạt FR-21 (“phân cách hàng nghìn”) |
| 9 | spec, user fixture | R6 / R7 | Email `b<project><Date.now()>` không kèm retry; kết quả register/login không được kiểm | Email gồm project, thời gian và retry; `expect(reg.ok())`, `expect(login.ok())` có thông điệp fixture (`c1888f8`) | **Model** bỏ kiểm kết quả các bước setup |
| 10 | spec, success | R2 | `orders[0]` không kiểm số đơn; không kiểm có lỗi `alert` | Đúng 1 đơn, không có dialog lỗi, tổng đơn kiểu số (`c1888f8`) | **Model**: assertion tối thiểu |
| 11 | spec, structure | R2 | Chỉ kiểm `h1` và có ký tự `₫`; không kiểm phân cách nghìn như FR-21 yêu cầu | Soft-assert `h1`, regex phân cách cho tổng và cho thành tiền từng dòng (`c1888f8`) | **Prompt** D3 có nêu nhưng model rút gọn |
| 12 | `CartPage.rows` | R1 | `getByRole('row')` gồm cả hàng tiêu đề, và `filter({hasText})` khớp chuỗi con | `bodyRows` chỉ gồm hàng có nút Xóa; `row()` khớp ô tên chính xác (`a61087b`) | **Model** không kiểm cấu trúc bảng |

## 3. Assertion pattern dùng trong bản cuối

`check-data-driven.mjs tests --ignore smoke` phát hiện 8 nhóm pattern, OK.

| Pattern | Matcher | TC dùng |
|---|---|---|
| Hiển thị (web-first) | `toBeVisible` heading checkout / thành công / giỏ trống; `toBeHidden` thành công (guest) | 01–04, 09–11 |
| Nội dung (web-first) | `toContainText(/x\s*qty/)`, `toContainText(amountPattern)`, `toHaveText(qty)` | 02–08, 10–12 |
| Số lượng | `toHaveCount(n)` dòng giỏ / dòng checkout / nút thanh toán / `h1` | mọi TC UI; 08 (h1); 09 (0 nút) |
| Thuộc tính / trạng thái | `not.toBeEditable` ô tổng | 05 |
| Response / backend | `GET /api/orders/my-orders` (tổng đơn); `POST /api/checkout` status; danh sách response 2xx | 01, 02–04, 06, 07, 10–13 |
| Poll | `expect.poll` chờ kết quả click / kết quả thanh toán | 01–04, 06, 07, 10–12 |
| Soft | `expect.soft` | 05, 08 |
| Giá trị generic | `toBe`, `not.toContain`, `toHaveLength` | 02–04, 06, 07, 10–13 |
