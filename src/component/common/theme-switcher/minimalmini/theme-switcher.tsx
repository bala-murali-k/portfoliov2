import { Moon, Sun } from 'lucide-react';
import { useStyle } from '@context/global/style-context';

export default function MinimalMiniThemeSwitcher() {
  const { themeId, toggleTheme } = useStyle();
  const Icon = themeId === 'dark' ? Moon : Sun;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-current-theme={themeId}
    >
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}

