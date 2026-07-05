/* =========================================================================
   Lubna Alsinawi Portfolio — shared behaviour
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    }));
  }

  /* ---------- Mark active nav link ---------- */
  const current = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Count-up stats ---------- */
  const stats = document.querySelectorAll('[data-count-to]');
  if (stats.length) {
    const animateCount = (el) => {
      const target = parseInt(el.getAttribute('data-count-to'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if ('IntersectionObserver' in window) {
      const statIo = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statIo.unobserve(entry.target);
          }
        });
      }, { threshold: 0.6 });
      stats.forEach(el => statIo.observe(el));
    } else {
      stats.forEach(animateCount);
    }
  }

  /* ---------- Broken / missing image → styled placeholder ----------
     Every photo lives inside a .photo-frame with a data-label describing
     what should be dropped in at assets/images/. If the file is missing
     (as with this template) we show a calm placeholder instead of a
     broken-image icon. Replace the images and this silently disappears. */
  document.querySelectorAll('.photo-frame img').forEach(img => {
    const frame = img.closest('.photo-frame');
    const markPlaceholder = () => frame && frame.classList.add('is-placeholder');
    if (!img.getAttribute('src')) { markPlaceholder(); return; }
    img.addEventListener('error', markPlaceholder, { once: true });
    if (img.complete && img.naturalWidth === 0) markPlaceholder();
  });

  /* ---------- Portfolio: filter + modal ---------- */
  const artGrid = document.querySelector('.art-grid');
  if (artGrid) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.art-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-filter');
        cards.forEach(card => {
          const match = cat === 'all' || card.getAttribute('data-category') === cat;
          card.style.display = match ? '' : 'none';
        });
      });
    });

    const modalBackdrop = document.getElementById('art-modal');
    const modalImg = modalBackdrop.querySelector('[data-modal-img]');
    const modalFrame = modalBackdrop.querySelector('.photo-frame');
    const modalTag = modalBackdrop.querySelector('[data-modal-tag]');
    const modalTitle = modalBackdrop.querySelector('[data-modal-title]');
    const modalFacts = modalBackdrop.querySelector('[data-modal-facts]');
    const modalDesc = modalBackdrop.querySelector('[data-modal-desc]');
    const modalClose = modalBackdrop.querySelector('.modal-close');

    const openModal = (card) => {
      const d = card.dataset;
      modalTag.textContent = d.category;
      modalTitle.textContent = d.title;
      modalFacts.innerHTML =
        (d.medium ? `<span><b>Medium</b> ${d.medium}</span>` : '') +
        (d.dimensions ? `<span><b>Size</b> ${d.dimensions}</span>` : '') +
        (d.year ? `<span><b>Year</b> ${d.year}</span>` : '');
      modalDesc.textContent = d.description || '';
      modalFrame.classList.remove('is-placeholder');
      modalImg.setAttribute('alt', d.title || '');
      modalImg.setAttribute('src', d.image || '');
      if (!d.image) {
        modalFrame.classList.add('is-placeholder');
      } else {
        modalImg.onerror = () => modalFrame.classList.add('is-placeholder');
      }
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    cards.forEach(card => card.addEventListener('click', () => openModal(card)));
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  }

});
