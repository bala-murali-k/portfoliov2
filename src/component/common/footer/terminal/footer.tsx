import styles from './footer.module.css';

export default function TerminalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-component="terminal-footer">
      <span className={styles.copyright} data-copyright>
        &copy; {year} bala [exit 0]
      </span>

      <div className={styles.links} data-footer-links>
        <a
          href="https://github.com/bala-murali-k"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          [github]
        </a>
        <a
          href="https://linkedin.com/in/yourhandle"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          [linkedin]
        </a>
      </div>
    </footer>
  );
}

