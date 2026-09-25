import { Link, useLocation } from 'react-router-dom';
import StyleSwitcher from '../../style-switcher/core.style-switcher';
import styles from './header.module.css';

export default function TerminalHeader() {
  const location = useLocation();

  const navItems = [
    { label: '[home]', to: '/' },
    { label: '[work]', to: '/projects' },
    { label: '[contact]', to: '/contact' },
  ];

  return (
    <header className={styles.header} data-component="terminal-header">
      <div className={styles.leftCol}>
        <Link to="/" className={styles.brand} data-brand>
          bala:~$
        </Link>
      </div>

      <div className={styles.centerCol} data-center-control>
        <StyleSwitcher />
      </div>

      <div className={styles.rightCol}>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={isActive ? styles.activeLink : styles.navLink}
                data-active={isActive ? 'true' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

