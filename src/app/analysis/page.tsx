'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CipherText from '@/components/CipherText'

gsap.registerPlugin(ScrollTrigger)

// Analysis Subjects - Other brands and collections we critique
const analysisSubjects = [
  {
    id: 'ANALYSIS_001',
    brand: 'MAINSTREAM_FASHION_001',
    season: 'SS25',
    title: 'THE DEATH OF CREATIVITY',
    verdict: 'COMMERCIAL_SLAVERY',
    score: 2,
    critique: `Another collection that prioritizes sales over substance. Copy-paste designs from last season with different colors.
    Where is the experimentation? Where is the risk? This is not fashion, this is manufacturing.`,
    failures: [
      'No conceptual foundation',
      'Market-driven design',
      'Zero innovation',
      'Playing it safe'
    ],
    lesson: 'This is exactly what CINCH LAB will never become.'
  },
  {
    id: 'ANALYSIS_002',
    brand: 'LUXURY_HOUSE_002',
    season: 'FW24',
    title: 'LOGO WORSHIP',
    verdict: 'BRAND_BEFORE_DESIGN',
    score: 3,
    critique: `Relying on heritage and logos instead of pushing boundaries. The craftsmanship is there, but where is the soul?
    €10,000 for a bag that says nothing except "I can afford this."`,
    failures: [
      'Heritage as crutch',
      'Price over purpose',
      'Status symbol obsession',
      'Creative stagnation'
    ],
    lesson: 'Tradition without innovation is death.'
  },
  {
    id: 'ANALYSIS_003',
    brand: 'FAST_FASHION_003',
    season: 'CONTINUOUS',
    title: 'THE RACE TO THE BOTTOM',
    verdict: 'FASHION_APOCALYPSE',
    score: 0,
    critique: `52 micro-seasons a year. Copying runway looks within 2 weeks. Disposable clothes for disposable culture.
    This is the antithesis of everything fashion should represent.`,
    failures: [
      'Creativity replaced by algorithms',
      'Quantity over quality',
      'Trend slavery',
      'Environmental destruction'
    ],
    lesson: 'Speed kills creativity. Commerce kills art.'
  },
  {
    id: 'ANALYSIS_004',
    brand: 'EXPERIMENTAL_LABEL_004',
    season: 'AW24',
    title: 'ALMOST THERE',
    verdict: 'POTENTIAL_WASTED',
    score: 6,
    critique: `Interesting concepts undermined by commercial pressure. You can see where they wanted to go,
    but the need to sell pulled them back. So close to breakthrough, yet so far.`,
    failures: [
      'Compromised vision',
      'Half-measures',
      'Fear of failure',
      'Market considerations'
    ],
    lesson: 'You cannot serve two masters: art or commerce.'
  },
  {
    id: 'ANALYSIS_005',
    brand: 'STREETWEAR_BRAND_005',
    season: 'DROP_47',
    title: 'HYPE WITHOUT SUBSTANCE',
    verdict: 'EMPTY_CALORIES',
    score: 1,
    critique: `Limited drops, artificial scarcity, resale culture. This is not fashion, it\'s stock trading.
    A t-shirt is still just a t-shirt, no matter how "limited" you make it.`,
    failures: [
      'Scarcity as strategy',
      'Hype over design',
      'Resale focus',
      'No artistic vision'
    ],
    lesson: 'Exclusivity without excellence is fraud.'
  }
]

// Analysis Categories
const analysisCategories = [
  {
    id: 'CAT_001',
    name: 'CONCEPTUAL_FAILURE',
    description: 'Brands that have no philosophical foundation',
    count: 127
  },
  {
    id: 'CAT_002',
    name: 'COMMERCIAL_COMPROMISE',
    description: 'When money defeats creativity',
    count: 89
  },
  {
    id: 'CAT_003',
    name: 'TREND_SLAVERY',
    description: 'Following instead of leading',
    count: 234
  },
  {
    id: 'CAT_004',
    name: 'INNOVATION_VOID',
    description: 'Playing it safe, dying slowly',
    count: 156
  },
  {
    id: 'CAT_005',
    name: 'RARE_EXCELLENCE',
    description: 'The few who dare to experiment',
    count: 7
  }
]

