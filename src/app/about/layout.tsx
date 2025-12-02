import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Taehyun Lee. Tokyo.',
  openGraph: {
    title: 'About | THE YON',
    description: 'Taehyun Lee. Tokyo.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | THE YON',
    description: 'Taehyun Lee. Tokyo.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
