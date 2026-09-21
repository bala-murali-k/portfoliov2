import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStyle } from '@context/global/style-context';

export default function StyleSwitcher() {
  const { styleId, availableStyles, switchStyle } = useStyle();
  const baseId = styleId.replace(/mini$/, '');
  const index = availableStyles.findIndex((s) => s.id === baseId || s.id === styleId);
  const current = availableStyles[index] ?? availableStyles[0];

  function go(offset: number) {
    if (availableStyles.length === 0) return;
    const nextIndex = (index + offset + availableStyles.length) % availableStyles.length;
    switchStyle(availableStyles[nextIndex].id);
  }

  return (
    <div data-control="style-switcher">
      <button type="button" onClick={() => go(-1)} aria-label="Previous style">
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <span>{current?.name.toLowerCase()}</span>
      <button type="button" onClick={() => go(1)} aria-label="Next style">
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  );
}
