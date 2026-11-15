# A — FR-01 Đăng ký: kết quả chạy bản cuối và bug candidates

Lần chạy cuối: 2026-11-15, code HW04 `4993ad4`, SUT HEAD `85af3ba`. SUT vừa khởi động lại bằng `start.ps1`, nên DB đã được seed lại. Lệnh chạy là `run-matrix.mjs --feature fr01=tests/fr01-register.spec.ts` (3 browser, workers 1, retries 0). Report và summary đều sinh lúc chạy, không sửa tay. Kết quả do AI (chat B) phân loại; **sinh viên chưa review**.

## 1. Tổng hợp

| Run | Report | Bắt đầu (ISO) | Total | Pass | Fail | Flaky | Skipped |
|---|---|---|---|---|---|---|---|
| fr01-chromium | `automation/reports/fr01-chromium/index.html` | 2026-11-15T18:09:14+07:00 | 20 | 9 | 11 | 0 | 0 |
| fr01-firefox | `automation/reports/fr01-firefox/index.html` | 2026-11-15T18:11:17+07:00 | 20 | 9 | 11 | 0 | 0 |
| fr01-webkit | `automation/reports/fr01-webkit/index.html` | 2026-11-15T18:14:33+07:00 | 20 | 9 | 11 | 0 | 0 |
| **Tổng** | 3 browser run | | **60** | **27** | **33** | 0 | 0 |

- Số TC: 20 được automate và chạy trên cả 3 browser (19 TC từ HW02 + bổ sung A-AUTO-09, A-AUTO-20).
- `verify-report.mjs` xác nhận 3/3 report hiển thị “Run by: 23120229” + ISO timestamp. Ảnh chụp ở `evidence/report-shots/`.
- Kết quả giống hệt nhau trên 3 browser và không có test flaky. Lần chạy 2026-11-13 với spec trước `4993ad4` cũng ra 9/11 mỗi browser (log `_tools/HW04/work/p02-fr01-final-run2.log`). Report của lần đó đã bị lần chạy 2026-11-15 ghi đè, đúng như yêu cầu report phải khớp code cuối.
- Summary máy sinh: [final-run/summary.md](final-run/summary.md) và `summary.json`.

## 2. Bảng TC × browser

| ID | TC | chromium | firefox | webkit | Phân loại fail | Nguyên nhân / bug |
|---|---|---|---|---|---|---|
| A-AUTO-01 | Mật khẩu 8 ký tự hợp lệ → OK | FAIL | FAIL | FAIL | Bug SUT | BC-A1: mật khẩu đúng SRS bị báo “Mật khẩu quá yếu” |
| A-AUTO-02 | Mật khẩu 9 ký tự hợp lệ → OK | FAIL | FAIL | FAIL | Bug SUT | BC-A1 |
| A-AUTO-03 | Mật khẩu có đúng 1 chữ thường → OK | FAIL | FAIL | FAIL | Bug SUT | BC-A1 |
| A-AUTO-04 | Mật khẩu 7 ký tự → REJ | pass | pass | pass | — | |
| A-AUTO-05 | Không có chữ hoa → REJ | pass | pass | pass | — | |
| A-AUTO-06 | Không có chữ thường → REJ | pass | pass | pass | — | |
| A-AUTO-07 | Không có số → REJ | pass | pass | pass | — | |
| A-AUTO-08 | Không có ký tự đặc biệt → REJ | pass | pass | pass | — | xem lưu ý (a) |
| A-AUTO-09 | Ký tự đặc biệt `#` ngoài tập → REJ | pass | pass | pass | — | xem lưu ý (a) |
| A-AUTO-10 | Mật khẩu/xác nhận trống → REJ | pass | pass | pass | — | native `required` |
| A-AUTO-11 | Họ tên trống → REJ | pass | pass | pass | — | native `required` |
| A-AUTO-12 | Email trống → REJ | pass | pass | pass | — | native `required` |
| A-AUTO-13 | Email thiếu `@` → REJ (email) | FAIL | FAIL | FAIL | Bug SUT (bị che) | BC-A1 che mất kiểm email; lỗi thật là BC-A4 |
| A-AUTO-14 | Email trùng `test@eshop.com` → REJ (email) | FAIL | FAIL | FAIL | Bug SUT (bị che) | BC-A1 che; lỗi thật là BC-A5 |
| A-AUTO-15 | Xác nhận lệch → REJ | FAIL | FAIL | FAIL | Bug SUT | BC-A2: không có ô Xác nhận mật khẩu |
| A-AUTO-16 | Xác nhận trống → REJ | FAIL | FAIL | FAIL | Bug SUT | BC-A2 |
| A-AUTO-17 | Email trùng + xác nhận lệch → REJ | FAIL | FAIL | FAIL | Bug SUT | BC-A1 + BC-A2 |
| A-AUTO-18 | Đăng ký mới OK rồi đăng ký lại → REJ | FAIL | FAIL | FAIL | Bug SUT | BC-A1 (fail ở lần 1); phần trùng xem BC-A5 |
| A-AUTO-19 | Cấu trúc form FR-01/21/22 | FAIL | FAIL | FAIL | Bug SUT | BC-A2: thiếu confirm, nhãn không có `*`, email `type=text`, không có `h1`. `type=password` của ô mật khẩu: đạt |
| A-AUTO-20 | Dấu cách thay ký tự đặc biệt → REJ | FAIL | FAIL | FAIL | Bug SUT | BC-A3: đăng ký được, chuyển sang `/login` |

