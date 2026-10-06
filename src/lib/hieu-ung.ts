// Hiệu ứng và tương tác chạy trên trình duyệt — chuyển từ bản dựng trên Vercel (demo-B, 06/10/2026).
// Luật cũ giữ nguyên: hiệu ứng ≤0,45s, tôn trọng người dùng chọn "giảm chuyển động".

const diu = matchMedia('(prefers-reduced-motion: reduce)');

function wireThanhCuon() {
  const nav = document.getElementById('nav');
  const dlbar = document.getElementById('dlbar');
  const coHero = document.body.dataset.hero === '1';
  const capNhat = () => {
    nav?.classList.toggle('solid', scrollY > (coHero ? 90 : 20));
    if (!dlbar) return;
    // thanh dính đáy: chỉ hiện khi khách đã cuộn qua phần đầu (ẩn hẳn ở trang đại lý)
    const hien = scrollY > (coHero ? innerHeight * 0.8 : 420);
    dlbar.classList.toggle('hien', hien);
    dlbar.setAttribute('aria-hidden', hien ? 'false' : 'true');
    document.body.classList.toggle('co-bar', hien);
  };
  addEventListener('scroll', capNhat, { passive: true });
  capNhat();
}

function wireMenu() {
  const btn = document.getElementById('navbtn');
  const ds = document.getElementById('navlinks');
  btn?.addEventListener('click', () => {
    btn.setAttribute('aria-expanded', ds?.classList.toggle('open') ? 'true' : 'false');
  });
}

/* Mẫu đăng ký / liên hệ.
   - Có "Mã nhận form" (Web3Forms) trong Cài đặt chung -> gửi thẳng về hòm thư, báo thành công.
   - Chưa có mã -> mở sẵn thư gửi về hòm kinh doanh, khách chỉ việc bấm Gửi. */
function wireForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((f) => {
    f.addEventListener('submit', async (e) => {
      e.preventDefault();
      const tieuDe = f.dataset.tieude || 'Liên hệ từ website Komlife';
      const hom = f.dataset.email || '';
      const ma = f.dataset.ma || '';
      const ok = f.querySelector('[data-ok]');
      const loi = f.querySelector('[data-loi]');
      const dong: string[] = [];
      const duLieu: Record<string, string> = {};
      f.querySelectorAll<HTMLInputElement>('input,select,textarea').forEach((o) => {
        if (!o.value || !o.value.trim() || o.name === 'botcheck') return;
        const nhan = f.querySelector(`label[for="${o.id}"]`)?.textContent?.trim() || o.id;
        dong.push(`${nhan}: ${o.value.trim()}`);
        duLieu[nhan] = o.value.trim();
      });
      if (ma) {
        const nut = f.querySelector<HTMLButtonElement>('button[type=submit]');
        if (nut) nut.disabled = true;
        try {
          const r = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ access_key: ma, subject: tieuDe, from_name: 'Website Komlife', ...duLieu,
              botcheck: (f.querySelector<HTMLInputElement>('input[name=botcheck]')?.checked) || false }),
          });
          const kq = await r.json();
          if (!kq.success) throw new Error(kq.message);
          ok?.classList.add('on'); loi?.classList.remove('on'); f.reset();
        } catch {
          loi?.classList.add('on');
        } finally {
          if (nut) nut.disabled = false;
        }
        return;
      }
      dong.push('', '— Gửi từ website Komlife —');
      location.href = `mailto:${hom}?subject=${encodeURIComponent(tieuDe)}&body=${encodeURIComponent(dong.join('\n'))}`;
      ok?.classList.add('on');
    });
  });
}

// hero vào theo nhịp — chờ trình duyệt vẽ xong khung đầu rồi mới chạy
function moManHero() {
  const h = document.querySelector('.hero');
  if (h) requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add('san')));
}

// ảnh tràn viền trôi chậm hơn nội dung — tạo chiều sâu
function wireParallax() {
  if (diu.matches || innerWidth < 900) return;
  const els = [...document.querySelectorAll<HTMLElement>('.tran>img, .tran>picture>img')];
  if (!els.length) return;
  let cho = false;
  const chay = () => {
    if (cho) return; cho = true;
    requestAnimationFrame(() => {
      cho = false;
      for (const im of els) {
        const r = im.closest('.tran')!.getBoundingClientRect();
        if (r.bottom < -200 || r.top > innerHeight + 200) continue;
        const k = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
        im.style.transform = `translate3d(0,${(k * 34).toFixed(1)}px,0) scale(1.12)`;
      }
    });
  };
  addEventListener('scroll', chay, { passive: true }); chay();
}

// nút chính hút nhẹ theo con trỏ
function wireNutHut() {
  if (diu.matches || !matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.tu').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.14).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * 0.2).toFixed(1)}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

// dòng thời gian: mốc nào vào giữa màn thì sáng lên
function wireMoc() {
  const ms = document.querySelectorAll('.moc'); if (!ms.length) return;
  if (diu.matches) { ms.forEach((m) => m.classList.add('roi')); return; }
  const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle('roi', e.isIntersecting)),
    { rootMargin: '-38% 0px -38% 0px' });
  ms.forEach((m) => io.observe(m));
}

// đếm số chạy lên — con số là thứ đại lý đọc đầu tiên
function demSo(el: HTMLElement) {
  const goc = el.dataset.n || el.textContent || '';
  const dich = parseInt(goc.replace(/\D/g, ''), 10);
  if (!dich || diu.matches) return;
  const t0 = performance.now(), dai = 1100;
  el.textContent = '0';
  requestAnimationFrame(function buoc(t) {
    const k = Math.min(1, (t - t0) / dai), m = 1 - Math.pow(1 - k, 3);
    el.textContent = Math.round(dich * m).toLocaleString('vi-VN');
    if (k < 1) requestAnimationFrame(buoc); else el.textContent = goc;
  });
}

function wireHienDan() {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.classList.contains('count')) demSo(e.target as HTMLElement);
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll<HTMLElement>('.rv').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });
  document.querySelectorAll('.eb,.count,.ncc').forEach((el) => io.observe(el));
}

// quầng sáng đi theo con trỏ (chỉ máy có chuột thật)
function wireGlow() {
  if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.querySelectorAll<HTMLElement>('.fx-glow').forEach((el) => {
    el.addEventListener('pointermove', (ev) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${(((ev.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
      el.style.setProperty('--my', `${(((ev.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
    });
  });
}

/* bấm giấy chứng nhận → phóng to */
function wirePhongTo() {
  const lb = document.getElementById('lb');
  const lbimg = document.getElementById('lbimg') as HTMLImageElement | null;
  if (!lb || !lbimg) return;
  document.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-lb]');
    if (b) { lbimg.src = b.dataset.lb || ''; lbimg.alt = b.getAttribute('aria-label') || ''; lb.classList.add('on'); return; }
    if ((e.target as HTMLElement).closest('#lb')) lb.classList.remove('on');
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('on'); });
}

export function khoiDong() {
  document.documentElement.classList.add('has-js');
  wireThanhCuon(); wireMenu(); wireForms(); wireHienDan(); wireGlow();
  moManHero(); wireParallax(); wireNutHut(); wireMoc(); wirePhongTo();
}
