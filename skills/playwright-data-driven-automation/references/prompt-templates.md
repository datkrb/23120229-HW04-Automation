# Khung prompt từng bước

Thay `[...]` bằng thông tin thật. Mỗi prompt là một bước; đọc và kiểm tra output trước khi gửi prompt sau. Lưu prompt/output nguyên văn nếu bài yêu cầu AI log. Đây là khung, không phải tương tác đã diễn ra.

## P-a. Chọn TC và lập data

```text
Bối cảnh: SUT [tên], feature [FR-xx: mô tả ngắn], nền tảng [Web/Admin URL].
Đặc tả (nguyên văn): [dán mục SRS].
Bộ TC thiết kế: [dán bảng TC: ID, mục tiêu, input, expected].

Việc: (1) Phân loại từng TC: positive/negative/edge, có nên automate không, lý do theo tiêu chí
lặp lại/nhiều dữ liệu/rủi ro/đa nền tảng; TC không automate thì nêu lý do cụ thể.
(2) Với TC được chọn, sinh data/[feature].json: mảng object {id, title, type, input, expected, trace}.
Expected lấy từ đặc tả, không từ code. Giá trị cần duy nhất dùng placeholder {{uniqueEmail}}/{{uniqueCode}}.
Không viết script ở bước này.
```

## P-b. Khảo sát locator thật

```text
Đây là accessibility snapshot / HTML thật của trang [URL] (không đoán): [dán snapshot từ
`page.accessibility.snapshot()`, `npx playwright codegen`, hoặc read_page].
Liệt kê locator cho từng control mà TC cần, theo ưu tiên getByRole > getByLabel > getByPlaceholder
> getByText > getByTestId > CSS. Đánh dấu control không có nhãn/role (rủi ro locator giòn) và
thông báo lỗi/thành công nào có thể assert. Không viết test.
```

## P-c. Page Object

```text
Dùng locator đã chốt: [dán]. Viết pages/[Page].ts (Playwright + TypeScript): mỗi locator một
thuộc tính, action nghiệp vụ (fillForm, submit, ...) không chứa assert. Không dùng waitForTimeout.
```

## P-d. Spec data-driven

```text
Viết tests/[feature].spec.ts: import rows từ ../data/[feature].json (không định nghĩa dữ liệu
trong spec), lặp sinh test tên `${row.id} ${row.title}`, theo 3A. Thay placeholder bằng giá trị
duy nhất theo project+thời gian. Mỗi test tự setup trạng thái (đăng nhập, giỏ hàng, ...) qua
UI hoặc API được phép; không phụ thuộc test khác. Rẽ nhánh assertion theo expected.kind.
```

## P-e. Assertion

```text
Với từng expected.kind, chọn assertion web-first phù hợp và dùng ít nhất 3 pattern khác nhau
trong suite: [liệt kê pattern mong muốn]. Negative case phải kiểm cả "không được xảy ra" (không
redirect, không tạo bản ghi). Không dùng test.fail/test.skip để né kết quả; nếu nghi SUT sai
theo đặc tả, giữ assertion theo đặc tả.
```

## P-f. Review (AI tự rà, người vẫn review)

```text
Rà soát spec/page object sau theo checklist: selector giòn, assertion yếu/thiếu, edge case
thiếu so với data, wait cứng/flaky, phụ thuộc thứ tự/dữ liệu, oracle lấy từ code, test.fail/skip
che bug, dữ liệu inline. Trả bảng: vị trí | vấn đề | đề xuất sửa. Không tự kết luận đã đúng.
```

## Mẹo

- Đưa đặc tả và snapshot thật vào prompt. Thiếu chúng là nguyên nhân phổ biến nhất khiến AI đoán locator hoặc lấy oracle sai.
- Đặt thứ tự: data → locator → POM → spec → assertion. Gộp hết vào một prompt thì AI dễ bỏ qua edge case và assertion yếu.
- Khi AI trả code chạy fail, gửi lại **lỗi thật** (stack, screenshot, trace) thay vì yêu cầu “sửa cho pass”, để tránh AI sửa expected theo bug.
