import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Space_Mono } from 'next/font/google'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
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
    default: 'THE YON | Beyond Fashion',
    template: '%s | THE YON',
  },
  description: 'Twisted yet harmonious. Experimental fashion portfolio by Taehyun Lee. Every element is slightly askew, yet together they form perfect beauty.',
  keywords: ['THE YON', 'experimental fashion', 'avant-garde', 'fashion portfolio', 'Taehyun Lee', 'CSM', 'Parsons', 'Antwerp', 'deconstructed fashion', 'pattern magic', '이태현', '패션 포트폴리오'],
  authors: [{ name: 'Taehyun Lee', url: 'https://theyon.vercel.app' }],
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
    title: 'THE YON | Beyond Fashion',
    description: 'Twisted yet harmonious. Experimental fashion that transcends time and space.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE YON | Beyond Fashion',
    description: 'Twisted yet harmonious. Fashion beyond the horizon.',
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
  verification: {
    google: 'verification-token',
  },
  category: 'fashion',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

// JSON-LD structured data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Person',
    name: 'Taehyun Lee',
    alternateName: '이태현',
    description: 'Experimental fashion designer exploring the philosophy of "twisted yet harmonious"',
    jobTitle: 'Fashion Designer',
    url: 'https://theyon.vercel.app',
    sameAs: [
      'https://instagram.com/theyon_studio',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'THE YON',
      url: 'https://theyon.vercel.app',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'SASADA Fashion School',
    },
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
      <body className={`${inter.variable} ${cormorant.variable} ${spaceMono.variable} font-sans antialiased bg-yon-white text-yon-black`}>
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
