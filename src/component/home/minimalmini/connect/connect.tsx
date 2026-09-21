import { Link } from 'react-router-dom';
import type { ConnectContent } from '@/content/home/home.content';

interface ConnectProps {
  content: ConnectContent;
}

export default function Connect({ content }: ConnectProps) {
  const isInternal = content.cta.href.startsWith('/');

  return (
    <div data-component="connect">
      <div data-connect-content>
        <h2>{content.heading}</h2>
        <div data-content>
          <div data-questions>
            {content.questions.map((question, idx) => (
              <p key={idx}>{question}</p>
            ))}
          </div>
          <p data-statement>{content.statement}</p>
          {isInternal ? (
            <Link to={content.cta.href} data-cta>
              <span>{content.cta.label}</span>
              <span data-arrow>↗</span>
            </Link>
          ) : (
            <a href={content.cta.href} data-cta>
              <span>{content.cta.label}</span>
              <span data-arrow>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

