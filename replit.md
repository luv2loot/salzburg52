# Salzburg52 - Professional Hospitality Platform

## Overview
Salzburg52 is a professional portfolio showcasing your apprenticeship journey at HYPERION Hotel Salzburg. This is a multilingual Next.js 15 App Router project featuring premium Apple-inspired design with real photography from Salzburg and luxury hospitality.

**Tech Stack:**
- Next.js 15.1.3 (App Router) - Latest stable version
- React 18.3.1
- Framer Motion (premium animations with scroll triggers, parallax, 3D transforms)
- Node.js 20

## Project Structure
```
app/                    # Next.js App Router pages
├── [lang]/            # Multilingual routes (de, en, es, fr, it)
│   ├── info/          # About Salzburg52 & apprenticeship with gallery
│   ├── salzburg/      # Salzburg-specific content with gallery
│   └── support/       # Contact & support pages
├── legal/             # Legal pages (impressum, privacy)
├── layout.js          # Root layout with metadata
└── globals.css        # Global styles with Apple design

components/            # React components
├── Cursor.js          # Custom cursor
├── Footer.js          # Site footer
├── Header.js          # Navigation header
├── Hero.js            # Hero section with animations
├── MediaStrip.js      # Media display
├── MusicPlayer.js     # Ambient music player (professional instrumental)
├── Showcase.js        # Gallery with hover animations
├── SettingsPanel.js   # User settings
└── ThemeProvider.js   # Theme management

lib/                   # Utility libraries
├── copy.js            # Multilingual copy/text utilities
└── quotes.js          # Quote management

public/
├── images/            # Real stock images (Salzburg, hotels, hospitality)
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

## Design Features
**Apple-Inspired Premium Design:**
- Smooth animations with Framer Motion for interactive elements
- Custom cursor for refined user experience
- Enhanced blue accent color (#2563EB) for premium feel
- Professional button interactions with backdrop blur and gradient effects
- Ambient 5-star hotel instrumental music at 40% volume (double-click to play/stop)
- Music indicator in bottom-right corner with animated bars
- Real photography from Salzburg and luxury hotels throughout all pages
- Rich image galleries on info and salzburg pages showcasing hospitality and city
- Hero images on all subpages for visual appeal
- Sticky navigation header with frosted glass effect
- Spring-based card animations with 3D depth effects
- Responsive grid galleries with hover animations

## Brand Voice
**Professional apprentice portfolio tone:**
- Polished and grammatically correct across all 5 languages
- Emphasizes service excellence and Austrian hospitality
- Focus on refined professionalism and local expertise
- Personal journey as HYPERION Hotel apprentice - NOT a hotel brand

## Recent Changes
- **2024-11-26 (Latest Session):** Major Design Overhaul - Masterpiece Edition
  - **Hero Section Complete Redesign:**
    - Animated gradient backgrounds (blue/purple/pink tones)
    - Floating decorative orbs with gentle animations
    - Staggered text reveal animations
    - Glassmorphism CTA button with hover effects
    - Responsive typography using CSS clamp()
  - **Premium Button & Card System:**
    - 3D tilt effects on showcase cards
    - Content reveal overlays on hover
    - Shimmer/shine border animations
    - Glassmorphism styling throughout
  - **Header Navigation Enhancement:**
    - Sliding underline animations
    - Glow effects on hover/active states
    - Animated logo with pulsing dot
    - Rotating settings gear icon
  - **Footer Redesign:**
    - Animated gradient accent bar (blue → purple → pink)
    - Hover effects on all links
    - Improved spacing and typography
  - **Scroll Animations (All 5 Languages):**
    - Fade-in-up animations for sections entering viewport
    - Staggered reveal for list items
    - Parallax effects on gallery images
    - Section dividers with animated gradients
  - **New CSS Utilities (350+ lines added):**
    - `.glass-card`, `.glass-button`, `.glass-button-primary`
    - Gradient utilities (animated backgrounds, text gradients)
    - Animation keyframes: float, pulse, shimmer, fadeInUp, scaleIn
    - Hover utilities: hover-lift, hover-scale, hover-glow, hover-shine
    - Enhanced responsive breakpoints (mobile/tablet/desktop)
  - **Language & Copy Polish:**
    - Fixed grammar across all 5 languages
    - Changed corporate "we" to personal "I" voice
    - Fixed alt texts (German/Spanish/French/Italian)
    - Professional hospitality tone throughout
    - Consistent first-person messaging

- **2024-11-25:** Audio Deployment Fix
  - Fixed .gitignore blocking ambient_music.mp3 from deployment
  - Successfully pushed 47MB audio file to GitHub/Vercel

- **2024-11-24:** Next.js 15 Upgrade & Gallery Implementation
  - Upgraded to Next.js 15.1.3 (latest stable version)
  - Added responsive image galleries to all pages
  - Enhanced interactive hover animations

## Features
- ✨ **Apple-inspired premium design** with smooth animations and refined interactions
- 🎵 **Ambient hotel instrumental music** at comfortable volume (double-click to control)
- 📸 **Rich photo galleries** throughout all pages showing Salzburg and hospitality
- 🌐 **Full multilingual support** (5 languages with dedicated routes)
- 🎨 **Custom cursor and refined interactions** with blue accent colors
- 🏨 **Professional hospitality messaging** emphasizing apprenticeship journey
- 📱 **Fully responsive design** optimized for all device sizes
- 🎭 **Dark/Light theme support** with proper color schemes
- ⚡ **Fast performance** with Next.js 15 and optimized assets
- 🎯 **Beautiful card animations** with spring effects and 3D depth
- 🔗 **Sticky navigation** header with frosted glass effect
- 💎 **Premium accent colors** (#2563EB) for elevated feel
- 🖼️ **Interactive image galleries** with hover animations

## User Preferences
- Premium, professional aesthetic with Apple-like design language
- Smooth animations and delightful micro-interactions
- Dark theme support with proper contrast and readability
- Multilingual content with consistent messaging across all languages
- Real photography instead of stock images for authenticity
- Subtle, elegant background music for atmosphere
- Interactive galleries showcasing the apprenticeship experience

## Performance Notes
- Images are optimized with Next.js Image component
- CSS animations use GPU-accelerated transforms
- Backdrop filters enabled for frosted glass effects
- Smooth scroll behavior with easing functions
- Lazy loading for images with proper sizing attributes
- Next.js 15 provides improved performance and smaller bundle sizes

## Accessibility
- Semantic HTML structure with proper ARIA labels
- Focus-visible styles for keyboard navigation
- Sufficient color contrast in all themes
- Clear visual feedback for interactive elements
- Proper heading hierarchy throughout site

## Notes
- Professional apprentice portfolio showcasing HYPERION Hotel Salzburg experience
- Multilingual support with Next.js 15 App Router (5 languages)
- Uses Framer Motion for premium animations
- SEO-optimized with sitemap and metadata
- Real images sourced from stock photography
- Background music is 40% volume for ambient effect without distraction
- Site is ready for production deployment
- Upgraded to Next.js 15 for latest features and improvements

