import { useEffect, useRef, useState } from 'react';
import Slot from './slot';
import styles from './core.layout.module.css';
import { CoreLayoutProps } from '../core.layout';
import { Menu, X } from 'lucide-react';

/**
 * Minimal Mini Layout: Android and low-resolution mobile screens (<= 800px).
 *
 * Distinct architecture and functionality from desktop minimal:
 * - Natural vertical touch scrolling (no wheel hijacking, no horizontal lock).
 * - Mobile header with navigation drawer toggle.
 * - Slide-out mobile drawer for sidebar navigation links.
 * - Clean mobile footer.
 * - No desktop sticky extremity buttons or hover tooltips.
 */
export default function CoreLayout({ pageKey, slots = {}, children }: CoreLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close drawer and scroll to top on route change
  useEffect(() => {
    setIsDrawerOpen(false);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pageKey]);

  const handleDrawerClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('a')) {
      setIsDrawerOpen(false);
    }
  };

  const hasSidebar = Boolean(slots.sidebar);

  return (
    <div className={styles.layout} data-layout="minimalmini">
      {/* Mobile Top App Bar */}
      <div className={styles.headerBar}>
        <Slot name="header" data-region="header">
          {slots.header}
        </Slot>
        {hasSidebar && (
          <button
            type="button"
            className={styles.navToggleBtn}
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            aria-label={isDrawerOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isDrawerOpen}
          >
            {isDrawerOpen ? <X /> : <Menu />}
          </button>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {hasSidebar && (
        <>
          <div
            className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.open : ''}`}
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          <aside
            className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}
            onClick={handleDrawerClick}
            aria-label="Mobile navigation"
          >
            <div className={styles.drawerHeader}>
              <span className={styles.drawerTitle}>Menu</span>
              <button
                type="button"
                className={styles.drawerCloseBtn}
                onClick={() => setIsDrawerOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.drawerBody}>
              <Slot name="sidebar" data-region="sidebar">
                {slots.sidebar}
              </Slot>
            </div>
          </aside>
        </>
      )}

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

