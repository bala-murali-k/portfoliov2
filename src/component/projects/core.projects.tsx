import type { ComponentType } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernProjects from './modern';
import MinimalProjects from './minimal';
import MinimalMiniProjects from './minimalmini';
import TerminalProjects from './terminal';

/**
 * Registry of style id -> that style's own Projects implementation. Add a
 * new style by creating component/projects/<id>/projects.tsx (+ index.ts)
 * and registering it here - nothing outside this file needs to change.
 */
const variants: Record<string, ComponentType> = {
  modern: ModernProjects,
  minimal: MinimalProjects,
  minimalmini: MinimalMiniProjects,
  terminal: TerminalProjects,
};

export default function CoreProjects() {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant />;
}
