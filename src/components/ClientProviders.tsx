'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for performance - loaded only on client
const LenisProvider = dynamic(() => import('@/hooks/useLenis'), { ssr: false })
const LightboxProvider = dynamic(() => import('@/components/ImageLightbox'), { ssr: false })
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <LenisProvider>
      <LightboxProvider>
        <CustomCursor />
        <ScrollProgress />
        {children}
        <BackToTop />
      </LightboxProvider>
    </LenisProvider>
  )
}
