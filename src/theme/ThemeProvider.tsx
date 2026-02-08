import type React from "react";
import { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const html = document.documentElement;

    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  const ToggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{theme, ToggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
