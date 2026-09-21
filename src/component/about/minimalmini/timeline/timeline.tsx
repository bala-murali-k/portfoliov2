import type { MinimalMiniProfessionalTimeline } from '@content/about/minimalmini/about.content';
import { ArrowRight } from 'lucide-react';

interface TimelineProps {
  content: MinimalMiniProfessionalTimeline;
  index?: number;
  total?: number;
}

export default function ProfessionalTimeline({ content }: TimelineProps) {
  return (
    <div data-component="about-timeline-section" id="about-timeline">
      <div data-component-section="timeline-item">
        <span data-slot="timeline-period">{content.period}</span>

        <div data-slot="timeline-icon">
          <ArrowRight size={18} aria-hidden="true" />
        </div>

        <div data-slot="timeline-body">
          <h3 data-slot="timeline-role">{content.role}</h3>
          <span data-slot="timeline-org">{content.organization}</span>
          <p data-slot="timeline-summary">{content.summary}</p>
        </div>
      </div>
    </div>
  );
}

