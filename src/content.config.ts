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

export const collections = { nhanHang, tinTuc, phapLy };
