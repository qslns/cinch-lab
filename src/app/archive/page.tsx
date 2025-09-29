'use client'

import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ==========================================================================
// ARCHIVE PAGE - CDG Extreme Asymmetry
// Timeline × Philosophy × Manifesto
// ==========================================================================

interface ArchivedItem {
  id: string
  type: 'EXPERIMENT' | 'PROTOTYPE' | 'ITERATION' | 'FAILURE'
  date: string
  title: string
  description: string
  status: 'ABANDONED' | 'PAUSED' | 'FAILED' | 'ARCHIVED'
  reason?: string
  learnings?: string[]
  iterations?: number
  timeSpent?: string
}

const archivedItems: ArchivedItem[] = [
  {
    id: 'ARC_001',
    type: 'FAILURE',
    date: '2024.09.15',
    title: 'Magnetic Modular System v1',
    description: 'Garment modules connected by neodymium magnets for infinite reconfiguration.',
    status: 'FAILED',
    reason: 'Magnetic interference with electronic devices. Weight distribution issues.',
    learnings: [
      'Magnet strength inversely proportional to wearability',
      'Need non-metallic connection alternatives',
      'Modular systems require structural integrity'
    ],
    iterations: 23,
    timeSpent: '320 hours'
  },
  {
    id: 'ARC_002',
    type: 'EXPERIMENT',
    date: '2024.08.20',
    title: 'Biodegradable Seam Tape',
    description: 'Self-dissolving seam reinforcement that disappears after first wear.',
    status: 'ABANDONED',
    reason: 'Unpredictable dissolution rates. Environmental factors too variable.',
    learnings: [
      'Biodegradation requires controlled conditions',
      'Fashion temporality vs. practical durability'
    ],
    iterations: 15,
    timeSpent: '180 hours'
  },
  {
    id: 'ARC_003',
    type: 'PROTOTYPE',
    date: '2024.07.10',
    title: 'Zero-Waste Spiral Cut',
    description: 'Single continuous spiral pattern creating entire garment from one piece.',
    status: 'PAUSED',
    reason: 'Mathematical complexity exceeds current capability. Requires algorithmic solution.',
    learnings: [
      'Fibonacci sequences applicable to pattern cutting',
      'Computational design necessary for optimization'
    ],
    iterations: 31,
    timeSpent: '450 hours'
  },
  {
    id: 'ARC_004',
    type: 'FAILURE',
    date: '2024.06.05',
    title: 'Pneumatic Structure Jacket',
    description: 'Air-filled chambers creating variable silhouette through pressure adjustment.',
    status: 'FAILED',
    reason: 'Puncture vulnerability. Pump system too bulky.',
    learnings: [
      'Inflatable structures need redundancy',
      'Wearable tech must be truly wearable'
    ],
    iterations: 19,
    timeSpent: '280 hours'
  }
]

