import styles from './footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} data-component="modern-footer">
      <span className={styles.copyright} data-copyright>
        &copy; {year} Bala
      </span>

      <div className={styles.links} data-footer-links>
        <a
          href="https://github.com/bala-murali-k"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourhandle"
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
