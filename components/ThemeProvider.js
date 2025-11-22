"use client";

import { createContext, useContext, useEffect, useState } from "react";

const THEME_KEY = "salzburg52-theme";

const ThemeContext = createContext({
  theme: "system",
  setTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("system");

  // Load stored preference or default to system
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
    } else {
      setTheme("system");
    }
  }, []);

  // Apply theme + persist + react to system changes (when theme === system)
  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const root = document.documentElement;

    const applyTheme = (activeTheme) => {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

      const useDark =
        activeTheme === "dark" || (activeTheme === "system" && prefersDark);

      if (useDark) {
        root.classList.add("theme-dark");
      } else {
        root.classList.remove("theme-dark");
      }
    };

    applyTheme(theme);
    window.localStorage.setItem(THEME_KEY, theme);

    if (theme === "system" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => applyTheme("system");
      mq.addEventListener("change", listener);
      return () => mq.removeEventListener("change", listener);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
