# HW04 — Công bố GitHub Issues (`datkrb/SUT_Issue`)

**Trạng thái (2026-11-15): CHƯA ĐĂNG.**

Chat B đã chuẩn bị đủ nội dung. Khi chạy `git push` nhánh evidence lên `datkrb/SUT_Issue`, lệnh bị **chặn bởi chính sách quyền của phiên Claude Code** (auto mode, lý do “Unsanctioned Communication”). Theo nguyên tắc an toàn, chat B **không** tìm cách lách. Vì vậy các bước sau đều chưa thực hiện:

- tạo issue;
- tạo comment;
- push ảnh;
- chụp trang Issues.

Phần đã có:

- Xác thực GCM (chỉ đọc): `GET /user` ra login `datkrb`; `GET /repos/datkrb/SUT_Issue` cho kết quả `push: true`. Token chỉ nằm trong bộ nhớ, không ghi ra tệp.
- Repo clone local `_tools/HW04/work/P05/repository`, nhánh `hw04-23120229-evidence`, commit local `79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8`. Commit này **chỉ thêm 29 PNG** trong `evidence/HW04_23120229/`, không sửa `main` hay thư mục HW02.
- Body từng issue và comment: `docs/issue-bodies/*.md`. Danh sách payload: `docs/issue-bodies/publication-batch.json`. URL ảnh pin theo commit trên, nên **chỉ hiển thị được sau khi nhánh được push**.
- Script đăng `_tools/HW04/publish_p05.py` (push-assets → verify-assets → publish). Script idempotent nhờ marker, và đọc lại (readback) từng mục sau khi đăng.

## Kế hoạch mapping (URL điền sau khi đăng thật)

| HW04 ID | Hành động | Issue đích / tiêu đề | URL |
|---|---|---|---|
| HW04-BUG-01 | tạo issue mới | [HW04][FR-01] Đăng ký chấp nhận mật khẩu không có ký tự đặc biệt thuộc tập SRS (dùng dấu cách) | chưa đăng |
| HW04-BUG-02 | tạo issue mới | [HW04][FR-01] Đăng ký chấp nhận email sai định dạng (thiếu @) | chưa đăng |
| HW04-BUG-03 | tạo issue mới | [HW04][FR-01] Đăng ký lại được email đã tồn tại → tài khoản trùng email | chưa đăng |
| HW04-BUG-04 | tạo issue mới | [HW04][FR-17] Tạo coupon khi để trống “Số lần dùng tối đa/người” (tự gán 1) | chưa đăng |
| HW04-BUG-05 | tạo issue mới | [HW04][FR-12] API tạo coupon cho phép user thường (không kiểm role = admin) | chưa đăng |
| HW04-DUP-01 | comment issue cũ | #1 | chưa đăng |
| HW04-DUP-02 | comment issue cũ | #2 | chưa đăng |
| HW04-DUP-03 | comment issue cũ | #4 | chưa đăng |
| HW04-DUP-04 | comment issue cũ | #5 | chưa đăng |
| HW04-DUP-05 | comment issue cũ | #6 | chưa đăng |
| HW04-DUP-06 | comment issue cũ | #15 | chưa đăng |
| HW04-DUP-07 | comment issue cũ | #8 | chưa đăng |
| HW04-DUP-08 | comment issue cũ | #9 | chưa đăng |
| HW04-DUP-09 | comment issue cũ | #10 | chưa đăng |
| HW04-DUP-10 | comment issue cũ | #11 | chưa đăng |

**Quyết định trùng lặp:** 10 bug đã có issue từ HW02/HW03 thì chỉ comment bằng chứng automation HW04, không tạo issue trùng. Đây là cách làm giống HW03 P14B.

## Việc cần sinh viên / người dùng quyết định

Có hai cách:

1. **Cho phép phiên Claude thực hiện push và đăng.** Người dùng thêm quyền trong settings của Claude Code, hoặc xác nhận trực tiếp trong chat. Sau đó chạy:
   ```
   python -I _tools/HW04/publish_p05.py push-assets
   python -I _tools/HW04/publish_p05.py verify-assets
   python -I _tools/HW04/publish_p05.py publish
   ```
2. **Sinh viên tự chạy** 3 lệnh trên trong terminal của mình, chạy tại thư mục `D:/KI7/testing`.

Sau khi đăng, cần thêm hai việc: điền URL vào bảng trên (lấy từ `_tools/HW04/work/P05/receipts.json`), và chụp trang Issues vào `evidence/issues/` như đề §14 yêu cầu.
