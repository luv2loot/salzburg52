# Salzburg52 - Interactive Digital World Portfolio

Professional portfolio showcasing an apprenticeship journey at HYPERION Hotel Salzburg. A multilingual Next.js 16 web application with premium animations, responsive design, and 5 language support.

## Live Demo

- **Website:** [salzburg52.com](https://salzburg52.com)
- **Languages:** English, German, Spanish, French, Italian

## Features

✨ **Premium Design**
- Apple-inspired design with glassmorphism effects
- Smooth scroll animations and micro-interactions
- 3D floating navigation hub with parallax effects
- Dark/Light/Salzburg Night theme system

🎬 **Advanced Animations**
- ScrollReveal: Reversible scroll animations
- ParallaxImage: Mouse + scroll parallax
- PageTransition: Smooth route transitions (~120ms)
- GPU-accelerated transforms for 60fps performance

🌍 **Full Internationalization**
- 5 language support: EN, DE, ES, FR, IT
- Dynamic routing with language prefixes
- Localized content and translations

📱 **Mobile Optimized**
- Responsive design with no horizontal overflow
- Mobile-first approach
- Optimized for all screen sizes
- Smooth mobile interactions

## Tech Stack

- **Framework:** Next.js 16.0.5 (App Router with Turbopack)
- **UI Framework:** React 19.2.0
- **Animations:** Framer Motion 12.23.24
- **Styling:** CSS3 with CSS variables
- **Font:** Inter (via next/font)
- **Node.js:** ≥18.17.0

## Getting Started

### Prerequisites
- Node.js 18.17.0 or higher
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/salzburg52.git
cd salzburg52

# Install dependencies
npm install

# Run development server
npm run dev
```

The app will be available at `http://localhost:5000`

### Build & Deployment

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

## Deployment to Vercel

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Environment Variables:**
   - No required environment variables for basic setup
   - Optional: Add `NEXT_PUBLIC_SITE_URL` for canonical URLs

4. **Deploy:**
   - Vercel automatically deploys on push to main
   - Preview deployments for pull requests

## Project Structure

```
app/                          # Next.js App Router
├── [lang]/                   # Multilingual routes (de, en, es, fr, it)
│   ├── info/                 # About & apprenticeship info
│   ├── journey/              # Interactive timeline
│   ├── salzburg/             # Day/Night Salzburg experience
│   ├── playground/           # Fun interactive zone
│   ├── hospitality-lab/      # Professional insights
│   └── settings/             # Language, theme, accessibility
├── layout.js                 # Root layout with metadata
├── template.js               # Route transitions
└── globals.css               # Global styles & theme tokens

components/                   # Reusable React components
├── animations/               # Framer Motion animation components
│   ├── ScrollReveal.js       # Scroll reveal animations
│   ├── ParallaxImage.js      # Parallax effects
│   └── Marquee.js            # Scrolling text
├── Header.js                 # Navigation header
├── Hero.js                   # Hero section
├── FloatingCardHub.js        # 3D navigation cards
├── PageTransition.js         # Route transition wrapper
└── ThemeProvider.js          # Theme context & system

lib/                          # Utilities
├── translations.js           # i18n system
├── copy.js                   # Multilingual content
└── quotes.js                 # Quotes & snippets

public/                       # Static assets
├── images/                   # Stock images
└── ambient_music.mp3         # Background music
```

## Performance

- **LCP:** ≤ 2.0s (Largest Contentful Paint)
- **INP:** ≤ 150ms (Interaction to Next Paint)
- **CLS:** ≤ 0.02 (Cumulative Layout Shift)
- **Route Transitions:** ~120ms with PageTransition

Optimizations:
- GPU-accelerated animations (will-change, transform3d)
- Lazy-loaded components (MusicPlayer with dynamic import)
- Content-visibility: auto for below-fold sections
- Image optimization with Next.js Image component

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari 14+, Chrome Mobile

## Accessibility

✓ Semantic HTML with proper ARIA labels
✓ Focus-visible keyboard navigation
✓ High color contrast (WCAG AA)
✓ Reduced motion support
✓ Font size adjustment (90% - 120%)

## Known Issues

- Hydration mismatch warnings from time-based greetings (non-critical)
- WebSocket warnings in development (HMR, not affecting functionality)

## Contributing

Feel free to fork and submit pull requests for improvements.

## License

MIT © 2024 Amir Ismaili

## Contact

- **Email:** [info@salzburg52.com](mailto:info@salzburg52.com)
- **Instagram:** [@am.rsbgg](https://instagram.com/am.rsbgg)
- **Location:** Austria

---

Built with ❤️ at HYPERION Hotel Salzburg
