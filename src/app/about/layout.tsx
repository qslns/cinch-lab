import { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'About',
  description: 'Taehyun Lee. Tokyo.',
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
