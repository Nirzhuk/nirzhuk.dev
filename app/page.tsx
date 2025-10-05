import { JournalPosts } from 'app/components/posts';
import AvailableForWork from './components/available-for-work';

import { WorkingOnProject } from './components/working-on-project';
import { LastProject } from './components/last-project';

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
        <p>
          I work around the world, full-stack developer and <br /> mostly working on my side
          projects.
        </p>
      </section>

      <section className="flex justify-center">
        <WorkingOnProject />
      </section>

      <div className="flex my-8 flex-row gap-4 ">
        <section className="w-1/2">
          <JournalPosts />
        </section>
        <section className="w-1/2">
          <LastProject />
        </section>
      </div>
    </div>
  );
}
