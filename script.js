/* ---------- theme ---------- */
(function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));
})();

document.getElementById('themeToggle').addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ---------- mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- nav shadow on scroll ---------- */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

/* ---------- reveal on scroll ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- experience filters ---------- */
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');

filters.forEach((btn) => {
  btn.addEventListener('click', () => {
    filters.forEach((f) => f.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const match = filter === 'all' || card.dataset.tags.split(' ').includes(filter);
      card.classList.toggle('is-hidden', !match);
    });
  });
});

/* ---------- active section in nav ---------- */
const sections = document.querySelectorAll('section[id]');
const linkFor = new Map(
  [...navLinks.querySelectorAll('a')].map((a) => [a.getAttribute('href').slice(1), a])
);

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = linkFor.get(entry.target.id);
    if (!link) return;
    if (entry.isIntersecting) {
      linkFor.forEach((a) => a.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });

sections.forEach((s) => sectionObserver.observe(s));

/* ---------- footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

