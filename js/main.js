/* ============================================================
   LIAM JUTTEAU – main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = ((i % 5) * 80) + 'ms';
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(el => obs.observe(el));
  }

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 80) cur = s.id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      const match = href && (href.includes('#' + cur) || href.endsWith(cur + '.html'));
      a.classList.toggle('active', !!match && cur !== '');
    });
  }, { passive: true });

  /* ── Mobile burger ── */
  const burger = document.querySelector('.nav-burger');
  const navMenu = document.querySelector('.nav-links');
  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    // Close on link click
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = document.querySelector('.nav')?.offsetHeight || 56;
        window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
      }
    });
  });

});
