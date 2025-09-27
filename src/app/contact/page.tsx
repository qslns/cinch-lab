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

// Collaboration Categories
const collaborationCategories = [
  {
    id: 'EXHIBITION',
    line: '00',
    title: 'GALLERY EXHIBITIONS',
    description: 'Showcase experiments in institutional spaces',
    philosophy: 'Fashion as art installation, not commerce',
    requirements: [
      'Minimum 300m² white cube space',
      'Climate controlled environment',
      'No commercial activity during exhibition',
      'Full curatorial freedom'
    ],
    status: 'SELECTIVE',
    timeline: '6-12 months'
  },
  {
    id: 'RESEARCH',
    line: '01',
    title: 'ACADEMIC PARTNERSHIPS',
    description: 'Material science and construction research',
    philosophy: 'Push boundaries through scientific method',
    requirements: [
      'University or research institution',
      'Shared intellectual property',
      'Published findings',
      'Access to specialized equipment'
    ],
    status: 'OPEN',
    timeline: '12-24 months'
  },
  {
    id: 'ARCHIVE',
    line: '10',
    title: 'MUSEUM ACQUISITION',
    description: 'Permanent collection placement',
    philosophy: 'Preservation of experimental fashion history',
    requirements: [
      'Established fashion archive',
      'Conservation capabilities',
      'No commercial exploitation',
      'Scholarly access guaranteed'
    ],
    status: 'RARE',
    timeline: 'Post-exhibition'
  },
  {
    id: 'CREATIVE',
    line: '11',
    title: 'ARTISTIC COLLABORATION',
    description: 'Cross-disciplinary experimental projects',
    philosophy: 'Fashion meets art, architecture, sound',
    requirements: [
      'Established experimental practice',
      'Non-commercial focus',
      'Willingness to fail',
      'Documentation commitment'
    ],
    status: 'BY_INVITATION',
    timeline: 'Variable'
  }
]

// Contact Protocols
const contactProtocols = [
  { channel: 'EXHIBITIONS', email: 'void@cinchlab.kr', response: '72hrs', encryption: 'PGP' },
  { channel: 'RESEARCH', email: 'lab@cinchlab.kr', response: '1 week', encryption: 'AES-256' },
  { channel: 'ARCHIVE', email: 'memory@cinchlab.kr', response: '2 weeks', encryption: 'RSA-4096' },
  { channel: 'PRESS', email: 'signal@cinchlab.kr', response: '48hrs', encryption: 'TLS' }
]

// Collaboration Process
const collaborationProcess = [
  { phase: 'INITIAL_CONTACT', description: 'Proposal submission with portfolio', status: 'REQUIRED' },
  { phase: 'PHILOSOPHY_ALIGNMENT', description: 'Vision and values assessment', status: 'CRITICAL' },
  { phase: 'TECHNICAL_REVIEW', description: 'Capability and resource evaluation', status: 'DETAILED' },
  { phase: 'EXPERIMENTAL_DIALOGUE', description: 'Creative exploration sessions', status: 'COLLABORATIVE' },
  { phase: 'DOCUMENTATION', description: 'Process and outcome archival', status: 'PERMANENT' }
]

type ViewMode = 'CHANNELS' | 'PROCESS' | 'PHILOSOPHY' | 'FORM'

