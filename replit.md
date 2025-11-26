# Salzburg52 - Interactive Digital World Portfolio

## Overview
Salzburg52 is a professional portfolio showcasing your apprenticeship journey at HYPERION Hotel Salzburg. This is a multilingual Next.js 15 App Router project featuring a cinematic "digital world" concept with 3D navigation hub, multiple interactive zones, three theme modes, and premium Apple-inspired design.

**Tech Stack:**
- Next.js 15.1.3 (App Router) - Latest stable version
- React 18.3.1
- Framer Motion (premium animations with scroll triggers, parallax, 3D transforms)
- Node.js 20

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
└── globals.css        # Global styles with theme tokens

components/            # React components
├── Cursor.js          # Custom cursor
├── FloatingCardHub.js # 3D navigation hub with parallax
├── Footer.js          # Site footer with contact info
├── Header.js          # Navigation with all zones
├── Hero.js            # Hero section with animations
├── MediaStrip.js      # Media display
├── MusicPlayer.js     # Ambient music player
├── Showcase.js        # Gallery with hover animations
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
Configured for Replit Autoscale deployment:
- **Build:** `npm run build`
- **Start:** `npm run start` (production server on port 5000)
- **Type:** Autoscale (stateless web application)

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
- **2024-11-26 (Latest):** Refinements & Fixes
  - **Theme System Enhanced:** Added System (OS preference) and Auto (time-based 6AM-6PM) options
  - **FloatingCardHub Navigation:** Fixed links to Journey, Playground, Hospitality Lab pages
  - **Salzburg Day/Night:** Separate day activities (8) and night activities (8) with content toggle
  - **Translations Fixed:** "Your Digital World" and "My Journey at HYPERION" now translated in all languages
  - **Animations Extended:** Scroll/hover animations added to Showcase, Info pages, and galleries
  - **Cursor Visibility:** Improved visibility on dark backgrounds with glow effect
  - **Check-in Chaos:** Fixed text contrast/readability for all themes
  - **Instagram Link:** Updated to @am.rsbgg
  - **Coming Soon Removed:** MediaStrip now shows "Insights & Notes"
  
- **2024-11-26 (Earlier):** Digital World Transformation
  - **FloatingCardHub:** 3D navigation hub with mouse parallax, perspective transforms, spring animations
  - **Journey Page:** Interactive timeline with 6 milestones, scroll-triggered reveals
  - **Salzburg Experience:** Day/Night toggle with animated starfield and mode transitions
  - **Playground:** Check-in Chaos Simulator, quote carousel, reactive backgrounds
  - **Hospitality Lab:** Professional principles with calm scroll reveals
  - **Settings Page:** Theme/language/accessibility hub with visual previews
  - **i18n System:** Centralized translations with t() and getNavItems() helpers
  - **Navigation Update:** Removed Support, added Journey/Playground/Hospitality Lab
  - **All 5 Languages:** Complete pages for en, de, es, fr, it

## Known Minor Issues (Cosmetic)
- Hydration mismatch warnings from time-based greetings (SSR vs client time)
- CSS property conflicts: background vs backgroundClip (non-critical)

## User Preferences
- Premium, professional aesthetic with Apple-like design language
- Interactive "digital world" concept with multiple zones
- Smooth animations and delightful micro-interactions
- Three theme options with system preference support
- Multilingual content with consistent messaging
- Real photography for authenticity
- Subtle, elegant background music

## Performance Notes
- Images optimized with Next.js Image component
- CSS animations use GPU-accelerated transforms
- Backdrop filters for frosted glass effects
- Smooth scroll with easing functions
- Lazy loading for images
- Next.js 15 smaller bundle sizes

## Accessibility
- Semantic HTML with proper ARIA labels
- Focus-visible styles for keyboard navigation
- Sufficient color contrast in all themes
- Reduced motion setting available
- Font size toggle (Normal/Large)
- Proper heading hierarchy

## Notes
- Professional apprentice portfolio at HYPERION Hotel Salzburg
- Multilingual Next.js 15 App Router (5 languages)
- Framer Motion for premium animations
- SEO-optimized with sitemap and metadata
- Background music 40% volume (double-click control)
- Ready for production deployment
