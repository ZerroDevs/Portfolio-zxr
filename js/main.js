/**
 * ZeroNux Portfolio - Main Application Orchestrator
 * Strict Constraints:
 * - ZERO Emojis
 * - Default: Light Mode
 * - Solid Flat Colors Only
 */

(function () {
  'use strict';

  // Central Image Data Registry for Featured Works Lightbox
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

  function bootstrap() {
    // 1. Register image galleries with Lightbox
    if (window.ZeroNuxLightbox) {
      window.ZeroNuxLightbox.registerGalleries(projectGalleries);
    }

    // 2. Initialize modules if not already auto-initialized
    window.ZeroNuxTheme?.init();
    window.ZeroNuxSliders?.init();
    window.ZeroNuxClipboard?.init();
    window.ZeroNuxNav?.init();
    window.ZeroNuxProjectsFilter?.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
