"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SettingsPanel from "@/components/SettingsPanel";
import { useTheme } from "@/components/ThemeProvider";
import { getNavItems, t, SUPPORTED_LANGS } from "@/lib/translations";
import Logo from "@/components/Logo";

function NavLink({ href, isActive, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`header-nav-link-premium${isActive ? " is-active" : ""}`}
      aria-current={isActive ? "page" : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.span
        className="header-nav-link-text"
        animate={{
          color: isActive || isHovered ? "var(--color-text)" : "var(--color-muted)"
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      <motion.span
        className="header-nav-underline"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ 
          scaleX: isActive || isHovered ? 1 : 0,
          opacity: isActive || isHovered ? 1 : 0
        }}
        transition={{ 
          duration: 0.25, 
          ease: [0.32, 0.72, 0, 1]
        }}
      />
      
      <AnimatePresence>
        {(isActive || isHovered) && (
          <motion.span
            className="header-nav-glow"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </Link>
  );
}

export default function Header({ lang = "en" }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, fontSize, setFontSize, reducedMotion, setReducedMotion } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSettingsHovered, setIsSettingsHovered] = useState(false);

  const activeLang = useMemo(() => {
    if (!pathname) return lang;
    const parts = pathname.split("/").filter(Boolean);
    const maybeLang = parts[0];
    if (SUPPORTED_LANGS.includes(maybeLang)) return maybeLang;
    return lang;
  }, [pathname, lang]);

  const navItems = useMemo(() => getNavItems(activeLang), [activeLang]);
  const settingsLabel = useMemo(() => t("nav.settings", activeLang), [activeLang]);

  const handleLangChange = (nextLang) => {
    if (!pathname) {
      router.push(`/${nextLang}`);
      return;
    }
    const parts = pathname.split("/").filter(Boolean);
    parts[0] = nextLang;
    const newPath = "/" + parts.join("/");
    router.push(newPath || `/${nextLang}`);
  };

  return (
    <>
      <header className="app-shell header-root-premium" role="banner">
        <motion.div 
          className="surface header-inner-premium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="header-left-premium">
            <Link 
              href={`/${activeLang}`} 
              className="header-logo-link"
              aria-label="Salzburg52 Home"
              style={{ 
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <Logo size={36} showText={true} />
            </Link>
          </div>

          <nav className="header-nav-premium" aria-label="Main">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <NavLink
                  key={item.key}
                  href={item.href}
                  isActive={isActive}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="header-right-premium">
            <motion.button
              type="button"
              className="header-settings-btn-premium"
              onClick={() => setIsSettingsOpen(true)}
              onMouseEnter={() => setIsSettingsHovered(true)}
              onMouseLeave={() => setIsSettingsHovered(false)}
              aria-haspopup="dialog"
              aria-expanded={isSettingsOpen}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              animate={{
                boxShadow: isSettingsHovered 
                  ? "0 8px 24px rgba(37, 99, 235, 0.25), 0 0 20px rgba(37, 99, 235, 0.15)"
                  : "0 4px 12px rgba(37, 99, 235, 0.1)"
              }}
            >
              <span className="settings-btn-text">{settingsLabel}</span>
              <motion.span 
                className="settings-btn-icon"
                animate={{ rotate: isSettingsHovered ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ⚙
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
      </header>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={activeLang}
        onLangChange={handleLangChange}
        theme={theme}
        onThemeChange={setTheme}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        reducedMotion={reducedMotion}
        onReducedMotionChange={setReducedMotion}
      />
    </>
  );
}
