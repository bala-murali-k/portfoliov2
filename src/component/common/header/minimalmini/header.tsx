import { Link } from 'react-router-dom';
import ThemeSwitcher from '../../theme-switcher/core.theme-switcher';

export default function MinimalMiniHeader() {
  return (
    <header>
      <Link to={'/'}>Dev</Link>
      <ThemeSwitcher />
    </header>
  );
}
