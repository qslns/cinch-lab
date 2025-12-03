'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot } from '@/components/deconstructivist'

// Process stages data
const processStages = [
  {
    id: '01',
    title: 'RESEARCH',
    titleKo: '리서치',
    description: 'Gathering inspiration from archives, street, culture',
    items: [
      { label: 'Mood Board', id: 'RES-001' },
      { label: 'Reference', id: 'RES-002' },
      { label: 'Archive', id: 'RES-003' },
      { label: 'Street', id: 'RES-004' },
    ],
  },
  {
    id: '02',
    title: 'CONCEPT',
    titleKo: '컨셉',
    description: 'Distilling ideas into core vision',
    items: [
      { label: 'Manifesto', id: 'CON-001' },
      { label: 'Mind Map', id: 'CON-002' },
      { label: 'Keywords', id: 'CON-003' },
    ],
  },
  {
    id: '03',
    title: 'SKETCH',
    titleKo: '스케치',
    description: 'Quick studies, silhouettes, explorations',
    items: [
      { label: 'Quick Study', id: 'SKE-001' },
      { label: 'Silhouette', id: 'SKE-002' },
      { label: 'Detail', id: 'SKE-003' },
      { label: 'Technical', id: 'SKE-004' },
      { label: 'Iteration', id: 'SKE-005' },
    ],
  },
  {
    id: '04',
    title: 'MATERIAL',
    titleKo: '소재',
    description: 'Fabric tests, texture studies, color development',
    items: [
      { label: 'Fabric Test', id: 'MAT-001' },
      { label: 'Color Study', id: 'MAT-002' },
      { label: 'Texture', id: 'MAT-003' },
      { label: 'Drape Test', id: 'MAT-004' },
    ],
  },
  {
    id: '05',
    title: 'TOILE',
    titleKo: '토왈',
    description: '3D development through muslin iterations',
    items: [
      { label: 'First Toile', id: 'TOI-001' },
      { label: 'Iteration 2', id: 'TOI-002' },
      { label: 'Iteration 3', id: 'TOI-003' },
      { label: 'Final Toile', id: 'TOI-004' },
    ],
  },
  {
    id: '06',
    title: 'FAILURE',
    titleKo: '실패',
    description: 'Documented failures — essential to progress',
    items: [
      { label: 'Rejected', id: 'FAI-001' },
      { label: 'Failed Toile', id: 'FAI-002' },
      { label: 'Wrong Path', id: 'FAI-003' },
    ],
  },
  {
    id: '07',
    title: 'REFINE',
    titleKo: '정제',
    description: 'Seam studies, proportions, finishing details',
    items: [
      { label: 'Seam Study', id: 'REF-001' },
      { label: 'Proportion', id: 'REF-002' },
      { label: 'Finishing', id: 'REF-003' },
    ],
  },
  {
    id: '08',
    title: 'FINAL',
    titleKo: '완성',
    description: 'Completed looks ready for presentation',
    items: [
      { label: 'Look 01', id: 'FIN-001' },
      { label: 'Look 02', id: 'FIN-002' },
      { label: 'Detail', id: 'FIN-003' },
    ],
  },
]

