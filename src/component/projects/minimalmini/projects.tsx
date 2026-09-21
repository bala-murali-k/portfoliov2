import { useState, useMemo } from 'react';
import { useStyle } from '@context/global/style-context';
import { getProjectsContent } from '@content/projects';
import type { MinimalMiniProject } from '@/content/projects/minimalmini/projects.content';
import { ChevronsLeft, ChevronsRight, MoveUpRight } from 'lucide-react';
import ProjectPreviewDrawer from '@/component/common/support/explore.demo.support.component';

type ActiveView = 'preview' | 'features' | 'architecture';

interface ProjectCardProps {
  initialProject: MinimalMiniProject;
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

  const hasLowerVersion = activeIndex > 0;
  const hasHigherVersion = activeIndex < allVersions.length - 1;

  const previewLink = currentProject.link || currentProject.hostedLink || null;

  return (
    <div data-component="project-card" data-active-view={activeView}>
      {/* Project Meta Section */}
      <div data-component-section="project-meta">
        <h2>{currentProject.title}</h2>

        {/* Action / Mode Toggles & Version Switcher */}
        <div data-component-section="project-meta-helper">
          <span data-status-badge>{currentProject.status}</span>

          <div data-component-section="project-meta-version">
            <button
              type="button"
              onClick={() => hasLowerVersion && setActiveIndex((prev) => prev - 1)}
              disabled={!hasLowerVersion}
              aria-label="Previous version"
            >
              <ChevronsLeft size={16} />
            </button>

            <span data-version-indicator>v{currentProject.version}</span>

            <button
              type="button"
              onClick={() => hasHigherVersion && setActiveIndex((prev) => prev + 1)}
              disabled={!hasHigherVersion}
              aria-label="Next version"
            >
              <ChevronsRight size={16} />
            </button>
          </div>

          <div data-view-toggles>
            <button
              type="button"
              data-active={activeView === 'preview'}
              onClick={() => setActiveView('preview')}
            >
              preview
            </button>
            <button
              type="button"
              data-active={activeView === 'features'}
              onClick={() => setActiveView('features')}
            >
              features
            </button>
            <button
              type="button"
              data-active={activeView === 'architecture'}
              onClick={() => setActiveView('architecture')}
            >
              architecture
            </button>
          </div>
        </div>

        {/* Project Description & Specs */}
        <p data-project-desc>{currentProject.description}</p>

        <div data-project-specs>
          <div data-spec-item>
            <span data-spec-label>Year</span>
            <span data-spec-value>{currentProject.year ?? 'N/A'}</span>
          </div>
          <div data-spec-item>
            <span data-spec-label>Hosted</span>
            <span data-spec-value>{currentProject.hostedLink ? 'Public URL' : 'Local'}</span>
          </div>
          <div data-spec-item>
            <span data-spec-label>Code</span>
            <span data-spec-value>{currentProject.isCodePublic ? 'Public' : 'Private'}</span>
          </div>
        </div>
      </div>

      {/* Project Body Section */}
      <div data-component-section="project-body">
        {/* Preview View */}
        {activeView === 'preview' && (
          <div data-preview-wrapper>
            <div data-preview-box>
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

            <button
              type="button"
              data-cta-btn
              onClick={() => setIsDrawerOpen(true)}
            >
              Explore <MoveUpRight size={16} />
            </button>

            {/* Mobile Tech Stack Overview */}
            {currentProject.techStack && currentProject.techStack.length > 0 && (
              <div data-tech-stack>
                <span data-tech-stack-title>Technologies</span>
                <div data-tech-stack-list>
                  {currentProject.techStack.map((item) => (
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
            )}
          </div>
        )}

        {/* Features View */}
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

        {/* Architecture View */}
        {activeView === 'architecture' && (
          <div data-architecture-wrapper>
            {currentProject.architectureList ? (
              <div data-architecture-img-box>
                <img
                  src={
                    currentProject.architectureList.startsWith('http://') || currentProject.architectureList.startsWith('https://')
                      ? currentProject.architectureList
                      : `${import.meta.env.BASE_URL}${currentProject.architectureList.replace(/^\//, '')}`
                  }
                  alt={`${currentProject.title} architecture`}
                />
              </div>
            ) : (
              <p data-empty-notice>No architecture blueprint available.</p>
            )}
          </div>
        )}
      </div>

      {/* Standalone Live Support Drawer */}
      <ProjectPreviewDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={currentProject.title}
        url={previewLink}
        anchor="bottom"
        height="92vh"
      />
    </div>
  );
}

export default function MinimalMiniProjects() {
  const { styleId } = useStyle();
  const rawProjects = getProjectsContent<MinimalMiniProject>(styleId);

  return (
    <div data-component="minimalmini-projects">
      <section data-component="projects-header-section">
        <div data-component="project-deco">
          <h1>Projects</h1>
          <p data-projects-tagline>Selected works & experiments.</p>
        </div>
      </section>

      {rawProjects.map((project, idx) => (
        <section
          key={project.id}
          data-component={`project-section-${idx + 1}`}
          data-project-section
        >
          <ProjectCard initialProject={project} />
        </section>
      ))}
    </div>
  );
}
