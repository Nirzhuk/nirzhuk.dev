import type { Metadata } from 'next';

import { SITE } from './site';

export const SITE_URL = 'https://nirzhuk.dev';

type PageMetadata = {
  title: string;
  description?: string;
  path: string;
  type?: 'website' | 'article';
};

export function pageMetadata({
  title,
  description = SITE.description,
  path,
  type = 'website',
}: PageMetadata): Metadata {
  const fullTitle = `${title} - ${SITE.name}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = `${SITE_URL}/og?title=${encodeURIComponent(fullTitle)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: 'en_US',
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: '@nirzhuk',
      images: [ogImage],
    },
  };
}
