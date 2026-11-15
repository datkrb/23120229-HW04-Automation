## Checkpoint P02 — Feature A: FR-01 Đăng ký (chat B)

**Kết quả:** 20 TC được automate (19 TC từ HW02 + 1 TC bổ sung). Chạy cuối trên 3 browser ngày 2026-11-15, code `4993ad4`:

| Browser | Pass | Fail |
|---|---|---|
| chromium | 9 | 11 |
| firefox | 9 | 11 |
| webkit | 9 | 11 |

- Tổng 60 lần chạy: 27 pass, 33 fail, 0 flaky, 0 skipped.
- 3/3 report hiển thị “Run by: 23120229” + ISO timestamp (`verify-report` exit 0).
- Mọi fail đều do SUT, đã phân loại trong `features/A-FR01/results.md`. Không dùng `test.fail` hay `skip`.

### Bug candidates (chưa đăng Issues)
- BC-A1, mật khẩu hợp lệ theo SRS bị từ chối: **trùng #1**.
- BC-A2, thiếu ô xác nhận, thiếu `*`, email `type=text`, không có `h1`: **trùng #2**.
- **Mới:**
  - BC-A3: mật khẩu dùng dấu cách thay ký tự đặc biệt vẫn được chấp nhận (A-AUTO-20, 3 browser).
  - BC-A4: email thiếu `@` vẫn đăng ký được (probe P1).
  - BC-A5: email trùng `test@eshop.com` vẫn đăng ký được, tạo user id 4 (probe P2, đề xuất High).
- BC-A4/A5 bị BC-A1 che trong suite: A-AUTO-13/14 fail vì thông báo mật khẩu. Bằng chứng cô lập lấy từ probe khám phá chạy trên chromium ngày 2026-11-13. Ảnh và JSON ở `features/A-FR01/evidence/`.

### Bản AI draft → review
- Bản draft (commit `ea21d8a`, 3 prompt D1–D3) chạy **0/19 pass trên cả 3 browser**. Mọi test timeout ở `fill` của ô confirm không tồn tại.
- `features/A-FR01/review.md` ghi 10 lỗi AI. Mỗi lỗi có bằng chứng, commit sửa và nguyên nhân (prompt, model hay feature). Các nhóm chính:
  - xử lý control thiếu;
  - locator `hasText` khớp chuỗi con;
  - `waitForTimeout`;
  - REJ bỏ sót native validation;
  - `field` ghép `email|confirm`;
  - `waitForResponse` treo;
  - oracle OK chưa chứng minh trang Đăng nhập;
  - structure soft-timeout;
  - thiếu biên dấu cách;
  - thông điệp REJ mơ hồ.
- Có ghi minh bạch 1 lỗi do chính reviewer tạo rồi tự sửa: `has:` neo vào form nên không bao giờ khớp.
- 7 assertion pattern (`check-data-driven` OK): URL, visible, content, count, attribute/validity, response, soft, poll. Bảng TC dùng pattern nào có trong review.md.

### TC không automate
A-TC-019 (màu và ngôn ngữ), A-TC-020 (Tab order), A-TC-021 (Step Indicator, form 1 bước), A-TC-022 (phụ thuộc ô confirm), A-TC-023 (API). Lý do ở `selection.md`.

### Tệp
- `features/A-FR01/`: `selection.md`, `locator-inventory.md`, `dom-survey-register.json`, `ai-draft/**` (prompts D1–D3 + draft nguyên văn), `draft-run-summary.md`, `review.md`, `results.md`, `final-run/summary.{md,json}`, `evidence/{failures,report-shots,probe-*}`.
- `automation/`: `data/fr01-register.json` (20 dòng), `pages/RegisterPage.ts`, `tests/fr01-register.spec.ts`, `reports/fr01-{chromium,firefox,webkit}/`.
- `_tools/HW04/`: `survey-dom.js`, `probe-fr01.js`, `work/debug-fr01.spec.ts`, các log chạy `work/p02-*.log`.
- `working-context.md`

### Commit
| Commit | Nội dung | Có đổi spec? |
|---|---|---|
| `2368783` | chọn TC, khảo sát DOM, data | không |
| `ea21d8a` | AI draft | có |
| `7a5abb3` | review fix | có |
| `b6be9ae` | structure fix | có |
| `1fb5055` | A-AUTO-20 + probe evidence | không (chỉ data) |
| `4993ad4` | REJ fix | có |
| `d1a7706` | reports + review/results | không |

Thêm 1 commit log/context; hash nằm ở tin nhắn trả lời. Có 4 commit thay đổi `.spec.ts`, đóng góp vào yêu cầu ≥8 của §12.

### Giới hạn / lưu ý cho A
- Report có trace nên khá nặng: fr01-chromium 3.9 MB, firefox 14 MB, webkit 4.4 MB. 9 report có thể vượt giới hạn Moodle 20 MB/tệp khi đóng ZIP. Cân nhắc tắt trace cho lần chạy chính thức ở P05, hoặc tách ZIP.
- A-AUTO-09 (`#` ngoài tập) và A-AUTO-20 là diễn giải SRS của AI, chờ sinh viên xác nhận.
- Probe khám phá dùng mật khẩu chọn sau khi đọc code để cô lập lỗi bị che; không dùng làm oracle.
- Máy khởi động lại giữa chừng. Lần chạy 2026-11-13 lúc 20:5x bị ngắt khi đang chạy firefox, nên đã chạy lại toàn bộ ngày 2026-11-15 sau khi `start.ps1` (DB được seed lại).
- Human review của sinh viên: pending.

### Log
`HW04/ai-log/execution/chat-b/prompt_log.jsonl` + `.md`:
- `EXEC-P02-001`: prompt P02 từ A, kèm các tin nhắn trạng thái ngày 11-13.
- `EXEC-P02-002`, `003`, `004`: các bước D1, D2, D3 sinh draft.
- `EXEC-P02-005`: prompt tiếp tục sau khởi động lại, output là checkpoint này.

Dừng sau P02, chờ prompt tiếp theo.
