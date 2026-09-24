import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export interface ProjectTechItem {
  index: number;
  stack: string;
  stackExpert: number;
}

export interface ProjectReadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  featuresList?: string[] | null;
  architectureList?: string | null;
  techStack?: ProjectTechItem[] | null;
  anchor?: 'bottom' | 'top' | 'left' | 'right';
  height?: string;
}

export default function ProjectReadDrawer({
  isOpen,
  onClose,
  title,
  featuresList,
  architectureList,
  techStack,
  anchor = 'bottom',
  height = '85vh',
}: ProjectReadDrawerProps) {
  const [activeTab, setActiveTab] = useState<'technologies' | 'features' | 'architecture'>('technologies');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // When drawer opens, reset to technologies if available, otherwise features or architecture
  useEffect(() => {
    if (isOpen) {
      if (techStack && techStack.length > 0) {
        setActiveTab('technologies');
      } else if (featuresList && featuresList.length > 0) {
        setActiveTab('features');
      } else if (architectureList) {
        setActiveTab('architecture');
      }
    }
  }, [isOpen, techStack, featuresList, architectureList]);

  return (
    <div
      data-component="project-preview-drawer"
      data-drawer-type="read"
      data-open={isOpen ? 'true' : 'false'}
      data-anchor={anchor}
      aria-hidden={!isOpen}
    >
      {/* Backdrop */}
      <div
        data-drawer-backdrop
        onClick={onClose}
        tabIndex={-1}
      />

      {/* Bottom Sheet Panel */}
      <aside
        data-drawer-panel
        style={{
          ['--drawer-dimension' as string]: height,
        }}
      >
        {/* Header Bar */}
        <div data-drawer-header>
          <div data-drawer-header-meta>
            <span data-drawer-indicator />
            <h3>{title}</h3>
          </div>
          <button
            type="button"
            data-drawer-close-btn
            onClick={onClose}
            aria-label="Close details"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div data-drawer-body>
          {/* Tab Controls: Technologies, Features & Architecture */}
          <div data-drawer-tabs>
            <button
              type="button"
              data-drawer-tab
              data-active={activeTab === 'technologies'}
              onClick={() => setActiveTab('technologies')}
            >
              Tech Stack
            </button>
            <button
              type="button"
              data-drawer-tab
              data-active={activeTab === 'features'}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              type="button"
              data-drawer-tab
              data-active={activeTab === 'architecture'}
              onClick={() => setActiveTab('architecture')}
            >
              Architecture
            </button>
          </div>

          {/* Tab Content */}
          <div data-drawer-content>
            {activeTab === 'technologies' && (
              <div data-tech-stack-wrapper>
                {techStack && techStack.length > 0 ? (
                  <div data-tech-stack>
                    <div data-tech-stack-list>
                      {techStack.map((item) => (
                        <div key={item.index} data-tech-item>
                          <div data-tech-label-row>
                            <span data-tech-name>{item.stack}</span>
                            <span data-tech-value>{item.stackExpert}%</span>
                          </div>
                          <div data-tech-bar-track>
                            <div
                              data-tech-bar-fill
                              style={{ width: `${item.stackExpert}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p data-empty-notice>No technologies documented.</p>
                )}
              </div>
            )}

            {activeTab === 'features' && (
              <div data-features-wrapper>
                {featuresList && featuresList.length > 0 ? (
                  <ul data-features-list>
                    {featuresList.map((feature, idx) => (
                      <li key={idx} data-feature-item>
                        <span data-feature-index>{String(idx + 1).padStart(2, '0')}</span>
                        <p>{feature}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p data-empty-notice>No feature specifications documented for this release.</p>
                )}
              </div>
            )}

            {activeTab === 'architecture' && (
              <div data-architecture-wrapper>
                {architectureList ? (
                  <div data-architecture-img-box>
                    <img
                      src={
                        architectureList.startsWith('http://') || architectureList.startsWith('https://')
                          ? architectureList
                          : `${import.meta.env.BASE_URL}${architectureList.replace(/^\//, '')}`
                      }
                      alt={`${title} architecture`}
                    />
                  </div>
                ) : (
                  <p data-empty-notice>No architecture blueprint available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

