import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with THE YON. For collaborations, exhibitions, press inquiries, and more.',
  openGraph: {
    title: 'Contact | THE YON',
    description: 'Get in touch with THE YON. For collaborations, exhibitions, press inquiries, and more.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
