import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'Research documentation and design process archive. Explore the experiments, iterations, and creative journey behind THE YON collections.',
  openGraph: {
    title: 'Archive | THE YON',
    description: 'Research documentation and design process archive. Explore the experiments, iterations, and creative journey behind THE YON collections.',
  },
}

export default function ArchiveLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
