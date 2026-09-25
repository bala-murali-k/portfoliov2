import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernContact from './modern';
import MinimalContact from './minimal';
import MinimalMiniContact from './minimalmini';
import TerminalContact from './terminal';

/**
 * Registry of style id -> that style's own Contact implementation. Add a
 * new style by creating component/contact/<id>/contact.tsx (+ index.ts)
 * and registering it here - nothing outside this file needs to change.
 *
 * No backend exists yet (per architecture: frontend-only for v1) - each
 * variant handles its own local-only submission state.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernContact,
  minimal: MinimalContact,
  minimalmini: MinimalMiniContact,
  terminal: TerminalContact,
};

export default function CoreContact() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
