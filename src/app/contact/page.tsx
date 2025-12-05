'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import { Slot, AnnotationLabel } from '@/components/deconstructivist'

const inquiryTypes = [
  { value: '', label: 'Select type' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'press', label: 'Press' },
  { value: 'exhibition', label: 'Exhibition' },
  { value: 'general', label: 'General' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
    website: '', // Honeypot field for bot protection
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', type: '', message: '', website: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-yon-white overflow-x-hidden">
      {/* ============================================
          CONTACT - Dense Deconstructivist Collage - fits single screen
          15+ scattered slots around minimal form
          ============================================ */}
      <section className="relative w-full overflow-hidden texture-grain" style={{ height: 'calc(100vh - 42px)' }}>
        {/* Background typography - @ symbol massive */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            right: '-20%',
            fontSize: 'clamp(20rem, 50vw, 80rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            lineHeight: 0.8,
            color: '#0A0A0A',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          @
        </span>

        {/* Secondary background text - MAIL */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-10%',
            fontSize: 'clamp(10rem, 25vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            letterSpacing: '-0.03em',
            color: '#0A0A0A',
            transform: 'rotate(-8deg)',
          }}
          aria-hidden="true"
        >
          MAIL
        </span>

        {/* Third layer - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '15%',
            left: '3%',
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            letterSpacing: '0.3em',
            color: '#8B7355',
            writingMode: 'vertical-rl',
          }}
          aria-hidden="true"
        >
          CONTACT
        </span>

        {/* ===== SCATTERED SLOTS - 15 slots around the page ===== */}

        {/* Slot 1: Hero top left - bleeding */}
        <Slot
          label="STUDIO"
          size="large"
          position="absolute"
          top="-3%"
          left="-5%"
          rotation={-3}
          clip="irregular-1"
          shadow="offset-xl"
          zIndex={15}
          bleed="left"
          bleedAmount="lg"
          grayscale
          annotationNumber="001"
        />

        {/* Slot 2: Medium right top */}
        <Slot
          label="CONTACT"
          size="medium"
          position="absolute"
          top="5%"
          right="8%"
          rotation={4}
          clip="torn-1"
          shadow="float"
          zIndex={18}
          decoration="tape-corner"
          bleed="right"
          bleedAmount="md"
        />

        {/* Slot 3: Small - left side */}
        <Slot
          label="SEOUL"
          size="small"
          position="absolute"
          top="35%"
          left="3%"
          rotation={-6}
          clip="organic-1"
          shadow="offset"
          zIndex={20}
          decoration="pin"
        />

        {/* Slot 4: Swatch cluster 1 */}
        <Slot
          label="A"
          size="swatch"
          position="absolute"
          top="15%"
          left="35%"
          rotation={12}
          border="rough"
          zIndex={22}
          decoration="tape-top"
        />

        {/* Slot 5: Swatch cluster 2 */}
        <Slot
          label="B"
          size="swatch"
          position="absolute"
          top="18%"
          left="42%"
          rotation={-8}
          border="accent"
          zIndex={24}
          overlapX={20}
        />

        {/* Slot 6: Tiny - right upper */}
        <Slot
          label="REF"
          size="tiny"
          position="absolute"
          top="28%"
          right="15%"
          rotation={-10}
          clip="notch-1"
          zIndex={25}
          decoration="clip"
        />

        {/* Slot 7: Medium-wide - bottom left bleeding */}
        <Slot
          label="PROCESS"
          size="medium-wide"
          position="absolute"
          bottom="25%"
          left="-4%"
          rotation={3}
          clip="wave-1"
          shadow="soft"
          zIndex={12}
          bleed="left"
          bleedAmount="md"
          sepia
        />

        {/* Slot 8: Small-square - right middle */}
        <Slot
          label="MAIL"
          size="small-square"
          position="absolute"
          top="55%"
          right="5%"
          rotation={-5}
          clip="diagonal-1"
          shadow="dramatic"
          zIndex={16}
          bleed="right"
          bleedAmount="sm"
        />

        {/* Slot 9: Tiny-wide - scattered */}
        <Slot
          label="INQUIRY"
          size="tiny-wide"
          position="absolute"
          top="45%"
          left="60%"
          rotation={8}
          clip="irregular-4"
          zIndex={19}
          grayscale
        />

        {/* Slot 10: Micro - accent */}
        <Slot
          label="01"
          size="micro"
          position="absolute"
          top="60%"
          left="25%"
          rotation={15}
          border="thin"
          zIndex={28}
          decoration="pin-red"
        />

        {/* Slot 11: Small - bottom right */}
        <Slot
          label="WORK"
          size="small"
          position="absolute"
          bottom="15%"
          right="12%"
          rotation={-4}
          clip="torn-2"
          zIndex={14}
          decoration="staple"
        />

        {/* Slot 12: Medium-tall - right edge bleeding */}
        <Slot
          label="COLLAB"
          size="medium-tall"
          position="absolute"
          bottom="30%"
          right="-3%"
          rotation={2}
          clip="corner-cut"
          shadow="deep"
          zIndex={10}
          bleed="right"
          bleedAmount="lg"
          contrast
        />

        {/* Slot 13: Tiny - bottom scattered */}
        <Slot
          label="KR"
          size="tiny"
          position="absolute"
          bottom="8%"
          left="45%"
          rotation={-12}
          border="rough"
          zIndex={21}
        />

        {/* Slot 14: Swatch - bottom */}
        <Slot
          label="2024"
          size="swatch"
          position="absolute"
          bottom="12%"
          left="58%"
          rotation={6}
          border="accent"
          zIndex={23}
          decoration="corner-fold"
        />

        {/* Slot 15: Micro - far corner */}
        <Slot
          label="→"
          size="micro"
          position="absolute"
          top="75%"
          right="35%"
          rotation={-5}
          border="dashed"
          zIndex={26}
        />

        {/* Scattered Annotations */}
        <AnnotationLabel
          text="get in touch"
          position={{ top: '10%', left: '55%' }}
          rotation={-3}
          variant="handwritten"
        />
        <AnnotationLabel
          text="OPEN"
          position={{ top: '40%', right: '5%' }}
          rotation={5}
          variant="stamp"
        />
        <AnnotationLabel
          text="collaboration"
          position={{ bottom: '35%', left: '10%' }}
          rotation={-2}
          variant="tag"
        />
        <AnnotationLabel
          text="studio"
          position={{ top: '65%', left: '50%' }}
          rotation={8}
          variant="default"
        />
        <AnnotationLabel
          text="press welcome"
          position={{ bottom: '20%', right: '40%' }}
          rotation={-4}
          variant="handwritten"
        />

        {/* Main content - Form */}
        <div className="relative z-30 h-full flex items-center px-8 md:px-16 lg:px-24 py-16">
          <div className="w-full max-w-xl">
            {/* Header */}
            <div style={{ transform: 'rotate(-1deg)' }}>
              <span
                className="block font-mono uppercase tracking-[0.4em] text-yon-grey/40"
                style={{ fontSize: '0.55rem' }}
              >
                Contact
              </span>

              <h1
                className="font-serif text-yon-black mt-6"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                Get in Touch
              </h1>

              <p
                className="font-sans text-yon-grey/50 mt-5 max-w-sm"
                style={{ fontSize: '0.85rem', lineHeight: 1.7 }}
              >
                For collaborations, press inquiries, or general questions.
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-16 space-y-10">
              {/* Name */}
              <div style={{ transform: 'rotate(0.3deg)' }}>
                <label
                  htmlFor="name"
                  className="block font-mono uppercase tracking-[0.2em] text-yon-grey/50 mb-3"
                  style={{ fontSize: '0.55rem' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div style={{ transform: 'rotate(-0.2deg)' }}>
                <label
                  htmlFor="email"
                  className="block font-mono uppercase tracking-[0.2em] text-yon-grey/50 mb-3"
                  style={{ fontSize: '0.55rem' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="your@email.com"
                />
              </div>

              {/* Type */}
              <div style={{ transform: 'rotate(0.2deg)' }}>
                <label
                  htmlFor="type"
                  className="block font-mono uppercase tracking-[0.2em] text-yon-grey/50 mb-3"
                  style={{ fontSize: '0.55rem' }}
                >
                  Inquiry Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-3 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors cursor-pointer"
                  style={{ fontSize: '0.9rem' }}
                >
                  {inquiryTypes.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.value === ''}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div style={{ transform: 'rotate(-0.3deg)' }}>
                <label
                  htmlFor="message"
                  className="block font-mono uppercase tracking-[0.2em] text-yon-grey/50 mb-3"
                  style={{ fontSize: '0.55rem' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-0 py-3 font-mono text-yon-black bg-transparent border-b border-yon-grey/20 focus:border-yon-black focus:outline-none transition-colors resize-none"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="Your message..."
                />
              </div>

              {/* Honeypot field - hidden from real users */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Submit */}
              <div className="pt-6" style={{ transform: 'rotate(0.5deg)' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-mono uppercase tracking-[0.2em] text-yon-black hover:text-yon-accent disabled:text-yon-grey/40 transition-colors border-b border-yon-black hover:border-yon-accent disabled:border-yon-grey/20 pb-1"
                  style={{ fontSize: '0.65rem' }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'} →
                </button>
              </div>

              {/* Status Messages */}
              <div aria-live="polite" aria-atomic="true" className="min-h-[2rem]">
                {submitStatus === 'success' && (
                  <p
                    className="font-mono text-yon-accent"
                    style={{ fontSize: '0.75rem' }}
                    role="status"
                  >
                    Message sent. We&apos;ll be in touch.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p
                    className="font-mono text-red-600"
                    style={{ fontSize: '0.75rem' }}
                    role="alert"
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>

            {/* Direct contact - minimal */}
            <div className="mt-20" style={{ transform: 'rotate(-0.5deg)' }}>
              <span
                className="block font-mono uppercase tracking-[0.2em] text-yon-grey/30"
                style={{ fontSize: '0.5rem' }}
              >
                Or directly
              </span>

              <div className="mt-5 flex flex-col gap-4">
                <a
                  href="mailto:hello@theyon.com"
                  className="font-mono text-yon-grey/50 hover:text-yon-black transition-colors"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}
                >
                  hello@theyon.com
                </a>

                <a
                  href="https://instagram.com/theyon_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-yon-grey/40 hover:text-yon-black transition-colors"
                  style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
                >
                  @theyon_studio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          LOCATION SECTION - New Dense Section
          ============================================ */}
      <section className="relative min-h-[70vh] w-full py-24 overflow-hidden bg-yon-ivory/30 texture-paper">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            right: '-8%',
            fontSize: 'clamp(10rem, 25vw, 35rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.02,
            color: '#0A0A0A',
            transform: 'rotate(5deg)',
          }}
          aria-hidden="true"
        >
          SEOUL
        </span>

        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            left: '-5%',
            fontSize: 'clamp(5rem, 12vw, 18rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#8B7355',
            transform: 'rotate(-90deg)',
            transformOrigin: 'left bottom',
          }}
          aria-hidden="true"
        >
          STUDIO
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl">
            <span
              className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
              style={{ fontSize: '0.55rem' }}
            >
              Location
            </span>

            <h2
              className="font-serif text-yon-black mt-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.02em',
                transform: 'rotate(-0.5deg)',
              }}
            >
              Studio
            </h2>

            <p
              className="font-sans text-yon-grey/60 mt-6 max-w-md"
              style={{
                fontSize: '0.9rem',
                lineHeight: 1.8,
                marginLeft: '2rem',
                transform: 'rotate(0.3deg)',
              }}
            >
              Based in Seoul, working globally. Open for studio visits by appointment.
            </p>

            <span
              className="block font-mono text-yon-grey/30 mt-4"
              style={{
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                marginLeft: '2rem',
              }}
            >
              By appointment only
            </span>
          </div>

          {/* Location slots - scattered */}
          <div className="relative mt-16" style={{ minHeight: '40vh' }}>
            <Slot
              label="SEOUL"
              size="large"
              position="absolute"
              top="0"
              right="5%"
              rotation={-3}
              clip="irregular-2"
              shadow="offset"
              zIndex={15}
              annotationNumber="KR"
              decoration="tape-corner"
            />

            <Slot
              label="STUDIO"
              size="medium"
              position="absolute"
              top="20%"
              left="10%"
              rotation={5}
              clip="torn-3"
              shadow="float"
              zIndex={18}
              sepia
            />

            <Slot
              label="SPACE"
              size="small"
              position="absolute"
              bottom="20%"
              right="25%"
              rotation={-8}
              clip="organic-2"
              zIndex={20}
              decoration="pin"
            />

            <Slot
              label="VISIT"
              size="tiny"
              position="absolute"
              top="50%"
              left="45%"
              rotation={12}
              border="thin"
              zIndex={22}
              decoration="clip"
            />

            <Slot
              label="MAP"
              size="swatch"
              position="absolute"
              bottom="10%"
              left="25%"
              rotation={-5}
              border="rough"
              zIndex={16}
              grayscale
            />

            <Slot
              label="BY APPT"
              size="micro"
              position="absolute"
              top="35%"
              right="40%"
              rotation={10}
              border="accent"
              zIndex={24}
            />

            <AnnotationLabel
              text="by appointment"
              position={{ top: '15%', left: '40%' }}
              rotation={-3}
              variant="handwritten"
            />
            <AnnotationLabel
              text="OPEN"
              position={{ bottom: '30%', right: '10%' }}
              rotation={5}
              variant="stamp"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          SOCIAL SECTION - Additional Dense Area
          ============================================ */}
      <section className="relative min-h-[50vh] w-full py-20 overflow-hidden texture-grain">
        {/* Background */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 'clamp(8rem, 20vw, 30rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#0A0A0A',
          }}
          aria-hidden="true"
        >
          FOLLOW
        </span>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 text-center">
          <span
            className="block font-mono uppercase tracking-[0.3em] text-yon-grey/40"
            style={{ fontSize: '0.55rem' }}
          >
            Social
          </span>

          <h2
            className="font-serif text-yon-black mt-6"
            style={{
              fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
              transform: 'rotate(-1deg)',
            }}
          >
            Follow
          </h2>

          <div className="mt-10 flex justify-center gap-12">
            <a
              href="https://instagram.com/theyon_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-transparent hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Instagram
            </a>

            <a
              href="mailto:hello@theyon.com"
              className="font-mono uppercase tracking-[0.2em] text-yon-grey/50 hover:text-yon-black transition-colors border-b border-transparent hover:border-yon-black pb-1"
              style={{ fontSize: '0.6rem' }}
            >
              Email
            </a>
          </div>
        </div>

        {/* Accent slots */}
        <Slot
          label="IG"
          size="small"
          position="absolute"
          bottom="15%"
          right="10%"
          rotation={-5}
          clip="irregular-3"
          zIndex={5}
          decoration="tape-top"
        />

        <Slot
          label="@"
          size="tiny"
          position="absolute"
          top="20%"
          left="15%"
          rotation={8}
          border="accent"
          zIndex={6}
        />

        <Slot
          label="DM"
          size="micro"
          position="absolute"
          bottom="30%"
          left="25%"
          rotation={-3}
          border="thin"
          zIndex={7}
          decoration="pin-red"
        />

        <AnnotationLabel
          text="say hi"
          position={{ top: '35%', right: '20%' }}
          rotation={4}
          variant="handwritten"
        />
      </section>

      <Footer />
    </div>
  )
}
