'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    analysis: 'Demna continues to push the boundaries of silhouette. The oversized shoulders are not just fashion—they are architecture.',
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
    analysis: 'Rei Kawakubo remains untouchable. Each piece is a philosophical question about the nature of clothing itself.',
    strengths: ['Conceptual Depth', 'Pattern Innovation', 'Artistic Vision', 'Material Exploration'],
    weaknesses: ['Commercial Viability'],
    verdict: 'GENIUS',
    philosophy: 'Clothes are not clothes. They are ideas made wearable.'
  },
  {
    id: '003',
    brand: 'JACQUEMUS',
    season: 'SS24',
    rating: 6.5,
    category: 'COMMERCIAL',
    analysis: 'Simon Porte creates Instagram moments, not fashion moments. The micro bag is a meme, not design.',
    strengths: ['Marketing Genius', 'Brand Building', 'Accessibility'],
    weaknesses: ['Technical Depth', 'Innovation', 'Longevity'],
    verdict: 'COMMERCIAL',
    philosophy: 'Fashion for the feed, not for the future.'
  }
]

export default function AnalysisPage() {
  const [selectedAnalysis, setSelectedAnalysis] = useState<BrandAnalysis | null>(null)

  const verdictColors = {
    GENIUS: { bg: 'var(--cdg-blood-red)', text: 'text-[var(--cdg-blood-red)]' },
    PROGRESSIVE: { bg: 'var(--sacai-burnt-orange)', text: 'text-[var(--sacai-burnt-orange)]' },
    ETERNAL: { bg: 'var(--margiela-carbon)', text: 'text-[var(--margiela-carbon)]' },
    REFINED: { bg: 'var(--sacai-layer-navy)', text: 'text-[var(--sacai-layer-navy)]' },
    INTELLIGENT: { bg: 'var(--margiela-sage)', text: 'text-[var(--margiela-sage)]' },
    COMMERCIAL: { bg: 'var(--margiela-slate)', text: 'text-[var(--margiela-slate)]' }
  }

  return (
    <div className="min-h-screen bg-[var(--margiela-off-white)]">

      {/* HEADER with exposed-grid */}
      <header className="relative pt-32 pb-16 px-8 md:px-16 lg:px-24 exposed-grid">
        <motion.div
          className="text-xs absolute top-8 right-8 transform rotate-3 text-[var(--margiela-slate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="margiela-number-tag">04</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="transform -rotate-1"
        >
          <h1 className="text-display-1 font-black text-[var(--margiela-carbon)] leading-none">
            ANALYSIS
          </h1>

          <p className="text-heading-2 text-[var(--margiela-carbon)] font-light max-w-3xl mt-8">
            Honest critique of contemporary fashion. No brand is sacred.
            We analyze, dissect, and judge without mercy or commercial bias.
          </p>

          <div className="margiela-tag mt-8 inline-block bg-[var(--margiela-white)] px-4 py-2">
            CRITICAL PERSPECTIVE
          </div>
        </motion.div>
      </header>

      {/* ANALYSIS CARDS with diagonal-flow */}
      <section className="diagonal-flow py-16 px-8 md:px-16 lg:px-24 space-y-16">
        {brandAnalyses.map((analysis, index) => {
          const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1']
          const colors = verdictColors[analysis.verdict]

          return (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              onClick={() => setSelectedAnalysis(analysis)}
              className={`transform ${rotations[index]} bg-[var(--margiela-white)] p-12 border-2 border-[var(--margiela-slate)] cursor-pointer shadow-xl hover:shadow-3xl hover:border-[var(--margiela-carbon)] transition-all duration-500 exposed-seam`}
            >
              {/* Header Row */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className={`margiela-number-tag ${colors.text}`}>
                    ANALYSIS_{analysis.id}
                  </span>

                  <p className="text-xs text-[var(--margiela-slate)] mt-2 mb-4">
                    {analysis.season} • {analysis.category}
                  </p>
                </div>

                {/* Rating Box */}
                <div
                  className={`text-[var(--margiela-white)] p-4 min-w-24 text-center transform rotate-3`}
                  style={{ backgroundColor: colors.bg }}
                >
                  <p className="text-5xl font-black leading-none">
                    {analysis.rating}
                  </p>
                  <p className="text-xs mt-2">
                    / 10
                  </p>
                </div>
              </div>

              {/* Brand Name */}
              <h2 className="text-display-2 font-black text-[var(--margiela-carbon)] leading-none mb-8">
                {analysis.brand}
              </h2>

              {/* Verdict Badge */}
              <div
                className={`inline-block text-[var(--margiela-white)] px-4 py-2 mb-8 text-xs font-bold tracking-widest`}
                style={{ backgroundColor: colors.bg }}
              >
                {analysis.verdict}
              </div>

              {/* Analysis Quote */}
              <p className="text-body-large italic text-[var(--margiela-carbon)] mb-8">
                "{analysis.analysis}"
              </p>

              {/* Philosophy */}
              <div className={`border-l-4 pl-6 mb-8`} style={{ borderColor: colors.bg }}>
                <p className="text-base italic text-[var(--margiela-carbon)]">
                  {analysis.philosophy}
                </p>
              </div>

              {/* Strengths & Weaknesses Preview */}
              <div className="grid grid-cols-2 gap-8 border-t border-[var(--margiela-slate)] pt-8">
                <div>
                  <p className="margiela-tag text-[var(--margiela-sage)] mb-3">
                    STRENGTHS
                  </p>
                  <p className="text-sm text-[var(--margiela-carbon)]">
                    {analysis.strengths.length} identified
                  </p>
                </div>
                <div>
                  <p className="margiela-tag text-[var(--cdg-blood-red)] mb-3">
                    WEAKNESSES
                  </p>
                  <p className="text-sm text-[var(--margiela-carbon)]">
                    {analysis.weaknesses.length} identified
                  </p>
                </div>
              </div>

              {/* Click Hint */}
              <p className="text-xs text-[var(--margiela-slate)] mt-8 text-center">
                CLICK FOR FULL CRITIQUE →
              </p>
            </motion.div>
          )
        })}
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAnalysis(null)}
            className="fixed inset-0 bg-[var(--cdg-void)] bg-opacity-95 z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.9, rotate: 2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--margiela-white)] max-w-5xl w-full p-16 relative border-4 border-[var(--margiela-carbon)] sacai-grid-layer"
            >
              <button
                onClick={() => setSelectedAnalysis(null)}
                className="absolute top-8 right-8 text-6xl text-[var(--margiela-carbon)] hover:text-[var(--margiela-slate)] transition-colors"
              >
                ×
              </button>

              <span className="margiela-number-tag text-[var(--margiela-slate)]">
                ANALYSIS_{selectedAnalysis.id}
              </span>

              <h2 className="text-display-2 font-black text-[var(--margiela-carbon)] mt-4 mb-4">
                {selectedAnalysis.brand}
              </h2>

              <div className="flex gap-4 mb-12">
                <span className="text-xs px-3 py-1 bg-[var(--margiela-carbon)] text-[var(--margiela-white)]">
                  {selectedAnalysis.season}
                </span>
                <span className="text-xs px-3 py-1 bg-[var(--margiela-carbon)] text-[var(--margiela-white)]">
                  {selectedAnalysis.category}
                </span>
                <span
                  className="text-xs px-3 py-1 text-[var(--margiela-white)]"
                  style={{ backgroundColor: verdictColors[selectedAnalysis.verdict].bg }}
                >
                  {selectedAnalysis.verdict}
                </span>
              </div>

              {/* Rating Display */}
              <div className="text-center p-12 bg-[var(--margiela-off-white)] mb-12 transform -rotate-1">
                <p className="text-9xl text-[var(--margiela-carbon)] font-black leading-none kinetic-number">
                  {selectedAnalysis.rating}
                </p>
                <p className="margiela-tag text-[var(--margiela-slate)] mt-4">
                  OUT OF 10
                </p>
              </div>

              {/* Full Analysis */}
              <div className="mb-12">
                <h3 className="text-heading-2 font-bold text-[var(--margiela-carbon)] mb-6">
                  Full Critique
                </h3>
                <p className="text-body-large italic text-[var(--margiela-carbon)] leading-relaxed">
                  "{selectedAnalysis.analysis}"
                </p>
              </div>

              {/* Philosophy */}
              <div
                className="text-[var(--margiela-white)] p-8 mb-12 transform -rotate-1 sacai-grid-layer"
                style={{ backgroundColor: verdictColors[selectedAnalysis.verdict].bg }}
              >
                <p className="text-xs tracking-widest mb-4">
                  BRAND PHILOSOPHY
                </p>
                <p className="text-heading-3 italic">
                  {selectedAnalysis.philosophy}
                </p>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-heading-2 font-bold text-[var(--margiela-sage)] mb-8">
                    What Works
                  </h3>
                  <div className="space-y-4">
                    {selectedAnalysis.strengths.map((strength, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="text-2xl text-[var(--margiela-sage)]">+</span>
                        <p className="text-base text-[var(--margiela-carbon)]">{strength}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-heading-2 font-bold text-[var(--cdg-blood-red)] mb-8">
                    What Fails
                  </h3>
                  <div className="space-y-4">
                    {selectedAnalysis.weaknesses.map((weakness, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="text-2xl text-[var(--cdg-blood-red)]">−</span>
                        <p className="text-base text-[var(--margiela-carbon)]">{weakness}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER STATEMENT */}
      <footer className="py-24 px-8 bg-[var(--margiela-carbon)] text-[var(--margiela-white)] text-center">
        <p className="text-heading-2 font-light mb-8">
          TRUTH OVER COMMERCE
        </p>
        <p className="text-base text-[var(--margiela-slate)]">
          We analyze without bias, critique without mercy, and judge without commercial influence.
          Fashion needs honest voices, not paid opinions.
        </p>
      </footer>
    </div>
  )
}