// Comparison Metrics
const comparisonMetrics = {
  cinchLab: {
    creativity: 100,
    innovation: 100,
    commercialization: 0,
    compromise: 0,
    authenticity: 100,
    risk: 100,
    philosophy: 100
  },
  industryAverage: {
    creativity: 20,
    innovation: 15,
    commercialization: 95,
    compromise: 85,
    authenticity: 10,
    risk: 5,
    philosophy: 5
  }
}

export default function AnalysisPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [comparisonMode, setComparisonMode] = useState(false)
  const [verdictFilter, setVerdictFilter] = useState<'ALL' | 'FAILED' | 'POTENTIAL'>('ALL')
  const [analysisMode, setAnalysisMode] = useState<'CRITIQUE' | 'COMPARISON' | 'MANIFESTO'>('CRITIQUE')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax effects
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.95])

  useEffect(() => {
    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.from('.analysis-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })

      gsap.from('.category-stat', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out'
      })

      gsap.from('.metric-bar', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.5
      })
    })

    return () => ctx.revert()
  }, [])

  const filteredAnalyses = analysisSubjects.filter(analysis => {
    if (verdictFilter === 'ALL') return true
    if (verdictFilter === 'FAILED') return analysis.score < 5
    if (verdictFilter === 'POTENTIAL') return analysis.score >= 5
    return true
  })

  const renderCritiqueMode = () => (
    <div className="space-y-8">
      {filteredAnalyses.map((analysis) => (
        <motion.div
          key={analysis.id}
          className="analysis-card bg-white border-4 border-carbon-black p-8 cursor-pointer hover:border-glitch-red transition-all"
          onClick={() => setSelectedAnalysis(analysis.id)}
          whileHover={{ x: -10 }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-xs font-mono opacity-60">{analysis.brand} • {analysis.season}</span>
              <h3 className="text-3xl font-black mt-2">{analysis.title}</h3>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono opacity-60 mb-2">CINCH_SCORE</div>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-8 ${
                      i < analysis.score
                        ? analysis.score < 3 ? 'bg-glitch-red' :
                          analysis.score < 6 ? 'bg-warning-yellow' :
                          'bg-hazmat-green'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div className={`inline-block px-4 py-2 mb-6 text-sm font-mono font-bold ${
            analysis.score < 3 ? 'bg-glitch-red text-white' :
            analysis.score < 6 ? 'bg-warning-yellow text-carbon-black' :
            'bg-hazmat-green text-carbon-black'
          }`}>
            VERDICT: {analysis.verdict}
          </div>

          {/* Critique */}
          <p className="mb-6 leading-relaxed">{analysis.critique}</p>

          {/* Failures */}
          <div className="mb-6">
            <h4 className="text-xs font-mono opacity-60 mb-3">PRIMARY_FAILURES:</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.failures.map((failure, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs bg-carbon-black text-white"
                >
                  {failure}
                </span>
              ))}
            </div>
          </div>

          {/* Lesson */}
          <div className="pt-6 border-t-2 border-carbon-black">
            <p className="text-sm font-black italic">
              LESSON: {analysis.lesson}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderComparisonMode = () => (
    <div className="space-y-12">
      <div className="bg-white border-4 border-carbon-black p-8">
        <h3 className="text-2xl font-black mb-8">CINCH LAB VS. INDUSTRY AVERAGE</h3>

        {Object.keys(comparisonMetrics.cinchLab).map((metric) => (
          <div key={metric} className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-mono uppercase">{metric.replace('_', ' ')}</span>
              <div className="text-xs font-mono opacity-60">
                <span className="text-safety-orange">CINCH: {comparisonMetrics.cinchLab[metric as keyof typeof comparisonMetrics.cinchLab]}%</span>
                {' / '}
                <span>INDUSTRY: {comparisonMetrics.industryAverage[metric as keyof typeof comparisonMetrics.industryAverage]}%</span>
              </div>
            </div>

            {/* Comparison Bars */}
            <div className="relative h-8 bg-gray-100">
              {/* Industry Bar */}
              <div
                className="absolute top-0 left-0 h-4 bg-gray-400 metric-bar"
                style={{ width: `${comparisonMetrics.industryAverage[metric as keyof typeof comparisonMetrics.industryAverage]}%` }}
              />
              {/* CINCH Bar */}
              <div
                className="absolute bottom-0 left-0 h-4 bg-safety-orange metric-bar"
                style={{ width: `${comparisonMetrics.cinchLab[metric as keyof typeof comparisonMetrics.cinchLab]}%` }}
              />
            </div>
          </div>
        ))}

        <div className="mt-8 p-6 bg-carbon-black text-white">
          <p className="text-sm font-mono">
            CONCLUSION: While the industry chases profits, CINCH LAB chases perfection.
            We are not better—we are different. We are not competing—we are creating.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-glitch-red text-white p-6 text-center">
          <div className="text-3xl font-black mb-2">98%</div>
          <div className="text-xs font-mono">BRANDS_FAILED</div>
        </div>
        <div className="bg-warning-yellow text-carbon-black p-6 text-center">
          <div className="text-3xl font-black mb-2">2%</div>
          <div className="text-xs font-mono">SHOW_POTENTIAL</div>
        </div>
        <div className="bg-hazmat-green text-carbon-black p-6 text-center">
          <div className="text-3xl font-black mb-2">0.1%</div>
          <div className="text-xs font-mono">TRUE_INNOVATION</div>
        </div>
        <div className="bg-safety-orange text-white p-6 text-center">
          <div className="text-3xl font-black mb-2">1</div>
          <div className="text-xs font-mono">CINCH_LAB</div>
        </div>
      </div>
    </div>
  )

  const renderManifestoMode = () => (
    <div className="bg-white border-4 border-carbon-black p-12">
      <h2 className="text-4xl font-black mb-8 text-center">THE ANALYSIS MANIFESTO</h2>

      <div className="space-y-8 max-w-3xl mx-auto">
        <div>
          <h3 className="text-2xl font-black mb-4">WHY WE ANALYZE</h3>
          <p className="leading-relaxed">
            We don't analyze other brands out of spite or superiority. We analyze them to understand
            what fashion has become and why it must change. Every failed collection is a lesson.
            Every compromised vision is a warning. Every commercial success built on creative bankruptcy
            is a reminder of why CINCH LAB exists.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-black mb-4">THE PROBLEM</h3>
          <p className="leading-relaxed">
            Fashion has become a business first, art second (if at all). Designers design for buyers,
            not for expression. Collections are planned in boardrooms, not studios. Success is measured
            in sales, not in innovation. This is not fashion—this is retail.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-black mb-4">THE SOLUTION</h3>
          <p className="leading-relaxed">
            Complete rejection of the commercial model. No sales targets. No market research.
            No trend forecasting. No buyer feedback. Only pure creation, experimentation, and
            the relentless pursuit of the new. This is CINCH LAB.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-black mb-4">THE FUTURE</h3>
          <p className="leading-relaxed">
            We will continue to analyze, critique, and document the death of fashion as commerce
            takes over. But we will also create, experiment, and prove that another way is possible.
            We are not trying to change the industry—we are creating a new one.
          </p>
        </div>

        <div className="mt-12 p-8 bg-carbon-black text-white text-center">
          <p className="text-2xl font-black mb-4">
            "CINCH LAB은 최고이자 난 천재야"
          </p>
          <p className="text-sm font-mono opacity-80">
            This is not arrogance. This is necessity.
            <br />
            Someone must declare that the emperor has no clothes.
            <br />
            Someone must create without compromise.
            <br />
            That someone is us.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black text-white relative">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ scale: scaleParallax }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-glitch-red/5 via-transparent to-transparent" />
      </motion.div>

      {/* Header */}
      <section className="relative py-24 px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          style={{ y: yParallax }}
        >
          <h1 className="text-[clamp(60px,10vw,180px)] font-black mb-8 leading-[0.85]">
            <CipherText text="ANALYSIS" />
          </h1>
          <p className="text-sm font-mono opacity-60 mb-4">
            CRITIQUING THE INDUSTRY • EXPOSING MEDIOCRITY • CELEBRATING FAILURE
          </p>
          <p className="text-lg italic opacity-80 max-w-2xl mx-auto">
            "We analyze what fashion has become to understand what it should be."
          </p>
        </motion.div>
      </section>

      {/* Controls */}
      <section className="py-8 px-8 bg-concrete-gray">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Mode Selector */}
            <div className="flex gap-2">
              {(['CRITIQUE', 'COMPARISON', 'MANIFESTO'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setAnalysisMode(mode)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    analysisMode === mode
                      ? 'bg-white text-carbon-black'
                      : 'bg-transparent text-white border border-white/20 hover:border-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Filter (for Critique mode only) */}
            {analysisMode === 'CRITIQUE' && (
              <div className="flex gap-2">
                {(['ALL', 'FAILED', 'POTENTIAL'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setVerdictFilter(filter)}
                    className={`px-4 py-2 text-xs font-mono transition-all ${
                      verdictFilter === filter
                        ? 'bg-safety-orange text-carbon-black'
                        : 'bg-transparent text-white border border-white/20 hover:border-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      {analysisMode === 'CRITIQUE' && (
        <section className="py-8 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              {analysisCategories.map((category) => (
                <motion.div
                  key={category.id}
                  className="category-stat bg-white text-carbon-black p-4 text-center cursor-pointer hover:bg-safety-orange transition-colors"
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl font-black mb-2">{category.count}</div>
                  <div className="text-xs font-mono mb-1">{category.name.replace('_', ' ')}</div>
                  <div className="text-[10px] opacity-60">{category.description}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          {analysisMode === 'CRITIQUE' && renderCritiqueMode()}
          {analysisMode === 'COMPARISON' && renderComparisonMode()}
          {analysisMode === 'MANIFESTO' && renderManifestoMode()}
        </div>
      </section>

      {/* Analysis Detail Modal */}
      <AnimatePresence>
        {selectedAnalysis && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnalysis(null)}
              className="fixed inset-0 bg-carbon-black/95 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-8 md:inset-16 bg-white text-carbon-black z-50 overflow-auto"
            >
              <div className="p-12">
                {(() => {
                  const analysis = analysisSubjects.find(a => a.id === selectedAnalysis)
                  if (!analysis) return null

                  return (
                    <>
                      {/* Header */}
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <h2 className="text-4xl font-black mb-2">{analysis.title}</h2>
                          <p className="text-lg opacity-60">{analysis.brand} • {analysis.season}</p>
                        </div>
                        <button
                          onClick={() => setSelectedAnalysis(null)}
                          className="w-12 h-12 flex items-center justify-center bg-carbon-black text-white hover:bg-glitch-red transition-colors"
                        >
                          <span className="text-2xl">×</span>
                        </button>
                      </div>

                      {/* Score Visualization */}
                      <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-sm font-mono">CINCH_LAB_SCORE:</span>
                          <div className="flex gap-1">
                            {[...Array(10)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-6 h-12 ${
                                  i < analysis.score
                                    ? analysis.score < 3 ? 'bg-glitch-red' :
                                      analysis.score < 6 ? 'bg-warning-yellow' :
                                      'bg-hazmat-green'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-2xl font-black">{analysis.score}/10</span>
                        </div>
                        <div className={`inline-block px-6 py-3 text-lg font-mono font-bold ${
                          analysis.score < 3 ? 'bg-glitch-red text-white' :
                          analysis.score < 6 ? 'bg-warning-yellow text-carbon-black' :
                          'bg-hazmat-green text-carbon-black'
                        }`}>
                          {analysis.verdict}
                        </div>
                      </div>

                      {/* Full Critique */}
                      <div className="mb-8">
                        <h3 className="text-lg font-black mb-4">FULL ANALYSIS</h3>
                        <p className="text-lg leading-relaxed">{analysis.critique}</p>
                      </div>

                      {/* Detailed Failures */}
                      <div className="mb-8">
                        <h3 className="text-lg font-black mb-4">CRITICAL FAILURES</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          {analysis.failures.map((failure, i) => (
                            <div key={i} className="p-4 bg-carbon-black text-white">
                              <span className="text-glitch-red mr-2">✗</span>
                              {failure}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* The Lesson */}
                      <div className="p-8 bg-safety-orange text-white">
                        <h3 className="text-lg font-black mb-4">THE LESSON</h3>
                        <p className="text-xl italic">{analysis.lesson}</p>
                      </div>

                      {/* CINCH LAB Response */}
                      <div className="mt-8 p-8 bg-carbon-black text-white">
                        <h3 className="text-lg font-black mb-4">CINCH LAB RESPONSE</h3>
                        <p className="mb-4">
                          This is why we exist. This is why we don't sell. This is why we experiment without compromise.
                        </p>
                        <p className="text-lg font-black">
                          We are not them. We will never be them.
                        </p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-carbon-black/80 backdrop-blur-sm border-t border-white/10 p-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB_ANALYSIS • TRUTH_WITHOUT_MERCY • NO_COMPROMISES
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-mono opacity-60">
              BRANDS_ANALYZED: {analysisSubjects.length}
            </span>
            <span className="text-[10px] font-mono opacity-60">
              FAILURES_DOCUMENTED: ∞
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}