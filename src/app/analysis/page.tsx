'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// ==========================================================================
// ANALYSIS PAGE - Technical Critique Layout
// Margiela × Sacai Critical Perspective
// ==========================================================================

interface BrandAnalysis {
  id: string
  brand: string
  season: string
  rating: number
  category: 'DECONSTRUCTION' | 'VOLUME' | 'CRAFT' | 'PHILOSOPHY' | 'COMMERCIAL'
  analysis: string
  strengths: string[]
  weaknesses: string[]
  verdict: 'GENIUS' | 'PROGRESSIVE' | 'ETERNAL' | 'REFINED' | 'INTELLIGENT' | 'COMMERCIAL'
  philosophy: string
}

const brandAnalyses: BrandAnalysis[] = [
  {
    id: '001',
    brand: 'BALENCIAGA',
    season: 'FW24',
    rating: 8.5,
    category: 'VOLUME',
    analysis: 'Demna continues to push the boundaries of silhouette. The oversized shoulders are not just fashion—they are architecture. Each piece questions our relationship with space and body.',
    strengths: ['Silhouette Innovation', 'Cultural Commentary', 'Technical Mastery'],
    weaknesses: ['Repetitive Themes', 'Price Accessibility'],
    verdict: 'PROGRESSIVE',
    philosophy: 'Fashion as social armor, protection through volume.'
  },
  {
    id: '002',
    brand: 'COMME DES GARÇONS',
    season: 'SS24',
    rating: 9.2,
    category: 'DECONSTRUCTION',
    analysis: 'Rei Kawakubo remains untouchable. Each piece is a philosophical question about the nature of clothing itself. The holes are not absence—they are presence.',
    strengths: ['Conceptual Depth', 'Pattern Innovation', 'Artistic Vision', 'Material Exploration'],
    weaknesses: ['Commercial Viability'],
    verdict: 'GENIUS',
    philosophy: 'Clothes are not clothes. They are ideas made wearable.'
  },
  {
    id: '003',
    brand: 'BOTTEGA VENETA',
    season: 'SS24',
    rating: 7.8,
    category: 'CRAFT',
    analysis: 'Matthieu Blazy elevates leather to poetry. The intrecciato is no longer technique—it is philosophy. But is perfection enough when fashion demands revolution?',
    strengths: ['Material Mastery', 'Subtle Innovation', 'Luxury Positioning'],
    weaknesses: ['Limited Risk-Taking', 'Conservative Vision'],
    verdict: 'REFINED',
    philosophy: 'Quiet luxury speaks volumes, but whispers can be lost.'
  },
  {
    id: '004',
    brand: 'YOHJI YAMAMOTO',
    season: 'FW24',
    rating: 8.9,
    category: 'PHILOSOPHY',
    analysis: 'Black is still the answer to questions we have not yet asked. Yohji proves that consistency is not stagnation—it is mastery through repetition.',
    strengths: ['Tailoring Excellence', 'Poetic Vision', 'Timeless Appeal'],
    weaknesses: ['Limited Evolution', 'Market Reach'],
    verdict: 'ETERNAL',
    philosophy: 'I make clothes for the woman who lives in the shadow.'
  },
  {
    id: '005',
    brand: 'JACQUEMUS',
    season: 'SS24',
    rating: 6.5,
    category: 'COMMERCIAL',
    analysis: 'Simon Porte creates Instagram moments, not fashion moments. The micro bag is a meme, not design. Success without substance.',
    strengths: ['Marketing Genius', 'Brand Building', 'Accessibility'],
    weaknesses: ['Technical Depth', 'Innovation', 'Longevity'],
    verdict: 'COMMERCIAL',
    philosophy: 'Fashion for the feed, not for the future.'
  },
  {
    id: '006',
    brand: 'LOEWE',
    season: 'FW24',
    rating: 8.7,
    category: 'CRAFT',
    analysis: 'Jonathan Anderson balances surrealism with wearability. The trompe l\'oeil pieces are both joke and genius—fashion that winks while it works.',
    strengths: ['Artistic Direction', 'Leather Craft', 'Brand Revival', 'Cultural Relevance'],
    weaknesses: ['Price Point', 'Narrow Aesthetic'],
    verdict: 'INTELLIGENT',
    philosophy: 'Craft meets concept, tradition meets tomorrow.'
  }
]

type ViewMode = 'CRITIQUE' | 'COMPARISON' | 'TIMELINE' | 'MATRIX'

