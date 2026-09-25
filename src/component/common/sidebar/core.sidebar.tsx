import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernSidebar from './modern';
import MinimalSidebar from './minimal';
import MinimalMiniSidebar from './minimalmini';
import TerminalSidebar from './terminal';

/**
 * Registry of style id -> that style's own Sidebar implementation. Add a
 * new style by creating component/common/sidebar/<id>/sidebar.tsx
 * (+ index.ts) and registering it here - nothing outside this file needs
 * to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernSidebar,
  minimal: MinimalSidebar,
  minimalmini: MinimalMiniSidebar,
  terminal: TerminalSidebar,
};

export default function CoreSidebar() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
