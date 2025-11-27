# Salzburg52 - Interactive Digital World Portfolio

## Overview
Salzburg52 is a professional portfolio showcasing an apprenticeship journey at HYPERION Hotel Salzburg. This is a multilingual Next.js 16 App Router project featuring a cinematic "digital world" concept with 3D navigation hub, multiple interactive zones, three theme modes, and premium Apple-inspired design.

**Tech Stack:**
- Next.js 16.0.5 (App Router with Turbopack) - Latest stable version
- React 19.2.0
- Framer Motion 12.23.24 (premium animations with scroll triggers, parallax, 3D transforms)
- Node.js ≥18.17.0

## Project Structure
```
app/                    # Next.js App Router pages
├── [lang]/            # Multilingual routes (de, en, es, fr, it)
│   ├── info/          # About Salzburg52 & apprenticeship
│   ├── journey/       # Interactive animated timeline
│   ├── salzburg/      # Day/Night Salzburg Experience
│   ├── playground/    # Fun interactive zone
│   ├── hospitality-lab/ # Professional insights
│   └── settings/      # Language, theme, accessibility
├── legal/             # Legal pages (impressum, privacy)
├── layout.js          # Root layout with metadata
├── template.js        # Route transitions wrapper
└── globals.css        # Global styles with theme tokens

components/            # React components
├── animations/        # Reusable animation components
│   ├── FloatingElements.js  # Floating orbs, shapes, gradients
│   ├── MagneticButton.js    # Magnetic hover effects
│   ├── Marquee.js           # Scrolling text strips
│   ├── ParallaxImage.js     # Scroll + mouse parallax effects
│   ├── ScrollReveal.js      # Reversible scroll animations
│   ├── TextReveal.js        # Text reveal animations
│   └── TiltCard.js          # 3D tilt cards
├── Cursor.js          # Custom cursor
├── CursorSpotlight.js # Cursor spotlight effect
├── DynamicMusicPlayer.js  # Lazy-loaded music player wrapper
├── FloatingCardHub.js # 3D navigation hub with parallax + magnetic effects
├── Footer.js          # Site footer with contact info
├── Header.js          # Navigation with scroll-based blur
├── Hero.js            # Cinematic hero with staggered reveals
├── Logo.js            # S·52 gradient logo with sheen
├── MediaStrip.js      # Media display with stats
├── MusicPlayer.js     # Ambient music player
├── PageTransition.js  # Route transition animations
├── Showcase.js        # Gallery with parallax hover
├── SettingsPanel.js   # Theme/accessibility settings
└── ThemeProvider.js   # Light/Dark/Salzburg Night themes

lib/                   # Utility libraries
├── copy.js            # Multilingual copy/text utilities
├── quotes.js          # Quote management
└── translations.js    # Centralized i18n translation system

public/
├── images/            # Real stock images (Salzburg, hotels)
├── ambient_music.mp3  # 5-star hotel lobby background music
├── sitemap.xml        # SEO sitemap
└── robots.txt         # Search engine directives
```

## Development
The project is configured to run on Replit:
- **Dev Server:** Runs on port 5000, bound to 0.0.0.0
- **Command:** `npm run dev`
- **Workflow:** "Next.js Dev Server" (configured in Replit)

## Deployment
Configured for Vercel Autoscale deployment:
- **Build:** `npm run build`
- **Start:** `npm run start` (production server on port 5000)
- **Type:** Autoscale (stateless web application)
- **GitHub Integration:** Push to main → Automatic deployment

## Languages Supported
The website supports 5 languages with dedicated routes:
- German (de)
- English (en)
- Spanish (es)
- French (fr)
- Italian (it)

## Navigation Structure
```
Home (FloatingCardHub) → Journey → Salzburg → Playground → Hospitality Lab → Info → Settings
```

All zones accessible from the 3D floating card hub on the home page.

## Zones & Features

### Home - 3D Floating Card Hub
- Cinematic hero with animated gradient backgrounds
- 3D floating card cluster with mouse-move parallax
- Cards represent each zone with icons, titles, descriptions
- CSS perspective (1200px) with translate3d depth effects
- Spring physics animations (stiffness 100-150, damping 20-30)

### Journey - Interactive Timeline
- Vertical timeline with central gradient spine
- 6 milestones: Early Education, Decision, Apprenticeship Start, Key Learnings, Current Role, Future Ambitions
- Scroll-triggered animations (fade in from left/right)
- Progress dots that pulse when sections enter viewport
- Mobile-optimized: Reduced padding, smaller fonts for small screens

