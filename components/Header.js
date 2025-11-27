"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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
        style={{ transformOrigin: 'left' }}
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
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const scrollThreshold = 50;

  const { scrollY } = useScroll();
  const headerBlur = useTransform(scrollY, [0, 100], [0, 20]);
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.8)']);
  const headerBlurStyle = useTransform(headerBlur, (v) => `blur(${v}px)`);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }
      
      const scrollDiff = currentScrollY - lastScrollY.current;
      
      if (scrollDiff > scrollThreshold) {
        setIsVisible(false);
        lastScrollY.current = currentScrollY;
      }
      else if (scrollDiff < -5) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion]);

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
      <motion.header 
        className="app-shell header-root-premium" 
        role="banner"
        initial={{ y: 0 }}
        animate={{ 
          y: reducedMotion ? 0 : (isVisible ? 0 : -100),
          opacity: reducedMotion ? 1 : (isVisible ? 1 : 0)
        }}
        transition={{ 
          duration: reducedMotion ? 0 : 0.3, 
          ease: [0.25, 0.1, 0.25, 1]
        }}
        style={{
          backdropFilter: headerBlurStyle,
          WebkitBackdropFilter: headerBlurStyle,
          backgroundColor: headerBg,
        }}
      >
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

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`hamburger-icon${isMobileMenuOpen ? ' is-open' : ''}`} />
          </button>

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
      </motion.header>

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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={reducedMotion ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: reducedMotion ? 0 : 0.3 }}
          >
            <button
              className="mobile-menu-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.05)',
                border: 'none',
                width: '44px',
                height: '44px',
                minWidth: '44px',
                minHeight: '44px',
                borderRadius: '12px',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'var(--color-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ×
            </button>
            
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.key}
                  initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : index * 0.05, duration: reducedMotion ? 0 : 0.3 }}
                >
                  <Link
                    href={item.href}
                    className={`mobile-menu-link${isActive ? ' is-active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
            
            <motion.button
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : navItems.length * 0.05, duration: reducedMotion ? 0 : 0.3 }}
              className="mobile-menu-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSettingsOpen(true);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {settingsLabel} ⚙
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
