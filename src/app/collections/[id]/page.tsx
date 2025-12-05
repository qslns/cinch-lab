'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Footer from '@/components/Footer'
import { useLightbox } from '@/components/ImageLightbox'

// Custom easing for smooth animations
const yonEase = [0.22, 1, 0.36, 1] as const

// Collection data with enhanced image layouts
const collectionsData: Record<string, {
  title: string
  index: string
  description: string
  concept: string
  images: {
    id: number
    caption?: string
    layout: 'full' | 'left' | 'right' | 'center' | 'overlap-left' | 'overlap-right'
    size: 'large' | 'medium' | 'small'
    variant: 'light' | 'medium' | 'dark'
  }[]
  techniques: string[]
  materials: string[]
  prevSlug?: string
  nextSlug?: string
}> = {
  'deconstruction': {
    title: 'DECONSTRUCTION',
    index: '01',
    description: 'Exploring pattern deconstruction through experimental tailoring techniques. Every seam exposed, every structure questioned.',
    concept: 'This collection questions the fundamental assumptions of garment construction. By exposing the hidden architecture of clothing, we reveal the beauty in structure itself. Seams become decorative elements, interfacing becomes visible texture, and the process of making becomes the final design.',
    images: [
      { id: 1, caption: 'Look 01', layout: 'left', size: 'large', variant: 'light' },
      { id: 2, caption: 'Detail', layout: 'overlap-right', size: 'small', variant: 'dark' },
      { id: 3, caption: 'Look 02', layout: 'full', size: 'large', variant: 'medium' },
      { id: 4, caption: 'Process', layout: 'right', size: 'medium', variant: 'light' },
      { id: 5, caption: 'Look 03', layout: 'center', size: 'large', variant: 'dark' },
      { id: 6, caption: 'Material study', layout: 'left', size: 'small', variant: 'light' },
    ],
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing', 'Deconstructed tailoring'],
    materials: ['Japanese denim', 'Wool suiting', 'Cotton canvas', 'Horsehair interfacing'],
    nextSlug: 'fragments',
  },
  'fragments': {
    title: 'FRAGMENTS',
    index: '02',
    description: 'Hybrid material construction with contrasting textures. Beauty in the broken pieces.',
    concept: 'Fragments explores the poetry of incompleteness. Each piece is constructed from seemingly disparate elements that find unexpected harmony. The collection celebrates the beauty of juxtaposition - rough against smooth, structured against fluid, opacity against transparency.',
    images: [
      { id: 1, caption: 'Look 01', layout: 'right', size: 'large', variant: 'medium' },
      { id: 2, caption: 'Texture detail', layout: 'overlap-left', size: 'small', variant: 'light' },
      { id: 3, caption: 'Look 02', layout: 'full', size: 'large', variant: 'dark' },
      { id: 4, caption: 'Material splice', layout: 'center', size: 'medium', variant: 'light' },
    ],
    techniques: ['Material splicing', 'Surface manipulation', 'Hybrid construction'],
    materials: ['Nylon', 'Silk organza', 'Leather', 'Technical mesh'],
    prevSlug: 'deconstruction',
    nextSlug: 'void',
  },
  'void': {
    title: 'VOID',
    index: '03',
    description: 'Architectural volume exploration. The space between defines the form.',
    concept: 'VOID investigates negative space as a design element. The collection is built around the idea that what is absent is as important as what is present. Sculptural volumes are created not by adding, but by careful subtraction and the strategic placement of emptiness.',
    images: [
      { id: 1, caption: 'Look 01', layout: 'full', size: 'large', variant: 'dark' },
      { id: 2, caption: 'Volume study', layout: 'left', size: 'medium', variant: 'light' },
      { id: 3, caption: 'Look 02', layout: 'overlap-right', size: 'large', variant: 'medium' },
    ],
    techniques: ['Draping', 'Pattern cutting', 'Sculptural construction'],
    materials: ['Cotton canvas', 'Horsehair', 'Organza'],
    prevSlug: 'fragments',
    nextSlug: 'origin',
  },
  'origin': {
    title: 'ORIGIN',
    index: '04',
    description: 'Return to fundamental shapes. Where every collection begins.',
    concept: 'ORIGIN strips away complexity to find the essential. This collection returns to the basic geometric forms that underlie all garment construction - the circle, the rectangle, the line. From these simple elements, we build towards complexity.',
    images: [
      { id: 1, caption: 'Look 01', layout: 'center', size: 'large', variant: 'light' },
      { id: 2, caption: 'Form study', layout: 'right', size: 'medium', variant: 'dark' },
    ],
    techniques: ['Basic construction', 'Form studies', 'Minimal pattern making'],
    materials: ['Muslin', 'Cotton', 'Linen'],
    prevSlug: 'void',
  },
}