export default function ArchivePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [selectedItem, setSelectedItem] = useState<ArchivedItem | null>(null)

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div ref={containerRef} style={{
      backgroundColor: 'var(--zone-archive-surface)',
      minHeight: '100vh'
    }}>

      {/* Floating Background */}
      <motion.div style={{
        position: 'fixed',
        inset: 0,
        y: parallaxY,
        opacity: 0.04,
        pointerEvents: 'none',
        backgroundImage: 'repeating-linear-gradient(45deg, var(--margiela-exposed-seam) 0px, transparent 2px, transparent 60px)'
      }} />

      {/* ==========================================================================
         MANIFESTO HEADER - CDG Grid with Ultra Large Typography
         ========================================================================== */}

      <section className="cdg-grid" style={{ padding: '6rem 2rem', position: 'relative' }}>

        {/* Number Tags floating around */}
        <motion.div
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.5 }}
          className="text-number-tag"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '10%',
            transform: 'rotate(12deg)',
            fontSize: 'var(--type-xl)',
            color: 'var(--margiela-aluminum)'
          }}
        >
          002
        </motion.div>

        {/* Main Manifesto - CDG Item 1 */}
        <motion.div
          className="cdg-grid-item-1"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-cdg-black" style={{
            color: 'var(--zone-archive-contrast)',
            lineHeight: '0.85',
            marginBottom: 'var(--space-21)'
          }}>
            ARCH
            <br />
            <span style={{ color: 'var(--cdg-blood-red)' }}>IVE</span>
          </h1>
        </motion.div>

        {/* Philosophy Block - CDG Item 2 */}
        <motion.div
          className="cdg-grid-item-2"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            backgroundColor: 'var(--margiela-paper)',
            padding: 'var(--space-34)',
            border: '2px solid var(--margiela-exposed-seam)',
            transform: 'rotate(-1deg)'
          }}
        >
          <div className="text-white-label" style={{ marginBottom: 'var(--space-8)' }}>
            FAILURE PHILOSOPHY
          </div>

          <p className="text-display-3" style={{
            color: 'var(--margiela-void)',
            fontWeight: 'var(--font-weight-light)',
            lineHeight: 'var(--leading-snug)',
            fontStyle: 'italic'
          }}>
            "Every failed experiment is a successful learning"
          </p>

          <p className="text-body" style={{
            color: 'var(--margiela-steel)',
            marginTop: 'var(--space-13)'
          }}>
            We archive our failures not as defeats, but as essential steps
            in the evolution of our practice. The beauty of the incomplete,
            the aesthetics of the abandoned.
          </p>
        </motion.div>

        {/* Subtitle - CDG Item 3 */}
        <motion.div
          className="cdg-grid-item-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            borderLeft: '4px solid var(--zone-archive-accent-1)',
            paddingLeft: 'var(--space-8)'
          }}
        >
          <p className="text-label" style={{
            color: 'var(--zone-archive-accent-1)',
            marginBottom: 'var(--space-3)'
          }}>
            DOCUMENTATION ARCHIVE
          </p>
          <p className="text-heading-5" style={{
            color: 'var(--margiela-steel)',
            fontWeight: 'var(--font-weight-regular)'
          }}>
            Failed Experiments<br />
            Abandoned Prototypes<br />
            Learning Through Failure
          </p>
        </motion.div>
      </section>

      {/* ==========================================================================
         TIMELINE - Diagonal Flow with Extreme Asymmetry
         ========================================================================== */}

      <section className="diagonal-flow" style={{ padding: '4rem 2rem', minHeight: '120vh' }}>
        {archivedItems.map((item, index) => {
          const rotations = ['-2.5deg', '1.8deg', '-1.2deg', '2.2deg']
          const sizes = ['xlarge', 'medium', 'large', 'medium']
          const colors = [
            'var(--cdg-blood-red)',
            'var(--zone-archive-accent-1)',
            'var(--zone-archive-accent-2)',
            'var(--margiela-tabi-brown)'
          ]

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.85, rotate: rotations[index] }}
              whileInView={{ opacity: 1, scale: 1, rotate: rotations[index] }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{
                scale: 1.05,
                rotate: '0deg',
                zIndex: 20,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedItem(item)}
              style={{
                backgroundColor: 'var(--margiela-snow)',
                padding: sizes[index] === 'xlarge' ? 'var(--space-34)' :
                         sizes[index] === 'large' ? 'var(--space-21)' : 'var(--space-13)',
                border: `3px solid ${colors[index]}`,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
              }}
            >
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: 'var(--space-5)',
                right: 'var(--space-5)',
                backgroundColor: colors[index],
                color: 'white',
                padding: 'var(--space-2) var(--space-5)',
                fontSize: 'var(--type-2xs)',
                fontWeight: 'var(--font-weight-bold)',
                letterSpacing: 'var(--tracking-widest)',
                textTransform: 'uppercase'
              }}>
                {item.status}
              </div>

              {/* Archive ID */}
              <span className="text-number-tag" style={{
                color: colors[index],
                fontSize: 'var(--type-xs)'
              }}>
                {item.id}
              </span>

              {/* Type & Date */}
              <p className="text-overline" style={{
                color: 'var(--margiela-aluminum)',
                marginTop: 'var(--space-3)',
                marginBottom: 'var(--space-5)'
              }}>
                {item.type} • {item.date}
              </p>

              {/* Title */}
              <h3 style={{
                fontSize: sizes[index] === 'xlarge' ? 'var(--type-5xl)' :
                          sizes[index] === 'large' ? 'var(--type-4xl)' : 'var(--type-3xl)',
                fontWeight: 'var(--font-weight-black)',
                color: 'var(--margiela-void)',
                lineHeight: 'var(--leading-tight)',
                marginBottom: 'var(--space-8)'
              }}>
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-body" style={{
                color: 'var(--margiela-steel)',
                marginBottom: 'var(--space-13)'
              }}>
                {item.description}
              </p>

              {/* Failure Reason */}
              {item.reason && (
                <div style={{
                  backgroundColor: `${colors[index]}15`,
                  borderLeft: `4px solid ${colors[index]}`,
                  padding: 'var(--space-8)',
                  marginBottom: 'var(--space-8)'
                }}>
                  <p className="text-label" style={{
                    color: colors[index],
                    marginBottom: 'var(--space-3)'
                  }}>
                    REASON
                  </p>
                  <p className="text-body-small" style={{ color: 'var(--margiela-graphite)' }}>
                    {item.reason}
                  </p>
                </div>
              )}

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: 'var(--space-13)',
                borderTop: '1px solid var(--margiela-exposed-seam)',
                paddingTop: 'var(--space-8)',
                marginTop: 'var(--space-13)'
              }}>
                {item.iterations && (
                  <div>
                    <p className="text-label" style={{
                      color: 'var(--margiela-aluminum)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      ITERATIONS
                    </p>
                    <p className="text-heading-4" style={{ color: colors[index] }}>
                      {item.iterations}
                    </p>
                  </div>
                )}
                {item.timeSpent && (
                  <div>
                    <p className="text-label" style={{
                      color: 'var(--margiela-aluminum)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      TIME SPENT
                    </p>
                    <p className="text-body-small" style={{ color: 'var(--margiela-graphite)' }}>
                      {item.timeSpent}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* ==========================================================================
         LEARNINGS SECTION - Sacai Overlapping Layers
         ========================================================================== */}

      <section className="sacai-grid" style={{ padding: '8rem 2rem' }}>
        <div className="sacai-grid-layer-1">
          <span className="text-number-tag">003</span>
          <h2 className="text-display-2" style={{
            color: 'var(--margiela-void)',
            marginTop: 'var(--space-8)',
            marginBottom: 'var(--space-13)'
          }}>
            Key Learnings
          </h2>
          <p className="text-lead" style={{ color: 'var(--margiela-steel)' }}>
            Documentation more valuable than production. Controlled chaos has artistic value.
          </p>
        </div>

        <div className="sacai-grid-layer-2" style={{
          backgroundColor: 'var(--cdg-charcoal)',
          color: 'var(--margiela-paper)'
        }}>
          <p className="text-overline" style={{
            color: 'var(--zone-archive-accent-1)',
            marginBottom: 'var(--space-8)'
          }}>
            PHILOSOPHY
          </p>
          <p className="text-heading-5" style={{
            fontWeight: 'var(--font-weight-light)',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            "In failure, we find truth. The incomplete teaches us more than the finished."
          </p>
        </div>

        <div className="sacai-grid-layer-3" style={{
          backgroundColor: 'var(--zone-archive-accent-1)',
          color: 'white'
        }}>
          <p className="text-heading-6">
            {archivedItems.length}
          </p>
          <p className="text-label" style={{ color: 'white' }}>
            ARCHIVED EXPERIMENTS
          </p>
        </div>
      </section>

      {/* ==========================================================================
         DETAIL MODAL
         ========================================================================== */}

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(12px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              overflow: 'auto'
            }}
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--margiela-snow)',
                maxWidth: '1000px',
                width: '100%',
                padding: 'var(--space-55)',
                position: 'relative',
                border: '4px solid var(--cdg-blood-red)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                style={{
                  position: 'absolute',
                  top: 'var(--space-13)',
                  right: 'var(--space-13)',
                  fontSize: 'var(--type-6xl)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--cdg-blood-red)',
                  lineHeight: 1
                }}
              >
                ×
              </button>

              {/* Header */}
              <span className="text-number-tag" style={{
                color: 'var(--cdg-blood-red)',
                fontSize: 'var(--type-sm)'
              }}>
                {selectedItem.id}
              </span>

              <h2 className="text-display-2" style={{
                color: 'var(--margiela-void)',
                marginTop: 'var(--space-8)',
                marginBottom: 'var(--space-5)'
              }}>
                {selectedItem.title}
              </h2>

              <p className="text-overline" style={{
                color: 'var(--margiela-aluminum)',
                marginBottom: 'var(--space-21)'
              }}>
                {selectedItem.type} • {selectedItem.date} • {selectedItem.status}
              </p>

              {/* Description */}
              <p className="text-lead" style={{
                color: 'var(--margiela-steel)',
                marginBottom: 'var(--space-21)'
              }}>
                {selectedItem.description}
              </p>

              {/* Failure Reason */}
              {selectedItem.reason && (
                <div style={{
                  backgroundColor: 'var(--cdg-blood-red)',
                  color: 'white',
                  padding: 'var(--space-21)',
                  marginBottom: 'var(--space-21)',
                  transform: 'rotate(-0.5deg)'
                }}>
                  <h3 className="text-heading-5" style={{
                    color: 'white',
                    marginBottom: 'var(--space-8)'
                  }}>
                    Why It Failed
                  </h3>
                  <p className="text-body" style={{ color: 'white' }}>
                    {selectedItem.reason}
                  </p>
                </div>
              )}

              {/* Learnings */}
              {selectedItem.learnings && (
                <div style={{ marginBottom: 'var(--space-21)' }}>
                  <h3 className="text-heading-5" style={{
                    color: 'var(--margiela-void)',
                    marginBottom: 'var(--space-13)'
                  }}>
                    Key Learnings
                  </h3>
                  <div style={{
                    display: 'grid',
                    gap: 'var(--space-8)'
                  }}>
                    {selectedItem.learnings.map((learning, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        gap: 'var(--space-5)',
                        alignItems: 'start'
                      }}>
                        <span style={{
                          fontSize: 'var(--type-3xl)',
                          color: 'var(--zone-archive-accent-1)',
                          lineHeight: 1
                        }}>
                          →
                        </span>
                        <p className="text-body" style={{ color: 'var(--margiela-graphite)' }}>
                          {learning}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-21)',
                backgroundColor: 'var(--margiela-paper)',
                padding: 'var(--space-21)',
                borderTop: '2px solid var(--margiela-exposed-seam)'
              }}>
                {selectedItem.iterations && (
                  <div>
                    <p className="text-label" style={{
                      color: 'var(--margiela-aluminum)',
                      marginBottom: 'var(--space-3)'
                    }}>
                      ITERATIONS
                    </p>
                    <p className="text-display-3" style={{ color: 'var(--cdg-blood-red)' }}>
                      {selectedItem.iterations}
                    </p>
                  </div>
                )}
                {selectedItem.timeSpent && (
                  <div>
                    <p className="text-label" style={{
                      color: 'var(--margiela-aluminum)',
                      marginBottom: 'var(--space-3)'
                    }}>
                      TIME SPENT
                    </p>
                    <p className="text-heading-4" style={{ color: 'var(--margiela-graphite)' }}>
                      {selectedItem.timeSpent}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
         FOOTER
         ========================================================================== */}

      <footer style={{
        padding: 'var(--space-34) var(--space-21)',
        borderTop: '2px solid var(--margiela-exposed-seam)',
        textAlign: 'center'
      }}>
        <p className="text-label" style={{ color: 'var(--margiela-aluminum)' }}>
          CINCH LAB ARCHIVE • LEARNING THROUGH FAILURE • {archivedItems.length} DOCUMENTED
        </p>
      </footer>
    </div>
  )
}