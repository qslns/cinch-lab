import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@/styles/variables.css'

export const metadata: Metadata = {
  title: 'CINCH LAB',
  description: 'Experimental Fashion House',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}