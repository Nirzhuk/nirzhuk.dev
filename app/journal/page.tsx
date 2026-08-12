import { JournalPosts } from '@/components/posts';
import { baseUrl } from 'app/sitemap';
import { SITE } from 'utils/site';

export const metadata = {
  title: 'Journal',
  description: SITE.journalDescription,
  alternates: {
    canonical: `${baseUrl}/journal`,
  },
};

export default function Page() {
  return (
    <section className="w-full max-w-2xl mx-auto">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Journal</h1>
      <JournalPosts />
    </section>
  );
}
