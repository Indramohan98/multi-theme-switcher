import React, { createContext, useContext, useState, useEffect } from "react";
import theme1 from "../themes/theme1";
import theme2 from "../themes/theme2";
import theme3 from "../themes/theme3";

const themes = {
  theme1,
  theme2,
  theme3,
};

type ThemeName = keyof typeof themes;

interface ThemeContextType {
  theme: typeof theme1;
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedTheme = (localStorage.getItem("theme") as ThemeName) || "theme1";
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(storedTheme);

  const setTheme = (themeName: ThemeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem("theme", themeName);
  };

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ theme: themes[currentTheme], currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
