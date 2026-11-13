# A — FR-01: khảo sát DOM thật và locator inventory

Thời gian khảo sát: 2026-11-13, P02. Phạm vi: chỉ đọc DOM, không sửa trang.

Nguồn:
- Script `_tools/HW04/survey-dom.js` mở `http://localhost:5173/register` trên chromium, firefox và webkit. Kết quả thô lưu ở [dom-survey-register.json](dom-survey-register.json), gồm aria snapshot và thuộc tính control. Aria snapshot của cả 3 browser giống nhau.
- Có đọc thêm `frontend-web/src/pages/Register.jsx` để tìm locator. Code chỉ dùng để tìm control, **không** dùng làm oracle.

## Aria snapshot (main)

```yaml
- heading "Đăng Ký Tài Khoản" [level=2]
- text: Họ Tên
- textbox
- text: Email
- textbox
- text: Mật khẩu
- textbox
- paragraph: "Yêu cầu: Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt."
- button "Đăng Ký"
- link "Đăng nhập"
```

## Quan sát ảnh hưởng tới locator

- Các `<label>` không có `for` và input không có `id`, `name` hay `aria-label`. Vì vậy `getByLabel` **không** tìm được input (khớp issue #29 HW03). Cả 3 textbox đều không có tên truy cập.
- Không có `placeholder` hay `data-testid`.
- **Không có ô Xác nhận mật khẩu.** Chỉ có 3 input. Điều này trái FR-01 và đã có issue #2 từ HW02.
- Email dùng `type="text"`, không phải `type="email"` như FR-22 yêu cầu. Cả 3 input có `required`.
- Trang dùng `h2` làm tiêu đề. Ở `<main>` không có `h1`; cần đếm `h1` toàn trang để kết luận cho FR-21.
- Banner lỗi là một `div` không có role (không phải `alert` hay `status`). Banner nằm ngay trước `<form>` trong card.
- Nút submit có role button, tên “Đăng Ký”, `type=submit`.

## Locator chọn (ưu tiên role → label → text → cấu trúc)

| Control | Locator | Ghi chú rủi ro |
|---|---|---|
| Tiêu đề form | `getByRole('heading', { name: 'Đăng Ký Tài Khoản' })` | ổn định |
| Card form | `heading.locator('..')` | phụ thuộc cấu trúc 1 cấp |
| Ô Họ Tên / Email / Mật khẩu | `form.locator('div').filter({ has: page.locator('label', { hasText: /^Họ Tên/ }) }).locator('input')`, tương tự cho Email và Mật khẩu | không có label liên kết; neo bằng text nhãn trong cùng `div` (chịu được dấu `*` thêm sau) |
| Ô Xác nhận mật khẩu | cùng kiểu, nhãn `/Xác nhận mật khẩu/i` | hiện **không tồn tại** |
| Nút Đăng Ký | `getByRole('button', { name: 'Đăng Ký' })` | ổn định |
| Banner lỗi app | `card.locator(':scope > div')`, tức div con trực tiếp của card, không phải form | không có role; nên đề xuất SUT thêm `role="alert"` |
| Trang Đăng nhập (sau OK) | URL `/login` và heading của trang Login | FR-01 chỉ nói “chuyển tới trang Đăng nhập” |
| Response đăng ký | `page.waitForResponse(r => r.url().endsWith('/api/register') && r.request().method() === 'POST')` | oracle backend cho OK |
