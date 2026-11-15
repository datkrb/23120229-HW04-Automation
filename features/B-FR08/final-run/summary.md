# Test run summary

Generated: 2026-11-15T18:38:14+07:00

| Run | Run by | Started (report) | Total | Passed | Failed | Flaky | Skipped | Report |
|---|---|---|---|---|---|---|---|---|
| fr08-chromium | 23120229 | 2026-11-15T18:33:32+07:00 | 13 | 7 | 6 | 0 | 0 | `reports/fr08-chromium/index.html` |
| fr08-firefox | 23120229 | 2026-11-15T18:34:54+07:00 | 13 | 7 | 6 | 0 | 0 | `reports/fr08-firefox/index.html` |
| fr08-webkit | 23120229 | 2026-11-15T18:37:01+07:00 | 13 | 7 | 6 | 0 | 0 | `reports/fr08-webkit/index.html` |
| **Total (3 runs)** | | | **39** | **21** | **18** | **0** | **0** | |

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

