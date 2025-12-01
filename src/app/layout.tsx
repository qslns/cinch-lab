import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter, Cormorant_Garamond, Space_Mono } from 'next/font/google'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
import { GoogleAnalytics } from '@/components/Analytics'
import YonNav from '@/components/YonNav'
import ClientProviders from '@/components/ClientProviders'
import '@/styles/globals.css'

// Typography System - THE YON
// Cormorant Garamond: Elegant serif for titles
// Inter: Clean sans-serif for body
// Space Mono: Monospace for technical details
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-serif',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
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

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Taehyun Lee',
    url: 'https://theyon.vercel.app',
    sameAs: [
      'https://instagram.com/theyon_studio',
    ],
  },
  dateCreated: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="THE YON" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0A0A0A" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
      </body>
    </html>
  )
}
