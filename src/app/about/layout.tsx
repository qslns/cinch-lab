import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Taehyun Lee - Fashion designer based in Tokyo. Exploring the boundary between precision and disorder through experimental tailoring. THE YON, beyond fashion.',
  openGraph: {
    title: 'About | THE YON',
    description: 'Taehyun Lee - Fashion designer based in Tokyo. Exploring the boundary between precision and disorder through experimental tailoring.',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | THE YON',
    description: 'Taehyun Lee - Fashion designer based in Tokyo.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
