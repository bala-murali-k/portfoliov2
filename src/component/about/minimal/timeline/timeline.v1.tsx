import React from 'react';
import type { MinimalProfessionalTimeline } from '@content/about/minimal/about.content';
import { ArrowRight } from "lucide-react";

interface TimelineProps {
  content: MinimalProfessionalTimeline;
  index?: number;
  total?: number;
}

export default function ProfessionalTimeline({ content, index = 0, total = 1 }: TimelineProps) {
  const hasOutgoing = index < total - 1;
  const isCurveUp = index % 2 === 0;
  const pathD = isCurveUp
    ? "M 0 160 C 150 160, 250 40, 400 40"
    : "M 0 40 C 150 40, 250 160, 400 160";

  return (
    <>
      <div data-component="about-timeline-section">
        <div data-component-section="timeline-item">
          <span data-slot="timeline-period">{content.period}</span>

          <div data-slot="timeline-icon">
            <ArrowRight size={18} />
          </div>

          <div data-slot="timeline-body">
            <h3 data-slot="timeline-role">{content.role}</h3>
            <span data-slot="timeline-org">{content.organization}</span>
            <p data-slot="timeline-summary">{content.summary}</p>
          </div>
        </div>
      </div>

      {hasOutgoing && (
        <div data-slot="timeline-inter-connector" aria-hidden="true">
          <svg
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            data-slot="connector-svg"
          >
            <path d={pathD} data-slot="connector-path" />
          </svg>
          <div data-slot="connector-node">
            <span data-slot="connector-ring" />
            <span data-slot="connector-dot" />
          </div>
        </div>
      )}
    </>
  );
}