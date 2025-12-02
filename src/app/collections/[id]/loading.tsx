export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-yon-white">
      {/* Hero Skeleton */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-yon-charcoal animate-pulse" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-yon-black/70 via-yon-black/20 to-transparent" />

        {/* Content skeleton */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-20">
          <div className="max-w-7xl mx-auto">
            {/* Season tag skeleton */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-px bg-yon-silver/30" />
              <div className="h-3 w-24 bg-yon-silver/20 rounded animate-pulse" />
            </div>

            {/* Title skeleton */}
            <div className="h-12 md:h-14 lg:h-16 w-64 md:w-80 bg-yon-silver/20 rounded animate-pulse" />
          </div>
        </div>
      </section>

      {/* Gallery Skeleton */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-16 md:space-y-24">
          {/* Large image skeleton - left aligned */}
          <div className="w-full md:w-[70%] md:mr-auto">
            <div className="aspect-[3/4] bg-yon-platinum animate-pulse rounded" />
            <div className="mt-4 h-3 w-16 bg-yon-platinum animate-pulse rounded" />
          </div>

          {/* Small image skeleton - right overlap */}
          <div className="w-full md:w-[45%] md:ml-auto md:-mt-32 md:mr-[5%]">
            <div className="aspect-square bg-yon-silver animate-pulse rounded" />
          </div>

          {/* Full width skeleton */}
          <div className="w-full">
            <div className="aspect-[3/4] bg-yon-platinum animate-pulse rounded" />
            <div className="mt-4 h-3 w-20 bg-yon-platinum animate-pulse rounded" />
          </div>
        </div>
      </section>

      {/* Navigation Skeleton */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-yon-platinum">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="h-4 w-4 bg-yon-platinum animate-pulse rounded" />
              <div>
                <div className="h-2 w-12 bg-yon-platinum animate-pulse rounded mb-2" />
                <div className="h-5 w-32 bg-yon-platinum animate-pulse rounded" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="h-2 w-12 bg-yon-platinum animate-pulse rounded mb-2 ml-auto" />
                <div className="h-5 w-32 bg-yon-platinum animate-pulse rounded" />
              </div>
              <div className="h-4 w-4 bg-yon-platinum animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
