'use client';

import * as React from 'react';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

import type { Project } from '@/app/projects/data';
import { Dialog, DialogContent, DialogTrigger } from './dialog';
import { ExternalLinkIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import FuzzyText from './fuzzy-text';
import Image from 'next/image';

interface ProjectCardDialogProps {
  project: Project;
  children: React.ReactNode;
  className?: string;
  mobileFullScreen?: boolean;
}

export function ProjectCardDialog({
  project,
  children,
  className,
  mobileFullScreen = true,
}: ProjectCardDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn('p-0', className, project.deprecated && 'bg-neutral-900')}
        contentClassName={'p-3'}
        mobileFullScreen={mobileFullScreen}
        closeButtonClassName={'absolute top-4 right-4 hover:bg-neutral-100/50 rounded-full p-1'}
      >
        <div className="w-full h-full flex flex-col gap-3">
          {project.deprecated && (
            <div className="flex items-center justify-center">
              <FuzzyText
                baseIntensity={0.08}
                hoverIntensity={0.2}
                enableHover={true}
                fontSize="1.25rem"
              >
                This project is deprecated
              </FuzzyText>
            </div>
          )}
          {project.images?.length ? (
            <div className="flex-1 w-full bg-neutral-900 rounded-lg  overflow-hidden">
              <Carousel className="w-full h-full " fill>
                <CarouselContent fill className="h-full ">
                  {project.images.map((image, index) => (
                    <CarouselItem key={index} className="h-full">
                      <div className="w-full h-full border border-green-700/30 rounded-lg overflow-hidden">
                        <Image
                          src={image}
                          alt={project.name}
                          width={700}
                          height={300}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          ) : (
            <div className="flex-1 w-full bg-neutral-900 rounded-lg border border-green-700/30" />
          )}
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-bold text-2xl">{project.name}</h2>{' '}
              {project.url && (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-terminal/20 underline rounded-lg  text-xs px-2 py-1 flex items-center gap-1"
                >
                  {project.url.replace('https://', '').replace('http://', '').replace('www.', '')}
                  <ExternalLinkIcon strokeWidth={1} className="size-4 shrink-0" />
                </Link>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap gap-2">
                {project.stack.map(stack => (
                  <span key={stack} className="bg-terminal/20 rounded-lg  text-xs px-2 py-1">
                    {stack}
                  </span>
                ))}
              </div>
            </div>
            <hr className="border-terminal/30" />
            <div className="flex items-center justify-between">
              <p className="mt-1">{project.description}</p>
            </div>
            {project.categories?.length ? (
              <div>
                <p className="mt-1">{project.categories.join(' • ')}</p>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
