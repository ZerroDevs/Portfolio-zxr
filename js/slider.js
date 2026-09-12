/**
 * ZeroNux Portfolio - Project Carousel / Slider Module
 * Strict Constraints:
 * - ZERO Emojis
 * - Flawless mobile touch/swipe interaction
 * - Solid flat buttons and pagination dots
 * - Integrates with ZeroNuxLightbox
 */

(function () {
  'use strict';

  let isInitialized = false;

  function initSliders() {
    if (isInitialized) return;
    isInitialized = true;

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

      // Generate pagination dots dynamically
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
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

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

      prevBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
      });

      nextBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
      });

      expandBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        if (galleryKey && window.ZeroNuxLightbox) {
          window.ZeroNuxLightbox.open(galleryKey, currentIndex);
        }
      });

      slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          if (galleryKey && window.ZeroNuxLightbox) {
            window.ZeroNuxLightbox.open(galleryKey, idx);
          }
        });
      });

      // Touch & Swipe Gesture Support for Mobile
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
      }, { passive: true });

      slider.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;

        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = endX - startX;
        const diffY = endY - startY;

        // 35px swipe distance threshold, horizontal priority
        if (Math.abs(diffX) > 35 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            nextSlide();
          } else {
            prevSlide();
          }
        }
      }, { passive: true });

      updateControls();
    });
  }

  // Export to global window namespace
  window.ZeroNuxSliders = {
    init: initSliders
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSliders);
  } else {
    initSliders();
  }
})();
