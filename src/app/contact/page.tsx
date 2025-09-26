'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CipherText from '@/components/CipherText'

gsap.registerPlugin(ScrollTrigger)

// Collaboration Types
const collaborationTypes = [
  {
    id: 'COLLAB_001',
    type: 'EXHIBITION',
    title: 'GALLERY & MUSEUM EXHIBITIONS',
    description: 'Showcase our experimental pieces in your space. No sales, pure art.',
    requirements: [
      'Minimum 200m² exhibition space',
      'Climate controlled environment',
      'Security protocols for experimental pieces',
      'No commercial sales during exhibition'
    ],
    timeline: '3-6 months planning',
    status: 'ACCEPTING'
  },
  {
    id: 'COLLAB_002',
    type: 'RESEARCH',
    title: 'ACADEMIC & RESEARCH PARTNERSHIPS',
    description: 'Collaborate on pushing the boundaries of fashion and material science.',
    requirements: [
      'Research institution or university affiliation',
      'Shared research findings',
      'Co-authored publications',
      'Access to specialized equipment'
    ],
    timeline: '6-12 months minimum',
    status: 'SELECTIVE'
  },
  {
    id: 'COLLAB_003',
    type: 'MEDIA',
    title: 'EDITORIAL & DOCUMENTATION',
    description: 'Document our experiments and philosophy through your lens.',
    requirements: [
      'Portfolio of experimental work',
      'Understanding of our no-commerce philosophy',
      'Creative vision alignment',
      'High-quality documentation capabilities'
    ],
    timeline: 'Project based',
    status: 'OPEN'
  },
  {
    id: 'COLLAB_004',
    type: 'CREATIVE',
    title: 'ARTISTIC COLLABORATIONS',
    description: 'Cross-disciplinary projects with artists, musicians, architects.',
    requirements: [
      'Established body of work',
      'Experimental approach',
      'Non-commercial focus',
      'Willingness to fail'
    ],
    timeline: 'Variable',
    status: 'BY_INVITATION'
  },
  {
    id: 'COLLAB_005',
    type: 'ACQUISITION',
    title: 'PRIVATE COLLECTION ACQUISITION',
    description: 'After exhibition, select pieces may find homes with serious collectors.',
    requirements: [
      'Understanding of experimental fashion',
      'Commitment to preservation',
      'No resale for profit',
      'Private collection only'
    ],
    timeline: 'Post-exhibition only',
    status: 'RARE'
  }
]

// Contact Channels
const contactChannels = [
  {
    id: 'CHANNEL_001',
    purpose: 'EXHIBITIONS',
    email: 'exhibitions@cinchlab.com',
    response: '48-72 hours',
    priority: 'HIGH'
  },
  {
    id: 'CHANNEL_002',
    purpose: 'COLLABORATIONS',
    email: 'collab@cinchlab.com',
    response: '1 week',
    priority: 'MEDIUM'
  },
  {
    id: 'CHANNEL_003',
    purpose: 'PRESS & MEDIA',
    email: 'press@cinchlab.com',
    response: '24-48 hours',
    priority: 'HIGH'
  },
  {
    id: 'CHANNEL_004',
    purpose: 'RESEARCH',
    email: 'research@cinchlab.com',
    response: '2 weeks',
    priority: 'LOW'
  },
  {
    id: 'CHANNEL_005',
    purpose: 'GENERAL',
    email: 'hello@cinchlab.com',
    response: '1-2 weeks',
    priority: 'LOW'
  }
]

// Collaboration Process
const processSteps = [
  {
    step: 1,
    phase: 'INITIAL CONTACT',
    description: 'Send detailed proposal with portfolio',
    duration: '1-2 weeks',
    status: 'REQUIRED'
  },
  {
    step: 2,
    phase: 'REVIEW & EVALUATION',
    description: 'Our team reviews alignment with CINCH LAB philosophy',
    duration: '2-4 weeks',
    status: 'INTERNAL'
  },
  {
    step: 3,
    phase: 'DIALOGUE',
    description: 'Discussion of vision, expectations, and boundaries',
    duration: '2-3 weeks',
    status: 'COLLABORATIVE'
  },
  {
    step: 4,
    phase: 'AGREEMENT',
    description: 'Formal agreement with clear non-commercial terms',
    duration: '1 week',
    status: 'LEGAL'
  },
  {
    step: 5,
    phase: 'EXECUTION',
    description: 'Project implementation with regular check-ins',
    duration: 'Variable',
    status: 'ACTIVE'
  },
  {
    step: 6,
    phase: 'DOCUMENTATION',
    description: 'Archive and document the collaboration',
    duration: 'Ongoing',
    status: 'PERMANENT'
  }
]

