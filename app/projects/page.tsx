'use client';
import { projects } from './data';
import { ArchivedRow, ProjectRow } from '@/components/project-row';

export default function Page() {
  const active = projects.filter(project => !project.deprecated);
  const archived = projects.filter(project => project.deprecated);

  return (
    <div className="w-full max-w-3xl">
      <header className="mb-2 flex items-baseline justify-between gap-4 border-b border-terminal/20 pb-1">
        <h1 className="font-mono text-xs text-terminal">projects</h1>
        <p className="font-mono text-xs text-neutral-500">
          {projects.length} total · {active.length} active
        </p>
      </header>

      <ul>
        {active.map(project => (
          <ProjectRow key={project.name} project={project} />
        ))}
      </ul>

      {archived.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-2 border-b border-terminal/20 pb-1 font-mono text-xs text-neutral-500">
            archived
          </h2>
          <ul className="text-sm">
            {archived.map(project => (
              <ArchivedRow key={project.name} project={project} />
            ))}
          </ul>
        </section>
      )}

      <div className="h-16" />
    </div>
  );
}
