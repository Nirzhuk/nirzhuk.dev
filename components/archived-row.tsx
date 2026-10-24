import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import type { Project } from '@/app/projects/data';

export function ArchivedRow({ project }: { project: Project }) {
  return (
    <li className="flex items-baseline gap-4 py-2.5 opacity-45 transition-opacity hover:opacity-90">
      <Link
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate text-sm transition-colors hover:text-terminal hover:underline"
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
