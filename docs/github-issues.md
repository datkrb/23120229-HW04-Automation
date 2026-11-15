# HW04 — Công bố GitHub Issues (`datkrb/SUT_Issue`)

**Trạng thái (2026-11-15): ĐÃ ĐĂNG** — 5 issue mới + 10 comment, đều đọc lại (readback) thành công.

Đăng ngày 2026-11-15 (13:56 UTC, tức 20:56 +07:00) bởi **chat A**, sau khi sinh viên đồng ý, bằng `_tools/HW04/publish_p05.py` (push-assets → verify-assets → publish) với tài khoản `datkrb`. Chat B (phiên thực hiện) **không** chạy lệnh đăng; chat B chỉ soạn nội dung/script trước đó, rồi sau khi đăng thì điền URL và chụp trang Issues công khai ở chế độ chỉ đọc.

Bằng chứng: `_tools/HW04/work/P05/receipts.json` (URL, id, sha256 body, readback), `_tools/HW04/work/P05/assets-verified.json` (25 ảnh raw HTTP 200), ảnh chụp trang Issues ở [`evidence/issues/`](../evidence/issues/).

## Lịch sử (trước khi đăng)

Chat B đã chuẩn bị đủ nội dung. Khi chạy `git push` nhánh evidence lên `datkrb/SUT_Issue`, lệnh bị **chặn bởi chính sách quyền của phiên Claude Code** (auto mode, lý do “Unsanctioned Communication”). Theo nguyên tắc an toàn, chat B **không** tìm cách lách. Vì vậy ở thời điểm P05/P06 các bước sau chưa thực hiện:

- tạo issue;
- tạo comment;
- push ảnh;
- chụp trang Issues.

Phần đã có:

- Xác thực GCM (chỉ đọc): `GET /user` ra login `datkrb`; `GET /repos/datkrb/SUT_Issue` cho kết quả `push: true`. Token chỉ nằm trong bộ nhớ, không ghi ra tệp.
- Repo clone local `_tools/HW04/work/P05/repository`, nhánh `hw04-23120229-evidence`, commit local `79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8`. Commit này **chỉ thêm 29 PNG** trong `evidence/HW04_23120229/`, không sửa `main` hay thư mục HW02.
- Body từng issue và comment: `docs/issue-bodies/*.md`. Danh sách payload: `docs/issue-bodies/publication-batch.json`. URL ảnh pin theo commit trên, nên **chỉ hiển thị được sau khi nhánh được push**.
- Script đăng `_tools/HW04/publish_p05.py` (push-assets → verify-assets → publish). Script idempotent nhờ marker, và đọc lại (readback) từng mục sau khi đăng.

## Mapping (URL thật)

| HW04 ID | Hành động | Issue đích / tiêu đề | URL |
|---|---|---|---|
| HW04-BUG-01 | tạo issue mới | [HW04][FR-01] Đăng ký chấp nhận mật khẩu không có ký tự đặc biệt thuộc tập SRS (dùng dấu cách) | https://github.com/datkrb/SUT_Issue/issues/39 |
| HW04-BUG-02 | tạo issue mới | [HW04][FR-01] Đăng ký chấp nhận email sai định dạng (thiếu @) | https://github.com/datkrb/SUT_Issue/issues/40 |
| HW04-BUG-03 | tạo issue mới | [HW04][FR-01] Đăng ký lại được email đã tồn tại → tài khoản trùng email | https://github.com/datkrb/SUT_Issue/issues/41 |
| HW04-BUG-04 | tạo issue mới | [HW04][FR-17] Tạo coupon khi để trống “Số lần dùng tối đa/người” (tự gán 1) | https://github.com/datkrb/SUT_Issue/issues/42 |
| HW04-BUG-05 | tạo issue mới | [HW04][FR-12] API tạo coupon cho phép user thường (không kiểm role = admin) | https://github.com/datkrb/SUT_Issue/issues/43 |
| HW04-DUP-01 | comment issue cũ | #1 | https://github.com/datkrb/SUT_Issue/issues/1#issuecomment-6895381736 |
| HW04-DUP-02 | comment issue cũ | #2 | https://github.com/datkrb/SUT_Issue/issues/2#issuecomment-6895382803 |
| HW04-DUP-03 | comment issue cũ | #4 | https://github.com/datkrb/SUT_Issue/issues/4#issuecomment-6895383797 |
| HW04-DUP-04 | comment issue cũ | #5 | https://github.com/datkrb/SUT_Issue/issues/5#issuecomment-6895384790 |
| HW04-DUP-05 | comment issue cũ | #6 | https://github.com/datkrb/SUT_Issue/issues/6#issuecomment-6895385784 |
| HW04-DUP-06 | comment issue cũ | #15 | https://github.com/datkrb/SUT_Issue/issues/15#issuecomment-6895386795 |
| HW04-DUP-07 | comment issue cũ | #8 | https://github.com/datkrb/SUT_Issue/issues/8#issuecomment-6895387822 |
| HW04-DUP-08 | comment issue cũ | #9 | https://github.com/datkrb/SUT_Issue/issues/9#issuecomment-6895388726 |
| HW04-DUP-09 | comment issue cũ | #10 | https://github.com/datkrb/SUT_Issue/issues/10#issuecomment-6895389580 |
| HW04-DUP-10 | comment issue cũ | #11 | https://github.com/datkrb/SUT_Issue/issues/11#issuecomment-6895390400 |

