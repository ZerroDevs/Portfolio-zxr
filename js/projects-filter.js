/**
 * ZeroNux Portfolio - Projects Page Filter & Search Module
 * Strict Constraints:
 * - ZERO Emojis
 * - Solid flat buttons
 * - Instant real-time search & category filtering
 */

(function () {
  'use strict';

  function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('projectSearchInput');
    const projectItems = document.querySelectorAll('[data-category]');

    if (!filterButtons.length && !searchInput) return;

    let activeCategory = 'all';
    let searchQuery = '';

    function applyFilter() {
      projectItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-category') || '';
        const itemTitle = item.querySelector('.card-title, .compact-title')?.textContent.toLowerCase() || '';
        const itemDesc = item.querySelector('.card-description, .compact-description')?.textContent.toLowerCase() || '';

        const matchesCategory = activeCategory === 'all' || itemCategory.toLowerCase().includes(activeCategory.toLowerCase());
        const matchesSearch = !searchQuery || itemTitle.includes(searchQuery) || itemDesc.includes(searchQuery);

        if (matchesCategory && matchesSearch) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter') || 'all';
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilter();
      });
    }
  }

  // Export to global window namespace
  window.ZeroNuxProjectsFilter = {
    init: initProjectsFilter
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProjectsFilter);
  } else {
    initProjectsFilter();
  }
})();
