"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THEMES } from "@/components/ThemeProvider";

const LANG_LABELS = {
  en: "English",
  de: "Deutsch",
  it: "Italiano",
  fr: "Français",
  es: "Español"
};

const THEME_ICONS = {
  system: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  auto: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  light: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  dark: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  "salzburg-night": (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      <path d="M19 3v4"/>
      <path d="M21 5h-4"/>
    </svg>
  )
};

const THEME_LABELS = {
  system: "System",
  auto: "Auto (Time)",
  light: "Light",
  dark: "Dark",
  "salzburg-night": "Salzburg Night"
};

export default function SettingsPanel({
  isOpen,
  onClose,
  lang = "en",
  onLangChange,
  theme = "system",
  onThemeChange,
  fontSize = "normal",
  onFontSizeChange,
  reducedMotion = false,
  onReducedMotionChange
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            className="settings-panel surface"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="settings-header">
              <h2 className="settings-title">Settings</h2>
              <button
                type="button"
                className="settings-close-btn"
                onClick={onClose}
                aria-label="Close settings"
              >
                ✕
              </button>
            </div>

            <div className="settings-section">
              <div className="settings-section-label">Language</div>
              <div className="settings-pill-row">
                {Object.entries(LANG_LABELS).map(([code, label]) => {
                  const active = code === lang;
                  return (
                    <motion.button
                      key={code}
                      type="button"
                      className={`settings-pill${active ? " is-active" : ""}`}
                      onClick={() => onLangChange?.(code)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-label">Appearance</div>
              <div className="settings-theme-row">
                {THEMES.map((option) => {
                  const active = option.key === theme;
                  return (
                    <motion.button
                      key={option.key}
                      type="button"
                      className={`settings-theme-btn${active ? " is-active" : ""}`}
                      onClick={() => onThemeChange?.(option.key)}
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      data-theme={option.key}
                    >
                      <span className="settings-theme-icon">
                        {THEME_ICONS[option.key]}
                      </span>
                      <span className="settings-theme-label">
                        {THEME_LABELS[option.key]}
                      </span>
                      {active && (
                        <motion.span
                          className="settings-theme-check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          ✓
                        </motion.span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-label">Accessibility</div>
              
              <div className="settings-toggle-row">
                <span className="settings-toggle-label">Font Size</span>
                <div className="settings-toggle-group">
                  <motion.button
                    type="button"
                    className={`settings-toggle-btn${fontSize === "normal" ? " is-active" : ""}`}
                    onClick={() => onFontSizeChange?.("normal")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Normal
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`settings-toggle-btn${fontSize === "large" ? " is-active" : ""}`}
                    onClick={() => onFontSizeChange?.("large")}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Large
                  </motion.button>
                </div>
              </div>
              
              <div className="settings-toggle-row">
                <span className="settings-toggle-label">Reduced Motion</span>
                <motion.button
                  type="button"
                  className={`settings-switch${reducedMotion ? " is-on" : ""}`}
                  onClick={() => onReducedMotionChange?.(!reducedMotion)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  role="switch"
                  aria-checked={reducedMotion}
                >
                  <span className="settings-switch-track">
                    <motion.span 
                      className="settings-switch-thumb"
                      animate={{ x: reducedMotion ? 18 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
