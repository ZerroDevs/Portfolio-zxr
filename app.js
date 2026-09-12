/**
 * ZeroNux Portfolio - Interactive Logic
 * Features:
 * - Touch & Swipe-enabled Project Carousels
 * - Accessible Full-Screen Lightbox with keyboard & touch navigation
 * - Discord Username Click-to-Copy with visual tooltip
 * - Active Section Scroll Spy & Smooth Scrolling
 * 
 * Strict Constraint: ZERO EMOJIS anywhere.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Image Data Registry for Projects & Lightbox
  // --------------------------------------------------------------------------
  const projectGalleries = {
    'ytdlp': {
      title: 'yt-dlp-downloader',
      images: [
        'ydlp/1.png',
        'ydlp/2.png',
        'ydlp/3.png',
        'ydlp/4.png',
        'ydlp/5.png',
        'ydlp/6.png'
      ]
    },
    'new-desginv2': {
      title: 'New-Desginv2 Store',
      images: [
        'New-Desginv2/1.png',
        'New-Desginv2/2.png',
        'New-Desginv2/3.png',
        'New-Desginv2/4.png'
      ]
    },
    'zeronux-store': {
      title: 'ZeroNux Store',
      images: [
        'ZeroNux-Store/1.png',
        'ZeroNux-Store/2.png',
        'ZeroNux-Store/3.png'
      ]
    },
    'luckywheel': {
      title: 'LuckyWheel',
      images: [
        'LuckyWheel/1.png',
        'LuckyWheel/2.png',
        'LuckyWheel/3.png',
        'LuckyWheel/4.png'
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 2. Lightbox Controller
  // --------------------------------------------------------------------------
  const lightbox = {
    modal: document.getElementById('lightboxModal'),
    img: document.getElementById('lightboxImage'),
    title: document.getElementById('lightboxTitle'),
    counter: document.getElementById('lightboxCounter'),
    prevBtn: document.getElementById('lightboxPrev'),
    nextBtn: document.getElementById('lightboxNext'),
    closeBtn: document.getElementById('lightboxClose'),
    
    currentGalleryKey: null,
    currentIndex: 0,
    isOpen: false,
    lastActiveElement: null,

    init() {
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

      // Close on background backdrop click
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal || e.target.classList.contains('lightbox-body') || e.target.classList.contains('lightbox-image-container')) {
          this.close();
        }
      });

      // Keyboard Controls
      window.addEventListener('keydown', (e) => {
        if (!this.isOpen) return;

        if (e.key === 'Escape') {
          this.close();
        } else if (e.key === 'ArrowLeft') {
          this.prev();
        } else if (e.key === 'ArrowRight') {
          this.next();
        }
      });

      // Touch / Swipe Navigation inside Lightbox
      let touchStartX = 0;
      let touchStartY = 0;

      this.modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      this.modal.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Ensure horizontal intent and minimum swipe threshold
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            this.next();
          } else {
            this.prev();
          }
        }
      }, { passive: true });
    },

    open(galleryKey, index = 0) {
      const gallery = projectGalleries[galleryKey];
      if (!gallery || !gallery.images.length) return;

      this.lastActiveElement = document.activeElement;
      this.currentGalleryKey = galleryKey;
      this.currentIndex = Math.max(0, Math.min(index, gallery.images.length - 1));
      this.isOpen = true;

      this.updateView();
      this.modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Focus close button for accessibility
      this.closeBtn?.focus();
    },

    close() {
      if (!this.isOpen) return;
      this.isOpen = false;
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
      if (this.lastActiveElement && typeof this.lastActiveElement.focus === 'function') {
        this.lastActiveElement.focus();
      }
    },

    next() {
      const gallery = projectGalleries[this.currentGalleryKey];
      if (!gallery) return;
      this.currentIndex = (this.currentIndex + 1) % gallery.images.length;
      this.updateView();
    },

    prev() {
      const gallery = projectGalleries[this.currentGalleryKey];
      if (!gallery) return;
      this.currentIndex = (this.currentIndex - 1 + gallery.images.length) % gallery.images.length;
      this.updateView();
    },

    updateView() {
      const gallery = projectGalleries[this.currentGalleryKey];
      if (!gallery) return;

      const total = gallery.images.length;
      const currentSrc = gallery.images[this.currentIndex];

      this.img.src = currentSrc;
      this.img.alt = `${gallery.title} screenshot ${this.currentIndex + 1}`;
      this.title.textContent = gallery.title;
      this.counter.textContent = `${this.currentIndex + 1} / ${total}`;
    }
  };

  lightbox.init();

  // --------------------------------------------------------------------------
  // 3. Project Sliders (Touch, Swipe, Navigation Dots, Buttons)
  // --------------------------------------------------------------------------
  const sliderElements = document.querySelectorAll('.card-slider');

  sliderElements.forEach((slider) => {
    const galleryKey = slider.getAttribute('data-gallery');
    const track = slider.querySelector('.slider-track');
    const slides = slider.querySelectorAll('.slider-slide');
    const prevBtn = slider.querySelector('.slider-btn-prev');
    const nextBtn = slider.querySelector('.slider-btn-next');
    const dotsContainer = slider.querySelector('.slider-dots');
    const counterEl = slider.querySelector('.slider-counter');
    const expandBtn = slider.querySelector('.slider-expand-btn');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create pagination dots dynamically
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          goToSlide(i);
        });
        dotsContainer.appendChild(dot);
      }
    }

    const updateControls = () => {
      // Update transform
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }

      // Update counter
      if (counterEl) {
        counterEl.textContent = `${currentIndex + 1} / ${totalSlides}`;
      }
    };

    const goToSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      updateControls();
    };

    const nextSlide = () => goToSlide(currentIndex + 1);
    const prevSlide = () => goToSlide(currentIndex - 1);

    // Button event listeners
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
    });

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
    });

    // Expand to Lightbox button
    expandBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (galleryKey) {
        lightbox.open(galleryKey, currentIndex);
      }
    });

    // Clicking on slide opens Lightbox
    slides.forEach((slide, idx) => {
      slide.addEventListener('click', () => {
        if (galleryKey) {
          lightbox.open(galleryKey, idx);
        }
      });
    });

    // Touch and Swipe Support for Mobile
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    slider.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;

      // If predominantly horizontal, prevent scroll conflicts
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal gesture
      }
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      isSwiping = false;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      // Minimum swipe threshold 35px, horizontal priority
      if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }, { passive: true });

    // Initial state
    updateControls();
  });

  // --------------------------------------------------------------------------
  // 4. Discord Copy to Clipboard with Feedback
  // --------------------------------------------------------------------------
  const discordBtn = document.getElementById('discordCopyBtn');
  const copyFeedback = document.getElementById('copyFeedback');
  const discordIcon = document.getElementById('discordIcon');

  if (discordBtn && copyFeedback) {
    discordBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const username = 'zx.r';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(username);
        } else {
          // Fallback
          const tempInput = document.createElement('input');
          tempInput.value = username;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        // Show tooltip feedback
        copyFeedback.textContent = 'Copied: zx.r';
        copyFeedback.classList.add('show');

        // Swap icon to checkmark
        if (discordIcon) {
          discordIcon.className = 'fa-solid fa-check';
        }

        setTimeout(() => {
          copyFeedback.classList.remove('show');
          if (discordIcon) {
            discordIcon.className = 'fa-brands fa-discord';
          }
        }, 2200);

      } catch (err) {
        // If clipboard fails, open discord url
        window.open('https://discord.com/users/748318287892578385', '_blank', 'noopener,noreferrer');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Back to Top Button
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Navigation Link Active Spy
  // --------------------------------------------------------------------------
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
});
