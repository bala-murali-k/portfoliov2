import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getStyleConfig, listStyleConfigs, defaultStyleId, styleRegistry } from '@styles/index';
import type { StyleConfig } from '@styles/types';
import type { Theme } from '@theme/types';
import { useMediaQuery } from '@/utils/hooks/common/use.media.query';

const DEFAULT_THEME_ID = 'light';

interface StyleContextValue {
  style: StyleConfig;
  theme: Theme;
  styleId: string;
  themeId: string;
  availableStyles: StyleConfig[];
  availableThemes: Theme[];
  toggleTheme: () => void;
  switchStyle: (styleId: string) => void;
}

const StyleContext = createContext<StyleContextValue | null>(null);

export function StyleProvider({ children }: { children: ReactNode }) {
  const [selectedStyleId, setSelectedStyleId] = useState(defaultStyleId);
  const [themeId, setThemeId] = useState(DEFAULT_THEME_ID);
  const isMini = useMediaQuery('(max-width: 800px)');

  // When <= 800px is met, dynamically resolve `<styleId>mini` if it exists in styleRegistry
  const styleId = isMini && styleRegistry[`${selectedStyleId}mini`]
    ? `${selectedStyleId}mini`
    : selectedStyleId;

  const style = getStyleConfig(styleId);
  const theme = style.themes[themeId] ?? style.themes[DEFAULT_THEME_ID];

  // Reflect active style/theme on <html> as the hook point CSS attaches to,
  // and expose every theme color as a --color-<key> custom property.
  useEffect(() => {
    document.documentElement.setAttribute('data-style', style.id);
    document.documentElement.setAttribute('data-theme', theme.id);
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--color-${key}`, value);
    });
  }, [style.id, theme.id, theme.colors]);

  function toggleTheme() {
    setThemeId((current) => (current === 'light' ? 'dark' : 'light'));
  }

  function switchStyle(nextStyleId: string) {
    const baseId = nextStyleId.endsWith('mini')
      ? nextStyleId.replace(/mini$/, '')
      : nextStyleId;
    const next = getStyleConfig(nextStyleId);
    setSelectedStyleId(baseId);
    setThemeId(next.themes[DEFAULT_THEME_ID] ? DEFAULT_THEME_ID : Object.keys(next.themes)[0]);
  }

  const value = useMemo<StyleContextValue>(
    () => ({
      style,
      theme,
      styleId: style.id,
      themeId: theme.id,
      availableStyles: listStyleConfigs().filter((s) => !s.id.endsWith('mini')),
      availableThemes: Object.values(style.themes),
      toggleTheme,
      switchStyle,
    }),
    [style, theme]
  );

  return <StyleContext.Provider value={value}>{children}</StyleContext.Provider>;
}

export function useStyle() {
  const ctx = useContext(StyleContext);
  if (!ctx) throw new Error('useStyle must be used within a StyleProvider');
  return ctx;
}
