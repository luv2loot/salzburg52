"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme, THEMES } from "@/components/ThemeProvider";
import ScrollReveal from "@/components/animations/ScrollReveal";

const LANG = "it";

const LANG_OPTIONS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" }
];

const THEME_META = {
  system: {
    label: "Sistema",
    description: "Segui preferenze del sistema",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    preview: {
      bg: "#e5e5e7",
      card: "#f5f5f7",
      text: "#0b0b0f",
      accent: "#6366F1"
    }
  },
  auto: {
    label: "Auto (Ora)",
    description: "Chiaro 6-18, scuro di notte",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    preview: {
      bg: "#fef3c7",
      card: "#fffbeb",
      text: "#0b0b0f",
      accent: "#F59E0B"
    }
  },
  light: {
    label: "Chiaro",
    description: "Aspetto pulito e luminoso",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
    ),
    preview: {
      bg: "#f5f5f7",
      card: "#ffffff",
      text: "#0b0b0f",
      accent: "#2563EB"
    }
  },
  dark: {
    label: "Scuro",
    description: "Delicato per gli occhi",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
      </svg>
    ),
    preview: {
      bg: "#050509",
      card: "#0b0b12",
      text: "#f9fafb",
      accent: "#3B82F6"
    }
  },
  "salzburg-night": {
    label: "Notte di Salisburgo",
    description: "Atmosfera serale viola/blu",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        <path d="M19 3v4"/>
        <path d="M21 5h-4"/>
      </svg>
    ),
    preview: {
      bg: "#0a0a1a",
      card: "#12122a",
      text: "#e0e0ff",
      accent: "#7C3AED"
    }
  }
};

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r="0.5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r="0.5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r="0.5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r="0.5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  );
}

function AccessibilityIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="1"/>
      <path d="M8 6h8"/>
      <path d="m6 18 4-12"/>
      <path d="m18 18-4-12"/>
      <path d="M8 18h8"/>
    </svg>
  );
}

function ThemePreviewCard({ themeKey, isActive, onClick }) {
  const meta = THEME_META[themeKey];
  if (!meta) return null;

  return (
    <motion.button
      type="button"
      className={`settings-page-theme-card${isActive ? " is-active" : ""}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div 
        className="theme-preview-box"
        style={{ 
          background: meta.preview.bg,
          border: `1px solid ${meta.preview.accent}30`
        }}
      >
        <div 
          className="theme-preview-card-mini"
          style={{ 
            background: meta.preview.card,
            boxShadow: `0 4px 12px ${meta.preview.accent}20`
          }}
        >
          <div 
            className="theme-preview-line"
            style={{ background: meta.preview.text }}
          />
          <div 
            className="theme-preview-line short"
            style={{ background: `${meta.preview.text}60` }}
          />
          <div 
            className="theme-preview-dot"
            style={{ background: meta.preview.accent }}
          />
        </div>
      </div>

      <div className="theme-card-content">
        <span className="theme-card-icon" style={{ color: meta.preview.accent }}>
          {meta.icon}
        </span>
        <span className="theme-card-label">{meta.label}</span>
        <span className="theme-card-desc">{meta.description}</span>
      </div>

      {isActive && (
        <motion.div 
          className="theme-card-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { 
    theme, 
    setTheme, 
    fontSize, 
    setFontSize, 
    reducedMotion, 
    setReducedMotion 
  } = useTheme();

  const handleLangChange = (langCode) => {
    router.push(`/${langCode}/settings`);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 }
    }
  };

  return (
    <>
      <Header lang={LANG} />
      <main>
        <motion.section 
          className="app-shell settings-page-hero"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="settings-page-header">
            <span className="settings-page-icon">
              <SettingsIcon />
            </span>
            <h1 className="settings-page-title">Impostazioni</h1>
            <p className="settings-page-subtitle">
              Personalizza la tua esperienza con le opzioni di lingua, tema e accessibilità.
            </p>
          </div>
        </motion.section>

        <section className="app-shell">
          <ScrollReveal direction="up" delay={0}>
            <div className="surface settings-page-card">
            <div className="settings-page-card-header">
              <span className="settings-page-card-icon"><GlobeIcon /></span>
              <h2 className="settings-page-card-title">Lingua</h2>
            </div>
            <p className="settings-page-card-desc">
              Scegli la tua lingua preferita per l'interfaccia.
            </p>
            <div className="settings-page-lang-grid">
              {LANG_OPTIONS.map((opt) => (
                <motion.button
                  key={opt.code}
                  type="button"
                  className={`settings-page-lang-btn${opt.code === LANG ? " is-active" : ""}`}
                  onClick={() => handleLangChange(opt.code)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="lang-btn-flag">{opt.flag}</span>
                  <span className="lang-btn-label">{opt.label}</span>
                  {opt.code === LANG && (
                    <motion.span 
                      className="lang-btn-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      ✓
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="surface settings-page-card">
            <div className="settings-page-card-header">
              <span className="settings-page-card-icon"><PaletteIcon /></span>
              <h2 className="settings-page-card-title">Aspetto</h2>
            </div>
            <p className="settings-page-card-desc">
              Seleziona un tema che si adatti al tuo stile.
            </p>
            <div className="settings-page-theme-grid">
              {THEMES.map((t) => (
                <ThemePreviewCard
                  key={t.key}
                  themeKey={t.key}
                  isActive={theme === t.key}
                  onClick={() => setTheme(t.key)}
                />
              ))}
            </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="surface settings-page-card">
            <div className="settings-page-card-header">
              <span className="settings-page-card-icon"><AccessibilityIcon /></span>
              <h2 className="settings-page-card-title">Accessibilità</h2>
            </div>
            <p className="settings-page-card-desc">
              Regola le impostazioni per migliorare la tua esperienza di navigazione.
            </p>

            <div className="settings-page-option-row">
              <div className="settings-page-option-info">
                <span className="settings-page-option-label">Dimensione Carattere</span>
                <span className="settings-page-option-hint">
                  Aumenta la dimensione del testo per una migliore leggibilità
                </span>
              </div>
              <div className="settings-page-toggle-group">
                <motion.button
                  type="button"
                  className={`settings-page-toggle-btn${fontSize === "normal" ? " is-active" : ""}`}
                  onClick={() => setFontSize("normal")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Normale
                </motion.button>
                <motion.button
                  type="button"
                  className={`settings-page-toggle-btn${fontSize === "large" ? " is-active" : ""}`}
                  onClick={() => setFontSize("large")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Grande
                </motion.button>
              </div>
            </div>

            <div className="settings-page-option-row">
              <div className="settings-page-option-info">
                <span className="settings-page-option-label">Movimento Ridotto</span>
                <span className="settings-page-option-hint">
                  Minimizza animazioni e transizioni
                </span>
              </div>
              <motion.button
                type="button"
                className={`settings-page-switch${reducedMotion ? " is-on" : ""}`}
                onClick={() => setReducedMotion(!reducedMotion)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                role="switch"
                aria-checked={reducedMotion}
              >
                <span className="settings-page-switch-track">
                  <motion.span 
                    className="settings-page-switch-thumb"
                    animate={{ x: reducedMotion ? 18 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </span>
              </motion.button>
            </div>
            </div>
          </ScrollReveal>
        </section>
      </main>
      <Footer lang={LANG} />
    </>
  );
}
