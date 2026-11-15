## Checkpoint P06 — tài liệu nộp (chat B)

**Kết quả:** đã soạn đủ tài liệu P06 từ artifact thật. Đã quay video demo skill. Video Task 2, upload YouTube, repo public và đăng Issues vẫn chờ sinh viên. Trong lượt này không thử push hay đăng lại.

### Tệp

| Tệp | Nội dung |
|---|---|
| `report.md` | Báo cáo chính (§1–11), xem chi tiết bên dưới |
| `ai-audit.md` | Câu khai §9; 17 tương tác (EXEC-P00…P06) theo mẫu AI-02, có hash prompt/output, verdict, bản sửa, Human review = pending; mục AI Disclosure (AI-03) gộp ở cuối |
| `ai-critique.md` | 295 từ, đếm bằng `_tools/HW04/count_words.py`; trả lời đủ 3 câu §10 dựa trên lỗi thật |
| `docs/spec-commit-count.md` | Bảng các commit chạm `*.spec.ts` |
| `git-log.txt` | `git log --stat --date=iso`, sinh ở commit cuối của P06 |
| `demo/task2-video-script.md` | Kịch bản Task 2 cho sinh viên tự quay (xem bên dưới) |
| `demo/skill-demo.webm` | Video demo skill (xem bên dưới) |
| `README.md` | Self-assessment, test summary, mục lục tệp nộp, hướng dẫn chạy lại |
| `user-handoff.md` | Việc sinh viên phải làm (xem bên dưới) |
| `_tools/HW04/` | `record_skill_demo.js`, `count_words.py` |

**`report.md`** gồm:
- môi trường: Playwright 1.56.1, Chromium 141.0.7390.37, Firefox 142.0.1, WebKit 26.0, Windows 11 10.0.26200, Node 22.21.0;
- phạm vi; quy trình AI-first dẫn record ID; framework;
- 3 bảng TC kèm assertion pattern; bảng 8 nhóm pattern;
- 9 run có link report;
- gap analysis tổng hợp **34 lỗi AI** (10 + 12 + 12) theo nhóm và nguyên nhân (prompt / model / feature);
- TC không automate; bug (URL issue mới để placeholder, issue cũ dùng link thật); giới hạn.

**`ai-audit.md`**, thống kê verdict:

| Verdict | Số |
|---|---|
| VALID | 6 |
| INVALID | 6 (đều là bản AI draft D1/D3) |
| INCOMPLETE | 5 |

**`demo/task2-video-script.md`**:
- timeline 0:00–7:00: `whoami`/`hostname` → giới thiệu suite → data/spec → chạy FR-17 trên 3 browser vào `reports/_scratch/video` → mở report Run by → kể fix placeholder ở C-AUTO-02 (`git diff 61518fd 1065a4a`) → tổng kết;
- checklist upload YouTube Unlisted.

**`demo/skill-demo.webm`**:
- quay màn hình thật bằng Playwright recordVideo, ngày 2026-11-15 lúc 19:45:53–19:52:14;
- dài **6:20.84**, 1280×720, VP8, không âm thanh, 29.427.236 byte, SHA-256 `419e54dba1e17c7a…`;
- nội dung: SKILL → data → spec/POM → check-data-driven → **run-matrix chạy thật FR-08 trên 3 browser** (mỗi browser 7P/6F, giống lần chạy chính thức) → verify-report → 3 report → summary → review;
- kèm `demo/metadata.json`, `skill-demo-events.json` và 5 frame đã xem lại.

**`README.md`**, self-assessment:

| Hạng mục | Hiện tại | Khi hoàn tất phần sinh viên |
|---|---|---|
| A | 22 | 25 |
| B | 22 | 25 |
| C | 22 | 25 |
| Video | 0 | 15 |
| Skill | 5 | 10 |
| **Tổng** | **71** | **100** |

Link video và link repo để placeholder.

**`user-handoff.md`**, thứ tự việc của sinh viên:
1. review và ký;
2. đăng Issues bằng 3 lệnh `publish_p05.py`;
3. tạo repo public và push (có lệnh);
4. video Task 2;
5. upload video skill;
6. cập nhật điểm, git-log, đóng gói (lưu ý giới hạn 20 MB).

### Số commit chạm spec
**9** (≥8, đạt). Nếu không tính commit smoke `7529ef7` thì còn 8. Không tạo commit giả.

### Commit P06

| Commit | Nội dung |
|---|---|
| `cb1bff3` | report |
| `fcae188` | audit + critique |
| `e0a1a9f` | kịch bản video Task 2 |
| `11cc787` | README, handoff, đếm commit spec |
| `2747f68` | video skill |

Còn 1 commit chứa log, context và git-log; hash nằm trong tin nhắn trả lời.

### Giới hạn
- Video skill 29 MB, vượt giới hạn Moodle 20 MB/tệp, nên chỉ nộp bằng link YouTube.
- Trong video, lệnh `run-matrix` thoát với mã 1 vì có test fail do bug SUT; đây là kết quả đúng.
- Human review của sinh viên vẫn pending.

### Log
`EXEC-P06-001`.

Dừng sau P06.
