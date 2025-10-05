'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen bg-[var(--margiela-off-white)]">

      {/* HEADER with cdg-grid minimal layout */}
      <header className="cdg-grid pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <motion.div
          className="text-xs absolute top-8 right-8 transform -rotate-6 text-[var(--margiela-slate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="margiela-number-tag">05</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="grid-item-large"
        >
          <h1 className="text-display-1 font-black leading-none text-[var(--margiela-carbon)]">
            CONT
            <br />
            <span className="text-[var(--sacai-layer-navy)]">ACT</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 bg-[var(--margiela-white)] p-12 border-2 border-[var(--margiela-carbon)] transform -rotate-1 max-w-2xl exposed-seam"
        >
          <div className="margiela-tag mb-6 text-[var(--margiela-slate)]">
            PROFESSIONAL INQUIRIES ONLY
          </div>

          <p className="text-heading-3 font-light text-[var(--margiela-carbon)] leading-relaxed mb-8">
            For collaboration, exhibition, and research inquiries.
            <br />
            We do not sell products.
          </p>

          <div className="bg-[var(--cdg-blood-red)] text-[var(--margiela-white)] p-6">
            <p className="text-sm">
              Note: Commercial product requests will not receive responses.
              This laboratory exists for experimentation, not commerce.
            </p>
          </div>
        </motion.div>
      </header>

      {/* FORM SECTION with broken-symmetry */}
      <section className="broken-symmetry py-16 px-8 md:px-16 lg:px-24">
        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Rotated */}
              <div className="space-y-8 transform -rotate-1 bg-[var(--margiela-white)] p-8 border-2 border-[var(--margiela-slate)] exposed-seam">
                {/* Inquiry Type */}
                <div>
                  <label className="margiela-tag text-[var(--margiela-carbon)] block mb-3">
                    INQUIRY TYPE
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-4 bg-transparent border-2 border-[var(--margiela-slate)] text-[var(--margiela-carbon)] text-base focus:border-[var(--margiela-carbon)] outline-none transition-colors"
                  >
                    {inquiryTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Organization */}
                <div>
                  <label className="margiela-tag text-[var(--margiela-carbon)] block mb-3">
                    ORGANIZATION / INSTITUTION
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full p-4 bg-transparent border-2 border-[var(--margiela-slate)] text-[var(--margiela-carbon)] text-base focus:border-[var(--margiela-carbon)] outline-none transition-colors"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-[var(--sacai-layer-navy)] text-[var(--margiela-white)] p-8 transform rotate-1 sacai-grid-layer">
                  <p className="margiela-tag mb-4">
                    RESPONSE TIME
                  </p>
                  <p className="text-base">
                    5-7 business days
                    <br />
                    High-resolution images available upon request
                  </p>
                </div>
              </div>

              {/* Right Column - Rotated Opposite */}
              <div className="space-y-8 transform rotate-1 bg-[var(--margiela-white)] p-8 border-2 border-[var(--margiela-slate)] exposed-seam-vertical">
                {/* Name */}
                <div>
                  <label className="margiela-tag text-[var(--margiela-carbon)] block mb-3">
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-transparent border-2 border-[var(--margiela-slate)] text-[var(--margiela-carbon)] text-base focus:border-[var(--margiela-carbon)] outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="margiela-tag text-[var(--margiela-carbon)] block mb-3">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-transparent border-2 border-[var(--margiela-slate)] text-[var(--margiela-carbon)] text-base focus:border-[var(--margiela-carbon)] outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="margiela-tag text-[var(--margiela-carbon)] block mb-3">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-4 bg-transparent border-2 border-[var(--margiela-slate)] text-[var(--margiela-carbon)] text-base focus:border-[var(--margiela-carbon)] outline-none resize-vertical transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full p-6 bg-[var(--margiela-carbon)] text-[var(--margiela-white)] border-2 border-[var(--margiela-carbon)] text-base font-bold tracking-widest uppercase hover:bg-[var(--margiela-white)] hover:text-[var(--margiela-carbon)] transition-all"
                >
                  Submit Inquiry
                </motion.button>
              </div>
            </div>
          </motion.form>

        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center p-16 bg-[var(--margiela-white)] border-4 border-[var(--margiela-sage)] transform -rotate-1 exposed-seam"
          >
            <div className="w-20 h-20 bg-[var(--margiela-sage)] rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-heading-1 font-black text-[var(--margiela-carbon)] mb-8">
              Inquiry Received
            </h2>

            <p className="text-base text-[var(--margiela-carbon)] mb-8">
              We will review your submission and respond if appropriate.
              Commercial requests will not receive responses.
            </p>

            <div className="margiela-tag bg-[var(--margiela-carbon)] text-[var(--margiela-white)] px-6 py-3 inline-block">
              RESPONSE WITHIN 5-7 DAYS
            </div>
          </motion.div>
        )}
      </section>

      {/* CONTACT INFORMATION - Asymmetric Layout */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-[var(--margiela-white)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="transform -rotate-1 bg-[var(--margiela-off-white)] p-8 exposed-seam-vertical">
            <span className="margiela-number-tag text-[var(--margiela-slate)]">06</span>
            <h2 className="text-heading-2 font-bold text-[var(--margiela-carbon)] my-6">
              Direct Contact
            </h2>
            <div className="space-y-6">
              <div>
                <p className="margiela-tag text-[var(--margiela-slate)] mb-2">
                  GENERAL INQUIRIES
                </p>
                <p className="text-base text-[var(--margiela-carbon)]">
                  inquiries@cinchlab.com
                </p>
              </div>
              <div>
                <p className="margiela-tag text-[var(--margiela-slate)] mb-2">
                  PRESS
                </p>
                <p className="text-base text-[var(--margiela-carbon)]">
                  press@cinchlab.com
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--sacai-layer-navy)] text-[var(--margiela-white)] p-8 transform rotate-1 sacai-grid-layer">
            <p className="margiela-tag mb-4">
              LOCATION
            </p>
            <p className="text-heading-3 font-bold mb-2">
              Seoul, South Korea
            </p>
            <p className="text-sm text-[var(--margiela-off-white)]">
              Laboratory visits by appointment
            </p>
          </div>

          <div className="bg-[var(--margiela-carbon)] text-[var(--margiela-white)] p-8 transform -rotate-1 exposed-seam">
            <p className="text-heading-2 font-black">
              COLLABORATION
              <br />
              NOT SALES
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-[var(--margiela-carbon)] py-16 px-8 bg-[var(--cdg-void)] text-[var(--margiela-white)] text-center">
        <p className="text-sm text-[var(--margiela-slate)]">
          CINCH LAB • PROFESSIONAL INQUIRIES ONLY • NO COMMERCE
        </p>
      </footer>
    </div>
  )
}
