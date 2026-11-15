# AI Audit Report — HW04 Automation Testing (§9)

| | |
|---|---|
| Sinh viên | MSSV 23120229 |
| Bài | HW04-AI Automation Testing |
| Thời gian | 2026-11-13 → 2026-11-15, Asia/Saigon (+07:00) |
| Người lập | AI (Claude Code, chat B) |
| Human review của sinh viên | **pending** |

## Khai báo

**I use AI tools for the following tasks:** phân tích đề và điều phối; dựng framework Playwright; viết Agent Skill; chọn TC; khảo sát DOM; sinh bản draft page object, spec và data; review và sửa script; chạy test trên 3 browser; tái hiện bug; soạn bug report; soạn các tài liệu nộp (báo cáo, audit, critique, README, kịch bản video).

| Công cụ | Vai trò | Model |
|---|---|---|
| Claude Code, desktop app — **chat A** | Phân tích đề, soạn và gửi prompt từng bước (P00–P06) cho chat B, đối soát checkpoint. Tài liệu ở `docs/`. Không có AI log riêng, theo quy ước hai chat | không ghi nhận trong artifact của B |
| Claude Code, desktop app — **chat B** (người lập báo cáo này) | Thực hiện mọi bước kỹ thuật và tài liệu. Tự soạn prompt sinh code D1/D2/D3 theo khung của skill | `claude-opus-5-5` (Opus 5.5, theo thông tin môi trường của phiên) |
| Playwright 1.56.1, Node 22, Python 3 | Công cụ chạy test, script hỗ trợ; không phải AI | — |

**Nguồn prompt:**
- Prompt P00–P06 do **AI điều phối (chat A) soạn**, không phải sinh viên viết tay.
- Prompt sinh code D1–D3 do **chat B tự soạn** trong cùng phiên, nên đã có ngữ cảnh khảo sát DOM. Đây không phải chat sạch tách biệt.

**Log nguyên văn:** `ai-log/execution/chat-b/prompt_log.jsonl` (canonical) và `prompt_log.md` (bản xem). Prompt từng bước nằm ở `P0x-prompt.txt`, output ở `checkpoint-P0x.md` và `features/*/ai-draft/**`.

Mọi record có `capture_status: partial`. Phần thiếu được ghi trong trường `missing` của từng record, gồm:
- giờ nhận chính xác;
- toàn bộ transcript tool call;
- các tin nhắn trạng thái giữa chừng.

## Bảng audit (mẫu AI-02)

**Quy ước verdict:**
- **VALID**: artifact đúng sau kiểm chứng thật.
- **INVALID**: output AI sai, phải sửa.
- **INCOMPLETE**: chưa đủ hoặc còn phần chờ.

Hash là 12 ký tự đầu của SHA-256 nội dung prompt/output trong JSONL.

