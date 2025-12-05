'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { client } from '../../../sanity/lib/client'
import { collectionsQuery } from '@/lib/sanity/queries'
import type { Collection } from '@/types/sanity'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'
import {
  LayeredTitle,
  ExperimentalText,
  AnnotationText,
  LabelText,
  WhisperText,
  HandwrittenNote,
} from '@/components/typography'

// Fallback data for THE YON
const FALLBACK_COLLECTIONS: Partial<Collection>[] = [
  {
    _id: '1',
    title: 'DECONSTRUCTION',
    slug: 'deconstruction',
    season: 'aw25',
    year: 2025,
    status: 'in_progress',
    description: 'Exploring pattern deconstruction through experimental tailoring techniques.',
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing'],
    materials: ['Japanese denim', 'Wool suiting', 'Cotton canvas'],
    featured: true,
  },
  {
    _id: '2',
    title: 'FRAGMENTS',
    slug: 'fragments',
    season: 'ss25',
    year: 2025,
    status: 'testing',
    description: 'Hybrid material construction with contrasting textures.',
    techniques: ['Material splicing', 'Surface manipulation'],
    materials: ['Nylon', 'Silk organza', 'Leather'],
    featured: true,
  },
  {
    _id: '3',
    title: 'VOID',
    slug: 'void',
    season: 'aw24',
    year: 2024,
    status: 'complete',
    description: 'Architectural volume exploration. The space between defines the form.',
    techniques: ['Draping', 'Pattern cutting'],
    materials: ['Cotton canvas', 'Horsehair'],
    featured: false,
  },
  {
    _id: '4',
    title: 'ORIGIN',
    slug: 'origin',
    season: 'ss24',
    year: 2024,
    status: 'complete',
    description: 'Return to fundamental shapes. Where every collection begins.',
    techniques: ['Basic construction', 'Form studies'],
    materials: ['Muslin', 'Cotton'],
    featured: false,
  },
]

// Filter options
const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'in_progress', label: 'Current' },
  { id: 'complete', label: 'Archive' },
]

const seasonOptions = [
  { id: 'all', label: 'All' },
  { id: 'aw25', label: 'AW25' },
  { id: 'ss25', label: 'SS25' },
  { id: 'aw24', label: 'AW24' },
  { id: 'ss24', label: 'SS24' },
]

