import type { MinimalMiniHeroContent } from '@content/about/minimalmini/about.content';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  content: MinimalMiniHeroContent;
}

export default function Hero({ content }: HeroProps) {
  function handleScrollToTimeline(e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById('about-timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div data-component="about-hero-section">
      <h2>{content.title}</h2>
      <div data-component-section="bio-viewport">
        {content.bio.map((line, idx) => (
          <p key={idx} data-component-section="bio-line">
            {line}
          </p>
        ))}
      </div>
      {content.actionLabel && (
        <div>
          <a
            href="#about-timeline"
            data-action-btn
            onClick={handleScrollToTimeline}
          >
            <span>{content.actionLabel}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      )}
    </div>
  );
}

