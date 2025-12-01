'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { useLightbox } from '@/components/ImageLightbox'

// Custom easing for smooth animations
const yonEase = [0.22, 1, 0.36, 1] as const

// Process stages data - minimal
const processStages = [
  {
    id: '01',
    title: 'Research',
    items: [
      { type: 'image', label: 'Mood Board', id: 'RES-001' },
      { type: 'image', label: 'Reference', id: 'RES-002' },
      { type: 'image', label: 'Archive', id: 'RES-003' },
    ],
    color: 'yon-platinum',
  },
  {
    id: '02',
    title: 'Concept',
    items: [
      { type: 'sketch', label: 'Concept Map', id: 'CON-001' },
      { type: 'sketch', label: 'Initial Ideas', id: 'CON-002' },
      { type: 'text', label: 'Manifesto', id: 'CON-003' },
    ],
    color: 'yon-silver',
  },
  {
    id: '03',
    title: 'Sketch',
    items: [
      { type: 'sketch', label: 'Quick Studies', id: 'SKE-001' },
      { type: 'sketch', label: 'Silhouettes', id: 'SKE-002' },
      { type: 'sketch', label: 'Detail Drawing', id: 'SKE-003' },
      { type: 'sketch', label: 'Technical', id: 'SKE-004' },
    ],
    color: 'yon-grey',
  },
  {
    id: '04',
    title: 'Material',
    items: [
      { type: 'swatch', label: 'Fabric Tests', id: 'MAT-001' },
      { type: 'swatch', label: 'Color Study', id: 'MAT-002' },
      { type: 'swatch', label: 'Texture Map', id: 'MAT-003' },
    ],
    color: 'yon-steel',
  },
  {
    id: '05',
    title: 'Toile',
    items: [
      { type: 'image', label: 'First Toile', id: 'TOI-001' },
      { type: 'image', label: 'Iteration 2', id: 'TOI-002' },
      { type: 'image', label: 'Iteration 3', id: 'TOI-003' },
      { type: 'image', label: 'Final Toile', id: 'TOI-004' },
    ],
    color: 'yon-charcoal',
  },
  {
    id: '06',
    title: 'Refine',
    items: [
      { type: 'detail', label: 'Seam Study', id: 'REF-001' },
      { type: 'detail', label: 'Proportion', id: 'REF-002' },
      { type: 'detail', label: 'Finishing', id: 'REF-003' },
    ],
    color: 'yon-graphite',
  },
  {
    id: '07',
    title: 'Failure',
    items: [
      { type: 'failure', label: 'Rejected Ideas', id: 'FAI-001' },
      { type: 'failure', label: 'Failed Toiles', id: 'FAI-002' },
      { type: 'failure', label: 'Lessons', id: 'FAI-003' },
    ],
    color: 'yon-accent',
  },
  {
    id: '08',
    title: 'Final',
    items: [
      { type: 'final', label: 'Look 01', id: 'FIN-001' },
      { type: 'final', label: 'Look 02', id: 'FIN-002' },
      { type: 'final', label: 'Detail', id: 'FIN-003' },
    ],
    color: 'yon-black',
  },
]

