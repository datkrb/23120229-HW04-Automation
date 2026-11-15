# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5] [cursor=pointer]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7] [cursor=pointer]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8] [cursor=pointer]:
        - /url: /login
      - link "Đăng ký" [ref=e9] [cursor=pointer]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - heading "Đăng Ký Tài Khoản" [level=2] [ref=e12]
      - generic [ref=e13]:
        - generic [ref=e14]:
          - generic [ref=e15]: Họ Tên
          - textbox [ref=e16]
        - generic [ref=e17]:
          - generic [ref=e18]: Email
          - textbox [ref=e19]
        - generic [ref=e20]:
          - generic [ref=e21]: Mật khẩu
          - textbox [ref=e22]
          - paragraph [ref=e23]: "Yêu cầu: Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt."
        - button "Đăng Ký" [ref=e24] [cursor=pointer]
        - generic [ref=e25]:
          - text: Đã có tài khoản?
          - link "Đăng nhập" [ref=e26] [cursor=pointer]:
            - /url: /login
  - contentinfo [ref=e27]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```