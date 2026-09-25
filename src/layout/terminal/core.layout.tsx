import Slot from './slot';
import styles from './core.layout.module.css';
import type { CoreLayoutProps } from '../core.layout';
import { useRealTerminalMode } from '@/utils/hooks/terminal/use.terminal.mode';
import TerminalEmulator from '@/component/terminal/emulator/terminal.emulator';

export default function CoreLayout({ slots = {}, children }: CoreLayoutProps) {
  const [isRealTerminal] = useRealTerminalMode();

  return (
    <div
      className={styles.layout}
      data-layout="terminal"
      data-real-terminal={isRealTerminal ? 'true' : undefined}
    >
      <div className={styles.headerRegion} data-region="header">
        <Slot name="header">{slots.header}</Slot>
      </div>

      <main
        className={`${styles.mainRegion} ${isRealTerminal ? styles.mainRegionTerminal : ''}`}
        data-region="main"
      >
        {isRealTerminal ? <TerminalEmulator /> : children}
      </main>

      <div className={styles.footerRegion} data-region="footer">
        <Slot name="footer">{slots.footer}</Slot>
      </div>
    </div>
  );
}

