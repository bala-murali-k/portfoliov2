import { Moon, Sun } from 'lucide-react';
import { useStyle } from '@context/global/style-context';
import styles from './theme-switcher.module.css';

export default function TerminalThemeSwitcher() {
  const { themeId, toggleTheme } = useStyle();
  const Icon = themeId === 'dark' ? Moon : Sun;

  return (
    <button
      type="button"
      className={styles.button}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-current-theme={themeId}
    >
      <Icon size={16} aria-hidden="true" />
    </button>
  );
}

