import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernFooter from './modern';
import MinimalFooter from './minimal';
import MinimalMiniFooter from './minimalmini';
import TerminalFooter from './terminal';

/**
 * Registry of style id -> that style's own Footer implementation. Add a
 * new style by creating component/common/footer/<id>/footer.tsx
 * (+ index.ts) and registering it here - nothing outside this file needs
 * to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernFooter,
  minimal: MinimalFooter,
  minimalmini: MinimalMiniFooter,
  terminal: TerminalFooter,
};

export default function CoreFooter() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
