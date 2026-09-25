import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStyle } from '@context/global/style-context';

export default function TerminalNotFound() {
  const { styleId } = useStyle();

  return (
    <section 
      data-style={styleId} 
      data-component="not-found"
    >
      <div data-component-section="not-found-deco">
        <h1>404</h1>
      </div>

      <div data-component-section="not-found-content">
        <div data-not-found-header>
          <span data-index>00</span>
          <h2>COMMAND NOT FOUND: 404</h2>
        </div>

        <div data-divider />

        <p data-not-found-message>
          bash: route: command not found.
          The requested location does not exist in this environment.
        </p>

        <Link to="/" data-cta>
          <ArrowLeft />
          <span>cd /</span>
        </Link>
      </div>
    </section>
  );
}

