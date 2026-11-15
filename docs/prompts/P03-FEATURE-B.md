Vai trò: Chat thực hiện. Tiếp tục HW04 (P03 — Feature B: FR-08 Checkout, Web :5173). A đã đối soát P02: chấp nhận (20 TC × 3 browser, review 10 lỗi AI, commit 4993ad4…ff5f10f). Giữ cùng chuẩn chất lượng review như FR-01.

Áp dụng skill `playwright-data-driven-automation` (đọc SKILL.md của nó trước) + software-testing-ai-first. Oracle = SRS FR-08 (fixture giỏ theo FR-06/07, coupon FR-09 chỉ khi cần) (`eshop-sut/README.md`), không lấy hành vi code làm expected.

Làm theo từng bước, **commit sau mỗi bước** có chạm `.spec.ts` khi phù hợp (đề §12 yêu cầu ≥8 commit chạm spec cho cả bài):
1. Chọn ≥12 TC từ `HW02/features/b-fr08-checkout-web/04-test-cases.md` (12 TC; thiếu thì bổ sung TC mới có trace SRS, ghi rõ "bổ sung HW04"): guest bị chặn, 1 dòng/nhiều dòng/quantity, tổng tự tính và không sửa được, backend tính lại khi client gửi `total_amount` sai (dùng `page.route` hoặc API request để chứng minh), giỏ xóa sau thành công, giỏ rỗng, địa chỉ bắt buộc/biên nếu UI có… Mapping + TC không automate tại `HW04/features/B-FR08/selection.md`. Setup giỏ qua API/UI trong fixture, mỗi test độc lập (dùng user riêng đăng ký theo run nếu cần để không đụng giỏ nhau khi chạy song song 3 browser).
2. Khảo sát DOM thật giỏ/checkout/xác nhận đơn và ghi locator inventory.
3. Data file `HW04/automation/data/fr08-checkout.json` (giỏ fixture, số lượng, giá kỳ vọng tính độc lập, địa chỉ; không inline array trong spec). Giá lấy từ API catalog lúc chạy và so với công thức trong data, không hard-code tổng từ UI.
4. Sinh bản **AI draft** của POM + spec (`pages/CartPage.ts`, `pages/CheckoutPage.ts`, `tests/fr08-checkout.spec.ts`) bằng prompt riêng từng bước; lưu nguyên văn bản draft vào `HW04/features/B-FR08/ai-draft/` và commit nguyên trạng (`test(fr08): AI draft data-driven checkout spec`).
5. Chạy draft trên chromium/firefox/webkit, ghi kết quả thật.
6. Human-review checklist của skill: liệt kê lỗi AI (selector, assertion, edge thiếu, wait, isolation, oracle), sửa, commit từng nhóm sửa (`fix(fr08): ...`). ≥3 assertion pattern khác nhau, ghi pattern nào ở TC nào. Lưu diff draft→final `HW04/features/B-FR08/review.md` (lỗi | bằng chứng | sửa | vì sao AI sai).
7. Chạy bản cuối từng browser ra report riêng: `HW04/automation/reports/fr08-<browser>/index.html` (Run by: 23120229 + ISO). Fail do SUT giữ nguyên fail (không `test.fail`/skip để che), xác minh là bug thật bằng tay/ảnh; flaky thì sửa test. Ghi bảng kết quả `HW04/features/B-FR08/results.md` (TC × browser) và bug candidates (kèm screenshot) — chưa đăng Issues ở bước này. Đối chiếu bug HW02 đã có ở `datkrb/SUT_Issue` (#1–#11) để tránh trùng.

AI log: `HW04/ai-log/execution/chat-b/`, ID `EXEC-P03-…`, ghi riêng từng prompt sinh code của bước 4 (đó là bằng chứng "drive AI step by step"); prompt này do chat A soạn và gửi.
Checkpoint: số TC automated/pass/fail theo browser, bug candidates, tệp, commit hash, log ID. Dừng sau P03.
