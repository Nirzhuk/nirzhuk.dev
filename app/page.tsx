import { JournalPosts } from 'app/components/posts';
import AvailableForWork from './components/available-for-work';

export default function Page() {
  return (
    <section>
      <div className="mb-8">
        <AvailableForWork />
        <h1 className="text-2xl font-semibold">
          John <span className="text-primary">"Nirzhuk"</span> Serrano
        </h1>
      </div>
      <p className="mb-4">{`Full-stack developer, one man army, love to learn new things.`}</p>
      <div className="my-8 max-w-2xl">
        <JournalPosts />
      </div>
    </section>
  );
}
