"use client";

import { createContext, useEffect, useState } from "react";

export const themeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export default function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("finntrack-theme");
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      const prefersLight =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;
      setTheme(prefersLight ? "light" : "dark");
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("finntrack-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </themeContext.Provider>
  );
}

