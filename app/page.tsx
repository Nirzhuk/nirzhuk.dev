import Link from 'next/link';
import { JournalPosts } from '@/components/posts';
import AvailableForWork from '../components/available-for-work';
import BlobLoader from '@/components/blob/BlobLoader';
import { FeaturedProject } from '@/components/featured-project';
import { projects } from './projects/data';
import { getCurrentWaypoint } from './work/waypoints';
import { baseUrl } from './sitemap';
import { AUTHOR, SITE } from 'utils/site';

const featured = projects.find(project => project.name === 'NetHaven') ?? projects[0];

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

function SectionHeader({ title, href, label }: { title: string; href: string; label: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-terminal/20 pb-1">
      <h2 className="font-mono text-xs text-terminal">{title}</h2>
      <Link href={href} className="font-mono text-xs text-primary hover:underline">
        {label} →
      </Link>
    </div>
  );
}

export default function Page() {
  const now = getCurrentWaypoint();

  return (
    <div className="w-full max-w-xl">
      <section className="flex flex-col-reverse items-start gap-4 sm:flex-row">
        <div className="min-w-0 flex-1">
          <AvailableForWork />
          <h1 className="text-xl font-semibold">
            I'm John <span className="text-primary">"Nirzhuk"</span> Serrano
          </h1>
          <p className="mt-2 text-sm text-neutral-300">{SITE.description}</p>
          {now && (
            <p className="mt-3 font-mono text-xs text-neutral-400">
              <span className="text-terminal">now</span> &gt; {now.title} ·{' '}
              <Link href="/work" className="text-primary hover:underline">
                timeline
              </Link>
            </p>
          )}
          <ul className="mt-3 flex flex-wrap gap-1.5 font-mono text-xs">
            {SITE.stack.map(tech => (
              <li
                key={tech}
                className="rounded-lg border border-terminal/30 bg-terminal/10 px-2 py-0.5 text-terminal/90"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto shrink-0 sm:mx-0">
          <BlobLoader />
        </div>
      </section>

      {featured && (
        <section className="mt-10">
          <SectionHeader title="featured" href="/projects" label="all projects" />
          <FeaturedProject project={featured} />
        </section>
      )}

      <section className="mt-10">
        <SectionHeader title="journal" href="/journal" label="all posts" />
        <JournalPosts limit={3} />
      </section>

      <div className="h-8" />

      {/* Kept last: React hoists <script> during hydration and drops the siblings after it. */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </div>
  );
}
