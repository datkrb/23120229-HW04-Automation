# Test run summary

Generated: 2026-11-15T19:18:16+07:00

| Run | Run by | Started (report) | Total | Passed | Failed | Flaky | Skipped | Report |
|---|---|---|---|---|---|---|---|---|
| fr01-chromium | 23120229 | 2026-11-15T19:02:25+07:00 | 20 | 9 | 11 | 0 | 0 | `reports/fr01-chromium/index.html` |
| fr01-firefox | 23120229 | 2026-11-15T19:04:28+07:00 | 20 | 9 | 11 | 0 | 0 | `reports/fr01-firefox/index.html` |
| fr01-webkit | 23120229 | 2026-11-15T19:07:43+07:00 | 20 | 9 | 11 | 0 | 0 | `reports/fr01-webkit/index.html` |
| fr08-chromium | 23120229 | 2026-11-15T19:09:59+07:00 | 13 | 7 | 6 | 0 | 0 | `reports/fr08-chromium/index.html` |
| fr08-firefox | 23120229 | 2026-11-15T19:10:56+07:00 | 13 | 7 | 6 | 0 | 0 | `reports/fr08-firefox/index.html` |
| fr08-webkit | 23120229 | 2026-11-15T19:12:38+07:00 | 13 | 7 | 6 | 0 | 0 | `reports/fr08-webkit/index.html` |
| fr17-chromium | 23120229 | 2026-11-15T19:13:54+07:00 | 18 | 11 | 7 | 0 | 0 | `reports/fr17-chromium/index.html` |
| fr17-firefox | 23120229 | 2026-11-15T19:14:50+07:00 | 18 | 11 | 7 | 0 | 0 | `reports/fr17-firefox/index.html` |
| fr17-webkit | 23120229 | 2026-11-15T19:17:03+07:00 | 18 | 11 | 7 | 0 | 0 | `reports/fr17-webkit/index.html` |
| **Total (9 runs)** | | | **153** | **81** | **72** | **0** | **0** | |

## fr01

| Test | chromium | firefox | webkit |
|---|---|---|---|
| FR-01 Đăng ký tài khoản › A-AUTO-01 Mật khẩu dài 8, mỗi nhóm 2 ký tự → đăng ký thành công | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-02 Mật khẩu dài 9, mỗi nhóm sát cận dưới → đăng ký thành công | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-03 Mật khẩu có đúng 1 chữ thường → đăng ký thành công | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-04 Mật khẩu dài 7 đủ 4 nhóm → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-05 Mật khẩu không có chữ hoa → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-06 Mật khẩu không có chữ thường → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-07 Mật khẩu không có chữ số → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-08 Mật khẩu không có ký tự đặc biệt → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-09 Ký tự đặc biệt ngoài tập (#) → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-10 Mật khẩu và xác nhận để trống → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-11 Họ tên để trống → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-12 Email để trống → từ chối | pass | pass | pass |
| FR-01 Đăng ký tài khoản › A-AUTO-13 Email thiếu @ → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-14 Email đã tồn tại (test@eshop.com) → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-15 Xác nhận mật khẩu khác mật khẩu → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-16 Xác nhận mật khẩu để trống → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-17 Email trùng và xác nhận lệch → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-18 Đăng ký email mới thành công rồi đăng ký lại cùng email → lần 2 bị từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-20 Dấu cách thay cho ký tự đặc biệt → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-01 Đăng ký tài khoản › A-AUTO-19 Cấu trúc form: có ô xác nhận, type email/password, nhãn bắt buộc có *, đúng 1 h1 | FAIL (failed) | FAIL (failed) | FAIL (failed) |

## fr08

| Test | chromium | firefox | webkit |
|---|---|---|---|
| FR-08 Checkout › B-AUTO-01 Guest có giỏ P×1 không thanh toán được | pass | pass | pass |
| FR-08 Checkout › B-AUTO-02 Một dòng P×1: danh sách, tổng tự tính, thanh toán, đơn lưu đúng tổng | pass | pass | pass |
| FR-08 Checkout › B-AUTO-03 Nhiều dòng P×2 + Q×1: tổng đúng và giỏ được xóa sau thành công | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-04 Giỏ cập nhật từ P×1 thành P×2 → checkout dùng giỏ mới | pass | pass | pass |
| FR-08 Checkout › B-AUTO-05 Tổng tiền không cho người dùng sửa trực tiếp | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-06 Client gửi total_amount = 1 → đơn không lưu 1 | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-07 Client gửi total_amount cao hơn giỏ → đơn không lưu giá trị client | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-08 Trang checkout: đúng 1 h1, tổng hiển thị có ₫ và phân cách hàng nghìn | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-09 Giỏ rỗng: thông báo trống, không có nút tiến hành thanh toán | pass | pass | pass |
| FR-08 Checkout › B-AUTO-10 Một dòng số lượng 3 (P×3): tổng = 3 × giá | pass | pass | pass |
| FR-08 Checkout › B-AUTO-11 Ba sản phẩm khác nhau: checkout liệt kê đủ 3 dòng | pass | pass | pass |
| FR-08 Checkout › B-AUTO-12 Client gửi total_amount âm → đơn không lưu giá trị âm | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-13 POST /api/checkout không có token bị từ chối | pass | pass | pass |

## fr17

| Test | chromium | firefox | webkit |
|---|---|---|---|
| FR-17 Quản lý mã giảm giá › C-AUTO-01 Tạo coupon percent hợp lệ (d=1, m=0, u=1) và xem trong danh sách | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-02 Tạo coupon fixed hợp lệ (d=10, m=1, u=2) và xem trong danh sách | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-03 Mã coupon để trống → từ chối | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-04 Giá trị giảm để trống → từ chối | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-05 Ngày hết hạn để trống → từ chối | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-06 Đơn tối thiểu để trống → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-17 Quản lý mã giảm giá › C-AUTO-07 Số lần dùng/người để trống → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-17 Quản lý mã giảm giá › C-AUTO-08 Mã trùng với coupon đã tồn tại → từ chối, chỉ còn 1 bản ghi | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-09 Giá trị giảm âm (-1) → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-17 Quản lý mã giảm giá › C-AUTO-10 Giá trị giảm bằng 0 → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-17 Quản lý mã giảm giá › C-AUTO-11 Đơn tối thiểu âm (-1) → từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-17 Quản lý mã giảm giá › C-AUTO-12 Số lần dùng/người = 0 → từ chối | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-13 Xóa coupon của chính test → không còn trong danh sách | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-14 Guest không vào được quản lý coupon | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-15 User thường (test@eshop.com) không vào được quản lý coupon | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-16 Ô loại chỉ cho chọn percent / fixed | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-17 API: token user thường tạo coupon → bị từ chối | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-17 Quản lý mã giảm giá › C-AUTO-18 Form có dấu * cho 6 trường bắt buộc, trang có đúng 1 h1 | FAIL (failed) | FAIL (failed) | FAIL (failed) |

