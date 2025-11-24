"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import SettingsPanel from "@/components/SettingsPanel";
import { useTheme } from "@/components/ThemeProvider";
import { SUPPORTED_LANGS } from "@/lib/copy";

function buildHref(lang, segment) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = "en";
  if (!segment || segment === "home") return `/${lang}`;
  return `/${lang}/${segment}`;
}

export default function Header({ lang = "en" }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const activeLang = useMemo(() => {
    if (!pathname) return lang;
    const parts = pathname.split("/").filter(Boolean);
    const maybeLang = parts[0];
    if (SUPPORTED_LANGS.includes(maybeLang)) return maybeLang;
    return lang;
  }, [pathname, lang]);

  const navItems = [
    { key: "home", label: "Home" },
    { key: "info", label: "Info" },
    { key: "salzburg", label: "Salzburg" },
    { key: "support", label: "Support" }
  ];

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
      <header className="app-shell header-root" role="banner">
        <div className="surface header-inner">
          <div className="header-left">
            <Link href={`/${activeLang}`} className="header-logo">
              <span className="header-logo-dot" />
              <span className="header-logo-text">Salzburg52</span>
            </Link>
          </div>

          <nav className="header-nav" aria-label="Main">
            {navItems.map((item) => {
              const href = buildHref(
                activeLang,
                item.key === "home" ? "" : item.key
              );
              const isActive = pathname === href;
              return (
                <Link
                  key={item.key}
                  href={href}
                  className={`header-nav-link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-right">
            <button
              type="button"
              className="header-settings-btn"
              onClick={() => setIsSettingsOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={isSettingsOpen}
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={activeLang}
        onLangChange={handleLangChange}
        theme={theme}
        onThemeChange={setTheme}
      />
    </>
  );
}
