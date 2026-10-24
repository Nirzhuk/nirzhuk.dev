import { ArchivedRow } from '@/components/archived-row';
import { PageHeader } from '@/components/page-header';
import { ProjectStats } from '@/components/project-stats';
import { ProjectTile } from '@/components/project-tile';
import { pageMetadata } from 'utils/seo';
import { projects } from './data';

export const metadata = pageMetadata({
  title: 'Works',
  description: 'Apps, tools and experiments built by Nirzhuk.',
  path: '/projects',
});

export default function Page() {
  const active = projects.filter(project => !project.deprecated);
  const archived = projects.filter(project => project.deprecated);

  return (
    <div className="w-full">
      <PageHeader
        index="01 / works"
        title="All projects"
        meta={`${active.length} active · ${archived.length} archived`}
      />

      <ProjectStats />

      <div className="grid gap-4 lg:grid-cols-2">
        {active.map((project, index) => (
          <ProjectTile key={project.name} project={project} index={index + 1} />
        ))}
      </div>

      {archived.length > 0 && (
        <section className="mt-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
            Archived
          </h2>
          <ul className="mt-3 divide-y divide-terminal/10 border-y border-terminal/15">
            {archived.map(project => (
              <ArchivedRow key={project.name} project={project} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
