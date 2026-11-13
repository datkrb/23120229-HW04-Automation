Vai trò: Chat thực hiện. Tiếp tục HW04 (P04 — Feature C: FR-17 Quản lý coupon CRUD, Admin :5174). A đã đối soát P03.

Áp dụng skill `playwright-data-driven-automation` (đọc SKILL.md của nó trước) + software-testing-ai-first. Oracle = SRS FR-17 (+FR-12 phân quyền admin) (`eshop-sut/README.md`), không lấy hành vi code làm expected.

Làm theo từng bước, **commit sau mỗi bước** có chạm `.spec.ts` khi phù hợp (đề §12 yêu cầu ≥8 commit chạm spec cho cả bài):
1. Chọn ≥12 TC từ `HW02/features/c-fr17-coupon-admin/04-test-cases.md` (20 TC): tạo hợp lệ, mã trùng, biên giá trị %/số tiền, ngày hết hạn quá khứ/biên, giới hạn lượt dùng, sửa, xóa có xác nhận, danh sách cập nhật, user thường không vào được trang admin coupon… Mapping + TC không automate tại `HW04/features/C-FR17/selection.md`. Mã coupon duy nhất theo run; dọn dữ liệu tạo ra sau test nếu có thể.
2. Khảo sát DOM thật Admin login + trang coupon (form, bảng, dialog xác nhận) và ghi locator inventory.
3. Data file `HW04/automation/data/fr17-coupon.json` (không inline array trong spec); dùng `storageState` cho đăng nhập admin.
4. Sinh bản **AI draft** của POM + spec (`pages/AdminCouponPage.ts`, `tests/fr17-coupon.spec.ts`) bằng prompt riêng từng bước; lưu nguyên văn bản draft vào `HW04/features/C-FR17/ai-draft/` và commit nguyên trạng (`test(fr17): AI draft data-driven register spec`).
5. Chạy draft trên chromium/firefox/webkit, ghi kết quả thật.
6. Human-review checklist của skill: liệt kê lỗi AI (selector, assertion, edge thiếu, wait, isolation, oracle), sửa, commit từng nhóm sửa (`fix(fr17): ...`). ≥3 assertion pattern khác nhau, ghi pattern nào ở TC nào. Lưu diff draft→final `HW04/features/C-FR17/review.md` (lỗi | bằng chứng | sửa | vì sao AI sai).
7. Chạy bản cuối từng browser ra report riêng: `HW04/reports/fr17-<browser>/index.html` (Run by: 23120229 + ISO). Fail do SUT giữ nguyên fail (không `test.fail`/skip để che), xác minh là bug thật bằng tay/ảnh; flaky thì sửa test. Ghi bảng kết quả `HW04/features/C-FR17/results.md` (TC × browser) và bug candidates (kèm screenshot) — chưa đăng Issues ở bước này. Đối chiếu bug HW02 đã có ở `datkrb/SUT_Issue` (#1–#11) để tránh trùng.

AI log: `HW04/ai-log/execution/chat-b/`, ID `EXEC-P04-…`, ghi riêng từng prompt sinh code của bước 4 (đó là bằng chứng "drive AI step by step"); prompt này do chat A soạn và gửi.
Checkpoint: số TC automated/pass/fail theo browser, bug candidates, tệp, commit hash, log ID. Dừng sau P02.
