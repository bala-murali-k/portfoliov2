import type { ButtonHTMLAttributes, ComponentType, ReactNode } from 'react';
import { useStyle } from '@context/global/style-context';
import { defaultStyleId } from '@styles/index';
import ModernButton from './modern';
import MinimalButton from './minimal';
import MinimalMiniButton from './minimalmini';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Registry of style id -> that style's own Button implementation. Add a
 * new style by creating component/common/button/<id>/button.tsx
 * (+ index.ts) and registering it here - nothing outside this file needs
 * to change.
 */
const variants: Record<string, ComponentType<ButtonProps>> = {
  modern: ModernButton,
  minimal: MinimalButton,
  minimalmini: MinimalMiniButton,
};

export default function CoreButton(props: ButtonProps) {
  const { styleId } = useStyle();
  const Variant = variants[styleId] ?? variants[defaultStyleId];
  return <Variant {...props} />;
}
