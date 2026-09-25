import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernStyleSwitcher from './modern';
import MinimalStyleSwitcher from './minimal';
import MinimalMiniStyleSwitcher from './minimalmini';
import TerminalStyleSwitcher from './terminal';

/**
 * Registry of style id -> that style's own StyleSwitcher implementation.
 * Add a new style by creating
 * component/common/style-switcher/<id>/style-switcher.tsx (+ index.ts)
 * and registering it here - nothing outside this file needs to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernStyleSwitcher,
  minimal: MinimalStyleSwitcher,
  minimalmini: MinimalMiniStyleSwitcher,
  terminal: TerminalStyleSwitcher,
};

export default function CoreStyleSwitcher() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
