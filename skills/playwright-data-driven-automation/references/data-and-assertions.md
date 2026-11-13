# Test data và assertion pattern

## Schema dòng dữ liệu (JSON)

```json
[
  {
    "id": "A-TC-001",
    "title": "Đăng ký hợp lệ chuyển tới trang đăng nhập",
    "type": "positive",
    "input": { "name": "Nguyen Van A", "email": "{{uniqueEmail}}", "password": "Abcdef1!", "confirm": "Abcdef1!" },
    "expected": { "kind": "redirect", "url": "/login" },
    "trace": ["FR-01 #5", "HW02 TC001"]
  }
]
```

- `id` duy nhất và trùng ID trong TC thiết kế để truy vết. `type` ∈ `positive | negative | edge`.
- `expected.kind` là nhãn để spec chọn assertion (`redirect`, `error-message`, `field-invalid`, `total`, `row-count`, …). Đặt tên theo oracle, không theo implementation.
- `trace` trỏ tới mục SRS hoặc TC nguồn. TC bổ sung mới thì ghi rõ là bổ sung.
- Có thể thêm `"skipReason"` cho dòng không automate được (vẫn giữ để báo cáo). Spec nên dùng `test.skip(true, reason)` có lý do, không xóa dòng.

## Nạp dữ liệu

JSON (cần `resolveJsonModule` trong tsconfig):

```ts
import rows from '../data/fr01.json';
for (const row of rows) {
  test(`${row.id} ${row.title}`, async ({ page }, testInfo) => { /* 3A */ });
}
```

CSV: đọc bằng `fs.readFileSync` và parse đơn giản (hoặc thư viện `csv-parse/sync`), rồi lặp như JSON.

Placeholder duy nhất: `const uniq = \`${testInfo.project.name}-${Date.now()}-${testInfo.workerIndex}\``. Thay `{{uniqueEmail}}` → `u${uniq}@example.com` và `{{uniqueCode}}` → `C${uniq}`. Kiểm tra giới hạn độ dài/ký tự của trường trước khi chọn format.

## Pattern assertion (chọn ≥3 khác nhau)

| # | Pattern | Mẫu | Ghi chú |
|---|---|---|---|
| 1 | Web-first nội dung | `await expect(page.getByRole('alert')).toContainText(row.expected.message)` | tự retry; tránh `innerText()` rồi `toBe` |
| 2 | URL | `await expect(page).toHaveURL(/\/login$/)`; negative: `await expect(page).not.toHaveURL(/\/login/)` | negative nên chờ phản hồi (response/thông báo) trước khi assert “không đổi URL” |
| 3 | Số lượng | `await expect(page.getByRole('row')).toHaveCount(n)` | |
| 4 | Thuộc tính / validity | `await expect(input).toHaveAttribute('type','email')`; `expect(await input.evaluate((e: HTMLInputElement) => e.validity.valid)).toBe(false)` | ràng buộc HTML5 chặn submit |
| 5 | Response / backend | `const res = await page.waitForResponse(r => r.url().includes('/api/orders') && r.request().method()==='POST'); expect(res.status()).toBe(201)` | oracle tổng tiền, bản ghi được tạo |
| 6 | Soft | `expect.soft(a).toHaveText(x); expect.soft(b).toHaveText(y)` | report gom mọi mismatch trong một lần chạy |
| 7 | Trạng thái điều khiển | `toBeDisabled`, `toBeEditable`, `not.toBeEditable` | ví dụ ô tổng tiền không cho sửa |

Ghi pattern đã dùng vào báo cáo dưới dạng bảng `pattern | test/ID dùng`. Có thể tạo nhanh bằng `check-data-driven.mjs`.
