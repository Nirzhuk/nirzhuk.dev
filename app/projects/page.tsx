'use client';
import { projects } from './data';
import { ProjectCard } from '@/components/project-card';

export default function Page() {
  return (
    <div className="sm:w-full sm:max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 sm:p-6">
      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}
      <div className="h-32"></div>
    </div>
  );
}
