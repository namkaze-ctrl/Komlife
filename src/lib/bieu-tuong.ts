// Biểu tượng nét mảnh dùng trong dải số liệu, khối quy trình, khối đồng hành.
// Trang quản trị chọn biểu tượng theo tên (ô "Biểu tượng").
export const BIEU_TUONG: Record<string, string> = {
  khien: '<svg viewBox="0 0 24 24"><path d="M12 2.4 4.4 5.5v6c0 4.6 3.2 8.6 7.6 10 4.4-1.4 7.6-5.4 7.6-10v-6z"/><path d="m8.7 11.8 2.4 2.4 4.2-4.7"/></svg>',
  nhamay: '<svg viewBox="0 0 24 24"><path d="M2.4 20.6h19.2"/><path d="M4.3 20.6V9.7l5 3v-3l5 3V6.1h5.4v14.5"/><path d="M16.8 11.2h1.6M16.8 15h1.6"/></svg>',
  sanpham: '<svg viewBox="0 0 24 24"><rect x="3.2" y="9.4" width="17.6" height="11.2" rx="1.5"/><path d="M3.2 13.7h17.6"/><path d="M8.4 9.4V6.8a1.6 1.6 0 0 1 1.6-1.6h4a1.6 1.6 0 0 1 1.6 1.6v2.6"/><path d="M8.8 17.3h2M13.2 17.3h2"/></svg>',
  ghim: '<svg viewBox="0 0 24 24"><path d="M12 21.6s7-6.2 7-11.2a7 7 0 1 0-14 0c0 5 7 11.2 7 11.2z"/><circle cx="12" cy="10.2" r="2.7"/></svg>',
  binh: '<svg viewBox="0 0 24 24"><path d="M9.6 3.2h4.8M10.6 3.2v6.2l-4.8 8.3a2 2 0 0 0 1.7 3h9a2 2 0 0 0 1.7-3l-4.8-8.3V3.2"/><path d="M8.2 14.8h7.6"/></svg>',
  banhrang: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.6v2.8M12 18.6v2.8M21.4 12h-2.8M5.4 12H2.6M18.6 5.4l-2 2M7.4 16.6l-2 2M18.6 18.6l-2-2M7.4 7.4l-2-2"/></svg>',
  kiemtra: '<svg viewBox="0 0 24 24"><rect x="4.6" y="4.2" width="14.8" height="17" rx="1.8"/><path d="M9 4.2V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1.2z"/><path d="m8.9 13.2 2.1 2.1 4-4.4"/></svg>',
  chungnhan: '<svg viewBox="0 0 24 24"><circle cx="12" cy="9.4" r="5.6"/><path d="m8.6 14.2-1.2 7 4.6-2.4 4.6 2.4-1.2-7"/><path d="m10.2 9.3 1.4 1.4 2.4-2.7"/></svg>',
  hop: '<svg viewBox="0 0 24 24"><path d="m12 2.8 8.4 4.2v10L12 21.2 3.6 17V7z"/><path d="m3.6 7 8.4 4.2L20.4 7M12 11.2v10"/></svg>',
  the: '<svg viewBox="0 0 24 24"><path d="M20.4 12.6 12.8 20a2 2 0 0 1-2.8 0l-6.6-6.6a2 2 0 0 1-.6-1.4V4.6a2 2 0 0 1 2-2h7.4a2 2 0 0 1 1.4.6l6.8 6.8a2 2 0 0 1 0 2.6z"/><circle cx="8" cy="8" r="1.5"/></svg>',
  hotro: '<svg viewBox="0 0 24 24"><path d="M4.4 15.4v-3.6a7.6 7.6 0 0 1 15.2 0v3.6"/><rect x="2.6" y="13.6" width="4" height="6" rx="1.8"/><rect x="17.4" y="13.6" width="4" height="6" rx="1.8"/><path d="M19.6 19.6a3 3 0 0 1-3 2.4H13"/></svg>',
  dongh: '<svg viewBox="0 0 24 24"><path d="M12 20.6S3.8 15.4 3.8 9.7a4.4 4.4 0 0 1 8.2-2.2 4.4 4.4 0 0 1 8.2 2.2c0 5.7-8.2 10.9-8.2 10.9z"/></svg>',
  swash: '<svg viewBox="0 0 74 13" preserveAspectRatio="none"><path d="M1.5 9.8C9 4 17 2.2 25.5 5.4S42 11.6 50 8.2s15-5.6 22.5-2.4"/></svg>',
};
export const bieuTuong = (ten?: string) => BIEU_TUONG[ten || ''] || BIEU_TUONG.khien;
