import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { formatDate, getJournalPosts } from 'utils/mdx';
import type { BaseMetadata } from 'utils/mdx';

export interface JournalPost extends BaseMetadata {
  title: string;
  publishedAt: string;
  summary: string;
}

export function JournalPosts({ limit }: { limit?: number }) {
  const allJournalPosts = getJournalPosts<JournalPost>().sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  const posts = limit ? allJournalPosts.slice(0, limit) : allJournalPosts;

  return (
    <ul className="flex flex-col">
      {posts.map((post, index) => (
        <li key={post.slug} className="relative">
          <Link
            href={`/journal/${post.slug}`}
            className="group flex flex-col border-l border-terminal/15 py-5 pl-5 transition-colors duration-200 hover:border-terminal/40 hover:bg-terminal/[0.03] sm:grid sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-6 sm:py-6 sm:pl-7"
          >
            <span
              aria-hidden="true"
              className="absolute top-[25px] -left-[2.5px] size-1.5 rounded-full bg-terminal/40 transition-all duration-300 group-hover:scale-125 group-hover:bg-terminal group-hover:shadow-[0_0_10px_2px_rgba(16,251,136,0.45)] sm:top-[29px]"
            />
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] sm:flex-col sm:items-start sm:gap-y-1.5">
              <time
                dateTime={post.metadata.publishedAt}
                className="text-terminal/50 transition-colors duration-200 group-hover:text-terminal/80"
              >
                {formatDate(post.metadata.publishedAt, false)}
              </time>
              <span aria-hidden="true" className="size-1 rounded-full bg-terminal/25 sm:hidden" />
              <span className="text-neutral-500">log {String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="mt-2 min-w-0 sm:mt-0">
              <p className="flex items-start gap-2 text-lg leading-snug font-medium tracking-tight text-neutral-100 transition-colors duration-200 group-hover:text-terminal sm:text-xl">
                <span className="min-w-0 break-words">{post.metadata.title}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={2}
                  className="mt-1 size-4 shrink-0 -translate-x-1 text-terminal opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-80"
                />
              </p>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-neutral-400">
                {post.metadata.summary}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
