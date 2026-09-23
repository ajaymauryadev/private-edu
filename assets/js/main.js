document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const primaryNavigation = document.querySelector('.primary-navigation');

  if (menuToggle && primaryNavigation) {
    const closeMobileMenu = () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      primaryNavigation.classList.remove('is-open');
      document.body.classList.remove('has-mobile-menu');
    };

    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      const shouldOpen = !isExpanded;

      menuToggle.setAttribute('aria-expanded', String(shouldOpen));
      primaryNavigation.classList.toggle('is-open', shouldOpen);
      document.body.classList.toggle('has-mobile-menu', shouldOpen);
    });

    primaryNavigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && primaryNavigation.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });

    const desktopQuery = window.matchMedia('(min-width: 1026px)');
    const handleDesktopMenuState = (event) => {
      if (event.matches) {
        closeMobileMenu();
      }
    };

    desktopQuery.addEventListener('change', handleDesktopMenuState);
    handleDesktopMenuState(desktopQuery);
  }

  document.querySelectorAll('.announcement-bar a').forEach((link) => {
    link.addEventListener('click', () => {
      if (link.getAttribute('href') === '#') {
        link.setAttribute('href', 'index.html');
      }
    });
  });

  const galleryModal = document.querySelector('[data-gallery-modal]');
  const galleryImage = document.querySelector('[data-gallery-modal-image]');
  const galleryTitle = document.querySelector('[data-gallery-modal-title]');
  const galleryMeta = document.querySelector('[data-gallery-modal-meta]');
  let lastGalleryTrigger = null;

  const closeGalleryModal = () => {
    if (!galleryModal) {
      return;
    }

    galleryModal.hidden = true;
    document.body.classList.remove('has-gallery-modal');

    if (lastGalleryTrigger) {
      lastGalleryTrigger.focus();
    }
  };

  document.querySelectorAll('[data-gallery-trigger]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      if (!galleryModal || !galleryImage || !galleryTitle || !galleryMeta) {
        return;
      }

      lastGalleryTrigger = trigger;
      galleryImage.src = trigger.dataset.gallerySrc;
      galleryImage.alt = trigger.querySelector('img')?.alt || '';
      galleryTitle.textContent = trigger.dataset.galleryTitle || '';
      galleryMeta.textContent = trigger.dataset.galleryMeta || '';
      galleryModal.hidden = false;
      document.body.classList.add('has-gallery-modal');
      galleryModal.querySelector('[data-gallery-close]')?.focus();
    });
  });

  document.querySelectorAll('[data-gallery-close]').forEach((control) => {
    control.addEventListener('click', closeGalleryModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && galleryModal && !galleryModal.hidden) {
      closeGalleryModal();
    }
  });
});
