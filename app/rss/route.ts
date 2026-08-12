import { baseUrl } from 'app/sitemap';
import { getJournalPosts } from 'utils/mdx';
import { JournalPost } from '@/components/posts';
import { AUTHOR, SITE } from 'utils/site';

// ponytail: titles/summaries are authored by me, but an unescaped & or < still
// breaks the whole feed, so escape rather than trust the frontmatter.
const escapeXml = (s: string) =>
  s.replace(/[<>&'"]/g, c => `&${{ '<': 'lt', '>': 'gt', '&': 'amp', "'": 'apos', '"': 'quot' }[c]};`);

export async function GET() {
  let allJournalPosts = getJournalPosts<JournalPost>();

  const itemsXml = allJournalPosts
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1;
      }
      return 1;
    })
    .map(
      post =>
        `<item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${baseUrl}/journal/${post.slug}</link>
          <guid isPermaLink="true">${baseUrl}/journal/${post.slug}</guid>
          <description>${escapeXml(post.metadata.summary || '')}</description>
          <author>${escapeXml(AUTHOR.name)}</author>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${escapeXml(SITE.title)}</title>
        <link>${baseUrl}</link>
        <atom:link href="${baseUrl}/rss" rel="self" type="application/rss+xml" />
        <description>${escapeXml(SITE.journalDescription)}</description>
        <language>en</language>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
