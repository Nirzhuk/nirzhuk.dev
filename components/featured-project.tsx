'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { Project } from '@/app/projects/data';
import { ProjectCardDialog } from './project-card-dialog';
import { PhoneShell } from './phone-shell';
import { ImageWithPlaceholder } from './image-with-placeholder';

function hostname(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

export function FeaturedProject({ project }: { project: Project }) {
  const platforms = project.categories;
  const images = project.images ?? [];
  const cover = images[0];

  const media = cover ? (
    <ProjectCardDialog project={project}>
      <button
        type="button"
        className="group mx-auto block shrink-0 cursor-pointer sm:mx-0"
        aria-label={`Open ${project.name} screenshots`}
      >
        {project.isMobileApp ? (
          <PhoneShell
            src={cover}
            alt={`${project.name} screenshot`}
            className="my-0 w-[130px] transition-opacity group-hover:opacity-80 sm:float-none sm:mx-0 sm:mb-0 sm:ml-0 sm:w-[150px]"
          />
        ) : (
          <ImageWithPlaceholder
            src={cover}
            alt={`${project.name} screenshot`}
            width={260}
            height={165}
            containerClassName="w-[200px] rounded-lg border border-terminal/25 sm:w-[240px]"
            className="h-auto w-full transition-opacity group-hover:opacity-80"
          />
        )}
        <span className="mt-2 block font-mono text-xs text-neutral-400 group-hover:text-terminal">
          {images.length} {images.length === 1 ? 'screenshot' : 'screenshots'}
        </span>
      </button>
    </ProjectCardDialog>
  ) : null;

  return (
    <article className="flex flex-col gap-5 rounded-lg border border-terminal/30 bg-gradient-to-br from-terminal/10 to-primary/5 p-4 sm:flex-row">
      {media}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold text-terminal">{project.name}</h3>
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-mono text-xs text-primary hover:underline"
          >
            {hostname(project.url)}
            <ArrowUpRight strokeWidth={2} className="size-3" />
          </Link>
        </div>

        {platforms.length > 0 && (
          <p className="mt-1 font-mono text-xs tracking-wider text-neutral-400 uppercase">
            {platforms.join(' · ')}
          </p>
        )}

        <p className="mt-3 text-sm text-neutral-300">{project.description}</p>

        <ul className="mt-3 flex flex-wrap gap-1.5 font-mono text-xs">
          {project.stack.map(tech => (
            <li
              key={tech}
              className="rounded-lg border border-terminal/30 bg-terminal/10 px-2 py-0.5 text-terminal/90"
            >
              {tech}
            </li>
          ))}
        </ul>

        {(project.journalSlug || project.source) && (
          <div className="mt-4 flex flex-wrap gap-4 border-t border-terminal/20 pt-3 font-mono text-xs">
            {project.journalSlug && (
              <Link
                href={`/journal/${project.journalSlug}`}
                className="text-primary hover:underline"
              >
                read the build notes →
              </Link>
            )}
            {project.source && (
              <Link
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-primary hover:underline"
              >
                source
                <ArrowUpRight strokeWidth={2} className="size-3" />
              </Link>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
