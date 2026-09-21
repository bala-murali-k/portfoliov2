import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernHeader from './modern';
import MinimalHeader from './minimal';
import MinimalMiniHeader from './minimalmini';

/**
 * Registry of style id -> that style's own Header implementation. Add a
 * new style by creating component/common/header/<id>/header.tsx
 * (+ index.ts) and registering it here - nothing outside this file needs
 * to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernHeader,
  minimal: MinimalHeader,
  minimalmini: MinimalMiniHeader,
};

export default function CoreHeader() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
