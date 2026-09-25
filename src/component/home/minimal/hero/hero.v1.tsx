import { useMousePosition } from "@/utils/hooks/common/mouse.position";
import { requestMinimalScroll } from "@/utils/hooks/minimal/use.minimal.scroll";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface HeroProps {
  content: {
    name: string;
    title: string;
  };
}

function getNextPercentage() {
  const element = document.querySelector('.layout');
  if (!element) return;
  const value = parseInt(getComputedStyle(element).getPropertyValue('--scroll-progress').trim())
}

export default function HeroV1({ content }: HeroProps) {
  const [isScrollToZeroHovered, setIsScrollToZeroHovered] = useState(false);
  const mousePos = useMousePosition();

  return (
    <div data-component="hero">
      <div>
        <h1>Bala</h1>
        <h1>Murali</h1>
        <div>
          <h1>K,</h1>
          <p>Software Engineer.</p>
        </div>
        <span>Less noise, more signal.</span>
      </div>
      {/* <div data-utility-component="scroll-group">
        <button
          onClick={(event) => { event.preventDefault(), getNextPercentage() }}
          onMouseEnter={() => setIsScrollToZeroHovered(true)}
          onMouseLeave={() => setIsScrollToZeroHovered(false)}
        >
          <ArrowLeft />
        </button>
        <button
          onClick={(event) => { event.preventDefault(), requestMinimalScroll(100) }}
          onMouseEnter={() => setIsScrollToZeroHovered(true)}
          onMouseLeave={() => setIsScrollToZeroHovered(false)}
        >
          <ArrowLeft />
        </button>
      </div> */}
      {
        // isScrollToZeroHovered && (
        //   <div
        //     data-layout-tooltip
        //     data-visible="true"
        //     style={{
        //       left: `${mousePos.x + 12}px`,
        //       top: `${mousePos.y + 12}px`,
        //     }}
        //   >
        //     Scroll next section.
        //   </div>
        // )
      }
    </div>
  );
}
