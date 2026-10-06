// Tìm ảnh theo đường dẫn ghi trong nội dung.
// Trang quản trị lưu ảnh vào src/assets/anh/ và ghi đường dẫn dạng "../../assets/anh/ten-anh.jpg".
// Ở đây đổi đường dẫn đó thành ảnh thật để Astro tự nén + xuất nhiều cỡ (điện thoại tải bản nhỏ).
import type { ImageMetadata } from 'astro';

const KHO = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/anh/**/*.{jpg,jpeg,png,webp,avif,gif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

/** Trả về ảnh đã nhận (để nén) hoặc null nếu không tìm thấy. Chấp nhận cả "/anh/x.jpg". */
export function timAnh(duongDan?: string | null): ImageMetadata | null {
  if (!duongDan) return null;
  const s = String(duongDan).trim();
  const m = s.match(/(?:assets\/)?anh\/(.+)$/);
  if (!m) return null;
  const k = '/src/assets/anh/' + decodeURI(m[1]);
  return KHO[k]?.default ?? null;
}
