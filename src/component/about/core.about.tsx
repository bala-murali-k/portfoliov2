import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernAbout from './modern';
import MinimalAbout from './minimal';
import MinimalMiniAbout from './minimalmini';
import TerminalAbout from './terminal';

/**
 * Registry of style id -> that style's own About implementation. Add a new
 * style by creating component/about/<id>/about.tsx (+ index.ts) and
 * registering it here - nothing outside this file needs to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernAbout,
  minimal: MinimalAbout,
  minimalmini: MinimalMiniAbout,
  terminal: TerminalAbout,
};

export default function CoreAbout() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
