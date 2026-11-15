Vai trò: Chat thực hiện. Tiếp tục HW04 (P02 — Feature A: FR-01 Đăng ký, Web :5173). A đã đối soát P01: chấp nhận (skill + scripts run-matrix/verify-report/check-data-driven, commit 55ad041…8761ca8). Dùng `run-matrix`, `verify-report`, `check-data-driven` của skill khi chạy/kiểm.

Áp dụng skill `playwright-data-driven-automation` (đọc SKILL.md của nó trước) + software-testing-ai-first. Oracle = SRS FR-01 (`eshop-sut/README.md`), không lấy hành vi code làm expected.

Làm theo từng bước, **commit sau mỗi bước** có chạm `.spec.ts` khi phù hợp (đề §12 yêu cầu ≥8 commit chạm spec cho cả bài):
1. Chọn ≥12 TC (khuyến nghị 12–16) từ `HW02/features/a-fr01-register-web/04-test-cases.md`, phủ positive/negative/edge (bắt buộc trường, định dạng email, email trùng, mỗi điều kiện mật khẩu mạnh, biên 7/8 ký tự, ký tự đặc biệt ngoài tập, confirm không khớp, chuyển trang Login sau thành công…). Ghi mapping HW02 TC → HW04 auto ID và TC không automate + lý do tại `HW04/features/A-FR01/selection.md`.
2. Khảo sát DOM thật trang đăng ký (role/label/placeholder/test-id, thông báo lỗi, HTML5 validation) và ghi locator inventory.
3. Data file `HW04/automation/data/fr01-register.json` (không inline array trong spec). Email duy nhất sinh theo run từ template trong data (vd. `{{unique}}`), không hard-code email đã tồn tại trừ case trùng (`test@eshop.com`).
4. Sinh bản **AI draft** của POM + spec (`pages/RegisterPage.ts`, `tests/fr01-register.spec.ts`) bằng prompt riêng từng bước; lưu nguyên văn bản draft vào `HW04/features/A-FR01/ai-draft/` và commit nguyên trạng (`test(fr01): AI draft data-driven register spec`).
5. Chạy draft trên chromium/firefox/webkit, ghi kết quả thật.
6. Human-review checklist của skill: liệt kê lỗi AI (selector, assertion, edge thiếu, wait, isolation, oracle), sửa, commit từng nhóm sửa (`fix(fr01): ...`). ≥3 assertion pattern khác nhau, ghi pattern nào ở TC nào. Lưu diff draft→final `HW04/features/A-FR01/review.md` (lỗi | bằng chứng | sửa | vì sao AI sai).
7. Chạy bản cuối từng browser ra report riêng: `HW04/reports/fr01-<browser>/index.html` (Run by: 23120229 + ISO). Fail do SUT giữ nguyên fail (không `test.fail`/skip để che), xác minh là bug thật bằng tay/ảnh; flaky thì sửa test. Ghi bảng kết quả `HW04/features/A-FR01/results.md` (TC × browser) và bug candidates (kèm screenshot) — chưa đăng Issues ở bước này. Đối chiếu bug HW02 đã có ở `datkrb/SUT_Issue` (#1–#11) để tránh trùng.

AI log: `HW04/ai-log/execution/chat-b/`, ID `EXEC-P02-…`, ghi riêng từng prompt sinh code của bước 4 (đó là bằng chứng "drive AI step by step"); prompt này do chat A soạn và gửi.
Checkpoint: số TC automated/pass/fail theo browser, bug candidates, tệp, commit hash, log ID. Dừng sau P02.
