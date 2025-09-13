'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-thin mb-4">Contact</h1>
          <p className="text-sm text-gray-600">Get in touch with our team</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            {/* Email Addresses */}
            <div>
              <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-4">EMAIL</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">General Inquiries</p>
                  <button
                    onClick={() => handleCopy('hello@cinchlab.com')}
                    className="text-lg hover:underline relative"
                  >
                    hello@cinchlab.com
                    {copied && (
                      <span className="absolute -top-6 left-0 text-xs text-green-600">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Press & Media</p>
                  <button
                    onClick={() => handleCopy('press@cinchlab.com')}
                    className="text-lg hover:underline"
                  >
                    press@cinchlab.com
                  </button>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Wholesale</p>
                  <button
                    onClick={() => handleCopy('sales@cinchlab.com')}
                    className="text-lg hover:underline"
                  >
                    sales@cinchlab.com
                  </button>
                </div>
              </div>
            </div>

            {/* Showroom */}
            <div>
              <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-4">SHOWROOM</h2>
              <div className="space-y-2">
                <p className="text-sm">Los Angeles, California</p>
                <p className="text-xs text-gray-600">By appointment only</p>
                <p className="text-xs text-gray-600">Monday - Friday, 10am - 6pm PST</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-4">SOCIAL</h2>
              <div className="flex gap-4">
                <a href="#" className="text-sm hover:underline">Instagram</a>
                <a href="#" className="text-sm hover:underline">Twitter</a>
                <a href="#" className="text-sm hover:underline">LinkedIn</a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-4">SEND MESSAGE</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-0 py-2 border-b border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-0 py-2 border-b border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
              <div>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-0 py-2 border-b border-gray-300 text-sm focus:outline-none focus:border-black transition-colors"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="press">Press</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="careers">Careers</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-0 py-2 border-b border-gray-300 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="px-8 py-2 bg-black text-white text-xs tracking-[0.15em] hover:bg-gray-800 transition-colors"
                >
                  SEND MESSAGE
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-6">FREQUENTLY ASKED</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-light mb-2">Shipping & Returns</h3>
              <p className="text-xs text-gray-600">
                We offer worldwide shipping. Returns accepted within 14 days 
                of delivery for unworn items with tags attached.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light mb-2">Size Guide</h3>
              <p className="text-xs text-gray-600">
                Our pieces run true to size with a relaxed fit. 
                Detailed measurements available on each product page.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light mb-2">Custom Orders</h3>
              <p className="text-xs text-gray-600">
                Limited custom orders available. Contact our team 
                for more information on bespoke pieces.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-light mb-2">Stockists</h3>
              <p className="text-xs text-gray-600">
                Available at select boutiques worldwide. 
                Contact us for wholesale inquiries.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}