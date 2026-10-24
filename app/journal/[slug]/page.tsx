import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { formatDate, getJournalPosts } from 'utils/mdx';
import { baseUrl } from 'app/sitemap';
import { JournalPost } from '@/components/posts';
import { AUTHOR, SITE } from 'utils/site';

export async function generateStaticParams() {
  let posts = getJournalPosts<JournalPost>();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let post = getJournalPosts<JournalPost>().find(post => post.slug === slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    lastUpdated,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/journal/${post.slug}`,
    },
    authors: [{ name: AUTHOR.name, url: baseUrl }],
    openGraph: {
      title: `${title} - ${SITE.name}`,
      description,
      type: 'article',
      publishedTime,
      modifiedTime: lastUpdated ?? publishedTime,
      authors: [AUTHOR.name],
      url: `${baseUrl}/journal/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} - ${SITE.name}`,
      description,
      images: [ogImage],
    },
  };
}

export default async function Journal({ params }) {
  const { slug } = await params;
  let post = getJournalPosts<JournalPost>().find(post => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full max-w-3xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.lastUpdated ?? post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/journal/${post.slug}`,
            author: {
              '@type': 'Person',
              name: AUTHOR.name,
              alternateName: AUTHOR.alternateName,
              url: baseUrl,
              sameAs: AUTHOR.sameAs,
            },
            publisher: {
              '@type': 'Person',
              name: AUTHOR.name,
              url: baseUrl,
            },
          }),
        }}
      />
      <Link
        href="/journal"
        className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-terminal/50 transition-colors duration-200 hover:text-terminal"
      >
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        >
          ←
        </span>
        journal
      </Link>
      <header className="mt-4 mb-8 border-b border-terminal/15 pb-5 sm:pb-6">
        <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.16em] text-terminal/45">
          <span className="text-terminal/70">By {AUTHOR.name}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-terminal/30" />
          <time dateTime={post.metadata.publishedAt}>{formatDate(post.metadata.publishedAt)}</time>
          {post.metadata.lastUpdated && post.metadata.lastUpdated !== post.metadata.publishedAt && (
            <>
              <span aria-hidden="true" className="text-terminal/25">
                ·
              </span>
              <span className="text-neutral-600">
                Updated {formatDate(post.metadata.lastUpdated)}
              </span>
            </>
          )}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {post.metadata.title}
        </h1>
        {post.metadata.summary && (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-400">
            {post.metadata.summary}
          </p>
        )}
      </header>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </div>
  );
}
