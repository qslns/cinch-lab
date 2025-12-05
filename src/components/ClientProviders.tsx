'use client'

import { memo, Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamic imports with proper loading states
const LenisProvider = dynamic(() => import('@/hooks/useLenis'), {
  ssr: false,
})
const LightboxProvider = dynamic(() => import('@/components/ImageLightbox'), {
  ssr: false,
})

// UI components - can load lazily
const BackToTop = dynamic(() => import('@/components/BackToTop'), {
  ssr: false,
})
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), {
  ssr: false,
})
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
})

const ClientProviders = memo(function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <LenisProvider>
        <LightboxProvider>
          <CustomCursor />
          <ScrollProgress />
          {children}
          <BackToTop />
        </LightboxProvider>
      </LenisProvider>
    </Suspense>
  )
})

export default ClientProviders
