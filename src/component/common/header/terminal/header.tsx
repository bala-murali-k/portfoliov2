import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StyleSwitcher from '../../style-switcher/core.style-switcher';
import styles from './header.module.css';

export default function TerminalHeader() {
  const location = useLocation();

  const [isRealTerminal, setIsRealTerminal] = useState(() => {
    try {
      return localStorage.getItem('terminal_header_real') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggle = (checked: boolean) => {
    setIsRealTerminal(checked);
    try {
      localStorage.setItem('terminal_header_real', String(checked));
    } catch {
      // Ignore storage errors
    }
  };

  const handleClose = () => {
    handleToggle(false);
  };

  const handleMinimize = () => {
    handleToggle(false);
  };

  const handleMaximize = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const navItems = [
    { label: '[home]', to: '/' },
    { label: '[work]', to: '/projects' },
    { label: '[contact]', to: '/contact' },
  ];

  return (
    <header
      className={styles.header}
      data-component="terminal-header"
      data-real-terminal={isRealTerminal ? 'true' : undefined}
    >
      <div className={styles.leftCol}>
        <div className={styles.brandGroup}>
          <Link to="/" className={styles.brand} data-brand>
            bala:~<span className={styles.dollar}>$</span>
          </Link>

          <label
            className={styles.toggleLabel}
            title={isRealTerminal ? 'Switch to navigation' : 'Switch to terminal controls'}
          >
            <input
              type="checkbox"
              checked={isRealTerminal}
              onChange={(e) => handleToggle(e.target.checked)}
              className={styles.srOnly}
              aria-label="Toggle terminal window controls"
            />
            <span className={styles.customBox} data-checked={isRealTerminal ? 'true' : 'false'}>
              {isRealTerminal && (
                <svg viewBox="0 0 12 12" className={styles.checkIcon} aria-hidden="true">
                  <polyline
                    points="2.5 6 5 8.5 9.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
          </label>
        </div>
      </div>

      <div className={styles.centerCol} data-center-control>
        <StyleSwitcher />
      </div>

      <div className={styles.rightCol}>
        {!isRealTerminal ? (
          <nav className={styles.nav} aria-label="Navigation">
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
        ) : (
          <div className={styles.windowControls} data-window-controls aria-label="Terminal controls">
            <button
              type="button"
              className={`${styles.controlBtn} ${styles.closeBtn}`}
              onClick={handleClose}
              title="Close"
              aria-label="Close"
            >
              <svg viewBox="0 0 10 10" className={styles.btnIcon} aria-hidden="true">
                <line x1="2.5" y1="2.5" x2="7.5" y2="7.5" />
                <line x1="7.5" y1="2.5" x2="2.5" y2="7.5" />
              </svg>
            </button>

            <button
              type="button"
              className={`${styles.controlBtn} ${styles.minBtn}`}
              onClick={handleMinimize}
              title="Minimize"
              aria-label="Minimize"
            >
              <svg viewBox="0 0 10 10" className={styles.btnIcon} aria-hidden="true">
                <line x1="2" y1="5" x2="8" y2="5" />
              </svg>
            </button>

            <button
              type="button"
              className={`${styles.controlBtn} ${styles.maxBtn}`}
              onClick={handleMaximize}
              title="Maximize"
              aria-label="Maximize"
            >
              <svg viewBox="0 0 10 10" className={styles.btnIcon} aria-hidden="true">
                <line x1="5" y1="2" x2="5" y2="8" />
                <line x1="2" y1="5" x2="8" y2="5" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
