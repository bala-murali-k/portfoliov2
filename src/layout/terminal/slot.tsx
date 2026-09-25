import type { ReactNode } from 'react';

interface SlotProps {
  name: string;
  children?: ReactNode;
}

/**
 * Marks a named placement point inside terminal's layout (header, footer,
 * sidebar). Renders whatever content was given for that slot, or nothing
 * if unfilled. Carries no visual opinion - just a data-slot marker for
 * CSS to hook into.
 */
export default function Slot({ name, children }: SlotProps) {
  if (!children) return null;
  return <div data-slot={name}>{children}</div>;
}

