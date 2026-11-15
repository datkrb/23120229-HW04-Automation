# Kịch bản video Task 2 (§6 Task 2, §11) — sinh viên tự quay, tự nói

> **Yêu cầu của đề:**
> - Video YouTube **Unlisted**, dài **≥ 5 phút**, **thuyết minh tiếng Việt bằng giọng thật của sinh viên**.
> - Chạy end-to-end **một** script automation, gồm phần chạy đa trình duyệt và HTML report.
> - **Kể ít nhất một fix** đã làm với script do AI sinh.
> - Có **face-cam**, hoặc **terminal chạy `whoami` và `hostname`**.
>
> Không dùng giọng AI / TTS (§11). Kịch bản do AI soạn chỉ là gợi ý; câu thoại hãy nói bằng lời của chính bạn.

## Chuẩn bị (trước khi bấm quay)

1. Khởi động SUT:
   ```
   powershell -NoProfile -ExecutionPolicy Bypass -File D:\KI7\testing\eshop-sut\start.ps1
   ```
   Kiểm tra http://localhost:5174 mở được.
2. Mở sẵn các thứ sau:
   - Một cửa sổ terminal (PowerShell) tại `D:\KI7\testing\HW04\automation`.
   - VS Code với các tệp `automation/tests/fr17-coupon.spec.ts`, `automation/data/fr17-coupon.json`, `features/C-FR17/review.md`.
   - Một trình duyệt.
3. Lần chạy trong video ghi report vào thư mục **riêng** `reports/_scratch/video/` để **không ghi đè** report chính thức. Report chính thức đã nộp nằm ở `reports/fr17-*`.
4. Phần mềm quay: OBS hoặc Xbox Game Bar. Bật micro; bật webcam nếu dùng face-cam.

## Timeline (mục tiêu khoảng 6–7 phút)

| Thời điểm | Màn hình | Gợi ý lời nói (tự diễn đạt lại) |
|---|---|---|
| 0:00–0:30 | Terminal: gõ `whoami`, rồi `hostname` | “Em là sinh viên 23120229. Đây là máy em dùng làm bài, `whoami` ra … và `hostname` ra …” |
| 0:30–1:15 | VS Code: cây thư mục `HW04/automation` | Giới thiệu suite: Playwright + TypeScript, 3 feature (FR-01 đăng ký, FR-08 checkout, FR-17 coupon admin), 51 TC, chạy trên 3 browser. Dữ liệu tách riêng trong `data/*.json`; mỗi trang có một Page Object |
| 1:15–2:00 | `data/fr17-coupon.json` rồi `tests/fr17-coupon.spec.ts` | Giải thích data-driven: mỗi dòng JSON là một TC (id, type, input, expected, trace về SRS); spec chỉ import rồi lặp. Chỉ ra 2–3 pattern assertion: `toHaveCount`, `validity`, response API, `expect.soft` |
| 2:00–3:30 | Terminal: chạy lệnh ở **Lệnh 1** bên dưới, chờ chạy xong 3 browser | “Em chạy feature FR-17 trên chromium, firefox, webkit; mỗi browser ra một report riêng.” Trong lúc chờ, nói về fixture: admin đăng nhập một lần bằng `storageState`, mã coupon duy nhất, `afterEach` dọn dữ liệu |
| 3:30–4:15 | Terminal: đọc bảng summary (11 pass / 7 fail mỗi browser nếu SUT chưa đổi) | Giải thích 7 fail là bug thật của SUT, ví dụ discount −1 vẫn tạo được coupon (#9), và user thường gọi được API tạo coupon (HW04-BUG-05) |
| 4:15–5:00 | Trình duyệt mở `reports/_scratch/video/fr17-chromium/index.html` | Chỉ vào tiêu đề có **“Run by: 23120229”** và **ISO timestamp** (ví dụ `2026-…T…+07:00`), mở mục Metadata. Mở một test fail (C-AUTO-17) để xem thông điệp lỗi và ảnh |
| 5:00–6:15 | VS Code: `features/C-FR17/review.md` dòng #1, rồi chạy **Lệnh 2** | **Kể fix:** bản AI draft tìm ô giá trị bằng placeholder cố định `'Giá trị % (VD: 10)'` và chọn loại *sau* khi điền. Khi chọn “Số tiền cố định”, placeholder đổi thành “Số tiền (VD: 50000)”, nên test C-AUTO-02 timeout 30 giây trên cả 3 browser. Em sửa bằng cách chọn loại trước và dùng regex nhận cả hai placeholder. Vì sao AI sai: prompt chỉ đưa placeholder ở trạng thái mặc định, và đây là đặc tính của form |
| 6:15–7:00 | `report.md` §6–7 hoặc README | Tổng kết: 9 run, 153 lượt, 81 pass / 72 fail, 0 flaky, kết quả ổn định khi chạy lại; AI draft sai ở locator, oracle, cleanup; bài học: luôn chạy thật và đối chiếu SRS |

## Lệnh dùng trong video

**Lệnh 1:** chạy FR-17 trên 3 browser vào thư mục riêng (gõ trong `HW04\automation`):

```
node ../skills/playwright-data-driven-automation/scripts/run-matrix.mjs --project-dir . --student-id 23120229 --reports-dir reports/_scratch/video --feature fr17=tests/fr17-coupon.spec.ts
```

Kiểm tra dòng Run by trong report của video:

```
node ../skills/playwright-data-driven-automation/scripts/verify-report.mjs --project-dir . --reports-dir reports/_scratch/video --student-id 23120229
```

**Lệnh 2:** xem diff của fix được kể (gõ trong `HW04`):

```
git diff 61518fd 1065a4a -- automation/pages/AdminCouponPage.ts
```

## Checklist sau khi quay và upload

- [ ] Video dài ≥ 5:00; giọng tiếng Việt là giọng **của bạn**; thấy rõ `whoami` / `hostname` hoặc face-cam.
- [ ] Thấy rõ cả 3 browser chạy, thấy HTML report với “Run by: 23120229” và ISO time.
- [ ] Kể ít nhất 1 fix với script AI (lỗi trong draft → sửa → vì sao AI sai).
- [ ] Upload YouTube, chọn **Visibility: Unlisted**, tiêu đề gợi ý `23120229 HW04 Automation Testing – Task 2 demo`.
- [ ] Dán link vào `README.md` (mục Video), `report.md` (§10/§11) và `user-handoff.md`.
- [ ] Không đưa mật khẩu hay token thật lên màn hình. Tài khoản demo trong SRS thì được phép.