export default function AnalysisPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<BrandAnalysis | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('CRITIQUE')
  const [activeCategory, setActiveCategory] = useState<BrandAnalysis['category'] | 'ALL'>('ALL')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Critical thoughts rotation
  const [currentThought, setCurrentThought] = useState(0)
  const thoughts = [
    'Fashion is not art, but it can be...',
    'Commerce kills creativity slowly...',
    'True innovation is always uncomfortable...',
    'Copying is not referencing...',
    'Hype is the enemy of design...'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % thoughts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const criticalThinking = useTransform(scrollYProgress, [0, 1], [0, 100])

  // Filter analyses
  const filteredAnalyses = brandAnalyses.filter(analysis =>
    activeCategory === 'ALL' || analysis.category === activeCategory
  )

  // Toggle brand selection for comparison
  const toggleBrandSelection = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand))
    } else if (selectedBrands.length < 3) {
      setSelectedBrands([...selectedBrands, brand])
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-raw-white relative">

      {/* Noise Background */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Dynamic Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, #000 0px, transparent 1px, transparent 100px, #000 101px),
              repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 100px, #000 101px)
            `
          }}
        />
      </motion.div>

      {/* Floating Critical Quote */}
      <motion.div
        className="fixed top-24 right-8 z-40 max-w-xs text-right"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <p className="text-xs font-mono text-carbon/50 italic">
          "{thoughts[currentThought]}"
        </p>
      </motion.div>

      {/* ==========================================================================
        HEADER - Critical Interface
        ========================================================================== */}

      <section className="relative pt-32 pb-16 px-8">
        <div className="absolute inset-0 material-paper opacity-20" />
        <div className="absolute inset-0 exposed-seam" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Status Bar */}
          <motion.div
            className="mb-12 bg-carbon text-raw-white p-4 font-mono text-xs"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="text-thread-red animate-pulse">●</span>
                <span>CRITICAL_ANALYSIS_v4.2</span>
                <span>|</span>
                <span>BRANDS: {filteredAnalyses.length}</span>
                <span>|</span>
                <motion.span>
                  THINKING: {Math.round(criticalThinking.get())}%
                </motion.span>
              </div>
              <span>HONEST_CRITIQUE_MODE</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-7xl md:text-9xl font-black mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            ANALYSIS
          </motion.h1>

          <motion.p
            className="text-xl text-carbon/70 max-w-3xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Honest critique of contemporary fashion. No brand is sacred.
            We analyze, dissect, and judge without mercy or commercial bias.
          </motion.p>

          {/* Controls */}
          <motion.div
            className="mt-12 flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* View Mode */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-carbon/50">View:</span>
              <div className="flex gap-1">
                {(['CRITIQUE', 'COMPARISON', 'TIMELINE', 'MATRIX'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`
                      px-4 py-2 text-xs font-mono uppercase transition-all
                      ${viewMode === mode
                        ? 'bg-carbon text-raw-white'
                        : 'bg-transparent text-carbon border border-carbon/20 hover:border-carbon/60'}
                    `}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-carbon/50">Category:</span>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value as any)}
                className="px-3 py-2 text-xs font-mono bg-transparent border border-carbon/20 focus:border-carbon outline-none"
              >
                <option value="ALL">ALL</option>
                <option value="DECONSTRUCTION">DECONSTRUCTION</option>
                <option value="VOLUME">VOLUME</option>
                <option value="CRAFT">CRAFT</option>
                <option value="PHILOSOPHY">PHILOSOPHY</option>
                <option value="COMMERCIAL">COMMERCIAL</option>
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
        ANALYSES DISPLAY
        ========================================================================== */}

      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* CRITIQUE VIEW */}
          {viewMode === 'CRITIQUE' && (
            <div className="space-y-8">
              {filteredAnalyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  onClick={() => setSelectedAnalysis(analysis)}
                  className="cursor-pointer"
                >
                  <div className="layer-card bg-raw-white p-8 group relative">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <div className="text-xs font-mono text-carbon/50 mb-2">
                          {analysis.season} • ANALYSIS_{analysis.id}
                        </div>
                        <h3 className="text-4xl font-black mb-3">
                          {analysis.brand}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 bg-carbon text-raw-white text-xs">
                            {analysis.category}
                          </span>
                          <span className={`text-xs font-mono font-bold
                            ${analysis.verdict === 'GENIUS' ? 'text-thread-white' :
                              analysis.verdict === 'PROGRESSIVE' ? 'text-thread-red' :
                              analysis.verdict === 'ETERNAL' ? 'text-carbon' :
                              'text-carbon/50'}
                          `}>
                            {analysis.verdict}
                          </span>
                        </div>
                      </div>
                      {/* Rating */}
                      <div className="text-right">
                        <div className="text-3xl font-black">{analysis.rating}</div>
                        <div className="text-xs font-mono text-carbon/40">/ 10</div>
                      </div>
                    </div>

                    {/* Analysis Text */}
                    <p className="text-lg leading-relaxed mb-6 italic text-carbon/80">
                      "{analysis.analysis}"
                    </p>

                    {/* Philosophy */}
                    <div className="p-4 bg-carbon/5 border-l-4 border-thread-red mb-6">
                      <p className="text-sm italic">
                        {analysis.philosophy}
                      </p>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-thread-white mb-3">
                          STRENGTHS
                        </h4>
                        <ul className="space-y-1">
                          {analysis.strengths.map(strength => (
                            <li key={strength} className="text-sm text-carbon/70">
                              + {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-thread-red mb-3">
                          WEAKNESSES
                        </h4>
                        <ul className="space-y-1">
                          {analysis.weaknesses.map(weakness => (
                            <li key={weakness} className="text-sm text-carbon/70">
                              - {weakness}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-thread-red/0 to-thread-red/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* COMPARISON VIEW */}
          {viewMode === 'COMPARISON' && (
            <div>
              {/* Brand Selector */}
              <div className="mb-8 p-6 bg-carbon/5 border border-carbon/20">
                <p className="text-xs font-mono uppercase tracking-wider mb-4">
                  Select brands to compare (max 3)
                </p>
                <div className="flex flex-wrap gap-2">
                  {brandAnalyses.map(analysis => (
                    <button
                      key={analysis.id}
                      onClick={() => toggleBrandSelection(analysis.brand)}
                      className={`
                        px-4 py-2 text-xs transition-all
                        ${selectedBrands.includes(analysis.brand)
                          ? 'bg-carbon text-raw-white'
                          : 'bg-raw-white border border-carbon/20 hover:border-carbon'}
                      `}
                    >
                      {analysis.brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comparison Grid */}
              {selectedBrands.length >= 2 && (
                <div className={`grid grid-cols-${selectedBrands.length} gap-6`}>
                  {selectedBrands.map(brand => {
                    const analysis = brandAnalyses.find(a => a.brand === brand)!
                    return (
                      <div key={brand} className="layer-card bg-raw-white p-6 h-full">
                        <h3 className="text-2xl font-black mb-6">{brand}</h3>

                        <div className="space-y-4">
                          <div>
                            <span className="text-xs font-mono text-carbon/50">RATING</span>
                            <div className="text-3xl font-black">{analysis.rating}</div>
                          </div>

                          <div>
                            <span className="text-xs font-mono text-carbon/50">CATEGORY</span>
                            <div className="text-sm font-bold">{analysis.category}</div>
                          </div>

                          <div>
                            <span className="text-xs font-mono text-carbon/50">VERDICT</span>
                            <div className="text-sm font-bold">{analysis.verdict}</div>
                          </div>

                          <div>
                            <span className="text-xs font-mono text-carbon/50">STRENGTHS</span>
                            <div className="text-xs mt-1">{analysis.strengths.length} identified</div>
                          </div>

                          <div>
                            <span className="text-xs font-mono text-carbon/50">WEAKNESSES</span>
                            <div className="text-xs mt-1">{analysis.weaknesses.length} identified</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* TIMELINE VIEW */}
          {viewMode === 'TIMELINE' && (
            <div className="relative">
              {/* Timeline spine */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-thread-red via-carbon/20 to-thread-white" />

              {filteredAnalyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  className="relative flex items-center mb-16"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-8 w-4 h-4 bg-raw-white border-2 border-carbon rounded-full -translate-x-1/2"
                    whileHover={{ scale: 1.5, borderColor: '#cc0000' }}
                  />

                  {/* Season marker */}
                  <div className="w-20 text-xs font-mono text-carbon/50">
                    {analysis.season}
                  </div>

                  {/* Content */}
                  <div className="flex-1 ml-12">
                    <div
                      className="hybrid-split bg-raw-white p-6 cursor-pointer hover:bg-carbon/5 transition-colors"
                      onClick={() => setSelectedAnalysis(analysis)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-2xl font-bold">{analysis.brand}</h3>
                          <p className="text-sm text-carbon/70 mt-1 line-clamp-1">
                            {analysis.analysis}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black">{analysis.rating}</div>
                          <div className="text-xs font-mono">{analysis.verdict}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* MATRIX VIEW */}
          {viewMode === 'MATRIX' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAnalyses.map((analysis, index) => (
                <motion.div
                  key={analysis.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  onClick={() => setSelectedAnalysis(analysis)}
                >
                  <div className="material-paper hover:material-fabric transition-all cursor-pointer h-full p-4">
                    <div className="flex flex-col h-full">
                      <div className="text-xs font-mono text-carbon/40 mb-1">
                        {analysis.season}
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        {analysis.brand}
                      </h3>
                      <div className="flex-grow" />
                      <div className="text-3xl font-black mb-1">
                        {analysis.rating}
                      </div>
                      <div className="text-xs font-mono text-carbon/50">
                        {analysis.verdict}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ==========================================================================
        DETAIL MODAL
        ========================================================================== */}

      <AnimatePresence>
        {selectedAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-carbon/95 backdrop-blur-xl z-50 overflow-auto"
            onClick={() => setSelectedAnalysis(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="min-h-screen py-16 px-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="max-w-5xl mx-auto">
                <div className="bg-raw-white p-8 md:p-12 relative">
                  <div className="absolute inset-0 exposed-seam pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="text-xs font-mono text-carbon/50 mb-2">
                          {selectedAnalysis.season} ANALYSIS
                        </div>
                        <h2 className="text-6xl font-black mb-4">
                          {selectedAnalysis.brand}
                        </h2>
                        <div className="flex items-center gap-4">
                          <span className="px-4 py-2 bg-carbon text-raw-white">
                            {selectedAnalysis.category}
                          </span>
                          <span className="text-xl font-bold">
                            {selectedAnalysis.verdict}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedAnalysis(null)}
                        className="text-4xl hover:text-thread-red transition-colors p-2"
                      >
                        ×
                      </button>
                    </div>

                    {/* Rating Display */}
                    <div className="text-center py-12">
                      <motion.div
                        className="text-9xl font-black"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                      >
                        {selectedAnalysis.rating}
                      </motion.div>
                      <div className="text-sm font-mono text-carbon/50">OUT OF 10</div>
                    </div>

                    {/* Full Analysis */}
                    <div className="mb-12">
                      <h3 className="text-lg font-bold mb-4">FULL CRITIQUE</h3>
                      <p className="text-2xl leading-relaxed italic">
                        "{selectedAnalysis.analysis}"
                      </p>
                    </div>

                    {/* Philosophy */}
                    <div className="mb-12 p-8 bg-carbon/5 border-l-4 border-thread-red">
                      <h3 className="text-lg font-bold mb-4">BRAND PHILOSOPHY</h3>
                      <p className="text-lg italic">
                        {selectedAnalysis.philosophy}
                      </p>
                    </div>

                    {/* Detailed Assessment */}
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                      {/* Strengths */}
                      <div>
                        <h3 className="text-lg font-bold mb-6 text-thread-white">WHAT WORKS</h3>
                        <ul className="space-y-4">
                          {selectedAnalysis.strengths.map(strength => (
                            <li key={strength} className="flex items-start">
                              <span className="text-2xl mr-4 text-thread-white">+</span>
                              <div>
                                <div className="font-bold mb-1">{strength}</div>
                                <p className="text-sm text-carbon/60">
                                  This demonstrates understanding of contemporary fashion's demands.
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Weaknesses */}
                      <div>
                        <h3 className="text-lg font-bold mb-6 text-thread-red">WHAT FAILS</h3>
                        <ul className="space-y-4">
                          {selectedAnalysis.weaknesses.map(weakness => (
                            <li key={weakness} className="flex items-start">
                              <span className="text-2xl mr-4 text-thread-red">-</span>
                              <div>
                                <div className="font-bold mb-1">{weakness}</div>
                                <p className="text-sm text-carbon/60">
                                  This limitation prevents achieving true innovation.
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Final Verdict */}
                    <div className="p-8 bg-carbon text-raw-white">
                      <h3 className="text-lg font-bold mb-4">FINAL VERDICT</h3>
                      <p className="text-xl font-light">
                        {selectedAnalysis.verdict === 'GENIUS' &&
                          'This is fashion at its highest level. Few understand this depth of creation.'}
                        {selectedAnalysis.verdict === 'PROGRESSIVE' &&
                          'Moving fashion forward, but not yet revolutionary. The potential exists.'}
                        {selectedAnalysis.verdict === 'ETERNAL' &&
                          'Timeless excellence that transcends trends. This is permanence in fashion.'}
                        {selectedAnalysis.verdict === 'REFINED' &&
                          'Technically excellent, conceptually safe. Luxury without risk.'}
                        {selectedAnalysis.verdict === 'INTELLIGENT' &&
                          'Smart fashion that understands its context. Clever, not genius.'}
                        {selectedAnalysis.verdict === 'COMMERCIAL' &&
                          'Designed for sales, not for history. Fashion as product, not art.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
        FOOTER STATEMENT
        ========================================================================== */}

      <section className="py-24 px-8 bg-gradient-to-b from-raw-white to-carbon text-raw-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            className="text-4xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            TRUTH OVER COMMERCE
          </motion.h3>
          <motion.p
            className="text-xl mb-12 text-raw-white/80 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We analyze without bias, critique without mercy, and judge without commercial influence.
            Fashion needs honest voices, not paid opinions.
          </motion.p>
        </div>
      </section>
    </div>
  )
}