## Checkpoint P03 — Feature B: FR-08 Checkout (chat B)

**Kết quả:** 13 TC được automate (9 từ HW02 + 4 bổ sung ở HW04). Chạy cuối trên 3 browser ngày 2026-11-15, code `c1888f8`:

| Browser | Pass | Fail |
|---|---|---|
| chromium | 7 | 6 |
| firefox | 7 | 6 |
| webkit | 7 | 6 |

- Tổng 39 lần chạy: 21 pass, 18 fail, 0 flaky.
- 3/3 report có “Run by: 23120229” + ISO timestamp (`verify-report` OK).
- Mọi fail là bug SUT, không có lỗi test hay môi trường. Không dùng `test.fail` hay `skip`.

### Bug candidates (chưa đăng)
Cả 4 đều **trùng issue đã có**, nên không đề xuất tạo mới:
- BC-B1, tổng sửa được: #4.
- BC-B2, backend lưu `total_amount` client (1 / 900000000 / -100000): #5. Trường hợp tổng âm có thể dùng làm bằng chứng bổ sung cho #5.
- BC-B3, checkout không có `h1`: #6.
- BC-B4, giỏ không xóa sau khi thanh toán thành công: #15 (HW03).

Ảnh nằm ở `features/B-FR08/evidence/failures/`. Bằng chứng backend là giá trị đọc từ `GET /api/orders/my-orders`, có trong thông điệp assertion của report.

### Bản AI draft → review
- Bản draft (commit `7e01cf6`, prompt D1–D3) chạy 5/13 pass trên mỗi browser.
- 4 fail của draft là lỗi fixture:
  - `page.goto` làm mất giỏ (giỏ chỉ ở state client);
  - lần bấm đầu ở trang chi tiết bị bỏ qua (#21), nên dòng số lượng lớn hơn 1 không được thêm.
- 2 TC pass với oracle sai hoặc quá chặt: guest bị ép redirect `/login`; API bị ép đúng mã 401.
- `review.md` ghi 12 lỗi AI kèm commit sửa và nguyên nhân. Sửa thành 2 nhóm commit: `a61087b` (fixture/POM) và `c1888f8` (oracle). Riêng `a61087b` không biên dịch được vì spec vẫn là bản draft; điều này đã ghi rõ.
- 8 nhóm assertion pattern; bảng TC dùng pattern nào có trong review.

### Fixture
- Mỗi test có user riêng, tạo và đăng nhập qua API, token đặt vào `localStorage`.
- Giỏ dựng bằng UI, giá lấy từ `/api/products` lúc chạy, tổng kỳ vọng tính bằng Σ giá × số lượng.
- Kiểm giỏ fixture (số dòng, số lượng) trước khi checkout.

### TC không automate
- B-TC-009: Tab order.
- B-TC-010: checkout không có trường bắt buộc, nên điều kiện của TC không kích hoạt.
- B-TC-012: không tạo được phiên hết hạn nếu không sửa token.
- Phần màu/ngôn ngữ của B-TC-008 và phần icon giỏ rỗng.

### Tệp
- `features/B-FR08/`: `selection.md`, `locator-inventory.md`, `dom-survey-checkout.json`, `ai-draft/**`, `draft-run-summary.md`, `review.md`, `results.md`, `final-run/summary.{md,json}`, `evidence/{failures,report-shots}`.
- `automation/`: `data/fr08-checkout.json`, `pages/CartPage.ts`, `pages/CheckoutPage.ts`, `tests/fr08-checkout.spec.ts`, `reports/fr08-{chromium,firefox,webkit}/` (4.6 / 9.2 / 4.7 MB).
- `_tools/HW04/survey-fr08.js`, `_tools/HW04/work/p03-*.log`.

### Commit
| Commit | Nội dung | Có đổi spec? |
|---|---|---|
| `3a9bf45` | chọn TC, khảo sát DOM, data | không |
| `7e01cf6` | AI draft | có |
| `a61087b` | fix fixture | không (chỉ POM) |
| `c1888f8` | fix oracle | có |
| `7cff12d` | reports + docs | không |

Thêm 1 commit log/context; hash nằm ở tin nhắn trả lời. Tổng số commit thay đổi `.spec.ts` từ đầu bài tới nay: 7 (smoke 1, fr01 4, fr08 2).

### Giới hạn
- Survey FR-08 và mỗi lần chạy test đều tạo user/đơn thật trong DB SUT. Dữ liệu này mất khi backend khởi động lại.
- Human review của sinh viên: pending.

### Log
`EXEC-P03-001` (prompt P03 → checkpoint này), `EXEC-P03-002`, `003`, `004` (các bước D1, D2, D3 sinh draft).

Dừng sau P03, chờ prompt tiếp theo.
