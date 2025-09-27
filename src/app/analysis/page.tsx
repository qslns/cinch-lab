'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  DeconstructedHover,
  SacaiLayer,
  FragmentMosaic,
  ExposedStructure,
  AsymmetricTransform
} from '@/components/HybridLayerEffects'

// Brand analyses
const brandAnalyses = [
  {
    id: '001',
    brand: 'BALENCIAGA',
    season: 'FW24',
    rating: 8.5,
    category: 'VOLUME',
    analysis: 'Demna continues to push boundaries of silhouette. The oversized shoulders are not just fashion—they are architecture.',
    strengths: ['Silhouette Innovation', 'Cultural Commentary', 'Technical Execution'],
    weaknesses: ['Repetitive Themes', 'Accessibility'],
    verdict: 'PROGRESSIVE'
  },
  {
    id: '002',
    brand: 'COMME DES GARÇONS',
    season: 'SS24',
    rating: 9.2,
    category: 'DECONSTRUCTION',
    analysis: 'Rei Kawakubo remains the master. Each piece is a question about the nature of clothing itself.',
    strengths: ['Conceptual Depth', 'Pattern Innovation', 'Artistic Vision'],
    weaknesses: ['Commercial Viability'],
    verdict: 'GENIUS'
  },
  {
    id: '003',
    brand: 'BOTTEGA VENETA',
    season: 'SS24',
    rating: 7.8,
    category: 'CRAFT',
    analysis: 'Matthieu Blazy elevates leather to art. The intrecciato is no longer technique—it is philosophy.',
    strengths: ['Material Mastery', 'Subtle Innovation', 'Luxury Positioning'],
    weaknesses: ['Limited Risk-Taking', 'Price Accessibility'],
    verdict: 'REFINED'
  },
  {
    id: '004',
    brand: 'YOHJI YAMAMOTO',
    season: 'FW24',
    rating: 8.9,
    category: 'PHILOSOPHY',
    analysis: 'Black is still the answer. Yohji proves that consistency is not stagnation—it is mastery.',
    strengths: ['Tailoring Excellence', 'Poetic Vision', 'Timeless Appeal'],
    weaknesses: ['Limited Color Palette', 'Market Expansion'],
    verdict: 'ETERNAL'
  },
  {
    id: '005',
    brand: 'JACQUEMUS',
    season: 'SS24',
    rating: 6.5,
    category: 'MARKETING',
    analysis: 'Simon Porte creates Instagram moments, not fashion moments. The micro bag is a meme, not design.',
    strengths: ['Social Media Mastery', 'Brand Building', 'Accessibility'],
    weaknesses: ['Technical Depth', 'Innovation', 'Longevity'],
    verdict: 'COMMERCIAL'
  },
  {
    id: '006',
    brand: 'LOEWE',
    season: 'FW24',
    rating: 8.7,
    category: 'CRAFT',
    analysis: 'Jonathan Anderson balances surrealism with wearability. The trompe l\'oeil pieces are both joke and genius.',
    strengths: ['Artistic Direction', 'Leather Craft', 'Brand Revival'],
    weaknesses: ['Price Point', 'Narrow Aesthetic'],
    verdict: 'INTELLIGENT'
  }
]

// Analysis categories
const categories = ['ALL', 'VOLUME', 'DECONSTRUCTION', 'CRAFT', 'PHILOSOPHY', 'MARKETING']
const verdicts = ['ALL', 'GENIUS', 'PROGRESSIVE', 'ETERNAL', 'REFINED', 'INTELLIGENT', 'COMMERCIAL']

type ViewMode = 'CRITIQUE' | 'COMPARISON' | 'TIMELINE' | 'MATRIX'

