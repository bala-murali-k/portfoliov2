import { useStyle } from '@context/global/style-context';

export default function HeroV1() {
  const { switchStyle } = useStyle();

  return (
    <div data-component="modern-coming-soon">
      <span data-eyebrow>MODERN STYLE</span>
      <h1 data-heading>Coming soon</h1>
      <p data-description>
        This style is still being designed. In the meantime, take a look around in{' '}
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
  );
}
