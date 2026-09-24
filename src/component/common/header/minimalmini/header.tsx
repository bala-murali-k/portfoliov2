import { Link } from 'react-router-dom';
import ThemeSwitcher from '../../theme-switcher/core.theme-switcher';
import StyleSwitcher from '../../style-switcher/core.style-switcher';

export default function MinimalMiniHeader() {
  return (
    <header>
      <Link to={'/'}>Dev</Link>
      <StyleSwitcher />
      <ThemeSwitcher />
    </header>
  );
}
