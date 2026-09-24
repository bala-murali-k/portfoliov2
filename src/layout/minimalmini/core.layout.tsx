import { useEffect, useRef } from 'react';
import Slot from './slot';
import styles from './core.layout.module.css';
import { CoreLayoutProps } from '../core.layout';

/**
 * Minimal Mini Layout: Android and low-resolution mobile screens (<= 800px).
 *
 * Distinct architecture and functionality from desktop minimal:
 * - Natural vertical touch scrolling (no wheel hijacking, no horizontal lock).
 * - Mobile header with title, style switcher, and theme switcher.
 * - Mobile footer serving as bottom navigation bar.
 * - Clean mobile layout without desktop sticky extremity buttons or hover tooltips.
 */
export default function CoreLayout({ pageKey, slots = {}, children }: CoreLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pageKey]);

  return (
    <div className={styles.layout} data-layout="minimalmini">
      {/* Mobile Top App Bar */}
      <div className={styles.headerBar}>
        <Slot name="header" data-region="header">
          {slots.header}
        </Slot>
      </div>

      {/* Main Content Area - Natural vertical scroll */}
      <main ref={mainRef} data-region="main">
        {children}
      </main>

      {/* Mobile Footer */}
      <Slot name="footer" data-region="footer">
        {slots.footer}
      </Slot>
    </div>
  );
}

