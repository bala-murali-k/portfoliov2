import { useEffect, useRef, useState } from 'react';
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
 * - Auto-hiding header and footer on scroll down, revealing on slight scroll up.
 */
export default function CoreLayout({ pageKey, slots = {}, children }: CoreLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Scroll to top and reset nav visibility on route change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    lastScrollY.current = 0;
    setIsNavVisible(true);
  }, [pageKey]);

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const currentScrollY = mainEl.scrollTop;

      // Always keep visible when near the very top
      if (currentScrollY <= 15) {
        setIsNavVisible(true);
        lastScrollY.current = Math.max(0, currentScrollY);
        return;
      }

      // Ignore overscroll bounce at the bottom
      const maxScroll = mainEl.scrollHeight - mainEl.clientHeight;
      if (currentScrollY > maxScroll) {
        return;
      }

      const diff = currentScrollY - lastScrollY.current;

      // Scroll down: hide header and footer
      if (diff > 8) {
        setIsNavVisible(false);
      }
      // Slightly scrolling upwards (diff < -5): show header and footer
      else if (diff < -5) {
        setIsNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    mainEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainEl.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.layout} data-layout="minimalmini">
      {/* Mobile Top App Bar */}
      <div
        className={`${styles.headerBar} ${!isNavVisible ? styles.headerHidden : ''}`}
        data-region="header"
      >
        <Slot name="header">
          {slots.header}
        </Slot>
      </div>

      {/* Main Content Area - Natural vertical scroll */}
      <main ref={mainRef} data-region="main">
        {children}
      </main>

      {/* Mobile Footer - Bottom navigation bar */}
      <div
        className={`${styles.footerBar} ${!isNavVisible ? styles.footerHidden : ''}`}
        data-region="footer"
      >
        <Slot name="footer">
          {slots.footer}
        </Slot>
      </div>
    </div>
  );
}

