import { type WorkExperience as WorkExperienceType } from 'utils/mdx';
import React from 'react';

export type Experience = {
  metadata: WorkExperienceType;
  content: string;
  renderedContent: React.ReactNode;
};

