# Việc sinh viên phải tự làm (theo thứ tự)

AI không được làm, hoặc bị chặn không làm được, các việc dưới đây. Làm theo thứ tự rồi đánh dấu.

> Repo public **đã tạo và push**: https://github.com/datkrb/23120229-HW04-Automation (chat A, theo đồng ý của em).
>
> GitHub Issues **đã đăng** ngày 2026-11-15 (chat A chạy sau khi em đồng ý): #39–#43 + 10 comment, xem `docs/github-issues.md` và ảnh `evidence/issues/`. Không còn là việc của em; chỉ nên mở lại kiểm tra.

## 1. Review và ký nhận

- [ ] Đọc `report.md`, `features/*/review.md`, `features/*/results.md`, `bug-report.md`.
- [ ] Chạy thử tay 5 bug mới theo bước tái hiện trong `bug-report.md` §A. Ghi lại em đã xác nhận được bug nào. Hiện tại xác nhận chỉ là do AI chạy script.
- [ ] Xác nhận hai TC dựa trên cách AI hiểu SRS: A-AUTO-09 (`#` ngoài tập ký tự đặc biệt) và A-AUTO-20 (dấu cách).
- [ ] Sửa nếu thấy sai. Đổi cột “Human review” trong `ai-audit.md` từ `pending` sang `confirmed` **chỉ cho những dòng đã thật sự review**.
- [ ] Điền phần cam đoan/chữ ký trong `ai-audit.md` (mục AI Disclosure) và chỉnh `ai-critique.md` theo ý của em.

## 2. Tạo repo GitHub public và push — **ĐÃ XONG** (2026-11-15)

Repo public [https://github.com/datkrb/23120229-HW04-Automation](https://github.com/datkrb/23120229-HW04-Automation) do **chat A** tạo và push `main` (tới `dcb14ed`) ngày 2026-11-15 sau khi sinh viên đồng ý; chat B không push. Em chỉ cần mở repo kiểm tra lại (có `automation/`, `features/`, `skills/`, report). Đề §12: ≥ 8 commit chạm spec — hiện 9, xem `docs/spec-commit-count.md`.

## 3. Quay và upload video Task 2 (15 điểm)

- [ ] Làm theo `demo/task2-video-script.md`: tối thiểu 5 phút, **giọng tiếng Việt của chính em**, terminal `whoami` + `hostname` (hoặc face-cam), chạy FR-17 trên 3 browser, mở report thấy “Run by: 23120229” + ISO time, kể fix placeholder của C-AUTO-02.
- [ ] Upload YouTube ở chế độ **Unlisted**, điền link vào `README.md`.

## 4. Upload video demo Agent Skill (§7) — **ĐÃ XONG** (2026-11-15)

[https://youtu.be/TD4otNQzsFU](https://youtu.be/TD4otNQzsFU) (Unlisted, do **chat A** upload ngày 2026-11-15 qua Claude in Chrome theo đồng ý của sinh viên; bản upload là bản nén 8 fps từ `demo/skill-demo.webm`). Em chỉ cần mở link kiểm tra lại.

## 5. Hoàn tất và đóng gói

- [ ] Cập nhật điểm tự chấm trong `README.md` sau khi đã hoàn tất các bước 1–4.
- [ ] Chạy lại `git log --stat --date=iso > git-log.txt` để log có các commit mới.
- [ ] Đóng gói lại sau khi điền link video/repo và chọn điểm: chạy tại `D:\KI7	esting`: `python -I _tools/HW04/package_submission.py --grade NNN` (NNN 3 chữ số, ví dụ `100`). Script render lại PDF, tạo `HW04-submission/23120229_HW04_AI_Automation_NNN.zip` + `SHA256SUMS.txt`, kiểm ≤ 20 MB/tệp. Bản ZIP QA do AI tạo ở `_tools/HW04/work/P07/` **không phải bản nộp**.
  - Moodle giới hạn **≤ 20 tệp, ≤ 20 MB/tệp**. 9 report khoảng 55 MB nên cần tách ZIP, hoặc chỉ nộp link repo cho report (đề cho phép repo chứa report).
- [ ] Nộp Moodle trước deadline.
