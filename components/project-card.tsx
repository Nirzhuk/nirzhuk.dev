import * as React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import type { Project } from '@/app/projects/data';
import { cn } from '@/utils/cn';
import { ProjectCardDialog } from './project-card-dialog';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <ProjectCardDialog project={project}>
      <div
        id={project.name}
        className={cn(
          'group cursor-pointer flex flex-col gap-2 w-full relative min-h-[200px] rounded-xl hover:bg-terminal/20 hover:border-terminal/40 hover:shadow-terminal/30 transition-all duration-200 p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30',
          className
        )}
      >
        <div className="w-full min-w-0 flex items-start justify-between gap-2">
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg flex-1 min-w-0 flex text-terminal hover:text-terminal/20 items-center gap-2 font-semibold transition-colors"
          >
            <span className="truncate">{project.name}</span>
            <ExternalLink strokeWidth={3} className="size-4 shrink-0" />
          </Link>
          <div className="flex items-center gap-2 shrink-0">
            {project.deprecated && <span className="text-gray-200 text-xs">deprecated</span>}
          </div>
        </div>
        <p className="text-neutral-400 dark:text-neutral-300 text-xs ml-4 truncate">
          {project.stack.join(', ')}
        </p>
        <p className="text-sm mt-1 line-clamp-3 break-words">{project.description}</p>
      </div>
    </ProjectCardDialog>
  );
}
