import { getJournalPosts } from 'utils/mdx';

export const baseUrl = 'https://nirzhuk.dev';

export default async function sitemap() {
  let journalPosts = getJournalPosts().map(post => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ['', '/journal'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...journalPosts];
}
