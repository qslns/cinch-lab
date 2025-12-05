'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'
import { useLightbox } from '@/components/ImageLightbox'
import {
  LayeredTitle,
  GlitchTitle,
  ExperimentalText,
  LabelText,
  WhisperText,
  NumberTag,
  HandwrittenNote,
  CrossedText,
  GrainDisplay,
  AnnotationText,
} from '@/components/typography'

// Archive items - research and process documentation
const archiveItems = [
  {
    id: 'AW25-001',
    title: 'Deconstructed Tailoring',
    season: 'AW25',
    category: 'Construction',
    description: 'Traditional pattern blocks, reimagined. Where structure meets chaos.',
    longDescription: 'Exploring the boundary between precision and disorder in classical tailoring. Each seam becomes a decision point—to follow or to break.',
    status: 'current',
    tags: ['Tailoring', 'Deconstruction', 'Structure'],
    date: '2025.01',
  },
  {
    id: 'AW25-002',
    title: 'Raw Edge Studies',
    season: 'AW25',
    category: 'Material',
    description: 'Embracing the unfinished. Beauty in the frayed.',
    longDescription: 'What if we celebrated the edges that convention tells us to hide? A meditation on completion and incompleteness.',
    status: 'current',
    tags: ['Raw Edge', 'Texture', 'Unfinished'],
    date: '2025.01',
  },
  {
    id: 'SS25-001',
    title: 'Volume Architecture',
    season: 'SS25',
    category: 'Form',
    description: 'The space between body and fabric. Sculptural silhouettes.',
    longDescription: 'Architecture for the human form. Creating three-dimensional space that moves, breathes, and transforms with the wearer.',
    status: 'archived',
    tags: ['Volume', 'Sculpture', 'Silhouette'],
    date: '2024.10',
  },
  {
    id: 'SS25-002',
    title: 'Toile Iterations',
    season: 'SS25',
    category: 'Process',
    description: 'Every muslin tells a story. Prototypes as artifacts.',
    longDescription: 'The toile is not just a test—it is a document of exploration. Each iteration preserves a moment of discovery or failure.',
    status: 'archived',
    tags: ['Muslin', 'Prototype', 'Iteration'],
    date: '2024.09',
  },
  {
    id: 'AW24-001',
    title: 'Beautiful Failures',
    season: 'AW24',
    category: 'Experiment',
    description: "What didn't work—and why it matters.",
    longDescription: 'A collection of experiments that did not succeed in their original intention, but revealed unexpected truths about material and form.',
    status: 'archived',
    tags: ['Failure', 'Learning', 'Discovery'],
    date: '2024.06',
  },
  {
    id: 'AW24-002',
    title: 'Seam Exposé',
    season: 'AW24',
    category: 'Detail',
    description: 'Seams as protagonists. Exposed, celebrated, exaggerated.',
    longDescription: 'Inverting the hierarchy of garment construction. The seam—normally hidden—becomes the main character of the narrative.',
    status: 'archived',
    tags: ['Seams', 'Exposed', 'Detail'],
    date: '2024.05',
  },
  {
    id: 'SS24-001',
    title: 'Concept Sketches',
    season: 'SS24',
    category: 'Origin',
    description: 'Where it all begins. Raw ideas on paper.',
    longDescription: 'The first marks of imagination. Before fabric, before form—there is the line. These sketches capture the genesis of ideas.',
    status: 'archived',
    tags: ['Sketch', 'Concept', 'Beginning'],
    date: '2024.02',
  },
  {
    id: 'SS24-002',
    title: 'Texture Studies',
    season: 'SS24',
    category: 'Surface',
    description: 'The language of fabric. Close encounters.',
    longDescription: 'Macro explorations of textile surfaces. Understanding material through intimate observation reveals patterns invisible to the casual eye.',
    status: 'archived',
    tags: ['Texture', 'Material', 'Surface'],
    date: '2024.01',
  },
]

const categories = ['All', 'Construction', 'Material', 'Form', 'Process', 'Experiment', 'Detail', 'Origin', 'Surface']
const seasons = ['All', 'AW25', 'SS25', 'AW24', 'SS24']

