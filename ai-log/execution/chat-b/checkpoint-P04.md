## Checkpoint P04 — Feature C: FR-17 Quản lý mã giảm giá (chat B)

**Kết quả:** 18 TC được automate (16 lấy từ HW02, 2 bổ sung ở HW04). Chạy cuối trên 3 browser ngày 2026-11-15, code `ec9c5ae`:

| Browser | Pass | Fail |
|---|---|---|
| chromium | 11 | 7 |
| firefox | 11 | 7 |
| webkit | 11 | 7 |

- Tổng 54 lượt chạy: 33 pass, 21 fail, 0 flaky.
- 3/3 report có “Run by: 23120229” + ISO timestamp.
- Mọi fail là bug SUT. Không dùng `test.fail` hay `skip`.
- Cleanup hoạt động: sau lần chạy, DB chỉ còn 4 coupon seed.

### Bug candidates (chưa đăng)

Trùng issue đã có:
- BC-C1, minimum rỗng vẫn tạo được: #8.
- BC-C3, discount −1 và 0 được chấp nhận: #9.
- BC-C4, minimum −1 được chấp nhận: #10.
- BC-C6, 6 trường bắt buộc không có `*`/nhãn: #11.

**Mới:**
- **BC-C2:** để trống “Số lần dùng tối đa/người” vẫn tạo được coupon, hệ thống tự gán 1 (C-AUTO-07, có ảnh).
- **BC-C5 (FR-12, đề xuất High):** user thường gọi `POST /api/admin/coupons` bằng token của mình thì nhận HTTP 200 và coupon được lưu (C-AUTO-17). Bằng chứng là thông điệp assertion kèm JSON coupon trong report. Ảnh chụp trang report sẽ làm khi đăng issue.

Ảnh ở `features/C-FR17/evidence/failures/`.

### Bản AI draft → review

- Bản draft (commit `61518fd`, prompt D1–D3) chạy 10/18 pass trên mỗi browser.
- C-AUTO-02 timeout vì placeholder ô giá trị đổi theo loại coupon.
- C-AUTO-14/15 pass với assertion phủ định không có điểm đồng bộ, nên có thể là pass rỗng.
- C-AUTO-17 ép đúng mã 403.
- Locator dấu `*` lọc theo chữ `code`.
- Cleanup chỉ chạy khi test pass, nên **18 coupon `HW4…` bị rò**. Đã xóa qua API admin (18 × HTTP 200); danh sách lưu ở `_tools/HW04/work/p04-draft-leftover-coupons.txt`.
- `review.md` ghi 12 lỗi kèm commit sửa và nguyên nhân. Sửa theo 2 nhóm commit:
  - `1065a4a`: page object và data. Riêng commit này không biên dịch được vì spec vẫn là bản draft; đã ghi rõ trong review.
  - `ec9c5ae`: spec.
- 8 nhóm assertion pattern; bảng pattern theo TC có trong review.

### Ngoài SRS / không automate

- Prompt điều phối có nhắc “sửa coupon”, “xóa có xác nhận”, “ngày hết hạn quá khứ”. SRS FR-17 chỉ yêu cầu Thêm/Xem/Xóa, không có quy tắc ngày, và HW02 dặn không ép dialog. Không có oracle nên không automate; lý do ở `selection.md`.
- Không automate các TC: C-TC-004/010 phần server, C-TC-016, C-TC-019 phần màu, C-TC-020.

### Tệp

- `features/C-FR17/`: `selection.md`, `locator-inventory.md`, `dom-survey-coupon.json`, `ai-draft/**`, `draft-run-summary.md`, `review.md`, `results.md`, `final-run/summary.{md,json}`, `evidence/{failures,report-shots}`.
- `automation/`: `data/fr17-coupon.json`, `pages/AdminCouponPage.ts`, `tests/fr17-coupon.spec.ts`, `reports/fr17-{chromium,firefox,webkit}/` (5.1 / 5.0 / 4.6 MB).
- `_tools/HW04/survey-fr17.js`, `_tools/HW04/work/p04-*`.

### Commit

| Commit | Nội dung | Đổi spec? |
|---|---|---|
| `3a921a8` | chọn TC, khảo sát, data | không |
| `61518fd` | AI draft | có |
| `1065a4a` | fix page object + data | không |
| `ec9c5ae` | fix spec | có |
| `5832bd5` | reports + docs | không |

Còn 1 commit log/context; hash nằm trong tin nhắn trả lời.

Tổng số commit thay đổi `.spec.ts` từ đầu bài: **9** (smoke 1, fr01 4, fr08 2, fr17 2), đạt yêu cầu ≥8 của §12.

### Lưu ý cho A

- 9 report chính thức (fr01/fr08/fr17 × 3) tổng khoảng 55 MB vì có trace. Cần quyết định trước P07: tắt trace và chạy lại, hoặc tách ZIP.
- Human review của sinh viên: pending.

### Log

`EXEC-P04-001` (prompt P04 → checkpoint này), `EXEC-P04-002`, `003`, `004` (các bước D1–D3 sinh draft).

Dừng sau P04, chờ prompt tiếp theo.
