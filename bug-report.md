# HW04 — Bug report (Automation Testing, 23120229)

Bug report này theo mục “Bug Report Essentials” của slide S08 (tr.5–12): Bug ID, Function, Summary, How to reproduce, Reported by, Date, Assign to, Status, Priority, Severity.

- Thang **Severity** theo S08: Fatal / Serious / Medium / Cosmetic. Thang **Priority**: Immediate / High / Medium / Low.
- Mức độ trong bảng là **đề xuất của AI**; sinh viên xác nhận khi review.

## Môi trường

| Thành phần | Giá trị |
|---|---|
| SUT | EShop (`eshop-sut`) HEAD `85af3ba`, chạy local trên Windows 11: Web `http://localhost:5173`, Admin `:5174`, API `:3000` |
| Trạng thái dữ liệu | Khởi động lại sạch 2026-11-15 19:02 (+07:00), backend seed lại |
| Công cụ | Playwright 1.56.1 với Chromium 1194 / Firefox 1495 / WebKit 2215 |
| Code test | HW04 `beec3c8` |

- **Reported by:** 23120229 (bản nháp do AI chat B soạn).
- **Date:** 2026-11-15.
- **Assign to:** chưa phân công (repo SUT của giảng viên).
- **Status:** New.

## Cách xác nhận bug

1. **Suite tự động.** Test fail ổn định trên cả 3 browser, lặp lại ở 2 lần chạy toàn suite (153/153 trạng thái trùng nhau, xem `test-summary.md` §4).
2. **Tái hiện độc lập ngoài suite.** Script `_tools/HW04/repro_p05.js` chạy ngày 2026-11-15 lúc 19:35 (+07:00). Script thao tác UI từng bước trên chromium, chụp ảnh trước và sau, rồi đọc lại dữ liệu qua API. Kết quả nằm ở `evidence/bugs/repro/repro-p05-results.json`.
3. Với các bug đã có issue từ HW02/HW03: đối chiếu với nội dung issue công khai.

**Giới hạn:** xác nhận do AI thực hiện bằng script. **Chưa có xác nhận thao tác tay của sinh viên**; mục này cần sinh viên tự làm khi review.

Riêng ảnh `HW04-BUG-03-4` đã ẩn **hiển thị** các dòng không liên quan bằng `style.display` để vừa khung hình. Dữ liệu không bị sửa; ảnh `HW04-BUG-03-3` là bảng gốc chưa lọc.

## A. Bug mới (đăng issue mới)

### HW04-BUG-01 — Đăng ký chấp nhận mật khẩu không có ký tự đặc biệt thuộc tập SRS (dùng dấu cách)

| Trường | Nội dung |
|---|---|
| Function | FR-01 Đăng ký tài khoản (Web) |
| TC tự động | A-AUTO-20; fail trên chromium, firefox, webkit (2/2 lần chạy) |
| Severity / Priority | Medium / Medium |
| Expected (SRS FR-01) | “Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt (`@`, `$`, `!`, `%`, `*`, `?`, `&`)”. Mật khẩu `Aa1 bcdefg` không có ký tự nào trong tập này nên phải bị từ chối |
| Actual | Đăng ký thành công: `POST /api/register` trả 200 (“User registered successfully”, id 75), trang chuyển tới `/login` |

Các bước tái hiện:
1. Mở `http://localhost:5173/register`.
2. Họ tên `Repro User`, email mới (ví dụ `repro01-…@domain.com`), mật khẩu `Aa1 bcdefg`.
3. Bấm “Đăng Ký”.

Bằng chứng:
- Ảnh tái hiện: `evidence/bugs/repro/HW04-BUG-01-1-before-submit.png`, `…-2-after-submit.png`.
- Ảnh từ suite: `evidence/bugs/attachments/A-AUTO-20-{chromium,firefox,webkit}.png`.

Liên quan: cùng bộ kiểm mật khẩu với #1. #1 nói chiều “từ chối mật khẩu hợp lệ”; bug này là chiều ngược lại, “chấp nhận mật khẩu không hợp lệ”.

### HW04-BUG-02 — Đăng ký chấp nhận email sai định dạng (thiếu `@`)

