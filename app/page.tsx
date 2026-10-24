import { FeaturedProject } from '@/components/featured-project';
import { JournalPosts } from '@/components/posts';
import type { JournalPost } from '@/components/posts';
import { ProjectTile } from '@/components/project-tile';
import { Section } from '@/components/section';
import { ContactCard } from '@/components/contact-card';
import { getJournalPosts, getWorkExperiences } from 'utils/mdx';
import type { WorkExperience } from 'utils/mdx';
import { AUTHOR, SITE } from 'utils/site';
import { projects } from './projects/data';
import { formatDateShort, parseDateToDecimalYear } from './work/utils';
import { getCurrentWaypoint } from './work/waypoints';
import { baseUrl } from './sitemap';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: AUTHOR.name,
  alternateName: AUTHOR.alternateName,
  url: baseUrl,
  jobTitle: SITE.role,
  description: SITE.description,
  knowsAbout: SITE.stack,
  sameAs: AUTHOR.sameAs,
};

export default function Page() {
  const now = getCurrentWaypoint();
  const activeProjects = projects.filter(project => !project.deprecated);
  const featured =
    activeProjects.find(
      project =>
        project.highlight &&
        (project.screenshots?.phone?.length ?? 0) + (project.screenshots?.web?.length ?? 0) > 0
    ) ?? activeProjects[0];
  const otherProjects = activeProjects.filter(project => project !== featured);
  const posts = getJournalPosts<JournalPost>();
  const experiences = getWorkExperiences<WorkExperience>().sort(
    (a, b) =>
      parseDateToDecimalYear(b.metadata.startDate) - parseDateToDecimalYear(a.metadata.startDate)
  );

  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      <Section
        id="works"
        index="01"
        title="Selected works"
        meta={`${activeProjects.length} projects`}
        action={{ href: '/projects', label: 'all projects' }}
      >
        {featured && <FeaturedProject project={featured} />}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {otherProjects.map((project, index) => (
            <ProjectTile key={project.name} project={project} index={index + 2} />
          ))}
        </div>
      </Section>

      <Section
        id="career"
        index="02"
        title="Career"
        meta={`${experiences.length} roles`}
        action={{ href: '/work', label: 'full timeline' }}
      >
        {now && (
          <p className="mb-4 font-mono text-[11px] text-neutral-500">
            <span className="text-terminal">now</span>
            <span className="px-2 text-terminal/30">&gt;</span>
            {now.title}
            {now.description && <span className="text-neutral-500"> — {now.description}</span>}
          </p>
        )}

        <ol className="divide-y divide-terminal/10 border-y border-terminal/15">
          {experiences.map(({ metadata }) => (
            <li
              key={`${metadata.company}-${metadata.startDate}`}
              className="grid grid-cols-[5.25rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 py-3 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-x-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-terminal/45">
                {formatDateShort(metadata.startDate)} — {formatDateShort(metadata.endDate)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-neutral-100">
                  {metadata.companyUrl ? (
                    <a
                      href={metadata.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-terminal"
                    >
                      {metadata.company}
                    </a>
                  ) : (
                    metadata.company
                  )}
                </p>
                <p className="truncate text-xs text-neutral-400">{metadata.role}</p>
              </div>
              <span className="col-span-2 font-mono text-[10px] text-neutral-500 sm:col-span-1">
                {metadata.location} · {metadata.type}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="journal"
        index="03"
        title="Journal"
        meta={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
        action={{ href: '/journal', label: 'all posts' }}
      >
        <JournalPosts limit={3} />
      </Section>

      <Section id="contact" index="04" title="Contact">
        <ContactCard />
      </Section>

      {/* Kept last: React hoists <script> during hydration and drops the siblings after it. */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </div>
  );
}
