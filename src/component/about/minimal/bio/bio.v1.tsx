import React, { useEffect, useState } from 'react';
import type { MinimalHeroContent } from '@content/about/minimal/about.content';
import { ArrowRight } from "lucide-react";
import { requestMinimalScroll } from "@/utils/hooks/minimal/use.minimal.scroll";

interface MastheadProps {
  content: MinimalHeroContent;
}

const DISPLAY_DURATION = 4000; // ms each paragraph stays visible
const SLIDE_DURATION = 500;    // must match CSS transition duration

export default function MastheadV1({ content }: MastheadProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animState, setAnimState] = useState<'idle' | 'out' | 'in'>('idle');

  useEffect(() => {
    if (content.bio.length <= 1) return;

    const cycle = setInterval(() => {
      setAnimState('out');

      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % content.bio.length);
        setAnimState('in');

        setTimeout(() => {
          setAnimState('idle');
        }, SLIDE_DURATION);
      }, SLIDE_DURATION);
    }, DISPLAY_DURATION);

    return () => clearInterval(cycle);
  }, [content.bio.length]);

  return (
    <div data-component="about-hero-section">
      <h2>{content.title}</h2>
      <div data-component-section="bio-viewport">
        <p data-component-section="bio-line" data-anim-state={animState}>
          {content.bio[activeIndex]}
        </p>
      </div>
      {
        content.actionLabel && (
          <div>
            <a
              type="button"
              data-action-btn
              onClick={(e) => {
                e.preventDefault();
                requestMinimalScroll(52);
              }}
            >
              {content.actionLabel}
              <ArrowRight />
            </a>
          </div>
        )
      }
    </div>
  );
}