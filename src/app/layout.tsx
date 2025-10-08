import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
import DeconstructivistNav from '@/components/DeconstructivistNav'
import PWAInstaller, { PWAUpdateNotification } from '@/components/PWAInstaller'
import BackToTop from '@/components/BackToTop'
import ScrollProgress from '@/components/ScrollProgress'
import LenisProvider from '@/hooks/useLenis'
// Temporarily disabled: CipherProvider causes runtime error
// import { CipherProvider } from '@/contexts/CipherContext'
// import CipherToggle from '@/components/CipherToggle'
import '@/styles/globals.css'
import '@/styles/design-system-foundation.css'
import '@/styles/asymmetric-grids.css'
import '@/styles/kinetic-typography.css'

// Typography System - Margiela × Sacai inspired
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CINCH LAB — Experimental Fashion Laboratory',
  description: 'NO SALES. ONLY CREATION. Experimental fashion laboratory dedicated to pure research without commerce. CINCH•RELEASE•REPEAT.',
  keywords: 'experimental fashion, no commerce, fashion laboratory, cinch lab, avant-garde, pure creation, fashion experiment, research',
  authors: [{ name: 'CINCH LAB' }],
  creator: 'CINCH LAB',
  publisher: 'CINCH LAB',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cinchlab.vercel.app'),
  openGraph: {
    title: 'CINCH LAB — Experimental Fashion Laboratory',
    description: 'Where asymmetrical chaos meets scientific precision. Experimental fashion research facility.',
    url: 'https://cinchlab.vercel.app',
    siteName: 'CINCH LAB',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CINCH LAB - Experimental Fashion Laboratory',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CINCH LAB — Experimental Fashion Laboratory',
    description: 'Where asymmetrical chaos meets scientific precision.',
    images: ['/og-image.png'],
    creator: '@cinchlab',
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
        <meta name="apple-mobile-web-app-title" content="CINCH LAB" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <LenisProvider>
          <ScrollProgress />
          <SkipToMain />
          <KeyboardNavigationIndicator />
          <DeconstructivistNav />
          <main id="main-content" className="pt-20">
            {children}
          </main>
          <PWAInstaller />
          <PWAUpdateNotification />
          <BackToTop />
        </LenisProvider>
      </body>
    </html>
  )
}