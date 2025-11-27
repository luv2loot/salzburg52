"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { THEMES, FONT_SIZE_OPTIONS } from "@/components/ThemeProvider";

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
  fontSize = 100,
  onFontSizeChange,
  reducedMotion = false,
  onReducedMotionChange
}) {
  const [mounted, setMounted] = useState(false);
  const [underConstruction, setUnderConstruction] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("underConstructionMode") === "true";
    setUnderConstruction(stored);
    const authenticated = localStorage.getItem("adminAuthenticated") === "true";
    setAdminAuthenticated(authenticated);
  }, []);

  const handleAdminToggleClick = () => {
    if (!adminAuthenticated) {
      setShowPasswordPrompt(true);
      return;
    }
    toggleUnderConstruction();
  };

  const verifyAdminPassword = () => {
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "salzburg52";
    if (adminPassword === correctPassword) {
      setAdminAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
      setShowPasswordPrompt(false);
      setAdminPassword("");
      toggleUnderConstruction();
    } else {
      alert("❌ Incorrect password. Try again.");
      setAdminPassword("");
    }
  };

  const toggleUnderConstruction = () => {
    const newValue = !underConstruction;
    setUnderConstruction(newValue);
    localStorage.setItem("underConstructionMode", newValue ? "true" : "false");
    // Force page reload to apply changes
    window.location.reload();
  };
  useEffect(() => {
    if (!isOpen) return;
    const handler = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const currentFontSizeIndex = useMemo(() => {
    const idx = FONT_SIZE_OPTIONS.findIndex(opt => opt.value === fontSize);
    return idx >= 0 ? idx : 1;
  }, [fontSize]);

  const currentFontSizeLabel = useMemo(() => {
    const option = FONT_SIZE_OPTIONS.find(opt => opt.value === fontSize);
    return option ? `${option.label} (${option.value}%)` : `Normal (100%)`;
  }, [fontSize]);

  const handleSliderChange = (e) => {
    const idx = parseInt(e.target.value, 10);
    const option = FONT_SIZE_OPTIONS[idx];
    if (option) {
      onFontSizeChange?.(option.value);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.25,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="settings-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            className="settings-panel-premium surface"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              className="settings-header-premium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <h2 className="settings-title-premium">Settings</h2>
              <motion.button
                type="button"
                className="settings-close-btn-premium"
                onClick={onClose}
                aria-label="Close settings"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </motion.button>
            </motion.div>

            <motion.div 
              className="settings-section-premium"
              custom={0}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="settings-section-label-premium">Language</div>
              <div className="settings-pill-row-premium">
                {Object.entries(LANG_LABELS).map(([code, label]) => {
                  const active = code === lang;
                  return (
                    <motion.button
                      key={code}
                      type="button"
                      className={`settings-pill-premium${active ? " is-active" : ""}`}
                      onClick={() => onLangChange?.(code)}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {label}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              className="settings-section-premium"
              custom={1}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="settings-section-label-premium">Appearance</div>
              <div className="settings-theme-row-premium">
                {THEMES.map((option) => {
                  const active = option.key === theme;
                  return (
                    <motion.button
                      key={option.key}
                      type="button"
                      className={`settings-theme-btn-premium${active ? " is-active" : ""}`}
                      onClick={() => onThemeChange?.(option.key)}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      data-theme={option.key}
                    >
                      <span className="settings-theme-icon-premium">
                        {THEME_ICONS[option.key]}
                      </span>
                      <span className="settings-theme-label-premium">
                        {THEME_LABELS[option.key]}
                      </span>
                      <AnimatePresence>
                        {active && (
                          <motion.span
                            className="settings-theme-check-premium"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div 
              className="settings-section-premium"
              custom={2}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="settings-section-label-premium">Accessibility</div>
              
              <div className="settings-slider-container">
                <div className="settings-slider-header">
                  <span className="settings-slider-label">Font Size</span>
                  <motion.span 
                    className="settings-slider-value"
                    key={fontSize}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {currentFontSizeLabel}
                  </motion.span>
                </div>
                <div className="settings-slider-wrapper">
                  <input
                    type="range"
                    min="0"
                    max={FONT_SIZE_OPTIONS.length - 1}
                    step="1"
                    value={currentFontSizeIndex}
                    onChange={handleSliderChange}
                    className="settings-range-slider"
                    aria-label="Font size"
                  />
                  <div className="settings-slider-ticks">
                    {FONT_SIZE_OPTIONS.map((opt, idx) => (
                      <div 
                        key={opt.value} 
                        className={`settings-slider-tick${idx === currentFontSizeIndex ? " is-active" : ""}`}
                      >
                        <span className="settings-slider-tick-label">{opt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="settings-toggle-row-premium">
                <div className="settings-toggle-info">
                  <span className="settings-toggle-label-premium">Reduced Motion</span>
                  <span className="settings-toggle-desc">Minimize animations</span>
                </div>
                <motion.button
                  type="button"
                  className={`settings-switch-premium${reducedMotion ? " is-on" : ""}`}
                  onClick={() => onReducedMotionChange?.(!reducedMotion)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="switch"
                  aria-checked={reducedMotion}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <motion.span 
                    className="settings-switch-track-premium"
                    animate={{
                      backgroundColor: reducedMotion 
                        ? "rgba(37, 99, 235, 1)" 
                        : "rgba(120, 120, 128, 0.32)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.span 
                      className="settings-switch-thumb-premium"
                      animate={{ 
                        x: reducedMotion ? 20 : 2,
                        scale: reducedMotion ? 1 : 0.95
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>

            {mounted && (
              <>
                <motion.div 
                  className="settings-section-premium"
                  custom={3}
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="settings-section-label-premium">Admin</div>
                  
                  <div className="settings-toggle-row-premium">
                    <div className="settings-toggle-info">
                      <span className="settings-toggle-label-premium">Under Construction</span>
                      <span className="settings-toggle-desc">{adminAuthenticated ? "Hide website from visitors" : "Admin only - requires password"}</span>
                    </div>
                    <motion.button
                      type="button"
                      className={`settings-switch-premium${underConstruction ? " is-on" : ""}${!adminAuthenticated ? " is-disabled" : ""}`}
                      onClick={handleAdminToggleClick}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="switch"
                      aria-checked={underConstruction}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      style={{ opacity: adminAuthenticated ? 1 : 0.5, cursor: adminAuthenticated ? "pointer" : "not-allowed" }}
                    >
                      <motion.span 
                        className="settings-switch-track-premium"
                        animate={{
                          backgroundColor: underConstruction 
                            ? "rgba(37, 99, 235, 1)" 
                            : "rgba(120, 120, 128, 0.32)"
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.span 
                          className="settings-switch-thumb-premium"
                          animate={{ 
                            x: underConstruction ? 20 : 2,
                            scale: underConstruction ? 1 : 0.95
                          }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.span>
                    </motion.button>
                  </div>
                </motion.div>

                {showPasswordPrompt && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    style={{
                      padding: "1rem",
                      background: "rgba(37, 99, 235, 0.08)",
                      border: "1px solid rgba(37, 99, 235, 0.2)",
                      borderRadius: "12px",
                      marginTop: "1rem"
                    }}
                  >
                    <div style={{ marginBottom: "0.75rem", fontSize: "0.9rem", color: "var(--color-muted)" }}>
                      Enter admin password:
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") verifyAdminPassword();
                        }}
                        placeholder="Password"
                        autoFocus
                        style={{
                          flex: 1,
                          padding: "0.5rem 0.75rem",
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(37, 99, 235, 0.2)",
                          borderRadius: "8px",
                          color: "var(--color-text)",
                          fontSize: "0.9rem"
                        }}
                      />
                      <motion.button
                        type="button"
                        onClick={verifyAdminPassword}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "rgba(37, 99, 235, 0.2)",
                          border: "1px solid rgba(37, 99, 235, 0.3)",
                          borderRadius: "8px",
                          color: "var(--primary)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        Verify
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => {
                          setShowPasswordPrompt(false);
                          setAdminPassword("");
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "rgba(100, 100, 100, 0.2)",
                          border: "1px solid rgba(100, 100, 100, 0.3)",
                          borderRadius: "8px",
                          color: "var(--color-muted)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
