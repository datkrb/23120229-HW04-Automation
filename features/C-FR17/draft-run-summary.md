# Test run summary

Generated: 2026-11-15T18:51:27+07:00

| Run | Run by | Started (report) | Total | Passed | Failed | Flaky | Skipped | Report |
|---|---|---|---|---|---|---|---|---|
| fr17draft-chromium | 23120229 | 2026-11-15T18:44:24+07:00 | 18 | 10 | 8 | 0 | 0 | `reports/_scratch/fr17-draft/fr17draft-chromium/index.html` |
| fr17draft-firefox | 23120229 | 2026-11-15T18:46:13+07:00 | 18 | 10 | 8 | 0 | 0 | `reports/_scratch/fr17-draft/fr17draft-firefox/index.html` |
| fr17draft-webkit | 23120229 | 2026-11-15T18:49:20+07:00 | 18 | 10 | 8 | 0 | 0 | `reports/_scratch/fr17-draft/fr17draft-webkit/index.html` |
| **Total (3 runs)** | | | **54** | **30** | **24** | **0** | **0** | |

## fr17draft

| Test | chromium | firefox | webkit |
|---|---|---|---|
| FR-17 Quản lý mã giảm giá › C-AUTO-01 Tạo coupon percent hợp lệ (d=1, m=0, u=1) và xem trong danh sách | pass | pass | pass |
| FR-17 Quản lý mã giảm giá › C-AUTO-02 Tạo coupon fixed hợp lệ (d=10, m=1, u=2) và xem trong danh sách | FAIL (timedOut) | FAIL (timedOut) | FAIL (timedOut) |
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

