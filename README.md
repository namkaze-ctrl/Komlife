# Website Komlife Việt Nam — komlife.com.vn

Web giới thiệu công ty, **không bán hàng**. Web tĩnh dựng bằng **Astro 5** (phiên bản ghim cứng trong `package.json`). Nội dung sửa qua **Pages CMS**, chạy trên **Cloudflare Pages**.

Nhân viên sửa nội dung: đọc `HUONG-DAN-SUA-WEB.md`.

---

## Chạy trên máy

```bash
npm install
npm run dev        # xem thử tại http://localhost:4321
npm run build      # dựng ra thư mục dist/
npm run preview    # xem bản đã dựng
```

Cần Node 22 trở lên (file `.node-version`).

---

## Cấu trúc

```
src/
  content/
    trang/*.json        nội dung từng trang đơn + cai-dat.json (cài đặt chung) + khoi-chung.json (khối dùng ở nhiều trang)
    nhan-hang/*.json    5 nhãn hàng — tên file = đường dẫn /nhan-hang/<tên>
    tin-tuc/*.md        bài tin — tên file = đường dẫn /tin-tuc/<chuyên mục>/<tên>; "nhap: true" = không dựng
    phap-ly/*.md        3 trang chính sách — tên file = đường dẫn
  assets/anh/           TOÀN BỘ ảnh. Trang quản trị cũng tải ảnh vào đây
  pages/                các trang (đọc nội dung từ src/content)
  components/           các khối giao diện dùng lại
  layouts/Base.astro    khung chung: thẻ SEO, menu, chân trang
  lib/                  hàm đọc nội dung, tìm ảnh, hiệu ứng
  styles/global.css     giao diện (chuyển nguyên từ bản dựng thử 10/2026)
public/
  _redirects            chuyển hướng 301 từ đường dẫn web Haravan cũ (Cloudflare Pages đọc file này)
.pages.yml              cấu hình trang quản trị Pages CMS
```

**Ảnh:** nội dung lưu đường dẫn dạng `../../assets/anh/<thư mục>/<tên>.jpg` (tương đối từ `src/content/<nhóm>/`). `src/lib/anh.ts` đổi đường dẫn đó thành ảnh để Astro nén sang WebP và xuất nhiều cỡ. Ảnh chèn trong bài viết Markdown cũng được Astro nén. Giữ mọi file nội dung ở **đúng độ sâu** `src/content/<nhóm>/<file>`, không tạo thư mục con, nếu không đường dẫn ảnh sẽ lệch.

**Tiêu đề:** `*chữ*` → phần nhấn mạnh màu tím; xuống dòng → `<br>` (xem `src/lib/chu.ts`).

---

## Đưa lên mạng (Cloudflare Pages)

1. Cloudflare → Workers & Pages → Create → Pages → **Connect to Git** → chọn kho này.
2. Build command: `npm run build` · Build output: `dist` · Biến môi trường `NODE_VERSION = 22`.
3. Mỗi lần có thay đổi trên GitHub (kể cả từ trang quản trị) Cloudflare tự dựng lại, khoảng 1–2 phút.

## Trang quản trị (Pages CMS)

1. Vào https://app.pagescms.org, đăng nhập bằng tài khoản GitHub có quyền với kho, cài **Pages CMS GitHub App** cho kho này.
2. Mời nhân viên qua mục **Collaborators** bằng email (họ không cần tài khoản GitHub).

## Gắn tên miền komlife.com.vn — ĐỌC KỸ

- Email công ty `@komlife.com.vn` chạy bằng **Google Workspace** qua chính tên miền này (bản ghi MX + SPF).
- Khi chuyển phần quản lý tên miền (nameserver) sang Cloudflare: **chép đủ mọi bản ghi cũ**, đặc biệt **MX và TXT**. Thiếu MX là cả công ty mất email.
- Tên miền hiện quản lý ở **Tenten** (`ns4/ns5/ns6.tenten.vn`, kiểm ngày 06/10/2026).
- Gắn xong: vào trang quản trị → Cài đặt chung → bật **"Cho Google tìm thấy web"**. Khi tắt, web tự chặn Google (robots.txt + thẻ noindex).
- **Trước khi đổi tên miền** phải xử lý trang bán hàng cũ `/pages/nuoc-xit-vai-spy` (đang có form đặt hàng COD). Xem ghi chú đầu `public/_redirects`.

## Mẫu đăng ký đại lý / liên hệ

- Mặc định: khách bấm Gửi → máy mở sẵn thư gửi về "Email nhận đăng ký".
- Có **mã Web3Forms** (Cài đặt chung → Mã nhận form) → gửi thẳng về hòm thư, không cần khách tự mở thư. Lấy mã miễn phí tại web3forms.com bằng email nhận đăng ký.

## Nguồn gốc

- Giao diện + nội dung: bản dựng thử trên Vercel (10/2026), nội dung theo tài liệu "Thông tin website" Komlife gửi ngày 02/10/2026.
- 27 bài tin chuyển từ web Haravan cũ (30 bài, bỏ 3 bài có từ cấm ngay trong tiêu đề). 8 bài để **Nháp** vì thân bài có "diệt khuẩn" / "nước hoa Pháp" — Komlife đọc lại rồi tắt Nháp.
- Bảng chuyển hướng: kiểm tay từng đường dẫn cũ ngày 13/8/2026.
