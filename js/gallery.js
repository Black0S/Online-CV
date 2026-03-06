/* ============================================================
   LIAM JUTTEAU – gallery.js  (lightbox)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const items    = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lb-img');
  const lbClose  = document.getElementById('lb-close');
  const lbPrev   = document.getElementById('lb-prev');
  const lbNext   = document.getElementById('lb-next');
  const lbCount  = document.getElementById('lb-counter');

  if (!lightbox || !items.length) return;

  const srcs   = Array.from(items).map(el => el.querySelector('img')?.src).filter(Boolean);
  const alts   = Array.from(items).map(el => el.querySelector('img')?.alt || '');
  let current  = 0;

  function openAt(idx) {
    current = idx;
    lbImg.src = srcs[current];
    lbImg.alt = alts[current];
    lbCount.textContent = (current + 1) + ' / ' + srcs.length;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() { openAt((current - 1 + srcs.length) % srcs.length); }
  function next() { openAt((current + 1) % srcs.length); }

  items.forEach((item, i) => item.addEventListener('click', () => openAt(i)));
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape')     close();
  });

  /* touch swipe */
  let startX = 0;
  lightbox.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  }, { passive: true });
});
