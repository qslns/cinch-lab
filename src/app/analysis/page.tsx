'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// ==========================================================================
// ANALYSIS PAGE - Critical Perspective
// Diagonal Flow × Exposed Grid × Grey/Blue Analytical Tone
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

export default function AnalysisPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [selectedAnalysis, setSelectedAnalysis] = useState<BrandAnalysis | null>(null)

  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.05, 0.15])

  return (
    <div ref={containerRef} style={{
      backgroundColor: 'var(--zone-analysis-surface)',
      minHeight: '100vh'
    }}>

      {/* Exposed Grid Background */}
      <motion.div
        className="exposed-grid"
        style={{
          position: 'fixed',
          inset: 0,
          opacity: gridOpacity,
          pointerEvents: 'none'
        }}
      />

      {/* ==========================================================================
         HEADER - Critical Interface
         ========================================================================== */}

      <header className="margiela-grid" style={{ padding: '8rem 2rem 4rem', position: 'relative' }}>

        {/* Number Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-number-tag"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            transform: 'rotate(3deg)',
            fontSize: 'var(--type-xl)',
            color: 'var(--margiela-aluminum)'
          }}
        >
          004
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            gridColumn: '2 / 6',
            transform: 'rotate(-0.5deg)'
          }}
        >
          <h1 className="text-display-1" style={{
            color: 'var(--zone-analysis-contrast)',
            lineHeight: '0.9',
            marginBottom: 'var(--space-13)'
          }}>
            ANALYSIS
          </h1>

          <p className="text-heading-5" style={{
            color: 'var(--margiela-steel)',
            fontWeight: 'var(--font-weight-light)',
            maxWidth: '800px'
          }}>
            Honest critique of contemporary fashion. No brand is sacred.
            We analyze, dissect, and judge without mercy or commercial bias.
          </p>

          <div className="text-white-label" style={{
            marginTop: 'var(--space-13)',
            display: 'inline-block'
          }}>
            CRITICAL PERSPECTIVE
          </div>
        </motion.div>
      </header>

      {/* ==========================================================================
         ANALYSIS CARDS - Diagonal Flow with Different Sizes
         ========================================================================== */}

      <section className="diagonal-flow" style={{ padding: '4rem 2rem', minHeight: '150vh' }}>
        {brandAnalyses.map((analysis, index) => {
          const rotations = ['-1.5deg', '2deg', '-0.8deg', '1.2deg', '-1.8deg', '1.5deg']
          const sizes = ['xlarge', 'large', 'medium', 'large', 'medium', 'xlarge']
          const colors = [
            'var(--zone-analysis-accent-1)',
            'var(--cdg-blood-red)',
            'var(--zone-analysis-accent-2)',
            'var(--lab-petri-blue)',
            'var(--margiela-steel)',
            'var(--sacai-burnt-orange)'
          ]

          return (
            <motion.div
              key={analysis.id}
              initial={{ opacity: 0, scale: 0.9, rotate: rotations[index] }}
              whileInView={{ opacity: 1, scale: 1, rotate: rotations[index] }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{
                scale: 1.03,
                rotate: '0deg',
                zIndex: 30,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedAnalysis(analysis)}
              style={{
                backgroundColor: 'var(--margiela-paper)',
                padding: sizes[index] === 'xlarge' ? 'var(--space-55)' :
                         sizes[index] === 'large' ? 'var(--space-34)' : 'var(--space-21)',
                border: `2px solid ${colors[index]}`,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
              }}
            >
              {/* Header Row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: 'var(--space-13)'
              }}>
                <div>
                  <span className="text-number-tag" style={{
                    color: colors[index],
                    fontSize: 'var(--type-sm)'
                  }}>
                    ANALYSIS_{analysis.id}
                  </span>

                  <p className="text-overline" style={{
                    color: 'var(--margiela-aluminum)',
                    marginTop: 'var(--space-3)',
                    marginBottom: 'var(--space-8)'
                  }}>
                    {analysis.season} • {analysis.category}
                  </p>
                </div>

                {/* Rating */}
                <div style={{
                  backgroundColor: colors[index],
                  color: 'white',
                  padding: 'var(--space-5) var(--space-8)',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: 'var(--type-4xl)',
                    fontWeight: 'var(--font-weight-black)',
                    lineHeight: 1
                  }}>
                    {analysis.rating}
                  </p>
                  <p className="text-label" style={{
                    color: 'white',
                    fontSize: 'var(--type-2xs)'
                  }}>
                    / 10
                  </p>
                </div>
              </div>

              {/* Brand Name */}
              <h2 style={{
                fontSize: sizes[index] === 'xlarge' ? 'var(--type-6xl)' :
                          sizes[index] === 'large' ? 'var(--type-5xl)' : 'var(--type-4xl)',
                fontWeight: 'var(--font-weight-black)',
                color: 'var(--margiela-void)',
                lineHeight: 'var(--leading-none)',
                marginBottom: 'var(--space-13)'
              }}>
                {analysis.brand}
              </h2>

              {/* Verdict Badge */}
              <div style={{
                display: 'inline-block',
                backgroundColor: colors[index],
                color: 'white',
                padding: 'var(--space-3) var(--space-8)',
                marginBottom: 'var(--space-13)',
                fontSize: 'var(--type-xs)',
                fontWeight: 'var(--font-weight-bold)',
                letterSpacing: 'var(--tracking-wider)'
              }}>
                {analysis.verdict}
              </div>

              {/* Analysis Quote */}
              <p className="text-body" style={{
                color: 'var(--margiela-steel)',
                fontStyle: 'italic',
                marginBottom: 'var(--space-21)',
                fontSize: sizes[index] === 'xlarge' ? 'var(--type-lg)' : 'var(--type-base)'
              }}>
                "{analysis.analysis}"
              </p>

              {/* Philosophy */}
              <div style={{
                borderLeft: `4px solid ${colors[index]}`,
                paddingLeft: 'var(--space-8)',
                marginBottom: 'var(--space-21)'
              }}>
                <p className="text-body-small" style={{
                  color: 'var(--margiela-graphite)',
                  fontStyle: 'italic'
                }}>
                  {analysis.philosophy}
                </p>
              </div>

              {/* Strengths & Weaknesses Preview */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: sizes[index] === 'medium' ? '1fr' : 'repeat(2, 1fr)',
                gap: 'var(--space-13)',
                borderTop: '1px solid var(--margiela-exposed-seam)',
                paddingTop: 'var(--space-13)'
              }}>
                <div>
                  <p className="text-label" style={{
                    color: 'var(--lab-reaction-green)',
                    marginBottom: 'var(--space-5)'
                  }}>
                    STRENGTHS
                  </p>
                  <p className="text-body-small" style={{ color: 'var(--margiela-graphite)' }}>
                    {analysis.strengths.length} identified
                  </p>
                </div>
                <div>
                  <p className="text-label" style={{
                    color: colors[index],
                    marginBottom: 'var(--space-5)'
                  }}>
                    WEAKNESSES
                  </p>
                  <p className="text-body-small" style={{ color: 'var(--margiela-graphite)' }}>
                    {analysis.weaknesses.length} identified
                  </p>
                </div>
              </div>

              {/* Click Hint */}
              <p className="text-label" style={{
                color: 'var(--margiela-aluminum)',
                marginTop: 'var(--space-13)',
                textAlign: 'center',
                opacity: 0.5
              }}>
                CLICK FOR FULL CRITIQUE →
              </p>
            </motion.div>
          )
        })}
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
            onClick={() => setSelectedAnalysis(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(16px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              overflow: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.9, rotate: 2 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--margiela-snow)',
                maxWidth: '1200px',
                width: '100%',
                padding: 'var(--space-55)',
                position: 'relative',
                border: '4px solid var(--zone-analysis-accent-1)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAnalysis(null)}
                style={{
                  position: 'absolute',
                  top: 'var(--space-13)',
                  right: 'var(--space-13)',
                  fontSize: 'var(--type-6xl)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--zone-analysis-accent-1)',
                  lineHeight: 1
                }}
              >
                ×
              </button>

              {/* Header */}
              <div style={{ marginBottom: 'var(--space-34)' }}>
                <span className="text-number-tag" style={{
                  color: 'var(--zone-analysis-accent-1)',
                  fontSize: 'var(--type-base)'
                }}>
                  ANALYSIS_{selectedAnalysis.id}
                </span>

                <h2 className="text-display-2" style={{
                  color: 'var(--margiela-void)',
                  marginTop: 'var(--space-8)',
                  marginBottom: 'var(--space-8)'
                }}>
                  {selectedAnalysis.brand}
                </h2>

                <div style={{
                  display: 'flex',
                  gap: 'var(--space-13)',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <span className="text-overline" style={{ color: 'var(--margiela-aluminum)' }}>
                    {selectedAnalysis.season}
                  </span>
                  <span style={{
                    backgroundColor: 'var(--zone-analysis-accent-1)',
                    color: 'white',
                    padding: 'var(--space-3) var(--space-8)',
                    fontSize: 'var(--type-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                    letterSpacing: 'var(--tracking-wider)'
                  }}>
                    {selectedAnalysis.category}
                  </span>
                  <span style={{
                    backgroundColor: 'var(--cdg-blood-red)',
                    color: 'white',
                    padding: 'var(--space-3) var(--space-8)',
                    fontSize: 'var(--type-xs)',
                    fontWeight: 'var(--font-weight-bold)',
                    letterSpacing: 'var(--tracking-wider)'
                  }}>
                    {selectedAnalysis.verdict}
                  </span>
                </div>
              </div>

              {/* Rating Display */}
              <div style={{
                textAlign: 'center',
                padding: 'var(--space-34)',
                backgroundColor: 'var(--margiela-paper)',
                marginBottom: 'var(--space-34)'
              }}>
                <p className="text-cdg-black" style={{
                  fontSize: 'var(--type-9xl)',
                  color: 'var(--zone-analysis-accent-1)',
                  lineHeight: 1
                }}>
                  {selectedAnalysis.rating}
                </p>
                <p className="text-label" style={{ color: 'var(--margiela-aluminum)' }}>
                  OUT OF 10
                </p>
              </div>

              {/* Full Analysis */}
              <div style={{ marginBottom: 'var(--space-34)' }}>
                <h3 className="text-heading-4" style={{
                  color: 'var(--margiela-void)',
                  marginBottom: 'var(--space-13)'
                }}>
                  Full Critique
                </h3>
                <p className="text-lead" style={{
                  color: 'var(--margiela-steel)',
                  fontStyle: 'italic',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  "{selectedAnalysis.analysis}"
                </p>
              </div>

              {/* Philosophy */}
              <div style={{
                backgroundColor: 'var(--zone-analysis-accent-1)',
                color: 'white',
                padding: 'var(--space-21)',
                marginBottom: 'var(--space-34)',
                transform: 'rotate(-0.5deg)'
              }}>
                <p className="text-label" style={{
                  color: 'white',
                  marginBottom: 'var(--space-8)'
                }}>
                  BRAND PHILOSOPHY
                </p>
                <p className="text-heading-5" style={{
                  color: 'white',
                  fontStyle: 'italic'
                }}>
                  {selectedAnalysis.philosophy}
                </p>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="broken-symmetry-left" style={{ gap: 'var(--space-34)' }}>
                {/* Strengths */}
                <div>
                  <h3 className="text-heading-5" style={{
                    color: 'var(--lab-reaction-green)',
                    marginBottom: 'var(--space-13)'
                  }}>
                    What Works
                  </h3>
                  <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
                    {selectedAnalysis.strengths.map((strength, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        gap: 'var(--space-5)',
                        alignItems: 'start'
                      }}>
                        <span style={{
                          fontSize: 'var(--type-2xl)',
                          color: 'var(--lab-reaction-green)',
                          lineHeight: 1
                        }}>
                          +
                        </span>
                        <p className="text-body" style={{ color: 'var(--margiela-graphite)' }}>
                          {strength}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weaknesses */}
                <div>
                  <h3 className="text-heading-5" style={{
                    color: 'var(--cdg-blood-red)',
                    marginBottom: 'var(--space-13)'
                  }}>
                    What Fails
                  </h3>
                  <div style={{ display: 'grid', gap: 'var(--space-8)' }}>
                    {selectedAnalysis.weaknesses.map((weakness, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        gap: 'var(--space-5)',
                        alignItems: 'start'
                      }}>
                        <span style={{
                          fontSize: 'var(--type-2xl)',
                          color: 'var(--cdg-blood-red)',
                          lineHeight: 1
                        }}>
                          −
                        </span>
                        <p className="text-body" style={{ color: 'var(--margiela-graphite)' }}>
                          {weakness}
                        </p>
                      </div>
                    ))}
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

      <footer style={{
        padding: 'var(--space-55) var(--space-21)',
        backgroundColor: 'var(--margiela-graphite)',
        color: 'var(--margiela-silver)',
        textAlign: 'center'
      }}>
        <p className="text-heading-5" style={{
          color: 'white',
          marginBottom: 'var(--space-13)',
          fontWeight: 'var(--font-weight-light)'
        }}>
          TRUTH OVER COMMERCE
        </p>
        <p className="text-body" style={{ color: 'var(--margiela-silver)' }}>
          We analyze without bias, critique without mercy, and judge without commercial influence.
          Fashion needs honest voices, not paid opinions.
        </p>
      </footer>
    </div>
  )
}