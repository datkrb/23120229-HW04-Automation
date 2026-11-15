<!-- HW04-23120229:HW04-BUG-04 -->
# HW04-BUG-04 — Tạo coupon khi để trống “Số lần dùng tối đa/người” (tự gán 1)

| Trường | Nội dung |
|---|---|
| Bug ID | HW04-BUG-04 |
| Function | FR-17 Quản lý mã giảm giá |
| TC tự động | C-AUTO-07 (fail 3 browser × 2 lần) |
| Browser | chromium, firefox, webkit |
| Severity / Priority (đề xuất) | Medium / Low |
| Reported by / Date | 23120229 / 2026-11-15 |
| Status | New |

**Môi trường:** EShop `eshop-sut` HEAD `85af3ba`, local Windows 11 (Web :5173, Admin :5174, API :3000), SUT khởi động lại sạch 2026-11-15 19:02 (+07:00); Playwright 1.56.1 — Chromium 1194 / Firefox 1495 / WebKit 2215; code test HW04 `beec3c8`.

## Các bước tái hiện

1. Admin → **Mã Giảm Giá**.
2. Mã mới, Phần trăm, giá trị 1, ngày 2099-12-31, **xóa trống** “Số lần dùng tối đa/người”.
3. Bấm **Tạo mã**.

**Expected:** SRS FR-17: trường bắt buộc `max_uses_per_user` (>= 1) → bỏ trống phải bị từ chối.

**Actual:** `POST /api/admin/coupons` 200; coupon lưu `max_uses_per_user = 1`, bảng hiện “1 lần”.

Khác #8 (trường “Đơn tối thiểu”).

**Xác nhận:** test tự động fail ổn định trên chromium/firefox/webkit ở 2 lần chạy toàn suite (153/153 trạng thái trùng); tái hiện độc lập ngoài suite bằng script Playwright (2026-11-15 19:35 +07:00) + đọc lại API. Bản nháp do AI soạn; sinh viên chưa xác nhận tay.

## Ảnh bằng chứng

![HW04-BUG-04 — trước submit](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/HW04-BUG-04-1-before-submit.png)
![HW04-BUG-04 — sau submit](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/HW04-BUG-04-2-after-submit.png)
![HW04-BUG-04 — C-AUTO-07 chromium](https://raw.githubusercontent.com/datkrb/SUT_Issue/79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8/evidence/HW04_23120229/suite-C-AUTO-07-chromium.png)
