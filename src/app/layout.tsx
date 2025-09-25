import type { Metadata } from 'next'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
import BrutalistNavigation from '@/components/BrutalistNavigation'
import LenisProvider from '@/hooks/useLenis'
import { CipherProvider } from '@/contexts/CipherContext'
import CipherToggle from '@/components/CipherToggle'
import '@/styles/globals.css'
import '@/styles/variables.css'
import '@/styles/modern.css'
import '@/styles/brutalism.css'

export const metadata: Metadata = {
  title: 'CINCH LAB — Experimental Fashion Technical Laboratory',
  description: 'Where asymmetrical chaos meets scientific precision. Experimental fashion research facility exploring the boundaries between order and entropy.',
  keywords: 'experimental fashion, brutalist design, fashion laboratory, cinch lab, avant-garde clothing, fashion research, technical design',
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
      <body>
        <CipherProvider>
          <LenisProvider>
            <SkipToMain />
            <KeyboardNavigationIndicator />
            <BrutalistNavigation />
            <CipherToggle />
            <main id="main-content" className="pt-20">
              {children}
            </main>
          </LenisProvider>
        </CipherProvider>
      </body>
    </html>
  )
}