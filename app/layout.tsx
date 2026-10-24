import './global.css';
import type { Metadata, Viewport } from 'next';
import { Space_Mono } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { baseUrl } from './sitemap';
import { BootTrigger } from '../components/boot-trigger';
import { PageTransition } from '../components/page-transition';
import { Sidebar } from '../components/sidebar';
import { OpenPanelComponent } from '@openpanel/nextjs';
import { AUTHOR, SITE } from 'utils/site';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE.title,
    template: `%s - ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: AUTHOR.name, url: baseUrl }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  category: 'technology',
  alternates: {
    canonical: baseUrl,
  },

  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: baseUrl,
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `/og?title=${encodeURIComponent(SITE.title)}`,
        width: 1200,
        height: 630,
        alt: SITE.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.title,
    description: SITE.description,
    creator: '@nirzhuk',
    images: [`/og?title=${encodeURIComponent(SITE.title)}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#0b120d',
  colorScheme: 'dark',
};

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
});

const cx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(
        'text-white bg-gray-950 h-full w-full',
        GeistSans.variable,
        GeistMono.variable,
        spaceMono.variable
      )}
    >
      <body className="main-background relative h-dvh w-full overflow-hidden antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname!=='/'||sessionStorage.getItem('nirzhuk:booted')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;sessionStorage.setItem('nirzhuk:booted','1');document.documentElement.classList.add('crt-boot');setTimeout(function(){document.documentElement.classList.remove('crt-boot')},1700)}catch(e){}})();`,
          }}
        />
        <img className="crt-frame" src="/crt_green_mask.png" alt="" />

        <OpenPanelComponent
          apiUrl="/api/op"
          cdnUrl="/api/op/op1.js"
          clientId="cdd0da38-8a1b-4919-826f-42609468a2b7"
          trackScreenViews={true}
          trackAttributes={true}
          trackOutgoingLinks={true}
        />

        <div className="terminal-background">
          <div className="crt-safe relative z-[3] flex h-full flex-col overflow-x-hidden overflow-y-auto md:grid md:grid-cols-[16rem_minmax(0,1fr)] md:overflow-y-hidden lg:grid-cols-[21rem_minmax(0,1fr)] xl:grid-cols-[23rem_minmax(0,1fr)]">
            <Sidebar />
            <main className="terminal-scroll min-w-0 overflow-x-clip p-4 sm:p-5 md:h-full md:overflow-y-auto md:p-6 md:[scrollbar-gutter:stable] lg:p-8">
              <div className="mx-auto w-full max-w-5xl pb-12 2xl:max-w-6xl">
                <PageTransition>{children}</PageTransition>
              </div>
            </main>
          </div>
        </div>
        <div className="power-flash" aria-hidden="true" />
        <BootTrigger />
      </body>
    </html>
  );
}
