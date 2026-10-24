'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

import type { Project } from '@/app/projects/data';
import { cn } from '@/utils/cn';
import { ProjectCardDialog } from './project-card-dialog';

export function ProjectTile({ project, index }: { project: Project; index: number }) {
  const phone = project.screenshots?.phone ?? [];
  const web = project.screenshots?.web ?? [];
  const hasPhone = phone.length > 0;
  const hasWeb = web.length > 0;

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border border-terminal/20',
        'bg-gradient-to-br from-terminal/[0.06] via-black/20 to-primary/[0.04]',
        'transition-all duration-300 hover:border-terminal/50 hover:shadow-[0_0_28px_rgba(16,251,136,0.12)]'
      )}
    >
      <ProjectCardDialog project={project}>
        <button type="button" className="block w-full cursor-pointer text-left">
          <div className="relative aspect-[16/10] overflow-hidden border-b border-terminal/10 bg-[radial-gradient(ellipse_at_center,rgba(16,251,136,0.14),transparent_72%)]">
            {hasPhone && hasWeb ? (
              <div className="absolute inset-0">
                <Image
                  src={web[0]}
                  alt={`${project.name} web screenshot`}
                  fill
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-cover object-top opacity-70 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/25 to-transparent" />
                <div className="absolute -right-2 -bottom-8 aspect-[9/19] w-[30%] max-w-[120px] overflow-hidden rounded-[1.2rem] border-[3px] border-neutral-700/90 bg-neutral-900 shadow-2xl">
                  <Image
                    src={phone[0]}
                    alt={`${project.name} phone screenshot`}
                    fill
                    sizes="120px"
                    className="object-cover object-top"
                  />
                </div>
                <span className="absolute bottom-3 left-3 rounded-full border border-terminal/25 bg-black/65 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-terminal/70 backdrop-blur-sm">
                  phone + web
                </span>
              </div>
            ) : hasPhone ? (
              <div className="absolute inset-0 flex items-end justify-center gap-2 px-8 pt-6">
                {phone.slice(0, 2).map((image, imageIndex) => (
                  <div
                    key={image}
                    className={cn(
                      'relative h-[118%] w-[42%] max-w-[150px] overflow-hidden rounded-t-[1.1rem] border-[3px] border-neutral-700/80 bg-neutral-900 shadow-2xl',
                      imageIndex === 1 && 'hidden translate-y-4 sm:block'
                    )}
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
            ) : hasWeb ? (
              <Image
                src={web[0]}
                alt={`${project.name} screenshot`}
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(16,251,136,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(16,251,136,0.35) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
                <span className="relative font-mono text-6xl font-bold tracking-tight text-terminal/15">
                  {project.name
                    .split(/[\s-]+/)
                    .slice(0, 2)
                    .map(word => word.charAt(0))
                    .join('')
                    .toUpperCase()}
                </span>
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute top-3 left-3 rounded-full border border-terminal/25 bg-black/55 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-terminal/80 backdrop-blur-sm">
              {project.categories[0]}
            </span>
          </div>

          <div className="p-4">
            <h3 className="flex items-baseline justify-between gap-3 text-base font-semibold text-neutral-100 transition-colors group-hover:text-terminal">
              <span className="truncate">{project.name}</span>
              <span className="font-mono text-[10px] text-neutral-500 transition-colors group-hover:text-terminal/50">
                {String(index).padStart(2, '0')}
              </span>
            </h3>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-400">
              {project.description}
            </p>
            <p className="mt-3 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-terminal/55">
              {project.stack.join(' · ')}
            </p>
          </div>
        </button>
      </ProjectCardDialog>

      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name}`}
        className="absolute top-3 right-3 z-10 grid size-7 place-items-center rounded-full border border-terminal/25 bg-black/55 text-terminal/80 backdrop-blur-sm transition-colors hover:border-terminal/60 hover:text-terminal"
      >
        <ArrowUpRight strokeWidth={2} className="size-3.5" />
      </a>
    </article>
  );
}
