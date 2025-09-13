import type { Metadata } from 'next'
import CinchNav from '@/components/layout/CinchNav'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import '@/styles/globals.css'
import '@/styles/variables.css'
import '@/styles/cinch-lab.css'

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
        <SmoothScrollProvider>
          <CinchNav />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}