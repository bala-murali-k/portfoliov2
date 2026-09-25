import { useState, useMemo, useRef, useEffect } from 'react';
import { useStyle } from '@context/global/style-context';
import { getProjectsContent } from '@content/projects';
import type { MinimalMiniProject } from '@/content/projects/minimalmini/projects.content';
import { MoveUpRight, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectPreviewDrawer from '@/component/common/support/explore.demo.support.component';
import ProjectReadDrawer from '@/component/common/support/read.drawer.support.component';

interface ProjectCardProps {
  initialProject: MinimalMiniProject;
}

function ProjectCard({ initialProject }: ProjectCardProps) {
  const allVersions = useMemo(() => {
    const historical = initialProject.versions || [];
    return [...historical, initialProject];
  }, [initialProject]);

  const [activeIndex, setActiveIndex] = useState(allVersions.length - 1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReadDrawerOpen, setIsReadDrawerOpen] = useState(false);

  const currentProject = allVersions[activeIndex];

  // Reset active image index whenever the version changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeIndex]);

  const currentImages = useMemo(() => {
    if (!currentProject.imageSource) return [];
    return Array.isArray(currentProject.imageSource)
      ? currentProject.imageSource
      : [currentProject.imageSource];
  }, [currentProject.imageSource]);

  const activeImage = currentImages[activeImageIndex] || currentImages[0] || null;

  const activeImageSrc = useMemo(() => {
    if (!activeImage) return null;
    return activeImage.startsWith('http://') || activeImage.startsWith('https://')
      ? activeImage
      : `${import.meta.env.BASE_URL}${activeImage.replace(/^\//, '')}`;
  }, [activeImage]);

  const previewLink = currentProject.link || currentProject.hostedLink || null;

  // Swipe handling on the preview image for looping versions
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const mouseStartY = useRef<number | null>(null);
  const isMouseDown = useRef(false);

  const handlePrevVersion = () => {
    if (allVersions.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + allVersions.length) % allVersions.length);
  };

  const handleNextVersion = () => {
    if (allVersions.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % allVersions.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Trigger only if horizontal swipe exceeds vertical movement and threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (allVersions.length > 1) {
        if (deltaX > 0) {
          handlePrevVersion(); // Swiped right -> previous version (loops)
        } else {
          handleNextVersion(); // Swiped left -> next version (loops)
        }
      } else if (currentImages.length > 1) {
        if (deltaX > 0) {
          setActiveImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
        } else {
          setActiveImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
        }
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    mouseStartY.current = e.clientY;
    isMouseDown.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isMouseDown.current || mouseStartX.current === null || mouseStartY.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    const deltaY = e.clientY - mouseStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (allVersions.length > 1) {
        if (deltaX > 0) {
          handlePrevVersion();
        } else {
          handleNextVersion();
        }
      } else if (currentImages.length > 1) {
        if (deltaX > 0) {
          setActiveImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
        } else {
          setActiveImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
        }
      }
    }
    isMouseDown.current = false;
    mouseStartX.current = null;
    mouseStartY.current = null;
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    mouseStartX.current = null;
    mouseStartY.current = null;
  };

  return (
    <div data-component="project-card">
      {/* Project Meta Section */}
      <div data-component-section="project-meta">
        <h2>{currentProject.title}</h2>

        {/* Action / Mode Toggles & Version (pure text) */}
        <div data-component-section="project-meta-helper">
          <span data-status-badge>{currentProject.status}</span>

          <div data-component-section="project-meta-version">
            <span data-version-indicator>v{currentProject.version}</span>
          </div>
        </div>
      </div>

      {/* Project Body Section */}
      <div data-component-section="project-body">
        <div data-preview-wrapper>
          <div
            data-preview-box
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            style={{
              cursor: allVersions.length > 1 || currentImages.length > 1 ? 'grab' : 'default',
              touchAction: 'pan-y',
            }}
            aria-label={allVersions.length > 1 ? 'Swipe to switch project version' : undefined}
          >
            {activeImageSrc && currentProject.isImageAvailable ? (
              <img
                src={activeImageSrc}
                alt={currentProject.imageAltText || `${currentProject.title} screenshot`}
                draggable={false}
              />
            ) : (
              <p>{currentProject.title}</p>
            )}

            {currentImages.length > 1 && (
              <>
                <button
                  type="button"
                  data-preview-nav-btn="prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === 0 ? currentImages.length - 1 : prev - 1));
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  data-preview-nav-btn="next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImageIndex((prev) => (prev === currentImages.length - 1 ? 0 : prev + 1));
                  }}
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {allVersions.length > 1 && (
              <div data-version-dots>
                {allVersions.map((_, idx) => (
                  <span
                    key={idx}
                    data-version-dot
                    data-active={idx === activeIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            )}
          </div>

          {currentImages.length > 1 && (
            <div data-image-indicators>
              {currentImages.map((_, idx) => (
                <span
                  key={idx}
                  data-dot
                  data-active={idx === activeImageIndex || undefined}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`Show image ${idx + 1} of ${currentImages.length}`}
                />
              ))}
            </div>
          )}

          <div data-project-actions>
            <button
              type="button"
              data-cta-btn
              onClick={() => setIsDrawerOpen(true)}
            >
              Explore <MoveUpRight size={16} />
            </button>
            <button
              type="button"
              data-cta-btn
              data-read-btn
              onClick={() => setIsReadDrawerOpen(true)}
            >
              <BookOpen size={16} /> Read
            </button>
          </div>
        </div>

        {/* Project Specs & Description */}
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

        <p data-project-desc>{currentProject.description}</p>
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

      {/* Standalone Read Details Drawer (Technologies, Features & Architecture) */}
      <ProjectReadDrawer
        isOpen={isReadDrawerOpen}
        onClose={() => setIsReadDrawerOpen(false)}
        title={currentProject.title}
        techStack={currentProject.techStack}
        featuresList={currentProject.featuresList}
        architectureList={currentProject.architectureList}
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
