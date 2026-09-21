import { ArrowRight } from 'lucide-react';
import type { ContactHeader } from '@content/contact';

interface HeroProps {
  header: ContactHeader;
}

export default function Hero({ header }: HeroProps) {
  function handleScrollToForm(e: React.MouseEvent) {
    e.preventDefault();
    const formEl = document.getElementById('contact-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div data-component="contact-hero">
      <div>
        <h1>{header.title || 'Contact'}</h1>
        <p>{header.tagline || 'Start a conversation.'}</p>
        <a href="#contact-form" onClick={handleScrollToForm}>
          Write an email <ArrowRight size={18} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
