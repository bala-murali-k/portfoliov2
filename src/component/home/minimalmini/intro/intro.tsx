import { Link } from 'react-router-dom';
import { MoveRight } from 'lucide-react';

interface IntroProps {
  content: {
    summary: string;
  };
}

export default function Intro({ content: _content }: IntroProps) {
  return (
    <div data-component="intro">
      <div data-intro-content>
        <h2>Myself</h2>
        <div data-intro-text>
          <p>I like making things that feel simple.</p>
          <p>From interfaces to the systems behind them,</p>
          <p>I’m interested in how thoughtful design and solid engineering can come together to create better experiences.</p>
        </div>
        <div data-intro-tags>
          <span>Developer</span>
          <span data-star>✦</span>
          <span>Designer</span>
          <span data-star>✦</span>
          <span>Builder</span>
        </div>
        <Link to="/about" data-intro-cta>
          Get to know me <MoveRight size={18} />
        </Link>
      </div>
    </div>
  );
}

