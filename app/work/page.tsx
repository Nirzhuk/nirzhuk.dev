import { PageHeader } from '@/components/page-header';
import { getWorkExperiences } from 'utils/mdx';
import type { WorkExperience } from 'utils/mdx';
import { CustomMDX } from '@/components/mdx';
import { SITE } from 'utils/site';
import { pageMetadata } from 'utils/seo';
import { waypoints } from './waypoints';
import { Timeline } from './timeline';
import { CareerList } from './components/career-list';

export const metadata = pageMetadata({
  title: 'Career',
  description: `Timeline of roles and milestones from ${SITE.since} to today.`,
  path: '/work',
});

const WorkPage = () => {
  const workExperiences = getWorkExperiences<WorkExperience>();

  // Pre-render MDX content on the server
  const experiencesWithRenderedContent = workExperiences.map(exp => ({
    metadata: exp.metadata,
    content: exp.content,
    renderedContent: <CustomMDX source={exp.content} />,
  }));

  return (
    <div className="w-full">
      <PageHeader
        index="02 / career"
        title="Career timeline"
        meta={`${workExperiences.length} roles · ${SITE.since} — now`}
        description={`Every role since ${SITE.since}, plus the milestones along the way. Open any entry for the full story.`}
      />
      <CareerList experiences={experiencesWithRenderedContent} waypoints={waypoints} />
      <div className="hidden md:block">
        <Timeline experiences={experiencesWithRenderedContent} waypoints={waypoints} />
      </div>
    </div>
  );
};

export default WorkPage;
