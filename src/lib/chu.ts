// Xử lý chữ nhập từ trang quản trị.
//  - Xuống dòng (Enter)       -> ngắt dòng trên web
//  - *phần giữa hai dấu sao*  -> chữ màu tím (nhấn mạnh) trong tiêu đề

const THOAT: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
export const thoat = (s = '') => String(s).replace(/[&<>"']/g, (c) => THOAT[c]);

/** Đoạn chữ thường: giữ ngắt dòng. */
export const dong = (s = '') => thoat(s).trim().replace(/\r?\n/g, '<br>');

/** Tiêu đề: *...* thành phần nhấn mạnh. `the` = thẻ bọc phần nhấn mạnh. */
export const tieuDe = (s = '', the: 'span' | 'i' = 'span') =>
  dong(s).replace(/\*([^*]+)\*/g, the === 'i' ? '<i>$1</i>' : '<span class="it">$1</span>');

/** Bỏ dấu * để dùng làm chữ thường (thẻ alt, tiêu đề trang...). */
export const chuTron = (s = '') => String(s).replace(/\*/g, '').replace(/\s*\r?\n\s*/g, ' ').trim();

/** Số điện thoại cho đường dẫn tel: */
export const soGoi = (s = '') => String(s).replace(/[^\d+]/g, '');

const THANG = (d: Date) => `Tháng ${d.getMonth() + 1}/${d.getFullYear()}`;
export const ngayThang = (d: Date) => THANG(d);
export const ngayDayDu = (d: Date) =>
  `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
