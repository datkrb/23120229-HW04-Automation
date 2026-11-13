# Checklist human review script do AI sinh

Đánh dấu từng mục cho từng spec/page object. Một mục “có vấn đề” → ghi vào bảng gap analysis, sửa, commit có message nói rõ.

| # | Hạng mục | Dấu hiệu | Sửa thường gặp |
|---|---|---|---|
| R1 | Selector giòn | CSS theo class Tailwind, `nth-child`, XPath tuyệt đối, text phụ thuộc định dạng số | role/label/placeholder; lọc theo `has`/`hasText` |
| R2 | Assertion yếu | chỉ `toBeVisible` trang, `expect(true)`, không assert gì sau action, assert trên giá trị đã đọc thay vì web-first | assert đúng oracle: thông báo, URL, giá trị, response |
| R3 | Assertion thiếu cho negative | không kiểm “không redirect/không tạo bản ghi” | thêm `not.toHaveURL`, kiểm danh sách không tăng |
| R4 | Thiếu edge case | data chỉ có happy path; biên ±1 thiếu; ký tự đặc biệt | bổ sung dòng data theo TC thiết kế/BVA |
| R5 | Wait cứng / flaky | `waitForTimeout`, `setTimeout`, `networkidle` thay cho assert | web-first assertion, `waitForResponse` |
| R6 | Phụ thuộc thứ tự / dữ liệu | test sau dùng dữ liệu test trước tạo; email/mã cố định; `serial` không cần thiết | setup trong từng test, dữ liệu duy nhất |
| R7 | Đụng nhau giữa browser | 3 project dùng cùng email/coupon/giỏ của cùng user | hậu tố theo `testInfo.project.name`, user riêng theo project |
| R8 | Oracle lấy từ code | expected chép từ hằng số/thông báo trong source hoặc hành vi đang chạy | đối chiếu SRS/TC thiết kế; thiếu oracle thì ghi |
| R9 | Che bug | `test.fail()`, `test.skip()` không lý do, `try/catch` nuốt lỗi, sửa expected để pass | giữ fail theo spec, báo bug |
| R10 | Dữ liệu inline | `const cases = [...]` trong spec, object input viết tay | chuyển sang data file |
| R11 | Không DRY | locator lặp ở nhiều test | đưa vào page object |
| R12 | Tên/trace | tên test không có ID, không truy về TC | `${row.id} ${row.title}` |
| R13 | Setup qua cửa sau không được phép | ghi DB trực tiếp, sửa localStorage để bỏ qua bước cần kiểm | dùng UI/API công khai; ghi giới hạn |

## Bảng gap analysis

```markdown
| # | Tệp:dòng (bản AI) | Hạng mục | Vấn đề | Bản sửa (commit) | Vì sao AI sai |
|---|---|---|---|---|---|
| 1 | tests/fr01.spec.ts:23 | R5 | waitForTimeout(2000) trước khi assert | dùng toHaveURL web-first (abc123) | prompt không nêu cấm wait cứng; mẫu huấn luyện phổ biến |
```

“Vì sao AI sai” chọn một hoặc nhiều nguyên nhân, có giải thích:

- **Prompt**: thiếu snapshot DOM, đặc tả hoặc ràng buộc.
- **Giới hạn model**: đoán locator, bịa API, thiên về happy path.
- **Đặc tính feature**: SPA không có label, thông báo động, dữ liệu reset, rule nghiệp vụ ẩn.
