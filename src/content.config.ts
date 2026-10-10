// Ba nhóm nội dung có nhiều mục: nhãn hàng, tin tức, trang chính sách.
// Nội dung một trang đơn (trang chủ, về Komlife...) nằm ở src/content/trang/*.json và được đọc thẳng.
// Kiểu dữ liệu để "dễ dãi" (phần lớn không bắt buộc) — nhân viên sửa thiếu một ô thì web vẫn dựng được.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const muiHuong = z.object({ ten: z.string(), mo_ta: z.string().optional().default('') });
const sanPham = z.object({
  ten: z.string(),
  anh: z.string().optional().default(''),
  tinh_trang: z.string().optional().default('Đang bán'),
  dung_tich: z.string().optional().default(''),
  cong_dung: z.string().optional().default(''),
  mo_ta: z.string().optional().default(''),
  mui_huong: z.array(muiHuong).optional().default([]),
});

const nhanHang = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/nhan-hang' }),
  schema: z.object({
    thu_tu: z.number().optional().default(99),
    ten: z.string(),
    nganh: z.string().optional().default(''),
    cau_ngan: z.string().optional().default(''),
    cau_dinh_vi: z.string().optional().default(''),
    mo_ta: z.string().optional().default(''),
    cau_chuyen: z.string().optional().default(''),
    danh_cho: z.string().optional().default(''),
    anh_the_doc: z.string().optional().default(''),
    anh_bia: z.string().optional().default(''),
    tiktok: z.string().optional().default(''),
    san_pham: z.array(sanPham).optional().default([]),
    tinh_huong: z.object({
      tieu_de: z.string().optional().default(''),
      mo_ta: z.string().optional().default(''),
      danh_sach: z.array(z.object({ ten: z.string(), mo_ta: z.string().optional().default('') })).optional().default([]),
    }).optional().default({}),
    hoi_dap: z.array(z.object({ hoi: z.string(), dap: z.string().optional().default('') })).optional().default([]),
  }),
});

const tinTuc = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/tin-tuc' }),
  schema: z.object({
    tieu_de: z.string(),
    chuyen_muc: z.enum(['tin-doanh-nghiep', 'tin-thi-truong']).default('tin-doanh-nghiep'),
    ngay: z.coerce.date(),
    anh_dai_dien: z.string().optional().default(''),
    tom_tat: z.string().optional().default(''),
    noi_bat: z.boolean().optional().default(false),
    nhap: z.boolean().optional().default(false),
  }),
});

const phapLy = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/phap-ly' }),
  schema: z.object({
    tieu_de: z.string(),
    mo_ta: z.string().optional().default(''),
    cap_nhat: z.string().optional().default(''),
  }),
});


// Landing theo đợt (tầng 3): /lp/<tên file>. Khuôn 7 khối, mỗi nhãn chỉ đổi màu + chữ + ảnh.
// Chữ đặt trong ngoặc vuông "[Chờ ...]" = ô chờ bổ sung: hiện vàng ở bản nháp, và CHẶN không cho lên sóng.
const muc = z.object({ ten: z.string(), mo_ta: z.string().optional().default('') });
const landing = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/landing' }),
  schema: z.object({
    nhan: z.string(),
    ten_dot: z.string(),
    duong_dan: z.string().optional().default(''),
    trang_thai: z.enum(['Nháp', 'Đang chạy', 'Hết đợt']).default('Nháp'),
    bo_cuc: z.enum(['Dài', 'Danh mục sản phẩm']).default('Dài'),
    ngay_bat_dau: z.string().optional().default(''),
    ngay_ket_thuc: z.string().optional().default(''),
    mau: z.object({
      chinh: z.string().optional().default('#212b7e'),
      nhan: z.string().optional().default('#3fc2cf'),
      nen: z.string().optional().default('#F1F2F9'),
      nut: z.string().optional().default('#212b7e'),
      nut_re: z.string().optional().default('#3fc2cf'),
    }).optional().default({}),
    mo_dau: z.object({
      nhan_nho: z.string().optional().default(''),
      tieu_de: z.string(),
      mo_ta: z.string().optional().default(''),
      anh: z.string().optional().default(''),
      anh_phu: z.string().optional().default(''),
    }),
    san_pham: z.object({
      tieu_de: z.string().optional().default(''),
      ten: z.string().optional().default(''),
      mo_ta: z.string().optional().default(''),
      anh: z.string().optional().default(''),
      thong_so: z.array(z.object({ ten: z.string(), gia_tri: z.string().optional().default('') })).optional().default([]),
      cong_dung: z.array(muc).optional().default([]),
      mui_huong: z.array(muc).optional().default([]),
      cach_dung: z.string().optional().default(''),
    }).optional().default({}),
    bang_chung: z.object({
      tieu_de: z.string().optional().default(''),
      mo_ta: z.string().optional().default(''),
      danh_sach: z.array(z.object({ ten: z.string(), mo_ta: z.string().optional().default(''), nguon: z.string().optional().default('') })).optional().default([]),
    }).optional().default({}),
    dung_luc_nao: z.object({
      tieu_de: z.string().optional().default(''),
      danh_sach: z.array(muc).optional().default([]),
      mui_huong: z.array(muc).optional().default([]),
    }).optional().default({}),
    review: z.object({
      tieu_de: z.string().optional().default(''),
      danh_sach: z.array(z.object({ noi_dung: z.string(), ten: z.string().optional().default(''), nguon: z.string().optional().default(''), link: z.string().optional().default('') })).optional().default([]),
    }).optional().default({}),
    uu_dai: z.object({
      tieu_de: z.string().optional().default(''),
      mo_ta: z.string().optional().default(''),
      goi: z.array(z.object({ ma_gia: z.string(), ten: z.string().optional().default(''), ghi_chu: z.string().optional().default('') })).optional().default([]),
      dieu_kien: z.string().optional().default(''),
    }).optional().default({}),
    nut_mua: z.object({
      shopee: z.string().optional().default(''),
      tiktok_shop: z.string().optional().default(''),
    }).optional().default({}),
    hoi_dap: z.array(z.object({ hoi: z.string(), dap: z.string().optional().default('') })).optional().default([]),
    nguoi_soat: z.string().optional().default(''),
  }),
});


// Sản phẩm chi tiết từng nhãn: /nhan-hang/<nhãn>/<mã>. File: src/content/san-pham/<nhãn>-<mã>.json
const sanPhamCt = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/san-pham' }),
  schema: z.object({
    nhan: z.string(),
    ma: z.string(),
    thu_tu: z.number().optional().default(99),
    trang_thai: z.enum(['Nháp', 'Đang bán', 'Ngừng bán']).default('Nháp'),
    ten: z.string(),
    ten_dong: z.string().optional().default(''),
    cau_ngan: z.string().optional().default(''),
    mau: z.string().optional().default('#212b7e'),
    mau_nhat: z.string().optional().default('#F1F2F9'),
    anh: z.array(z.string()).optional().default([]),
    mo_ta: z.string().optional().default(''),
    phien_ban: z.array(z.object({ ten: z.string(), ma_gia: z.string().optional().default(''), ghi_chu: z.string().optional().default('') })).optional().default([]),
    thong_so: z.array(z.object({ ten: z.string(), gia_tri: z.string().optional().default('') })).optional().default([]),
    cong_dung: z.array(muc).optional().default([]),
    dung_luc_nao: z.array(muc).optional().default([]),
    cach_dung: z.string().optional().default(''),
    shopee: z.string().optional().default(''),
    tiktok_shop: z.string().optional().default(''),
  }),
});

export const collections = { nhanHang, tinTuc, phapLy, landing, sanPhamCt };
