import { getJournalPosts } from 'utils/mdx';
import { SITE_URL } from 'utils/seo';

export const baseUrl = SITE_URL;

export default async function sitemap() {
  let journalPosts = getJournalPosts().map(post => ({
    url: `${baseUrl}/journal/${post.slug}`,
    lastModified: post.metadata.lastUpdated ?? post.metadata.publishedAt,
  }));

  let routes = ['', '/journal', '/work', '/projects'].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...journalPosts];
}
