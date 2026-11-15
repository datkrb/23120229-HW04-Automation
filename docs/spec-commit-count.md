# Số commit thay đổi tệp test-script (`*.spec.ts`) — đề §12 yêu cầu ≥ 8

Lệnh: `git log --date=iso --format="%h|%ad|%s" -- "automation/tests/*.spec.ts"` (chạy 2026-11-15, trên lịch sử local của repo `HW04/`). Không có commit nào được tạo giả hay backdate.

| # | Commit | Thời gian | Message |
|---|---|---|---|
| 1 | `7529ef7` | 2026-11-13 19:44:07 +0700 | test(smoke): add infra smoke spec for web home and admin login |
| 2 | `ea21d8a` | 2026-11-13 19:56:51 +0700 | test(fr01): AI draft data-driven register spec |
| 3 | `7a5abb3` | 2026-11-13 20:36:37 +0700 | fix(fr01): review AI draft - locators, missing confirm control, web-first waits, OK/REJ oracles |
| 4 | `b6be9ae` | 2026-11-13 20:37:26 +0700 | fix(fr01): structure test - DRY label mapping via page object, bounded soft-assert waits |
| 5 | `4993ad4` | 2026-11-13 20:57:19 +0700 | fix(fr01): REJ assertion reports accepted-invalid registration as a URL failure |
| 6 | `7e01cf6` | 2026-11-15 18:23:51 +0700 | test(fr08): AI draft data-driven checkout spec |
| 7 | `c1888f8` | 2026-11-15 18:33:20 +0700 | fix(fr08): oracles per SRS/HW02 - guest, tamper, editable total, fixture check |
| 8 | `61518fd` | 2026-11-15 18:44:11 +0700 | test(fr17): AI draft data-driven coupon spec |
| 9 | `ec9c5ae` | 2026-11-15 18:54:08 +0700 | fix(fr17): isolation, rejection oracle, access-denied waits, FR-12 API and * checks |

**Tổng: 9 commit** chạm `*.spec.ts` (≥ 8: đạt). Nếu không tính commit smoke hạ tầng `7529ef7`, còn 8 commit thuộc 3 feature (vẫn ≥ 8).

Lưu ý: commit `a61087b` (fix fr08) và `1065a4a` (fix fr17) chỉ sửa page object/data nên không nằm trong danh sách; phần sửa spec tương ứng là `c1888f8` và `ec9c5ae`.
