import { getWorkExperiences } from 'utils/mdx';
import type { BaseMetadata } from 'utils/mdx';
import { CustomMDX } from '@/components/mdx';
import React from 'react';
import styles from './work.module.css';

interface WorkExperience extends BaseMetadata {
  company: string;
  companyUrl: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  technologies: string[];
}

interface WorkExperienceProps {
  experience: {
    metadata: WorkExperience;
    content: string;
  };
  index: number;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ experience, index }) => {
  return (
    <div className="flex sm:flex-row flex-col h-full">
      <div className="text-left min-w-52 py-6 text-sm">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {experience.metadata.startDate} - {experience.metadata.endDate}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {experience.metadata.location}
        </p>
      </div>
      <div
        className={`flex flex-col gap-4 px-6 ${styles.animateFadeInUp}`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-mono font-semibold text-primary">
                <a
                  href={experience.metadata.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline decoration-primary/20 hover:decoration-primary/80 transition-all duration-300"
                >
                  {experience.metadata.company}
                </a>{' '}
                <span className="text-lg text-neutral-300  mt-1">- {experience.metadata.role}</span>
              </h3>
            </div>
          </div>
          <p className="text-sm text-neutral-500  mt-1">{experience.metadata.summary}</p>
        </div>
        <div className="text-neutral-300">
          <CustomMDX source={experience.content} />
        </div>
      </div>
    </div>
  );
};

const WorkPage = () => {
  const workExperiences = getWorkExperiences<WorkExperience>();

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="grid gap-6">
        {workExperiences.map((experience, index) => (
          <WorkExperience key={experience.metadata.company} experience={experience} index={index} />
        ))}
      </div>
    </div>
  );
};

export default WorkPage;
