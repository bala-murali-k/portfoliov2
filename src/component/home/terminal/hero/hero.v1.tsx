import { useStyle } from '@context/global/style-context';

export default function HeroV1() {
  const { switchStyle } = useStyle();

  return (
    <div data-component="terminal-coming-soon">
      <div data-terminal-window>
        <div data-terminal-bar>
          <span data-btn="close" />
          <span data-btn="min" />
          <span data-btn="max" />
          <div data-terminal-bar-title>terminal@bala:~</div>
        </div>
        <div data-terminal-body>
          <div data-terminal-line>
            <span data-prompt-symbol>$</span>
            <span data-eyebrow>TERMINAL STYLE</span>
          </div>
          <div data-terminal-line>
            <span data-prompt-symbol>&gt;</span>
            <h1 data-heading>Coming soon</h1>
            <span data-cursor />
          </div>
          <div data-terminal-line>
            <p data-description>
              This style is still being initialized. In the meantime, you can explore in{' '}
              <button
                type="button"
                data-switch-link
                onClick={() => switchStyle('minimal')}
                title="Switch to minimal style"
              >
                minimal
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

