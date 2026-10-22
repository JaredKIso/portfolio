const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Theme toggle: follows the system until the visitor picks one.
const toggle = document.getElementById('theme-toggle');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = () => (root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches);
const syncToggle = () => {
  toggle.querySelector('.ms').textContent = isDark() ? 'light_mode' : 'dark_mode';
  toggle.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
};
toggle.addEventListener('click', () => {
  root.dataset.theme = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  syncToggle();
});
systemDark.addEventListener('change', syncToggle);
syncToggle();

// App bar lifts once the page scrolls.
const appbar = document.querySelector('.appbar');
const onScroll = () => appbar.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Highlight the nav link for the section in view.
const links = [...document.querySelectorAll('.nav a')];
const sections = links.map((a) => document.querySelector(a.getAttribute('href')));
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => navObserver.observe(s));

// Cards rise in as they enter the viewport, staggered within a row.
const reveals = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const siblings = [...e.target.parentElement.children].filter((c) => c.classList.contains('reveal'));
      e.target.style.transitionDelay = `${Math.max(0, siblings.indexOf(e.target)) * 70}ms`;
      e.target.classList.add('is-in');
      e.target.addEventListener('transitionend', () => { e.target.style.transitionDelay = ''; }, { once: true });
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach((el) => io.observe(el));
}

// Material ripple on buttons.
document.querySelectorAll('.btn, .icon-btn').forEach((el) => {
  el.addEventListener('pointerdown', (ev) => {
    if (reduceMotion) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const r = document.createElement('span');
    r.className = 'ripple';
    r.style.width = r.style.height = `${size}px`;
    r.style.left = `${ev.clientX - rect.left - size / 2}px`;
    r.style.top = `${ev.clientY - rect.top - size / 2}px`;
    el.appendChild(r);
    r.addEventListener('animationend', () => r.remove());
  });
});

// Email links: the address is stored reversed in two parts so it never appears in the HTML.
document.querySelectorAll('.js-email').forEach((el) => {
  const flip = (s) => s.split('').reverse().join('');
  const address = `${flip(el.dataset.u)}@${flip(el.dataset.d)}`;
  el.href = `mailto:${address}`;
  el.removeAttribute('target');
  el.removeAttribute('rel');
  if (el.hasAttribute('data-show-address')) el.querySelector('.js-email-text').textContent = address;
});

// Dot on the contact card looks up when the Email button is hovered or focused, and hops in its
// party hat when it's clicked.
const perchDot = document.querySelector('.dot-perch .dot');
const contactEmail = document.querySelector('.contact .js-email');
if (perchDot && contactEmail) {
  const char = perchDot.querySelector('.dot-char');
  let settle;
  const setMood = (mood) => { if (perchDot.dataset.mood !== 'offer') perchDot.dataset.mood = mood; };
  contactEmail.addEventListener('pointerenter', () => setMood('attention'));
  contactEmail.addEventListener('focus', () => setMood('attention'));
  contactEmail.addEventListener('pointerleave', () => setMood('calm'));
  contactEmail.addEventListener('blur', () => setMood('calm'));
  contactEmail.addEventListener('click', () => {
    perchDot.dataset.mood = 'offer';
    char.classList.remove('dot-hop');
    char.getBoundingClientRect(); // restart the hop on repeat clicks
    char.classList.add('dot-hop');
    clearTimeout(settle);
    settle = setTimeout(() => {
      perchDot.dataset.mood = contactEmail.matches(':hover, :focus-visible') ? 'attention' : 'calm';
    }, 2600);
  });
}

// Hide the video caption while it plays.
const video = document.querySelector('.feature__media video');
if (video) {
  const media = video.parentElement;
  video.addEventListener('play', () => media.classList.add('is-playing'));
  video.addEventListener('pause', () => media.classList.remove('is-playing'));
}

document.getElementById('year').textContent = new Date().getFullYear();
