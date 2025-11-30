'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

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

// View mode types
type ViewMode = 'grid' | 'timeline' | 'list'

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  )
}

function GridIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-colors ${active ? 'text-yon-black' : 'text-yon-grey'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

function TimelineIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-colors ${active ? 'text-yon-black' : 'text-yon-grey'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-4 h-4 transition-colors ${active ? 'text-yon-black' : 'text-yon-grey'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  )
}

// Grid View Item
function GridItem({ item, index }: { item: typeof archiveItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      layout
    >
      <motion.div
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Image placeholder with aspect ratio */}
        <div
          className="relative bg-yon-charcoal overflow-hidden"
          style={{ aspectRatio: index % 3 === 0 ? '3/4' : index % 3 === 1 ? '4/5' : '1/1' }}
        >
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-yon-black/80 via-yon-black/20 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* ID in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="font-mono text-[10px] text-yon-silver/40 tracking-[0.2em]"
              animate={{ opacity: isHovered ? 0.2 : 0.4 }}
            >
              {item.id}
            </motion.span>
          </div>

          {/* Status indicator */}
          <div className="absolute top-3 right-3">
            <motion.div
              className={`w-2 h-2 rounded-full ${item.status === 'current' ? 'bg-yon-accent' : 'bg-yon-silver/40'}`}
              animate={{ scale: isHovered && item.status === 'current' ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.6, repeat: isHovered && item.status === 'current' ? Infinity : 0 }}
            />
          </div>

          {/* Hover content */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-mono text-[9px] text-yon-accent tracking-[0.15em] uppercase">
              {item.category}
            </span>
            <h3 className="mt-1 font-serif text-lg text-yon-white leading-tight">
              {item.title}
            </h3>
          </motion.div>

          {/* Border */}
          <div className="absolute inset-0 border border-yon-silver/10" />
        </div>

        {/* Below card info */}
        <div className="mt-3 flex items-center justify-between">
          <span className="font-mono text-[9px] text-yon-grey tracking-[0.1em]">
            {item.season}
          </span>
          <span className="font-mono text-[9px] text-yon-grey/60 tracking-wider">
            {item.date}
          </span>
        </div>
      </motion.div>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="mt-4 p-4 bg-yon-ivory border border-yon-platinum"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-yon-steel leading-relaxed">
              {item.longDescription}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 font-mono text-[8px] text-yon-grey tracking-wider bg-yon-white border border-yon-platinum"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Timeline View Item
function TimelineItem({ item, index, isLast }: { item: typeof archiveItems[0]; index: number; isLast: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="relative pl-8 md:pl-12"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[7px] md:left-[11px] top-6 bottom-0 w-px bg-yon-platinum" />
      )}

      {/* Timeline dot */}
      <motion.div
        className={`absolute left-0 md:left-1 top-1.5 w-[14px] h-[14px] rounded-full border-2 ${
          item.status === 'current'
            ? 'border-yon-accent bg-yon-accent'
            : 'border-yon-silver bg-yon-white'
        }`}
        animate={{ scale: isHovered ? 1.3 : 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <div
        className="pb-10 md:pb-14 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-[10px] text-yon-grey tracking-wider">
            {item.date}
          </span>
          <span className="w-3 h-px bg-yon-silver" />
          <span className="font-mono text-[10px] text-yon-grey/60 tracking-[0.1em] uppercase">
            {item.category}
          </span>
        </div>

        <motion.h3
          className="font-serif text-xl md:text-2xl text-yon-black leading-tight"
          animate={{ x: isHovered ? 8 : 0, color: isHovered ? '#8B7355' : '#0A0A0A' }}
          transition={{ duration: 0.3 }}
        >
          {item.title}
        </motion.h3>

        <motion.p
          className="mt-2 text-sm text-yon-steel leading-relaxed max-w-lg"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {item.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="mt-3 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {item.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 font-mono text-[8px] text-yon-grey tracking-wider bg-yon-ivory"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Season badge */}
        <div className="absolute right-0 top-0">
          <span className={`font-mono text-[10px] tracking-wider ${
            item.status === 'current' ? 'text-yon-accent' : 'text-yon-grey/40'
          }`}>
            {item.season}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// List View Item
function ListItem({ item, index }: { item: typeof archiveItems[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group border-b border-yon-platinum last:border-b-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-5 md:py-6 grid md:grid-cols-12 gap-4 items-center cursor-pointer">
        {/* ID & Status */}
        <div className="md:col-span-2 flex items-center gap-3">
          <motion.div
            className={`w-1.5 h-1.5 rounded-full ${item.status === 'current' ? 'bg-yon-accent' : 'bg-yon-silver/40'}`}
            animate={{ scale: isHovered && item.status === 'current' ? [1, 1.5, 1] : 1 }}
            transition={{ duration: 0.4 }}
          />
          <span className="font-mono text-[10px] text-yon-grey tracking-wider">
            {item.id}
          </span>
        </div>

        {/* Title */}
        <motion.div
          className="md:col-span-4"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="font-serif text-lg text-yon-black group-hover:text-yon-accent transition-colors duration-300">
            {item.title}
          </h3>
        </motion.div>

        {/* Category */}
        <div className="md:col-span-2 hidden md:block">
          <span className="font-mono text-[10px] text-yon-grey tracking-[0.1em] uppercase">
            {item.category}
          </span>
        </div>

        {/* Season */}
        <div className="md:col-span-2 hidden md:block">
          <span className="font-mono text-[10px] text-yon-grey tracking-wider">
            {item.season}
          </span>
        </div>

        {/* Date & Arrow */}
        <div className="md:col-span-2 flex items-center justify-between">
          <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
            {item.date}
          </span>
          <motion.span
            className="text-yon-grey"
            animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </div>
      </div>

      {/* Expanded preview on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="pb-4 md:pl-[16.67%]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-sm text-yon-steel leading-relaxed max-w-xl">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ArchivePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])

  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSeason, setSelectedSeason] = useState('All')

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

  // Group by season for timeline view
  const groupedBySeason = useMemo(() => {
    const grouped: Record<string, typeof archiveItems> = {}
    filteredItems.forEach(item => {
      if (!grouped[item.season]) grouped[item.season] = []
      grouped[item.season].push(item)
    })
    return grouped
  }, [filteredItems])

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Hero Header */}
      <section className="relative pt-6 md:pt-8 pb-16 md:pb-24 px-6 md:px-8 lg:px-12 overflow-hidden">
        {/* Background decoration */}
        <motion.span
          className="absolute top-[-5%] right-[-10%] font-mono text-[40vw] md:text-[30vw] text-yon-platinum/10 leading-none select-none pointer-events-none"
          style={{ y: parallaxY }}
        >
          A
        </motion.span>

        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Title section */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                  Process & Research
                </span>
              </div>

              <h1 className="font-serif text-[16vw] md:text-[10vw] lg:text-[8vw] text-yon-black leading-[0.85]">
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  Arch
                </motion.span>
                <motion.span
                  className="block ml-[15%]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  ive
                </motion.span>
              </h1>

              <motion.p
                className="mt-8 text-lg md:text-xl text-yon-steel leading-relaxed max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Fragments of creation. Experiments preserved.
                The journey matters as much as the destination.
              </motion.p>
            </motion.div>

            {/* Stats & Info */}
            <motion.div
              className="md:col-span-4 md:col-start-9 md:pt-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-yon-grey/60 tracking-[0.15em] uppercase block mb-2">
                    Total Entries
                  </span>
                  <span className="font-serif text-4xl md:text-5xl text-yon-black">
                    {archiveItems.length}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-yon-grey/60 tracking-[0.15em] uppercase block mb-2">
                    Active Research
                  </span>
                  <span className="font-serif text-4xl md:text-5xl text-yon-accent">
                    {archiveItems.filter(i => i.status === 'current').length}
                  </span>
                </div>
                <div className="pt-4">
                  <span className="font-mono text-[10px] text-yon-grey/40 tracking-wider">
                    SS24 — AW25
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="sticky top-16 md:top-20 z-40 bg-yon-white/95 backdrop-blur-sm border-y border-yon-platinum py-4 px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-yon-grey">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 font-mono text-xs text-yon-black bg-transparent border border-yon-platinum focus:border-yon-grey focus:outline-none transition-colors placeholder:text-yon-grey/50"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 overflow-x-auto pb-1 md:pb-0">
              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="font-mono text-[10px] text-yon-grey tracking-wider bg-transparent border border-yon-platinum px-3 py-2 focus:border-yon-grey focus:outline-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Season filter */}
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="font-mono text-[10px] text-yon-grey tracking-wider bg-transparent border border-yon-platinum px-3 py-2 focus:border-yon-grey focus:outline-none cursor-pointer"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 border border-yon-platinum p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-yon-ivory' : 'hover:bg-yon-ivory/50'}`}
                aria-label="Grid view"
              >
                <GridIcon active={viewMode === 'grid'} />
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`p-2 transition-colors ${viewMode === 'timeline' ? 'bg-yon-ivory' : 'hover:bg-yon-ivory/50'}`}
                aria-label="Timeline view"
              >
                <TimelineIcon active={viewMode === 'timeline'} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-yon-ivory' : 'hover:bg-yon-ivory/50'}`}
                aria-label="List view"
              >
                <ListIcon active={viewMode === 'list'} />
              </button>
            </div>

            {/* Results count */}
            <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider whitespace-nowrap">
              {filteredItems.length} results
            </span>
          </div>
        </div>
      </section>

      {/* Archive Content */}
      <section className="py-12 md:py-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Grid View */}
            {viewMode === 'grid' && (
              <motion.div
                key="grid"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {filteredItems.map((item, index) => (
                  <GridItem key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && (
              <motion.div
                key="timeline"
                className="max-w-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {Object.entries(groupedBySeason).map(([season, items]) => (
                  <div key={season} className="mb-12">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="font-mono text-sm text-yon-black tracking-wider">
                        {season}
                      </span>
                      <span className="flex-1 h-px bg-yon-platinum" />
                    </div>
                    {items.map((item, index) => (
                      <TimelineItem
                        key={item.id}
                        item={item}
                        index={index}
                        isLast={index === items.length - 1}
                      />
                    ))}
                  </div>
                ))}
              </motion.div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* List header */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 pb-3 border-b border-yon-charcoal mb-2">
                  <span className="md:col-span-2 font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase">ID</span>
                  <span className="md:col-span-4 font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase">Title</span>
                  <span className="md:col-span-2 font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase">Category</span>
                  <span className="md:col-span-2 font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase">Season</span>
                  <span className="md:col-span-2 font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase">Date</span>
                </div>
                {filteredItems.map((item, index) => (
                  <ListItem key={item.id} item={item} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {filteredItems.length === 0 && (
            <motion.div
              className="py-20 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="font-mono text-[10px] text-yon-grey tracking-wider">
                No results found
              </span>
              <p className="mt-2 text-yon-steel">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-6 md:px-8 lg:px-12 bg-yon-ivory relative overflow-hidden">
        <motion.span
          className="absolute bottom-[-10%] left-[-5%] font-mono text-[50vw] md:text-[35vw] text-yon-platinum/15 leading-none select-none pointer-events-none"
          style={{ y: parallaxY }}
        >
          M
        </motion.span>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-yon-grey" />
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                Philosophy
              </span>
            </div>

            <h2 className="font-serif text-[8vw] md:text-[5vw] lg:text-[4vw] text-yon-black leading-[1.1]">
              <span className="block">The making</span>
              <span className="block ml-[10%]">is the meaning</span>
            </h2>

            <p className="mt-10 text-lg md:text-xl text-yon-steel leading-relaxed max-w-2xl">
              In a world of instant everything, THE YON chooses to slow down.
              Every stitch deliberate, every choice intentional.
              The process itself becomes the art.
            </p>

            <p className="mt-6 text-base text-yon-grey leading-relaxed max-w-xl">
              모든 것이 즉각적인 세상에서, 우리는 천천히 가기로 했습니다.
              과정 자체가 예술이 됩니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-6 md:px-8 lg:px-12 bg-yon-charcoal relative overflow-hidden">
        <span className="absolute top-8 right-8 font-mono text-[100px] md:text-[160px] text-yon-graphite/20 leading-none select-none pointer-events-none">
          →
        </span>

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] text-yon-silver/60 tracking-[0.2em] uppercase">
              Continue exploring
            </span>

            <div className="mt-8">
              <Link
                href="/collections"
                className="group inline-flex items-center gap-4"
              >
                <span className="font-serif text-3xl md:text-4xl lg:text-5xl text-yon-white group-hover:text-yon-platinum transition-colors duration-300">
                  View Collections
                </span>
                <motion.span
                  className="text-2xl text-yon-white"
                  initial={{ x: 0 }}
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </Link>
            </div>

            <p className="mt-8 font-mono text-[10px] text-yon-grey/50 tracking-wider">
              THE YON — Beyond Fashion
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
