import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { SpotlightContent } from '@/content/home/home.content';

interface SpotlightProps {
  content: SpotlightContent;
}

export default function Spotlight({ content }: SpotlightProps) {
  return (
    <div data-component="spotlight">
      <div data-spotlight-content>
        <h2>Spotlight</h2>
        <div data-divider />
        <div data-content>
          <div data-info>
            <span data-index>{content.number}</span>
            <h3>{content.title}</h3>
            <ul data-highlights>
              {content.highlights.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          <div data-preview>
            <div data-preview-box>
              <img
                src={`${import.meta.env.BASE_URL}images/projects/portfolio_v2_ss.png`}
                alt={content.title}
              />
            </div>
            <Link to={content.cta.href} data-cta>
              {content.cta.label} <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

