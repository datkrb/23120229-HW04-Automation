# B — FR-08: khảo sát DOM thật và locator inventory

Khảo sát ngày 2026-11-15, chỉ đọc. Dùng script `_tools/HW04/survey-fr08.js` trên chromium, firefox và webkit. Script tạo 1 user test qua API cho mỗi browser và đặt 1 đơn khảo sát. Kết quả thô nằm ở [dom-survey-checkout.json](dom-survey-checkout.json). Aria snapshot trang checkout giống nhau trên cả 3 browser. Có đọc thêm code (`Cart.jsx`, `Checkout.jsx`, `CartContext.jsx`, `ProductDetail.jsx`, `Home.jsx`) để tìm control và API. Code **không** dùng làm oracle.

## Quan sát ảnh hưởng tới automation

- **Giỏ chỉ ở state client**, không lưu server hay localStorage, nên `page.goto` hoặc reload làm mất giỏ. Phải điều hướng bằng link “Giỏ hàng” trên header và nút “Tiến hành thanh toán”.
- **Thêm vào giỏ:**
  - Trang chủ: nút “Thêm vào giỏ” trên từng thẻ sản phẩm (thẻ chứa `h2` tên sản phẩm) thêm số lượng 1.
  - Trang chi tiết: ô `Số lượng` (spinbutton, không có label liên kết) và nút “Thêm vào giỏ hàng”. Lần bấm đầu không thêm gì (issue #21 HW03), sau khi thêm thì nút đổi thành “Đã thêm”.
  - Thêm cùng một sản phẩm hai lần tạo ra hai dòng (issue #22).
- **Giỏ:** heading “Giỏ Hàng”, bảng với các dòng `row` (Sản phẩm, Giá, Số lượng, Thành tiền, nút “Xóa”), dòng “Tổng tạm tính: …”, nút “Tiến hành thanh toán”. Guest bấm nút này thì có `alert` “Bạn cần đăng nhập để thanh toán!” rồi chuyển tới `/login`.
- **Giỏ rỗng:** heading “Giỏ hàng của bạn đang trống” và link “Tiếp tục mua sắm”. Không có ảnh hay icon.
- **Checkout:**
  - heading level 2 “Xác Nhận Đơn Hàng”, không có `h1` (`h1Count = 0`);
  - `list` các sản phẩm theo mẫu `tên x qty — thành tiền ₫`;
  - nhãn “Tổng tiền thanh toán (VND):” đi kèm **spinbutton có thể sửa** (`input type=number`, readonly=false), không có label liên kết;
  - phần coupon;
  - dòng “Tổng thanh toán: … ₫”;
  - nút “Xác Nhận Thanh Toán”.
  - Không có ô địa chỉ.
- **Thành công:** heading “Thanh toán thành công!” và nút “Quay lại trang chủ”. **Giỏ vẫn còn dòng cũ** sau khi thanh toán (khảo sát `cartAfterSuccess`; issue #15 HW03).
- **Lỗi checkout:** hiển thị bằng `alert("Lỗi khi thanh toán: …")`.
- **Định dạng số** phụ thuộc locale của browser (`toLocaleString()` không truyền locale). Survey dùng locale mặc định ra `4,000,000`; config dự án đặt `vi-VN`.

## Locator chọn

| Control | Locator |
|---|---|
| Thẻ sản phẩm trang chủ | `main div` lọc theo `has: getByRole('heading', { level: 2, name })`, lấy phần tử `.last()` (thẻ trong cùng) |
| Nút thêm nhanh | `card.getByRole('button', { name: 'Thêm vào giỏ' })` |
| Link xem chi tiết | `card.getByRole('link', { name: 'Xem chi tiết' })` |
| Ô số lượng (chi tiết) | `getByRole('spinbutton')`, chỉ có một ô trên trang |
| Nút thêm (chi tiết) | `getByRole('button', { name: /Thêm vào giỏ hàng\|Đã thêm/ })` |
| Link Giỏ hàng (header) | `getByRole('banner').getByRole('link', { name: 'Giỏ hàng' })` |
| Link EShop (header, về trang chủ) | `getByRole('banner').getByRole('link', { name: 'EShop' })` |
| Dòng giỏ | `getByRole('table').getByRole('row')` lọc theo `hasText: tên` |
| Nút Xóa của dòng | `row.getByRole('button', { name: 'Xóa' })` |
| Nút tiến hành | `getByRole('button', { name: 'Tiến hành thanh toán' })` |
| Heading checkout | `getByRole('heading', { name: 'Xác Nhận Đơn Hàng' })` |
| Danh sách sản phẩm checkout | `main.getByRole('listitem')` |
| Ô tổng (sửa được) | `main.getByRole('spinbutton')` |
| Dòng “Tổng thanh toán” | `getByText(/^Tổng thanh toán:/)` |
| Nút xác nhận | `getByRole('button', { name: 'Xác Nhận Thanh Toán' })` |
| Thành công | `getByRole('heading', { name: 'Thanh toán thành công!' })` |
| Giỏ rỗng | `getByRole('heading', { name: 'Giỏ hàng của bạn đang trống' })` |
| Request checkout | `POST http://localhost:3000/api/checkout` (`page.route` để sửa body ở các case tamper) |
