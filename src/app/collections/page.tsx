'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

// ==========================================================================
// COLLECTIONS PAGE - Asymmetric Visual Archives
// Margiela × Sacai × CDG Design System
// ==========================================================================

interface Collection {
  id: string
  season: string
  year: string
  title: string
  concept: string
  lookCount: number
  status: 'ARCHIVED' | 'CURRENT' | 'UPCOMING'
  date: string
  location?: string
  materials?: string[]
  techniques?: string[]
}

const collections: Collection[] = [
  {
    id: 'FW25',
    season: 'FALL/WINTER',
    year: '2025',
    title: 'DECONSTRUCTED FORMALITY',
    concept: 'Tailoring meets destruction. Corporate uniforms dissected and reassembled.',
    lookCount: 24,
    status: 'UPCOMING',
    date: '2025.03.15',
    location: 'Seoul Laboratory',
    materials: ['Virgin wool', 'Horsehair canvas', 'Silk organza', 'Steel wire'],
    techniques: ['Exposed interfacing', 'Raw edge tailoring', 'Asymmetric construction']
  },
  {
    id: 'SS25',
    season: 'SPRING/SUMMER',
    year: '2025',
    title: 'TRANSPARENT BOUNDARIES',
    concept: 'Revealing the unseen. Layers of translucency and opacity.',
    lookCount: 18,
    status: 'CURRENT',
    date: '2024.10.08',
    location: 'Tokyo Warehouse',
    materials: ['PVC film', 'Mesh fabric', 'Silk chiffon', 'Technical nylon'],
    techniques: ['Heat welding', 'Ultrasonic bonding', 'Layer manipulation']
  },
  {
    id: 'FW24',
    season: 'FALL/WINTER',
    year: '2024',
    title: 'HYBRID SYSTEMS',
    concept: 'Military meets civilian. Function spliced with form.',
    lookCount: 21,
    status: 'ARCHIVED',
    date: '2024.03.20',
    location: 'Paris Underground',
    materials: ['MA-1 nylon', 'Wool gabardine', 'Cotton canvas', 'Kevlar thread'],
    techniques: ['Garment splicing', 'Modular construction', 'Magnetic fastening']
  },
  {
    id: 'SS24',
    season: 'SPRING/SUMMER',
    year: '2024',
    title: 'RAW EDGE PHILOSOPHY',
    concept: 'Unfinished as finished. Process as aesthetic.',
    lookCount: 16,
    status: 'ARCHIVED',
    date: '2023.10.12',
    materials: ['Raw denim', 'Unbleached muslin', 'Natural linen', 'Hemp canvas'],
    techniques: ['Fraying manipulation', 'Visible basting', 'Unfinished hems']
  }
]

