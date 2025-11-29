import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond, Space_Mono } from 'next/font/google'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
import YonNav from '@/components/YonNav'
import BackToTop from '@/components/BackToTop'
import ScrollProgress from '@/components/ScrollProgress'
import LenisProvider from '@/hooks/useLenis'
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
  title: 'THE YON — Beyond Fashion',
  description: 'Twisted yet harmonious. Experimental fashion portfolio by Taehyun Lee. Every element is slightly askew, yet together they form perfect beauty.',
  keywords: 'THE YON, experimental fashion, avant-garde, fashion portfolio, Taehyun Lee, CSM, Parsons, Antwerp, deconstructed fashion, pattern magic',
  authors: [{ name: 'THE YON' }],
  creator: 'Taehyun Lee',
  publisher: 'THE YON',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://theyon.vercel.app'),
  openGraph: {
    title: 'THE YON — Beyond Fashion',
    description: 'Twisted yet harmonious. Experimental fashion that transcends time and space.',
    url: 'https://theyon.vercel.app',
    siteName: 'THE YON',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'THE YON - Beyond Fashion',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE YON — Beyond Fashion',
    description: 'Twisted yet harmonious. Fashion beyond the horizon.',
    images: ['/og-image.png'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="THE YON" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0A0A0A" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
      </head>
      <body className={`${inter.variable} ${cormorant.variable} ${spaceMono.variable} font-sans antialiased bg-yon-white text-yon-black`}>
        <LenisProvider>
          <ScrollProgress />
          <SkipToMain />
          <KeyboardNavigationIndicator />
          <YonNav />
          <main id="main-content" className="pt-20">
            {children}
          </main>
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  )
}