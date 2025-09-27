'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  DeconstructedText,
  LayeredCard,
  ExposedSeam,
  MaterialCard,
  EditorialSection,
  RawEdgeButton,
  ConstructionMarker
} from '@/components/MargielaSacaiComponents'

// ==========================================================================
// ABOUT PAGE - Brand Manifesto & Philosophy
// Professional, Dense, Sophisticated
// ==========================================================================

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.8, 0.7])

  return (
    <div ref={containerRef} className="min-h-screen bg-off-white">

      {/* ==========================================================================
         HERO - Brand Philosophy Statement
         ========================================================================== */}

      <section className="relative min-h-screen flex items-center px-8 py-32">
        {/* Background Texture */}
        <motion.div
          className="absolute inset-0 material-paper opacity-30"
          style={{ y: parallaxY }}
        />

        {/* Construction Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-0 right-0 h-px bg-accent-blood opacity-10"
            style={{ transform: 'rotate(-1deg)' }}
          />
          <div
            className="absolute top-1/2 left-0 right-0 h-px bg-accent-ink opacity-10"
            style={{ transform: 'rotate(0.5deg)' }}
          />
          <div
            className="absolute top-3/4 left-0 right-0 h-px bg-accent-blood opacity-10"
            style={{ transform: 'rotate(-0.5deg)' }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            style={{ opacity: textOpacity }}
          >
            {/* Label */}
            <span className="text-label text-accent-blood mb-8 block">
              MANIFESTO / 宣言
            </span>

            {/* Main Statement */}
            <h1 className="text-5xl md:text-hero font-black mb-12 leading-none">
              <DeconstructedText intensity={2}>
                WE ARE NOT
              </DeconstructedText>
              <br />
              <span className="text-steel">
                <DeconstructedText intensity={2}>
                  A BRAND
                </DeconstructedText>
              </span>
            </h1>

            {/* Philosophy Text */}
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  CINCH LAB exists in the space between destruction and creation.
                  We are an experimental fashion laboratory where commerce is disabled,
                  where sales don't exist, where every piece is a study in deconstruction.
                </p>
                <p className="text-body text-steel">
                  Inspired by Margiela's philosophy of anonymity and Sacai's hybrid constructions,
                  we operate without the constraints of commercial fashion.
                  Our work is not for sale—it is for study, for contemplation, for pushing boundaries.
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-body text-steel">
                  每一件作品都是实验的结果。我们不制造产品，我们创造可能性。
                  <br />
                  <span className="text-xs opacity-70">
                    Every piece is a result of experimentation. We don't make products, we create possibilities.
                  </span>
                </p>
                <p className="text-body text-steel">
                  解构不是破坏，而是理解。重建不是修复，而是重新想象。
                  <br />
                  <span className="text-xs opacity-70">
                    Deconstruction is not destruction, but understanding. Reconstruction is not repair, but reimagination.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         CORE PRINCIPLES
         ========================================================================== */}

      <EditorialSection
        lineNumber="01"
        title="Core Principles"
        subtitle="The foundations of our experimental practice"
        className="py-24 px-8 bg-ivory"
      >
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              number: '001',
              title: 'DECONSTRUCTION',
              description: 'Every garment begins whole, then is methodically taken apart. We expose seams, reveal structure, celebrate the internal architecture of clothing.',
              techniques: ['Pattern disruption', 'Seam exposure', 'Raw finishing']
            },
            {
              number: '002',
              title: 'HYBRIDIZATION',
              description: 'Two become one. Three become one. Multiple garments fuse into singular forms that defy categorization and challenge perception.',
              techniques: ['Garment splicing', 'Layer fusion', 'Form multiplication']
            },
            {
              number: '003',
              title: 'EXPERIMENTATION',
              description: 'Failure is data. Success is temporary. Every experiment teaches us something new about form, function, and the limits of fabric.',
              techniques: ['Material testing', 'Process iteration', 'Controlled chaos']
            }
          ].map((principle, index) => (
            <motion.div
              key={principle.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <LayeredCard layers={2}>
                <MaterialCard material={index === 0 ? 'paper' : index === 1 ? 'fabric' : 'concrete'} className="p-8 h-full">
                  <ConstructionMarker label={principle.number} position="top-left" />
                  <h3 className="text-2xl font-bold mb-4 mt-8">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-steel mb-6">
                    {principle.description}
                  </p>
                  <div className="space-y-2">
                    {principle.techniques.map(tech => (
                      <div key={tech} className="text-2xs font-mono text-steel">
                        → {tech}
                      </div>
                    ))}
                  </div>
                </MaterialCard>
              </LayeredCard>
            </motion.div>
          ))}
        </div>
      </EditorialSection>

      {/* ==========================================================================
         LABORATORY PROCESS
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-off-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-12">Our Process</h2>

            <div className="grid md:grid-cols-4 gap-px bg-steel">
              {[
                { phase: '01', name: 'OBSERVE', description: 'Study existing forms' },
                { phase: '02', name: 'DECONSTRUCT', description: 'Take apart systematically' },
                { phase: '03', name: 'EXPERIMENT', description: 'Test new combinations' },
                { phase: '04', name: 'DOCUMENT', description: 'Archive the process' }
              ].map((step, index) => (
                <motion.div
                  key={step.phase}
                  className="bg-carbon p-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <span className="text-5xl font-black text-steel/30">{step.phase}</span>
                  <h3 className="text-lg font-bold mt-4 mb-2">{step.name}</h3>
                  <p className="text-sm text-steel">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         INSPIRATIONS
         ========================================================================== */}

      <EditorialSection
        lineNumber="02"
        title="Inspirations"
        subtitle="The masters who guide our philosophy"
        className="py-24 px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            {/* Margiela */}
            <ExposedSeam showMeasurements={false} showStitching={true}>
              <div className="p-12">
                <h3 className="text-3xl font-bold mb-6">MARTIN MARGIELA</h3>
                <p className="text-lg text-steel mb-6">
                  The master of deconstruction. Margiela taught us that fashion is not about the designer,
                  but about the garment itself. Anonymity as philosophy. White as a canvas for possibility.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <span className="text-label block mb-2">TECHNIQUES</span>
                    <ul className="space-y-1 text-steel">
                      <li>• Exposed linings</li>
                      <li>• Blank labels</li>
                      <li>• Trompe-l'œil</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-label block mb-2">PHILOSOPHY</span>
                    <ul className="space-y-1 text-steel">
                      <li>• Anonymity</li>
                      <li>• Deconstruction</li>
                      <li>• Transformation</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-label block mb-2">LEGACY</span>
                    <ul className="space-y-1 text-steel">
                      <li>• Artisanal approach</li>
                      <li>• Conceptual fashion</li>
                      <li>• Process as product</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ExposedSeam>

            {/* Sacai */}
            <ExposedSeam showMeasurements={false} showStitching={true}>
              <div className="p-12">
                <h3 className="text-3xl font-bold mb-6">CHITOSE ABE / SACAI</h3>
                <p className="text-lg text-steel mb-6">
                  The architect of hybrid forms. Sacai showed us that one plus one can equal three.
                  Garments that exist in multiple dimensions simultaneously.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <span className="text-label block mb-2">TECHNIQUES</span>
                    <ul className="space-y-1 text-steel">
                      <li>• Hybrid construction</li>
                      <li>• Spliced patterns</li>
                      <li>• Multiple identities</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-label block mb-2">PHILOSOPHY</span>
                    <ul className="space-y-1 text-steel">
                      <li>• Duality</li>
                      <li>• Unexpected combinations</li>
                      <li>• Familiar yet new</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-label block mb-2">LEGACY</span>
                    <ul className="space-y-1 text-steel">
                      <li>• Collaboration culture</li>
                      <li>• Technical innovation</li>
                      <li>• Hybrid aesthetics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ExposedSeam>
          </div>
        </div>
      </EditorialSection>

      {/* ==========================================================================
         LABORATORY TEAM
         ========================================================================== */}

      <section className="py-24 px-8 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">The Laboratory</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <MaterialCard material="paper" className="p-8">
              <h3 className="text-xl font-bold mb-4">RESEARCH DIVISION</h3>
              <p className="text-sm text-steel mb-6">
                Pattern engineers, material scientists, and garment archaeologists
                working to understand the fundamental nature of clothing construction.
              </p>
              <div className="text-2xs font-mono text-steel space-y-1">
                <div>EXPERIMENTS_CONDUCTED: 1,247</div>
                <div>PATTERNS_ARCHIVED: 892</div>
                <div>FAILURES_DOCUMENTED: 2,103</div>
              </div>
            </MaterialCard>

            <MaterialCard material="fabric" className="p-8">
              <h3 className="text-xl font-bold mb-4">DOCUMENTATION DIVISION</h3>
              <p className="text-sm text-steel mb-6">
                Archivists and philosophers recording every experiment,
                every failure, every breakthrough in our ongoing exploration.
              </p>
              <div className="text-2xs font-mono text-steel space-y-1">
                <div>IMAGES_CAPTURED: 47,892</div>
                <div>WORDS_WRITTEN: 892,471</div>
                <div>THOUGHTS_PRESERVED: ∞</div>
              </div>
            </MaterialCard>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         FINAL STATEMENT
         ========================================================================== */}

      <section className="py-32 px-8 bg-carbon text-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-black mb-8">
              <DeconstructedText intensity={1.5}>
                NO SALES
              </DeconstructedText>
            </h2>
            <p className="text-xl mb-12">
              This is not a shop. This is not a brand.
              <br />
              This is an experimental fashion laboratory.
            </p>
            <p className="text-body text-steel max-w-2xl mx-auto mb-12">
              We exist to push boundaries, to question conventions,
              to explore what fashion can become when freed from commercial constraints.
              Our work is documentation, not product. Our goal is understanding, not profit.
            </p>
            <Link href="/lab">
              <RawEdgeButton variant="secondary" size="large">
                Enter the Laboratory
              </RawEdgeButton>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}