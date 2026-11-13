# Phân loại fail và báo bug

## Phân loại

| Nhóm | Dấu hiệu | Xử lý |
|---|---|---|
| Bug SUT | Fail ổn định trên ≥1 browser khi chạy lại; hành vi thực trái **đặc tả** (SRS/TC thiết kế); tái hiện tay được | Giữ test fail. Viết bug report + ảnh, đăng issue nếu được phép |
| Lỗi test | Locator không tìm thấy, assertion sai oracle, dữ liệu va chạm, timeout do wait sai | Sửa script, ghi vào gap analysis |
| Môi trường | Service không chạy, port sai, browser chưa cài, mạng | Sửa môi trường và chạy lại; ghi riêng |
| Flaky | Pass/fail xen kẽ trên cùng code | Tìm nguyên nhân (R5/R6/R7). Không báo là bug SUT cho tới khi tái hiện ổn định |
| Chưa kết luận | Đặc tả không nói rõ, thiếu oracle | Ghi “thiếu oracle”, không tính pass/fail |

Trước khi gọi là bug SUT:

1. Chạy lại đúng ô ma trận.
2. Mở trace/screenshot (`npx playwright show-trace`).
3. Thử tay trên UI.
4. Đối chiếu đúng câu trong đặc tả.

Nếu fail chỉ xảy ra trên một browser, ghi rõ đó là khác biệt theo browser.

## Mẫu bug report (Markdown)

```markdown
### BUG-[feature]-[nn]: [tóm tắt hành vi sai]
- Feature / đặc tả: [FR-xx, câu cụ thể]
- Test: [ID] trong `tests/[file]:[dòng]`; browser: [chromium/firefox/webkit]; run: [report path, ISO time]
- Môi trường: [URL, commit SUT, OS]
- Các bước: 1… 2… 3…
- Dữ liệu: [input]
- Expected (theo đặc tả): …
- Actual: …
- Mức độ / ưu tiên: …
- Bằng chứng: ![screenshot](evidence/…png), trace: …
- Issue: [URL sau khi đăng]
```

## Đăng GitHub Issue (chỉ khi được phép)

- `gh issue create --repo <owner/repo> --title "…" --body-file bug.md`. Ảnh cần là URL công khai. Cách thực tế: upload ảnh qua web UI của issue, hoặc commit ảnh vào repo issue rồi dẫn link raw.
- Sau khi đăng, đọc lại issue (`gh issue view`), ghi URL vào bug report và chụp trang issue nếu bài yêu cầu.
- Mỗi issue tương ứng một bug, không gộp. Không đăng lỗi test, lỗi môi trường hay lỗi ngoài phạm vi feature được giao.
