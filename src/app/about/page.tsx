'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ==========================================================================
// ABOUT PAGE - Bold Manifesto
// CDG Black × Margiela White Label × Sacai Orange
// ==========================================================================

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div ref={containerRef} style={{
      backgroundColor: 'var(--zone-about-surface)',
      minHeight: '100vh'
    }}>

      {/* Floating Red Gradient */}
      <motion.div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 30% 50%, var(--cdg-blood-red), transparent 60%)',
        opacity: bgOpacity,
        pointerEvents: 'none',
        mixBlendMode: 'multiply'
      }} />

      {/* ==========================================================================
         HERO MANIFESTO - CDG Black Typography
         ========================================================================== */}

      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        position: 'relative'
      }}>

        {/* Number Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-number-tag"
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            transform: 'rotate(-8deg)',
            fontSize: 'var(--type-2xl)',
            color: 'var(--margiela-aluminum)'
          }}
        >
          003
        </motion.div>

        <motion.div
          className="text-number-tag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            right: '2rem',
            transform: 'rotate(5deg)',
            fontSize: 'var(--type-xl)',
            color: 'var(--margiela-aluminum)'
          }}
        >
          MARGIELA × SACAI
        </motion.div>

        <div style={{ maxWidth: '1400px', width: '100%', textAlign: 'center' }}>
          {/* Main Statement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            style={{ y: textY }}
          >
            <h1 className="text-cdg-black" style={{
              fontSize: 'clamp(var(--type-7xl), 20vw, 15rem)',
              lineHeight: '0.85',
              marginBottom: 'var(--space-34)',
              color: 'var(--zone-about-primary)'
            }}>
              WE ARE
              <br />
              <span style={{ color: 'var(--zone-about-accent-1)' }}>NOT</span>
              <br />
              A BRAND
            </h1>

            {/* White Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white-label"
              style={{
                display: 'inline-block',
                marginBottom: 'var(--space-21)',
                fontSize: 'var(--type-sm)',
                padding: 'var(--space-5) var(--space-13)'
              }}
            >
              EXPERIMENTAL FASHION LABORATORY
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-display-3"
              style={{
                color: 'var(--margiela-steel)',
                fontWeight: 'var(--font-weight-light)',
                maxWidth: '900px',
                margin: '0 auto',
                lineHeight: 'var(--leading-snug)'
              }}
            >
              CINCH LAB exists in the liminal space between
              <span style={{ color: 'var(--zone-about-accent-2)' }}> destruction </span>
              and
              <span style={{ color: 'var(--zone-about-accent-2)' }}> creation</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         PHILOSOPHY BLOCKS - Broken Symmetry Layout
         ========================================================================== */}

      <section className="broken-symmetry-left" style={{
        padding: '8rem 2rem',
        gap: 'var(--space-55)',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        {/* Left Block - Large */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: 'var(--zone-about-primary)',
            color: 'var(--zone-about-surface)',
            padding: 'var(--space-55)',
            border: '6px solid var(--zone-about-accent-1)'
          }}
        >
          <span className="text-number-tag" style={{
            color: 'var(--zone-about-accent-1)',
            fontSize: 'var(--type-lg)'
          }}>
            01
          </span>

          <h2 className="text-display-2" style={{
            color: 'white',
            marginTop: 'var(--space-13)',
            marginBottom: 'var(--space-21)'
          }}>
            NO COMMERCE
          </h2>

          <p className="text-lead" style={{
            color: 'var(--margiela-silver)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-21)'
          }}>
            This laboratory exists for experimentation, not commerce. We do not sell
            products. We do not calculate profit. Every garment is a philosophical
            statement, a question posed in fabric.
          </p>

          <p className="text-body" style={{ color: 'var(--margiela-silver)' }}>
            When fashion is freed from commercial constraints, it becomes pure research.
            We archive our work, we document our processes, we share our failures.
            The goal is understanding, not revenue.
          </p>
        </motion.div>

        {/* Right Block - Small */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            backgroundColor: 'var(--zone-about-accent-2)',
            color: 'white',
            padding: 'var(--space-34)',
            transform: 'rotate(2deg)'
          }}
        >
          <p className="text-cdg-statement" style={{
            color: 'white',
            marginBottom: 'var(--space-13)'
          }}>
            CINCH • RELEASE • REPEAT
          </p>

          <p className="text-body" style={{ color: 'white' }}>
            Our slogan is our methodology. Cinch: complete control of technique.
            Release: creative liberation. Repeat: endless experimentation.
          </p>
        </motion.div>
      </section>

      {/* ==========================================================================
         INSPIRATION - Margiela × Sacai
         ========================================================================== */}

      <section className="broken-symmetry-right" style={{
        padding: '8rem 2rem',
        gap: 'var(--space-55)',
        maxWidth: '1600px',
        margin: '0 auto',
        backgroundColor: 'var(--margiela-paper)'
      }}>
        {/* Left Small */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            padding: 'var(--space-34)',
            border: '3px solid var(--margiela-exposed-seam)',
            backgroundColor: 'white',
            transform: 'rotate(-1.5deg)'
          }}
        >
          <span className="text-number-tag" style={{
            color: 'var(--margiela-aluminum)',
            fontSize: 'var(--type-sm)'
          }}>
            02
          </span>

          <h3 className="text-heading-4" style={{
            color: 'var(--margiela-void)',
            marginTop: 'var(--space-8)',
            marginBottom: 'var(--space-13)'
          }}>
            MARGIELA
          </h3>

          <p className="text-body" style={{
            color: 'var(--margiela-steel)',
            marginBottom: 'var(--space-13)'
          }}>
            The master of deconstruction taught us anonymity as philosophy.
            White as infinite possibility. The garment speaks, not the designer.
          </p>

          <div className="text-white-label" style={{ fontSize: 'var(--type-2xs)' }}>
            DECONSTRUCTIVE PHILOSOPHY
          </div>
        </motion.div>

        {/* Right Large */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: 'var(--sacai-layer-navy)',
            color: 'white',
            padding: 'var(--space-55)'
          }}
        >
          <span className="text-number-tag" style={{
            color: 'var(--sacai-burnt-orange)',
            fontSize: 'var(--type-lg)'
          }}>
            03
          </span>

          <h3 className="text-display-3" style={{
            color: 'white',
            marginTop: 'var(--space-13)',
            marginBottom: 'var(--space-21)'
          }}>
            SACAI
          </h3>

          <p className="text-lead" style={{
            color: 'var(--margiela-silver)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-21)'
          }}>
            Chitose Abe's hybrid constructions showed us that one plus one equals three.
            Garments exist in multiple dimensions, multiple identities simultaneously.
          </p>

          <div style={{
            borderLeft: '4px solid var(--sacai-burnt-orange)',
            paddingLeft: 'var(--space-13)',
            marginTop: 'var(--space-21)'
          }}>
            <p className="text-body" style={{ color: 'white', fontStyle: 'italic' }}>
              "Familiar yet new. Expected yet surprising. One thing becomes another becomes another."
            </p>
          </div>
        </motion.div>
      </section>

      {/* ==========================================================================
         LABORATORY STATS - Hybrid Grid
         ========================================================================== */}

      <section className="hybrid-grid" style={{
        padding: '8rem 2rem',
        gap: 'var(--space-34)'
      }}>
        {[
          { label: 'EXPERIMENTS', value: '1,247', gridColumn: '2 / 4', rotation: '-1deg' },
          { label: 'PATTERNS', value: '892', gridColumn: '3 / 5', rotation: '1.5deg' },
          { label: 'FAILURES', value: '2,103', gridColumn: '2 / 4', rotation: '-0.8deg' },
          { label: 'THOUGHTS', value: '∞', gridColumn: '4 / 6', rotation: '2deg' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              gridColumn: stat.gridColumn,
              transform: `rotate(${stat.rotation})`,
              backgroundColor: 'var(--margiela-snow)',
              padding: 'var(--space-34)',
              textAlign: 'center',
              border: '2px solid var(--margiela-exposed-seam)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <p className="text-cdg-black" style={{
              fontSize: 'var(--type-8xl)',
              color: 'var(--zone-about-accent-1)',
              lineHeight: 1
            }}>
              {stat.value}
            </p>
            <p className="text-label" style={{
              color: 'var(--margiela-aluminum)',
              marginTop: 'var(--space-8)'
            }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </section>

      {/* ==========================================================================
         MANIFESTO TEXT - CDG Minimal
         ========================================================================== */}

      <section style={{
        padding: '12rem 2rem',
        backgroundColor: 'var(--zone-about-primary)',
        color: 'var(--zone-about-surface)',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          <h2 className="text-cdg-black" style={{
            color: 'var(--zone-about-accent-1)',
            marginBottom: 'var(--space-34)',
            fontSize: 'clamp(var(--type-6xl), 12vw, var(--type-9xl))'
          }}>
            난 천재야
          </h2>

          <p className="text-display-3" style={{
            color: 'var(--margiela-silver)',
            fontWeight: 'var(--font-weight-light)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-34)'
          }}>
            This is not arrogance. This is confidence earned through 1,247 experiments,
            892 archived patterns, and 2,103 documented failures. We understand fashion
            at a level few can reach.
          </p>

          <div className="text-white-label" style={{
            fontSize: 'var(--type-base)',
            padding: 'var(--space-8) var(--space-21)',
            display: 'inline-block'
          }}>
            CINCH LAB IS THE HIGHEST
          </div>
        </motion.div>
      </section>

      {/* ==========================================================================
         FINAL STATEMENT - Sacai Splice
         ========================================================================== */}

      <section className="sacai-grid" style={{ padding: '8rem 2rem' }}>
        <div className="sacai-grid-layer-1">
          <h2 className="text-display-2" style={{
            color: 'var(--margiela-void)',
            marginBottom: 'var(--space-21)'
          }}>
            This is philosophy
            <br />
            rendered in fabric
          </h2>
        </div>

        <div className="sacai-grid-layer-2" style={{
          backgroundColor: 'var(--zone-about-accent-1)',
          color: 'white'
        }}>
          <p className="text-lead" style={{ color: 'white' }}>
            We exist to push boundaries, question conventions,
            explore what fashion becomes when freed from commercial constraints.
          </p>
        </div>

        <div className="sacai-grid-layer-3" style={{
          backgroundColor: 'var(--zone-about-accent-2)',
          color: 'white'
        }}>
          <p className="text-heading-5" style={{ color: 'white' }}>
            NO SALES
            <br />
            NO COMPROMISE
            <br />
            NO LIMITS
          </p>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER
         ========================================================================== */}

      <footer style={{
        padding: 'var(--space-34) var(--space-21)',
        borderTop: '3px solid var(--zone-about-accent-1)',
        textAlign: 'center',
        backgroundColor: 'var(--margiela-void)',
        color: 'white'
      }}>
        <p className="text-label" style={{ color: 'var(--margiela-silver)' }}>
          CINCH LAB • EXPERIMENTAL FASHION LABORATORY • EST. 2024
        </p>
      </footer>
    </div>
  )
}