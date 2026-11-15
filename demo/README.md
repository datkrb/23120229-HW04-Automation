# Demo

| Tệp | Nội dung |
|---|---|
| [task2-video-script.md](task2-video-script.md) | Kịch bản video **Task 2** (§6). Sinh viên tự quay bằng giọng tiếng Việt, có `whoami`/`hostname`, upload YouTube Unlisted. **Chưa quay** |
| `skill-demo.webm` | Video demo **Agent Skill** (§7), quay màn hình thật bằng Playwright recordVideo ngày 2026-11-15 lúc 19:45:53–19:52:14 (+07:00). Dài 6 phút 20 giây, 1280×720, không âm thanh. Skill được dùng end-to-end trên FR-08: SKILL.md → data → spec/POM → `check-data-driven` → `run-matrix` chạy thật 3 browser (output trực tiếp) → `verify-report` → 3 HTML report có “Run by: 23120229” → summary → review |
| [metadata.json](metadata.json) | Byte, SHA-256, thời lượng, công cụ ghi, danh sách frame đã kiểm |
| [skill-demo-events.json](skill-demo-events.json) | Mốc thời gian từng cảnh và mã thoát của lệnh |
| `frames/` | 5 frame trích từ video để đối chiếu nội dung |

- Video skill không có lời thoại; đề §7 không yêu cầu giọng nói.
- Các thẻ chữ trong video hiển thị nội dung tệp thật kèm đường dẫn và sha256.
- Report của lần quay demo nằm ở `automation/reports/_scratch/skill-demo/`; report chính thức không bị đổi.
- **YouTube (Unlisted): https://youtu.be/TD4otNQzsFU** — tiêu đề “HW04 23120229 — Agent Skill playwright-data-driven-automation: FR-08 end-to-end”, 6:21. Do chat A upload ngày 2026-11-15 qua Claude in Chrome theo đồng ý của sinh viên. Bản upload là **bản nén** (công cụ upload giới hạn 10 MB): `_tools/HW04/work/youtube/skill-demo-yt.webm`, VP8 1280x720, 8 fps, 7,868,806 byte, SHA-256 `b5d8fb999aab8d361d77fa31b5c6b0d585b134c550a45e32701f238ad6f6caa7`, lệnh `ffmpeg (Playwright bundled) -r 8 -c:v libvpx -b:v 150k`. Bản gốc `skill-demo.webm` giữ nguyên.
- File 29 MB, lớn hơn giới hạn 20 MB/tệp của Moodle, nên không đưa vào ZIP; chỉ nộp link YouTube.
