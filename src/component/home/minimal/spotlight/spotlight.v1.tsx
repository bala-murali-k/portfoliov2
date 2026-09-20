import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface SpotlightProps {
  content: {
    number: string;
    title: string;
    highlights: string[];
    preview: {
      label: string;
    };
    cta: {
      label: string;
      href: string;
    };
  };
}

export default function SpotlightV1({ content }: SpotlightProps) {
  return (
    <div data-component="spotlight">
      <div>
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
              <img src={`${import.meta.env.BASE_URL}images/projects/portfolio_v2_ss.png`} alt={content.title} />
            </div>
            <Link to={content.cta.href} data-cta>
              <ArrowUpRight /> {content.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
