/* Blaine's Motor Supply — interactions */

(function () {
  'use strict';

  // ---------- Year ----------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Mobile nav ----------
  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('nav-mobile');

  if (toggle && header) {
    toggle.addEventListener('click', function () {
      var open = header.classList.toggle('is-menu-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
  }

  // Close mobile nav when clicking a link
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('is-menu-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------- Header shadow on scroll ----------
  var scrolled = false;
  function onScroll() {
    var isScrolled = window.scrollY > 6;
    if (isScrolled !== scrolled) {
      scrolled = isScrolled;
      header.classList.toggle('is-scrolled', isScrolled);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Contact form (demo) ----------
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  if (form && note) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // basic client-side check
      var name  = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      var msg   = form.querySelector('[name="message"]');
      if (!name.value.trim() || !email.value.trim() || !msg.value.trim()) {
        note.textContent = 'Please fill the required fields (name, email, message).';
        note.style.color = '#ff7a7a';
        return;
      }
      form.classList.add('submitted');
      note.innerHTML = 'Thanks — your inquiry is ready to send. (Demo: wire this to email or a form handler.)';
      form.reset();
    });
  }

  // ---------- Reveal on scroll ----------
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (entry.target.dataset.delay || '0') + 'ms';
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.section-head, .capability, .service, .mfg-col, .badge, .about-visual')
      .forEach(function (el, i) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.dataset.delay = (i % 6) * 60;
        io.observe(el);
      });

    var style = document.createElement('style');
    style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
  }
})();
