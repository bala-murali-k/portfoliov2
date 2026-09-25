import Slot from './slot';
import styles from './core.layout.module.css';
import type { CoreLayoutProps } from '../core.layout';

export default function CoreLayout({ slots = {}, children }: CoreLayoutProps) {
  return (
    <div className={styles.layout} data-layout="modern">
      <div className={styles.headerRegion} data-region="header">
        <Slot name="header">{slots.header}</Slot>
      </div>

      <main className={styles.mainRegion} data-region="main">
        {children}
      </main>

      <div className={styles.footerRegion} data-region="footer">
        <Slot name="footer">{slots.footer}</Slot>
      </div>
    </div>
  );
}