export default function ContactPage() {
  const [selectedCollabType, setSelectedCollabType] = useState<string | null>(null)
  const [activeChannel, setActiveChannel] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    type: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [connectionStatus, setConnectionStatus] = useState('SECURE')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax effects
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  useEffect(() => {
    // Connection status updates
    const statusInterval = setInterval(() => {
      const statuses = ['SECURE', 'ENCRYPTED', 'VERIFIED', 'PROTECTED']
      setConnectionStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 3000)

    // Process step animation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % processSteps.length)
    }, 2000)

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.from('.collab-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })

      gsap.from('.channel-item', {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      })

      gsap.from('.process-step', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out'
      })
    })

    return () => {
      clearInterval(statusInterval)
      clearInterval(stepInterval)
      ctx.revert()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setSubmitted(true)
    setSubmitting(false)

    // Reset after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        name: '',
        organization: '',
        email: '',
        type: '',
        message: ''
      })
    }, 5000)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black text-white relative">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: opacityParallax }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-safety-orange/5 to-transparent" />
      </motion.div>

      {/* Header */}
      <section className="relative py-24 px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          style={{ y: yParallax }}
        >
          <h1 className="text-[clamp(60px,10vw,180px)] font-black mb-8 leading-[0.85]">
            <CipherText text="CONTACT" />
          </h1>
          <p className="text-sm font-mono opacity-60 mb-4">
            COLLABORATIONS • EXHIBITIONS • RESEARCH • NO SALES
          </p>
          <p className="text-lg italic opacity-80 max-w-2xl mx-auto">
            "We don't sell clothes. We create experiences. Contact us for exhibitions, collaborations, and research partnerships."
          </p>

          {/* Connection Status */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="text-xs font-mono">
              <span className="opacity-60">CONNECTION:</span>
              <span className="ml-2 text-hazmat-green">{connectionStatus}</span>
            </div>
            <div className="w-2 h-2 bg-hazmat-green animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* Collaboration Types */}
      <section className="py-16 px-8 bg-white text-carbon-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-center">COLLABORATION OPPORTUNITIES</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collaborationTypes.map((collab) => (
              <motion.div
                key={collab.id}
                className="collab-card bg-paper-white border-3 border-carbon-black p-6 cursor-pointer hover:border-safety-orange transition-all"
                onClick={() => setSelectedCollabType(collab.id)}
                whileHover={{ y: -10 }}
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-mono opacity-60">{collab.type}</span>
                  <span className={`px-2 py-1 text-xs font-mono font-bold ${
                    collab.status === 'ACCEPTING' ? 'bg-hazmat-green text-carbon-black' :
                    collab.status === 'OPEN' ? 'bg-safety-orange text-white' :
                    collab.status === 'SELECTIVE' ? 'bg-glitch-cyan text-carbon-black' :
                    collab.status === 'BY_INVITATION' ? 'bg-glitch-red text-white' :
                    'bg-carbon-black text-white'
                  }`}>
                    {collab.status}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-black mb-3">{collab.title}</h3>
                <p className="text-sm mb-4 opacity-80">{collab.description}</p>

                {/* Requirements */}
                <div className="mb-4">
                  <p className="text-xs font-mono opacity-60 mb-2">REQUIREMENTS:</p>
                  <ul className="space-y-1">
                    {collab.requirements.slice(0, 2).map((req, i) => (
                      <li key={i} className="text-xs flex items-start">
                        <span className="text-safety-orange mr-2">•</span>
                        <span className="opacity-80">{req}</span>
                      </li>
                    ))}
                    {collab.requirements.length > 2 && (
                      <li className="text-xs opacity-60">
                        +{collab.requirements.length - 2} more requirements
                      </li>
                    )}
                  </ul>
                </div>

                {/* Timeline */}
                <div className="text-xs font-mono opacity-60">
                  TIMELINE: {collab.timeline}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-center">DIRECT CHANNELS</h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {contactChannels.map((channel) => (
              <motion.div
                key={channel.id}
                className="channel-item bg-white text-carbon-black p-6 border-2 border-white hover:border-safety-orange transition-all cursor-pointer"
                onMouseEnter={() => setActiveChannel(channel.id)}
                onMouseLeave={() => setActiveChannel(null)}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-black mb-1">{channel.purpose}</h3>
                    <p className="text-sm font-mono text-safety-orange">{channel.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono opacity-60">RESPONSE TIME</p>
                    <p className="text-sm font-bold">{channel.response}</p>
                  </div>
                  <div className="ml-8">
                    <div className={`w-3 h-3 ${
                      channel.priority === 'HIGH' ? 'bg-glitch-red' :
                      channel.priority === 'MEDIUM' ? 'bg-safety-orange' :
                      'bg-hazmat-green'
                    }`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs font-mono opacity-60">
              ALL COMMUNICATIONS ENCRYPTED • NO SALES INQUIRIES • SERIOUS PROPOSALS ONLY
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Process */}
      <section className="py-16 px-8 bg-concrete-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-center text-white">COLLABORATION PROCESS</h2>

          <div className="relative">
            {/* Process Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />

            {/* Process Steps */}
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className={`process-step relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-12`}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentStep >= index ? 1 : 0.3 }}
                transition={{ duration: 0.5 }}
              >
                {/* Step Node */}
                <div className={`absolute left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center ${
                  currentStep >= index ? 'bg-safety-orange' : 'bg-carbon-black'
                } text-white font-black`}>
                  {step.step}
                </div>

                {/* Step Content */}
                <div className={`w-5/12 p-6 bg-white text-carbon-black ${
                  index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-black">{step.phase}</h3>
                    <span className={`px-2 py-1 text-xs font-mono ${
                      step.status === 'REQUIRED' ? 'bg-glitch-red text-white' :
                      step.status === 'INTERNAL' ? 'bg-carbon-black text-white' :
                      step.status === 'COLLABORATIVE' ? 'bg-safety-orange text-white' :
                      step.status === 'LEGAL' ? 'bg-glitch-cyan text-carbon-black' :
                      step.status === 'ACTIVE' ? 'bg-hazmat-green text-carbon-black' :
                      'bg-concrete-gray text-white'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-sm mb-2 opacity-80">{step.description}</p>
                  <p className="text-xs font-mono opacity-60">DURATION: {step.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-8 bg-white text-carbon-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black mb-12 text-center">INITIATE CONTACT</h2>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono opacity-60 mb-2">NAME / 이름</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-carbon-black focus:border-safety-orange outline-none transition-colors"
                      disabled={submitting}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono opacity-60 mb-2">ORGANIZATION / 조직</label>
                    <input
                      type="text"
                      required
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-carbon-black focus:border-safety-orange outline-none transition-colors"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono opacity-60 mb-2">EMAIL / 이메일</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-carbon-black focus:border-safety-orange outline-none transition-colors"
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono opacity-60 mb-2">COLLABORATION TYPE / 협업 유형</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-carbon-black focus:border-safety-orange outline-none transition-colors"
                    disabled={submitting}
                  >
                    <option value="">Select Type...</option>
                    <option value="EXHIBITION">Exhibition</option>
                    <option value="RESEARCH">Research Partnership</option>
                    <option value="MEDIA">Media & Editorial</option>
                    <option value="CREATIVE">Creative Collaboration</option>
                    <option value="ACQUISITION">Private Acquisition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono opacity-60 mb-2">PROPOSAL / 제안</label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-carbon-black focus:border-safety-orange outline-none transition-colors resize-none"
                    placeholder="Describe your vision and how it aligns with CINCH LAB's philosophy..."
                    disabled={submitting}
                  />
                </div>

                <div className="text-xs font-mono opacity-60 p-4 bg-carbon-black/5">
                  <p className="mb-2">IMPORTANT NOTICE:</p>
                  <ul className="space-y-1">
                    <li>• We do not accept commercial sales inquiries</li>
                    <li>• All collaborations must align with our no-commerce philosophy</li>
                    <li>• Serious proposals only - we value quality over quantity</li>
                    <li>• Response time varies based on proposal complexity</li>
                  </ul>
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 bg-carbon-black text-white font-mono text-sm hover:bg-safety-orange transition-colors disabled:opacity-50"
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting}
                >
                  {submitting ? 'TRANSMITTING...' : 'SEND PROPOSAL'}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-hazmat-green flex items-center justify-center">
                  <span className="text-3xl text-white">✓</span>
                </div>
                <h3 className="text-2xl font-black mb-4">PROPOSAL RECEIVED</h3>
                <p className="text-sm font-mono opacity-60">
                  MESSAGE ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p className="mt-4">
                  We will review your proposal and respond within the appropriate timeframe.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Final Statement */}
      <section className="py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-8">
            NO SALES. ONLY CREATION.
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            CINCH LAB exists beyond commerce. We seek partners who understand that fashion
            is art, experiment, and philosophy. If you share our vision of fashion without
            compromise, we want to hear from you.
          </p>
          <p className="mt-8 text-2xl font-black text-safety-orange">
            "CINCH LAB은 최고이자 난 천재야"
          </p>
        </div>
      </section>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-carbon-black/80 backdrop-blur-sm border-t border-white/10 p-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB_CONTACT • COLLABORATIONS_ONLY • NO_SALES
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-mono opacity-60">
              SEOUL • NEW YORK • PARIS
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}