"use client";

import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (mode: ThemeMode) => {
    if (typeof window === "undefined") return;

    const isDark =
      mode === "dark" ||
      (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      root.classList.remove("light");
      setResolvedTheme("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      setResolvedTheme("light");
    }
  };

  useEffect(() => {
    setMounted(true);
    let initialMode: ThemeMode = "system";

    try {
      const saved = localStorage.getItem("theme") as ThemeMode | null;
      if (saved === "light" || saved === "dark" || saved === "system") {
        initialMode = saved;
      }
    } catch (e) {
      console.warn("Could not read theme from localStorage", e);
    }

    setThemeState(initialMode);
    applyTheme(initialMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      let currentSaved: string | null = null;
      try {
        currentSaved = localStorage.getItem("theme");
      } catch (e) {}

      if (!currentSaved || currentSaved === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = (mode: ThemeMode) => {
    setThemeState(mode);
    try {
      if (mode === "system") {
        localStorage.removeItem("theme");
      } else {
        localStorage.setItem("theme", mode);
      }
    } catch (e) {
      console.warn("Could not save theme to localStorage", e);
    }
    applyTheme(mode);
  };

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  return { theme, resolvedTheme, setTheme, toggleTheme, mounted };
}
