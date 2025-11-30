import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Taehyun Lee, the designer behind THE YON. Exploring the philosophy of "twisted yet harmonious" through experimental fashion design.',
  openGraph: {
    title: 'About | THE YON',
    description: 'Meet Taehyun Lee, the designer behind THE YON. Exploring the philosophy of "twisted yet harmonious" through experimental fashion design.',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
