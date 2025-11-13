import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// PUBLIC_INTERFACE
export const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

/**
 * PUBLIC_INTERFACE
 * ThemeProvider wraps the app and manages theme state by toggling data-theme on documentElement.
 */
export function ThemeProvider({ children, defaultTheme = "dark" }) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      setTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Access theme state and toggler */
  return useContext(ThemeContext);
}
