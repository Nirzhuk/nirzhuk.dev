'use client';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Categories, projects } from './data';

export default function Page() {
  return (
    <div className="w-full grid grid-cols-1 gap-2 p-6">
      {projects.map((project, index) => (
        <div
          key={`${project.name}-${index}`}
          className="group flex flex-col gap-2 relative min-h-[200px] bg-black/30 border border-primary/30 p-3 transition-transform duration-200 hover:scale-102.5"
        >
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg w-full flex text-terminal hover:text-terminal/20  justify-between gap-2 items-center font-semibold transition-colors"
          >
            <div className="flex gap-1 items-center">
              {project.name} <ExternalLink strokeWidth={3} className="size-4" />
            </div>
            {project.deprecated && <span className="text-gray-200 text-xs">deprecated</span>}
          </Link>
          <p className="text-neutral-400 dark:text-neutral-300 text-xs ml-4">{project.stack}</p>
          <p className="text-sm mt-1 line-clamp-3">{project.description}</p>
        </div>
      ))}
      {/* Spacer to ensure last element is fully visible */}
      <div className="h-32"></div>
    </div>
  );
}
