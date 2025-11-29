'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'

// Placeholder collection data
const collectionsData: Record<string, {
  title: string
  season: string
  year: number
  description: string
  concept: string
  images: { id: number; caption?: string }[]
  techniques: string[]
  materials: string[]
}> = {
  'deconstruction': {
    title: 'DECONSTRUCTION',
    season: 'FW',
    year: 2025,
    description: 'Exploring pattern deconstruction through experimental tailoring techniques. Every seam exposed, every structure questioned.',
    concept: 'This collection questions the fundamental assumptions of garment construction. By exposing the hidden architecture of clothing, we reveal the beauty in structure itself. Seams become decorative elements, interfacing becomes visible texture, and the process of making becomes the final design.',
    images: [
      { id: 1, caption: 'Look 01' },
      { id: 2, caption: 'Detail' },
      { id: 3, caption: 'Look 02' },
      { id: 4, caption: 'Process' },
      { id: 5, caption: 'Look 03' },
      { id: 6, caption: 'Material study' },
    ],
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing', 'Deconstructed tailoring'],
    materials: ['Japanese denim', 'Wool suiting', 'Cotton canvas', 'Horsehair interfacing'],
  },
  'fragments': {
    title: 'FRAGMENTS',
    season: 'SS',
    year: 2025,
    description: 'Hybrid material construction with contrasting textures. Beauty in the broken pieces.',
    concept: 'Fragments explores the poetry of incompleteness. Each piece is constructed from seemingly disparate elements that find unexpected harmony. The collection celebrates the beauty of juxtaposition - rough against smooth, structured against fluid, opacity against transparency.',
    images: [
      { id: 1, caption: 'Look 01' },
      { id: 2, caption: 'Texture detail' },
      { id: 3, caption: 'Look 02' },
      { id: 4, caption: 'Material splice' },
    ],
    techniques: ['Material splicing', 'Surface manipulation', 'Hybrid construction'],
    materials: ['Nylon', 'Silk organza', 'Leather', 'Technical mesh'],
  },
  'void': {
    title: 'VOID',
    season: 'FW',
    year: 2024,
    description: 'Architectural volume exploration. The space between defines the form.',
    concept: 'VOID investigates negative space as a design element. The collection is built around the idea that what is absent is as important as what is present. Sculptural volumes are created not by adding, but by careful subtraction and the strategic placement of emptiness.',
    images: [
      { id: 1, caption: 'Look 01' },
      { id: 2, caption: 'Volume study' },
      { id: 3, caption: 'Look 02' },
    ],
    techniques: ['Draping', 'Pattern cutting', 'Sculptural construction'],
    materials: ['Cotton canvas', 'Horsehair', 'Organza'],
  },
  'origin': {
    title: 'ORIGIN',
    season: 'SS',
    year: 2024,
    description: 'Return to fundamental shapes. Where every collection begins.',
    concept: 'ORIGIN strips away complexity to find the essential. This collection returns to the basic geometric forms that underlie all garment construction - the circle, the rectangle, the line. From these simple elements, we build towards complexity.',
    images: [
      { id: 1, caption: 'Look 01' },
      { id: 2, caption: 'Form study' },
    ],
    techniques: ['Basic construction', 'Form studies', 'Minimal pattern making'],
    materials: ['Muslin', 'Cotton', 'Linen'],
  },
}

export default function CollectionDetailPage() {
  const params = useParams()
  const slug = params.id as string
  const collection = collectionsData[slug]

  // Image reveal on scroll
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set())

  if (!collection) {
    return (
      <div className="min-h-screen bg-yon-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-6xl text-yon-black mb-4">404</h1>
          <p className="text-body text-yon-grey mb-8">Collection not found</p>
          <Link
            href="/collections"
            className="font-mono text-sm text-yon-black hover:text-yon-accent transition-colors border-b border-current pb-1"
          >
            ← Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-yon-white">
      {/* Hero Section - Fullscreen */}
      <section className="relative h-screen flex items-end">
        {/* Background placeholder */}
        <div className="absolute inset-0 bg-yon-charcoal">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-sm text-yon-grey">HERO IMAGE</span>
          </div>
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 p-8 md:p-16 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="max-w-7xl mx-auto">
            <span className="font-mono text-micro text-yon-silver tracking-widest uppercase">
              {collection.season} {collection.year}
            </span>
            <h1 className="mt-4 font-serif text-display md:text-hero text-yon-white transform rotate-[-0.5deg]">
              {collection.title}
            </h1>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-[1px] h-16 bg-yon-white/50"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* Description Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.p
            className="text-subheading md:text-heading text-yon-black leading-relaxed transform rotate-[-0.3deg]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {collection.description}
          </motion.p>
        </div>
      </section>

      {/* Image Gallery - Scroll-based reveal */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {collection.images.map((image, index) => {
            // Alternate layout positions
            const isEven = index % 2 === 0
            const rotations = ['-1deg', '1.5deg', '-0.5deg', '2deg', '-1.5deg', '0.5deg']
            const widths = ['w-full md:w-3/4', 'w-full md:w-2/3', 'w-full md:w-4/5', 'w-full md:w-1/2']

            return (
              <motion.div
                key={image.id}
                className={`mb-16 md:mb-32 ${isEven ? 'md:ml-0 md:mr-auto' : 'md:ml-auto md:mr-0'} ${widths[index % widths.length]}`}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="relative aspect-[3/4] bg-yon-platinum overflow-hidden"
                  style={{ transform: `rotate(${rotations[index % rotations.length]})` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-sm text-yon-grey">
                      IMAGE {String(image.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                {image.caption && (
                  <p className="mt-4 font-mono text-micro text-yon-grey">
                    {image.caption}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Concept Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-yon-ivory">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
              Concept
            </span>
            <p className="mt-6 text-body-lg text-yon-steel leading-relaxed">
              {collection.concept}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Techniques */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
                Techniques
              </span>
              <ul className="mt-6 space-y-3">
                {collection.techniques.map((technique, index) => (
                  <li key={index} className="text-body text-yon-black flex items-start gap-3">
                    <span className="font-mono text-micro text-yon-grey mt-1.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {technique}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Materials */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
                Materials
              </span>
              <ul className="mt-6 space-y-3">
                {collection.materials.map((material, index) => (
                  <li key={index} className="text-body text-yon-black flex items-start gap-3">
                    <span className="font-mono text-micro text-yon-grey mt-1.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {material}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 md:px-12 border-t border-yon-platinum">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link
            href="/collections"
            className="font-mono text-sm text-yon-grey hover:text-yon-black transition-colors"
          >
            ← All Collections
          </Link>
          <Link
            href="/process"
            className="font-mono text-sm text-yon-black hover:text-yon-accent transition-colors"
          >
            View Process →
          </Link>
        </div>
      </section>
    </div>
  )
}