### Salzburg Experience - Day/Night Toggle
- Prominent toggle switch for Day/Night modes
- Day Mode: Light warm gradients, bright imagery
- Night Mode: Dark blue/purple gradients, animated starfield
- 8 place cards: Old Town, Fortress, Mirabell, Mozart's Birthplace, Getreidegasse, Salzach River, Coffee Culture, Mountain Views

### Playground - Fun Zone
- "Check-in Chaos Simulator" - interactive scenarios with 3 responses each
- 6 humorous hotel scenarios (peacock guest, celebrity check-in, etc.)
- Fun quote carousel auto-rotating every 5 seconds
- Cursor-reactive gradient background
- Fun stats section (coffees consumed: ∞, etc.)

### Hospitality Lab - Professional Zone
- 6 hospitality principles with scroll-reveal animations
- "Art of First Impressions", "Making Guests Feel Seen", "Handling Difficult Situations", "Details That Matter", "Building Connections", "Lessons from HYPERION"
- Calm, professional styling

### Settings Hub
- Language selector (5 languages with flag icons)
- Theme selector: Light, Dark, Salzburg Night (visual previews)
- Accessibility: Font size toggle, Reduced motion toggle
- Settings persist to localStorage

## Theme System
Five theme options with smooth 250ms transitions:
- **System** - Follows OS dark/light preference (auto-updates when OS changes)
- **Auto (Time)** - Light theme 6AM-6PM, dark theme at night (checks every minute)
- **Light** - Clean white backgrounds
- **Dark** - Rich dark mode
- **Salzburg Night** - Special purple/blue tones (--primary: #7C3AED, --secondary: #4F46E5)

CSS variables for all themes in globals.css:
- `.theme-light`, `.theme-dark`, `.theme-salzburg-night`
- System preference detection and time-based auto switching
- localStorage persistence for user preference

## i18n Translation System
Centralized in `lib/translations.js`:
- `t(key, lang)` - Get translation by key and language
- `getNavItems(lang)` - Get localized navigation items
- All nav items, page titles, buttons, common phrases translated
- Proper translations for all 5 languages

## Design System
**Color Tokens:**
- Primary: #2563EB (blue)
- Secondary: #8B5CF6 (purple)
- Accent Pink: #EC4899

**Animation System:**
- Framer Motion: useScroll, useTransform, useInView, useMotionValue, useSpring
- Keyframes: float, pulse, shimmer, fadeInUp, scaleIn
- Hover utilities: hover-lift, hover-scale, hover-glow, hover-shine

**CSS Classes:**
- `.glass-card`, `.glass-button`, `.glass-button-primary`
- Gradient utilities (animated backgrounds, text gradients)
- 350+ lines of premium CSS utilities

## Brand Voice
**Professional apprentice portfolio tone:**
- Polished and grammatically correct across all 5 languages
- First-person "I" voice (not corporate "we")
- Emphasizes service excellence and Austrian hospitality
- Personal journey as HYPERION Hotel apprentice

## Recent Changes
- **2024-11-27 (Latest):** Mobile Optimization & Final Bug Fixes
  - **Fixed Mobile Layout:** Journey section optimized for small phones (fonts 1.8rem→1.4rem, spacing 3rem→1.25rem)
  - **Horizontal Overflow Fix:** Added `overflow-x: hidden` to prevent left/right scrolling on mobile
  - **Import Cleanup:** Removed all broken SnippetRefreshButton imports across all language pages
  - **CSS Mobile Fixes:** Added `max-width: 100%` to all elements on mobile, `box-sizing: border-box`
  - **Page Imports Fixed:** All 5 language pages (en, de, es, fr, it) cleaned and working
  - **Deployment Ready:** .env.example created, verified Next.js and package.json configs

- **2024-11-27:** Premium Animation System & Performance Overhaul
  - **Inter Font:** Added Inter variable font via next/font for premium typography
  - **ScrollReveal Component:** Reversible scroll animations (slide from left/right/up) - elements reverse on scroll back
  - **ParallaxImage Component:** Scroll-based Y parallax + mouse-based X/Y parallax with spring physics
  - **PageTransition System:** Smooth fade/slide route transitions via app/template.js
  - **Performance Optimizations:** Lazy-loaded MusicPlayer, GPU acceleration CSS, content-visibility for below-fold
  - **Hero Enhancements:** Scroll-based opacity/scale fade, staggered letter-by-letter text reveals, floating gradient orbs
  - **FloatingCardHub Enhancements:** Magnetic button effects, 3D tilt on hover, cursor-following glow, staggered entrance
  - **Header Enhancements:** Scroll-based blur effect, underline slide animation
  - **Settings UI Fixes:** Slider thumb alignment, theme checkmark positioning, switch toggle, 8px grid
  - **Animations Applied:** ScrollReveal on 35+ page files across all 5 languages
  - **Accessibility:** Reduced-motion support in all animation components and PageTransition
  - **Dynamic Lang:** HTML lang attribute now updates based on current locale

- **2024-11-26:** Next.js 16 Upgrade & Navigation Fixes
  - **Next.js 16.0.5:** Upgraded from 15.1.3 to latest stable with Turbopack
  - **React 19.2.0:** Updated React and React DOM to latest versions
  - **Navigation Alignment:** Fixed underline alignment for longer language translations
  - **Multilingual Nav:** All nav items now display on single lines (white-space: nowrap)
  - **CSS Underline:** Changed from absolute to relative positioning for proper text alignment
  - **Config Cleanup:** Removed deprecated swcMinify, added allowedDevOrigins for dev server

- **2024-11-26 (Earlier):** Premium Animation Overhaul & Logo Design
  - **New Logo:** Image-based lettermark logo (S + five two) with purple/navy design
  - **Cinematic Hero:** GPU-accelerated gradient canvas background with flowing color orbs
  - **Floating Elements:** Animated orbs (blue, purple, pink, cyan) with depth effects
  - **Grid Overlay:** Subtle radial grid pattern for premium aesthetic
  - **Grain Texture:** Film grain overlay for cinematic quality
  - **Service Marquee:** Horizontal scrolling text with service keywords

## Known Minor Issues (Cosmetic)
- Hydration mismatch warnings from time-based greetings (SSR vs client time) - non-critical
- CSS WebSocket warnings in development (HMR) - development only
- Scroll position warnings from Framer Motion (non-critical)

## User Preferences
- Premium, professional aesthetic with Apple-like design language
- Interactive "digital world" concept with multiple zones
- Smooth animations and delightful micro-interactions
- Three theme options with system preference support
- Multilingual content with consistent messaging
- Real photography for authenticity
- Subtle, elegant background music
- Fast loading with no delays between pages

## Performance Notes
- Images optimized with Next.js Image component
- CSS animations use GPU-accelerated transforms (will-change, translateZ, backface-visibility)
- Backdrop filters for frosted glass effects
- Smooth scroll with easing functions
- Lazy loading for images and MusicPlayer (dynamic import with ssr:false)
- Next.js 16 Turbopack for faster development builds
- Smaller production bundles with React 19
- PageTransition for instant-feel route changes (~120ms)
- content-visibility: auto for below-fold sections
- Spring physics for natural animation feel (stiffness 100-150, damping 20-30)
- Performance targets: LCP ≤ 2.0s, INP ≤ 150ms, CLS ≤ 0.02

## Mobile Optimization
- No horizontal scrolling on any screen size
- Journey section optimized for phones (fonts, spacing, padding)
- Touch-friendly buttons (min 44px height)
- Responsive typography with clamp()
- Flexible layouts that work on 320px - 2560px screens
- Optimized animations for mobile performance

## Accessibility
- Semantic HTML with proper ARIA labels
- Focus-visible styles for keyboard navigation
- Sufficient color contrast in all themes (WCAG AA)
- Reduced motion setting available
- Font size toggle (90/100/110/120%)
- Proper heading hierarchy
- Skip to main content option

## Deployment Instructions

### GitHub Setup
```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit: Salzburg52 portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/salzburg52.git
git push -u origin main
```

### Vercel Deployment
1. Go to vercel.com and sign in with GitHub
2. Click "New Project"
3. Select your salzburg52 repository
4. Vercel auto-detects Next.js - no config needed
5. Deploy! 🚀

### Custom Domain
1. In Vercel project settings → Domains
2. Add your domain (salzburg52.com)
3. Follow DNS configuration instructions
4. Deploy takes ~48hrs to fully propagate

## Notes
- Professional apprentice portfolio at HYPERION Hotel Salzburg
- Multilingual Next.js 16 App Router (5 languages)
- Framer Motion for premium animations
- SEO-optimized with sitemap and metadata
- Background music 40% volume (double-click control)
- Ready for production deployment to Vercel
- Mobile-optimized for all screen sizes
- No horizontal overflow on any device

