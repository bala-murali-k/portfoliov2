import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernThemeSwitcher from './modern';
import MinimalThemeSwitcher from './minimal';
import MinimalMiniThemeSwitcher from './minimalmini';

/**
 * Registry of style id -> that style's own ThemeSwitcher implementation.
 * Add a new style by creating
 * component/common/theme-switcher/<id>/theme-switcher.tsx (+ index.ts)
 * and registering it here - nothing outside this file needs to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernThemeSwitcher,
  minimal: MinimalThemeSwitcher,
  minimalmini: MinimalMiniThemeSwitcher,
};

export default function CoreThemeSwitcher() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
