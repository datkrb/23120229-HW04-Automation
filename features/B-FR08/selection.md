# B — FR-08 Checkout (Web :5173): chọn TC để automate

Tài liệu do chat B soạn ở P03 ngày 2026-11-15 (+07:00), theo bước 1 của skill `playwright-data-driven-automation` (tiêu chí chọn TC lấy từ S12 tr.12–13).

- Nguồn TC: `HW02/features/b-fr08-checkout-web/04-test-cases.md` (12 TC thiết kế, đều Not run).
- Oracle: SRS FR-08, FR-21 (`eshop-sut/README.md`). Fixture giỏ hàng theo FR-06/07.
- Human review của sinh viên: **pending**.

## Fixture chung (áp dụng mọi TC)

- **Người dùng:** mỗi test đăng ký một user riêng qua `POST /api/register` với email duy nhất theo project, thời gian và lần retry. Sau đó đăng nhập qua `POST /api/login` và đặt token vào `localStorage` trước khi trang tải. Cách này giữ 3 browser độc lập về đơn hàng. Đăng nhập không thuộc FR-08 nên được làm qua API.
- **Giỏ hàng:**
  - Giỏ chỉ nằm trong state React và mất khi tải lại trang. Vì vậy giỏ được dựng bằng UI rồi điều hướng nội bộ bằng link header, không dùng `page.goto` sau khi đã có giỏ.
  - Số lượng 1: nút “Thêm vào giỏ” ở trang chủ.
  - Số lượng lớn hơn 1: trang chi tiết với ô “Số lượng”.
- **Giá:** lấy từ `GET /api/products` lúc chạy. Tổng kỳ vọng tính độc lập bằng Σ giá × số lượng theo fixture trong data. Không đọc tổng từ UI làm chuẩn.
- **Kiểm tra backend:** `GET /api/orders/my-orders` bằng token của user test cho biết `total_amount` đơn vừa tạo.

## Mapping HW02 → HW04

Có 13 TC được automate trên chromium, firefox và webkit: 9 TC từ HW02 và 4 TC bổ sung ở HW04.

| HW04 ID | HW02 TC | Loại | Mục tiêu | Expected (SRS) |
|---|---|---|---|---|
| B-AUTO-01 | B-TC-001 | negative | Guest có giỏ P×1 bấm “Tiến hành thanh toán” | Không thanh toán thành công; không có `POST /api/checkout` 2xx (FR-08 chỉ user đã đăng nhập) |
| B-AUTO-02 | B-TC-002 | positive | Một dòng P×1 | Checkout liệt kê P×1; tổng = giá P; thanh toán thành công; đơn lưu tổng = giá P |
| B-AUTO-03 | B-TC-003 | positive | Nhiều dòng P×2 + Q×1, giỏ phải được xóa | Liệt kê đủ 2 dòng; tổng = 2P + Q; thành công; đơn lưu đúng tổng; **giỏ trống sau thành công** |
| B-AUTO-04 | B-TC-004 | positive | Giỏ P×1 rồi đổi thành P×2 (xóa dòng, thêm lại số lượng 2) | Checkout dùng P×2, tổng 2P, không còn P; đơn lưu 2P |
| B-AUTO-05 | B-TC-005 | negative | Thử sửa tổng tiền trực tiếp | Không có ô cho người dùng sửa tổng; tổng vẫn tự tính |
| B-AUTO-06 | B-TC-006 | negative (tamper) | Request checkout từ Web bị sửa `total_amount = 1` (`page.route`) | Đơn **không** có tổng 1: bị từ chối, hoặc lưu đúng tổng giỏ |
| B-AUTO-07 | B-TC-007 | negative (tamper) | `total_amount = 900000000` (cao hơn giỏ) | Đơn không lưu 900000000 |
| B-AUTO-08 | B-TC-008 | GUI | Cấu trúc trang checkout (FR-21) | Đúng 1 `h1`; tổng hiển thị có `₫` và phân cách hàng nghìn |
| B-AUTO-09 | B-TC-011 | edge | Giỏ rỗng | Có thông báo trống; không có nút tiến hành thanh toán. Chính sách cho phép checkout giỏ rỗng chưa có oracle nên **không** assert |
| B-AUTO-10 | — (bổ sung HW04) | edge | Một dòng số lượng 3 (P×3) | Tổng 3P; thành công; đơn lưu 3P |
| B-AUTO-11 | — (bổ sung HW04) | positive | Ba sản phẩm khác nhau, mỗi loại ×1 | Checkout liệt kê đủ 3 dòng; tổng đúng (FR-08 “hiển thị đầy đủ danh sách”) |
| B-AUTO-12 | — (bổ sung HW04) | negative (tamper) | `total_amount = -100000` (âm) | Đơn không lưu giá trị âm |
| B-AUTO-13 | — (bổ sung HW04) | negative (API) | Gọi thẳng `POST /api/checkout` không có token | Không 2xx (FR-08 chỉ user đã đăng nhập; FR-12 token). Đây là kiểm tra API bổ trợ cho B-AUTO-01 |

## TC không automate (lý do)

| HW02 TC | Lý do |
|---|---|
| B-TC-009 Tab order | Oracle “trên → dưới, trái → phải” cần sơ đồ layout do người quan sát. Automate sẽ phải hard-code thứ tự |
| B-TC-010 form/feedback | Checkout không có trường bắt buộc, không có trường email/password, chỉ một bước, nên điều kiện của TC không kích hoạt. Ghi Skipped kèm khảo sát DOM (`dom-survey-checkout.json`) |
| B-TC-012 phiên hết hiệu lực | JWT của SUT không có thời hạn quan sát được. Tạo trạng thái hết hạn bắt buộc phải sửa token hoặc đồng hồ, điều HW02 cấm. Blocked |
| B-TC-008, phần màu nút / ngôn ngữ / breadcrumb / badge | Cần người đánh giá (màu “xanh dương”, “thân thiện”). Lỗi màu đã có issue #6. Chỉ automate `h1` và định dạng tiền |
| B-TC-003 / B-TC-011, phần “icon/hình thân thiện” | Đánh giá chủ quan; issue #7 đã có |

## Ghi chú oracle

- Ở B-AUTO-06/07/12, theo B-TC-006, việc backend từ chối request hoặc lưu đúng tổng giỏ đều đạt. Chỉ khi đơn lưu đúng giá trị client gửi thì mới là vi phạm FR-08 (“không chấp nhận `total_amount` do client gửi”).
- Ở B-AUTO-01, Cart hiện hộp thoại `alert` rồi chuyển tới `/login`. Test không ép wording hay redirect; chỉ kiểm không có đơn và không có thông báo thành công.
