import { ArrowUpRight } from 'lucide-react';

import BlobLoader from './blob/BlobLoader';
import { SocialLinks } from './social-links';

export function ContactCard() {
  return (
    <div className="grid gap-6 rounded-xl border border-terminal/20 bg-gradient-to-br from-terminal/[0.09] via-black/25 to-primary/[0.06] p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-8">
      <div className="min-w-0">
        <p className="max-w-md text-lg leading-snug text-neutral-100 sm:text-xl">
          “Nothing beats seeing someone use something I made.”
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-terminal/45">
          freelance · full-time · product ideas
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <a
            href="mailto:me@nirzhuk.dev?subject=Work%20Opportunity%20Inquiry"
            className="inline-flex items-center gap-2 rounded-full border border-terminal/40 bg-terminal/10 px-4 py-2 font-mono text-xs text-terminal transition-colors duration-200 hover:border-terminal/70 hover:bg-terminal/15"
          >
            me@nirzhuk.dev
            <ArrowUpRight strokeWidth={2} className="size-3.5" />
          </a>
          <SocialLinks />
        </div>
      </div>
      <BlobLoader className="mx-auto size-28 rounded-full opacity-80 sm:size-40" />
    </div>
  );
}
