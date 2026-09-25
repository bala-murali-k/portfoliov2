import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernHome from './modern';
import MinimalHome from './minimal';
import MinimalMiniHome from './minimalmini';
import TerminalHome from './terminal';

/**
 * Registry of style id -> that style's own Home implementation. Add a new
 * style by creating component/home/<id>/home.tsx (+ index.ts) and
 * registering it here - nothing outside this file needs to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernHome,
  minimal: MinimalHome,
  minimalmini: MinimalMiniHome,
  terminal: TerminalHome,
};

export default function CoreHome() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
