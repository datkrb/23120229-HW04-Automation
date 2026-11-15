## Checkpoint P05 — chạy cuối toàn suite + bug report + GitHub Issues (chat B)

**Kết quả:** đã xong bước 1–4. Bước 5 (đăng GitHub) **bị chặn**: lệnh push nhánh evidence bị chính sách quyền của phiên Claude Code từ chối (auto mode, lý do “Unsanctioned Communication”). Chat B không lách và không tạo issue hay comment nào. Mọi nội dung đăng đã chuẩn bị sẵn, chờ người dùng quyết định.

### 1. Chạy chính thức: 9 run

SUT được khởi động lại sạch lúc 19:02 (+07:00), seed 2 user và 4 coupon. Code `beec3c8`, workers 1, retries 0.

| Run | Bắt đầu (ISO) | Total | Pass | Fail | Flaky |
|---|---|---|---|---|---|
| fr01-chromium | 2026-11-15T19:02:25+07:00 | 20 | 9 | 11 | 0 |
| fr01-firefox | 2026-11-15T19:04:28+07:00 | 20 | 9 | 11 | 0 |
| fr01-webkit | 2026-11-15T19:07:43+07:00 | 20 | 9 | 11 | 0 |
| fr08-chromium | 2026-11-15T19:09:59+07:00 | 13 | 7 | 6 | 0 |
| fr08-firefox | 2026-11-15T19:10:56+07:00 | 13 | 7 | 6 | 0 |
| fr08-webkit | 2026-11-15T19:12:38+07:00 | 13 | 7 | 6 | 0 |
| fr17-chromium | 2026-11-15T19:13:54+07:00 | 18 | 11 | 7 | 0 |
| fr17-firefox | 2026-11-15T19:14:50+07:00 | 18 | 11 | 7 | 0 |
| fr17-webkit | 2026-11-15T19:17:03+07:00 | 18 | 11 | 7 | 0 |
| **Tổng** | | **153** | **81** | **72** | **0** |

- 51 TC được automate, chạy trên 3 browser, ra 153 lượt thực thi.
- `verify-report`: 9/9 report có “Run by: 23120229” + ISO timestamp. Ảnh header nằm ở `evidence/reports/`.

### 2. Kiểm ổn định

Chạy lại toàn suite lần 2 (19:19–19:35, output ở `_tools/HW04/work/p05-rerun/`). Kết quả: **153/153 test × browser có cùng trạng thái** với lần 1, 0 flaky. Bảng chi tiết ở `test-summary.md` §4.

### 3. `test-summary.md`

Số liệu sinh bằng script từ `summary.json` và `results.json`. Gồm tổng quan; bảng feature × browser; bảng theo feature; bảng ổn định; số bug; số TC HW02 không automate (12).

### 4. `bug-report.md` (theo S08)

**5 bug mới**, mỗi bug được tái hiện độc lập ngoài suite bằng script (19:35), có ảnh chụp và đọc lại qua API:

| ID | Feature | Mô tả | Severity / Priority |
|---|---|---|---|
| BUG-01 | FR-01 | mật khẩu dùng dấu cách thay ký tự đặc biệt vẫn được chấp nhận | Medium / Medium |
| BUG-02 | FR-01 | email thiếu `@` vẫn đăng ký được | Medium / Medium |
| BUG-03 | FR-01 | đăng ký trùng `test@eshop.com`, có ảnh 2 user cùng email | Serious / High |
| BUG-04 | FR-17 | để trống số lần dùng vẫn tạo coupon, tự gán 1 | Medium / Low |
| BUG-05 | FR-12 | token user thường tạo được coupon qua API admin | Serious / High |

**10 bug đã có issue** (#1, #2, #4, #5, #6, #15, #8, #9, #10, #11) được automation tái hiện; dự kiến chỉ comment bằng chứng vào issue cũ.

Giới hạn: việc xác nhận là do AI chạy script; **chưa có xác nhận thao tác tay của sinh viên**.

### 5. GitHub — chưa đăng

Đã chuẩn bị:
- Xác thực GCM, chỉ đọc: tài khoản `datkrb`, có quyền push.
- Nhánh local `hw04-23120229-evidence`, commit `79a0fe9eecd0207c4f3d9c7033c8f5cfc55e9fc8`, chỉ chứa 29 PNG trong `evidence/HW04_23120229/`. **Chưa push.**
- 15 body (5 issue + 10 comment) trong `docs/issue-bodies/`.
- Script `_tools/HW04/publish_p05.py` (push-assets → verify-assets → publish, idempotent, có readback).
- `docs/github-issues.md` ghi kế hoạch mapping với URL đang để “chưa đăng”.

Chưa làm: ảnh chụp trang Issues trong `evidence/issues/`. Việc này chỉ làm được sau khi đã đăng.

### Commit
| Commit | Nội dung |
|---|---|
| `959305b` | 9 report chính thức |
| `eda249a` | test summary + attachments |
| `c31cd6a` | bug report + repro evidence |

Còn 1 commit chứa docs GitHub, log và context; hash nằm ở tin nhắn trả lời. Repo SUT_Issue chỉ có commit local, chưa push.

### Log
`EXEC-P05-001` (prompt P05 → checkpoint này).

Dừng sau P05. Cần người dùng quyết định cách đăng GitHub: cấp quyền cho phiên, hoặc tự chạy 3 lệnh trong `docs/github-issues.md`.