// Dense archive card with scattered slots
function ArchiveCard({ item, index }: { item: typeof archiveItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const rotations = [-3, 2, -2, 3, -1.5, 2.5, -2.5, 1.5]
  const clips = ['irregular-1', 'torn-1', 'organic-1', 'torn-2', 'irregular-3', 'wave-1', 'corner-cut', 'notch-1'] as const
  const decorations = ['tape-corner', 'pin', 'staple', 'corner-fold', 'tape-top', 'clip', 'pin-red', 'mark-x'] as const

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: `rotate(${rotations[index % rotations.length] * 0.3}deg)` }}
    >
      {/* Main slot - clickable */}
      <div className="relative cursor-pointer" style={{ minHeight: '280px' }}>
        <Slot
          label={item.title}
          size={index % 3 === 0 ? 'medium' : index % 3 === 1 ? 'small' : 'medium-wide'}
          rotation={rotations[index % rotations.length]}
          clip={clips[index % clips.length]}
          shadow={isHovered ? 'dramatic' : 'offset'}
          zIndex={10}
          grayscale={item.status === 'archived'}
          sepia={item.status === 'archived' && index % 2 === 0}
          decoration={decorations[index % decorations.length]}
          annotationNumber={item.id}
          texture={index % 4 === 0 ? 'grain' : undefined}
        />

        {/* Secondary accent slot */}
        <Slot
          label={item.category}
          size="tiny"
          position="absolute"
          top="65%"
          right="-8%"
          rotation={-rotations[index % rotations.length] * 2}
          border="thin"
          zIndex={15}
          decoration={index % 2 === 0 ? 'pin' : 'clip'}
        />

        {/* Swatch */}
        <Slot
          label={item.season}
          size="swatch"
          position="absolute"
          bottom="-5%"
          left="10%"
          rotation={rotations[(index + 3) % rotations.length]}
          border={index % 2 === 0 ? 'rough' : 'accent'}
          zIndex={12}
        />
      </div>

      {/* Info below */}
      <div className="mt-4 px-2">
        <div className="flex items-center gap-3">
          <NumberTag className={item.status === 'current' ? 'text-yon-accent' : 'text-yon-grey/40'}>
            {item.status === 'current' ? '● Current' : '○ Archived'}
          </NumberTag>
          <WhisperText className="text-yon-grey/30">
            {item.date}
          </WhisperText>
        </div>

        <h3
          className="mt-2"
          style={{
            transform: `rotate(${rotations[index % rotations.length] * 0.2}deg)`
          }}
        >
          <ExperimentalText
            text={item.title}
            variant="subtitle"
            effect={item.status === 'archived' ? 'grain' : 'layer'}
            intensity="subtle"
            colorScheme="mono"
            as="span"
          />
        </h3>

        <p
          className="font-sans text-yon-grey/60 mt-2"
          style={{ fontSize: '0.75rem', lineHeight: 1.6 }}
        >
          {item.description}
        </p>

        {/* Tags */}
        <motion.div
          className="mt-3 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          {item.tags.map(tag => (
            <LabelText
              key={tag}
              className="text-yon-grey/50"
              style={{ fontSize: '0.45rem' }}
            >
              #{tag}
            </LabelText>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function ArchivePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSeason, setSelectedSeason] = useState('All')
  const { openLightbox } = useLightbox()

  // Filter items
  const filteredItems = useMemo(() => {
    return archiveItems.filter(item => {
      const matchesSearch = searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
      const matchesSeason = selectedSeason === 'All' || item.season === selectedSeason

      return matchesSearch && matchesCategory && matchesSeason
    })
  }, [searchQuery, selectedCategory, selectedSeason])

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* ============================================
          HERO - Dense Deconstructivist Header
          ============================================ */}
      <section className="relative min-h-[85vh] w-full overflow-hidden texture-grain">
        {/* Background typography - ARCHIVE */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '10%',
            left: '-12%',
            fontSize: 'clamp(14rem, 35vw, 55rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-4deg)',
          }}
          aria-hidden="true"
        >
          ARCHIVE
        </span>

        {/* Secondary background - DOC */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '8%',
            right: '-8%',
            fontSize: 'clamp(10rem, 25vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            color: '#8B7355',
            transform: 'rotate(6deg)',
          }}
          aria-hidden="true"
        >
          DOC
        </span>

        {/* Third layer - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
            right: '5%',
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            letterSpacing: '0.3em',
            color: '#0A0A0A',
            writingMode: 'vertical-rl',
          }}
          aria-hidden="true"
        >
          RESEARCH
        </span>

        {/* ===== HERO SLOTS - 12 scattered ===== */}

        {/* Slot 1: Hero left bleeding */}
        <Slot
          label="ARCHIVE / MAIN"
          size="hero"
          position="absolute"
          top="5%"
          left="-5%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={18}
          bleed="left"
          bleedAmount="lg"
          grayscale
          annotationNumber="A-001"
          texture="grain"
        />

        {/* Slot 2: Large right */}
        <Slot
          label="PROCESS"
          size="large"
          position="absolute"
          top="8%"
          right="5%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={16}
          decoration="tape-corner"
          bleed="right"
          bleedAmount="md"
          sepia
        />

        {/* Slot 3: Medium overlapping */}
        <Slot
          label="RESEARCH"
          size="medium"
          position="absolute"
          top="40%"
          left="35%"
          rotation={-5}
          clip="organic-1"
          shadow="dramatic"
          zIndex={22}
          overlapX={80}
          decoration="staple"
        />

        {/* Slot 4: Small */}
        <Slot
          label="STUDY"
          size="small"
          position="absolute"
          top="55%"
          right="20%"
          rotation={6}
          clip="torn-2"
          zIndex={20}
          grayscale
          decoration="pin"
        />

        {/* Slot 5: Medium-wide */}
        <Slot
          label="DOCUMENT"
          size="medium-wide"
          position="absolute"
          bottom="20%"
          left="5%"
          rotation={2}
          clip="wave-1"
          shadow="soft"
          zIndex={14}
          decoration="corner-fold"
        />

        {/* Slot 6-8: Swatch cluster */}
        <Slot
          label="A"
          size="swatch"
          position="absolute"
          top="28%"
          left="55%"
          rotation={12}
          border="rough"
          zIndex={24}
          decoration="tape-top"
        />

        <Slot
          label="B"
          size="swatch"
          position="absolute"
          top="32%"
          left="62%"
          rotation={-8}
          border="accent"
          zIndex={26}
          overlapX={20}
        />

        <Slot
          label="C"
          size="swatch"
          position="absolute"
          top="36%"
          left="68%"
          rotation={5}
          border="thin"
          zIndex={25}
          overlapX={25}
        />

        {/* Slot 9: Tiny */}
        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          bottom="35%"
          right="35%"
          rotation={-10}
          clip="notch-1"
          zIndex={28}
          decoration="clip"
        />

        {/* Slot 10: Small bottom right bleeding */}
        <Slot
          label="NOTES"
          size="small"
          position="absolute"
          bottom="15%"
          right="-2%"
          rotation={-4}
          clip="irregular-4"
          zIndex={15}
          bleed="right"
          bleedAmount="md"
          grayscale
        />

        {/* Slot 11: Micro accents */}
        <Slot
          label="01"
          size="micro"
          position="absolute"
          top="48%"
          left="72%"
          rotation={15}
          border="thin"
          zIndex={30}
          decoration="pin-red"
        />

        {/* Slot 12: Medium-tall */}
        <Slot
          label="HISTORY"
          size="medium-tall"
          position="absolute"
          bottom="5%"
          left="45%"
          rotation={-1.5}
          clip="corner-cut"
          shadow="deep"
          zIndex={12}
          sepia
        />

        {/* Scattered Annotations */}
        <AnnotationLabel
          text="archive"
          position={{ top: '12%', left: '28%' }}
          rotation={-3}
          variant="tag"
        />
        <AnnotationLabel
          text="research notes"
          position={{ top: '38%', right: '8%' }}
          rotation={5}
          variant="handwritten"
        />
        <AnnotationLabel
          text="DOC"
          position={{ bottom: '28%', left: '25%' }}
          rotation={-2}
          variant="stamp"
        />
        <AnnotationLabel
          text="reference"
          position={{ top: '65%', left: '58%' }}
          rotation={8}
          variant="default"
        />

        {/* Main title */}
        <div className="relative z-35 pt-44 pb-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <AnnotationText
              text="THE YON — Archive"
              variant="stamp"
              className="text-yon-grey/50"
            />

            <div className="mt-6" style={{ transform: 'rotate(-2.5deg)' }}>
              <GlitchTitle
                text="Archive"
                size="display"
                glitchOffset={8}
                rotateChars
                rotationIntensity={4}
              />
            </div>

            <div className="mt-10 max-w-lg" style={{ marginLeft: '3rem' }}>
              <p
                className="font-sans text-yon-grey/60"
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  transform: 'rotate(0.5deg)',
                }}
              >
                Research, process documentation, and experiments.
                Every failure is a step toward discovery. Nothing is wasted.
              </p>

              <div className="mt-4">
                <ExperimentalText
                  text="아카이브 — 리서치 & 프로세스"
                  variant="subtitle"
                  effect="mixed"
                  intensity="strong"
                  colorScheme="accent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="relative z-35 px-8 md:px-16 lg:px-24 pb-12">
          <div className="flex flex-wrap items-center gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors placeholder:text-yon-grey/40"
                style={{ fontSize: '0.75rem' }}
              />
            </div>

            <span className="text-yon-grey/20">|</span>

            {/* Category filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.slice(0, 5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono uppercase tracking-[0.15em] transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'text-yon-black border-b border-yon-black'
                      : 'text-yon-grey/40 hover:text-yon-grey/70'
                  }`}
                  style={{ fontSize: '0.55rem', paddingBottom: '2px' }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-yon-grey/20">|</span>

            {/* Season filter */}
            <div className="flex items-center gap-2">
              {seasons.map(season => (
                <button
                  key={season}
                  onClick={() => setSelectedSeason(season)}
                  className={`font-mono uppercase tracking-[0.15em] transition-all ${
                    selectedSeason === season
                      ? 'text-yon-black border-b border-yon-black'
                      : 'text-yon-grey/40 hover:text-yon-grey/70'
                  }`}
                  style={{ fontSize: '0.55rem', paddingBottom: '2px' }}
                >
                  {season}
                </button>
              ))}
            </div>

            {/* Results count */}
            <span
              className="ml-auto font-mono text-yon-grey/30"
              style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
            >
              {filteredItems.length} Items
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          ARCHIVE GRID - Dense Scattered Layout
          ============================================ */}
      <section className="relative py-20 px-8 md:px-16 lg:px-24 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-10%',
            fontSize: 'clamp(10rem, 25vw, 38rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#0A0A0A',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          01—08
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedSeason}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredItems.map((item, index) => (
              <ArchiveCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <motion.div
            className="py-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="font-mono text-yon-grey/50" style={{ fontSize: '0.75rem' }}>
              No results found
            </span>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSelectedSeason('All')
                setSearchQuery('')
              }}
              className="block mx-auto mt-6 font-mono uppercase tracking-[0.15em] text-yon-black hover:text-yon-accent transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Reset Filters →
            </button>
          </motion.div>
        )}
      </section>

      {/* ============================================
          FAILURES SECTION - Important Documentation
          ============================================ */}
      <section className="relative min-h-[80vh] w-full py-24 overflow-hidden bg-yon-ivory/30 texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-10%',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            color: '#8B7355',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          FAIL
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-5%',
            fontSize: 'clamp(5rem, 12vw, 18rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom',
          }}
          aria-hidden="true"
        >
          ESSENTIAL
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <AnnotationText
              text="ESSENTIAL DOCUMENTATION"
              variant="stamp"
              className="text-yon-accent/70"
            />

            <div className="mt-6" style={{ transform: 'rotate(-2deg)' }}>
              <GlitchTitle
                text="Failures"
                size="heading"
                glitchOffset={6}
                rotateChars
                rotationIntensity={3}
                style={{ color: 'var(--yon-accent)' }}
              />
            </div>

            <div className="mt-8 max-w-lg" style={{ marginLeft: '2rem' }}>
              <p
                className="font-sans text-yon-grey/60"
                style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.8,
                  transform: 'rotate(0.5deg)',
                }}
              >
                Every failed experiment teaches something. Rejected ideas, broken toiles, wrong paths —
                all documented as essential steps toward discovery.
              </p>

              <ExperimentalText
                text="실패는 발견의 필수 단계"
                variant="subtitle"
                effect="scatter"
                intensity="strong"
                colorScheme="desaturated"
                className="mt-4 block"
              />
            </div>
          </div>

          {/* Failure slots - 10 scattered grayscale */}
          <div className="relative mt-20" style={{ minHeight: '50vh' }}>
            <Slot
              label="REJECTED / 01"
              size="large"
              position="absolute"
              top="0%"
              left="0%"
              rotation={-3}
              clip="torn-2"
              shadow="offset"
              grayscale
              zIndex={10}
              annotationNumber="F-001"
              decoration="mark-x"
            />

            <Slot
              label="FAILED TOILE"
              size="medium"
              position="absolute"
              top="10%"
              right="10%"
              rotation={5}
              clip="irregular-5"
              grayscale
              zIndex={15}
              decoration="tape-corner"
            />

            <Slot
              label="WRONG PATH"
              size="small"
              position="absolute"
              top="30%"
              left="35%"
              rotation={-8}
              clip="organic-2"
              grayscale
              zIndex={18}
              overlapX={60}
              decoration="staple"
            />

            <Slot
              label="ITERATION 03"
              size="medium-wide"
              position="absolute"
              top="45%"
              left="5%"
              rotation={2}
              clip="wave-2"
              grayscale
              sepia
              zIndex={12}
              decoration="pin"
            />

            <Slot
              label="DISCARDED"
              size="small-square"
              position="absolute"
              top="50%"
              right="20%"
              rotation={-6}
              border="rough"
              grayscale
              zIndex={16}
              decoration="mark-x"
            />

            <Slot
              label="X"
              size="swatch"
              position="absolute"
              top="70%"
              left="65%"
              rotation={-10}
              border="rough"
              grayscale
              zIndex={22}
              decoration="mark-x"
            />

            <Slot
              label="X"
              size="swatch"
              position="absolute"
              top="75%"
              left="72%"
              rotation={8}
              border="thin"
              grayscale
              zIndex={23}
              overlapX={20}
            />

            <Slot
              label="NO"
              size="micro"
              position="absolute"
              top="38%"
              right="40%"
              rotation={15}
              border="accent"
              grayscale
              zIndex={25}
            />

            <Slot
              label="?"
              size="micro"
              position="absolute"
              bottom="20%"
              left="25%"
              rotation={-12}
              border="dashed"
              grayscale
              zIndex={24}
            />

            <Slot
              label="LESSON"
              size="tiny"
              position="absolute"
              bottom="15%"
              right="35%"
              rotation={10}
              clip="notch-2"
              grayscale
              zIndex={20}
              decoration="corner-fold"
            />

            {/* Annotations */}
            <AnnotationLabel
              text="learn from this"
              position={{ top: '25%', left: '55%' }}
              rotation={4}
              variant="handwritten"
            />
            <AnnotationLabel
              text="REJECTED"
              position={{ top: '60%', right: '25%' }}
              rotation={-3}
              variant="stamp"
            />
            <AnnotationLabel
              text="try again"
              position={{ bottom: '25%', left: '48%' }}
              rotation={6}
              variant="default"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          CTA - Collections Link
          ============================================ */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '25%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(12rem, 30vw, 45rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.015,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="text-center px-8 z-10">
          <AnnotationText
            text="SEE THE RESULTS"
            variant="tag"
            className="text-yon-grey/50"
          />

          <div className="mt-6" style={{ transform: 'rotate(-2deg)' }}>
            <GlitchTitle
              text="Collections"
              size="heading"
              glitchOffset={5}
              rotateChars
              rotationIntensity={3}
            />
          </div>

          <Link
            href="/collections"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            View Collections →
          </Link>
        </div>

        {/* Accent slots */}
        <Slot
          label="RESULT"
          size="small"
          position="absolute"
          bottom="15%"
          right="10%"
          rotation={-5}
          clip="irregular-3"
          zIndex={5}
          decoration="tape-corner"
        />

        <Slot
          label="FINAL"
          size="tiny"
          position="absolute"
          top="20%"
          left="15%"
          rotation={8}
          border="accent"
          zIndex={6}
        />

        <Slot
          label="→"
          size="micro"
          position="absolute"
          bottom="30%"
          left="25%"
          rotation={-3}
          border="thin"
          zIndex={7}
        />

        <AnnotationLabel
          text="explore"
          position={{ top: '35%', right: '20%' }}
          rotation={4}
          variant="handwritten"
        />
      </section>

      <Footer />
    </div>
  )
}
