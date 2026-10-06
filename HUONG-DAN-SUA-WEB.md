# HƯỚNG DẪN SỬA WEBSITE KOMLIFE

Dành cho nhân viên Komlife. Không cần biết lập trình.

---

## 1. Vào trang quản trị

1. Mở **https://app.pagescms.org**
2. Đăng nhập bằng **email công ty** đã được mời (mở thư mời, bấm đường dẫn đăng nhập).
3. Chọn kho **komlife-website**.

Cột bên trái có các mục:

| Mục | Sửa gì |
|---|---|
| ⚙️ Cài đặt chung | Hotline, email, địa chỉ, link Shopee, bật/tắt cho Google tìm thấy web |
| 🏠 Trang chủ | Chữ và ảnh từng khối trên trang chủ |
| 🧩 Khối dùng chung | Thứ hiện ở nhiều trang: dải 4 con số, 4 khâu quy trình, các mốc 15 năm, đối tác nguyên liệu, giấy chứng nhận, logo siêu thị, khối "Đồng hành bền vững" |
| 🧴 Nhãn hàng | 5 nhãn: mô tả, sản phẩm, mùi hương, hỏi đáp |
| 📰 Tin tức | Đăng bài mới, sửa bài cũ |
| 📄 Các trang khác | Về Komlife, Chất lượng, Hợp tác đại lý, Liên hệ, 3 trang chính sách |

**Sửa xong bấm Lưu (Save).** Web tự cập nhật sau **khoảng 1–2 phút**. Tải lại trang web để xem.

---

## 2. Hai quy ước khi gõ tiêu đề

- **Phần nằm giữa hai dấu `*` sẽ hiện màu tím.**
  Ví dụ gõ `Chặng đường 15 năm *bền bỉ kiến tạo*` → chữ "bền bỉ kiến tạo" màu tím.
- **Bấm Enter = xuống dòng trên web.**

---

## 3. Thay ảnh

1. Bấm vào ô ảnh → **Upload** → chọn ảnh từ máy.
2. Ảnh to cỡ nào cũng được (kể cả ảnh máy ảnh 5–10 MB). **Web tự thu nhỏ và nén**, khách xem không bị chậm.
3. Ảnh nên là **ảnh chụp thật**. Ảnh có chữ in sẵn (banner, poster) thì chữ dễ bị cắt mất ở một số khung.
4. Ô chú thích: ghi **đúng thứ nhìn thấy trong ảnh**. Ví dụ ảnh kho thì ghi kho, đừng ghi dây chuyền.

---

## 4. Đăng một bài tin mới

1. Vào **📰 Tin tức** → **Add an entry** (Thêm bài).
2. **Tên file**: gõ **không dấu, nối bằng gạch ngang**, ví dụ `komlife-tham-gia-hoi-cho-2026`.
   Tên file chính là đường dẫn của bài trên web, đặt xong đừng đổi.
3. Điền: Tiêu đề, Chuyên mục, Ngày đăng, Ảnh đại diện, Tóm tắt (1–2 câu), Nội dung.
4. Muốn bài lên trang chủ → bật **Nổi bật**.
5. Chưa duyệt xong → bật **Nháp**. Bài nháp **không hiện lên web**. Duyệt xong thì tắt Nháp rồi Lưu.

---

## 5. Những việc KHÔNG nên làm

- Không xoá ô hay đổi tên file nhãn hàng (spy, ura, abby, givebe, eddy). Tên file là đường dẫn của trang nhãn.
- Không bật **"Cho Google tìm thấy web"** khi web chưa gắn tên miền komlife.com.vn chính thức.
- Giấy chứng nhận **hết hạn** thì tắt "Hiện trên web", đừng để lên.

---

## 6. Khi gặp vấn đề

| Hiện tượng | Cách xử lý |
|---|---|
| Lưu rồi mà web không đổi | Đợi 2–3 phút rồi tải lại trang. Vẫn không đổi → báo người phụ trách kỹ thuật kiểm tra mục "Deployments" trên Cloudflare. |
| Ảnh không hiện | Kiểm tra đã bấm Upload và chọn ảnh, không dán đường dẫn ảnh từ web khác. |
| Lỡ sửa sai | Mọi lần lưu đều được ghi lại trên GitHub. Người phụ trách kỹ thuật lấy lại được bản trước. |
