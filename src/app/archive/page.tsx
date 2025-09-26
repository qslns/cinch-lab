'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  archiveEntries,
  philosophies,
  getArchiveStats,
  type ArchiveEntry,
  type Philosophy,
  type ArchiveStats
} from '@/data/archive'
import CipherText from '@/components/CipherText'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ArchivePage() {
  const [viewMode, setViewMode] = useState<'TIMELINE' | 'PHILOSOPHY' | 'CHRONICLE' | 'STATISTICS'>('TIMELINE')
  const [selectedEntry, setSelectedEntry] = useState<ArchiveEntry | null>(null)
  const [selectedPhilosophy, setSelectedPhilosophy] = useState<Philosophy | null>(null)
  const [filterType, setFilterType] = useState<'ALL' | ArchiveEntry['type']>('ALL')
  const [filterYear, setFilterYear] = useState<number | null>(null)
  const [mindState, setMindState] = useState('CONTEMPLATING')
  const [glitchActive, setGlitchActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax and transforms
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.2])
  const scaleParallax = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  const stats = getArchiveStats()

  useEffect(() => {
    // Mind state updates
    const mindInterval = setInterval(() => {
      const states = ['CONTEMPLATING', 'REMEMBERING', 'CREATING', 'ANALYZING', 'DREAMING', 'MANIFESTING']
      setMindState(states[Math.floor(Math.random() * states.length)])
    }, 3000)

    // Random glitch for mental effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.92) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 2000)

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.from('.archive-entry', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      })

      gsap.from('.philosophy-card', {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out'
      })

      // Floating thoughts animation
      gsap.to('.floating-thought', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 2,
          from: 'random'
        }
      })
    })

    return () => {
      clearInterval(mindInterval)
      clearInterval(glitchInterval)
      ctx.revert()
    }
  }, [])

  const filteredEntries = archiveEntries.filter(entry => {
    const typeMatch = filterType === 'ALL' || entry.type === filterType
    const yearMatch = !filterYear || entry.year === filterYear
    return typeMatch && yearMatch
  })

  const renderTimelineView = () => (
    <div className="relative">
      {/* Central Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-white via-safety-orange to-white opacity-40" />

      {/* Year Markers */}
      {[...new Set(filteredEntries.map(e => e.year))].sort((a, b) => b - a).map((year, yearIndex) => (
        <div key={year} className="relative mb-20">
          {/* Year Header */}
          <motion.div
            className="relative text-center mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: yearIndex * 0.1 }}
          >
            <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 bg-safety-orange flex items-center justify-center">
              <span className="text-2xl font-black text-carbon-black">{year}</span>
            </div>
          </motion.div>

          {/* Entries for this year */}
          <div className="mt-20 space-y-12">
            {filteredEntries.filter(e => e.year === year).map((entry, index) => (
              <motion.div
                key={entry.id}
                className={`archive-entry relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline Node */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 ${
                  entry.type === 'FAILURE' ? 'bg-glitch-red' :
                  entry.type === 'DISCOVERY' ? 'bg-hazmat-green' :
                  entry.type === 'COLLECTION' ? 'bg-safety-orange' :
                  entry.type === 'PHILOSOPHY' ? 'bg-glitch-cyan' :
                  'bg-white'
                } border-2 border-carbon-black`} />

                {/* Entry Card */}
                <div
                  className={`w-5/12 p-6 bg-white border-3 border-carbon-black cursor-pointer hover:border-safety-orange transition-all ${
                    index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                  }`}
                  onClick={() => setSelectedEntry(entry)}
                >
                  {/* Date Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono opacity-60">
                      {entry.month} {entry.day ? entry.day : ''}, {entry.year}
                    </span>
                    <span className={`px-2 py-1 text-xs font-mono font-bold ${
                      entry.type === 'FAILURE' ? 'bg-glitch-red text-white' :
                      entry.type === 'DISCOVERY' ? 'bg-hazmat-green text-carbon-black' :
                      entry.type === 'COLLECTION' ? 'bg-safety-orange text-white' :
                      entry.type === 'PHILOSOPHY' ? 'bg-glitch-cyan text-carbon-black' :
                      entry.type === 'EVENT' ? 'bg-concrete-gray text-white' :
                      'bg-carbon-black text-white'
                    }`}>
                      {entry.type}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-black mb-2">{entry.title}</h3>
                  <p className="text-sm italic opacity-60 mb-3">{entry.subtitle}</p>
                  <p className="text-xs leading-relaxed mb-4">{entry.content.substring(0, 150)}...</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-mono opacity-60">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Significance Indicator */}
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          i < entry.significance ? 'bg-safety-orange' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderPhilosophyView = () => (
    <div className="space-y-12">
      {philosophies.map((philosophy, index) => (
        <motion.div
          key={philosophy.id}
          className="philosophy-card relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div
            className="bg-white border-4 border-carbon-black p-8 cursor-pointer hover:border-safety-orange transition-all"
            onClick={() => setSelectedPhilosophy(philosophy)}
          >
            {/* Category Badge */}
            <div className="absolute -top-3 -left-3">
              <span className="bg-carbon-black text-white px-3 py-1 text-xs font-mono">
                {philosophy.category}
              </span>
            </div>

            {/* Content */}
            <h2 className="text-3xl font-black mb-4">
              <CipherText text={philosophy.title} />
            </h2>
            <div className="prose prose-sm max-w-none opacity-80">
              {philosophy.content.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Date */}
            <div className="mt-6 text-xs font-mono opacity-60">
              {philosophy.date}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderChronicleView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredEntries.map((entry, index) => (
        <motion.div
          key={entry.id}
          className="archive-entry"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
        >
          <div
            className={`h-full p-6 border-2 cursor-pointer transition-all ${
              entry.type === 'FAILURE' ? 'bg-glitch-red/10 border-glitch-red hover:bg-glitch-red/20' :
              entry.type === 'DISCOVERY' ? 'bg-hazmat-green/10 border-hazmat-green hover:bg-hazmat-green/20' :
              entry.type === 'COLLECTION' ? 'bg-safety-orange/10 border-safety-orange hover:bg-safety-orange/20' :
              'bg-white border-carbon-black hover:border-safety-orange'
            }`}
            onClick={() => setSelectedEntry(entry)}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono opacity-60">
                {entry.month.substring(0, 3)} {entry.year}
              </span>
              <span className="text-xs font-mono font-bold">
                {entry.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-black mb-2 line-clamp-2">{entry.title}</h3>
            <p className="text-xs italic opacity-60 mb-3">{entry.subtitle}</p>

            {/* Thoughts Preview */}
            {entry.thoughts.length > 0 && (
              <div className="mb-4 p-3 bg-carbon-black/5 border-l-2 border-carbon-black">
                <p className="text-xs italic">"{entry.thoughts[0]}"</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 ${
                      i < entry.significance ? 'bg-carbon-black' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] font-mono opacity-60">
                {entry.type}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderStatisticsView = () => (
    <div className="space-y-12">
      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border-3 border-carbon-black p-6">
          <h3 className="text-3xl font-black">{archiveEntries.length}</h3>
          <p className="text-xs font-mono opacity-60">TOTAL_ENTRIES</p>
        </div>
        <div className="bg-white border-3 border-carbon-black p-6">
          <h3 className="text-3xl font-black text-hazmat-green">
            {archiveEntries.filter(e => e.type === 'DISCOVERY').length}
          </h3>
          <p className="text-xs font-mono opacity-60">DISCOVERIES</p>
        </div>
        <div className="bg-white border-3 border-carbon-black p-6">
          <h3 className="text-3xl font-black text-glitch-red">
            {archiveEntries.filter(e => e.type === 'FAILURE').length}
          </h3>
          <p className="text-xs font-mono opacity-60">FAILURES</p>
        </div>
        <div className="bg-white border-3 border-carbon-black p-6">
          <h3 className="text-3xl font-black text-safety-orange">
            {archiveEntries.filter(e => e.significance === 5).length}
          </h3>
          <p className="text-xs font-mono opacity-60">SIGNIFICANT</p>
        </div>
      </div>

      {/* Yearly Breakdown */}
      <div>
        <h2 className="text-2xl font-black mb-6">YEARLY_ANALYSIS</h2>
        <div className="space-y-4">
          {stats.map((yearStat, index) => (
            <motion.div
              key={yearStat.year}
              className="bg-white border-2 border-carbon-black p-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black">{yearStat.year}</h3>
                <span className="text-sm font-mono opacity-60">
                  {yearStat.totalEntries} ENTRIES
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-xs">
                <div>
                  <span className="font-mono opacity-60">EXPERIMENTS:</span>
                  <span className="ml-2 font-bold">{yearStat.experiments}</span>
                </div>
                <div>
                  <span className="font-mono opacity-60">COLLECTIONS:</span>
                  <span className="ml-2 font-bold">{yearStat.collections}</span>
                </div>
                <div>
                  <span className="font-mono opacity-60">EVENTS:</span>
                  <span className="ml-2 font-bold">{yearStat.events}</span>
                </div>
                <div>
                  <span className="font-mono opacity-60 text-glitch-red">FAILURES:</span>
                  <span className="ml-2 font-bold">{yearStat.failures}</span>
                </div>
                <div>
                  <span className="font-mono opacity-60 text-hazmat-green">DISCOVERIES:</span>
                  <span className="ml-2 font-bold">{yearStat.discoveries}</span>
                </div>
              </div>

              {/* Visual Bar */}
              <div className="mt-4 h-2 bg-gray-200 relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-hazmat-green"
                  style={{ width: `${(yearStat.discoveries / yearStat.totalEntries) * 100}%` }}
                />
                <div
                  className="absolute right-0 top-0 h-full bg-glitch-red"
                  style={{ width: `${(yearStat.failures / yearStat.totalEntries) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black text-white relative">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      {glitchActive && <div className="fixed inset-0 noise-overlay pointer-events-none" />}

      {/* Floating Thoughts Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: opacityParallax }}
      >
        {['GENIUS', 'CREATION', 'DESTRUCTION', 'TRANSFORMATION', 'CINCH•RELEASE•REPEAT'].map((thought, i) => (
          <div
            key={thought}
            className={`floating-thought absolute text-6xl font-black text-white/5 ${
              i % 2 === 0 ? 'rotate-12' : '-rotate-12'
            }`}
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`
            }}
          >
            {thought}
          </div>
        ))}
      </motion.div>

      {/* Header */}
      <section className="relative py-24 px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          style={{ y: yParallax }}
        >
          <h1 className="text-[clamp(60px,10vw,180px)] font-black mb-8 leading-[0.85]">
            <CipherText text="ARCHIVE" />
          </h1>
          <p className="text-sm font-mono opacity-60 mb-4">
            MENTAL LANDSCAPE • PHILOSOPHICAL RECORDS • GENIUS MANIFESTED
          </p>
          <p className="text-lg italic opacity-80 max-w-2xl mx-auto mb-8">
            "CINCH LAB은 최고이자 난 천재야"
          </p>

          {/* Mind State Display */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="text-xs font-mono">
              <span className="opacity-60">MIND_STATE:</span>
              <span className={`ml-2 ${
                mindState === 'CREATING' ? 'text-hazmat-green' :
                mindState === 'DREAMING' ? 'text-glitch-cyan' :
                'text-safety-orange'
              }`}>
                {mindState}
              </span>
            </div>
            <div className="text-xs font-mono">
              <span className="opacity-60">ENTRIES:</span>
              <span className="ml-2">{archiveEntries.length}</span>
            </div>
            <div className="text-xs font-mono">
              <span className="opacity-60">PHILOSOPHIES:</span>
              <span className="ml-2">{philosophies.length}</span>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* View Mode */}
            <div className="flex gap-2">
              {(['TIMELINE', 'PHILOSOPHY', 'CHRONICLE', 'STATISTICS'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    viewMode === mode
                      ? 'bg-white text-carbon-black'
                      : 'bg-transparent text-white/60 hover:text-white border border-white/20'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Filters (not for Philosophy view) */}
            {viewMode !== 'PHILOSOPHY' && viewMode !== 'STATISTICS' && (
              <>
                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="px-3 py-2 bg-transparent border border-white/20 text-xs font-mono text-white"
                  >
                    <option value="ALL">ALL_TYPES</option>
                    <option value="EXPERIMENT">EXPERIMENT</option>
                    <option value="COLLECTION">COLLECTION</option>
                    <option value="EVENT">EVENT</option>
                    <option value="FAILURE">FAILURE</option>
                    <option value="DISCOVERY">DISCOVERY</option>
                  </select>

                  <select
                    value={filterYear || ''}
                    onChange={(e) => setFilterYear(e.target.value ? Number(e.target.value) : null)}
                    className="px-3 py-2 bg-transparent border border-white/20 text-xs font-mono text-white"
                  >
                    <option value="">ALL_YEARS</option>
                    {[...new Set(archiveEntries.map(e => e.year))].sort((a, b) => b - a).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'TIMELINE' && renderTimelineView()}
          {viewMode === 'PHILOSOPHY' && renderPhilosophyView()}
          {viewMode === 'CHRONICLE' && renderChronicleView()}
          {viewMode === 'STATISTICS' && renderStatisticsView()}
        </div>
      </section>

      {/* Entry Detail Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEntry(null)}
              className="fixed inset-0 bg-carbon-black/95 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-8 md:inset-16 bg-white text-carbon-black z-50 overflow-auto"
            >
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-4xl font-black mb-2">{selectedEntry.title}</h2>
                    <p className="text-lg italic opacity-60">{selectedEntry.subtitle}</p>
                    <div className="flex items-center gap-4 mt-4">
                      <span className="text-xs font-mono opacity-60">
                        {selectedEntry.month} {selectedEntry.day}, {selectedEntry.year}
                      </span>
                      <span className={`px-2 py-1 text-xs font-mono font-bold ${
                        selectedEntry.type === 'FAILURE' ? 'bg-glitch-red text-white' :
                        selectedEntry.type === 'DISCOVERY' ? 'bg-hazmat-green text-carbon-black' :
                        selectedEntry.type === 'COLLECTION' ? 'bg-safety-orange text-white' :
                        'bg-carbon-black text-white'
                      }`}>
                        {selectedEntry.type}
                      </span>
                      <span className="text-xs font-mono opacity-60">
                        {selectedEntry.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="w-12 h-12 flex items-center justify-center bg-carbon-black text-white hover:bg-glitch-red transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {/* Content */}
                <div className="mb-8">
                  <h3 className="text-lg font-black mb-4">RECORD</h3>
                  <p className="text-lg leading-relaxed">{selectedEntry.content}</p>
                </div>

                {/* Thoughts */}
                {selectedEntry.thoughts.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-black mb-4">THOUGHTS</h3>
                    <div className="space-y-3">
                      {selectedEntry.thoughts.map((thought, i) => (
                        <div key={i} className="p-4 bg-carbon-black/5 border-l-4 border-safety-orange">
                          <p className="italic">{thought}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mb-8">
                  <h3 className="text-lg font-black mb-4">TAGS</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-carbon-black text-white text-xs font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Significance */}
                <div className="mb-8">
                  <h3 className="text-lg font-black mb-4">SIGNIFICANCE</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex gap-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-8 h-8 ${
                            i < selectedEntry.significance
                              ? 'bg-safety-orange'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-mono opacity-60">
                      LEVEL {selectedEntry.significance}/5
                    </span>
                  </div>
                </div>

                {/* Related Links */}
                <div className="border-t-2 border-carbon-black pt-6">
                  <div className="flex gap-4">
                    {selectedEntry.relatedExperiments && (
                      <Link href="/lab" className="text-sm font-mono underline">
                        VIEW_RELATED_EXPERIMENTS →
                      </Link>
                    )}
                    {selectedEntry.relatedCollections && (
                      <Link href="/collections" className="text-sm font-mono underline">
                        VIEW_RELATED_COLLECTIONS →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Philosophy Detail Modal */}
      <AnimatePresence>
        {selectedPhilosophy && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhilosophy(null)}
              className="fixed inset-0 bg-carbon-black/95 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-8 md:inset-16 bg-white text-carbon-black z-50 overflow-auto flex items-center justify-center"
            >
              <div className="max-w-4xl w-full p-12">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhilosophy(null)}
                  className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-carbon-black text-white hover:bg-glitch-red transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>

                {/* Philosophy Content */}
                <div className="text-center">
                  <span className="text-xs font-mono opacity-60">{selectedPhilosophy.category}</span>
                  <h2 className="text-5xl font-black mt-4 mb-8">{selectedPhilosophy.title}</h2>

                  <div className="text-xl leading-loose max-w-3xl mx-auto">
                    {selectedPhilosophy.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className="mb-6">
                        {paragraph.split('\n').map((line, j) => (
                          <span key={j}>
                            {line}
                            {j < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>

                  <div className="mt-12 text-xs font-mono opacity-60">
                    {selectedPhilosophy.date}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-carbon-black/80 backdrop-blur-sm border-t border-white/10 p-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB_ARCHIVE • MENTAL_LANDSCAPE • {archiveEntries.length} MEMORIES
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-mono opacity-60">
              FAILURES: {archiveEntries.filter(e => e.type === 'FAILURE').length}
            </span>
            <span className="text-[10px] font-mono opacity-60">
              DISCOVERIES: {archiveEntries.filter(e => e.type === 'DISCOVERY').length}
            </span>
            <span className="text-[10px] font-mono opacity-60">
              PHILOSOPHIES: {philosophies.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}