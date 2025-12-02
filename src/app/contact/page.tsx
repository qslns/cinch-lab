'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

// Custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

const inquiryTypes = [
  { value: '', label: 'Select inquiry type' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'press', label: 'Press Inquiry' },
  { value: 'exhibition', label: 'Exhibition' },
  { value: 'general', label: 'General Inquiry' },
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
    <div className="min-h-screen bg-yon-white">
      {/* Hero Section */}
      <section className="pt-32 md:pt-48 pb-16 md:pb-24 px-6 md:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: yonEase }}
          >
            {/* Label */}
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-[9px] text-yon-grey/50 tracking-[0.3em] uppercase">
                Contact
              </span>
              <span className="w-8 h-px bg-yon-grey/20" />
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-3xl text-yon-black">
              Get in Touch
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20 px-6 md:px-10 lg:px-16">
        <div className="max-w-2xl mx-auto">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: yonEase }}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase mb-3"
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
                className="w-full px-0 py-3 font-mono text-sm text-yon-black bg-transparent border-b border-yon-platinum focus:border-yon-black focus:outline-none transition-colors placeholder:text-yon-grey/40"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase mb-3"
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
                className="w-full px-0 py-3 font-mono text-sm text-yon-black bg-transparent border-b border-yon-platinum focus:border-yon-black focus:outline-none transition-colors placeholder:text-yon-grey/40"
                placeholder="your@email.com"
              />
            </div>

            {/* Type */}
            <div>
              <label
                htmlFor="type"
                className="block font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase mb-3"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-0 py-3 font-mono text-sm text-yon-black bg-transparent border-b border-yon-platinum focus:border-yon-black focus:outline-none transition-colors cursor-pointer"
              >
                {inquiryTypes.map(option => (
                  <option key={option.value} value={option.value} disabled={option.value === ''}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase mb-3"
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
                className="w-full px-0 py-3 font-mono text-sm text-yon-black bg-transparent border-b border-yon-platinum focus:border-yon-black focus:outline-none transition-colors resize-none placeholder:text-yon-grey/40"
                placeholder="Your message..."
              />
            </div>

            {/* Honeypot field - hidden from real users, bots will fill it */}
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

            {/* Submit Button */}
            <div className="pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="group inline-flex items-center gap-3 px-8 py-4 border border-yon-black font-mono text-[10px] tracking-[0.12em] uppercase text-yon-black hover:bg-yon-black hover:text-yon-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 focus-ring"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </motion.button>
            </div>

            {/* Status Messages - aria-live for screen reader announcements */}
            <div aria-live="polite" aria-atomic="true">
              {submitStatus === 'success' && (
                <motion.p
                  className="font-mono text-xs text-yon-accent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                >
                  Thank you for your message. We'll be in touch soon.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  className="font-mono text-xs text-red-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </div>
          </motion.form>
        </div>
      </section>

      {/* Direct Contact */}
      <section className="py-16 md:py-24 px-6 text-center border-t border-yon-platinum">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase mb-6">
            Or reach out directly
          </p>
          <a
            href="mailto:hello@theyon.com"
            className="group relative inline-block font-mono text-sm md:text-base text-yon-black hover:text-yon-grey transition-colors duration-500 tracking-wider focus-ring"
          >
            <span>hello@theyon.com</span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
          </a>
          <span className="block mt-6">
            <a
              href="https://instagram.com/theyon_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block font-mono text-xs text-yon-grey/50 hover:text-yon-black transition-colors duration-500 tracking-wider focus-ring"
            >
              <span>@theyon_studio</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
            </a>
          </span>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
