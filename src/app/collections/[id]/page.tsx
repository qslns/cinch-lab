'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Footer from '@/components/Footer'

// Collection data with enhanced image layouts
const collectionsData: Record<string, {
  title: string
  season: string
  year: number
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
    season: 'FW',
    year: 2025,
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
    season: 'SS',
    year: 2025,
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
    season: 'FW',
    year: 2024,
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
    season: 'SS',
    year: 2024,
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

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100])

  if (!collection) {
    return (
      <div className="min-h-screen bg-yon-white flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-[20vw] md:text-[15vw] text-yon-platinum leading-none">404</h1>
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
          HERO SECTION - Fullscreen with Parallax
          ============================================ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background image placeholder */}
        <motion.div
          className="absolute inset-0 bg-yon-charcoal"
          style={{ scale: heroScale }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-sm text-yon-grey tracking-widest">HERO IMAGE</span>
          </div>
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-yon-black/60 via-transparent to-transparent" />

        {/* Hero content */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-8 md:p-16"
          style={{ y: titleY, opacity: heroOpacity }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.span
              className="font-mono text-xs text-yon-silver tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {collection.season} {collection.year}
            </motion.span>
            <motion.h1
              className="mt-4 font-serif text-[15vw] md:text-[10vw] lg:text-[8vw] text-yon-white leading-[0.9]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block transform rotate-[-0.5deg]">{collection.title.split(' ')[0] || collection.title}</span>
              {collection.title.split(' ')[1] && (
                <span className="block transform rotate-[0.3deg] ml-[5%]">{collection.title.split(' ').slice(1).join(' ')}</span>
              )}
            </motion.h1>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: heroOpacity }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] text-yon-silver/70 tracking-widest uppercase">
              Scroll
            </span>
            <motion.div
              className="w-px h-12 bg-yon-silver/50 origin-top"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================
          INTRO TEXT
          ============================================ */}
      <section className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.p
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-yon-black leading-relaxed"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="transform inline-block rotate-[-0.3deg]">
              {collection.description}
            </span>
          </motion.p>
        </div>
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
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={`relative ${sizeStyles[image.size]} ${variantStyles[image.variant]} overflow-hidden transition-shadow duration-500 hover:shadow-2xl`}
                  style={{ transform: `rotate(${rotation}deg)` }}
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
                </div>

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
          CONCEPT SECTION
          ============================================ */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-yon-ivory">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            {/* Decorative element */}
            <span className="absolute -top-12 -left-4 md:-left-12 font-mono text-[100px] md:text-[160px] text-yon-platinum/30 leading-none select-none pointer-events-none">
              &ldquo;
            </span>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Concept
              </span>
              <p className="mt-8 text-lg md:text-xl text-yon-steel leading-relaxed">
                {collection.concept}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          DETAILS SECTION
          ============================================ */}
      <section className="py-32 md:py-48 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Techniques */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Techniques
              </span>
              <ul className="mt-8 space-y-4">
                {collection.techniques.map((technique, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="font-mono text-xs text-yon-grey mt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base text-yon-black">{technique}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Materials */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Materials
              </span>
              <ul className="mt-8 space-y-4">
                {collection.materials.map((material, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <span className="font-mono text-xs text-yon-grey mt-1">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base text-yon-black">{material}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
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
