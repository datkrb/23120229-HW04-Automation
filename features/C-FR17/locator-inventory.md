# C — FR-17: khảo sát DOM thật và locator inventory

Khảo sát ngày 2026-11-15, chỉ đọc. Script `_tools/HW04/survey-fr17.js` chạy trên chromium, firefox và webkit, đăng nhập bằng admin SRS. Kết quả thô nằm ở [dom-survey-coupon.json](dom-survey-coupon.json). Aria snapshot giữa các browser lệch nhỏ ở tên accessible của ô `number`/`date`, nên locator dùng placeholder thay vì role+name.

Có đọc code `frontend-admin/src/App.jsx` và các endpoint coupon trong `backend/server.js`, nhưng chỉ để tìm control và API, không dùng làm oracle.

## Quan sát

### Admin Login
- Heading “Admin Login” là `h2`.
- Hai ô nhập dùng placeholder “Email” và “Password”, nút là “Login”.
- Đăng nhập thành công thì token lưu ở `localStorage.adminToken`.
- Khi tài khoản không phải admin, trang hiện `alert("Bạn không phải là admin!")` và vẫn ở form đăng nhập.

### Sidebar
- `h1` “EShop Admin”.
- Các mục là phần tử `<li>` có onClick, không phải link hay button (issue #34 HW03): Dashboard, Danh mục, Sản phẩm, **Mã Giảm Giá**, Đơn hàng, Người dùng, Đăng xuất. Locator dùng `getByText('Mã Giảm Giá', { exact: true })`.

### Trang coupon
- Heading `h2` “Quản lý Mã Giảm Giá”; form dưới `h3` “Tạo mã giảm giá mới”.
- Form **không có `<label>`**, chỉ có placeholder:

| Trường | Control | Placeholder | Ràng buộc |
|---|---|---|---|
| code | `input` text | “Mã coupon (VD: SAVE10)” | `required`, tự đổi sang chữ hoa |
| type | `select` | — | 2 option: percent “Phần trăm (%)”, fixed “Số tiền cố định (₫)” |
| discount | `number` | “Giá trị % (VD: 10)”; đổi thành “Số tiền (VD: 50000)” khi chọn fixed | `required` |
| minimum | `number` | “Đơn tối thiểu (₫)” | mặc định 0, **không required** |
| expiry | `date` | “Ngày hết hạn” | `required` |
| uses | `number` | “Số lần dùng tối đa/người” | mặc định 1, `min=1`, **không required** |

- Nút “Tạo mã”.
- Bảng: Mã | Loại | Giá trị | Đơn tối thiểu | Hết hạn | Giới hạn/người | Hành động. Cột cuối có nút “Xóa”, **không có hộp xác nhận** trước khi xóa.
- Mọi lỗi được báo bằng `alert("Lỗi: …")`.

### API
| Endpoint | Ghi chú |
|---|---|
| `GET /api/coupons` | cần token |
| `POST /api/admin/coupons` | |
| `DELETE /api/admin/coupons/:id` | |

## Locator chọn

| Control | Locator |
|---|---|
| Form login | `getByPlaceholder('Email')`, `getByPlaceholder('Password')`, `getByRole('button', { name: 'Login' })` |
| Đã vào admin | `getByRole('heading', { level: 1, name: 'EShop Admin' })` |
| Mục coupon | `getByText('Mã Giảm Giá', { exact: true })` |
| Heading trang | `getByRole('heading', { name: 'Quản lý Mã Giảm Giá' })` |
| Form | `heading('Tạo mã giảm giá mới').locator('..')` (thẻ `form`) |
| Ô nhập | `form.getByPlaceholder(...)` như bảng trên; loại: `form.getByRole('combobox')` |
| Nút tạo | `form.getByRole('button', { name: 'Tạo mã' })` |
| Dòng coupon | `getByRole('row').filter({ has: getByRole('cell', { name: code, exact: true }) })` |
| Nút xóa | `row.getByRole('button', { name: 'Xóa' })` |
