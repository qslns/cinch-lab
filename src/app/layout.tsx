import type { Metadata } from 'next'
import LuxuryNav from '@/components/layout/LuxuryNav'
import Footer from '@/components/layout/Footer'
import '@/styles/globals.css'
import '@/styles/variables.css'

export const metadata: Metadata = {
  title: 'CINCH LAB | Luxury Fashion House',
  description: 'Discover the latest collections from CINCH LAB. Avant-garde designs merging minimalism with architectural forms.',
  keywords: 'luxury fashion, designer clothing, haute couture, ready-to-wear, CINCH LAB',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LuxuryNav />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}