// Sketchbook page component - scattered layout
function SketchbookPage({
  stage,
  index,
}: {
  stage: (typeof processStages)[0]
  index: number
}) {
  const isReversed = index % 2 === 1
  const isFailure = stage.id === '06'

  // Different slot configurations per stage
  const getSlotConfig = (itemIndex: number, totalItems: number) => {
    const configs = [
      // First item - large
      {
        size: 'medium' as const,
        rotation: isReversed ? 3 : -2,
        clip: 'irregular-1' as const,
        shadow: 'offset' as const,
        position: { top: '5%', left: isReversed ? 'auto' : '8%', right: isReversed ? '8%' : 'auto' },
      },
      // Second item
      {
        size: 'small' as const,
        rotation: isReversed ? -4 : 5,
        clip: 'torn-1' as const,
        shadow: 'float' as const,
        position: { top: '35%', left: isReversed ? '15%' : 'auto', right: isReversed ? 'auto' : '20%' },
      },
      // Third item - swatch
      {
        size: 'swatch' as const,
        rotation: -8,
        border: 'rough' as const,
        decoration: 'tape-top' as const,
        position: { top: '60%', left: '45%' },
      },
      // Fourth item
      {
        size: 'tiny' as const,
        rotation: 12,
        border: 'thin' as const,
        decoration: 'pin' as const,
        position: { top: '20%', left: isReversed ? '60%' : '55%' },
      },
      // Fifth item
      {
        size: 'small-square' as const,
        rotation: -5,
        clip: 'irregular-4' as const,
        grayscale: true,
        position: { bottom: '15%', left: isReversed ? 'auto' : '25%', right: isReversed ? '30%' : 'auto' },
      },
    ]
    return configs[itemIndex % configs.length]
  }

  return (
    <section
      className={`relative min-h-screen w-full py-20 overflow-hidden ${
        isFailure ? 'bg-yon-ivory/50' : index % 2 === 0 ? 'texture-grain' : 'texture-paper'
      }`}
    >
      {/* Giant background stage number */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          top: '15%',
          left: isReversed ? 'auto' : '-5%',
          right: isReversed ? '-5%' : 'auto',
          fontSize: 'clamp(15rem, 35vw, 50rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-mono), monospace',
          opacity: 0.02,
          lineHeight: 0.8,
          color: isFailure ? '#8B7355' : '#0A0A0A',
        }}
        aria-hidden="true"
      >
        {stage.id}
      </span>

      {/* Stage title - rotated on side */}
      <div
        className="absolute z-30"
        style={{
          top: '50%',
          left: isReversed ? 'auto' : '2%',
          right: isReversed ? '2%' : 'auto',
          transform: `translateY(-50%) rotate(${isReversed ? 90 : -90}deg)`,
          transformOrigin: 'center',
        }}
      >
        <span
          className="font-mono uppercase tracking-[0.5em] text-yon-grey/20"
          style={{ fontSize: '0.6rem', whiteSpace: 'nowrap' }}
        >
          {stage.title}
        </span>
      </div>

      {/* Content area */}
      <div className="relative z-10 px-12 md:px-20 lg:px-28">
        {/* Stage header */}
        <div
          className="mb-16"
          style={{ transform: `rotate(${isReversed ? 0.5 : -0.5}deg)` }}
        >
          <div className="flex items-baseline gap-4">
            <span
              className={`font-mono tracking-[0.3em] ${isFailure ? 'text-yon-accent' : 'text-yon-grey/40'}`}
              style={{ fontSize: '0.6rem' }}
            >
              {stage.id}
            </span>
            <span className="w-8 h-px bg-yon-grey/20" />
          </div>

          <h2
            className={`font-serif mt-4 ${isFailure ? 'text-yon-accent' : 'text-yon-black'}`}
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
            }}
          >
            {stage.title}
          </h2>

          <span
            className="block font-mono text-yon-grey/30 mt-2"
            style={{ fontSize: '0.55rem', letterSpacing: '0.15em' }}
          >
            {stage.titleKo}
          </span>

          <p
            className="font-sans text-yon-grey/50 mt-6 max-w-sm"
            style={{
              fontSize: '0.8rem',
              lineHeight: 1.6,
              marginLeft: isReversed ? '0' : '1rem',
            }}
          >
            {stage.description}
          </p>
        </div>

        {/* Scattered slots */}
        <div className="relative" style={{ minHeight: '60vh' }}>
          {stage.items.map((item, itemIndex) => {
            const config = getSlotConfig(itemIndex, stage.items.length)
            return (
              <Slot
                key={item.id}
                label={item.label}
                size={config.size}
                position="absolute"
                top={config.position.top}
                left={config.position.left}
                right={config.position.right}
                bottom={(config.position as { bottom?: string }).bottom}
                rotation={config.rotation}
                clip={config.clip}
                shadow={config.shadow}
                border={config.border}
                decoration={config.decoration}
                grayscale={config.grayscale}
                zIndex={10 + itemIndex}
              />
            )
          })}

          {/* Handwritten annotation feel - item ID */}
          <div
            className="absolute"
            style={{
              bottom: '5%',
              right: isReversed ? 'auto' : '10%',
              left: isReversed ? '10%' : 'auto',
              transform: 'rotate(3deg)',
            }}
          >
            <span
              className="font-mono text-yon-grey/25"
              style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}
            >
              {stage.items.map((item) => item.id).join(' / ')}
            </span>
          </div>
        </div>
      </div>

      {/* Stage divider - torn paper effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export default function ProcessPage() {
  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* ============================================
          HERO - Sketchbook Cover
          ============================================ */}
      <section className="relative min-h-[70vh] w-full overflow-hidden texture-grain">
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
            left: '-8%',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          PROCESS
        </span>

        {/* Scattered hero slots */}
        <Slot
          label="SKETCH"
          size="medium"
          position="absolute"
          top="15%"
          right="10%"
          rotation={-3}
          clip="torn-1"
          shadow="offset"
          zIndex={15}
        />

        <Slot
          label="TOILE"
          size="small"
          position="absolute"
          top="55%"
          right="25%"
          rotation={5}
          clip="irregular-2"
          shadow="float"
          zIndex={12}
        />

        <Slot
          label="FABRIC"
          size="swatch"
          position="absolute"
          top="35%"
          left="60%"
          rotation={-12}
          border="rough"
          decoration="tape-top"
          zIndex={18}
        />

        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          bottom="30%"
          left="75%"
          rotation={8}
          border="thin"
          decoration="pin"
          zIndex={20}
        />

        {/* Main title */}
        <div className="relative z-20 pt-40 pb-20 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <span
              className="block font-mono uppercase tracking-[0.4em] text-yon-grey/40"
              style={{ fontSize: '0.55rem' }}
            >
              THE YON — Process
            </span>

            <h1
              className="font-serif text-yon-black mt-6"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                letterSpacing: '-0.03em',
                transform: 'rotate(-1.5deg)',
                lineHeight: 0.9,
              }}
            >
              Process
            </h1>

            <p
              className="font-serif italic text-yon-grey/60 mt-8"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                maxWidth: '35ch',
                marginLeft: '3rem',
                transform: 'rotate(0.5deg)',
              }}
            >
              &ldquo;The journey from concept to garment, documented in raw form&rdquo;
            </p>

            <span
              className="block font-mono text-yon-grey/30 mt-4"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                marginLeft: '3rem',
              }}
            >
              컨셉에서 의복까지의 여정
            </span>
          </div>
        </div>

        {/* Stage navigation - scattered */}
        <div className="relative z-20 px-8 md:px-16 lg:px-24 pb-12">
          <div className="flex flex-wrap gap-4">
            {processStages.map((stage, index) => (
              <a
                key={stage.id}
                href={`#stage-${stage.id}`}
                className="group font-mono uppercase tracking-[0.15em] text-yon-grey/40 hover:text-yon-black transition-colors"
                style={{
                  fontSize: '0.55rem',
                  transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                }}
              >
                <span className="text-yon-accent/60 group-hover:text-yon-accent mr-1">
                  {stage.id}
                </span>
                {stage.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          PROCESS STAGES - Sketchbook Pages
          ============================================ */}
      {processStages.map((stage, index) => (
        <div key={stage.id} id={`stage-${stage.id}`}>
          <SketchbookPage stage={stage} index={index} />
        </div>
      ))}

      {/* ============================================
          END CTA - Collections Link
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            right: '-10%',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            lineHeight: 0.8,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="relative z-10 text-center px-8">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            View the Results
          </span>

          <h2
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              transform: 'rotate(-1deg)',
            }}
          >
            Collections
          </h2>

          <Link
            href="/collections"
            className="inline-block mt-8 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            View Collections →
          </Link>
        </div>

        {/* Floating accent */}
        <Slot
          label="FINAL"
          size="small"
          position="absolute"
          bottom="20%"
          left="15%"
          rotation={-5}
          clip="irregular-3"
          grayscale
          zIndex={5}
        />
      </section>

      <Footer />
    </div>
  )
}