| # | AI log ID | Tool / thời gian | Prompt | Output | Verdict | Lý do + nguồn | Bản sửa / diff | Human review |
|---|---|---|---|---|---|---|---|---|
| 1 | EXEC-P00-001 | chat B · 2026-11-13, khoảng 19:30–19:45 (giờ nhận chính xác: unknown) | P00 intake + setup, từ A · `P00-prompt.txt` (`36217f0378ee`) | `checkpoint-P00.md` (`21a35985b3c3`) | VALID | Smoke 3/3 browser pass; 3 report có Run by + ISO, kiểm bằng verify script và ảnh. Có tự sửa trong lượt: gọi nhầm endpoint `/api/auth/login` (404), đọc `server.js` rồi đổi đúng sang `/api/login` | ghi trong checkpoint | pending |
| 2 | EXEC-P01-001 | chat B · 2026-11-13, khoảng 19:49–19:53 | P01 Agent Skill · `P01-prompt.txt` (`be7d958debb7`) | `checkpoint-P01.md` (`c77cc3b39b64`) và `skills/…` | VALID | 3 script chạy thật trên smoke; kiểm âm tính ra exit 1 đúng như mong đợi (`_tools/HW04/work/p01-skill-check/RESULTS.md`). Chưa chạy eval của skill-creator | — | pending |
| 3 | EXEC-P02-002 | chat B · 2026-11-13, trước 19:57 | D1 page object FR-01 · `features/A-FR01/ai-draft/prompts/D1-page-object.txt` (`2b468b54e022`) | `ai-draft/pages/RegisterPage.ts` (`a888799b1e3f`) | **INVALID** | Luôn `fill` ô xác nhận không tồn tại, nên 18/19 test timeout trên 3 browser; `hasText` khớp chuỗi con (review A #1, #2) | `7a5abb3` | pending |
| 4 | EXEC-P02-003 | như trên | D2 khung spec FR-01 (`68513af76938`) | `ai-draft/tests/fr01-register.spec.d2-skeleton.ts` (`30ed71b6a86b`) | INCOMPLETE | Khung chưa có assertion, đúng như thiết kế của bước D2 | được D3 thay thế | pending |
| 5 | EXEC-P02-004 | như trên | D3 assertion FR-01 (`45e6f96820c7`) | `ai-draft/tests/fr01-register.spec.ts` (`a473d21099a0`) | **INVALID** | Draft 0/19 pass trên cả 3 browser. Có `waitForTimeout`; REJ bỏ sót validation native; keyword cho trường ghép `email\|confirm` ra undefined; `waitForResponse` treo (review A #3–#8) | `7a5abb3`, `b6be9ae`, `4993ad4` | pending |
| 6 | EXEC-P02-001 | chat B · 2026-11-13 | P02 FR-01, từ A (`663ea808d55c`) | tin nhắn trạng thái (`50a208f5d7f3`) | INCOMPLETE | Lượt này bị ngắt khi máy khởi động lại; kết quả được hoàn tất ở record 7 | — | pending |
| 7 | EXEC-P02-005 | chat B · 2026-11-15, khoảng 18:05 | Prompt tiếp tục P02, từ A (`e4956015f9f0`) | `checkpoint-P02.md` (`52fd6215f116`) | VALID | Bản cuối 20 TC, mỗi browser 9P/11F; mọi fail là bug SUT, đã tái hiện | — | pending |
| 8 | EXEC-P03-002 | chat B · 2026-11-15, khoảng 18:20–18:24 | D1 page objects FR-08 (`19af16c05182`) | `features/B-FR08/ai-draft/pages/*` (`462e3eec3c14`) | **INVALID** | `addAll()` gọi `page.goto` làm xóa giỏ; không xử lý lần bấm đầu bị bỏ qua (#21) (review B #1, #2, #12) | `a61087b` | pending |
| 9 | EXEC-P03-003 | như trên | D2 khung spec FR-08 (`4fcc3bceb4cb`) | skeleton (`6b6936a8fddc`) | INCOMPLETE | Khung theo thiết kế | được D3 thay thế | pending |
| 10 | EXEC-P03-004 | như trên | D3 assertion FR-08 (`2daba7f24304`) | `ai-draft/tests/fr08-checkout.spec.ts` (`5c21641ce8ee`) | **INVALID** | Draft 5/13 pass. Ép redirect `/login`, ép 401; oracle tamper quá chặt; không kiểm fixture; format tiền tái hiện logic SUT (review B #3–#11) | `c1888f8` | pending |
| 11 | EXEC-P03-001 | chat B · 2026-11-15, 18:19:57 | P03 FR-08, từ A (`04d85d0bda9a`) | `checkpoint-P03.md` (`f10368ffba72`) | VALID | Bản cuối 13 TC, mỗi browser 7P/6F, mọi fail là bug SUT | — | pending |
| 12 | EXEC-P04-002 | chat B · 2026-11-15, khoảng 18:41–18:44 | D1 page object FR-17 (`fa80cd4f04ba`) | `features/C-FR17/ai-draft/pages/AdminCouponPage.ts` (`2bd452714315`) | **INVALID** | Placeholder ô giá trị cố định nên C-AUTO-02 timeout; locator không giới hạn trong form (review C #1–#3) | `1065a4a` | pending |
| 13 | EXEC-P04-003 | như trên | D2 khung spec FR-17 (`57ad1e43688d`) | skeleton (`8b4d054bc9cb`) | INCOMPLETE | Khung theo thiết kế | được D3 thay thế | pending |
| 14 | EXEC-P04-004 | như trên | D3 assertion FR-17 (`bb29d46d9988`) | `ai-draft/tests/fr17-coupon.spec.ts` (`4a5602369ef8`) | **INVALID** | Cleanup chỉ khi pass làm rò 18 coupon; `waitForTimeout`; access-denied có thể pass rỗng; ép 403; locator `*` vô nghĩa (review C #4–#12) | `ec9c5ae` | pending |
| 15 | EXEC-P04-001 | chat B · 2026-11-15, 18:41:26 | P04 FR-17, từ A (`a6a9b69a73bf`) | `checkpoint-P04.md` (`67f0cd2f2932`) | VALID | Bản cuối 18 TC, mỗi browser 11P/7F, mọi fail là bug SUT; DB được dọn | — | pending |
| 16 | EXEC-P05-001 | chat B · 2026-11-15, 19:01:42 | P05 chạy cuối + bug + Issues, từ A (`10bd9a9a0765`) | `checkpoint-P05.md` (`659427a7e87b`) | INCOMPLETE | 9 run, rerun, summary, bug report đều VALID. **Đăng GitHub chưa thực hiện** vì push bị policy chặn | `docs/github-issues.md` (đang chờ) | pending |
| 17 | EXEC-P06-001 | chat B · 2026-11-15, từ 19:41:22 | P06 tài liệu, từ A · `P06-prompt.txt` | `checkpoint-P06.md` | INCOMPLETE | Tài liệu đã soạn, nhưng link video, link repo public và URL issue còn chờ sinh viên | `user-handoff.md` | pending |

## Thống kê verdict

| Verdict | Số | Tỷ lệ |
|---|---|---|
| VALID | 6 | 35,3 % |
| INVALID | 6 | 35,3 % |
| INCOMPLETE | 5 | 29,4 % |
| **Tổng** | **17** | 100 % |

- Cả 6 INVALID đều là bản **AI draft** sinh code (D1 và D3 của 3 feature). Mỗi bản đều được sửa bằng commit có diff, review ghi 34 lỗi.
- Không có hàng nào được xác nhận bởi human review. Toàn bộ cột Human review là **pending**, không tính là đã xác nhận.

## Kết luận

AI được dùng ở mọi bước: điều phối, viết framework, skill, sinh và sửa script, chạy test, viết tài liệu. Trong đó các bước điều phối, review và tài liệu đều do AI làm. Không bản AI draft sinh code nào dùng được nguyên trạng. Ở cả 3 feature, bản draft mắc cùng các kiểu lỗi: locator giòn, chờ cứng, oracle lấy từ hành vi SUT, fixture không được kiểm và cleanup chỉ chạy khi pass. Chỉ đến khi chạy thật trên 3 browser và đối chiếu SRS/HW02 thì các lỗi này mới lộ ra. Bản cuối cho kết quả ổn định 153/153 qua hai lần chạy, mọi fail đều có bằng chứng là bug SUT. Tuy vậy, mọi kết luận vẫn là của AI. Sinh viên cần tự review script, tự xác nhận bug bằng tay, rồi ký trước khi nộp.

## AI Disclosure (mẫu AI-03, gộp vào audit)

| Mục | Nội dung |
|---|---|
| Môn / mã bài / MSSV / ngày | Kiểm thử phần mềm · HW04-AI · 23120229 · 2026-11-15 |
| Chính sách AI | Đề §1: “Open — a declaration and an attached AI Audit Report are mandatory” |
| Công cụ / model / giai đoạn | Claude Code chat A (điều phối P00–P06) và chat B (Opus 5.5, thực hiện P00–P06) |
| Prompt chính nguyên văn | `ai-log/execution/chat-b/P02-prompt.txt` (FR-01), `features/A-FR01/ai-draft/prompts/D1-page-object.txt`, `features/C-FR17/ai-draft/prompts/D3-assertions.txt`. Toàn bộ log: `ai-log/execution/chat-b/prompt_log.md` |
| Phần AI đóng góp | Toàn bộ code trong `automation/` (config, pages, tests, data), skill trong `skills/`, script trong `_tools/HW04/`, mọi tài liệu Markdown của HW04, các lượt chạy test, ảnh evidence và bug report |
| Cách xác minh và sửa | Chạy thật 3 browser; diff draft → final (`ea21d8a`→`4993ad4`, `7e01cf6`→`c1888f8`, `61518fd`→`ec9c5ae`); chạy lại kiểm ổn định; script tái hiện bug độc lập; `check-data-driven`; `verify-report` |
| Phần sinh viên tự làm | **Chưa có bằng chứng.** Sinh viên cần tự làm: review, xác nhận bug bằng tay, quay video giọng thật. (Đăng Issues và tạo/push repo public đã do chat A thực hiện ngày 2026-11-15 theo đồng ý của sinh viên, không phải thao tác tay của sinh viên.) |
| Cam đoan / chữ ký | `<sinh viên tự xác nhận và ký sau khi review>` |