| Trường | Nội dung |
|---|---|
| Function | FR-01 |
| TC tự động | A-AUTO-13 fail trên 3 browser. Tuy nhiên trong suite, lỗi bị che bởi #1: thông báo hiện ra là về mật khẩu. Lỗi email được cô lập bằng bước tái hiện độc lập |
| Severity / Priority | Medium / Medium |
| Expected (SRS FR-01) | “Email phải có định dạng hợp lệ (`user@domain.com`)”, nên email `repro02-…domain.com` phải bị từ chối |
| Actual | `POST /api/register` trả 200 (id 76), trang chuyển tới `/login`; tài khoản với email sai được lưu |

Các bước tái hiện:
1. Mở `/register`.
2. Email `repro02-<số>domain.com` (không có `@`), mật khẩu `Aa1 bcdef`. Mật khẩu này được chọn để vượt qua bộ kiểm mật khẩu đang lỗi; đây là kỹ thuật cô lập lỗi, không phải oracle.
3. Bấm “Đăng Ký”.

Bằng chứng:
- `evidence/bugs/repro/HW04-BUG-02-1-before-submit.png`, `…-2-after-submit.png`.
- Ô email là `type="text"` (đã nêu trong #2), nên trình duyệt cũng không chặn.

### HW04-BUG-03 — Đăng ký lại được email đã tồn tại, tạo tài khoản trùng email

| Trường | Nội dung |
|---|---|
| Function | FR-01 |
| TC tự động | A-AUTO-14 / A-AUTO-17 fail trên 3 browser (bị #1 che); cô lập bằng bước tái hiện độc lập |
| Severity / Priority | Serious / High (toàn vẹn dữ liệu tài khoản; hai user cùng email) |
| Expected (SRS FR-01) | “Email … là duy nhất trong hệ thống”, nên `test@eshop.com` (tài khoản seed SRS §1) phải bị từ chối |
| Actual | `POST /api/register` trả 200 (id 77). Trang Admin “Người dùng” có **2 dòng** `test@eshop.com` (id 2 và id 77) |

Các bước tái hiện:
1. Mở `/register`.
2. Họ tên `Repro Duplicate`, email `test@eshop.com`, mật khẩu `Aa1 bcdef`.
3. Bấm “Đăng Ký”.
4. Đăng nhập Admin, mở “Người dùng”.

Bằng chứng: `evidence/bugs/repro/HW04-BUG-03-2-after-submit.png`, `…-3-admin-users.png`, `…-4-admin-users-filtered.png`.

### HW04-BUG-04 — Tạo coupon khi để trống “Số lần dùng tối đa/người”; hệ thống tự gán 1

| Trường | Nội dung |
|---|---|
| Function | FR-17 Quản lý mã giảm giá (Admin) |
| TC tự động | C-AUTO-07 fail trên 3 browser (2/2 lần) |
| Severity / Priority | Medium / Low |
| Expected (SRS FR-17) | “Các trường bắt buộc: … `max_uses_per_user` (>= 1)”. Bỏ trống thì phải bị từ chối |
| Actual | `POST /api/admin/coupons` trả 200; coupon được lưu với `max_uses_per_user = 1` và bảng hiển thị “1 lần” |

Các bước tái hiện:
1. Admin → “Mã Giảm Giá”.
2. Mã mới, loại Phần trăm, giá trị 1, ngày 2099-12-31, **xóa trống** ô “Số lần dùng tối đa/người”.
3. Bấm “Tạo mã”.

Bằng chứng: `evidence/bugs/repro/HW04-BUG-04-1-before-submit.png`, `…-2-after-submit.png`; `evidence/bugs/attachments/C-AUTO-07-*.png`.

Phân biệt với #8: #8 chỉ nói về trường “Đơn tối thiểu”.

### HW04-BUG-05 — API tạo coupon cho phép user thường (không kiểm `role = admin`)

| Trường | Nội dung |
|---|---|
| Function | FR-12 Kiểm soát truy cập / FR-17 |
| TC tự động | C-AUTO-17 fail trên 3 browser (2/2 lần) |
| Severity / Priority | Serious / High (leo thang quyền: user thường thay đổi dữ liệu quản trị) |
| Expected (SRS FR-12) | “Tất cả các API Admin (`/api/admin/*`) và các API có tính ảnh hưởng dữ liệu (… `/api/coupons`) đều phải yêu cầu: 1. Token JWT hợp lệ. 2. `role = 'admin'` trong Token.” Request bằng token user thường phải bị từ chối |
| Actual | HTTP 200 `{"message":"Coupon created","id":66}`. Coupon hiện trong danh sách quản trị |

Các bước tái hiện:
1. `POST /api/login` với `test@eshop.com` / `Test1234!` (role `user`) để lấy token.
2. `POST /api/admin/coupons` với `Authorization: Bearer <token user>`, body `{code, type:"percent", discount_value:1, min_order_amount:0, expired_at:"2099-12-31", max_uses_per_user:1}`.
3. Đăng nhập Admin, mở “Mã Giảm Giá”.

Bằng chứng: `evidence/bugs/repro/HW04-BUG-05-1-admin-list-shows-user-created-coupon.png` (dòng `HW4REPRO05…`); thông điệp assertion C-AUTO-17 trong `automation/reports/fr17-*/index.html`.

Ghi chú: UI Admin có chặn user thường (C-AUTO-15 pass), nhưng backend thì không. Coupon tái hiện đã được xóa sau khi chụp ảnh.

## B. Bug đã có issue (HW02/HW03), HW04 tái hiện bằng automation, comment bằng chứng vào issue cũ

| HW04 ID | Issue cũ | Tóm tắt | TC tự động (fail 3 browser × 2 lần) | Ảnh |
|---|---|---|---|---|
| HW04-DUP-01 | #1 | Mật khẩu hợp lệ FR-01 bị từ chối | A-AUTO-01/02/03/18 (che cả 13/14/17) | `attachments/A-AUTO-01-*.png` |
| HW04-DUP-02 | #2 | Thiếu ô xác nhận mật khẩu; nhãn không có `*`; email `type=text`; không có `h1` | A-AUTO-15/16/19 | `attachments/A-AUTO-15-*.png`, `A-AUTO-19-*.png` |
| HW04-DUP-03 | #4 | Tổng tiền checkout sửa được | B-AUTO-05 | `attachments/B-AUTO-05-*.png` |
| HW04-DUP-04 | #5 | Backend lưu `total_amount` do client gửi; HW04 bổ sung trường hợp **tổng âm −100000** | B-AUTO-06/07/12 | `attachments/B-AUTO-06-*.png`, `B-AUTO-12-*.png` |
| HW04-DUP-05 | #6 | Trang checkout không có `h1` | B-AUTO-08 | `attachments/B-AUTO-08-*.png` |
| HW04-DUP-06 | #15 | Giỏ không xóa sau thanh toán thành công | B-AUTO-03 | `attachments/B-AUTO-03-*.png` |
| HW04-DUP-07 | #8 | Coupon tạo được khi “Đơn tối thiểu” rỗng | C-AUTO-06 | `attachments/C-AUTO-06-*.png` |
| HW04-DUP-08 | #9 | Discount −1 và 0 được chấp nhận | C-AUTO-09/10 | `attachments/C-AUTO-09-*.png`, `C-AUTO-10-*.png` |
| HW04-DUP-09 | #10 | Minimum −1 được chấp nhận | C-AUTO-11 | `attachments/C-AUTO-11-*.png` |
| HW04-DUP-10 | #11 | 6 trường coupon không có nhãn hay `*` | C-AUTO-18 | `attachments/C-AUTO-18-*.png` |

Quyết định: không tạo issue trùng. Mỗi issue cũ nhận một comment `[HW04 23120229]` gồm TC tự động, browser, report và ảnh.

## Thống kê (theo S08 “Statistics by defect type”)

| | Fatal | Serious | Medium | Cosmetic | Tổng |
|---|---|---|---|---|---|
| Bug mới HW04 | 0 | 2 (BUG-03, BUG-05) | 3 (BUG-01, 02, 04) | 0 | 5 |
| Bug đã có, được automation tái hiện | — | — | — | — | 10 (comment) |

Tổng có 15 bug được suite phát hiện hoặc tái hiện: 5 mới và 10 đã có issue.
