"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const SUPPORTED_LANGS = ["en", "de", "it", "fr", "es"];

function buildHref(lang, segment) {
  if (!SUPPORTED_LANGS.includes(lang)) lang = "en";
  if (!segment || segment === "home") return `/${lang}`;
  return `/${lang}/${segment}`;
}

export default function Header({ lang = "en", onOpenSettings }) {
  const pathname = usePathname();

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

  return (
    <header className="app-shell header-root">
      <div className="surface header-inner">
        <div className="header-left">
          <Link href={`/${activeLang}`} className="header-logo">
            <span className="header-logo-dot" />
            <span className="header-logo-text">Salzburg52</span>
          </Link>
        </div>

        <nav className="header-nav">
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
            onClick={onOpenSettings}
          >
            Settings
          </button>
        </div>
      </div>
    </header>
  );
}
