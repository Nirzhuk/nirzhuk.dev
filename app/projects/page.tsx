'use client';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Categories, projects } from './data';

export default function Page() {
  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-2 gap-2 p-6">
      {projects.map((project, index) => (
        <div
          id={project.name}
          key={`${project.name}-${index}`}
          className="group flex flex-col gap-2 relative min-h-[200px] rounded-xl hover:bg-terminal/20 hover:border-terminal/40 hover:shadow-terminal/30 transition-all duration-200 flex-auto p-3 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 "
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
