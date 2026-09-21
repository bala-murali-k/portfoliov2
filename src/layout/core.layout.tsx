import type { ComponentType, ReactNode } from 'react';
import { useStyle } from '@context/global/style-context';
import ModernLayout from './modern/core.layout';
import MinimalLayout from './minimal/core.layout';
import MinimalMiniLayout from './minimalmini/core.layout';

export interface CoreLayoutSlots {
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
}

export interface CoreLayoutProps {
  pageKey: string;
  slots?: CoreLayoutSlots;
  children: ReactNode;
}

/**
 * Registry of style id -> that style's own layout component. Add a new
 * style's layout by creating layout/<id>/core.layout.tsx and registering
 * it here - nothing outside this file needs to change.
 */
const layouts: Record<string, ComponentType<CoreLayoutProps>> = {
  modern: ModernLayout,
  minimal: MinimalLayout,
  minimalmini: MinimalMiniLayout,
};

const fallbackStyleId = 'modern';

export default function CoreLayout(props: CoreLayoutProps) {
  const { styleId } = useStyle();
  const Layout = layouts[styleId] ?? layouts[fallbackStyleId];
  return <Layout {...props} />;
}
