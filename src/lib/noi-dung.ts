// Đọc nội dung các trang đơn (src/content/trang/*.json) và các nhóm nhiều mục.
import caiDat from '../content/trang/cai-dat.json';
import khoiChung from '../content/trang/khoi-chung.json';
import { getCollection } from 'astro:content';

export { caiDat, khoiChung };

/** 5 nhãn hàng, xếp theo ô "Thứ tự". Mã nhãn = tên file (spy, ura...). */
export async function layNhanHang() {
  const ds = await getCollection('nhanHang');
  return ds.map((x) => ({ ma: x.id, ...x.data })).sort((a, b) => a.thu_tu - b.thu_tu);
}

/** Tin đã đăng (bỏ bài đang để Nháp), mới nhất trước. */
export async function layTinDaDang() {
  const ds = await getCollection('tinTuc', (x) => !x.data.nhap);
  return ds.sort((a, b) => b.data.ngay.getTime() - a.data.ngay.getTime());
}

export const duongDanTin = (t: { id: string; data: { chuyen_muc: string } }) =>
  `/tin-tuc/${t.data.chuyen_muc}/${t.id}`;

/** 3 tin cho trang chủ: bài đánh dấu Nổi bật trước, thiếu thì lấy bài mới nhất. */
export async function layTinTrangChu(soLuong = 3) {
  const ds = await layTinDaDang();
  const noiBat = ds.filter((t) => t.data.noi_bat);
  const conLai = ds.filter((t) => !t.data.noi_bat);
  return [...noiBat, ...conLai].slice(0, soLuong);
}
