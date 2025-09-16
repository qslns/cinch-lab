import type { Metadata } from 'next'
import { SkipToMain, KeyboardNavigationIndicator } from '@/components/Accessibility'
import Navigation from '@/components/Navigation'
import '@/styles/globals.css'
import '@/styles/variables.css'
import '@/styles/modern.css'

export const metadata: Metadata = {
  title: 'CINCH LAB — Experimental Fashion Technical Laboratory',
  description: 'Fashion extreme technical laboratory. Engineering experiences beyond traditional paradigms.',
  keywords: 'experimental fashion, technical design, fashion laboratory, avant-garde, CINCH LAB',
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
        <Navigation />
        <main id="main-content" className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}