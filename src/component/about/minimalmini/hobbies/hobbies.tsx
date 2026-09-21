import type { MinimalMiniHobbiesContent } from '@content/about/minimalmini/about.content';

interface HobbiesProps {
  content: MinimalMiniHobbiesContent;
}

export default function Hobbies({ content }: HobbiesProps) {
  return (
    <div data-component="about-hobbies-section">
      <div data-component-section="hobbies-content">
        <h2>{content.category}</h2>
        <ul data-component-section="hobbies-list">
          {content.details.map((item, index) => (
            <li key={index} data-slot="hobby-item">
              <span data-slot="hobby-bullet">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

