// Luật chung cho landing theo đợt (/lp/...): cổng từ cấm, ô chờ bổ sung, bảng giá, UTM.
// Cổng chạy lúc dựng web: landing "Đang chạy" mà dính từ cấm / còn ô [Chờ ...] / thiếu giá -> web KHÔNG dựng được,
// trang lỗi không bao giờ lên sóng. Bản "Nháp" chỉ dựng ở bản xem thử (nhánh khác main) hoặc khi chạy với HIEN_NHAP=1.
import bangGia from '../content/trang/bang-gia.json';

// "Không được nói" — lấy từ deck "Website một mối" (30/09/2026). Viết thường, so khớp không phân biệt hoa/thường.
const TU_CAM_CHUNG = [
  'an toàn tuyệt đối', 'tuyệt đối an toàn', 'diệt khuẩn 99', '99,9%', '99.9%',
  'hàng đầu', 'số 1 việt nam', 'tốt nhất', 'da liễu',
];
const TU_CAM_NHAN: Record<string, string[]> = {
  abby: ['jis', 'kháng khuẩn', 'khử khuẩn', 'không hoá chất', 'không hóa chất'],
  ura: ['mùi hôi', 'hàng nhật', 'nhập khẩu', 'jis'],
  spy: ['diệt khuẩn', 'dùng được cho bé'],
};

const chuCua = (x: unknown): string => JSON.stringify(x).toLowerCase();

export function kiemTuCam(nhan: string, noiDung: unknown): string[] {
  const chu = chuCua(noiDung);
  return [...TU_CAM_CHUNG, ...(TU_CAM_NHAN[nhan] ?? [])].filter((t) => chu.includes(t));
}

/** Các ô còn "[Chờ ...]" / "[...]" chưa điền. */
export function oChoBoSung(noiDung: unknown): string[] {
  return [...new Set(JSON.stringify(noiDung).match(/\[[^\]"]{2,}\]/g) ?? [])];
}

export type Gia = { ma: string; ten: string; gia_ban: string; gia_goc: string };
export const layGia = (ma: string): Gia | undefined => bangGia.san_pham.find((g) => g.ma === ma);
export const dongTien = (s: string) => (s ? Number(s).toLocaleString('vi-VN') + 'đ' : '');

/** Gắn UTM vào link sàn để biết đơn đến từ landing nào. */
export function themUtm(url: string, dot: string) {
  if (!url) return '';
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'komlife.com.vn');
    u.searchParams.set('utm_medium', 'landing');
    u.searchParams.set('utm_campaign', dot);
    return u.href;
  } catch { return url; }
}

/** Có dựng bản Nháp không: chỉ ở bản xem thử (nhánh khác main) hoặc khi chạy tay với HIEN_NHAP=1. */
export function choHienNhap() {
  const nhanh = process.env.WORKERS_CI_BRANCH;
  return process.env.HIEN_NHAP === '1' || (!!nhanh && nhanh !== 'main');
}

/** Cổng lên sóng: trả về danh sách lỗi; rỗng = được lên. */
export function congLenSong(ma: string, d: any): string[] {
  const loi: string[] = [];
  const cam = kiemTuCam(d.nhan, d);
  if (cam.length) loi.push(`dính từ cấm: ${cam.join(', ')}`);
  if (d.trang_thai === 'Đang chạy') {
    const cho = oChoBoSung(d);
    if (cho.length) loi.push(`còn ${cho.length} ô chờ bổ sung: ${cho.slice(0, 3).join(' · ')}`);
    for (const g of d.uu_dai?.goi ?? []) {
      const gia = layGia(g.ma_gia);
      if (!gia) loi.push(`mã giá "${g.ma_gia}" không có trong bảng giá chung`);
      else if (!gia.gia_ban) loi.push(`"${gia.ten}" chưa có giá trong bảng giá chung`);
    }
    if (!d.nut_mua?.shopee && !d.nut_mua?.tiktok_shop) loi.push('chưa có link gian hàng chính hãng');
  }
  return loi.map((l) => `Landing /lp/${ma}: ${l}`);
}