// Layout configurations
const layoutStyles = {
  full: 'w-full',
  left: 'w-full md:w-[70%] md:mr-auto',
  right: 'w-full md:w-[70%] md:ml-auto',
  center: 'w-full md:w-[60%] md:mx-auto',
  'overlap-left': 'w-full md:w-[45%] md:mr-auto md:-mt-32 md:ml-[5%]',
  'overlap-right': 'w-full md:w-[45%] md:ml-auto md:-mt-32 md:mr-[5%]',
}

const sizeStyles = {
  large: 'aspect-[3/4]',
  medium: 'aspect-[4/5]',
  small: 'aspect-[1/1]',
}

const variantStyles = {
  light: 'bg-yon-platinum',
  medium: 'bg-yon-silver',
  dark: 'bg-yon-charcoal',
}

const variantTextStyles = {
  light: 'text-yon-grey',
  medium: 'text-yon-graphite',
  dark: 'text-yon-silver',
}

// Animation variants
const entryAnimations = [
  { initial: { opacity: 0, y: 80 }, type: 'slideUp' },
  { initial: { opacity: 0, x: -60 }, type: 'slideRight' },
  { initial: { opacity: 0, x: 60 }, type: 'slideLeft' },
  { initial: { opacity: 0, scale: 0.95 }, type: 'scaleIn' },
  { initial: { opacity: 0, rotate: -3 }, type: 'rotateIn' },
]

