// Màu đại diện sản phẩm: giữ ĐÚNG mã màu cho thanh màu / nút / viền; riêng CHỮ thì tự chọn màu đọc được
// (chuẩn tương phản 4,5:1). Ví dụ #45c7ef rất sáng: chữ trắng trên nền này chỉ ~2:1 -> dùng chữ đậm.
const rgb = (hex: string) => {
  const h = hex.replace('#', '');
  const f = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  return [0, 2, 4].map((i) => parseInt(f.slice(i, i + 2), 16));
};
const toHex = (c: number[]) => '#' + c.map((x) => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, '0')).join('');
const kenh = (v: number) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const doSang = (hex: string) => { const [r, g, b] = rgb(hex).map(kenh); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
export const tuongPhan = (a: string, b: string) => {
  const [x, y] = [doSang(a), doSang(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

/** Làm đậm dần (giữ sắc độ) đến khi đọc được trên nền trắng. */
export function chuDocDuoc(hex: string, nen = '#ffffff', muc = 4.5) {
  let c = rgb(hex);
  for (let i = 0; i < 40 && tuongPhan(toHex(c), nen) < muc; i++) c = c.map((x) => x * 0.94);
  return toHex(c);
}

/** Chữ đặt trên nền màu này: trắng nếu đủ rõ, không thì xanh rất đậm. */
export const chuTrenNen = (hex: string) => (tuongPhan('#ffffff', hex) >= 4.5 ? '#ffffff' : '#10233A');

/** Chuỗi biến CSS cho một sản phẩm. */
export const mauSanPham = (mau: string, nhat: string) =>
  `--sp:${mau};--sp-nhat:${nhat};--sp-chu:${chuDocDuoc(mau)};--sp-tren:${chuTrenNen(mau)}`;
