'use client'

import dynamic from 'next/dynamic'

// Dynamic imports for client-only components (performance optimization)
const HeroSection = dynamic(() => import('./HeroSection'), {
  ssr: false,
  loading: () => <HeroSkeleton />,
})

const AnimatedSections = dynamic(() => import('./AnimatedSections'), {
  ssr: false,
})

interface Collection {
  id: number
  title: string
  season: string
  year: string
  slug: string
  description: string
  techniques: string[]
  status: string
}

interface ArchiveItem {
  id: string
  title: string
  category: string
}

// Hero skeleton for loading state
function HeroSkeleton() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center pb-16 md:pb-20 px-6 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yon-grey/30" />
              <span className="h-3 w-48 bg-yon-grey/20 rounded" />
            </div>
            <div className="space-y-4">
              <div className="h-24 md:h-32 lg:h-40 w-48 bg-yon-grey/10 rounded" />
              <div className="h-24 md:h-32 lg:h-40 w-56 bg-yon-grey/10 rounded ml-[5%]" />
            </div>
          </div>
          <div className="lg:col-span-5 lg:pb-8 space-y-4">
            <div className="h-6 w-full bg-yon-grey/10 rounded" />
            <div className="h-6 w-3/4 bg-yon-grey/10 rounded" />
            <div className="h-4 w-1/2 bg-yon-grey/10 rounded mt-4" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HomeClient({
  collections,
  archivePreview,
}: {
  collections: Collection[]
  archivePreview: ArchiveItem[]
}) {
  return (
    <>
      {/* Hero - Client Component with animations */}
      <HeroSection />

      {/* Collections & Archive - Client Components with animations */}
      <AnimatedSections collections={collections} archivePreview={archivePreview} />
    </>
  )
}
