## Checkpoint P09 — link YouTube video demo skill (chat B)

- Video https://youtu.be/TD4otNQzsFU (Unlisted) do **chat A** upload theo đồng ý của sinh viên. Chat B không upload, không push.
- Kiểm bản nén `_tools/HW04/work/youtube/skill-demo-yt.webm`: 7.868.806 byte, SHA-256 `b5d8fb99…caa7`, khớp thông tin của A. Chat B không tự mở YouTube để kiểm.
- Điền link bằng `_tools/HW04/sync_p09_youtube.py`:
  - `README.md`: dòng video skill; Agent Skills **10/10**; tổng hiện tại **77 → 82**.
  - `report.md` §10; `demo/README.md` (link, tiêu đề, thông tin bản nén); `demo/metadata.json` (mục `youtube` có thông tin `uploaded_file`).
  - `user-handoff.md`: bước 4 ĐÃ XONG. `ai-audit.md`: ghi rõ chat A upload. `working-context.md`.
- Render lại 6 PDF: 0 link hỏng; README.pdf và report.pdf có link video.
- `git-log.txt` tạo lại; ZIP QA đổi tên thành **082** ở `_tools/HW04/work/P07/qa-package/` (không phải bản nộp; kích thước/SHA trong `SHA256SUMS.txt` và tin nhắn trả lời).
- Còn lại của sinh viên: review & ký; quay video Task 2 + upload YouTube + điền link; chọn điểm → `package_submission.py --grade NNN`.
- Log `EXEC-P09-001`.