export default function CollectionDetailPage() {
  const params = useParams()
  const slug = params.id as string
  const collection = collectionsData[slug]
  const { openLightbox } = useLightbox()

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Prepare images for lightbox
  const lightboxImages = collection?.images.map((image, index) => ({
    src: `/images/collections/${slug}/${String(image.id).padStart(2, '0')}.jpg`,
    alt: `${collection.title} - ${image.caption || `Image ${image.id}`}`,
    caption: image.caption,
    captionKo: `${collection.title} NO.${collection.index}`,
    width: 1200,
    height: image.size === 'large' ? 1600 : image.size === 'medium' ? 1500 : 1200,
  })) || []

  const handleImageClick = (index: number) => {
    openLightbox(lightboxImages, index)
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-yon-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-6xl md:text-7xl text-yon-platinum leading-none">404</h1>
          <p className="mt-4 text-lg text-yon-grey">Collection not found</p>
          <Link
            href="/collections"
            className="inline-block mt-8 font-mono text-sm text-yon-black border-b border-yon-black pb-1 hover:text-yon-accent hover:border-yon-accent transition-colors"
          >
            ← Back to Collections
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yon-white">
      {/* ============================================
          HERO SECTION - Fullscreen with Extreme Typography
          ============================================ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background image placeholder */}
        <motion.div
          className="absolute inset-0 bg-yon-charcoal"
          style={{ scale: heroScale }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-sm text-yon-grey/30 tracking-widest">HERO IMAGE</span>
          </div>
        </motion.div>

        {/* Gradient overlays - enhanced */}
        <div className="absolute inset-0 bg-gradient-to-t from-yon-black/70 via-yon-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-yon-black/30 to-transparent" />

        {/* Subtle background letter */}
        <motion.span
          className="absolute top-[10%] right-[-5%] font-serif text-[20rem] md:text-[28rem] text-yon-white/[0.02] leading-none select-none pointer-events-none"
          style={{ y: titleY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: yonEase }}
        >
          {collection.title.charAt(0)}
        </motion.span>

        {/* Decorative vertical line */}
        <motion.div
          className="absolute top-[15%] left-[8%] w-px h-[30vh] bg-gradient-to-b from-transparent via-yon-accent/40 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: yonEase }}
        />

        {/* Collection index tag */}
        <motion.span
          className="absolute top-[25%] left-[4%] font-mono text-[10px] text-yon-silver/40 tracking-[0.3em] -rotate-90 origin-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          COLLECTION.{collection.index}
        </motion.span>

        {/* Hero content - Extreme Typography */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-20"
          style={{ y: titleY, opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto">
            {/* Collection number tag with accent */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: yonEase }}
            >
              <span className="w-10 h-px bg-yon-accent" />
              <span className="font-mono text-[11px] text-yon-accent tracking-[0.3em] uppercase">
                NO. {collection.index}
              </span>
            </motion.div>

            {/* Main Title - Restrained, elegant */}
            <motion.h1
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="block font-serif text-3xl md:text-4xl lg:text-5xl text-yon-white leading-tight tracking-[-0.02em]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.5, ease: yonEase }}
              >
                {collection.title}
              </motion.span>
            </motion.h1>

          </div>
        </motion.div>

      </section>


      {/* ============================================
          IMAGE GALLERY - Varied Layouts
          ============================================ */}
      <section className="pb-32 md:pb-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {collection.images.map((image, index) => {
            const animation = entryAnimations[index % entryAnimations.length]
            const rotations = [-1.5, 2, -0.8, 1.5, -2, 1]
            const rotation = rotations[index % rotations.length]

            return (
              <motion.div
                key={image.id}
                className={`mb-16 md:mb-24 ${layoutStyles[image.layout]}`}
                initial={animation.initial}
                whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
              >
                <button
                  onClick={() => handleImageClick(index)}
                  className={`relative ${sizeStyles[image.size]} ${variantStyles[image.variant]} overflow-hidden transition-shadow duration-500 hover:shadow-2xl cursor-zoom-in group w-full`}
                  style={{ transform: `rotate(${rotation}deg)` }}
                  data-cursor="image"
                  aria-label={`View ${image.caption || `Image ${image.id}`}`}
                >
                  {/* Placeholder content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-mono text-xs tracking-widest ${variantTextStyles[image.variant]}`}>
                      IMAGE {String(image.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Index number */}
                  <div className="absolute top-6 left-6">
                    <span className={`font-mono text-[10px] tracking-wider ${variantTextStyles[image.variant]}`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Hover overlay with zoom icon */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(10, 10, 10, 0.3)' }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="#FAFAFA"
                      strokeWidth="1.5"
                    >
                      <circle cx="14" cy="14" r="8" />
                      <line x1="20" y1="20" x2="26" y2="26" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <line x1="11" y1="14" x2="17" y2="14" />
                    </svg>
                  </div>
                </button>

                {/* Caption */}
                {image.caption && (
                  <p className="mt-4 font-mono text-xs text-yon-grey tracking-wider">
                    {image.caption}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>


      {/* ============================================
          NAVIGATION
          ============================================ */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-t border-yon-platinum">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center">
            {/* Previous */}
            <div>
              {collection.prevSlug ? (
                <Link
                  href={`/collections/${collection.prevSlug}`}
                  className="group flex items-center gap-4 outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                >
                  <span className="font-mono text-xs text-yon-grey group-hover:text-yon-black group-focus-visible:text-yon-black transition-colors">←</span>
                  <div>
                    <span className="block font-mono text-[10px] text-yon-grey tracking-wider uppercase">Previous</span>
                    <span className="block font-serif text-lg text-yon-black group-hover:text-yon-accent group-focus-visible:text-yon-accent transition-colors">
                      {collectionsData[collection.prevSlug]?.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/collections"
                  className="font-mono text-sm text-yon-grey hover:text-yon-black focus-visible:text-yon-black transition-colors outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                >
                  ← All Collections
                </Link>
              )}
            </div>

            {/* Next */}
            <div>
              {collection.nextSlug ? (
                <Link
                  href={`/collections/${collection.nextSlug}`}
                  className="group flex items-center gap-4 text-right outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                >
                  <div>
                    <span className="block font-mono text-[10px] text-yon-grey tracking-wider uppercase">Next</span>
                    <span className="block font-serif text-lg text-yon-black group-hover:text-yon-accent group-focus-visible:text-yon-accent transition-colors">
                      {collectionsData[collection.nextSlug]?.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-yon-grey group-hover:text-yon-black group-focus-visible:text-yon-black transition-colors">→</span>
                </Link>
              ) : (
                <Link
                  href="/archive"
                  className="font-mono text-sm text-yon-black hover:text-yon-accent focus-visible:text-yon-accent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                >
                  View Archive →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
