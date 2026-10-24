'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Code2, ExternalLinkIcon, FileText, Globe } from 'lucide-react';

import type { Project } from '@/app/projects/data';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './dialog';
import { cn } from '@/utils/cn';
import { builtWithGroups } from 'utils/project-tech';

function ProjectMedia({
  project,
  images,
  kind,
}: {
  project: Project;
  images: string[];
  kind: 'phone' | 'web';
}) {
  if (images.length === 0) {
    return (
      <div className="relative flex h-full min-h-[240px] w-full items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(16,251,136,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(16,251,136,0.35) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative text-center">
          <p className="font-mono text-7xl font-bold tracking-tight text-terminal/15">
            {project.name
              .split(/[\s-]+/)
              .slice(0, 2)
              .map(word => word.charAt(0))
              .join('')
              .toUpperCase()}
          </p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-terminal/40">
            {project.categories.join(' · ')}
          </p>
        </div>
      </div>
    );
  }

  if (kind === 'phone') {
    return (
      <div className="flex h-full min-h-[320px] w-full items-center justify-center py-6">
        <Carousel className="w-full max-w-[280px]">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image} className="flex justify-center">
                <div className="relative w-[180px] shrink-0 sm:w-[205px]">
                  <div className="relative aspect-[9/19] overflow-hidden rounded-[2rem] border-[5px] border-neutral-700 bg-neutral-900 shadow-2xl">
                    <Image
                      src={image}
                      alt={`${project.name} phone screenshot ${index + 1}`}
                      fill
                      sizes="205px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    );
  }

  return (
    <Carousel fill className="h-full">
      <CarouselContent fill className="h-full">
        {images.map((image, index) => (
          <CarouselItem key={image} className="h-full">
            <div className="relative h-full w-full p-3 sm:p-5">
              <Image
                src={image}
                alt={`${project.name} web screenshot ${index + 1}`}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-contain"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

interface ProjectCardDialogProps {
  project: Project;
  children: React.ReactElement;
  className?: string;
  mobileFullScreen?: boolean;
}

export function ProjectCardDialog({
  project,
  children,
  className,
  mobileFullScreen = true,
}: ProjectCardDialogProps) {
  const phone = project.screenshots?.phone ?? [];
  const web = project.screenshots?.web ?? [];
  const total = phone.length + web.length;
  const groups = builtWithGroups(project);
  const [view, setView] = React.useState<'phone' | 'web'>(phone.length > 0 ? 'phone' : 'web');
  const activeImages = view === 'phone' ? phone : web;
  const hasBothViews = phone.length > 0 && web.length > 0;
  const live = project.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0];

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn('p-0 md:max-w-4xl lg:max-w-5xl', className)}
        contentClassName="p-0"
        mobileFullScreen={mobileFullScreen}
        closeButtonClassName="fixed top-[calc(var(--crt-inset-y)+10px)] right-[calc(var(--crt-inset-x)+10px)] z-30 rounded-full border border-terminal/30 bg-black/70 p-1.5 text-terminal hover:bg-black/90 md:absolute md:top-3 md:right-3"
      >
        <div className="flex min-h-full w-full flex-col md:h-full md:min-h-0 md:flex-row">
          <div className="relative shrink-0 overflow-hidden border-b border-terminal/15 bg-black/45 md:w-[54%] md:border-r md:border-b-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(16,251,136,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(16,251,136,0.35) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />

            {hasBothViews && (
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1 rounded-full border border-terminal/25 bg-black/75 p-1 font-mono text-[9px] uppercase tracking-[0.14em] backdrop-blur-sm">
                <button
                  type="button"
                  aria-pressed={view === 'phone'}
                  onClick={() => setView('phone')}
                  className={cn(
                    'rounded-full px-2.5 py-1 transition-colors',
                    view === 'phone'
                      ? 'bg-terminal/15 text-terminal'
                      : 'text-neutral-500 hover:text-neutral-200'
                  )}
                >
                  phone {phone.length}
                </button>
                <button
                  type="button"
                  aria-pressed={view === 'web'}
                  onClick={() => setView('web')}
                  className={cn(
                    'rounded-full px-2.5 py-1 transition-colors',
                    view === 'web'
                      ? 'bg-terminal/15 text-terminal'
                      : 'text-neutral-500 hover:text-neutral-200'
                  )}
                >
                  web {web.length}
                </button>
              </div>
            )}

            <div className="relative h-[280px] w-full sm:h-[340px] md:h-full">
              <ProjectMedia
                key={`${project.name}-${view}`}
                project={project}
                images={activeImages}
                kind={view}
              />
            </div>

            {total > 1 && (
              <span className="absolute bottom-3 left-3 rounded-full border border-terminal/25 bg-black/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-terminal/70">
                {total} screenshots
              </span>
            )}
          </div>

          <div className="flex min-w-0 flex-1 flex-col md:min-h-0">
            <header className="border-b border-terminal/15 px-5 py-5 sm:px-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-terminal/50">
                {project.categories.join(' · ')}
                {project.deprecated && <span className="text-neutral-500"> · archived</span>}
              </p>
              <DialogTitle className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {project.name}
              </DialogTitle>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 font-mono text-xs text-primary transition-colors hover:text-terminal"
              >
                {live}
                <ArrowUpRight strokeWidth={2} className="size-3" />
              </a>
            </header>

            <div className="min-h-0 flex-1 space-y-7 px-5 py-5 sm:px-6 sm:py-6 md:overflow-y-auto">
              <DialogDescription className="text-sm leading-relaxed text-neutral-300">
                {project.description}
              </DialogDescription>

              <section>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Links
                </h3>
                <ul className="mt-2.5 flex flex-col gap-1.5">
                  <li>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 font-mono text-xs text-neutral-300 transition-colors hover:text-terminal"
                    >
                      <Globe strokeWidth={1.6} className="size-3.5 text-terminal/60" />
                      <span className="transition-colors group-hover:text-terminal">
                        Open project
                      </span>
                      <span className="text-neutral-600">{live}</span>
                    </a>
                  </li>
                  {project.source && (
                    <li>
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-mono text-xs text-neutral-300 transition-colors hover:text-terminal"
                      >
                        <Code2 strokeWidth={1.6} className="size-3.5 text-terminal/60" />
                        <span className="transition-colors group-hover:text-terminal">
                          Source code
                        </span>
                        <ExternalLinkIcon strokeWidth={1.6} className="size-3 text-neutral-600" />
                      </a>
                    </li>
                  )}
                  {project.journalSlug && (
                    <li>
                      <Link
                        href={`/journal/${project.journalSlug}`}
                        className="group inline-flex items-center gap-2 font-mono text-xs text-neutral-300 transition-colors hover:text-terminal"
                      >
                        <FileText strokeWidth={1.6} className="size-3.5 text-terminal/60" />
                        <span className="transition-colors group-hover:text-terminal">
                          Build notes
                        </span>
                        <ArrowUpRight
                          strokeWidth={2}
                          className="size-3 text-neutral-600 transition-colors group-hover:text-terminal"
                        />
                      </Link>
                    </li>
                  )}
                </ul>
              </section>

              <section>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  Built with
                </h3>
                <div className="mt-3 space-y-4">
                  {groups.map(group => (
                    <div key={group.label}>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-neutral-600">
                        {group.label}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                        {group.items.map(item => (
                          <li
                            key={item}
                            className="rounded-md border border-terminal/25 bg-terminal/[0.08] px-2 py-1 text-terminal/80"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-terminal/15 pt-5 font-mono text-[11px] sm:grid-cols-3">
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                    Platforms
                  </dt>
                  <dd className="mt-1 text-neutral-300">{project.categories.join(' · ')}</dd>
                </div>
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                    Status
                  </dt>
                  <dd className="mt-1 text-neutral-300">
                    {project.deprecated ? 'Archived' : 'Active'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[9px] uppercase tracking-[0.16em] text-neutral-500">
                    Screenshots
                  </dt>
                  <dd className="mt-1 text-neutral-300">{total || '—'}</dd>
                </div>
              </dl>
            </div>

            <footer className="border-t border-terminal/15 px-5 py-4 sm:px-6">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-terminal/40 bg-terminal/10 px-4 py-2.5 font-mono text-xs text-terminal transition-colors duration-200 hover:border-terminal/70 hover:bg-terminal/15"
              >
                Open {live}
                <ArrowUpRight strokeWidth={2} className="size-3.5" />
              </a>
            </footer>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
