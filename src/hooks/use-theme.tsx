import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Remove both themes from root and body
    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");
    
    // Add theme to both root and body
    root.classList.add(theme);
    body.classList.add(theme);
    
    // Store theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme };
}