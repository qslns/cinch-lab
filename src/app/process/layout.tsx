import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Process',
  description: 'The journey from idea to garment. Explore the 8-stage creative process behind THE YON collections - research, concept, experimentation, pattern making, toile, refinement, production, and presentation.',
  openGraph: {
    title: 'Process | THE YON',
    description: 'The journey from idea to garment. Explore the 8-stage creative process behind THE YON collections.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Process | THE YON',
    description: 'The journey from idea to garment.',
  },
}

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
