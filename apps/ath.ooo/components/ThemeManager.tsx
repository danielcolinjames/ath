"use client";

import { useEffect } from "react";

export function ThemeManager() {
  useEffect(() => {
    // Check if user prefers dark mode
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

    const updateTheme = (isDark: boolean) => {
      document.cookie = `theme=${isDark ? "dark" : "light"}; path=/`;
      // Force favicon refresh by updating its URL
      const favicon = document.querySelector(
        'link[rel="icon"]',
      ) as HTMLLinkElement;
      if (favicon) {
        favicon.href =
          favicon.href.split("&theme=")[0] +
          `&theme=${isDark ? "dark" : "light"}&t=${Date.now()}`;
      }
    };

    // Initial theme set
    updateTheme(darkModeMediaQuery.matches);

    // Listen for system theme changes
    darkModeMediaQuery.addEventListener("change", (e) =>
      updateTheme(e.matches),
    );

    return () =>
      darkModeMediaQuery.removeEventListener("change", (e) =>
        updateTheme(e.matches),
      );
  }, []);

  return null;
}
