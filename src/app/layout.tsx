import type { Metadata } from 'next'
import CinchNav from '@/components/layout/CinchNav'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
import '@/styles/globals.css'
import '@/styles/variables.css'
import '@/styles/cinch-lab.css'
import '@/styles/animations.css'

export const metadata: Metadata = {
  title: 'CINCH LAB | Experimental Fashion Laboratory',
  description: 'Cinch • Release • Repeat. Enter the digital fashion laboratory where chaos meets control.',
  keywords: 'experimental fashion, digital art, avant-garde, fashion laboratory, CINCH LAB',
  authors: [{ name: 'CINCH LAB' }],
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
        <SkipToMain />
        <KeyboardNavigationIndicator />
        <SmoothScrollProvider>
          <CinchNav />
          <main id="main-content">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}