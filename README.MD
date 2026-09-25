# Lẩu Ếch Huyền Anh – Website giới thiệu

Website tĩnh (HTML/CSS/JS thuần) giới thiệu chuỗi nhà hàng Lẩu Ếch Huyền Anh.

## Chạy thử

Mở trực tiếp `index.html` trong trình duyệt, hoặc:

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

## Cấu trúc

- `index.html` – nội dung trang (giới thiệu, thực đơn, điểm đặc biệt, cơ sở, đặt bàn)
- `css/style.css` – giao diện, responsive
- `js/branches.js` – **dữ liệu các cơ sở** (địa chỉ, hotline, fanpage) – sửa tại đây khi có thay đổi
- `js/main.js` – menu mobile, tab thực đơn, lọc cơ sở, form đặt bàn (tạo tin nhắn SMS/gọi hotline)

## Đưa website lên mạng (GitHub Pages)

1. Vào **Settings → Pages** của repo, mục *Source* chọn **GitHub Actions**.
2. Merge code vào nhánh `main` – workflow `.github/workflows/pages.yml` sẽ tự deploy.
3. Website sẽ có địa chỉ dạng `https://<tên-tài-khoản>.github.io/ManagerRestautrant/`.

Số cơ sở và số tỉnh thành ở phần đầu trang được tự tính từ `js/branches.js`.

## Cần bổ sung

- Ảnh món ăn thật (hiện dùng emoji minh họa) và bảng giá chính thức
- Hotline các cơ sở Sóc Sơn, Trâu Quỳ, Vĩnh Yên, Vĩnh Tường, Phổ Yên, Từ Sơn, Hiệp Hoà
- Địa chỉ chi tiết cơ sở Sóc Sơn, Phổ Yên, Hiệp Hoà; fanpage riêng của Vĩnh Tường, Hiệp Hoà
