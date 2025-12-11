import { getWorkExperiences, type WorkExperience as WorkExperienceType } from 'utils/mdx';
import { CustomMDX } from '@/components/mdx';
import { waypoints } from './waypoints';
import { Timeline } from './timeline';

const WorkPage = () => {
  const workExperiences = getWorkExperiences<WorkExperienceType>();

  // Pre-render MDX content on the server
  const experiencesWithRenderedContent = workExperiences.map(exp => ({
    metadata: exp.metadata,
    content: exp.content,
    renderedContent: <CustomMDX source={exp.content} />,
  }));

  return <Timeline experiences={experiencesWithRenderedContent} waypoints={waypoints} />;
};

export default WorkPage;
