// Song ngữ (thử nghiệm): trang tiếng Anh nằm dưới /en/. Chữ tiếng Anh ở src/content/trang/en.json,
// cùng cấu trúc với file tiếng Việt nhưng chỉ chứa phần chữ; ô nào không có thì dùng bản tiếng Việt.
import en from '../content/trang/en.json';
import tcVi from '../content/trang/trang-chu.json';
import vkVi from '../content/trang/ve-komlife.json';
import { khoiChung, caiDat } from './noi-dung';

export const laEn = (url: URL) => /^\/en(\/|\.html$|$)/.test(url.pathname);

/** Ghép bản dịch lên bản gốc: object ghép theo khoá, mảng ghép theo vị trí, ô trống giữ bản gốc. */
export function tron<T>(goc: T, phu: unknown): T {
  if (phu === undefined || phu === null || phu === '') return goc;
  if (Array.isArray(goc) && Array.isArray(phu)) return goc.map((x, i) => tron(x, phu[i])) as T;
  if (goc && typeof goc === 'object' && phu && typeof phu === 'object' && !Array.isArray(phu)) {
    const o: any = { ...goc };
    for (const [k, v] of Object.entries(phu)) o[k] = tron((goc as any)[k], v);
    return o;
  }
  return phu as T;
}

/** Bộ nội dung theo ngôn ngữ của trang đang dựng. */
export function noiDung(url: URL) {
  const E = laEn(url);
  return {
    E,
    tc: E ? tron(tcVi, en.trang_chu) : tcVi,
    vk: E ? tron(vkVi, en.ve_komlife) : vkVi,
    kc: E ? tron(khoiChung, en.khoi_chung) : khoiChung,
    cd: E ? tron(caiDat, en.cai_dat) : caiDat,
    ui: en.giao_dien,
    nhanEn: en.nhan_hang as Record<string, { cau_ngan?: string }>,
    /** chọn chữ theo ngôn ngữ */
    t: (vi: string, eng: string) => (E ? eng : vi),
  };
}
