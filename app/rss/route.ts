import { baseUrl } from 'app/sitemap';
import { getJournalPosts } from 'utils/mdx';
import { JournalPost } from 'app/components/posts';

export async function GET() {
  let allJournalPosts = await getJournalPosts<JournalPost>();

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
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/journal/${post.slug}</link>
          <description>${post.metadata.summary || ''}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>My Portfolio</title>
        <link>${baseUrl}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
