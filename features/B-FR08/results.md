# B — FR-08 Checkout: kết quả chạy bản cuối và bug candidates

Lần chạy cuối: 2026-11-15, code HW04 `c1888f8`, SUT HEAD `85af3ba`. Lệnh: `run-matrix.mjs --feature fr08=tests/fr08-checkout.spec.ts` (workers 1, retries 0). Kết quả do AI (chat B) phân loại; **sinh viên chưa review**.

## 1. Tổng hợp

| Run | Report | Bắt đầu (ISO) | Total | Pass | Fail | Flaky | Skipped |
|---|---|---|---|---|---|---|---|
| fr08-chromium | `automation/reports/fr08-chromium/index.html` | 2026-11-15T18:33:32+07:00 | 13 | 7 | 6 | 0 | 0 |
| fr08-firefox | `automation/reports/fr08-firefox/index.html` | 2026-11-15T18:34:54+07:00 | 13 | 7 | 6 | 0 | 0 |
| fr08-webkit | `automation/reports/fr08-webkit/index.html` | 2026-11-15T18:37:01+07:00 | 13 | 7 | 6 | 0 | 0 |
| **Tổng** | 3 browser run | | **39** | **21** | **18** | 0 | 0 |

- `verify-report.mjs` cho kết quả 3/3 report có “Run by: 23120229” + ISO. Ảnh chụp ở `evidence/report-shots/`.
- Summary máy sinh: [final-run/summary.md](final-run/summary.md).
- Kết quả giống hệt nhau trên 3 browser, không có flaky.
- Fixture workaround (#21, lần bấm đầu ở trang chi tiết bị bỏ qua) được ghi annotation ở 03/04/08/10 trên cả 3 browser.

## 2. Bảng TC × browser

| ID | TC | chromium | firefox | webkit | Phân loại | Nguyên nhân |
|---|---|---|---|---|---|---|
| B-AUTO-01 | Guest không thanh toán được | pass | pass | pass | — | |
| B-AUTO-02 | P×1: danh sách, tổng, thành công, đơn lưu đúng | pass | pass | pass | — | |
| B-AUTO-03 | P×2 + Q×1 + giỏ phải xóa sau thành công | FAIL | FAIL | FAIL | Bug SUT | BC-B4: giỏ vẫn còn 2 dòng (ảnh [B-AUTO-03](evidence/failures/B-AUTO-03-chromium.png)). Tổng và đơn lưu đúng (14.000.000) |
| B-AUTO-04 | Giỏ cập nhật P×1 → P×2 | pass | pass | pass | — | |
| B-AUTO-05 | Không sửa được tổng | FAIL | FAIL | FAIL | Bug SUT | BC-B1: ô tổng là `input number` sửa được; gõ “1” thì dòng thành “Tổng thanh toán: 1 ₫” ([ảnh](evidence/failures/B-AUTO-05-chromium.png)) |
| B-AUTO-06 | Client gửi total 1 | FAIL | FAIL | FAIL | Bug SUT | BC-B2: backend lưu đơn `total_amount = 1` |
| B-AUTO-07 | Client gửi total 900.000.000 | FAIL | FAIL | FAIL | Bug SUT | BC-B2: lưu 900000000 |
| B-AUTO-08 | Cấu trúc: 1 h1, ₫ + phân cách | FAIL | FAIL | FAIL | Bug SUT | BC-B3: không có `h1` (`h1Count = 0`). Phần ₫ và phân cách: đạt ([ảnh](evidence/failures/B-AUTO-08-chromium.png)) |
| B-AUTO-09 | Giỏ rỗng | pass | pass | pass | — | Phần “icon/hình thân thiện” không automate (#7) |
| B-AUTO-10 | P×3 | pass | pass | pass | — | |
| B-AUTO-11 | 3 sản phẩm khác nhau | pass | pass | pass | — | |
| B-AUTO-12 | Client gửi total âm -100000 | FAIL | FAIL | FAIL | Bug SUT | BC-B2: lưu đơn -100000 (tổng âm) |
| B-AUTO-13 | API không token | pass | pass | pass | — | |

Không có fail nào thuộc nhóm lỗi test hay lỗi môi trường. Các lỗi test của bản draft đã được sửa, xem [review.md](review.md).

Bằng chứng backend cho BC-B2: thông điệp assertion trong report ghi rõ giá trị nhận được, ví dụ “backend không được lưu total_amount client (1) … Received array: [1]”. Giá trị này lấy từ `GET /api/orders/my-orders` của user test. Ảnh màn hình thành công: [B-AUTO-06](evidence/failures/B-AUTO-06-chromium.png), [B-AUTO-12](evidence/failures/B-AUTO-12-chromium.png).

## 3. Bug candidates (chưa đăng Issues)

Đối chiếu `datkrb/SUT_Issue` (đọc công khai ngày 2026-11-15):

| ID | Tóm tắt | TC | Trùng issue? | Đề xuất |
|---|---|---|---|---|
| BC-B1 | Checkout cho người dùng sửa trực tiếp tổng tiền | B-AUTO-05 | **Trùng #4** (HW02) | Không tạo mới |
| BC-B2 | Backend lưu `total_amount` do client gửi (thấp, cao, **âm**) | B-AUTO-06/07/12 | **Trùng #5** (HW02) | Không tạo mới. Trường hợp tổng âm (B-AUTO-12) là bằng chứng bổ sung, có thể comment vào #5 |
| BC-B3 | Trang checkout không có `h1` | B-AUTO-08 | **Trùng #6** (“thiếu heading…”) | Không tạo mới |
| BC-B4 | Giỏ không được xóa sau thanh toán thành công | B-AUTO-03 | **Trùng #15** (HW03) | Không tạo mới |

FR-08 không phát hiện bug mới ngoài các issue đã có. Bộ test tự động hiện tái hiện ổn định cả 4 lỗi trên 3 browser.

Quan sát ngoài phạm vi FR-08: lần bấm đầu “Thêm vào giỏ hàng” ở trang chi tiết bị bỏ qua (#21, FR-06/07). Lỗi này đã được xử lý như fixture workaround, không tính là kết quả FR-08.

## 4. TC không automate

Xem [selection.md](selection.md): B-TC-009 (Tab order), B-TC-010 (form không có trường bắt buộc, điều kiện không kích hoạt), B-TC-012 (không tạo được phiên hết hạn mà không sửa token), phần màu/ngôn ngữ của B-TC-008 và phần icon của giỏ rỗng.
