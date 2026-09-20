import { useState, useMemo, type ReactNode } from 'react';
import { useStyle } from '@context/global/style-context';
import { getProjectsContent } from '@content/projects';
import type { MinimalProject } from '@/content/projects/minimal/projects.content';
import { ChevronsLeft, ChevronsRight, MoveUpRight } from 'lucide-react';
import { truncate } from '@/utils/functions/common.helper.functions';
import ProjectPreviewDrawer from '@/component/common/support/explore.demo.support.component';

const MAX_DESCRIPTION_CHARS = 150;

type TooltipType = 'version' | 'features' | 'architecture' | 'description' | 'image';
type ActiveView = 'preview' | 'features' | 'architecture';

interface ProjectCardProps {
  initialProject: MinimalProject;
}

function ProjectCard({ initialProject }: ProjectCardProps) {
  const allVersions = useMemo(() => {
    const historical = initialProject.versions || [];
    return [...historical, initialProject];
  }, [initialProject]);

  const [activeIndex, setActiveIndex] = useState(allVersions.length - 1);
  const [activeView, setActiveView] = useState<ActiveView>('preview');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const currentProject = allVersions[activeIndex];

  const [tooltipContent, setTooltipContent] = useState<ReactNode | null>(null);
  const [tooltipType, setTooltipType] = useState<TooltipType | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (type: TooltipType, content: ReactNode) => {
    setTooltipType(type);
    setTooltipContent(content);
  };

  const handleMouseLeave = () => {
    setTooltipType(null);
    setTooltipContent(null);
  };

  const toggleView = (view: ActiveView) => {
    setActiveView((prev) => (prev === view ? 'preview' : view));
  };

  const hasLowerVersion = activeIndex > 0;
  const hasHigherVersion = activeIndex < allVersions.length - 1;
  const allVersionsText = allVersions.map((v) => `v${v.version}`).join(', ');

  const tooltipStyle =
    tooltipType === 'image'
      ? {
        left: `${mousePos.x - 14}px`,
        top: `${mousePos.y - 14}px`,
        transform: 'translate(-100%, -100%)',
      }
      : {
        left: `${mousePos.x + 14}px`,
        top: `${mousePos.y + 14}px`,
        transform: 'none',
      };

  const previewLink = currentProject.link || currentProject.hostedLink || null;

  return (
    <li onMouseMove={handleMouseMove} data-active-view={activeView}>
      <div data-component-section="project-meta">
        <h2>{currentProject.title}</h2>
        <div data-component-section="project-meta-helper">
          <span>{currentProject.status}</span>

          <div data-component-section="project-meta-version">
            <button
              type="button"
              onClick={() => hasLowerVersion && setActiveIndex((prev) => prev - 1)}
              disabled={!hasLowerVersion}
              aria-label="Previous version"
            >
              <ChevronsLeft />
            </button>

            <span
              data-hoverable-text
              onMouseEnter={() =>
                handleMouseEnter(
                  'version',
                  <div data-tooltip-group>
                    <span>{allVersionsText}</span>
                  </div>
                )
              }
              onMouseLeave={handleMouseLeave}
            >
              v{currentProject.version}
            </span>

            <button
              type="button"
              onClick={() => hasHigherVersion && setActiveIndex((prev) => prev + 1)}
              disabled={!hasHigherVersion}
              aria-label="Next version"
            >
              <ChevronsRight />
            </button>
          </div>

          {/* Features Button Trigger */}
          <button
            type="button"
            data-active={activeView === 'features'}
            onClick={() => toggleView('features')}
            onMouseEnter={() =>
              handleMouseEnter(
                'features',
                activeView === 'features' ? 'Click to show preview' : 'Click to see features'
              )
            }
            onMouseLeave={handleMouseLeave}
          >
            features
          </button>

          {/* Architecture Button Trigger */}
          <button
            type="button"
            data-active={activeView === 'architecture'}
            onClick={() => toggleView('architecture')}
            onMouseEnter={() =>
              handleMouseEnter(
                'architecture',
                activeView === 'architecture' ? 'Click to show preview' : 'Click to see architecture'
              )
            }
            onMouseLeave={handleMouseLeave}
          >
            architecture
          </button>
        </div>

        <p
          data-hoverable-desc
          onMouseEnter={() =>
            handleMouseEnter(
              'description',
              <div data-tooltip-details>
                <div><strong>Year:</strong> {currentProject.year ?? 'N/A'}</div>
                <div><strong>Hosted:</strong> {currentProject.hostedLink || 'Not hosted / Local'}</div>
                <div><strong>Code:</strong> {currentProject.isCodePublic ? 'Public' : 'Private'}</div>
              </div>
            )
          }
          onMouseLeave={handleMouseLeave}
        >
          {truncate(currentProject.description, MAX_DESCRIPTION_CHARS)}
        </p>
      </div>

      <div data-component-section="project-body">
        {/* Features Content View */}
        {activeView === 'features' && (
          <div data-features-wrapper>
            {currentProject.featuresList && currentProject.featuresList.length > 0 ? (
              <ul data-features-list>
                {currentProject.featuresList.map((feature, idx) => (
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

        {/* Architecture Content View */}
        {activeView === 'architecture' && (
          <div data-architecture-wrapper>
            {currentProject.architectureList ? (
              <img
                src={
                  currentProject.architectureList.startsWith('http://') || currentProject.architectureList.startsWith('https://')
                    ? currentProject.architectureList
                    : `${import.meta.env.BASE_URL}${currentProject.architectureList.replace(/^\//, '')}`
                }
                alt={`${currentProject.title} architecture`}
              />
            ) : (
              <p data-empty-notice>No architecture blueprint available.</p>
            )}
          </div>
        )}

        {/* Standard Media Preview View */}
        {activeView === 'preview' && (
          <>
            <div
              data-preview-box
              onMouseEnter={() =>
                handleMouseEnter(
                  'image',
                  <div data-tooltip-chart>
                    {currentProject.techStack && currentProject.techStack.length > 0 ? (
                      <div data-chart-list>
                        {currentProject.techStack.map((item) => (
                          <div key={item.index} data-chart-row>
                            <span data-stack-name>{item.stack}</span>
                            <div data-bar-track>
                              <div
                                data-bar-fill
                                style={{ width: `${item.stackExpert}%` }}
                              />
                            </div>
                            <span data-stack-value>{item.stackExpert}%</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span>No tech stack specified</span>
                    )}
                  </div>
                )
              }
              onMouseLeave={handleMouseLeave}
            >
              {currentProject.imageSource && currentProject.isImageAvailable ? (
                <img
                  src={
                    currentProject.imageSource.startsWith('http://') || currentProject.imageSource.startsWith('https://')
                      ? currentProject.imageSource
                      : `${import.meta.env.BASE_URL}${currentProject.imageSource.replace(/^\//, '')}`
                  }
                  alt={currentProject.imageAltText || `${currentProject.title} screenshot`}
                />
              ) : (
                <p>{currentProject.title}</p>
              )}
            </div>

            {/* Explore Drawer Trigger */}
            <a
              type="button"
              data-cta-btn
              onClick={() => setIsDrawerOpen(true)}
            >
              Explore <MoveUpRight />
            </a>
          </>
        )}
      </div>

      {/* Floating Cursor Tooltip */}
      {tooltipContent && tooltipType && (
        <div
          data-tooltip
          data-tooltip-type={tooltipType}
          style={tooltipStyle}
        >
          {tooltipContent}
        </div>
      )}

      {/* Standalone Live Support Drawer */}
      <ProjectPreviewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={currentProject.title}
        url={previewLink}
        anchor="bottom"
        height="95vh"
      />
    </li>
  );
}

export default function CoreProjects() {
  const { styleId } = useStyle();
  const rawProjects: MinimalProject[] = getProjectsContent(styleId);

  return (
    <section data-component="projects-component">
      <div data-component="project-deco">
        <h1>Projects</h1>
      </div>
      <ul>
        {rawProjects.map((project) => (
          <ProjectCard key={project.id} initialProject={project} />
        ))}
      </ul>
    </section>
  );
}