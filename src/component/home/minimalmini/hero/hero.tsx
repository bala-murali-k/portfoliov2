interface HeroProps {
  content: {
    name: string;
    title: string;
  };
}

export default function Hero({ content: _content }: HeroProps) {
  return (
    <div data-component="hero">
      <div data-hero-content>
        <h1>Bala</h1>
        <h1>Murali</h1>
        <div data-hero-subtitle-row>
          <h1>K,</h1>
          <p>Software Engineer.</p>
        </div>
        <span data-hero-tagline>Less noise, more signal.</span>
      </div>
    </div>
  );
}

