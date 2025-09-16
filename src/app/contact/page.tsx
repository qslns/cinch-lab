'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import CipherText from '@/components/CipherText'

// Contact information
const contactInfo = [
  {
    type: 'EMAIL',
    value: 'hello@cinchlab.com',
    link: 'mailto:hello@cinchlab.com'
  },
  {
    type: 'INSTAGRAM',
    value: '@cinch.lab',
    link: 'https://instagram.com/cinch.lab'
  },
  {
    type: 'TWITTER',
    value: '@cinchlab',
    link: 'https://twitter.com/cinchlab'
  }
]

// Office locations
const locations = [
  {
    city: 'NEW YORK',
    address: '123 Fashion District',
    postal: 'NY 10001'
  },
  {
    city: 'LONDON',
    address: '456 Design Quarter',
    postal: 'EC2A 1AE'
  },
  {
    city: 'TOKYO',
    address: '789 Creative Hub',
    postal: '150-0001'
  }
]

export default function ContactPage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleCopy = (value: string, type: string) => {
    navigator.clipboard.writeText(value)
    setCopiedItem(type)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    // Simulate sending
    setTimeout(() => {
      setFormStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })

      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle grid overlay */}
      <div className="grid-overlay" />

      {/* Header */}
      <motion.section
        className="pt-8 pb-12 px-8 md:px-20 border-b border-black/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-hero mb-4"><CipherText text="CONTACT" /></h1>
        <p className="text-label text-gray-600"><CipherText text="GET IN TOUCH" /></p>
      </motion.section>

      {/* Main Content */}
      <section className="px-8 md:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-light mb-12">
                <CipherText text="Direct Contact" />
              </h2>

              {/* Contact Methods */}
              <div className="space-y-8 mb-16">
                {contactInfo.map((method, index) => (
                  <motion.div
                    key={method.type}
                    className="group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xs tracking-[0.2em] text-gray-500 mb-2">
                          <CipherText text={method.type} />
                        </h3>
                        <button
                          onClick={() => handleCopy(method.value, method.type)}
                          className="text-lg hover:opacity-60 transition-opacity cursor-pointer text-left"
                        >
                          <CipherText text={method.value} />
                        </button>
                      </div>

                      <AnimatePresence>
                        {copiedItem === method.type && (
                          <motion.span
                            className="text-xs tracking-[0.1em] text-gray-500"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <CipherText text="COPIED" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                    <motion.div
                      className="h-[1px] bg-black/10 mt-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </motion.div>
                ))}
              </div>

              {/* Locations */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-2xl font-light mb-12">
                  <CipherText text="Locations" />
                </h2>

                <div className="space-y-8">
                  {locations.map((location, index) => (
                    <motion.div
                      key={location.city}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="group cursor-default"
                    >
                      <h3 className="text-sm tracking-[0.2em] mb-2 group-hover:tracking-[0.3em] transition-all duration-300">
                        <CipherText text={location.city} />
                      </h3>
                      <p className="text-gray-600 text-sm">
                        <CipherText text={location.address} />
                      </p>
                      <p className="text-gray-600 text-sm">
                        <CipherText text={location.postal} />
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-light mb-12">
                <CipherText text="Send Message" />
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-xs tracking-[0.2em] text-gray-500 mb-2">
                    <CipherText text="NAME" />
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pb-2 border-b border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                >
                  <label className="block text-xs tracking-[0.2em] text-gray-500 mb-2">
                    <CipherText text="EMAIL" />
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pb-2 border-b border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-xs tracking-[0.2em] text-gray-500 mb-2">
                    <CipherText text="SUBJECT" />
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full pb-2 border-b border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.75 }}
                >
                  <label className="block text-xs tracking-[0.2em] text-gray-500 mb-2">
                    <CipherText text="MESSAGE" />
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full pb-2 border-b border-black/20 bg-transparent focus:border-black focus:outline-none transition-colors min-h-[120px] resize-none"
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full py-4 border border-black text-sm tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={formStatus === 'sending'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <AnimatePresence mode="wait">
                    {formStatus === 'idle' && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <CipherText text="SEND MESSAGE" />
                      </motion.span>
                    )}
                    {formStatus === 'sending' && (
                      <motion.span
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <CipherText text="SENDING..." />
                      </motion.span>
                    )}
                    {formStatus === 'sent' && (
                      <motion.span
                        key="sent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <CipherText text="MESSAGE SENT" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Additional Information */}
          <motion.div
            className="mt-32 pt-20 border-t border-black/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-sm tracking-[0.2em] text-gray-500 mb-4">
                  <CipherText text="GENERAL INQUIRIES" />
                </h3>
                <p className="text-sm text-gray-600">
                  <CipherText text="For general questions about our collections and philosophy" />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-sm tracking-[0.2em] text-gray-500 mb-4">
                  <CipherText text="COLLABORATIONS" />
                </h3>
                <p className="text-sm text-gray-600">
                  <CipherText text="Partnership opportunities and creative collaborations" />
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-sm tracking-[0.2em] text-gray-500 mb-4">
                  <CipherText text="PRESS" />
                </h3>
                <p className="text-sm text-gray-600">
                  <CipherText text="Media inquiries and press material requests" />
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-black/5 mt-32">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-xs tracking-[0.2em] text-gray-500">
            <CipherText text="CINCH LAB © 2020-2024" />
          </p>
        </div>
      </footer>
    </div>
  )
}