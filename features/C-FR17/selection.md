# C — FR-17 Quản lý mã giảm giá (Admin :5174): chọn TC để automate

Chat B soạn ở P04, ngày 2026-11-15 (+07:00), theo bước 1 của skill `playwright-data-driven-automation`. Tiêu chí chọn TC lấy từ S12 tr.12–13. Nguồn TC: `HW02/features/c-fr17-coupon-admin/04-test-cases.md` (20 TC, đều Not run). Oracle lấy từ SRS FR-17, FR-12, FR-21/22. Human review của sinh viên: **pending**.

## Fixture chung

- **Admin:** đăng nhập qua form Admin Login bằng tài khoản SRS §1 một lần cho mỗi browser project. Phiên được lưu bằng `storageState` (localStorage `adminToken`) và dùng lại cho các test.
- **Mã coupon:** mỗi test dùng mã duy nhất `HW4<browser><thời gian><retry>`, viết hoa vì form tự đổi sang chữ hoa. Không dùng mã seed.
- **Dọn dữ liệu:** sau mỗi test, coupon do test tạo được xóa qua `DELETE /api/admin/coupons/:id` bằng token admin. Đây là cleanup, không phải bước được kiểm tra.
- **Kiểm “không tạo bản ghi”:** đọc `GET /api/coupons` bằng token admin, tìm theo mã của test. Ngoài ra kiểm bảng trên UI.

## Mapping HW02 → HW04

18 TC được automate trên chromium, firefox và webkit: 16 lấy từ HW02 và 2 bổ sung ở HW04.

| HW04 ID | HW02 TC | Loại | Dữ liệu (thay đổi so với F) | Expected (SRS) |
|---|---|---|---|---|
| C-AUTO-01 | C-TC-001 | positive / biên | F: percent, d=1, m=0, u=1, 2099-12-31 | Tạo được; hiện trong danh sách với đúng các giá trị; vẫn còn sau reload |
| C-AUTO-02 | C-TC-002 | positive | G: fixed, d=10, m=1, u=2 | Như trên |
| C-AUTO-03 | C-TC-003 | negative | code rỗng | Từ chối (code bắt buộc), không tạo bản ghi |
| C-AUTO-04 | C-TC-005 | negative | discount rỗng | Từ chối (bắt buộc) |
| C-AUTO-05 | C-TC-006 | negative | expiry rỗng | Từ chối (bắt buộc) |
| C-AUTO-06 | C-TC-007 | negative | minimum rỗng | Từ chối (bắt buộc) |
| C-AUTO-07 | C-TC-008 | negative | uses rỗng | Từ chối (bắt buộc) |
| C-AUTO-08 | C-TC-009 | negative | code trùng một coupon test tạo trước | Từ chối; chỉ có 1 coupon mang mã đó |
| C-AUTO-09 | C-TC-011 | negative / biên | discount = −1 | Từ chối (discount phải dương) |
| C-AUTO-10 | C-TC-012 | negative / biên | discount = 0 | Từ chối (0 không dương) |
| C-AUTO-11 | C-TC-013 | negative / biên | minimum = −1 | Từ chối (minimum ≥ 0) |
| C-AUTO-12 | C-TC-014 | negative / biên | uses = 0 | Từ chối (uses ≥ 1) |
| C-AUTO-13 | C-TC-015 | positive | Xóa coupon test vừa tạo | Không còn trong danh sách, kể cả sau reload |
| C-AUTO-14 | C-TC-017 | negative / quyền | Guest mở Admin | Không thấy quản lý coupon (FR-12) |
| C-AUTO-15 | C-TC-018 | negative / quyền | User thường (`test@eshop.com`) đăng nhập Admin | Bị chặn, không vào được quản lý coupon (FR-12) |
| C-AUTO-16 | C-TC-004 / C-TC-010 (phần UI) | edge | Ô “loại” | Chỉ cho chọn `percent` / `fixed`, không có lựa chọn trống hay giá trị khác (FR-17 type percent/fixed) |
| C-AUTO-17 | — (bổ sung HW04) | negative / quyền API | Token user thường gọi `POST /api/admin/coupons` | Bị từ chối, không 2xx, không tạo coupon (FR-12: API có ảnh hưởng dữ liệu tới `/api/coupons` và `/api/admin/*` phải yêu cầu `role = admin`) |
| C-AUTO-18 | C-TC-019 (phần `*`) | GUI | 6 trường bắt buộc | Mỗi trường bắt buộc có dấu `*` cạnh nhãn (FR-22); trang Admin có đúng 1 `h1` (FR-21) |

## TC không automate (lý do)

| HW02 TC / yêu cầu | Lý do |
|---|---|
| C-TC-004 type rỗng / C-TC-010 type `other` (phần server) | Ô chọn chỉ có 2 lựa chọn hợp lệ, UI không cho nhập giá trị rỗng hay `other`. HW02 cấm sửa DOM và cấm thay bằng API. Phần UI đã automate ở C-AUTO-16 |
| C-TC-016 danh sách rỗng | Cần môi trường thật sự không có coupon, mà xóa dữ liệu dùng chung bị cấm. Conditional, không kích hoạt được |
| C-TC-019 phần màu nút, ngôn ngữ, định dạng tiền | Đánh giá màu cần người. Lỗi màu nút “Tạo mã” đã có issue #11 |
| C-TC-020 Tab order | Oracle theo layout, cần người quan sát (giống A/B) |
| “Sửa coupon” (prompt điều phối) | SRS FR-17 chỉ yêu cầu **Thêm / Xem / Xóa**; UI cũng không có chức năng sửa. Không có oracle |
| “Xóa có xác nhận” (prompt điều phối) | SRS không yêu cầu hộp xác nhận, và HW02 C-TC-015 dặn không ép dialog. C-AUTO-13 chỉ kiểm việc xóa đúng mục tiêu |
| “Ngày hết hạn quá khứ / biên” (prompt điều phối) | FR-17 chỉ yêu cầu `expired_at` bắt buộc; không có quy tắc ngày tương lai (HW02 S-FORM). Ngày rỗng đã được kiểm ở C-AUTO-05 |
