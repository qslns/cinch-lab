import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter, Cormorant_Garamond, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
import { GoogleAnalytics } from '@/components/Analytics'
import YonNav from '@/components/YonNav'
import ClientProviders from '@/components/ClientProviders'
import '@/styles/globals.css'

// Typography System - THE YON (Optimized)
// Only load weights actually used in the design
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'], // Removed 600 - not used
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400'], // Removed 700 - rarely used
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://theyon.vercel.app'),
  title: {
    default: 'THE YON',
    template: '%s | THE YON',
  },
  description: 'Twisted yet harmonious.',
  keywords: ['THE YON', 'Taehyun Lee', 'fashion'],
  authors: [{ name: 'Taehyun Lee' }],
  creator: 'Taehyun Lee',
  publisher: 'THE YON',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: 'https://theyon.vercel.app',
    siteName: 'THE YON',
    title: 'THE YON',
    description: 'Twisted yet harmonious.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE YON',
    description: 'Twisted yet harmonious.',
    creator: '@theyon_studio',
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
  category: 'fashion',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

// JSON-LD structured data - Enhanced for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://theyon.vercel.app/#website',
      url: 'https://theyon.vercel.app',
      name: 'THE YON',
      description: 'Experimental fashion portfolio by Taehyun Lee',
      publisher: { '@id': 'https://theyon.vercel.app/#person' },
      inLanguage: ['en', 'ko'],
    },
    {
      '@type': 'Person',
      '@id': 'https://theyon.vercel.app/#person',
      name: 'Taehyun Lee',
      alternateName: '이태현',
      url: 'https://theyon.vercel.app',
      image: 'https://theyon.vercel.app/images/profile.jpg',
      jobTitle: 'Fashion Designer',
      worksFor: {
        '@type': 'Organization',
        name: 'THE YON',
      },
      sameAs: [
        'https://instagram.com/theyon_studio',
      ],
      knowsAbout: ['Fashion Design', 'Pattern Making', 'Experimental Fashion'],
    },
    {
      '@type': 'CollectionPage',
      '@id': 'https://theyon.vercel.app/#collections',
      url: 'https://theyon.vercel.app/collections',
      name: 'Collections',
      description: 'Experimental fashion collections by THE YON',
      isPartOf: { '@id': 'https://theyon.vercel.app/#website' },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="THE YON" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0A0A0A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 0) }}
        />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${spaceMono.variable} font-sans antialiased bg-yon-white text-yon-black safe-area-top safe-area-bottom`}>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <ClientProviders>
          <SkipToMain />
          <KeyboardNavigationIndicator />
          <YonNav />
          <main id="main-content">
            {children}
          </main>
        </ClientProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