**Quyết định trùng lặp:** 10 bug đã có issue từ HW02/HW03 thì chỉ comment bằng chứng automation HW04, không tạo issue trùng. Đây là cách làm giống HW03 P14B.

## Ảnh chụp trang Issues (§14)

Chụp bằng Playwright headless Chromium, **không đăng nhập**, chỉ GET trang công khai (`_tools/HW04/shoot_issues.js`, 2026-11-15 20:58 +07:00). Mỗi ảnh issue/comment được kiểm tra mọi `<img>` trong body có `naturalWidth > 0`; kết quả ở `evidence/issues/issues-screenshots.json`.

| Ảnh | Nội dung |
|---|---|
| `issues-list.png` | Danh sách Issues (43 results), 5 issue HW04 ở đầu |
| `HW04-BUG-01-issue-39.png` | Issue #39 đầy đủ, ảnh hiển thị |
| `HW04-BUG-02-issue-40.png` | Issue #40 đầy đủ, ảnh hiển thị |
| `HW04-BUG-03-issue-41.png` | Issue #41 đầy đủ, ảnh hiển thị |
| `HW04-BUG-04-issue-42.png` | Issue #42 đầy đủ, ảnh hiển thị |
| `HW04-BUG-05-issue-43.png` | Issue #43 đầy đủ, ảnh hiển thị |
| `HW04-DUP-01-issue-1-comment.png` | Comment HW04 trên #1, ảnh hiển thị |
| `HW04-DUP-02-issue-2-comment.png` | Comment HW04 trên #2, ảnh hiển thị |
| `HW04-DUP-03-issue-4-comment.png` | Comment HW04 trên #4, ảnh hiển thị |
| `HW04-DUP-04-issue-5-comment.png` | Comment HW04 trên #5, ảnh hiển thị |
| `HW04-DUP-05-issue-6-comment.png` | Comment HW04 trên #6, ảnh hiển thị |
| `HW04-DUP-06-issue-15-comment.png` | Comment HW04 trên #15, ảnh hiển thị |
| `HW04-DUP-07-issue-8-comment.png` | Comment HW04 trên #8, ảnh hiển thị |
| `HW04-DUP-08-issue-9-comment.png` | Comment HW04 trên #9, ảnh hiển thị |
| `HW04-DUP-09-issue-10-comment.png` | Comment HW04 trên #10, ảnh hiển thị |
| `HW04-DUP-10-issue-11-comment.png` | Comment HW04 trên #11, ảnh hiển thị |

## (Lịch sử) Hai cách đăng đã đề xuất trước đó

Có hai cách (đã chọn cách 1: chat A chạy sau khi sinh viên đồng ý):

1. **Cho phép phiên Claude thực hiện push và đăng.** Người dùng thêm quyền trong settings của Claude Code, hoặc xác nhận trực tiếp trong chat. Sau đó chạy:
   ```
   python -I _tools/HW04/publish_p05.py push-assets
   python -I _tools/HW04/publish_p05.py verify-assets
   python -I _tools/HW04/publish_p05.py publish
   ```
2. **Sinh viên tự chạy** 3 lệnh trên trong terminal của mình, chạy tại thư mục `D:/KI7/testing`.

Hai việc sau khi đăng (điền URL, chụp trang Issues) đã làm — xem các mục trên.
