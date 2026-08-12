import { JournalPosts } from '@/components/posts';

export const metadata = {
  title: 'Journal',
  description: 'Read my journal.',
};

export default function Page() {
  return (
    <section className="w-full max-w-2xl mx-auto">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Journal</h1>
      <JournalPosts />
    </section>
  );
}
