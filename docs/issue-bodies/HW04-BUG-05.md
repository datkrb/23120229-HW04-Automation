<!-- HW04-23120229:HW04-BUG-05 -->
# HW04-BUG-05 — API tạo coupon cho phép user thường (không kiểm role = admin)

| Trường | Nội dung |
|---|---|
| Bug ID | HW04-BUG-05 |
| Function | FR-12 Kiểm soát truy cập / FR-17 |
| TC tự động | C-AUTO-17 (fail 3 browser × 2 lần) |
| Browser | chromium, firefox, webkit |
| Severity / Priority (đề xuất) | Serious / High |
| Reported by / Date | 23120229 / 2026-11-15 |
| Status | New |

**Môi trường:** EShop `eshop-sut` HEAD `85af3ba`, local Windows 11 (Web :5173, Admin :5174, API :3000), SUT khởi động lại sạch 2026-11-15 19:02 (+07:00); Playwright 1.56.1 — Chromium 1194 / Firefox 1495 / WebKit 2215; code test HW04 `beec3c8`.

## Các bước tái hiện

1. `POST /api/login` với `test@eshop.com` (role `user`) lấy token.
2. `POST /api/admin/coupons` với `Authorization: Bearer <token user>`, body `{code, type:"percent", discount_value:1, min_order_amount:0, expired_at:"2099-12-31", max_uses_per_user:1}`.
3. Admin → **Mã Giảm Giá**.

**Expected:** SRS FR-12: API `/api/admin/*` và API ảnh hưởng dữ liệu `/api/coupons` phải yêu cầu token hợp lệ **và** `role = 'admin'` → phải bị từ chối.

**Actual:** HTTP 200 `{"message":"Coupon created"}`; coupon hiện trong danh sách quản trị.

UI Admin có chặn user thường (C-AUTO-15 pass) nhưng backend không. Coupon tái hiện đã được xóa sau khi chụp.

**Xác nhận:** test tự động fail ổn định trên chromium/firefox/webkit ở 2 lần chạy toàn suite (153/153 trạng thái trùng); tái hiện độc lập ngoài suite bằng script Playwright (2026-11-15 19:35 +07:00) + đọc lại API. Bản nháp do AI soạn; sinh viên chưa xác nhận tay.

## Ảnh bằng chứng

![HW04-BUG-05 — coupon do user thường tạo (dòng HW4REPRO05…)](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/HW04-BUG-05-1-admin-list-shows-user-created-coupon.png)
