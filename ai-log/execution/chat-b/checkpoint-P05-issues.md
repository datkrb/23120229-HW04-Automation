## Checkpoint P05 bước 5 (bổ sung) — điền URL Issues + chụp trang Issues (chat B)

**Ai đăng:** chat A chạy `publish_p05.py` ngày 2026-11-15 (13:56 UTC) sau khi sinh viên đồng ý. Chat B **không** đăng, không sửa gì trên GitHub; lượt này chỉ đọc trang công khai.

### Điền URL (`_tools/HW04/fill_issue_urls.py`, nguồn `_tools/HW04/work/P05/receipts.json`, 15/15 `readback_verified`)
- `docs/github-issues.md`: trạng thái ĐÃ ĐĂNG + ai đăng; bảng mapping có URL thật; mục ảnh chụp; phần bị chặn trước đó giữ làm lịch sử.
- `bug-report.md`: dòng **GitHub issue** dưới mỗi BUG-01…05 (#39–#43); cột “Comment đã đăng” cho DUP-01…10.
- `report.md` §9/§11, `README.md` (dòng GitHub Issues, căn cứ tự chấm), `user-handoff.md` (bước 2 đã xong), `submission-manifest.md` R10, `features/*/results.md` (tiêu đề bug candidates), `working-context.md`.
- Không đổi điểm tự chấm; chỉ sửa căn cứ (còn trừ vì human review pending).

### Ảnh chụp trang Issues (`_tools/HW04/shoot_issues.js`)
- Playwright headless Chromium, không đăng nhập, chỉ GET; 2026-11-15 khoảng 20:58 +07:00.
- `evidence/issues/issues-list.png`: danh sách (43 results), 5 issue HW04 ở đầu.
- `HW04-BUG-0x-issue-NN.png` ×5: trang issue đầy đủ.
- `HW04-DUP-xx-issue-NN-comment.png` ×10: khối comment HW04 trên issue cũ.
- Kiểm tra ảnh: mọi `<img>` trong body có `naturalWidth > 0` — issue 3+2+3+3+1 = 12, comment 13, tổng 25 ảnh (khớp 25 PNG A đã verify); kết quả ở `evidence/issues/issues-screenshots.json`. Đã xem lại bằng mắt ảnh danh sách, #43 và comment #9.
- Lỗi trong lượt: lần đầu `waitUntil: networkidle` timeout trên GitHub → đổi sang `load` + chờ markdown body; ảnh comment ban đầu chỉ chụp header 37 px (anchor `#issuecomment-id`) → sửa sang khối `.react-issue-comment` chứa anchor, chụp lại toàn bộ.

### Log
`EXEC-P05-002`.
