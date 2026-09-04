import Link from 'next/link';
import { BaseMetadata, formatDate, getJournalPosts } from 'utils/mdx';

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
    <div>
      {posts.map(post => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/journal/${post.slug}`}
        >
          <div className="w-full group flex flex-col gap-4">
            <div className="flex flex-row space-x-2 items-center justify-between">
              <p className="text-primary tracking-tight">{post.metadata.title}</p>
              <p className="text-terminal tabular-nums text-xs">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </div>
            <span className=" text-sm">{post.metadata.summary}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