Lưu ý:

- (a) Các test REJ về mật khẩu pass vì SUT có từ chối. Tuy nhiên validator của SUT từ chối **mọi** mật khẩu có ký tự đặc biệt hợp lệ (BC-A1). Vì vậy kết quả pass của 04–09 chỉ chứng minh “có từ chối”, không chứng minh validator kiểm đúng từng điều kiện.
- (b) Không fail nào thuộc nhóm lỗi test hay lỗi môi trường. Các lỗi test đã sửa ở `review.md`.

## 3. Bug candidates (lúc viết chưa đăng Issues; đã đăng 2026-11-15, URL ở [docs/github-issues.md](../../docs/github-issues.md))

Đã đối chiếu với `datkrb/SUT_Issue` #1–#38, đọc công khai qua API ngày 2026-11-15.

| ID | Tóm tắt | TC / bằng chứng | Expected (SRS) | Actual | Trùng issue? | Đề xuất |
|---|---|---|---|---|---|---|
| BC-A1 | Form đăng ký từ chối mật khẩu thỏa chính sách FR-01 | A-AUTO-01/02/03/18 (3 browser); ảnh [A-AUTO-01-chromium.png](evidence/failures/A-AUTO-01-chromium.png) | `AAaa11!!`, `Aa1!bcdef`, `ABc12!@D` hợp lệ → đăng ký và chuyển tới Đăng nhập | Banner “Mật khẩu quá yếu!…”, vẫn ở `/register`, không gửi request | **Trùng #1** (HW02) | Không tạo issue mới; có thể comment bằng chứng automation HW04 |
| BC-A2 | Thiếu ô Xác nhận mật khẩu; nhãn bắt buộc không có `*`; email `type=text`; không có `h1` | A-AUTO-15/16/19; ảnh [A-AUTO-15](evidence/failures/A-AUTO-15-chromium.png), [A-AUTO-19](evidence/failures/A-AUTO-19-chromium.png) | FR-01 có ô xác nhận; FR-22 có `*`, `type=email`; FR-21 có đúng 1 `h1` | Như tóm tắt (3 input; h2) | **Trùng #2** (HW02) | Không tạo issue mới |
| BC-A3 | Mật khẩu không có ký tự đặc biệt thuộc tập SRS (dùng dấu cách) vẫn được chấp nhận | A-AUTO-20 (3 browser); ảnh [A-AUTO-20-chromium.png](evidence/failures/A-AUTO-20-chromium.png) | `Aa1 bcdefg` thiếu ký tự thuộc `@ $ ! % * ? &` → từ chối | Đăng ký thành công, chuyển tới `/login` | Mới: #1 chỉ nói chiều “từ chối mật khẩu hợp lệ”, chiều “chấp nhận mật khẩu không hợp lệ” chưa có | Issue mới (cùng gốc validator với #1, nên liên kết #1) |
| BC-A4 | Email sai định dạng (thiếu `@`) vẫn đăng ký được | Probe khám phá P1, 2026-11-13T20:45:42+07:00; [probe-P1-email-no-at.png](evidence/probe-P1-email-no-at.png), [probe-results.json](evidence/probe-results.json) (`200 User registered successfully`, id 3). A-AUTO-13 bị BC-A1 che | Email phải có định dạng `user@domain.com` → từ chối | Đăng ký thành công, chuyển `/login` | Mới (#2 chỉ ghi `type=text`, không ghi việc chấp nhận và lưu email sai) | Issue mới; ghi rõ cách tái hiện cần mật khẩu mà validator hiện tại chấp nhận |
| BC-A5 | Email đã tồn tại (`test@eshop.com`) đăng ký lại được, tạo tài khoản trùng | Probe P2, 2026-11-13T20:46:13+07:00; [probe-P2-duplicate-seed.png](evidence/probe-P2-duplicate-seed.png), response `200 … id 4`. A-AUTO-14 bị BC-A1 che | Email duy nhất → từ chối | Tạo user id 4 trùng email với user seed id 2 | Mới | Issue mới, mức High (tài khoản trùng ảnh hưởng đăng nhập/dữ liệu) |

Ghi chú về probe:

- Probe (`_tools/HW04/probe-fr01.js`) là **kiểm thử khám phá**, không nằm trong 20 TC automated. Nó dùng mật khẩu `Aa1 bcdef`, chọn sau khi đọc code để vượt qua validator lỗi và cô lập tầng kiểm email. Đây là cách tìm điểm nghi ngờ, không phải oracle; expected vẫn theo SRS.
- Probe chạy trên chromium ngày 2026-11-13, trước khi máy khởi động lại. Tài khoản trùng đã mất khi backend seed lại ngày 2026-11-15.

Quan sát ngoài FR-01, không phải bug candidate của feature này: trang Đăng nhập có tiêu đề “Đăng Ký” và nhãn “Username”/“Sign In”. Phần nhãn tiếng Anh liên quan #33 (HW03).

## 4. TC không automate

Xem [selection.md](selection.md): A-TC-019 (màu và ngôn ngữ), A-TC-020 (Tab order), A-TC-021 (Step Indicator, form một bước), A-TC-022 (vị trí lỗi phụ thuộc ô confirm), A-TC-023 (API).
