<!-- HW04-23120229:HW04-BUG-03 -->
# HW04-BUG-03 — Đăng ký lại được email đã tồn tại → tài khoản trùng email

| Trường | Nội dung |
|---|---|
| Bug ID | HW04-BUG-03 |
| Function | FR-01 Đăng ký tài khoản |
| TC tự động | A-AUTO-14, A-AUTO-17 (fail 3 browser; bị #1 che) + tái hiện độc lập |
| Browser | chromium, firefox, webkit |
| Severity / Priority (đề xuất) | Serious / High |
| Reported by / Date | 23120229 / 2026-11-15 |
| Status | New |

**Môi trường:** EShop `eshop-sut` HEAD `85af3ba`, local Windows 11 (Web :5173, Admin :5174, API :3000), SUT khởi động lại sạch 2026-11-15 19:02 (+07:00); Playwright 1.56.1 — Chromium 1194 / Firefox 1495 / WebKit 2215; code test HW04 `beec3c8`.

## Các bước tái hiện

1. Mở `/register`.
2. Họ tên `Repro Duplicate`, email `test@eshop.com` (tài khoản seed SRS §1), mật khẩu `Aa1 bcdef`.
3. Bấm **Đăng Ký**.
4. Admin → **Người dùng**.

**Expected:** SRS FR-01: email “là duy nhất trong hệ thống” → phải bị từ chối.

**Actual:** `POST /api/register` 200 (id 77); Admin “Người dùng” có 2 dòng `test@eshop.com` (id 2 và id 77).

Ảnh thứ 2 đã ẩn hiển thị (style) các dòng khác cho vừa khung; dữ liệu không bị sửa; ảnh thứ 3 là bảng gốc.

**Xác nhận:** test tự động fail ổn định trên chromium/firefox/webkit ở 2 lần chạy toàn suite (153/153 trạng thái trùng); tái hiện độc lập ngoài suite bằng script Playwright (2026-11-15 19:35 +07:00) + đọc lại API. Bản nháp do AI soạn; sinh viên chưa xác nhận tay.

## Ảnh bằng chứng

![HW04-BUG-03 — sau submit](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/HW04-BUG-03-2-after-submit.png)
![HW04-BUG-03 — 2 user cùng email](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/HW04-BUG-03-4-admin-users-filtered.png)
![HW04-BUG-03 — bảng người dùng gốc](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/HW04-BUG-03-3-admin-users.png)
