import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernNotFound from './modern/notfound';
import MinimalNotFound from './minimal/notfound';
import MinimalMiniNotFound from './minimalmini/notfound';

/**
 * Registry of style id -> that style's own NotFound implementation. Add a
 * new style by creating component/404/<id>/notfound.tsx (+ index.ts)
 * and registering it here - nothing outside this file needs to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernNotFound,
  minimal: MinimalNotFound,
  minimalmini: MinimalMiniNotFound,
};

export default function CoreNotFound() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
