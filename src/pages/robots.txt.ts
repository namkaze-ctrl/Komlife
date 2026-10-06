// robots.txt — bật/tắt theo ô "Cho Google tìm thấy web" trong Cài đặt chung.
// Đang chạy thử thì để TẮT (chặn Google). Khi gắn tên miền chính thức thì BẬT.
import type { APIRoute } from 'astro';
import caiDat from '../content/trang/cai-dat.json';

export const GET: APIRoute = ({ site }) => {
  const goc = (site ?? new URL('https://komlife.com.vn')).href.replace(/\/$/, '');
  const noi = caiDat.cho_google_tim_thay
    ? `User-agent: *\nAllow: /\n\nSitemap: ${goc}/sitemap-index.xml\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(noi, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
