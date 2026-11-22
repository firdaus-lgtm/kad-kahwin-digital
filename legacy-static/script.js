document.addEventListener('DOMContentLoaded', () => {
  const coverScreen = document.getElementById('cover-screen');
  const openBtn = document.getElementById('open-invitation-btn');
  const mainContent = document.getElementById('main-content');
  const revealElements = document.querySelectorAll('.reveal');

  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryModal = document.getElementById('gallery-modal');
  const modalImage = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  let hasOpened = false;

  const initScrollReveal = () => {
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -24px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  };

  const openInvitation = () => {
    if (hasOpened) return;
    hasOpened = true;
    openBtn.disabled = true;

    // Mulakan animasi slide-up pada skrin cover
    coverScreen.classList.add('is-sliding-up');

    // Tunjukkan kandungan utama dengan animasi fade-in perlahan
    mainContent.classList.add('is-visible');
    mainContent.setAttribute('aria-hidden', 'false');
    window.scrollTo({ top: 0, behavior: 'auto' });
    initScrollReveal();

    const finishCoverTransition = () => {
      if (!coverScreen.classList.contains('is-hidden')) {
        coverScreen.classList.add('is-hidden');
        coverScreen.setAttribute('aria-hidden', 'true');
      }
    };

    coverScreen.addEventListener(
      'transitionend',
      (event) => {
        if (event.target === coverScreen && event.propertyName === 'transform') {
          finishCoverTransition();
        }
      },
      { once: true }
    );

    // Fallback sekiranya prefers-reduced-motion aktif atau transitionend tidak tercetus
    window.setTimeout(finishCoverTransition, 950);
  };

  if (openBtn && coverScreen && mainContent) {
    openBtn.addEventListener('click', openInvitation);
  }

  // Modal Galeri Interaktif
  const openModal = (src, alt, caption) => {
    if (!galleryModal || !modalImage || !modalCaption) return;
    modalImage.src = src;
    modalImage.alt = alt || caption || 'Gambar majlis';
    modalCaption.textContent = caption || '';
    galleryModal.hidden = false;
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  };

  const closeModal = () => {
    if (!galleryModal || galleryModal.hidden) return;
    galleryModal.hidden = true;
    modalImage.removeAttribute('src');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const fullSrc = item.dataset.full || img?.src || '';
      const caption = item.dataset.caption || '';
      const alt = img?.alt || '';
      if (fullSrc) {
        openModal(fullSrc, alt, caption);
      }
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);

  galleryModal?.addEventListener('click', (event) => {
    if (event.target === galleryModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
});
