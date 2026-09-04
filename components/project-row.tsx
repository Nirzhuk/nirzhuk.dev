import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { Project } from '@/app/projects/data';
import { cn } from '@/utils/cn';
import { ProjectCardDialog } from './project-card-dialog';

function hostname(url: string) {
  // Domain only: some project urls carry a long store path that would crowd the row.
  return url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];
}

export function ProjectRow({ project }: { project: Project }) {
  const shots = project.images?.length ?? 0;
  const meta = [...project.categories, ...project.stack];

  return (
    <li
      className={cn(
        'group relative -mx-2 px-2 transition-colors',
        // Highlighted rows borrow the work timeline card: same radius, border and gradient.
        project.highlight
          ? 'my-1.5 rounded-lg border border-terminal/30 bg-gradient-to-br from-terminal/10 to-primary/5 hover:border-terminal/60 hover:from-terminal/20 hover:to-primary/10'
          : 'rounded-lg border-b border-terminal/10 hover:bg-terminal/5'
      )}
    >
      <ProjectCardDialog project={project}>
        <button type="button" className="block w-full cursor-pointer py-2 text-left">
          <h3 className="truncate pr-44 text-sm font-semibold text-terminal">{project.name}</h3>
          <p className="mt-0.5 truncate pr-4 text-xs text-neutral-300">{project.description}</p>
          <p className="mt-1 truncate font-mono text-xs text-neutral-400">
            {meta.join(' · ')}
            {shots > 0 && ` · ${shots} ${shots === 1 ? 'shot' : 'shots'}`}
          </p>
        </button>
      </ProjectCardDialog>

      <div className="absolute top-2 right-0 flex items-center gap-3 font-mono text-xs">
        {project.source && (
          <Link
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-500 hover:text-primary hover:underline"
          >
            source
          </Link>
        )}
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-[170px] items-center gap-1 text-primary hover:underline"
        >
          <span className="hidden truncate sm:inline">{hostname(project.url)}</span>
          <ArrowUpRight strokeWidth={2} className="size-3 shrink-0" />
        </Link>
      </div>
    </li>
  );
}

export function ArchivedRow({ project }: { project: Project }) {
  return (
    <li className="flex items-baseline gap-4 py-1 opacity-45 transition-opacity hover:opacity-90">
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate text-sm hover:text-terminal hover:underline"
      >
        {project.name}
      </Link>
      <span className="flex-1 truncate font-mono text-xs text-neutral-400">
        {project.categories.join(' · ')}
      </span>
      <ArrowUpRight strokeWidth={2} className="size-3 shrink-0 text-neutral-600" />
    </li>
  );
}
