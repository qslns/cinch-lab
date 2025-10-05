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
    <div className="min-h-screen bg-slate-50">

      {/* HEADER */}
      <header className="relative pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <motion.div
          className="text-xs absolute top-8 right-8 transform -rotate-6 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          005
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-9xl font-black leading-none text-black">
            CONT
            <br />
            <span className="text-slate-700">ACT</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 bg-white p-12 border-2 border-slate-900 transform -rotate-1 max-w-2xl"
        >
          <div className="text-xs tracking-widest mb-6 text-gray-500">
            PROFESSIONAL INQUIRIES ONLY
          </div>

          <p className="text-2xl font-light text-gray-900 leading-relaxed mb-8">
            For collaboration, exhibition, and research inquiries.
            <br />
            We do not sell products.
          </p>

          <div className="bg-red-600 text-white p-6">
            <p className="text-sm">
              Note: Commercial product requests will not receive responses.
              This laboratory exists for experimentation, not commerce.
            </p>
          </div>
        </motion.div>
      </header>

      {/* FORM SECTION */}
      <section className="py-16 px-8 md:px-16 lg:px-24">
        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-8 transform -rotate-1 bg-white p-8 border-2 border-gray-300">
                {/* Inquiry Type */}
                <div>
                  <label className="text-xs tracking-widest text-gray-700 block mb-3">
                    INQUIRY TYPE
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-4 bg-transparent border-2 border-gray-300 text-gray-900 text-base focus:border-black outline-none transition-colors"
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
                  <label className="text-xs tracking-widest text-gray-700 block mb-3">
                    ORGANIZATION / INSTITUTION
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full p-4 bg-transparent border-2 border-gray-300 text-gray-900 text-base focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Info Box */}
                <div className="bg-black text-white p-8 transform rotate-1">
                  <p className="text-xs tracking-widest mb-4">
                    RESPONSE TIME
                  </p>
                  <p className="text-base">
                    5-7 business days
                    <br />
                    High-resolution images available upon request
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8 transform rotate-1 bg-white p-8 border-2 border-gray-300">
                {/* Name */}
                <div>
                  <label className="text-xs tracking-widest text-gray-700 block mb-3">
                    NAME
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-transparent border-2 border-gray-300 text-gray-900 text-base focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs tracking-widest text-gray-700 block mb-3">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-transparent border-2 border-gray-300 text-gray-900 text-base focus:border-black outline-none transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs tracking-widest text-gray-700 block mb-3">
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-4 bg-transparent border-2 border-gray-300 text-gray-900 text-base focus:border-black outline-none resize-vertical transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full p-6 bg-black text-white border-2 border-black text-base font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all"
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
            className="max-w-3xl mx-auto text-center p-16 bg-white border-4 border-green-600 transform -rotate-1"
          >
            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-5xl font-black text-black mb-8">
              Inquiry Received
            </h2>

            <p className="text-base text-gray-700 mb-8">
              We will review your submission and respond if appropriate.
              Commercial requests will not receive responses.
            </p>

            <div className="text-xs tracking-widest bg-black text-white px-6 py-3 inline-block">
              RESPONSE WITHIN 5-7 DAYS
            </div>
          </motion.div>
        )}
      </section>

      {/* CONTACT INFORMATION */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="transform -rotate-1 bg-gray-100 p-8">
            <span className="text-xs text-gray-500">006</span>
            <h2 className="text-3xl font-bold text-black my-6">
              Direct Contact
            </h2>
            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-widest text-gray-600 mb-2">
                  GENERAL INQUIRIES
                </p>
                <p className="text-base text-black">
                  inquiries@cinchlab.com
                </p>
              </div>
              <div>
                <p className="text-xs tracking-widest text-gray-600 mb-2">
                  PRESS
                </p>
                <p className="text-base text-black">
                  press@cinchlab.com
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black text-white p-8 transform rotate-1">
            <p className="text-xs tracking-widest mb-4">
              LOCATION
            </p>
            <p className="text-2xl font-bold mb-2">
              Seoul, South Korea
            </p>
            <p className="text-sm text-gray-400">
              Laboratory visits by appointment
            </p>
          </div>

          <div className="bg-slate-700 text-white p-8 transform -rotate-1">
            <p className="text-3xl font-black">
              COLLABORATION
              <br />
              NOT SALES
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-gray-900 py-16 px-8 bg-black text-white text-center">
        <p className="text-sm text-gray-500">
          CINCH LAB • PROFESSIONAL INQUIRIES ONLY • NO COMMERCE
        </p>
      </footer>
    </div>
  )
}
