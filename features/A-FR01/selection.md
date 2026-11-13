# A — FR-01 Đăng ký (Web :5173): chọn TC để automate

Chat B soạn ở P02, 2026-11-13 (+07:00), dùng skill `playwright-data-driven-automation` bước 1 (tiêu chí S12 tr.12–13). Nguồn TC: `HW02/features/a-fr01-register-web/04-test-cases.md` (23 TC thiết kế, đều Not run ở HW02). Oracle lấy từ SRS FR-01, FR-21, FR-22 (`eshop-sut/README.md`), không lấy từ code SUT. Human review của sinh viên: **pending**.

## Mapping HW02 → HW04

19 TC được automate, gồm 18 TC từ HW02 và 1 TC bổ sung ở HW04. Tất cả chạy trên chromium, firefox và webkit.

| HW04 auto ID | HW02 TC | Loại | Mục tiêu | Expected (SRS) | Lý do chọn |
|---|---|---|---|---|---|
| A-AUTO-01 | A-TC-002 | positive / biên | Password dài 8, mỗi nhóm 2 ký tự `AAaa11!!` | đăng ký OK → trang Đăng nhập | BVA L=8, nhiều dữ liệu cùng flow |
| A-AUTO-02 | A-TC-003 | positive / biên | Password dài 9, mỗi nhóm sát cận dưới `Aa1!bcdef` | OK → Đăng nhập | BVA |
| A-AUTO-03 | A-TC-008 | positive / biên | Đúng 1 chữ thường `ABc12!@D` | OK → Đăng nhập | BVA LO=1 |
| A-AUTO-04 | A-TC-001 | negative / biên | Password 7 ký tự đủ 4 nhóm `Aa1!bcd` | từ chối, lỗi gắn với mật khẩu | BVA L=7 |
| A-AUTO-05 | A-TC-004 | negative | Không có chữ hoa | từ chối (mật khẩu) | mỗi điều kiện mạnh |
| A-AUTO-06 | A-TC-005 | negative | Không có chữ thường | từ chối (mật khẩu) | như trên |
| A-AUTO-07 | A-TC-006 | negative | Không có chữ số | từ chối (mật khẩu) | như trên |
| A-AUTO-08 | A-TC-007 | negative | Không có ký tự đặc biệt | từ chối (mật khẩu) | như trên |
| A-AUTO-09 | — (bổ sung HW04) | negative / edge | Chỉ có ký tự đặc biệt ngoài tập `#` | từ chối (mật khẩu) | SRS liệt kê tập `@ $ ! % * ? &`; xem ghi chú oracle bên dưới |
| A-AUTO-10 | A-TC-009 | negative | Password và confirm cùng trống | từ chối (mật khẩu) | bắt buộc trường |
| A-AUTO-11 | A-TC-010 | negative | Họ tên trống | từ chối (họ tên) | bắt buộc trường |
| A-AUTO-12 | A-TC-011 | negative | Email trống | từ chối (email) | bắt buộc trường |
| A-AUTO-13 | A-TC-012 | negative | Email không có `@` | từ chối (email) | định dạng email |
| A-AUTO-14 | A-TC-013 | negative | Email đã tồn tại (`test@eshop.com`, tài khoản seed) | từ chối (email) | duy nhất |
| A-AUTO-15 | A-TC-014 | negative | Confirm khác password | từ chối (xác nhận mật khẩu) | confirm |
| A-AUTO-16 | A-TC-015 | negative | Confirm trống | từ chối (xác nhận mật khẩu) | confirm |
| A-AUTO-17 | A-TC-016 | negative / tương tác | Email trùng + confirm lệch | từ chối, có ít nhất một tín hiệu đúng | tương tác |
| A-AUTO-18 | A-TC-017 | positive → negative / state | Đăng ký email mới OK, rồi đăng ký lại cùng email | lần 1 OK → Đăng nhập; lần 2 từ chối (email) | state, lặp lại |
| A-AUTO-19 | A-TC-018 | GUI cấu trúc | Có ô confirm; email `type=email`; password/confirm `type=password`; nhãn bắt buộc có `*`; trang có đúng 1 `<h1>` | đúng FR-01/21/22 | kiểm thuộc tính DOM, lặp trên 3 browser |

Phân bố: 4 positive/state (01–03, 18), 14 negative/edge (04–17), 1 GUI cấu trúc (19).

### Ghi chú oracle

- **Tài khoản trùng.** A-AUTO-14/17 dùng `test@eshop.com`, tài khoản seed SRS §1, được backend seed lại mỗi lần khởi động. Vì đây là tài khoản có sẵn nên không cần tạo fixture.
- **Ký tự đặc biệt ngoài tập (A-AUTO-09).** HW02 xếp `dấu ngoài danh sách` vào mục thiếu oracle. Ở HW04, chat B đọc câu SRS “có ít nhất … 1 ký tự đặc biệt (`@`, `$`, `!`, `%`, `*`, `?`, `&`)” là một tập đóng. Như vậy password chỉ có `#` không thỏa điều kiện ký tự đặc biệt. Đây là **diễn giải của AI**, sinh viên cần xác nhận khi review.
- **Từ chối (REJ).** Theo HW02 §3, REJ nghĩa là không hoàn tất đăng ký và có tín hiệu validation gắn với trường sai. Tín hiệu có thể là native validity hoặc thông báo của app. Test không ép wording chính xác của thông báo.
- **Thành công (OK).** Theo HW02 §3 và FR-01, OK nghĩa là tới trang có chức năng Đăng nhập. Test kiểm tra cả response đăng ký thành công và điều hướng.

## TC không automate (lý do)

| HW02 TC | Lý do |
|---|---|
| A-TC-019 ngôn ngữ và màu nút | Đánh giá “tiếng Việt trừ thuật ngữ chuẩn” mang tính chủ quan (S12 tr.13). Màu “xanh dương” cần ngưỡng màu do người quyết. Lỗi màu nút đã có issue #3 từ HW02. Kiểm thủ công |
| A-TC-020 Tab order | Oracle là “trên → dưới, trái → phải theo layout ghi trước”, nên cần sơ đồ layout do người quan sát. Có thể automate một phần, nhưng sẽ phải hard-code thứ tự, trái với ghi chú của TC thiết kế |
| A-TC-021 Step Indicator | Có điều kiện. Khảo sát DOM cho thấy form chỉ có một bước, nên điều kiện kích hoạt là false. Không có gì để automate; ghi Skipped kèm evidence khảo sát |
| A-TC-022 vị trí/ngôn ngữ thông báo lỗi | Phụ thuộc A-AUTO-15 (nhánh có thông báo app cho confirm lệch). Ô confirm không tồn tại nên nhánh này không kích hoạt được. Ngôn ngữ cũng cần người đánh giá |
| A-TC-023 contract API | Là test API, không phải web frontend như đề §3/§6 yêu cầu. Bài này chỉ automate UI |
