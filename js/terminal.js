/**
 * ZeroNux Portfolio - Terminal Code Snippet Module
 * Strict Constraints:
 * - ZERO Emojis
 * - Collapsible toggle state handling
 * - Clean copy-to-clipboard with checkmark feedback
 * - 100% Solid Flat styling
 */

(function () {
  'use strict';

  let isInitialized = false;

  function initTerminalSnippets() {
    if (isInitialized) return;
    isInitialized = true;

    const containers = document.querySelectorAll('.terminal-container');

    containers.forEach((container) => {
      const toggleBtn = container.querySelector('.terminal-toggle-btn');
      const content = container.querySelector('.terminal-content');
      const copyBtn = container.querySelector('.terminal-copy-btn');

      // 1. Collapsible toggle handling
      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const isExpanded = container.classList.toggle('expanded');
          toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

          if (content) {
            content.hidden = !isExpanded;
          }
        });
      }

      // 2. One-click copy button
      if (copyBtn) {
        copyBtn.addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const cmd = copyBtn.getAttribute('data-copy-cmd');
          if (!cmd) return;

          try {
            if (navigator.clipboard && window.isSecureContext) {
              await navigator.clipboard.writeText(cmd);
            } else {
              const tempInput = document.createElement('textarea');
              tempInput.value = cmd;
              tempInput.setAttribute('readonly', '');
              tempInput.style.position = 'absolute';
              tempInput.style.left = '-9999px';
              document.body.appendChild(tempInput);
              tempInput.select();
              document.execCommand('copy');
              document.body.removeChild(tempInput);
            }

            const originalHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i><span>Copied!</span>';
            copyBtn.classList.add('copied');

            setTimeout(() => {
              copyBtn.innerHTML = originalHtml;
              copyBtn.classList.remove('copied');
            }, 2000);
          } catch (err) {
            // Fallback
          }
        });
      }
    });
  }

  // Export to global window namespace
  window.ZeroNuxTerminal = {
    init: initTerminalSnippets
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalSnippets);
  } else {
    initTerminalSnippets();
  }
})();
