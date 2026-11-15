# Việc sinh viên phải tự làm (theo thứ tự)

AI không được làm, hoặc bị chặn không làm được, các việc dưới đây. Làm theo thứ tự rồi đánh dấu.

## 1. Review và ký nhận

- [ ] Đọc `report.md`, `features/*/review.md`, `features/*/results.md`, `bug-report.md`.
- [ ] Chạy thử tay 5 bug mới theo bước tái hiện trong `bug-report.md` §A. Ghi lại em đã xác nhận được bug nào. Hiện tại xác nhận chỉ là do AI chạy script.
- [ ] Xác nhận hai TC dựa trên cách AI hiểu SRS: A-AUTO-09 (`#` ngoài tập ký tự đặc biệt) và A-AUTO-20 (dấu cách).
- [ ] Sửa nếu thấy sai. Đổi cột “Human review” trong `ai-audit.md` từ `pending` sang `confirmed` **chỉ cho những dòng đã thật sự review**.
- [ ] Điền phần cam đoan/chữ ký trong `ai-audit.md` (mục AI Disclosure) và chỉnh `ai-critique.md` theo ý của em.

## 2. Đăng GitHub Issues — **ĐÃ XONG** (2026-11-15)

Đăng ngày 2026-11-15 (13:56 UTC, tức 20:56 +07:00) bởi **chat A**, sau khi sinh viên đồng ý, bằng `_tools/HW04/publish_p05.py` (push-assets → verify-assets → publish) với tài khoản `datkrb`. Chat B (phiên thực hiện) **không** chạy lệnh đăng; chat B chỉ soạn nội dung/script trước đó, rồi sau khi đăng thì điền URL và chụp trang Issues công khai ở chế độ chỉ đọc. URL ở `docs/github-issues.md`; ảnh chụp ở `evidence/issues/`. Em chỉ cần mở các issue để tự kiểm tra lại. Phần dưới giữ làm lịch sử.

Chạy tại `D:\KI7\testing`:

```
python -I _tools/HW04/publish_p05.py push-assets
python -I _tools/HW04/publish_p05.py verify-assets
python -I _tools/HW04/publish_p05.py publish
```

Script làm 3 việc:
- push nhánh `hw04-23120229-evidence` (chỉ chứa 29 PNG) lên `datkrb/SUT_Issue`;
- kiểm tra ảnh hiển thị được;
- tạo 5 issue mới và 10 comment. Script idempotent nhờ marker và đọc lại từng mục sau khi đăng.

Sau đó:
- [x] Mở `_tools/HW04/work/P05/receipts.json`, chép URL vào `docs/github-issues.md`, `bug-report.md`, `report.md` §9, thay `<issue URL sau khi đăng>`.
- [x] Chụp trang Issues (danh sách và từng issue mới) vào `evidence/issues/`. Đề §14 yêu cầu “screenshots of the bugs on the GitHub Issues page”.

## 3. Tạo repo GitHub public và push

Đề §12 yêu cầu repo public có ít nhất 8 commit chạm spec. Hiện có 9, xem `docs/spec-commit-count.md`.

1. Trên github.com, tạo repo **Public** trống, ví dụ `datkrb/23120229-HW04-Automation`. Không tick tạo README.
2. Chạy tại `D:\KI7\testing\HW04`:

   ```
   git remote add origin https://github.com/datkrb/23120229-HW04-Automation.git
   git push -u origin main
   ```

3. Kiểm tra trên GitHub: có `automation/`, `features/`, `skills/`, các report. Report khoảng 55 MB tổng, mỗi tệp đều nhỏ hơn giới hạn 100 MB của GitHub.
4. Điền link repo vào `README.md` và `report.md`, commit, push lại.

## 4. Quay và upload video Task 2 (15 điểm)

- [ ] Làm theo `demo/task2-video-script.md`: tối thiểu 5 phút, **giọng tiếng Việt của chính em**, terminal `whoami` + `hostname` (hoặc face-cam), chạy FR-17 trên 3 browser, mở report thấy “Run by: 23120229” + ISO time, kể fix placeholder của C-AUTO-02.
- [ ] Upload YouTube ở chế độ **Unlisted**, điền link vào `README.md`.

## 5. Upload video demo Agent Skill (§7)

- [ ] Xem `demo/skill-demo.webm`. Đây là video màn hình thật do script ghi, không có âm thanh; thông tin ở `demo/metadata.json`.
- [ ] Upload YouTube Unlisted, hoặc tự quay bản có lời theo cùng trình tự nếu muốn. Điền link vào `README.md`.

## 6. Hoàn tất và đóng gói

- [ ] Cập nhật điểm tự chấm trong `README.md` sau khi đã hoàn tất các bước 1–5.
- [ ] Chạy lại `git log --stat --date=iso > git-log.txt` để log có các commit mới.
- [ ] Yêu cầu bước đóng gói (P07): xuất PDF cho report, audit và critique; tạo ZIP `23120229_HW04_AI_Automation_<NNN>.zip`.
  - Moodle giới hạn **≤ 20 tệp, ≤ 20 MB/tệp**. 9 report khoảng 55 MB nên cần tách ZIP, hoặc chỉ nộp link repo cho report (đề cho phép repo chứa report).
- [ ] Nộp Moodle trước deadline.
