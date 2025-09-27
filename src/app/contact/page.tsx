'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  MagneticButton,
  RippleEffect,
  DistortionText,
  ParallaxContainer,
  RevealOnScroll,
  SplitText,
  Card3D,
  NoiseBackground,
  FabricDrag
} from '@/components/InteractiveElements'

// ==========================================================================
// CONTACT PAGE - Interactive Form Design
// Margiela × Sacai Communication Interface
// ==========================================================================

interface FormData {
  type: 'COLLABORATION' | 'COMMISSION' | 'EXHIBITION' | 'RESEARCH' | 'OTHER'
  name: string
  email: string
  organization: string
  message: string
  budget?: string
  timeline?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    type: 'COLLABORATION',
    name: '',
    email: '',
    organization: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [hoveredField, setHoveredField] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Terminal-style typing animation
  const [typingText, setTypingText] = useState('')
  const fullText = 'AWAITING_INPUT...'

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypingText(prev => prev + fullText[index])
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const formRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 2, -2])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulated submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitStatus('success')

    // Reset form after success
    setTimeout(() => {
      setFormData({
        type: 'COLLABORATION',
        name: '',
        email: '',
        organization: '',
        message: ''
      })
      setSubmitStatus('idle')
    }, 3000)
  }

  const inquiryTypes = [
    { value: 'COLLABORATION', label: 'ARTISTIC COLLABORATION', description: 'Joint experimental projects' },
    { value: 'COMMISSION', label: 'COMMISSION WORK', description: 'Bespoke pieces (extremely limited)' },
    { value: 'EXHIBITION', label: 'EXHIBITION REQUEST', description: 'Display our experiments' },
    { value: 'RESEARCH', label: 'RESEARCH PARTNERSHIP', description: 'Academic or technical collaboration' },
    { value: 'OTHER', label: 'OTHER INQUIRY', description: 'Undefined possibilities' }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-raw-white relative overflow-hidden">

      <NoiseBackground opacity={0.02} />

      {/* Dynamic Grid Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{ y: parallaxY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(45deg, transparent, transparent 35px, #000 35px, #000 36px),
              repeating-linear-gradient(-45deg, transparent, transparent 35px, #000 35px, #000 36px)
            `
          }}
        />
      </motion.div>

      {/* ==========================================================================
         HEADER - Contact Interface
         ========================================================================== */}

      <section className="relative pt-32 pb-16 px-8">
        {/* Deconstructed elements */}
        <div className="absolute inset-0 material-paper opacity-20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-thread-red" />
        <div className="absolute top-2 left-0 right-0 h-px bg-thread-white opacity-50" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Terminal Header */}
          <motion.div
            className="mb-12 bg-carbon text-raw-white p-4 font-mono text-xs"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                <span className="text-thread-red animate-pulse">●</span>
                <span>CONTACT_INTERFACE_v2.1</span>
                <span>|</span>
                <span>ENCRYPTION: ENABLED</span>
                <span>|</span>
                <span>NO_SALES_INQUIRIES</span>
              </div>
              <span>{typingText}</span>
            </div>
            <div className="text-thread-white/60">
              WARNING: This laboratory does not sell products. Inquiries for purchases will be ignored.
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-6xl md:text-8xl font-black mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DistortionText text="CONTACT" className="tracking-tighter" />
          </motion.h1>

          <motion.p
            className="text-xl text-carbon/70 max-w-3xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            For collaborations, commissions, and experimental partnerships only.
            We do not sell products. We create philosophy.
          </motion.p>
        </div>
      </section>

      {/* ==========================================================================
         CONTACT FORM - Interactive Design
         ========================================================================== */}

      <section className="px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8"
            style={{ rotateX: formRotate }}
          >
            {/* Inquiry Type Selector */}
            <RevealOnScroll>
              <div className="space-y-4">
                <label className="text-xs font-mono uppercase tracking-wider text-carbon/60">
                  INQUIRY_TYPE
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {inquiryTypes.map((type) => (
                    <motion.div
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card3D>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, type: type.value as FormData['type'] })}
                          className={`
                            w-full p-4 text-left transition-all
                            ${formData.type === type.value
                              ? 'layer-card bg-carbon text-raw-white'
                              : 'exposed-seam bg-raw-white text-carbon hover:bg-carbon/5'}
                          `}
                        >
                          <div className="text-sm font-bold mb-1">{type.label}</div>
                          <div className={`text-xs ${formData.type === type.value ? 'text-raw-white/70' : 'text-carbon/50'}`}>
                            {type.description}
                          </div>
                        </button>
                      </Card3D>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <RevealOnScroll>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-carbon/60">
                    NAME / 名前
                  </label>
                  <motion.div
                    className="relative"
                    onMouseEnter={() => setHoveredField('name')}
                    onMouseLeave={() => setHoveredField(null)}
                    whileHover={{ x: 5 }}
                  >
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`
                        w-full px-4 py-3 bg-transparent border-b-2 transition-all
                        ${focusedField === 'name'
                          ? 'border-thread-red'
                          : hoveredField === 'name'
                          ? 'border-carbon/40'
                          : 'border-carbon/20'}
                        focus:outline-none
                      `}
                      placeholder="Enter your name"
                    />
                    {focusedField === 'name' && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-thread-red"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </div>
              </RevealOnScroll>

              {/* Email Field */}
              <RevealOnScroll>
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-carbon/60">
                    EMAIL / メール
                  </label>
                  <motion.div
                    className="relative"
                    onMouseEnter={() => setHoveredField('email')}
                    onMouseLeave={() => setHoveredField(null)}
                    whileHover={{ x: 5 }}
                  >
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`
                        w-full px-4 py-3 bg-transparent border-b-2 transition-all
                        ${focusedField === 'email'
                          ? 'border-thread-red'
                          : hoveredField === 'email'
                          ? 'border-carbon/40'
                          : 'border-carbon/20'}
                        focus:outline-none
                      `}
                      placeholder="your@email.com"
                    />
                    {focusedField === 'email' && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-thread-red"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </div>
              </RevealOnScroll>
            </div>

            {/* Organization Field */}
            <RevealOnScroll>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-carbon/60">
                  ORGANIZATION / 組織 (OPTIONAL)
                </label>
                <motion.div
                  className="relative"
                  onMouseEnter={() => setHoveredField('organization')}
                  onMouseLeave={() => setHoveredField(null)}
                  whileHover={{ x: 5 }}
                >
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    onFocus={() => setFocusedField('organization')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full px-4 py-3 bg-transparent border-b-2 transition-all
                      ${focusedField === 'organization'
                        ? 'border-thread-red'
                        : hoveredField === 'organization'
                        ? 'border-carbon/40'
                        : 'border-carbon/20'}
                      focus:outline-none
                    `}
                    placeholder="Institution, brand, or collective"
                  />
                  {focusedField === 'organization' && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-thread-red"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </div>
            </RevealOnScroll>

            {/* Message Field */}
            <RevealOnScroll>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-carbon/60">
                  MESSAGE / メッセージ
                </label>
                <FabricDrag>
                  <motion.div
                    className="relative"
                    onMouseEnter={() => setHoveredField('message')}
                    onMouseLeave={() => setHoveredField(null)}
                  >
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`
                        w-full px-4 py-3 bg-transparent border-2 transition-all resize-none h-32
                        ${focusedField === 'message'
                          ? 'border-thread-red'
                          : hoveredField === 'message'
                          ? 'border-carbon/40'
                          : 'border-carbon/20'}
                        focus:outline-none
                      `}
                      placeholder="Describe your vision, your philosophy, your experiment..."
                    />
                    {/* Character count */}
                    <div className="absolute bottom-2 right-2 text-xs font-mono text-carbon/40">
                      {formData.message.length}/1000
                    </div>
                  </motion.div>
                </FabricDrag>
              </div>
            </RevealOnScroll>

            {/* Additional Fields for Commission */}
            <AnimatePresence>
              {formData.type === 'COMMISSION' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-carbon/60">
                      BUDGET_RANGE
                    </label>
                    <select
                      value={formData.budget || ''}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border-b-2 border-carbon/20 focus:border-thread-red focus:outline-none"
                    >
                      <option value="">Select range</option>
                      <option value="50K-100K">€50,000 - €100,000</option>
                      <option value="100K-250K">€100,000 - €250,000</option>
                      <option value="250K-500K">€250,000 - €500,000</option>
                      <option value="500K+">€500,000+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-carbon/60">
                      TIMELINE
                    </label>
                    <input
                      type="text"
                      value={formData.timeline || ''}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-3 bg-transparent border-b-2 border-carbon/20 focus:border-thread-red focus:outline-none"
                      placeholder="Expected completion"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <MagneticButton strength={0.4}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    px-12 py-4 transition-all relative overflow-hidden
                    ${isSubmitting
                      ? 'bg-carbon/50 text-raw-white/50 cursor-not-allowed'
                      : 'bg-carbon text-raw-white hover:bg-thread-red'}
                  `}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                >
                  <RippleEffect>
                    {isSubmitting ? (
                      <span className="flex items-center gap-3">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                          ⟳
                        </motion.span>
                        TRANSMITTING...
                      </span>
                    ) : (
                      'SUBMIT INQUIRY'
                    )}
                  </RippleEffect>
                </motion.button>
              </MagneticButton>
            </div>
          </motion.form>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-thread-white/10 border border-thread-white text-center"
              >
                <p className="text-lg font-bold mb-2">TRANSMISSION SUCCESSFUL</p>
                <p className="text-sm text-carbon/70">
                  Your inquiry has been archived. If it aligns with our philosophy, we will respond.
                </p>
              </motion.div>
            )}
            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-thread-red/10 border border-thread-red text-center"
              >
                <p className="text-lg font-bold mb-2">TRANSMISSION FAILED</p>
                <p className="text-sm text-carbon/70">
                  An error occurred. Please try again or contact through alternative channels.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ==========================================================================
         CONTACT INFORMATION
         ========================================================================== */}

      <ParallaxContainer offset={30}>
        <section className="py-24 px-8 bg-gradient-to-b from-raw-white to-ivory">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-black mb-12">
              <SplitText text="ALTERNATIVE CHANNELS" delay={0.02} />
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Studio Location */}
              <Card3D>
                <div className="layer-card bg-raw-white p-6 h-full">
                  <h3 className="text-xl font-bold mb-4">STUDIO</h3>
                  <p className="text-sm text-carbon/70 mb-4">
                    Location undisclosed.
                    <br />
                    By appointment only.
                    <br />
                    No unscheduled visits.
                  </p>
                  <div className="text-xs font-mono text-carbon/50">
                    Seoul / Tokyo / Paris
                  </div>
                </div>
              </Card3D>

              {/* Press Inquiries */}
              <Card3D>
                <div className="layer-card bg-raw-white p-6 h-full">
                  <h3 className="text-xl font-bold mb-4">PRESS</h3>
                  <p className="text-sm text-carbon/70 mb-4">
                    For media inquiries and
                    <br />
                    publication requests only.
                  </p>
                  <div className="text-xs font-mono">
                    press@cinchlab.void
                  </div>
                </div>
              </Card3D>

              {/* Collaborations */}
              <Card3D>
                <div className="layer-card bg-raw-white p-6 h-full">
                  <h3 className="text-xl font-bold mb-4">COLLABORATIONS</h3>
                  <p className="text-sm text-carbon/70 mb-4">
                    Research partnerships and
                    <br />
                    experimental projects.
                  </p>
                  <div className="text-xs font-mono">
                    collab@cinchlab.void
                  </div>
                </div>
              </Card3D>
            </div>
          </div>
        </section>
      </ParallaxContainer>

      {/* ==========================================================================
         FINAL WARNING
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-raw-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-black mb-6">
              <DistortionText text="IMPORTANT NOTICE" className="text-thread-red" />
            </h3>
            <p className="text-lg mb-8 text-raw-white/80">
              CINCH LAB does not sell products. We do not have a shop.
              We do not take orders. We are not a brand.
            </p>
            <p className="text-sm text-raw-white/60 max-w-2xl mx-auto">
              We are an experimental fashion laboratory focused on philosophical exploration
              through garment deconstruction and reconstruction. Any inquiries regarding
              purchases will be automatically archived without response.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}