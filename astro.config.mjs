// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Lớp an toàn: nếu trang quản trị chèn ảnh vào bài viết dạng "/anh/x.jpg" thì đổi về
// đường dẫn tương đối tới src/assets/anh để Astro vẫn tìm thấy và nén ảnh.
function anhTrongBai() {
  const di = (n) => {
    if (n.type === 'image' && typeof n.url === 'string' && n.url.startsWith('/anh/')) {
      n.url = '../../assets/anh/' + n.url.slice(5);
    }
    if (n.children) n.children.forEach(di);
  };
  return (cay) => di(cay);
}

export default defineConfig({
  site: 'https://komlife.com.vn',
  // Địa chỉ dạng /ve-komlife (không có "/" cuối, không đuôi .html) — khớp cách Cloudflare Pages phục vụ
  build: { format: 'file' },
  trailingSlash: 'never',
  markdown: { remarkPlugins: [anhTrongBai] },
  integrations: [
    sitemap({
      filter: (trang) => !trang.includes('/404'),
      serialize: (muc) => {
        if (muc.url !== 'https://komlife.com.vn/') muc.url = muc.url.replace(/\/$/, '');
        return muc;
      },
    }),
  ],
});
