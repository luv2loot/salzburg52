"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

const THEME_KEY = "salzburg52-theme";
const FONT_SIZE_KEY = "salzburg52-font-size";
const REDUCED_MOTION_KEY = "salzburg52-reduced-motion";

export const THEMES = [
  { key: "system", label: "System" },
  { key: "auto", label: "Auto (Time)" },
  { key: "light", label: "Light" },
  { key: "dark", label: "Dark" },
  { key: "salzburg-night", label: "Salzburg Night" }
];

export const FONT_SIZE_OPTIONS = [
  { value: 90, label: "Small" },
  { value: 100, label: "Normal" },
  { value: 110, label: "Large" },
  { value: 120, label: "Extra Large" }
];

const ThemeContext = createContext({
  theme: "system",
  appliedTheme: "light",
  setTheme: () => {},
  fontSize: 100,
  setFontSize: () => {},
  reducedMotion: false,
  setReducedMotion: () => {}
});

function getSystemPreference() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getTimeBasedTheme() {
  const hour = new Date().getHours();
  return (hour >= 6 && hour < 18) ? "light" : "dark";
}

function computeAppliedTheme(preference) {
  if (preference === "system") {
    return getSystemPreference();
  }
  if (preference === "auto") {
    return getTimeBasedTheme();
  }
  return preference;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("system");
  const [appliedTheme, setAppliedTheme] = useState("light");
  const [fontSize, setFontSizeState] = useState(100);
  const [reducedMotion, setReducedMotionState] = useState(false);
  const [mounted, setMounted] = useState(false);

  const updateAppliedTheme = useCallback((preference) => {
    setAppliedTheme(computeAppliedTheme(preference));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedTheme = window.localStorage.getItem(THEME_KEY);
    const storedFontSize = window.localStorage.getItem(FONT_SIZE_KEY);
    const storedReducedMotion = window.localStorage.getItem(REDUCED_MOTION_KEY);

    let initialTheme = "system";
    if (storedTheme && THEMES.some(t => t.key === storedTheme)) {
      initialTheme = storedTheme;
    }

    setThemeState(initialTheme);
    setAppliedTheme(computeAppliedTheme(initialTheme));

    if (storedFontSize) {
      const parsedSize = parseInt(storedFontSize, 10);
      if (FONT_SIZE_OPTIONS.some(opt => opt.value === parsedSize)) {
        setFontSizeState(parsedSize);
      } else if (storedFontSize === "large") {
        setFontSizeState(110);
      }
    }

    if (storedReducedMotion === "true") {
      setReducedMotionState(true);
    }

    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        updateAppliedTheme("system");
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme, mounted, updateAppliedTheme]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    if (theme === "auto") {
      const checkTime = () => {
        updateAppliedTheme("auto");
      };
      const intervalId = setInterval(checkTime, 60000);
      return () => clearInterval(intervalId);
    }
  }, [theme, mounted, updateAppliedTheme]);

  useEffect(() => {
    if (!mounted) return;
    updateAppliedTheme(theme);
  }, [theme, mounted, updateAppliedTheme]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const root = document.documentElement;

    root.classList.remove("theme-light", "theme-dark", "theme-salzburg-night");

    if (appliedTheme === "dark") {
      root.classList.add("theme-dark");
    } else if (appliedTheme === "salzburg-night") {
      root.classList.add("theme-salzburg-night");
    } else {
      root.classList.add("theme-light");
    }
  }, [appliedTheme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window === "undefined") return;

    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const root = document.documentElement;

    root.classList.remove("font-size-small", "font-size-normal", "font-size-large", "font-size-xlarge");

    if (fontSize === 90) {
      root.classList.add("font-size-small");
    } else if (fontSize === 100) {
      root.classList.add("font-size-normal");
    } else if (fontSize === 110) {
      root.classList.add("font-size-large");
    } else if (fontSize === 120) {
      root.classList.add("font-size-xlarge");
    }

    root.style.setProperty("--font-scale", `${fontSize / 100}`);

    window.localStorage.setItem(FONT_SIZE_KEY, String(fontSize));
  }, [fontSize, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (typeof document === "undefined" || typeof window === "undefined") return;

    const root = document.documentElement;

    if (reducedMotion) {
      root.classList.add("reduced-motion");
    } else {
      root.classList.remove("reduced-motion");
    }

    window.localStorage.setItem(REDUCED_MOTION_KEY, String(reducedMotion));
  }, [reducedMotion, mounted]);

  const setTheme = (newTheme) => {
    if (THEMES.some(t => t.key === newTheme)) {
      setThemeState(newTheme);
    }
  };

  const setFontSize = (size) => {
    const numSize = typeof size === "string" ? parseInt(size, 10) : size;
    if (FONT_SIZE_OPTIONS.some(opt => opt.value === numSize)) {
      setFontSizeState(numSize);
    }
  };

  const setReducedMotion = (value) => {
    setReducedMotionState(Boolean(value));
  };

  return (
    <ThemeContext.Provider value={{ 
      theme,
      appliedTheme,
      setTheme, 
      fontSize, 
      setFontSize, 
      reducedMotion, 
      setReducedMotion 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
