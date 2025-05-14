import './global.css'
import type { Metadata } from 'next'
import { Space_Mono } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import PlausibleProvider from "next-plausible";

import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Nirzhuk Blog',
    template: '%s | Nirzhuk Blog',
  },
  description: 'This is my portfolio.',
  openGraph: {
    title: 'My Portfolio',
    description: 'This is my portfolio.',
    url: baseUrl,
    siteName: 'My Portfolio',
    locale: 'en_US',
    type: 'website',
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
}

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
})

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-white bg-gray-950 h-full',
        GeistSans.variable,
        GeistMono.variable,
        spaceMono.variable
      )}
    >
    				<PlausibleProvider domain="nirzhuk.dev" customDomain="https://plausible.nirzhuk.dev" />

      <body className="antialiased max-w-xl mx-4  lg:mx-auto min-h-screen flex flex-col">
        <main className="flex-1 min-w-0 flex flex-col px-2 md:px-0">
          <Navbar />
          <section className="flex-1 flex flex-col space-y-4">
            {children}
          </section>
          <Footer />
        </main>
      </body>
    </html>
  )
}
