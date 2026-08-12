import { notFound } from 'next/navigation';
import { CustomMDX } from '@/components/mdx';
import { formatDate, getJournalPosts } from 'utils/mdx';
import { baseUrl } from 'app/sitemap';
import { JournalPost } from '@/components/posts';
import { AUTHOR } from 'utils/site';

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

  let { title, publishedAt: publishedTime, lastUpdated, summary: description, image } = post.metadata;
  let ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/journal/${post.slug}`,
    },
    authors: [{ name: AUTHOR.name, url: baseUrl }],
    openGraph: {
      title,
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
      title,
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
    <section className="w-full max-w-2xl mx-auto">
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
      <h1 className="text-primary font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-terminal">
          <span>By {AUTHOR.name}</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
          {post.metadata.lastUpdated && (
            <>
              <span aria-hidden="true"> · </span>
              <span>Updated {formatDate(post.metadata.lastUpdated)}</span>
            </>
          )}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
