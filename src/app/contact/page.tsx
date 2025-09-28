'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ==========================================================================
// CONTACT - Professional Inquiries Only
// No Commerce, Only Collaboration
// ==========================================================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    type: 'COLLABORATION',
    name: '',
    email: '',
    organization: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const inquiryTypes = [
    { value: 'COLLABORATION', label: 'Creative Collaboration' },
    { value: 'EXHIBITION', label: 'Exhibition Request' },
    { value: 'RESEARCH', label: 'Research Partnership' },
    { value: 'PRESS', label: 'Press Inquiry' },
    { value: 'OTHER', label: 'Other' }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-raw-canvas">

      {/* Header */}
      <section className="py-24 px-8 md:px-16 lg:px-24 border-b border-graphite/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8">
            CONTACT
          </h1>

          <div className="max-w-3xl">
            <p className="text-xl font-light mb-6">
              For professional inquiries only. We do not sell products.
              We collaborate on ideas, exhibitions, and research.
            </p>

            <div className="p-6 bg-carbon/5 border-l-4 border-specimen-red">
              <p className="text-sm italic">
                Note: Commercial product requests will not receive responses.
                This laboratory exists for experimentation, not commerce.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-8 md:px-16 lg:px-24">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Inquiry Type */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-wider mb-3">
                  Inquiry Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full p-4 bg-transparent border border-graphite/20 focus:border-carbon transition-colors outline-none"
                >
                  {inquiryTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-wider mb-3">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-transparent border border-graphite/20 focus:border-carbon transition-colors outline-none"
                />
              </div>

              {/* Email */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-wider mb-3">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-4 bg-transparent border border-graphite/20 focus:border-carbon transition-colors outline-none"
                />
              </div>

              {/* Organization */}
              <div className="mb-8">
                <label className="block text-xs uppercase tracking-wider mb-3">
                  Organization / Institution
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full p-4 bg-transparent border border-graphite/20 focus:border-carbon transition-colors outline-none"
                />
              </div>

              {/* Message */}
              <div className="mb-12">
                <label className="block text-xs uppercase tracking-wider mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-4 bg-transparent border border-graphite/20 focus:border-carbon transition-colors outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full p-4 bg-carbon text-raw-canvas hover:bg-graphite transition-colors text-sm uppercase tracking-wider"
                whileHover={{ scale: 0.98 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Inquiry
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center py-24"
            >
              <div className="w-16 h-16 bg-reaction-green rounded-full mx-auto mb-8 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-light mb-4">Inquiry Received</h2>
              <p className="text-concrete">
                We will review your submission and respond if appropriate.
                Commercial requests will not receive responses.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Information */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-paper border-t border-graphite/20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xs uppercase tracking-wider mb-3">General Inquiries</h3>
            <p className="text-sm text-concrete">
              inquiries@cinchlab.com
              <br />
              Response time: 5-7 business days
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider mb-3">Press</h3>
            <p className="text-sm text-concrete">
              press@cinchlab.com
              <br />
              High-resolution images available
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-wider mb-3">Location</h3>
            <p className="text-sm text-concrete">
              Seoul, South Korea
              <br />
              Laboratory visits by appointment
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}