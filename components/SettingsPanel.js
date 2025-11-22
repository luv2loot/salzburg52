"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LANG_LABELS = {
  en: "English",
  de: "Deutsch",
  it: "Italiano",
  fr: "Français",
  es: "Español"
};

const THEMES = [
  { key: "system", label: "System" },
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" }
];

export default function SettingsPanel({
  isOpen,
  onClose,
  lang = "en",
  onLangChange,
  theme = "system",
  onThemeChange
}) {
  // Close on Escape
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
            animate={{ opacity: 0.3 }}
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
                    <button
                      key={code}
                      type="button"
                      className={`settings-pill${active ? " is-active" : ""}`}
                      onClick={() => onLangChange?.(code)}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="settings-section">
              <div className="settings-section-label">Appearance</div>
              <div className="settings-pill-row">
                {THEMES.map((option) => {
                  const active = option.key === theme;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      className={`settings-pill${active ? " is-active" : ""}`}
                      onClick={() => onThemeChange?.(option.key)}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
