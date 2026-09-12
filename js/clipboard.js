/**
 * ZeroNux Portfolio - Clipboard & Contact Module
 * Strict Constraints:
 * - ZERO Emojis
 * - Seamless Discord username click-to-copy
 * - Tooltip feedback & icon transformation
 */

(function () {
  'use strict';

  let isInitialized = false;

  function initClipboard() {
    if (isInitialized) return;
    isInitialized = true;

    const discordCopyBtn = document.getElementById('discordCopyBtn');
    const copyFeedback = document.getElementById('copyFeedback');
    const discordIcon = document.getElementById('discordIcon');

    if (!discordCopyBtn || !copyFeedback) return;

    discordCopyBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const username = 'zx.r';

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(username);
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = username;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        copyFeedback.classList.add('show');
        if (discordIcon) {
          discordIcon.className = 'fa-solid fa-check';
        }

        setTimeout(() => {
          copyFeedback.classList.remove('show');
          if (discordIcon) {
            discordIcon.className = 'fa-brands fa-discord';
          }
        }, 2000);

      } catch (err) {
        // Direct link fallback
        window.open('https://discord.com/users/748318287892578385', '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Export to global window namespace
  window.ZeroNuxClipboard = {
    init: initClipboard
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initClipboard);
  } else {
    initClipboard();
  }
})();
