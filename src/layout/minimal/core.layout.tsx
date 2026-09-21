import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import Slot from './slot';
import styles from './core.layout.module.css';
import { CoreLayoutProps } from '../core.layout';
import { subscribeToMinimalScroll } from '@/utils/hooks/minimal/use.minimal.scroll';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useMousePosition } from '@/utils/hooks/common/mouse.position';

/**
 * Minimal's layout: header, sidebar, and footer are fixed chrome - they
 * never move. Only the main content region scrolls.
 *
 * Desktop-only for now: sidebar sits as a left column, and vertical mouse
 * wheel input over the content is redirected into horizontal scroll
 * (left <-> right), since the page itself doesn't scroll vertically.
 * Mobile behavior is deferred.
 */
export default function CoreLayout({ pageKey, slots = {}, children }: CoreLayoutProps) {
  const mainRef = useRef<HTMLElement>(null);
  const mousePos = useMousePosition()
  const [isScrollToZeroHovered, setIsScrollToZeroHovered] = useState(false);
  const [isScrollToPrevHovered, setIsScrollToPrevHovered] = useState(false);
  const [isScrollToNextHovered, setIsScrollToNextHovered] = useState(false);
  const [isScrollToMaxHovered, setIsScrollToMaxHovered] = useState(false);

  function resetScroll() {
    const main = mainRef.current;
    if (!main) return;
    main.scrollLeft = 0;
  }

  function scrollToPrev() {
    const main = mainRef.current;
    if (!main) return;
    main.scrollBy({ left: -main.clientWidth, behavior: 'smooth' });
  }

  function scrollToNext() {
    const main = mainRef.current;
    if (!main) return;
    main.scrollBy({ left: main.clientWidth, behavior: 'smooth' });
  }

  function scrollToMax() {
    const main = mainRef.current;
    if (!main) return;
    main.scrollLeft = main.scrollWidth;
  }

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    const SCROLL_SPEED = 1.5;
    const SCROLL_TO_ZERO_THRESHOLD = 5;
    const SCROLL_TO_MAX_DISABLE_THRESHOLD = 90;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      main.scrollLeft += e.deltaY * SCROLL_SPEED;
    };

    const handleScroll = () => {
      const parent = main.parentElement;
      if (!parent) return;

      const maxScroll = main.scrollWidth - main.clientWidth;
      if (maxScroll <= 0) {
        parent.style.setProperty('--scroll-to-zero-visible', '0');
        parent.style.setProperty('--scroll-to-zero-pointer-events', 'none');
        parent.style.setProperty('--scroll-to-prev-visible', '0');
        parent.style.setProperty('--scroll-to-prev-pointer-events', 'none');
        parent.style.setProperty('--scroll-to-next-visible', '0');
        parent.style.setProperty('--scroll-to-next-pointer-events', 'none');
        parent.style.setProperty('--scroll-to-max-visible', '0');
        parent.style.setProperty('--scroll-to-max-pointer-events', 'none');
        return;
      }
      const progress = (main.scrollLeft / maxScroll) * 100;

      parent.style.setProperty(
        '--scroll-progress',
        `${progress}%`
      );

      parent.style.setProperty(
        '--scroll-to-zero-visible',
        progress >= SCROLL_TO_ZERO_THRESHOLD ? '1' : '0'
      );

      parent.style.setProperty(
        '--scroll-to-zero-pointer-events',
        progress >= SCROLL_TO_ZERO_THRESHOLD ? 'auto' : 'none'
      );

      parent.style.setProperty(
        '--scroll-to-prev-visible',
        progress >= SCROLL_TO_ZERO_THRESHOLD ? '1' : '0'
      );

      parent.style.setProperty(
        '--scroll-to-prev-pointer-events',
        progress >= SCROLL_TO_ZERO_THRESHOLD ? 'auto' : 'none'
      );

      parent.style.setProperty(
        '--scroll-to-next-visible',
        progress >= SCROLL_TO_MAX_DISABLE_THRESHOLD ? '0' : '1'
      );

      parent.style.setProperty(
        '--scroll-to-next-pointer-events',
        progress >= SCROLL_TO_MAX_DISABLE_THRESHOLD ? 'none' : 'auto'
      );

      parent.style.setProperty(
        '--scroll-to-max-visible',
        progress >= SCROLL_TO_MAX_DISABLE_THRESHOLD ? '0' : '1'
      );

      parent.style.setProperty(
        '--scroll-to-max-pointer-events',
        progress >= SCROLL_TO_MAX_DISABLE_THRESHOLD ? 'none' : 'auto'
      );

      parent.style.setProperty(
        '--scroll-to-max-disable',
        progress >= SCROLL_TO_MAX_DISABLE_THRESHOLD ? '1' : '0'
      );
    };

    main.addEventListener('wheel', handleWheel, { passive: false });
    main.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      main.removeEventListener('wheel', handleWheel);
      main.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    return subscribeToMinimalScroll(({ percent, behavior }) => {
      const main = mainRef.current
      if (!main) return;
      const maxScroll = main.scrollWidth - main.clientWidth;
      const clampedPercent = Math.max(0, Math.min(percent, 100));

      main.scrollTo({ left: maxScroll * (clampedPercent / 100), behavior, });
    }
    );
  }, []);

  useEffect(() => {
    resetScroll()
  }, [pageKey]);

  return (
    <div className={styles.layout} data-layout="minimal">
      <Slot name="header" data-region="header">{slots.header}</Slot>
      <Slot name="sidebar" data-region="sidebar">{slots.sidebar}</Slot>
      <main ref={mainRef} data-region="main">
        <button
          onClick={(event) => { event.preventDefault(), resetScroll() }}
          onMouseEnter={() => setIsScrollToZeroHovered(true)}
          onMouseLeave={() => setIsScrollToZeroHovered(false)}
          layout-utility="scroll-to-zero"
        >
          <ChevronsLeft />
        </button>
        <button
          onClick={(event) => { event.preventDefault(), scrollToPrev() }}
          onMouseEnter={() => setIsScrollToPrevHovered(true)}
          onMouseLeave={() => setIsScrollToPrevHovered(false)}
          layout-utility="scroll-to-prev"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={(event) => { event.preventDefault(), scrollToNext() }}
          onMouseEnter={() => setIsScrollToNextHovered(true)}
          onMouseLeave={() => setIsScrollToNextHovered(false)}
          layout-utility="scroll-to-next"
        >
          <ChevronRight />
        </button>
        <button
          onClick={(event) => { event.preventDefault(), scrollToMax() }}
          onMouseEnter={() => setIsScrollToMaxHovered(true)}
          onMouseLeave={() => setIsScrollToMaxHovered(false)}
          layout-utility="scroll-to-max"
        >
          <ChevronsRight />
        </button>
        {children}
      </main>
      <div className="scroll-progress" data-region="scroll-progress"></div>
      <Slot name="footer" data-region="footer">{slots.footer}</Slot>
      {
        isScrollToZeroHovered && (
          <div
            data-layout-tooltip
            data-visible="true"
            style={{
              left: `${mousePos.x + 12}px`,
              top: `${mousePos.y + 12}px`,
            }}
          >
            Scroll to Left.
          </div>
        )
      }
      {
        isScrollToPrevHovered && (
          <div
            data-layout-tooltip
            data-visible="true"
            style={{
              left: `${mousePos.x + 12}px`,
              top: `${mousePos.y + 12}px`,
            }}
          >
            Scroll previous.
          </div>
        )
      }
      {
        isScrollToNextHovered && (
          <div
            data-layout-tooltip
            data-visible="true"
            style={{
              left: `${mousePos.x - 450}px`,
              top: `${mousePos.y - 120}px`,
            }}
          >
            Scroll next.
          </div>
        )
      }
      {
        isScrollToMaxHovered && (
          <div
            data-layout-tooltip
            data-visible="true"
            style={{
              left: `${mousePos.x - 320}px`,
              top: `${mousePos.y - 120}px`,
            }}
          >
            Scroll to End.
          </div>
        )
      }
    </div>
  );
}
