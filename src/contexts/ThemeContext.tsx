import { createContext, useContext, useEffect, useState } from "react";

import { STORAGE_KEYS, getItem, setItem } from "@/src/services/storage";

import { dark, light } from "@/src/theme/themes";

import { ThemeColors, ThemeName } from "@/src/theme/types";

type ThemeContextData = {
  theme: ThemeName;
  colors: ThemeColors;
  isDark: boolean;
  setTheme: (theme: ThemeName) => Promise<void>;
};

const ThemeContext = createContext({} as ThemeContextData);

const themes: Record<ThemeName, ThemeColors> = {
  light,
  dark,

  ecla: light,
  eclaDark: dark,

  jbs: light,
  jbsDark: dark,

  seara: light,
  searaDark: dark,
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>("dark");

  useEffect(() => {
    loadTheme();
  }, []);

  async function loadTheme() {
    const savedTheme = await getItem<ThemeName>(STORAGE_KEYS.THEME);

    if (savedTheme && themes[savedTheme]) {
      setThemeState(savedTheme);
    }
  }

  async function setTheme(themeName: ThemeName) {
    setThemeState(themeName);

    await setItem(STORAGE_KEYS.THEME, themeName);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors: themes[theme],
        isDark: theme === "dark" || theme.includes("Dark"),
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
