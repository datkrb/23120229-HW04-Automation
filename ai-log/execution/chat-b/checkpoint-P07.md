## Checkpoint P07 — PDF + đóng gói (chat B)

### Đồng bộ tài liệu (Issues đã đăng) — `_tools/HW04/sync_p07_docs.py`
- `README.md`: A/B/C 22 → **24** (bỏ khoản trừ Issues; vẫn trừ 1 mỗi feature vì human review pending), tổng **71 → 77**; ghi rõ `demo/skill-demo.webm` (29 MB) không có trong ZIP, nộp bằng link YouTube; mục lục thêm `pdf/`, `evidence/issues/`.
- `user-handoff.md`: bỏ bước “Đăng GitHub Issues” khỏi việc của sinh viên (còn 5 bước), thêm lệnh đóng gói `--grade NNN`.
- `test-summary.md`, `report.md` §3: ghi Issues #39–#43 + 10 comment đã đăng (chat A, SV đồng ý), thêm EXEC-P05-002.

### PDF — `pdf/` (`_tools/HW04/render_pdfs.py` + `print_pdfs.js`)
- Markdown → HTML → Chromium print (Playwright). Không dùng lại renderer ReportLab của HW03 vì nó trải mọi bảng thành dòng “tiêu đề: giá trị” và bỏ code block; HW04 nhiều bảng/code.
- 6 PDF: report 8 tr, ai-audit 4, ai-critique 1, bug-report 21 (có phụ lục 16 ảnh trang GitHub Issues, bản JPEG thu nhỏ), test-summary 2, README 3. Footer “HW04 · 23120229 · <tài liệu> · human review pending · x/y”.
- QA: 0 ký tự thay thế (U+FFFD), 34 link tương đối viết lại theo `pdf/` và đều tồn tại; ảnh trong HTML đều tải được trước khi in. Đã xem bằng mắt: report tr.1 và tr.5 (bảng), bug-report tr.15 (ảnh comment), ai-audit tr.1–2.
- Phát hiện khi xem: ảnh comment GitHub bị thanh tiêu đề sticky che 1 dòng → sửa `shoot_issues.js` (tắt sticky/fixed trước khi chụp), chụp lại 16 ảnh, kiểm lại 25/25 ảnh trong body hiển thị.

### Đóng gói — `_tools/HW04/package_submission.py`
- Nội dung = `git ls-files --cached --others --exclude-standard` của HW04 (nên không có node_modules, test-results kể cả `.auth` storageState, reports/_scratch), trừ `demo/skill-demo.webm`.
- Mặc định (không `--grade`): bản **QA nội bộ** với điểm README (077) ở `_tools/HW04/work/P07/qa-package/` — **không phải bản nộp**. `--grade NNN` → `HW04-submission/` (chưa tạo, chờ sinh viên chọn điểm).
- Vượt 20 MB nên tách: ZIP chính (tài liệu, PDF, source, data, skill, features, evidence, ai-log, demo metadata) + 3 ZIP report (mỗi thư mục report giữ nguyên). Tổng 5 tệp nộp kể cả `SHA256SUMS.txt`; mỗi ZIP có `.contents.txt`.
- QA tự động: 89 link tương đối trong MD → 0 hỏng; 0 token GitHub/khóa trong tệp text; quét 3353 mục trong trace zip: 0 token GitHub, mật khẩu chỉ có `Admin123!`/`Test1234!` (tài khoản demo SRS) và dữ liệu test trong `data/*.json`; 0 đường dẫn cấm (`_tools`, DB, cache, node_modules).
- Kích thước/SHA của bản QA cuối: xem `_tools/HW04/work/P07/qa-package/SHA256SUMS.txt` và `package-qa.json` (ZIP được build lại sau commit chứa log này, nên SHA cuối nằm trong tin nhắn trả lời).

### Commit
- `cd234a1` docs(hw04): update coordinator prompts (chat A)
- `c6729be` đồng bộ tài liệu + 6 PDF + chụp lại ảnh comment
- commit log/checkpoint P07: hash trong tin nhắn trả lời

### Việc còn lại của sinh viên (`user-handoff.md`)
1. Review và ký (`ai-audit.md` Human review, cam đoan), tự kiểm 5 bug mới.
2. Tạo repo GitHub public, push, điền link repo.
3. Quay video Task 2 (giọng thật, `whoami`/`hostname`), upload Unlisted, điền link.
4. Upload `demo/skill-demo.webm` lên YouTube, điền link.
5. Chọn điểm, chạy lại `git log --stat --date=iso > git-log.txt`, rồi `python _tools/HW04/package_submission.py --grade NNN` → nộp các tệp trong `HW04-submission/`.

### Log
`EXEC-P07-001`. Dừng sau P07.
