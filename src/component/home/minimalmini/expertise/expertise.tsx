import type { ExpertiseItem } from '@/content/home/home.content';

interface ExpertiseProps {
  content: ExpertiseItem[];
}

export default function Expertise({ content }: ExpertiseProps) {
  return (
    <div data-component="expertise">
      <div data-expertise-content>
        <h2>Expertise</h2>
        <ul data-expertise-list>
          {content.map((item) => (
            <li key={item.number} data-expertise-item>
              <div data-heading>
                <div data-heading-main>
                  <span data-index>{item.number}</span>
                  <h3>{item.title}</h3>
                </div>
                <div data-bar>
                  <span data-bar-value>{item.level}%</span>
                  <div data-bar-track>
                    <div data-bar-fill style={{ width: `${item.level}%` }} />
                  </div>
                </div>
              </div>
              <p data-desc>{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

