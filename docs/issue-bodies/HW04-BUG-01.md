<!-- HW04-23120229:HW04-BUG-01 -->
# HW04-BUG-01 — Đăng ký chấp nhận mật khẩu không có ký tự đặc biệt thuộc tập SRS (dùng dấu cách)

| Trường | Nội dung |
|---|---|
| Bug ID | HW04-BUG-01 |
| Function | FR-01 Đăng ký tài khoản |
| TC tự động | A-AUTO-20 (fail 3 browser × 2 lần) |
| Browser | chromium, firefox, webkit |
| Severity / Priority (đề xuất) | Medium / Medium |
| Reported by / Date | 23120229 / 2026-11-15 |
| Status | New |

**Môi trường:** EShop `eshop-sut` HEAD `85af3ba`, local Windows 11 (Web :5173, Admin :5174, API :3000), SUT khởi động lại sạch 2026-11-15 19:02 (+07:00); Playwright 1.56.1 — Chromium 1194 / Firefox 1495 / WebKit 2215; code test HW04 `beec3c8`.

## Các bước tái hiện

1. Mở `http://localhost:5173/register`.
2. Họ tên `Repro User`, email mới, mật khẩu `Aa1 bcdefg`.
3. Bấm **Đăng Ký**.

**Expected:** SRS FR-01: “ít nhất … 1 ký tự đặc biệt (`@`, `$`, `!`, `%`, `*`, `?`, `&`)” → `Aa1 bcdefg` (không có ký tự nào trong tập) phải bị từ chối.

**Actual:** `POST /api/register` 200 “User registered successfully”; chuyển tới `/login`.

Liên quan #1 (cùng bộ kiểm mật khẩu, chiều ngược lại: chấp nhận mật khẩu không hợp lệ).

**Xác nhận:** test tự động fail ổn định trên chromium/firefox/webkit ở 2 lần chạy toàn suite (153/153 trạng thái trùng); tái hiện độc lập ngoài suite bằng script Playwright (2026-11-15 19:35 +07:00) + đọc lại API. Bản nháp do AI soạn; sinh viên chưa xác nhận tay.

## Ảnh bằng chứng

![HW04-BUG-01 — trước submit](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/HW04-BUG-01-1-before-submit.png)
![HW04-BUG-01 — sau submit: trang Đăng nhập](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/HW04-BUG-01-2-after-submit.png)
![HW04-BUG-01 — A-AUTO-20 chromium](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/suite-A-AUTO-20-chromium.png)