export default function ContactPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('CHANNELS')
  const [selectedCategory, setSelectedCategory] = useState<typeof collaborationCategories[0] | null>(null)
  const [activeProtocol, setActiveProtocol] = useState(0)
  const [formData, setFormData] = useState({
    entity: '',
    representative: '',
    channel: '',
    category: '',
    proposal: ''
  })
  const [isTransmitting, setIsTransmitting] = useState(false)
  const [transmissionComplete, setTransmissionComplete] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform values
  const connectionStrength = useTransform(scrollYProgress, [0, 1], [0, 100])
  const signalIntegrity = useTransform(scrollYProgress, [0, 0.5, 1], [100, 75, 50])

  // Cycle through protocols
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProtocol((prev) => (prev + 1) % contactProtocols.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Process phase animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % collaborationProcess.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const handleTransmission = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTransmitting(true)

    // Simulate transmission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setTransmissionComplete(true)
    setIsTransmitting(false)

    // Reset after display
    setTimeout(() => {
      setTransmissionComplete(false)
      setFormData({
        entity: '',
        representative: '',
        channel: '',
        category: '',
        proposal: ''
      })
    }, 5000)
  }

  const renderChannelsView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {collaborationCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setSelectedCategory(category)}
          className="cursor-pointer"
        >
          <AsymmetricTransform intensity={1.5}>
            <DeconstructedHover intensity={2}>
              <div className="relative bg-white-1 p-8 border-2 border-gray-plaster hover:border-black-100 transition-all">
                {/* Line Number */}
                <div className="absolute -top-3 -left-3 bg-white-0 px-2 text-micro font-mono">
                  LINE_{category.line}
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 text-xs font-mono ${
                    category.status === 'OPEN' ? 'bg-black-100 text-white-0' :
                    category.status === 'SELECTIVE' ? 'bg-gray-steel text-white-0' :
                    category.status === 'RARE' ? 'bg-hybrid-red text-white-0' :
                    'bg-white-0 border-2 border-black-100'
                  }`}>
                    {category.status}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black mb-4 mt-8">{category.title}</h3>
                <p className="text-sm mb-4 opacity-80">{category.description}</p>

                <div className="text-sm italic mb-6 opacity-60">
                  "{category.philosophy}"
                </div>

                {/* Requirements Preview */}
                <div className="border-t border-gray-plaster pt-4">
                  <div className="text-micro font-mono text-gray-steel mb-2">REQUIREMENTS:</div>
                  <ul className="text-xs space-y-1 opacity-70">
                    {category.requirements.slice(0, 2).map((req, i) => (
                      <li key={i}>• {req}</li>
                    ))}
                    {category.requirements.length > 2 && (
                      <li className="opacity-50">+{category.requirements.length - 2} more</li>
                    )}
                  </ul>
                </div>

                <div className="mt-4 text-micro font-mono opacity-60">
                  TIMELINE: {category.timeline}
                </div>
              </div>
            </DeconstructedHover>
          </AsymmetricTransform>
        </motion.div>
      ))}
    </div>
  )

  const renderProcessView = () => (
    <ExposedStructure showGrid showMeasurements>
      <div className="p-12 bg-white-1">
        <h3 className="text-2xl font-black mb-8">COLLABORATION PROTOCOL</h3>

        {/* Process Timeline */}
        <div className="relative">
          <div className="absolute left-12 top-0 bottom-0 w-px bg-gray-plaster" />

          {collaborationProcess.map((phase, index) => (
            <motion.div
              key={phase.phase}
              className="relative flex items-start mb-12"
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: currentPhase === index ? 1 : 0.4,
                x: 0
              }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Node */}
              <div className={`absolute left-12 w-6 h-6 -translate-x-1/2 ${
                currentPhase === index ? 'bg-black-100' : 'bg-white-0 border-2 border-gray-plaster'
              }`} />

              {/* Content */}
              <div className="ml-24">
                <div className="flex items-center gap-4 mb-2">
                  <h4 className="text-lg font-bold">{phase.phase.replace(/_/g, ' ')}</h4>
                  <span className={`px-2 py-1 text-xs font-mono ${
                    phase.status === 'REQUIRED' ? 'bg-hybrid-red text-white-0' :
                    phase.status === 'CRITICAL' ? 'bg-black-100 text-white-0' :
                    phase.status === 'COLLABORATIVE' ? 'bg-hybrid-blue text-white-0' :
                    'bg-gray-plaster'
                  }`}>
                    {phase.status}
                  </span>
                </div>
                <p className="text-sm opacity-70">{phase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Protocols */}
        <div className="mt-16 border-t border-gray-plaster pt-8">
          <h4 className="text-lg font-black mb-6">DIRECT CHANNELS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contactProtocols.map((protocol, index) => (
              <motion.div
                key={protocol.channel}
                className={`p-4 border-2 transition-all ${
                  activeProtocol === index
                    ? 'border-black-100 bg-gray-plaster/20'
                    : 'border-gray-plaster'
                }`}
                animate={{
                  scale: activeProtocol === index ? 1.02 : 1
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-bold">{protocol.channel}</h5>
                  <span className="text-micro font-mono">{protocol.encryption}</span>
                </div>
                <p className="text-sm font-mono text-hybrid-blue mb-1">{protocol.email}</p>
                <p className="text-xs opacity-60">Response: {protocol.response}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </ExposedStructure>
  )

  const renderPhilosophyView = () => (
    <SacaiLayer layers={2}>
      <div className="max-w-3xl mx-auto text-center py-12">
        <h3 className="text-3xl font-black mb-8">COLLABORATION PHILOSOPHY</h3>

        <div className="space-y-12">
          <div>
            <h4 className="text-xl font-bold mb-4">NO COMMERCIAL INTENT</h4>
            <p className="text-lg leading-relaxed">
              We do not sell. We do not produce for markets. Every collaboration must exist
              purely for the advancement of fashion as art and philosophy.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">EXPERIMENTAL FREEDOM</h4>
            <p className="text-lg leading-relaxed">
              Our laboratory demands complete creative autonomy. We collaborate with those who
              understand that failure is more valuable than commercial success.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4">DOCUMENTATION OVER DISTRIBUTION</h4>
            <p className="text-lg leading-relaxed">
              We archive processes, not products. Our collaborations create knowledge and
              inspiration for future generations, not items for current consumption.
            </p>
          </div>

          <div className="pt-8 border-t border-black-100">
            <p className="text-2xl font-black">
              "WE SEEK PARTNERS, NOT CUSTOMERS"
            </p>
          </div>
        </div>
      </div>
    </SacaiLayer>
  )

  const renderFormView = () => (
    <FragmentMosaic fragments={6}>
      <div className="max-w-2xl mx-auto bg-white-0 p-12">
        <h3 className="text-2xl font-black mb-8">INITIATE TRANSMISSION</h3>

        <AnimatePresence mode="wait">
          {!transmissionComplete ? (
            <motion.form
              onSubmit={handleTransmission}
              className="space-y-6"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div>
                <label className="block text-micro font-mono mb-2">ENTITY_NAME</label>
                <input
                  type="text"
                  required
                  value={formData.entity}
                  onChange={(e) => setFormData({ ...formData, entity: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-plaster focus:border-black-100 outline-none transition-colors"
                  disabled={isTransmitting}
                />
              </div>

              <div>
                <label className="block text-micro font-mono mb-2">REPRESENTATIVE_ID</label>
                <input
                  type="text"
                  required
                  value={formData.representative}
                  onChange={(e) => setFormData({ ...formData, representative: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-plaster focus:border-black-100 outline-none transition-colors"
                  disabled={isTransmitting}
                />
              </div>

              <div>
                <label className="block text-micro font-mono mb-2">RETURN_CHANNEL</label>
                <input
                  type="email"
                  required
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-plaster focus:border-black-100 outline-none transition-colors"
                  placeholder="encrypted@channel.com"
                  disabled={isTransmitting}
                />
              </div>

              <div>
                <label className="block text-micro font-mono mb-2">COLLABORATION_TYPE</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-plaster focus:border-black-100 outline-none transition-colors"
                  disabled={isTransmitting}
                >
                  <option value="">SELECT_PROTOCOL...</option>
                  {collaborationCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-micro font-mono mb-2">PROPOSAL_DATA</label>
                <textarea
                  required
                  rows={8}
                  value={formData.proposal}
                  onChange={(e) => setFormData({ ...formData, proposal: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-plaster focus:border-black-100 outline-none transition-colors resize-none font-mono text-sm"
                  placeholder="DESCRIBE YOUR VISION FOR EXPERIMENTAL COLLABORATION..."
                  disabled={isTransmitting}
                />
              </div>

              <div className="bg-black-100 text-white-0 p-4 text-xs font-mono">
                <p className="mb-2">TRANSMISSION_PROTOCOL:</p>
                <ul className="space-y-1 opacity-80">
                  <li>• NO COMMERCIAL PROPOSALS ACCEPTED</li>
                  <li>• SERIOUS EXPERIMENTAL INTENT REQUIRED</li>
                  <li>• PHILOSOPHY ALIGNMENT MANDATORY</li>
                  <li>• RESPONSE TIME: 72HRS - 2 WEEKS</li>
                </ul>
              </div>

              <motion.button
                type="submit"
                className="w-full py-4 bg-black-100 text-white-0 font-bold hover:bg-hybrid-red transition-colors disabled:opacity-50"
                whileTap={{ scale: 0.98 }}
                disabled={isTransmitting}
              >
                {isTransmitting ? 'TRANSMITTING...' : 'INITIATE TRANSMISSION'}
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-black-100 flex items-center justify-center">
                <span className="text-4xl text-white-0">⊗</span>
              </div>
              <h3 className="text-2xl font-black mb-4">TRANSMISSION COMPLETE</h3>
              <p className="text-sm font-mono opacity-60">
                TRACKING_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <p className="mt-4 text-sm opacity-80">
                Your proposal has been received and encrypted.<br/>
                We will respond through the designated channel.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FragmentMosaic>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overlay-grid opacity-20" />
        <div className="absolute inset-0 texture-muslin opacity-10" />
      </div>

      {/* Connection Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>CONNECTION_STRENGTH: {Math.round(connectionStrength.get())}%</span>
              <span className="opacity-60">|</span>
              <span>SIGNAL_INTEGRITY: {Math.round(signalIntegrity.get())}%</span>
              <span className="opacity-60">|</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                PROTOCOL: {contactProtocols[activeProtocol].encryption}
              </motion.span>
            </div>
            <span>NO SALES • ONLY COLLABORATION</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Title */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ExposedStructure showGrid>
              <div className="py-12">
                <div className="text-micro font-mono text-hybrid-red mb-2">
                  COLLABORATION_CHANNELS / NO_COMMERCE
                </div>
                <h1 className="text-display font-black tracking-tightest uppercase">
                  CONTACT
                </h1>
                <div className="text-lg text-gray-steel mt-4 max-w-2xl">
                  Initiate collaboration for exhibitions, research, and experimental projects.
                  We do not accept commercial inquiries.
                </div>
              </div>
            </ExposedStructure>
          </motion.div>

          {/* View Controls */}
          <div className="mb-12">
            <div className="flex gap-2">
              {(['CHANNELS', 'PROCESS', 'PHILOSOPHY', 'FORM'] as ViewMode[]).map(mode => (
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
          </div>

          {/* Content Display */}
          <div className="mb-20">
            {viewMode === 'CHANNELS' && renderChannelsView()}
            {viewMode === 'PROCESS' && renderProcessView()}
            {viewMode === 'PHILOSOPHY' && renderPhilosophyView()}
            {viewMode === 'FORM' && renderFormView()}
          </div>

          {/* Laboratory Statement */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-micro font-mono text-gray-steel mb-4">
              CINCH LAB PROTOCOL
            </div>
            <h2 className="text-4xl font-black mb-8">
              NO SALES • NO COMPROMISE • ONLY CREATION
            </h2>
            <p className="text-lg text-gray-steel max-w-2xl mx-auto">
              We collaborate with those who understand fashion as philosophy, not product.
              Every connection must advance the art of deconstruction and reconstruction.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Detail Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCategory(null)}
              className="fixed inset-0 bg-black-100/90 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-16 md:inset-32 bg-white-0 z-50 overflow-auto"
            >
              <div className="p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      LINE_{selectedCategory.line} • {selectedCategory.id}
                    </div>
                    <h2 className="text-4xl font-black">{selectedCategory.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-2xl hover:text-hybrid-red transition-colors"
                  >
                    ×
                  </button>
                </div>

                <p className="text-lg mb-6">{selectedCategory.description}</p>

                <div className="bg-gray-plaster/30 p-6 mb-6">
                  <h3 className="font-bold mb-3">PHILOSOPHY</h3>
                  <p className="italic">{selectedCategory.philosophy}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold mb-3">REQUIREMENTS</h3>
                  <ul className="space-y-2">
                    {selectedCategory.requirements.map((req, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-3">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-gray-plaster">
                  <div>
                    <span className="text-sm font-mono opacity-60">TIMELINE: </span>
                    <span className="font-bold">{selectedCategory.timeline}</span>
                  </div>
                  <div className={`px-4 py-2 text-sm font-mono ${
                    selectedCategory.status === 'OPEN' ? 'bg-black-100 text-white-0' :
                    selectedCategory.status === 'SELECTIVE' ? 'bg-gray-steel text-white-0' :
                    selectedCategory.status === 'RARE' ? 'bg-hybrid-red text-white-0' :
                    'bg-white-0 border-2 border-black-100'
                  }`}>
                    STATUS: {selectedCategory.status}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}