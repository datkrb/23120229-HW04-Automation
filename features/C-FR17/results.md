# C — FR-17 Quản lý mã giảm giá: kết quả chạy bản cuối và bug candidates

Lần chạy cuối: 2026-11-15, code HW04 `ec9c5ae`, SUT HEAD `85af3ba`, lệnh `run-matrix.mjs --feature fr17=tests/fr17-coupon.spec.ts` (workers 1, retries 0). Kết quả do AI (chat B) phân loại; **sinh viên chưa review**.

## 1. Tổng hợp

| Run | Report | Bắt đầu (ISO) | Total | Pass | Fail | Flaky | Skipped |
|---|---|---|---|---|---|---|---|
| fr17-chromium | `automation/reports/fr17-chromium/index.html` | 2026-11-15T18:54:20+07:00 | 18 | 11 | 7 | 0 | 0 |
| fr17-firefox | `automation/reports/fr17-firefox/index.html` | 2026-11-15T18:55:17+07:00 | 18 | 11 | 7 | 0 | 0 |
| fr17-webkit | `automation/reports/fr17-webkit/index.html` | 2026-11-15T18:57:34+07:00 | 18 | 11 | 7 | 0 | 0 |
| **Tổng** | 3 browser run | | **54** | **33** | **21** | 0 | 0 |

- `verify-report.mjs`: 3/3 report có “Run by: 23120229” và ISO timestamp. Ảnh chụp ở `evidence/report-shots/`.
- Summary: [final-run/summary.md](final-run/summary.md).
- Kết quả giống hệt trên 3 browser, không có test flaky.
- Sau lần chạy, DB chỉ còn 4 coupon seed, tức cleanup hoạt động.

## 2. Bảng TC × browser

| ID | TC | chromium | firefox | webkit | Phân loại | Nguyên nhân |
|---|---|---|---|---|---|---|
| C-AUTO-01 | Tạo percent hợp lệ + xem + reload | pass | pass | pass | — | |
| C-AUTO-02 | Tạo fixed hợp lệ + xem + reload | pass | pass | pass | — | |
| C-AUTO-03 | code rỗng | pass | pass | pass | — | native `required` |
| C-AUTO-04 | discount rỗng | pass | pass | pass | — | native `required` |
| C-AUTO-05 | expiry rỗng | pass | pass | pass | — | native `required` |
| C-AUTO-06 | minimum rỗng | FAIL | FAIL | FAIL | Bug SUT | BC-C1: tạo được coupon, minimum lưu thành 0 ([ảnh](evidence/failures/C-AUTO-06-chromium.png)) |
| C-AUTO-07 | uses rỗng | FAIL | FAIL | FAIL | Bug SUT | BC-C2: tạo được coupon, uses lưu thành “1 lần” ([ảnh](evidence/failures/C-AUTO-07-chromium.png)) |
| C-AUTO-08 | mã trùng | pass | pass | pass | — | backend báo lỗi, vẫn chỉ 1 bản ghi |
| C-AUTO-09 | discount −1 | FAIL | FAIL | FAIL | Bug SUT | BC-C3: tạo được ([ảnh](evidence/failures/C-AUTO-09-chromium.png)) |
| C-AUTO-10 | discount 0 | FAIL | FAIL | FAIL | Bug SUT | BC-C3: tạo được ([ảnh](evidence/failures/C-AUTO-10-chromium.png)) |
| C-AUTO-11 | minimum −1 | FAIL | FAIL | FAIL | Bug SUT | BC-C4: tạo được ([ảnh](evidence/failures/C-AUTO-11-chromium.png)) |
| C-AUTO-12 | uses 0 | pass | pass | pass | — | native `min=1` |
| C-AUTO-13 | Xóa coupon của test | pass | pass | pass | — | không có hộp xác nhận; SRS không yêu cầu |
| C-AUTO-14 | Guest | pass | pass | pass | — | |
| C-AUTO-15 | User thường qua UI | pass | pass | pass | — | |
| C-AUTO-16 | Type chỉ percent/fixed | pass | pass | pass | — | |
| C-AUTO-17 | API: token user thường tạo coupon | FAIL | FAIL | FAIL | Bug SUT | BC-C5: `POST /api/admin/coupons` trả 200 và tạo coupon (đọc lại qua `GET /api/coupons` thấy bản ghi) |
| C-AUTO-18 | Dấu `*` + đúng 1 `h1` | FAIL | FAIL | FAIL | Bug SUT | BC-C6: cả 6 trường không có nhãn và không có `*`. Phần `h1`: đạt (1) ([ảnh](evidence/failures/C-AUTO-18-chromium.png)) |

Không có fail nào thuộc nhóm lỗi test hoặc lỗi môi trường. Các lỗi test của bản draft đã được sửa, xem [review.md](review.md).

## 3. Bug candidates (chưa đăng Issues)

Đối chiếu với `datkrb/SUT_Issue`, đọc công khai ngày 2026-11-15:

| ID | Tóm tắt | TC | Trùng? | Đề xuất |
|---|---|---|---|---|
| BC-C1 | Tạo coupon khi để trống “Đơn tối thiểu” | C-AUTO-06 | **Trùng #8** (HW02) | Không tạo mới |
| BC-C2 | Tạo coupon khi để trống “Số lần dùng tối đa/người”; hệ thống tự gán 1 | C-AUTO-07 | **Mới**: #8 chỉ nói về minimum | Issue mới |
| BC-C3 | Chấp nhận discount âm và discount bằng 0 | C-AUTO-09/10 | **Trùng #9** (HW02) | Không tạo mới |
| BC-C4 | Chấp nhận minimum âm | C-AUTO-11 | **Trùng #10** (HW02) | Không tạo mới |
| BC-C5 | **FR-12:** API tạo coupon chỉ kiểm có token, không kiểm `role = admin`. User thường tạo được coupon qua `POST /api/admin/coupons` (HTTP 200, bản ghi được lưu) | C-AUTO-17 | **Mới**: không có issue về phân quyền API | Issue mới, đề xuất mức **High** (leo thang quyền). Ảnh: cần chụp trang chi tiết test trong report (assertion và JSON coupon) ở bước đăng issue |
| BC-C6 | 6 trường bắt buộc không có nhãn/`*` | C-AUTO-18 | **Trùng #11** (HW02, “thiếu nhãn dấu bắt buộc”) | Không tạo mới |

Ghi chú:

- C-AUTO-17 tạo coupon bằng token user, coupon này được `afterEach` xóa ngay sau test.
- FR-12 cũng áp dụng cho `DELETE` và cho các API `/api/admin/*` khác. HW04 chỉ automate trường hợp `POST` coupon (thuộc FR-17). Các endpoint khác nằm ngoài phạm vi.

## 4. TC không automate

Xem [selection.md](selection.md):

- C-TC-004 / C-TC-010, phần server (UI không cho nhập)
- C-TC-016 (danh sách rỗng)
- C-TC-019, phần màu / ngôn ngữ / định dạng
- C-TC-020 (Tab order)
- Các yêu cầu ngoài SRS: sửa coupon, xóa có xác nhận, ngày quá khứ
