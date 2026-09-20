import { useStyle } from '@context/global/style-context';
import Bio from './bio';
import { getAboutContent } from '@content/about';
import type { MinimalAboutContent } from '@content/about/minimal/about.content';
import FinisherV1 from './finisher/finisher.v1';
import ProfessionalTimeline from './timeline';
import WorkProcess from './workprogress';

export default function CoreAbout() {
  const { styleId } = useStyle();
  const content = getAboutContent<MinimalAboutContent>(styleId);

  const timelineList = content.professionalTimeline || [];
  const workProgressList = content.workProgress || [];
  const workProgressSectionIndex = 2 + timelineList.length;
  const finisherSectionIndex = workProgressList.length > 0
    ? 3 + timelineList.length
    : 2 + timelineList.length;

  return (
    <>
      <section data-component="about-section-1">
        <Bio content={content.hero} />
      </section>
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
          data-component={`about-section-${workProgressSectionIndex}`}
          data-section-type="workprocess"
        >
          <WorkProcess content={workProgressList} />
        </section>
      )}
      <section
        data-component={`about-section-${finisherSectionIndex}`}
        data-component-type="finish"
      >
        <FinisherV1 />
      </section>
    </>
  );
}