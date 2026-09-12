# ZeroNux Portfolio

Production-ready, minimalist personal portfolio for **Osama** (**ZerroDevs**), built under the brand name **ZeroNux**. Engineered with Vanilla HTML5, CSS3, and modern modular JavaScript with a strict focus on high-performance, solid flat design, and zero bloat.

---

## Architectural Principles & Design System

- **Solid Flat Color Palette**: Strictly zero gradients (`linear-gradient`, `radial-gradient`) and zero glassmorphism (`backdrop-filter: blur()`). Every background, border, card, button, and modal utilizes high-contrast solid tones.
- **Color Restrictions**: Absolute prohibition of pink and purple hues. Accent colors use solid emerald (`#059669` light / `#10b981` dark) and solid teal (`#0d9488` / `#14b8a6`).
- **No Emojis**: Strictly zero emojis across code, templates, and UI. Professional typography and FontAwesome 6 icons are used throughout.
- **No Status Tags/Badges**: Zero pill badges, green availability dots, or status chips. Clean, elegant typography conveys hierarchy.
- **Theme Architecture**:
  - Loads in **Light Mode** by default.
  - Fully functional **Dark Mode** toggle switch.
  - Persistent preference stored in `localStorage` (`zeronux_theme`).
  - Pre-render inline script in `<head>` preventing Flash of Unstyled Content (FOUC).
- **Responsive Engineering**: Seamless layout transitions between mobile viewports (stacked layouts, swipe gestures, collapsible drawers) and wide desktop displays (multi-column CSS Grid, clean hover states).

---

## Directory Structure

```
Portfolio/
├── css/
│   └── style.css            # Unified solid minimalist stylesheet & design tokens
├── js/
│   ├── theme.js             # Light/Dark theme toggle & persistence
│   ├── slider.js            # Touch & swipe enabled project carousels
│   ├── lightbox.js          # Fullscreen accessible screenshot viewer
│   ├── clipboard.js         # Discord username copy handler with tooltip feedback
│   ├── terminal.js          # Collapsible quick install terminal snippet controller
│   ├── nav.js               # Mobile navigation drawer, scroll-spy & back-to-top
│   ├── projects-filter.js   # Real-time category filtering & search on projects page
│   └── main.js              # Central bootstrap orchestrator & gallery registry
├── Images/
│   ├── logo.webp            # Brand logo
│   ├── icon-192.png         # Standard web icon
│   └── icon-512.png         # High-resolution web icon
├── ydlp/                    # yt-dlp-downloader preview screenshots (1-6)
├── New-Desginv2/            # New-Desginv2 Store screenshots (1-4)
├── ZeroNux-Store/           # ZeroNux Store screenshots (1-3)
├── LuckyWheel/              # LuckyWheel screenshots (1-4)
├── index.html               # Main portfolio landing page
├── projects.html            # Dedicated projects directory page
├── firebase.json            # Firebase Hosting configuration
├── LICENSE                  # MIT License
└── README.md                # Project documentation
```

---

## Featured Projects

1. **yt-dlp-downloader**
   - Python web application utilizing `yt-dlp` and `FFmpeg` to automate cross-platform media downloads.
   - Built-in media player, Backblaze B2 cloud storage integration, and video conversion utilities.
   - Includes interactive, collapsible Quick Install terminal snippet.
   - Repository: [https://github.com/ZerroDevs/yt-dlp-downloader](https://github.com/ZerroDevs/yt-dlp-downloader)

2. **New-Desginv2 Store**
   - E-commerce storefront and multi-tier administrative control portal built with Vanilla JS and Firebase.
   - Dynamic currency converter, order tracking, and product catalog management.
   - Preview: [https://zerrodevs.github.io/New-Desginv2/](https://zerrodevs.github.io/New-Desginv2/) | Repo: [https://github.com/ZerroDevs/New-Desginv2](https://github.com/ZerroDevs/New-Desginv2)

3. **ZeroNux Store**
   - Official digital storefront engineered for fast digital goods delivery and streamlined checkout flows.
   - Preview: [https://zeronux.store/](https://zeronux.store/) | Repo: [https://github.com/ZerroDevs/ZeroNux-Store](https://github.com/ZerroDevs/ZeroNux-Store)

4. **LuckyWheel**
   - Interactive luck games platform featuring a configurable spinning wheel, 3D dice roller, slots, and blackjack.
   - Built with HTML Canvas and Web Audio API.
   - Preview: [https://zerrodevs.github.io/LuckyWheel/](https://zerrodevs.github.io/LuckyWheel/) | Repo: [https://github.com/ZerroDevs/LuckyWheel](https://github.com/ZerroDevs/LuckyWheel)

5. **Additional Projects (`projects.html`)**
   - **New-Desgin v1**: Exploration storefront layout.
   - **Enjaz-International**: Corporate oil services mobile-first platform.
   - **Saudi Mile Market**: Alfursan miles trading portal with native RTL layout.

---

## Local Development & Testing

Run the site locally using any static web server:

### Python Built-in Server
```bash
python -m http.server 8080
```
Then navigate to `http://localhost:8080/index.html` in your web browser.

### VS Code Live Server
Right-click `index.html` and select **Open with Live Server** (runs by default at `http://127.0.0.1:5500/index.html`).

---

## Contact & Links

- **Developer**: Osama (ZerroDevs)
- **Brand**: ZeroNux
- **GitHub**: [https://github.com/ZerroDevs](https://github.com/ZerroDevs)
- **Discord**: `zx.r` ([Profile](https://discord.com/users/748318287892578385))
- **YouTube**: [https://youtube.com/@ZeroNuxS](https://youtube.com/@ZeroNuxS)
- **Instagram**: [https://instagram.com/zeronuxi](https://instagram.com/zeronuxi)
- **Bio Link**: [https://guns.lol/zeronux](https://guns.lol/zeronux)

---

## License

This project is licensed under the [MIT License](LICENSE).
Copyright (c) 2026 Osama (ZerroDevs). All rights reserved.
