import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore experimental fashion collections by THE YON. Deconstructed tailoring, hybrid materials, and architectural silhouettes.',
  openGraph: {
    title: 'Collections | THE YON',
    description: 'Explore experimental fashion collections by THE YON. Deconstructed tailoring, hybrid materials, and architectural silhouettes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collections | THE YON',
    description: 'Experimental fashion collections by THE YON.',
  },
}

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