// Collection moodboard - each collection as dense scattered collage
function CollectionMoodboard({
  collection,
  index,
}: {
  collection: Partial<Collection>
  index: number
}) {
  // Alternate layouts for visual interest
  const isReversed = index % 2 === 1
  const baseRotation = isReversed ? 2 : -2
  const clips = ['irregular-1', 'torn-1', 'organic-1', 'torn-2'] as const
  const decorations = ['tape-corner', 'pin', 'staple', 'corner-fold'] as const

  return (
    <div className="relative min-h-screen w-full py-20 overflow-hidden">
      {/* Giant background title */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          top: isReversed ? '10%' : '15%',
          left: isReversed ? 'auto' : '-10%',
          right: isReversed ? '-10%' : 'auto',
          fontSize: 'clamp(10rem, 25vw, 40rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-serif), Georgia, serif',
          opacity: 0.03,
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          color: '#0A0A0A',
          transform: `rotate(${isReversed ? 4 : -4}deg)`,
          whiteSpace: 'nowrap',
        }}
        aria-hidden="true"
      >
        {collection.title}
      </span>

      {/* Secondary background - collection number */}
      <span
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '10%',
          left: isReversed ? '-5%' : 'auto',
          right: isReversed ? 'auto' : '-5%',
          fontSize: 'clamp(6rem, 15vw, 25rem)',
          fontWeight: 100,
          fontFamily: 'var(--font-mono), monospace',
          opacity: 0.02,
          color: '#8B7355',
          transform: `rotate(${isReversed ? -5 : 5}deg)`,
        }}
        aria-hidden="true"
      >
        0{index + 1}
      </span>

      {/* Main moodboard area */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24">
        {/* Dense scattered slots - 15+ per collection */}
        <div className="relative" style={{ minHeight: '85vh' }}>
          {/* Slot 1: Primary hero image - bleeding */}
          <Slot
            label={`${collection.title} / 01`}
            size="hero"
            position="absolute"
            top={isReversed ? '3%' : '0%'}
            left={isReversed ? 'auto' : '-3%'}
            right={isReversed ? '-3%' : 'auto'}
            rotation={baseRotation}
            clip={clips[index % clips.length]}
            shadow="offset-xl"
            zIndex={20}
            bleed={isReversed ? 'right' : 'left'}
            bleedAmount="lg"
            annotationNumber={`${collection.season?.toUpperCase()}-001`}
            texture="grain"
          />

          {/* Slot 2: Large secondary */}
          <Slot
            label="LOOK 02"
            size="large"
            position="absolute"
            top={isReversed ? '20%' : '25%'}
            left={isReversed ? '8%' : 'auto'}
            right={isReversed ? 'auto' : '5%'}
            rotation={-baseRotation * 1.5}
            clip={clips[(index + 1) % clips.length]}
            shadow="float"
            zIndex={18}
            decoration={decorations[index % decorations.length]}
          />

          {/* Slot 3: Medium detail - overlapping */}
          <Slot
            label="DETAIL"
            size="medium"
            position="absolute"
            top={isReversed ? '45%' : '40%'}
            left={isReversed ? '35%' : '40%'}
            rotation={baseRotation * 2}
            clip="irregular-3"
            shadow="dramatic"
            zIndex={25}
            overlapX={80}
            overlapY={40}
            decoration="staple"
          />

          {/* Slot 4: Small accent */}
          <Slot
            label="LOOK 03"
            size="small"
            position="absolute"
            top={isReversed ? '60%' : '55%'}
            left={isReversed ? '55%' : '50%'}
            rotation={-baseRotation * 2.5}
            clip="irregular-5"
            zIndex={22}
            decoration="pin"
          />

          {/* Slot 5: Medium-wide - process */}
          <Slot
            label="PROCESS"
            size="medium-wide"
            position="absolute"
            top={isReversed ? '10%' : '65%'}
            left={isReversed ? 'auto' : '5%'}
            right={isReversed ? '25%' : 'auto'}
            rotation={baseRotation * 0.5}
            clip="wave-1"
            shadow="soft"
            zIndex={15}
            sepia
          />

          {/* Slot 6: Small-square - sketch */}
          <Slot
            label="SKETCH"
            size="small-square"
            position="absolute"
            top={isReversed ? '50%' : '8%'}
            left={isReversed ? 'auto' : 'auto'}
            right={isReversed ? '8%' : '8%'}
            rotation={5}
            clip="torn-3"
            grayscale
            zIndex={12}
            decoration="tape-top"
          />

          {/* Slot 7-9: Swatch cluster */}
          <Slot
            label={collection.materials?.[0] || 'FABRIC A'}
            size="swatch"
            position="absolute"
            top={isReversed ? '75%' : '70%'}
            left={isReversed ? '10%' : 'auto'}
            right={isReversed ? 'auto' : '35%'}
            rotation={-10}
            border="rough"
            decoration="tape-top"
            zIndex={24}
          />

          <Slot
            label={collection.materials?.[1] || 'FABRIC B'}
            size="swatch"
            position="absolute"
            top={isReversed ? '78%' : '73%'}
            left={isReversed ? '18%' : 'auto'}
            right={isReversed ? 'auto' : '28%'}
            rotation={8}
            border="accent"
            zIndex={26}
            overlapX={25}
          />

          <Slot
            label={collection.materials?.[2] || 'FABRIC C'}
            size="swatch"
            position="absolute"
            top={isReversed ? '82%' : '76%'}
            left={isReversed ? '25%' : 'auto'}
            right={isReversed ? 'auto' : '22%'}
            rotation={-5}
            border="thin"
            zIndex={28}
            overlapX={20}
          />

          {/* Slot 10: Tiny - reference */}
          <Slot
            label="REF"
            size="tiny"
            position="absolute"
            bottom="15%"
            left={isReversed ? 'auto' : '25%'}
            right={isReversed ? '45%' : 'auto'}
            rotation={-15}
            clip="notch-1"
            decoration="clip"
            zIndex={30}
          />

          {/* Slot 11: Tiny-wide - mood */}
          <Slot
            label="MOOD"
            size="tiny-wide"
            position="absolute"
            top={isReversed ? '35%' : '30%'}
            left={isReversed ? '60%' : '60%'}
            rotation={12}
            clip="irregular-4"
            zIndex={19}
            grayscale
          />

          {/* Slot 12: Micro accents */}
          <Slot
            label="01"
            size="micro"
            position="absolute"
            top="38%"
            left={isReversed ? '48%' : '70%'}
            rotation={18}
            border="thin"
            zIndex={32}
            decoration="pin-red"
          />

          <Slot
            label="02"
            size="micro"
            position="absolute"
            top="68%"
            left={isReversed ? '70%' : '35%'}
            rotation={-12}
            border="accent"
            zIndex={31}
          />

          {/* Slot 13: Medium-tall - silhouette */}
          <Slot
            label="SILHOUETTE"
            size="medium-tall"
            position="absolute"
            bottom="8%"
            left={isReversed ? '45%' : '55%'}
            rotation={-baseRotation}
            clip="corner-cut"
            shadow="deep"
            zIndex={14}
            contrast
          />

          {/* Slot 14: Small - top bleeding */}
          <Slot
            label="TOILE"
            size="small"
            position="absolute"
            top="-2%"
            left={isReversed ? '55%' : '35%'}
            rotation={baseRotation * 1.5}
            clip="trapezoid"
            shadow="offset"
            zIndex={16}
            bleed="top"
            bleedAmount="md"
          />

          {/* Slot 15: Small - technique */}
          <Slot
            label={collection.techniques?.[0] || 'TECHNIQUE'}
            size="small"
            position="absolute"
            bottom="25%"
            left={isReversed ? '5%' : 'auto'}
            right={isReversed ? 'auto' : '5%'}
            rotation={-baseRotation * 2}
            clip="organic-2"
            zIndex={17}
            decoration="corner-fold"
            bleed={isReversed ? 'left' : 'right'}
            bleedAmount="sm"
          />

          {/* Scattered Annotations */}
          <AnnotationLabel
            text={collection.season?.toUpperCase() || 'SEASON'}
            position={{
              top: '5%',
              left: isReversed ? '30%' : 'auto',
              right: isReversed ? 'auto' : '25%'
            }}
            rotation={-3}
            variant="tag"
          />
          <AnnotationLabel
            text="main look"
            position={{
              top: '28%',
              left: isReversed ? '55%' : '8%'
            }}
            rotation={5}
            variant="handwritten"
          />
          <AnnotationLabel
            text={collection.status === 'in_progress' ? 'WIP' : collection.status === 'testing' ? 'TESTING' : 'COMPLETE'}
            position={{
              top: '50%',
              right: isReversed ? '55%' : '45%'
            }}
            rotation={-2}
            variant="stamp"
          />
          <AnnotationLabel
            text="materials"
            position={{
              bottom: '22%',
              left: isReversed ? '5%' : 'auto',
              right: isReversed ? 'auto' : '50%'
            }}
            rotation={4}
            variant="default"
          />

          {/* Collection info - overlaid with experimental typography */}
          <div
            className="absolute z-40"
            style={{
              bottom: '3%',
              left: isReversed ? 'auto' : '3%',
              right: isReversed ? '5%' : 'auto',
              transform: `rotate(${baseRotation * 0.3}deg)`,
            }}
          >
            <Link href={`/collections/${collection.slug}`} className="group block">
              <LabelText
                text={`${collection.season?.toUpperCase()} — ${collection.year}`}
                style={{ fontSize: '0.55rem' }}
              />

              <LayeredTitle
                text={collection.title || 'COLLECTION'}
                size="small"
                layerStyle="offset"
                offsetX={3}
                offsetY={3}
                layerOpacity={0.1}
                layerColor="#8B7355"
                charRotation
                rotationIntensity={1.5}
                className="mt-3 group-hover:text-yon-accent transition-colors"
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                  letterSpacing: '-0.02em',
                }}
                as="h2"
              />

              <p
                className="font-sans text-yon-grey/60 mt-4 max-w-sm"
                style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
              >
                {collection.description}
              </p>

              <span
                className="inline-block mt-6 font-mono uppercase tracking-[0.2em] text-yon-grey/40 group-hover:text-yon-black transition-colors border-b border-yon-grey/20 group-hover:border-yon-black pb-1"
                style={{ fontSize: '0.6rem' }}
              >
                View Collection →
              </span>
            </Link>
          </div>

          {/* Status indicator */}
          {collection.status && (
            <div
              className="absolute z-35"
              style={{
                top: '2%',
                left: isReversed ? '3%' : 'auto',
                right: isReversed ? 'auto' : '3%',
              }}
            >
              <span
                className={`font-mono uppercase tracking-[0.2em] ${
                  collection.status === 'in_progress' ? 'text-yon-accent' :
                  collection.status === 'testing' ? 'text-yon-grey/60' : 'text-yon-grey/30'
                }`}
                style={{ fontSize: '0.5rem' }}
              >
                {collection.status === 'in_progress'
                  ? '● In Progress'
                  : collection.status === 'testing'
                    ? '● Testing'
                    : '○ Complete'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Divider - subtle gradient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-yon-grey/15 to-transparent"
        aria-hidden="true"
      />
    </div>
  )
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Partial<Collection>[]>([])
  const [filteredCollections, setFilteredCollections] = useState<Partial<Collection>[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSeason, setActiveSeason] = useState('all')

  useEffect(() => {
    async function fetchCollections() {
      try {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        if (!projectId || projectId === 'your_project_id_here') {
          setCollections(FALLBACK_COLLECTIONS)
          setFilteredCollections(FALLBACK_COLLECTIONS)
          setLoading(false)
          return
        }
        const data = await client.fetch<Collection[]>(collectionsQuery)
        const result = data.length > 0 ? data : FALLBACK_COLLECTIONS
        setCollections(result)
        setFilteredCollections(result)
      } catch {
        setCollections(FALLBACK_COLLECTIONS)
        setFilteredCollections(FALLBACK_COLLECTIONS)
      } finally {
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  // Filter collections
  useEffect(() => {
    let result = [...collections]

    if (activeFilter !== 'all') {
      if (activeFilter === 'complete') {
        result = result.filter((c) => c.status === 'complete')
      } else {
        result = result.filter((c) => c.status === 'in_progress' || c.status === 'testing')
      }
    }

    if (activeSeason !== 'all') {
      result = result.filter((c) => c.season === activeSeason)
    }

    setFilteredCollections(result)
  }, [activeFilter, activeSeason, collections])

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* ============================================
          HERO HEADER - Dense Deconstructivist
          ============================================ */}
      <section className="relative min-h-[80vh] w-full overflow-hidden texture-grain">
        {/* Background typography */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '15%',
            left: '-8%',
            fontSize: 'clamp(12rem, 30vw, 50rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.025,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#0A0A0A',
            transform: 'rotate(-3deg)',
          }}
          aria-hidden="true"
        >
          WORKS
        </span>

        {/* Secondary background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            right: '-10%',
            fontSize: 'clamp(8rem, 20vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            color: '#8B7355',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          04
        </span>

        {/* Third layer - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
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
          COLLECTIONS
        </span>

        {/* ===== HEADER SLOTS - 10 scattered ===== */}

        {/* Slot 1: Hero left bleeding */}
        <Slot
          label="FEATURED"
          size="large"
          position="absolute"
          top="8%"
          left="-4%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={15}
          bleed="left"
          bleedAmount="lg"
          annotationNumber="001"
        />

        {/* Slot 2: Medium right */}
        <Slot
          label="AW25"
          size="medium"
          position="absolute"
          top="10%"
          right="8%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
        />

        {/* Slot 3: Small overlapping */}
        <Slot
          label="PROCESS"
          size="small"
          position="absolute"
          top="45%"
          right="20%"
          rotation={-5}
          clip="organic-1"
          zIndex={22}
          overlapX={60}
          decoration="pin"
        />

        {/* Slot 4: Tiny accent */}
        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          top="60%"
          left="15%"
          rotation={-10}
          clip="notch-1"
          zIndex={25}
          decoration="clip"
        />

        {/* Slot 5-7: Swatch cluster */}
        <Slot
          label="A"
          size="swatch"
          position="absolute"
          top="30%"
          left="35%"
          rotation={12}
          border="rough"
          zIndex={20}
          decoration="tape-top"
        />

        <Slot
          label="B"
          size="swatch"
          position="absolute"
          top="33%"
          left="42%"
          rotation={-8}
          border="accent"
          zIndex={21}
          overlapX={20}
        />

        <Slot
          label="C"
          size="swatch"
          position="absolute"
          top="36%"
          left="49%"
          rotation={5}
          border="thin"
          zIndex={23}
          overlapX={25}
        />

        {/* Slot 8: Medium-wide bottom */}
        <Slot
          label="ARCHIVE"
          size="medium-wide"
          position="absolute"
          bottom="20%"
          left="5%"
          rotation={2}
          clip="wave-1"
          shadow="soft"
          zIndex={12}
          sepia
        />

        {/* Slot 9: Small right bleeding */}
        <Slot
          label="SKETCH"
          size="small"
          position="absolute"
          bottom="30%"
          right="-2%"
          rotation={-6}
          clip="torn-2"
          zIndex={16}
          bleed="right"
          bleedAmount="md"
          grayscale
        />

        {/* Slot 10: Micro */}
        <Slot
          label="04"
          size="micro"
          position="absolute"
          top="50%"
          left="55%"
          rotation={15}
          border="accent"
          zIndex={28}
          decoration="pin-red"
        />

        {/* Annotations */}
        <AnnotationLabel
          text="collections"
          position={{ top: '12%', left: '50%' }}
          rotation={-3}
          variant="tag"
        />
        <AnnotationLabel
          text="view all"
          position={{ top: '55%', right: '35%' }}
          rotation={5}
          variant="handwritten"
        />
        <AnnotationLabel
          text="2024-25"
          position={{ bottom: '25%', left: '40%' }}
          rotation={-2}
          variant="stamp"
        />

        {/* Main title with experimental typography */}
        <div className="relative z-30 pt-44 pb-16 px-8 md:px-16 lg:px-24">
          <div className="max-w-5xl">
            <LabelText
              text="THE YON — Collections"
              style={{ fontSize: '0.55rem' }}
            />

            <LayeredTitle
              text="Collections"
              size="large"
              layerStyle="triple"
              offsetX={5}
              offsetY={5}
              layerOpacity={0.08}
              layerColor="#8B7355"
              charRotation
              rotationIntensity={2}
              className="mt-6"
              style={{
                fontSize: 'clamp(3rem, 7vw, 6rem)',
                letterSpacing: '-0.03em',
                transform: 'rotate(-1.5deg)',
                lineHeight: 0.95,
              }}
              as="h1"
            />

            <p
              className="font-sans text-yon-grey/60 mt-10 max-w-lg"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginLeft: '3rem',
                transform: 'rotate(0.5deg)',
              }}
            >
              Experimental fashion explorations. Each collection challenges conventional construction,
              material, and form. Work in progress, failures documented.
            </p>

            <ExperimentalText
              text="컬렉션 — 실험적 패션"
              variant="micro"
              effect="scatter"
              intensity="subtle"
              className="block mt-4"
              style={{
                marginLeft: '3rem',
                color: 'rgba(122, 122, 122, 0.3)',
              }}
            />
          </div>
        </div>

        {/* Filter controls */}
        <div className="relative z-30 px-8 md:px-16 lg:px-24 pb-12">
          <div className="flex flex-wrap items-center gap-8">
            {/* Status filter */}
            <div className="flex items-center gap-3">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveFilter(option.id)}
                  className={`font-mono uppercase tracking-[0.15em] transition-all ${
                    activeFilter === option.id
                      ? 'text-yon-black border-b border-yon-black'
                      : 'text-yon-grey/40 hover:text-yon-grey/70'
                  }`}
                  style={{ fontSize: '0.6rem', paddingBottom: '2px' }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <span className="text-yon-grey/20">|</span>

            {/* Season filter */}
            <div className="flex items-center gap-3">
              {seasonOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveSeason(option.id)}
                  className={`font-mono uppercase tracking-[0.15em] transition-all ${
                    activeSeason === option.id
                      ? 'text-yon-black border-b border-yon-black'
                      : 'text-yon-grey/40 hover:text-yon-grey/70'
                  }`}
                  style={{ fontSize: '0.6rem', paddingBottom: '2px' }}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {/* Count */}
            <span
              className="ml-auto font-mono text-yon-grey/30"
              style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
            >
              {filteredCollections.length} Projects
            </span>
          </div>
        </div>
      </section>

      {/* ============================================
          COLLECTIONS - Dense Moodboard Grid
          ============================================ */}
      <section className="relative">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-10 h-10 border border-yon-grey/20 border-t-yon-black rounded-full animate-spin" />
            <span
              className="font-mono uppercase tracking-[0.2em] text-yon-grey/40"
              style={{ fontSize: '0.6rem' }}
            >
              Loading Collections
            </span>
          </div>
        ) : filteredCollections.length === 0 ? (
          <div className="text-center py-40">
            <p className="font-mono text-yon-grey/50" style={{ fontSize: '0.8rem' }}>
              No collections found.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all')
                setActiveSeason('all')
              }}
              className="mt-6 font-mono uppercase tracking-[0.15em] text-yon-black hover:text-yon-accent transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Reset Filters →
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFilter}-${activeSeason}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredCollections.map((collection, index) => (
                <CollectionMoodboard key={collection._id} collection={collection} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* ============================================
          ARCHIVE LINK - Dense Section
          ============================================ */}
      <section className="relative min-h-[60vh] py-24 px-8 md:px-16 lg:px-24 overflow-hidden texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-12%',
            fontSize: 'clamp(18rem, 45vw, 60rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          A
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-5%',
            fontSize: 'clamp(6rem, 15vw, 22rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#8B7355',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom',
          }}
          aria-hidden="true"
        >
          ARCHIVE
        </span>

        <div className="relative z-10 max-w-4xl">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            Research & Process
          </span>

          <h2
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              transform: 'rotate(-0.5deg)',
            }}
          >
            Archive
          </h2>

          <p
            className="font-sans text-yon-grey/60 mt-6 max-w-md"
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.8,
              marginLeft: '2rem',
            }}
          >
            Explorations, experiments, and documentation of the creative process.
            Failures are documented as essential steps toward discovery.
          </p>

          <Link
            href="/archive"
            className="inline-block mt-10 font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-yon-grey/20 hover:border-yon-black pb-1"
            style={{ fontSize: '0.6rem' }}
          >
            Enter Archive →
          </Link>
        </div>

        {/* Floating slots */}
        <Slot
          label="ARCHIVE"
          size="medium"
          position="absolute"
          top="10%"
          right="10%"
          rotation={-4}
          clip="irregular-4"
          shadow="float"
          grayscale
          zIndex={10}
          annotationNumber="A-001"
          decoration="tape-corner"
        />

        <Slot
          label="DOC"
          size="small"
          position="absolute"
          top="45%"
          right="25%"
          rotation={6}
          clip="torn-3"
          zIndex={12}
          sepia
        />

        <Slot
          label="PROCESS"
          size="tiny"
          position="absolute"
          bottom="25%"
          right="35%"
          rotation={-8}
          border="thin"
          zIndex={14}
          decoration="pin"
        />

        <Slot
          label="REF"
          size="swatch"
          position="absolute"
          bottom="15%"
          right="10%"
          rotation={10}
          border="rough"
          zIndex={11}
          grayscale
        />

        <Slot
          label="→"
          size="micro"
          position="absolute"
          top="30%"
          right="45%"
          rotation={-5}
          border="accent"
          zIndex={15}
        />

        <AnnotationLabel
          text="explore"
          position={{ top: '25%', right: '30%' }}
          rotation={4}
          variant="handwritten"
        />
        <AnnotationLabel
          text="RESEARCH"
          position={{ bottom: '35%', right: '20%' }}
          rotation={-3}
          variant="stamp"
        />
      </section>

      <Footer />
    </div>
  )
}
