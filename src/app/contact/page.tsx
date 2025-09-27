'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
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
// CONTACT PAGE - Professional Collaboration Portal
// No Sales, Only Experimental Partnerships
// ==========================================================================

interface CollaborationType {
  code: string
  title: string
  description: string
  requirements: string[]
  timeline: string
  status: 'OPEN' | 'SELECTIVE' | 'CLOSED'
}

const collaborationTypes: CollaborationType[] = [
  {
    code: '001',
    title: 'EXHIBITION',
    description: 'Gallery and museum exhibitions for experimental fashion',
    requirements: [
      'Institutional space with climate control',
      'Curatorial freedom',
      'Non-commercial context',
      'Documentation rights'
    ],
    timeline: '6-12 months',
    status: 'SELECTIVE'
  },
  {
    code: '002',
    title: 'RESEARCH',
    description: 'Academic partnerships and material research',
    requirements: [
      'Research institution affiliation',
      'Shared IP agreement',
      'Publication commitment',
      'Laboratory access'
    ],
    timeline: '12-24 months',
    status: 'OPEN'
  },
  {
    code: '003',
    title: 'ARCHIVE',
    description: 'Museum acquisitions and permanent collections',
    requirements: [
      'Established fashion archive',
      'Conservation capabilities',
      'Scholarly access',
      'Preservation commitment'
    ],
    timeline: 'Post-exhibition',
    status: 'CLOSED'
  },
  {
    code: '004',
    title: 'CREATIVE',
    description: 'Cross-disciplinary experimental projects',
    requirements: [
      'Established practice',
      'Non-commercial focus',
      'Process documentation',
      'Experimental approach'
    ],
    timeline: 'Variable',
    status: 'SELECTIVE'
  }
]

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState<CollaborationType | null>(null)
  const [formData, setFormData] = useState({
    institution: '',
    representative: '',
    email: '',
    type: '',
    proposal: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitted(true)

    // Reset after showing confirmation
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        institution: '',
        representative: '',
        email: '',
        type: '',
        proposal: ''
      })
    }, 5000)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-off-white">

      {/* ==========================================================================
         HERO - Contact Philosophy
         ========================================================================== */}

      <section className="relative min-h-[60vh] flex items-center px-8 py-32">
        <motion.div
          className="absolute inset-0 material-paper opacity-30"
          style={{ y: parallaxY }}
        />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <span className="text-label text-accent-blood mb-4 block">
              COLLABORATION / 協作
            </span>

            <h1 className="text-5xl md:text-hero font-black mb-8 leading-none">
              <DeconstructedText intensity={2}>
                NO SALES
              </DeconstructedText>
              <br />
              <span className="text-steel">
                <DeconstructedText intensity={1.5}>
                  ONLY ART
                </DeconstructedText>
              </span>
            </h1>

            <div className="max-w-3xl">
              <p className="text-lg mb-6">
                CINCH LAB does not engage in commerce. We collaborate with institutions,
                researchers, and artists who understand fashion as experimental practice.
              </p>
              <p className="text-body text-steel">
                Every partnership must advance the philosophy of deconstruction and reconstruction.
                We seek collaborators who value process over product, experimentation over expectation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         COLLABORATION TYPES
         ========================================================================== */}

      <EditorialSection
        lineNumber="01"
        title="Collaboration Protocols"
        subtitle="Structured pathways for experimental partnerships"
        className="py-24 px-8 bg-ivory"
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {collaborationTypes.map((type, index) => (
            <motion.div
              key={type.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <LayeredCard layers={2}>
                <MaterialCard
                  material={index % 2 === 0 ? 'paper' : 'fabric'}
                  className="p-8 h-full cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => setSelectedType(type)}
                >
                  <ConstructionMarker label={type.code} position="top-left" />

                  <div className="mt-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{type.title}</h3>
                      <span className={`text-xs px-2 py-1 font-mono ${
                        type.status === 'OPEN' ? 'bg-carbon text-off-white' :
                        type.status === 'SELECTIVE' ? 'bg-steel text-off-white' :
                        'bg-accent-blood text-off-white'
                      }`}>
                        {type.status}
                      </span>
                    </div>

                    <p className="text-sm text-steel mb-6">
                      {type.description}
                    </p>

                    <div className="border-t border-steel/20 pt-4">
                      <span className="text-2xs font-mono text-steel">
                        TIMELINE: {type.timeline}
                      </span>
                    </div>
                  </div>
                </MaterialCard>
              </LayeredCard>
            </motion.div>
          ))}
        </div>
      </EditorialSection>

      {/* ==========================================================================
         CONTACT FORM
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-off-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-12">Initiate Contact</h2>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-label block mb-2">INSTITUTION</label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      className="w-full px-4 py-3 bg-transparent border-2 border-steel focus:border-off-white outline-none transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="text-label block mb-2">REPRESENTATIVE</label>
                    <input
                      type="text"
                      required
                      value={formData.representative}
                      onChange={(e) => setFormData({...formData, representative: e.target.value})}
                      className="w-full px-4 py-3 bg-transparent border-2 border-steel focus:border-off-white outline-none transition-colors"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-label block mb-2">EMAIL</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border-2 border-steel focus:border-off-white outline-none transition-colors"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="text-label block mb-2">COLLABORATION TYPE</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-4 py-3 bg-carbon border-2 border-steel focus:border-off-white outline-none transition-colors text-off-white"
                    disabled={isSubmitting}
                  >
                    <option value="">Select protocol...</option>
                    {collaborationTypes.filter(t => t.status !== 'CLOSED').map(type => (
                      <option key={type.code} value={type.code}>
                        {type.title} - {type.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-label block mb-2">PROPOSAL</label>
                  <textarea
                    required
                    rows={8}
                    value={formData.proposal}
                    onChange={(e) => setFormData({...formData, proposal: e.target.value})}
                    className="w-full px-4 py-3 bg-transparent border-2 border-steel focus:border-off-white outline-none transition-colors resize-none"
                    placeholder="Describe your vision for experimental collaboration..."
                    disabled={isSubmitting}
                  />
                </div>

                <div className="bg-steel/20 p-6 text-sm">
                  <p className="font-mono text-2xs mb-2">SUBMISSION PROTOCOL:</p>
                  <ul className="space-y-1 text-xs opacity-80">
                    <li>• No commercial proposals accepted</li>
                    <li>• Experimental intent required</li>
                    <li>• Response time: 72 hours - 2 weeks</li>
                    <li>• Documentation may be requested</li>
                  </ul>
                </div>

                <RawEdgeButton
                  variant="secondary"
                  size="large"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'SUBMIT PROPOSAL'}
                </RawEdgeButton>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-6">✓</div>
                <h3 className="text-2xl font-bold mb-4">Transmission Complete</h3>
                <p className="text-steel">
                  Your proposal has been received and encrypted.<br/>
                  We will respond within the designated timeframe.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         DIRECT CHANNELS
         ========================================================================== */}

      <EditorialSection
        lineNumber="02"
        title="Direct Channels"
        subtitle="Alternative communication protocols"
        className="py-24 px-8"
      >
        <div className="max-w-4xl mx-auto">
          <ExposedSeam showMeasurements={false} showStitching={true}>
            <div className="p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">EXHIBITIONS</h3>
                  <p className="text-sm text-steel mb-2">exhibitions@cinchlab.kr</p>
                  <p className="text-xs opacity-60">Gallery and museum inquiries</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">RESEARCH</h3>
                  <p className="text-sm text-steel mb-2">research@cinchlab.kr</p>
                  <p className="text-xs opacity-60">Academic partnerships</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">ARCHIVE</h3>
                  <p className="text-sm text-steel mb-2">archive@cinchlab.kr</p>
                  <p className="text-xs opacity-60">Collection acquisitions</p>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">PRESS</h3>
                  <p className="text-sm text-steel mb-2">press@cinchlab.kr</p>
                  <p className="text-xs opacity-60">Media and documentation</p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-steel/20">
                <p className="text-sm font-mono text-steel">
                  LOCATION: Seoul, South Korea<br/>
                  TIMEZONE: KST (UTC+9)<br/>
                  RESPONSE: 72hrs - 2 weeks<br/>
                  LANGUAGE: English, Korean, Japanese
                </p>
              </div>
            </div>
          </ExposedSeam>
        </div>
      </EditorialSection>

      {/* ==========================================================================
         FINAL STATEMENT
         ========================================================================== */}

      <section className="py-32 px-8 bg-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-black mb-8">
              <DeconstructedText intensity={1}>
                WE DON'T SELL
              </DeconstructedText>
            </h2>
            <p className="text-xl mb-12">
              We collaborate. We experiment. We document.
            </p>
            <p className="text-body text-steel max-w-2xl mx-auto">
              CINCH LAB exists outside the commercial fashion system.
              Our work is not for sale. Our experiments are for those who understand
              fashion as philosophy, as art, as endless possibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Selected Type Modal */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-carbon/90 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedType(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-off-white max-w-2xl w-full p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-label text-accent-blood">CODE {selectedType.code}</span>
                <h2 className="text-3xl font-bold mt-2">{selectedType.title}</h2>
              </div>
              <button
                onClick={() => setSelectedType(null)}
                className="text-2xl hover:text-accent-blood transition-colors"
              >
                ×
              </button>
            </div>

            <p className="text-lg mb-8">{selectedType.description}</p>

            <div className="mb-8">
              <h3 className="font-bold mb-4">Requirements</h3>
              <ul className="space-y-2">
                {selectedType.requirements.map((req, i) => (
                  <li key={i} className="text-sm text-steel flex items-start">
                    <span className="mr-2">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-steel/20">
              <span className="text-sm font-mono">TIMELINE: {selectedType.timeline}</span>
              <span className={`text-xs px-3 py-1 font-mono ${
                selectedType.status === 'OPEN' ? 'bg-carbon text-off-white' :
                selectedType.status === 'SELECTIVE' ? 'bg-steel text-off-white' :
                'bg-accent-blood text-off-white'
              }`}>
                {selectedType.status}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}