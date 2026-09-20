import React from 'react';
import type { MinimalWorkProgressContent } from '@content/about/minimal/about.content';

interface WorkProcessProps {
  content: MinimalWorkProgressContent[];
}

export default function WorkProcess({ content }: WorkProcessProps) {
  return (
    <div data-component="about-inside-mind">
      <div data-component-section="mind-content">
        <h2>Inside Mind</h2>

        <div data-component-section="mind-steps">
          {content.map((item, index) => (
            <div key={index} data-component-section="mind-step-row">
              <span data-slot="step-num">{item.step}</span>
              <span data-slot="step-title">{item.title}</span>
              <p data-slot="step-desc">{item.description}</p>
            </div>
          ))}
        </div>

        <div data-component-section="mind-tags">
          {content.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span data-slot="separator">✦</span>}
              <span>{item.title}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}