export default function CollectionsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={containerRef} style={{ backgroundColor: 'var(--zone-collections-surface)', minHeight: '100vh' }}>

      {/* Background Layer */}
      <motion.div
        style={{
          position: 'fixed',
          inset: 0,
          y: bgY,
          opacity: 0.03,
          pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(0deg, var(--margiela-exposed-seam) 0px, transparent 1px, transparent 40px)'
        }}
      />

      {/* ==========================================================================
         HEADER - Margiela Grid with Asymmetric Title
         ========================================================================== */}

      <header className="margiela-grid" style={{ padding: '8rem 2rem 4rem', position: 'relative' }}>
        {/* Number Tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            transform: 'rotate(-2deg)'
          }}
        >
          <span className="text-number-tag" style={{ color: 'var(--margiela-aluminum)' }}>001</span>
        </motion.div>

        {/* Ultra-large split title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            gridColumn: '2 / 5',
            transform: 'rotate(-1.2deg)',
            marginTop: 'var(--space-13)'
          }}
        >
          <h1 className="text-display-1" style={{
            color: 'var(--zone-collections-contrast)',
            lineHeight: '0.9',
            marginBottom: '0'
          }}>
            COLL
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            gridColumn: '3 / 7',
            transform: 'rotate(0.8deg)',
            marginLeft: 'var(--overlap-moderate)',
            zIndex: 2
          }}
        >
          <h1 className="text-display-1" style={{
            color: 'var(--sacai-burnt-orange)',
            lineHeight: '0.9'
          }}>
            ECTIONS
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            gridColumn: '2 / 6',
            marginTop: 'var(--space-21)'
          }}
        >
          <p className="text-heading-5" style={{
            color: 'var(--margiela-steel)',
            fontWeight: 'var(--font-weight-light)'
          }}>
            Seasonal Archives • Visual Documentation • No Commerce
          </p>

          {/* White Label */}
          <div className="text-white-label" style={{
            marginTop: 'var(--space-8)',
            display: 'inline-block'
          }}>
            EXPERIMENTAL COLLECTION
          </div>
        </motion.div>
      </header>

      {/* ==========================================================================
         COLLECTION CARDS - Hybrid Grid with Rotations
         ========================================================================== */}

      <section className="hybrid-grid" style={{ padding: '4rem 2rem', gap: 'var(--space-21)' }}>
        {collections.map((collection, index) => {
          const rotations = ['-2deg', '1.5deg', '-1deg', '2deg']
          const sizes = ['large', 'medium', 'large', 'medium']
          const gridPositions = [
            { gridColumn: '2 / 5', gridRow: 1 },
            { gridColumn: '3 / 6', gridRow: 2, marginTop: 'var(--overlap-moderate)' },
            { gridColumn: '1 / 4', gridRow: 3 },
            { gridColumn: '4 / 7', gridRow: 4, marginLeft: 'var(--overlap-tight)' }
          ]

          return (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                scale: 1.02,
                rotate: '0deg',
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              onClick={() => setSelectedCollection(collection)}
              style={{
                ...gridPositions[index],
                transform: `rotate(${rotations[index]})`,
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: 'var(--margiela-paper)',
                padding: sizes[index] === 'large' ? 'var(--space-34)' : 'var(--space-21)',
                border: '1px solid var(--margiela-exposed-seam)',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all var(--duration-normal) var(--ease-smooth)'
              }}
            >
              {/* Number Tag */}
              <div className="text-number-tag" style={{
                position: 'absolute',
                top: 'var(--space-5)',
                left: 'var(--space-5)',
                color: 'var(--margiela-aluminum)'
              }}>
                {collection.id}
              </div>

              {/* Status Indicator */}
              <div style={{
                position: 'absolute',
                top: 'var(--space-5)',
                right: 'var(--space-5)',
                fontSize: 'var(--type-2xs)',
                padding: 'var(--space-2) var(--space-3)',
                backgroundColor: collection.status === 'CURRENT'
                  ? 'var(--lab-reaction-green)'
                  : collection.status === 'UPCOMING'
                  ? 'var(--lab-caution-amber)'
                  : 'var(--margiela-aluminum)',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: 'var(--tracking-wider)'
              }}>
                {collection.status}
              </div>

              {/* Season/Year */}
              <p className="text-overline" style={{
                color: 'var(--zone-collections-accent-1)',
                marginBottom: 'var(--space-5)',
                marginTop: 'var(--space-13)'
              }}>
                {collection.season} {collection.year}
              </p>

              {/* Title */}
              <h2 className={sizes[index] === 'large' ? 'text-display-3' : 'text-display-3'} style={{
                color: 'var(--margiela-void)',
                marginBottom: 'var(--space-8)',
                fontSize: sizes[index] === 'large' ? 'var(--type-5xl)' : 'var(--type-4xl)'
              }}>
                {collection.title}
              </h2>

              {/* Concept */}
              <p className="text-body" style={{
                color: 'var(--margiela-steel)',
                marginBottom: 'var(--space-13)',
                fontStyle: 'italic'
              }}>
                {collection.concept}
              </p>

              {/* Details Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-8)',
                borderTop: '1px solid var(--margiela-exposed-seam)',
                paddingTop: 'var(--space-8)'
              }}>
                <div>
                  <p className="text-label" style={{
                    color: 'var(--margiela-aluminum)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    LOOKS
                  </p>
                  <p className="text-heading-4" style={{ color: 'var(--margiela-carbon)' }}>
                    {collection.lookCount}
                  </p>
                </div>
                <div>
                  <p className="text-label" style={{
                    color: 'var(--margiela-aluminum)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    DATE
                  </p>
                  <p className="text-body-small" style={{ color: 'var(--margiela-carbon)' }}>
                    {collection.date}
                  </p>
                </div>
              </div>

              {/* Techniques Tags */}
              {collection.techniques && (
                <div style={{ marginTop: 'var(--space-13)' }}>
                  <p className="text-label" style={{
                    color: 'var(--sacai-burnt-orange)',
                    marginBottom: 'var(--space-5)'
                  }}>
                    TECHNIQUES
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                    {collection.techniques.map((tech, i) => (
                      <span key={i} style={{
                        fontSize: 'var(--type-xs)',
                        padding: 'var(--space-2) var(--space-3)',
                        backgroundColor: 'var(--margiela-silver)',
                        color: 'var(--margiela-graphite)'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </section>

      {/* ==========================================================================
         DETAIL MODAL
         ========================================================================== */}

      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCollection(null)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: 'var(--margiela-snow)',
                maxWidth: '1200px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                position: 'relative',
                transform: 'rotate(-0.5deg)'
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCollection(null)}
                style={{
                  position: 'absolute',
                  top: 'var(--space-8)',
                  right: 'var(--space-8)',
                  fontSize: 'var(--type-4xl)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--margiela-carbon)',
                  zIndex: 10
                }}
              >
                ×
              </button>

              {/* Modal Content with Sacai Grid */}
              <div className="sacai-grid" style={{ padding: 'var(--space-34)' }}>
                <div className="sacai-grid-layer-1">
                  <span className="text-number-tag">{selectedCollection.id}</span>
                  <h2 className="text-display-2" style={{
                    color: 'var(--margiela-void)',
                    marginTop: 'var(--space-8)',
                    marginBottom: 'var(--space-8)'
                  }}>
                    {selectedCollection.title}
                  </h2>
                  <p className="text-lead" style={{ color: 'var(--margiela-steel)' }}>
                    {selectedCollection.concept}
                  </p>
                </div>

                <div className="sacai-grid-layer-2">
                  <p className="text-overline" style={{
                    color: 'var(--sacai-burnt-orange)',
                    marginBottom: 'var(--space-8)'
                  }}>
                    MATERIALS
                  </p>
                  {selectedCollection.materials?.map((mat, i) => (
                    <p key={i} className="text-body" style={{ color: 'var(--margiela-paper)' }}>
                      {mat}
                    </p>
                  ))}
                </div>

                {selectedCollection.location && (
                  <div className="sacai-grid-layer-3">
                    <p className="text-label" style={{
                      color: 'white',
                      marginBottom: 'var(--space-3)'
                    }}>
                      LOCATION
                    </p>
                    <p className="text-heading-5" style={{ color: 'white' }}>
                      {selectedCollection.location}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
         FOOTER NOTE
         ========================================================================== */}

      <footer style={{
        padding: 'var(--space-34) var(--space-21)',
        borderTop: '1px solid var(--margiela-exposed-seam)',
        textAlign: 'center'
      }}>
        <p className="text-label" style={{ color: 'var(--margiela-aluminum)' }}>
          CINCH LAB COLLECTIONS • NO COMMERCE • DOCUMENTATION ONLY
        </p>
      </footer>
    </div>
  )
}