export default function AnalysisPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<typeof brandAnalyses[0] | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('CRITIQUE')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [activeVerdict, setActiveVerdict] = useState('ALL')
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform values
  const criticalThinking = useTransform(scrollYProgress, [0, 1], [0, 100])
  const intellectualDepth = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100])

  // Filter analyses
  const filteredAnalyses = brandAnalyses.filter(analysis => {
    const categoryMatch = activeCategory === 'ALL' || analysis.category === activeCategory
    const verdictMatch = activeVerdict === 'ALL' || analysis.verdict === activeVerdict
    return categoryMatch && verdictMatch
  })

  // Critical thoughts
  const [currentThought, setCurrentThought] = useState('')
  useEffect(() => {
    const thoughts = [
      'Fashion is not art, but it can be...',
      'Commerce kills creativity, slowly...',
      'True innovation is always uncomfortable...',
      'Copying is not referencing...',
      'Hype is the enemy of design...'
    ]
    const interval = setInterval(() => {
      setCurrentThought(thoughts[Math.floor(Math.random() * thoughts.length)])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const renderCritiqueView = () => (
    <div className="space-y-8">
      {filteredAnalyses.map((analysis, index) => (
        <motion.div
          key={analysis.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setSelectedAnalysis(analysis)}
          className="cursor-pointer"
        >
          <DeconstructedHover intensity={1.5}>
            <ExposedStructure showGrid={selectedAnalysis?.id === analysis.id}>
              <div className="p-8 bg-white-1 border-2 border-gray-plaster">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      ANALYSIS_{analysis.id} • {analysis.season}
                    </div>
                    <h3 className="text-4xl font-black mb-2">{analysis.brand}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-xs px-2 py-1 bg-black-100 text-white-0">
                        {analysis.category}
                      </span>
                      <span className={`text-sm font-mono font-bold ${
                        analysis.verdict === 'GENIUS' ? 'text-hybrid-blue' :
                        analysis.verdict === 'PROGRESSIVE' ? 'text-hybrid-red' :
                        analysis.verdict === 'ETERNAL' ? 'text-black-100' :
                        'text-gray-steel'
                      }`}>
                        {analysis.verdict}
                      </span>
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="text-right">
                    <div className="text-3xl font-black">{analysis.rating}</div>
                    <div className="text-micro font-mono text-gray-steel">/ 10</div>
                  </div>
                </div>

                {/* Analysis */}
                <p className="text-lg leading-relaxed mb-6 italic">
                  "{analysis.analysis}"
                </p>

                {/* Strengths & Weaknesses */}
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-mono font-black mb-2 text-hybrid-blue">STRENGTHS</h4>
                    <ul className="space-y-1">
                      {analysis.strengths.map(strength => (
                        <li key={strength} className="text-sm">+ {strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-black mb-2 text-hybrid-red">WEAKNESSES</h4>
                    <ul className="space-y-1">
                      {analysis.weaknesses.map(weakness => (
                        <li key={weakness} className="text-sm">- {weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ExposedStructure>
          </DeconstructedHover>
        </motion.div>
      ))}
    </div>
  )

  const renderComparisonView = () => (
    <div>
      <div className="mb-8 p-4 bg-gray-plaster/20 border border-gray-plaster">
        <p className="text-xs font-mono mb-4">SELECT BRANDS TO COMPARE (MAX 3)</p>
        <div className="flex gap-2 flex-wrap">
          {brandAnalyses.map(analysis => (
            <button
              key={analysis.id}
              onClick={() => {
                if (selectedBrands.includes(analysis.brand)) {
                  setSelectedBrands(selectedBrands.filter(b => b !== analysis.brand))
                } else if (selectedBrands.length < 3) {
                  setSelectedBrands([...selectedBrands, analysis.brand])
                }
              }}
              className={`px-3 py-1 text-xs font-mono transition-all ${
                selectedBrands.includes(analysis.brand)
                  ? 'bg-black-100 text-white-0'
                  : 'bg-white-0 border border-gray-plaster hover:border-black-100'
              }`}
            >
              {analysis.brand}
            </button>
          ))}
        </div>
      </div>

      {selectedBrands.length >= 2 && (
        <div className={`grid grid-cols-${selectedBrands.length} gap-4`}>
          {selectedBrands.map(brand => {
            const analysis = brandAnalyses.find(a => a.brand === brand)!
            return (
              <SacaiLayer key={brand} layers={2}>
                <div className="p-6 bg-white-0 border-2 border-black-100">
                  <h3 className="text-2xl font-black mb-4">{brand}</h3>
                  <div className="space-y-4">
                    <div>
                      <span className="text-micro font-mono">RATING</span>
                      <div className="text-3xl font-black">{analysis.rating}</div>
                    </div>
                    <div>
                      <span className="text-micro font-mono">CATEGORY</span>
                      <div className="text-sm font-bold">{analysis.category}</div>
                    </div>
                    <div>
                      <span className="text-micro font-mono">VERDICT</span>
                      <div className="text-sm font-bold">{analysis.verdict}</div>
                    </div>
                    <div>
                      <span className="text-micro font-mono">STRENGTHS</span>
                      <div className="text-xs mt-1">{analysis.strengths.length} identified</div>
                    </div>
                    <div>
                      <span className="text-micro font-mono">WEAKNESSES</span>
                      <div className="text-xs mt-1">{analysis.weaknesses.length} identified</div>
                    </div>
                  </div>
                </div>
              </SacaiLayer>
            )
          })}
        </div>
      )}
    </div>
  )

  const renderTimelineView = () => (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-plaster" />

      {filteredAnalyses.map((analysis, index) => (
        <motion.div
          key={analysis.id}
          className="relative flex items-center mb-12 ml-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Timeline node */}
          <div className="absolute -left-8 w-4 h-4 bg-black-100" />

          {/* Season marker */}
          <div className="absolute -left-20 text-micro font-mono text-gray-steel">
            {analysis.season}
          </div>

          <AsymmetricTransform intensity={1}>
            <div
              className="flex-1 p-6 bg-white-0 border border-gray-plaster cursor-pointer hover:border-black-100"
              onClick={() => setSelectedAnalysis(analysis)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black">{analysis.brand}</h3>
                  <p className="text-sm opacity-60 mt-1">{analysis.analysis}</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black">{analysis.rating}</div>
                  <div className="text-xs font-mono">{analysis.verdict}</div>
                </div>
              </div>
            </div>
          </AsymmetricTransform>
        </motion.div>
      ))}
    </div>
  )

  const renderMatrixView = () => (
    <FragmentMosaic fragments={16}>
      <div className="grid grid-cols-4 gap-0">
        {filteredAnalyses.map((analysis, index) => (
          <motion.div
            key={analysis.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedAnalysis(analysis)}
          >
            <div className="aspect-square p-4 bg-white-1 border border-gray-plaster hover:bg-black-100 hover:text-white-0 transition-all">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="text-micro font-mono mb-1">
                    {analysis.season}
                  </div>
                  <h3 className="text-sm font-black mb-2">
                    {analysis.brand}
                  </h3>
                </div>
                <div>
                  <div className="text-2xl font-black mb-1">
                    {analysis.rating}
                  </div>
                  <div className="text-micro font-mono">
                    {analysis.verdict}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-hybrid-red opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </FragmentMosaic>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overlay-grid opacity-20" />
      </div>

      {/* Analysis Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>CRITICAL_THINKING: {Math.round(criticalThinking.get())}%</span>
              <span className="opacity-60">|</span>
              <span>BRANDS_ANALYZED: {filteredAnalyses.length}</span>
              <span className="opacity-60">|</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {currentThought}
              </motion.span>
            </div>
            <span>HONEST CRITIQUE • NO MERCY</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Title */}
          <ExposedStructure showMeasurements className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-micro font-mono text-hybrid-red mb-2">
                CRITICAL_ANALYSIS / BRAND_DISSECTION
              </div>
              <h1 className="text-display font-black tracking-tightest uppercase">
                <SacaiLayer layers={2}>
                  ANALYSIS
                </SacaiLayer>
              </h1>
              <div className="text-lg text-gray-steel mt-4 max-w-2xl">
                Honest critique of contemporary fashion. No brand is sacred.
                We analyze, dissect, and judge without mercy.
              </div>
            </motion.div>
          </ExposedStructure>

          {/* Controls */}
          <div className="mb-12 space-y-4">
            {/* View Mode */}
            <div className="flex gap-2">
              {(['CRITIQUE', 'COMPARISON', 'TIMELINE', 'MATRIX'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    viewMode === mode
                      ? 'bg-black-100 text-white-0'
                      : 'bg-white-0 text-black-100 border border-gray-plaster hover:border-black-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-3 py-1 text-xs font-mono border border-gray-plaster bg-white-0"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={activeVerdict}
                onChange={(e) => setActiveVerdict(e.target.value)}
                className="px-3 py-1 text-xs font-mono border border-gray-plaster bg-white-0"
              >
                {verdicts.map(verdict => (
                  <option key={verdict} value={verdict}>{verdict}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Analysis Display */}
          <div className="mb-20">
            {viewMode === 'CRITIQUE' && renderCritiqueView()}
            {viewMode === 'COMPARISON' && renderComparisonView()}
            {viewMode === 'TIMELINE' && renderTimelineView()}
            {viewMode === 'MATRIX' && renderMatrixView()}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedAnalysis && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnalysis(null)}
              className="fixed inset-0 bg-black-100/90 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-8 md:inset-16 bg-white-0 z-50 overflow-auto"
            >
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      {selectedAnalysis.season} ANALYSIS
                    </div>
                    <h2 className="text-6xl font-black mb-4">{selectedAnalysis.brand}</h2>
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-2 bg-black-100 text-white-0 text-sm">
                        {selectedAnalysis.category}
                      </span>
                      <span className="text-xl font-bold">
                        {selectedAnalysis.verdict}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAnalysis(null)}
                    className="w-12 h-12 bg-black-100 text-white-0 flex items-center justify-center hover:bg-hybrid-red transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {/* Rating */}
                <div className="mb-12 text-center">
                  <div className="text-8xl font-black">{selectedAnalysis.rating}</div>
                  <div className="text-sm font-mono text-gray-steel">OUT OF 10</div>
                </div>

                {/* Full Analysis */}
                <div className="mb-12">
                  <h3 className="text-lg font-black mb-4">FULL CRITIQUE</h3>
                  <p className="text-2xl leading-relaxed italic">
                    "{selectedAnalysis.analysis}"
                  </p>
                </div>

                {/* Detailed Assessment */}
                <div className="grid md:grid-cols-2 gap-12 mb-12">
                  <div>
                    <h3 className="text-lg font-black mb-6 text-hybrid-blue">WHAT WORKS</h3>
                    <ul className="space-y-4">
                      {selectedAnalysis.strengths.map(strength => (
                        <li key={strength} className="flex items-start">
                          <span className="text-2xl mr-4">+</span>
                          <div>
                            <div className="font-bold mb-1">{strength}</div>
                            <p className="text-sm opacity-60">
                              This aspect demonstrates understanding of contemporary fashion's demands.
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-black mb-6 text-hybrid-red">WHAT FAILS</h3>
                    <ul className="space-y-4">
                      {selectedAnalysis.weaknesses.map(weakness => (
                        <li key={weakness} className="flex items-start">
                          <span className="text-2xl mr-4">-</span>
                          <div>
                            <div className="font-bold mb-1">{weakness}</div>
                            <p className="text-sm opacity-60">
                              This limitation prevents the brand from achieving true innovation.
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Final Verdict */}
                <div className="p-8 bg-black-100 text-white-0">
                  <h3 className="text-lg font-black mb-4">FINAL VERDICT</h3>
                  <p className="text-xl">
                    {selectedAnalysis.verdict === 'GENIUS' && 'This is fashion at its highest level. Few understand this depth of creation.'}
                    {selectedAnalysis.verdict === 'PROGRESSIVE' && 'Moving fashion forward, but not yet revolutionary. The potential exists.'}
                    {selectedAnalysis.verdict === 'ETERNAL' && 'Timeless excellence that transcends trends. This is permanence in fashion.'}
                    {selectedAnalysis.verdict === 'REFINED' && 'Technically excellent, conceptually safe. Luxury without risk.'}
                    {selectedAnalysis.verdict === 'INTELLIGENT' && 'Smart fashion that understands its context. Clever, not genius.'}
                    {selectedAnalysis.verdict === 'COMMERCIAL' && 'Designed for sales, not for history. Fashion as product, not art.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}