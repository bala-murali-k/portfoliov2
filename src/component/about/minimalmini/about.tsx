import { useStyle } from '@context/global/style-context';
import { getAboutContent } from '@content/about';
import type { MinimalMiniAboutContent } from '@content/about/minimalmini/about.content';
import Hero from './hero/hero';
import ProfessionalTimeline from './timeline/timeline';
import WorkProcess from './workprogress/progress';
import Hobbies from './hobbies/hobbies';

/**
 * Minimal Mini About Page:
 * Mobile-first vertical scroll view with distinct spacious sections.
 */
export default function MinimalMiniAbout() {
  const { styleId } = useStyle();
  const content = getAboutContent<MinimalMiniAboutContent>(styleId);

  const timelineList = content.professionalTimeline || [];
  const workProgressList = content.workProgress || [];

  return (
    <div data-component="minimalmini-about">
      {content.hero && (
        <section data-component="about-section-1">
          <Hero content={content.hero} />
        </section>
      )}

      {timelineList.map((item, index) => (
        <section
          key={index}
          data-component={`about-section-${2 + index}`}
          data-section-type="timeline"
        >
          <ProfessionalTimeline
            content={item}
            index={index}
            total={timelineList.length}
          />
        </section>
      ))}

      {workProgressList.length > 0 && (
        <section
          data-component={`about-section-${2 + timelineList.length}`}
          data-section-type="workprocess"
        >
          <WorkProcess content={workProgressList} />
        </section>
      )}

      {/* {content.hobbies && (
        <section
          data-component={`about-section-${3 + timelineList.length}`}
          data-section-type="hobbies"
        >
          <Hobbies content={content.hobbies} />
        </section>
      )} */}
    </div>
  );
}
