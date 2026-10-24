import { JournalPosts } from '@/components/posts';
import { PageHeader } from '@/components/page-header';
import { getJournalPosts } from 'utils/mdx';
import { SITE } from 'utils/site';
import { pageMetadata } from 'utils/seo';

export const metadata = pageMetadata({
  title: 'Journal',
  description: SITE.journalDescription,
  path: '/journal',
});

export default function Page() {
  const posts = getJournalPosts();

  return (
    <div className="w-full">
      <PageHeader
        index="03 / journal"
        title="Journal"
        description={SITE.journalDescription}
        meta={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
      />
      <JournalPosts />
      <div className="relative flex items-center gap-3 border-l border-terminal/15 py-4 pl-5 font-mono text-[10px] tracking-[0.18em] text-terminal/30 uppercase sm:pl-7">
        <span
          aria-hidden="true"
          className="absolute top-1/2 -left-[3.5px] size-1.5 -translate-y-1/2 rounded-full border border-terminal/30"
        />
        end of log
      </div>
    </div>
  );
}
