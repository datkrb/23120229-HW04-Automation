# Test run summary

Generated: 2026-11-15T18:30:25+07:00

| Run | Run by | Started (report) | Total | Passed | Failed | Flaky | Skipped | Report |
|---|---|---|---|---|---|---|---|---|
| fr08draft-chromium | 23120229 | 2026-11-15T18:24:02+07:00 | 13 | 5 | 8 | 0 | 0 | `reports/_scratch/fr08-draft/fr08draft-chromium/index.html` |
| fr08draft-firefox | 23120229 | 2026-11-15T18:25:53+07:00 | 13 | 5 | 8 | 0 | 0 | `reports/_scratch/fr08-draft/fr08draft-firefox/index.html` |
| fr08draft-webkit | 23120229 | 2026-11-15T18:28:27+07:00 | 13 | 5 | 8 | 0 | 0 | `reports/_scratch/fr08-draft/fr08draft-webkit/index.html` |
| **Total (3 runs)** | | | **39** | **15** | **24** | **0** | **0** | |

## fr08draft

| Test | chromium | firefox | webkit |
|---|---|---|---|
| FR-08 Checkout › B-AUTO-01 Guest có giỏ P×1 không thanh toán được | pass | pass | pass |
| FR-08 Checkout › B-AUTO-02 Một dòng P×1: danh sách, tổng tự tính, thanh toán, đơn lưu đúng tổng | pass | pass | pass |
| FR-08 Checkout › B-AUTO-03 Nhiều dòng P×2 + Q×1: tổng đúng và giỏ được xóa sau thành công | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-04 Giỏ cập nhật từ P×1 thành P×2 → checkout dùng giỏ mới | FAIL (timedOut) | FAIL (timedOut) | FAIL (timedOut) |
| FR-08 Checkout › B-AUTO-05 Tổng tiền không cho người dùng sửa trực tiếp | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-06 Client gửi total_amount = 1 → đơn không lưu 1 | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-07 Client gửi total_amount cao hơn giỏ → đơn không lưu giá trị client | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-08 Trang checkout: đúng 1 h1, tổng hiển thị có ₫ và phân cách hàng nghìn | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-09 Giỏ rỗng: thông báo trống, không có nút tiến hành thanh toán | pass | pass | pass |
| FR-08 Checkout › B-AUTO-10 Một dòng số lượng 3 (P×3): tổng = 3 × giá | FAIL (timedOut) | FAIL (timedOut) | FAIL (timedOut) |
| FR-08 Checkout › B-AUTO-11 Ba sản phẩm khác nhau: checkout liệt kê đủ 3 dòng | pass | pass | pass |
| FR-08 Checkout › B-AUTO-12 Client gửi total_amount âm → đơn không lưu giá trị âm | FAIL (failed) | FAIL (failed) | FAIL (failed) |
| FR-08 Checkout › B-AUTO-13 POST /api/checkout không có token bị từ chối | pass | pass | pass |

