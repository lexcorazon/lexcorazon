import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { themes } from './tokens';

const ThemeCtx = createContext({ brand: 'aj' });

export function ThemeProvider({ brand = 'aj', children }) {
  const vars = useMemo(() => themes[brand] ?? themes.aj, [brand]);

  useEffect(() => {
    const el = document.documentElement; // <html>
    el.setAttribute('data-brand', brand);
    Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v));
    return () => {
      Object.keys(vars).forEach((k) => document.documentElement.style.removeProperty(k));
    };
  }, [brand, vars]);

  return <ThemeCtx.Provider value={{ brand }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);
