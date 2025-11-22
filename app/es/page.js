"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Cursor from "@/components/Cursor";
import SettingsPanel from "@/components/SettingsPanel";
import MediaStrip from "@/components/MediaStrip";

import { getGreetingForTime, getHeroCopy } from "@/lib/copy";
import { getRandomSnippet } from "@/lib/quotes";

const LANG = "es";
const THEME_KEY = "salzburg52-theme";
const SNIPPET_KEY = `salzburg52-snippet-${LANG}`;

export default function EsHomePage() {
  const router = useRouter();
  const pathname = usePathname();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [theme, setTheme] = useState("system");
  const [greeting, setGreeting] = useState("");
  const [snippet, setSnippet] = useState(null);

  const heroCopy = getHeroCopy(LANG);

  useEffect(() => {
    setGreeting(getGreetingForTime(LANG, new Date()));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = window.localStorage.getItem(THEME_KEY);
    if (
      storedTheme === "light" ||
      storedTheme === "dark" ||
      storedTheme === "system"
    ) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const root = document.documentElement;
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const useDark = theme === "dark" || (theme === "system" && prefersDark);

    if (useDark) {
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
    }

    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const previousId = window.localStorage.getItem(SNIPPET_KEY) || undefined;
    const chosen = getRandomSnippet(LANG, { excludeId: previousId });
    if (chosen) {
      setSnippet(chosen);
      window.localStorage.setItem(SNIPPET_KEY, chosen.id);
    }
  }, []);

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

  const handleThemeChange = (value) => {
    setTheme(value);
  };

  return (
    <>
      <Cursor />
      <Header lang={LANG} onOpenSettings={() => setIsSettingsOpen(true)} />
      <main>
        <Hero
          greeting={greeting || getGreetingForTime(LANG, new Date())}
          title={heroCopy.title}
          subtitle={heroCopy.subtitle}
          accent={heroCopy.accent}
          lang={LANG}
        />

                {snippet && (
          <section className="app-shell snippet-root">
            <div className="surface snippet-inner">
              <p className="snippet-label text-muted">
                {snippet.kind === "quote"
                  ? "Cita"
                  : snippet.kind === "fact"
                  ? "Dato curioso"
                  : "Sólo por diversión"}
              </p>
              <p className="snippet-text">{snippet.text}</p>
            </div>
          </section>
        )}

        <section className="app-shell feature-root">
          <div className="surface feature-inner">
            <h2 className="feature-title">De qué va esta página</h2>
            <p className="feature-text">
              Salzburg52 es un espacio personal donde se mezclan idiomas,
              recepción de hotel y un poco de vida en Salzburgo.
            </p>
            <ul className="feature-list">
              <li>Presentar quién soy y cómo trabajo en el front office.</li>
              <li>Ofrecer formas de contacto en varios idiomas.</li>
              <li>Ir sumando poco a poco rincones y notas de la ciudad.</li>
            </ul>
          </div>
        </section>

        <MediaStrip />

      </main>
      <Footer lang={LANG} />

      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={LANG}
        onLangChange={handleLangChange}
        theme={theme}
        onThemeChange={handleThemeChange}
      />
    </>
  );
}
