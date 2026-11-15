# AI Critique — HW04 (23120229)

Đoạn critique do AI (chat B) soạn từ lỗi thật trong `features/*/review.md`; sinh viên cần đọc, chỉnh và xác nhận. Số từ được đếm bằng script (ghi ở cuối).

<!-- critique-start -->
AI sai nhiều nhất ở bản draft sinh code. Draft FR-01 có 0/19 test pass trên cả ba trình duyệt, vì luôn điền vào ô “Xác nhận mật khẩu” vốn không tồn tại. Draft FR-08 gọi `page.goto` trong helper, làm mất giỏ hàng chỉ lưu ở state client, nên lỗi fixture bị báo nhầm thành lỗi checkout. Draft FR-17 chỉ dọn dữ liệu khi test pass, để lại 18 coupon rác. AI còn lấy hành vi quan sát làm oracle thay SRS: ép redirect `/login`, ép mã 401/403, sao chép cách định dạng tiền của SUT. Draft cũng thiếu biên mật khẩu dùng dấu cách.

Có ba lý do AI không tự phát hiện. Thứ nhất, prompt từng bước cung cấp locator theo đặc tả hoặc theo trạng thái mặc định, trong khi DOM thật lại khác. Thứ hai, model có thói quen mặc định: `hasText` khớp chuỗi con, `waitForTimeout`, cleanup đặt cuối thân test. Ngay cả khi prompt đã cấm, nó vẫn lặp lại các thói quen này trong helper tái dùng. Thứ ba, đặc tính feature che lỗi: validator mật khẩu sai che mọi kiểm tra email, và lỗi FR-07 chen vào fixture của FR-08. AI chỉ “thấy” lỗi khi kết quả chạy thật trái với kỳ vọng.

Nguyên tắc rút ra: không tin script AI chưa chạy. Cần lưu nguyên bản draft, chạy trên mọi trình duyệt, đọc từng fail để phân loại lỗi test hay lỗi SUT, và đối chiếu từng assertion với SRS. Assertion phủ định phải có điểm đồng bộ. Fixture phải tự kiểm tra. Ngay cả bản sửa của AI cũng cần chạy lại, vì reviewer AI từng tạo lỗi locator mới. Con người phải sở hữu oracle; AI chỉ nên làm phần tay chân có kiểm chứng.
<!-- critique-end -->

Số từ (đếm token theo khoảng trắng giữa hai marker, script `_tools/HW04/count_words.py`): **295 từ** (yêu cầu §10: 200–300)
