import { JournalPosts } from '@/components/posts';
import AvailableForWork from '../components/available-for-work';
import BlobLoader from '@/components/blob/BlobLoader';
import MarqueeLoader from '@/components/marquee/MarqueeLoader';

export default function Page() {
  return (
    <div className="max-w-xl">
      <section>
        <div className="mb-4">
          <AvailableForWork />
          <h1 className="text-2xl font-semibold">
            I'm John <span className="text-primary">"Nirzhuk"</span> Serrano
          </h1>
        </div>
      </section>

      <div className="flex my-8 sm:flex-row flex-col gap-4 ">
        <section className="sm:w-1/2 w-full">
          <JournalPosts />
        </section>
        <section className="sm:w-1/3 flex justify-center items-start">
          <BlobLoader />
        </section>
      </div>
      <MarqueeLoader />
    </div>
  );
}