// Process stage item placeholder component
function ProcessItem({
  item,
  index,
  stageColor,
  onImageClick,
}: {
  item: { type: string; label: string; id: string }
  index: number
  stageColor: string
  onImageClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getAspectRatio = () => {
    switch (item.type) {
      case 'sketch':
        return '3/4'
      case 'swatch':
        return '1/1'
      case 'detail':
        return '4/3'
      case 'failure':
        return '4/5'
      case 'final':
        return '3/4'
      default:
        return '4/5'
    }
  }

  return (
    <motion.button
      className="group relative cursor-zoom-in w-full text-left"
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? 1 : -1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onImageClick}
      data-cursor="image"
      aria-label={`View ${item.label}`}
    >
      <motion.div
        className={`relative bg-${stageColor} overflow-hidden`}
        style={{ aspectRatio: getAspectRatio() }}
        animate={{ scale: isHovered ? 1.03 : 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Placeholder content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-mono text-[9px] tracking-[0.25em] uppercase opacity-40"
            style={{
              color: stageColor === 'yon-charcoal' || stageColor === 'yon-black' || stageColor === 'yon-graphite'
                ? '#B0B0B0'
                : '#4A4A4A',
            }}
            animate={{ opacity: isHovered ? 0.7 : 0.4 }}
          >
            {item.label}
          </motion.span>
        </div>

        {/* Hover overlay with zoom icon */}
        <motion.div
          className="absolute inset-0 bg-yon-accent/20 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            stroke={stageColor === 'yon-charcoal' || stageColor === 'yon-black' || stageColor === 'yon-graphite' ? '#FAFAFA' : '#0A0A0A'}
            strokeWidth="1.5"
          >
            <circle cx="14" cy="14" r="8" />
            <line x1="20" y1="20" x2="26" y2="26" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <line x1="11" y1="14" x2="17" y2="14" />
          </svg>
        </motion.div>

        {/* Border */}
        <div className="absolute inset-0 border border-current opacity-10" />
      </motion.div>

      {/* ID label */}
      <motion.div
        className="mt-3 flex items-center justify-between"
        animate={{ y: isHovered ? -2 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="font-mono text-[9px] text-yon-grey/60 tracking-wider">
          {item.id}
        </span>
        <span className="font-mono text-[8px] text-yon-grey/40 tracking-wider uppercase">
          {item.type}
        </span>
      </motion.div>
    </motion.button>
  )
}

// Process stage section - minimal
function ProcessStage({ stage, index, onImageClick }: { stage: typeof processStages[0]; index: number; onImageClick: (stageIndex: number, itemIndex: number) => void }) {
  return (
    <section
      className={`relative py-16 md:py-24 px-6 md:px-12 lg:px-16 ${
        index % 2 === 0 ? 'bg-yon-white' : 'bg-yon-ivory'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Stage header - minimal */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] text-yon-accent tracking-[0.2em]">
              {stage.id}
            </span>
            <span className="w-6 h-px bg-yon-grey/30" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-yon-black">
            {stage.title}
          </h2>
        </motion.div>

        {/* Process items grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stage.items.map((item, i) => (
            <div
              key={item.id}
              className={i === 0 ? 'md:col-span-2 md:row-span-2' : ''}
            >
              <ProcessItem item={item} index={i} stageColor={stage.color} onImageClick={() => onImageClick(index, i)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const { openLightbox } = useLightbox()

  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Prepare all images for lightbox
  const allProcessImages = processStages.flatMap((stage, stageIndex) =>
    stage.items.map((item, itemIndex) => ({
      src: `/images/process/${stage.id}/${item.id.toLowerCase()}.jpg`,
      alt: `${stage.title} - ${item.label}`,
      caption: `${stage.title}: ${item.label}`,
      captionKo: item.id,
      width: 1200,
      height: item.type === 'swatch' ? 1200 : item.type === 'detail' ? 900 : 1600,
      stageIndex,
      itemIndex,
    }))
  )

  const handleImageClick = (stageIndex: number, itemIndex: number) => {
    // Calculate flat index from stage and item indices
    let flatIndex = 0
    for (let i = 0; i < stageIndex; i++) {
      flatIndex += processStages[i].items.length
    }
    flatIndex += itemIndex
    openLightbox(allProcessImages, flatIndex)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-yon-accent z-50"
        style={{ width: progressWidth }}
      />

      {/* Hero Section - Minimal */}
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: yonEase }}
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[9px] text-yon-grey/50 tracking-[0.3em] uppercase">
                Process
              </span>
              <span className="w-8 h-px bg-yon-grey/20" />
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-3xl text-yon-black">
              Process
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <section className="sticky top-16 md:top-20 z-40 bg-yon-white/95 backdrop-blur-sm border-y border-yon-platinum py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {processStages.map((stage) => (
              <a
                key={stage.id}
                href={`#stage-${stage.id}`}
                className="flex items-center gap-2 px-3 py-1.5 font-mono text-[10px] tracking-wider text-yon-grey hover:text-yon-black transition-colors whitespace-nowrap"
              >
                <span className="text-yon-accent">{stage.id}</span>
                <span className="uppercase">{stage.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Process Stages */}
      {processStages.map((stage, index) => (
        <div key={stage.id} id={`stage-${stage.id}`}>
          <ProcessStage stage={stage} index={index} onImageClick={handleImageClick} />
        </div>
      ))}

      {/* CTA Section - minimal */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 px-6 py-3 border border-yon-black font-mono text-[10px] tracking-[0.12em] uppercase text-yon-black hover:bg-yon-black hover:text-yon-white transition-all duration-300"
            >
              <span>Collections</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
