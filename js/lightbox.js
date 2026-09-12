/**
 * ZeroNux Portfolio - Lightbox Modal Module
 * Strict Constraints:
 * - ZERO Emojis
 * - Solid flat modal background (No glassmorphism, no backdrop blur)
 * - Keyboard navigation (Esc, ArrowLeft, ArrowRight)
 * - Mobile Touch/Swipe gestures
 */

(function () {
  'use strict';

  const Lightbox = {
    modal: null,
    img: null,
    title: null,
    counter: null,
    closeBtn: null,
    prevBtn: null,
    nextBtn: null,
    currentGalleryKey: null,
    currentIndex: 0,
    galleries: {},

    registerGalleries(data) {
      this.galleries = data || {};
    },

    isInitialized: false,

    init() {
      if (this.isInitialized) return;
      this.isInitialized = true;

      this.modal = document.getElementById('lightboxModal');
      this.img = document.getElementById('lightboxImg');
      this.title = document.getElementById('lightboxTitle');
      this.counter = document.getElementById('lightboxCounter');
      this.closeBtn = document.getElementById('lightboxCloseBtn');
      this.prevBtn = document.getElementById('lightboxPrevBtn');
      this.nextBtn = document.getElementById('lightboxNextBtn');

      if (!this.modal) return;

      this.closeBtn?.addEventListener('click', () => this.close());
      this.prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.prev();
      });
      this.nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        this.next();
      });

      // Close when clicking modal backdrop outside image
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal || e.target.id === 'lightboxBody') {
          this.close();
        }
      });

      // Keyboard Controls
      window.addEventListener('keydown', (e) => {
        if (!this.modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
          this.close();
        } else if (e.key === 'ArrowLeft') {
          this.prev();
        } else if (e.key === 'ArrowRight') {
          this.next();
        }
      });

      // Mobile Touch & Swipe Support
      let startX = 0;
      let startY = 0;

      this.modal.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });

      this.modal.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - startX;
        const diffY = endY - startY;

        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            this.next();
          } else {
            this.prev();
          }
        }
      }, { passive: true });
    },

    open(galleryKey, index = 0) {
      if (!this.galleries[galleryKey]) return;
      this.currentGalleryKey = galleryKey;
      this.currentIndex = index;
      this.update();
      this.modal.classList.add('active');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    close() {
      if (!this.modal) return;
      this.modal.classList.remove('active');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    },

    next() {
      const currentGallery = this.galleries[this.currentGalleryKey];
      if (!currentGallery) return;
      this.currentIndex = (this.currentIndex + 1) % currentGallery.images.length;
      this.update();
    },

    prev() {
      const currentGallery = this.galleries[this.currentGalleryKey];
      if (!currentGallery) return;
      this.currentIndex = (this.currentIndex - 1 + currentGallery.images.length) % currentGallery.images.length;
      this.update();
    },

    update() {
      const currentGallery = this.galleries[this.currentGalleryKey];
      if (!currentGallery) return;

      const total = currentGallery.images.length;
      const src = currentGallery.images[this.currentIndex];

      if (this.img) {
        this.img.src = src;
        this.img.alt = `${currentGallery.title} preview screenshot ${this.currentIndex + 1}`;
      }
      if (this.title) {
        this.title.textContent = currentGallery.title;
      }
      if (this.counter) {
        this.counter.textContent = `${this.currentIndex + 1} / ${total}`;
      }
    }
  };

  // Export to global window namespace
  window.ZeroNuxLightbox = Lightbox;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Lightbox.init());
  } else {
    Lightbox.init();
  }
})();
