/**
 * ZeroNux Portfolio - Navigation & Scroll Module
 * Strict Constraints:
 * - ZERO Emojis
 * - Mobile responsive drawer handling
 * - Scroll spy for active section indicators
 * - Smooth Back-to-Top interaction
 */

(function () {
  'use strict';

  function initNav() {
    // 1. Mobile Menu Drawer Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const mobileMenuIcon = document.getElementById('mobileMenuIcon');

    if (mobileMenuBtn && mobileNavDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileNavDrawer.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        mobileNavDrawer.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');

        if (mobileMenuIcon) {
          mobileMenuIcon.className = isExpanded ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
        }
      });

      const mobileLinks = mobileNavDrawer.querySelectorAll('.mobile-nav-link');
      mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileNavDrawer.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileNavDrawer.setAttribute('aria-hidden', 'true');
          if (mobileMenuIcon) {
            mobileMenuIcon.className = 'fa-solid fa-bars';
          }
        });
      });
    }

    // 2. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // 3. Scroll Spy for Section Navigation
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const trackedSections = document.querySelectorAll('section[id]');

    if (navLinks.length > 0 && trackedSections.length > 0) {
      const handleScrollSpy = () => {
        const scrollPos = window.scrollY + 100;

        trackedSections.forEach((section) => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          const id = section.getAttribute('id');

          if (scrollPos >= top && scrollPos < top + height) {
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
    }
  }

  // Export to global window namespace
  window.ZeroNuxNav = {
    init: initNav
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();
