'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Contact methods with Gen-Z energy
const contactMethods = [
  { type: 'EMAIL', value: 'hello@cinchlab.com', emoji: '📧', color: '#ff006e' },
  { type: 'INSTAGRAM', value: '@cinch.lab', emoji: '📸', color: '#00f5ff' },
  { type: 'TIKTOK', value: '@cinchlab', emoji: '🎵', color: '#bfff00' },
  { type: 'DISCORD', value: 'CINCH LAB#0001', emoji: '🎮', color: '#8b00ff' },
  { type: 'TWITTER', value: '@cinchlab', emoji: '🐦', color: '#ff6b00' },
  { type: 'SIGNAL', value: 'For the paranoid', emoji: '🔐', color: '#ffef00' }
]

// Random messages that appear
const floatingMessages = [
  'SLIDE INTO OUR DMS',
  'SPAM US',
  'WE ACTUALLY REPLY',
  'NO BOOMERS ALLOWED',
  'MEMES WELCOME',
  'SEND IT',
  'YO WASSUP',
  'HIT US UP',
  'BE WEIRD',
  'NO BORING EMAILS'
]

// FAQ with attitude
const faq = [
  {
    q: 'Can I collaborate with you?',
    a: 'If you\'re cool enough.',
    emoji: '🤝'
  },
  {
    q: 'Do you accept interns?',
    a: 'Only if you can handle the chaos.',
    emoji: '🎓'
  },
  {
    q: 'Where are you based?',
    a: 'The metaverse, obviously.',
    emoji: '🌐'
  },
  {
    q: 'What\'s your response time?',
    a: 'Faster than your ex texting back.',
    emoji: '⚡'
  },
  {
    q: 'Can I send you my portfolio?',
    a: 'Only if it slaps.',
    emoji: '💼'
  },
  {
    q: 'Do you do custom work?',
    a: 'Everything we do is custom, baby.',
    emoji: '✨'
  }
]

export default function ContactPage() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null)
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null)
  const [floatingTexts, setFloatingTexts] = useState<{text: string, x: number, y: number, id: number}[]>([])
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [mouseTrail, setMouseTrail] = useState<{x: number, y: number}[]>([])

  // Generate floating text
  useEffect(() => {
    const interval = setInterval(() => {
      const text = floatingMessages[Math.floor(Math.random() * floatingMessages.length)]
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight

      setFloatingTexts(prev => [...prev, { text, x, y, id: Date.now() }])

      setTimeout(() => {
        setFloatingTexts(prev => prev.slice(1))
      }, 5000)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseTrail(prev => [...prev.slice(-10), { x: e.clientX, y: e.clientY }])
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      setFormData({ name: '', email: '', message: '' })

      setTimeout(() => {
        setFormStatus('idle')
      }, 3000)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated mesh gradient */}
      <div className="fixed inset-0 mesh-gradient" />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Mouse trail */}
      {mouseTrail.map((pos, index) => (
        <motion.div
          key={index}
          className="fixed w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: contactMethods[index % contactMethods.length]?.color,
            x: pos.x - 4,
            y: pos.y - 4
          }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      ))}

      {/* Floating background texts */}
      <AnimatePresence>
        {floatingTexts.map(item => (
          <motion.div
            key={item.id}
            className="fixed text-6xl md:text-8xl font-black opacity-5 pointer-events-none"
            style={{ x: item.x, y: item.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.05, 0.05, 0],
              scale: [0, 1, 1, 2],
              rotate: [0, -10, 10, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5 }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black tracking-widest">CONTACT</h1>
          <motion.div
            className="text-sm tracking-widest"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            WE'RE ONLINE 24/7
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <section className="min-h-screen pt-32 px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h2
              className="text-6xl md:text-9xl font-black mb-8"
              animate={{
                backgroundImage: [
                  'linear-gradient(45deg, #ff006e, #00f5ff)',
                  'linear-gradient(90deg, #00f5ff, #bfff00)',
                  'linear-gradient(135deg, #bfff00, #8b00ff)',
                  'linear-gradient(180deg, #8b00ff, #ff006e)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              LET'S CONNECT
            </motion.h2>

            <motion.p
              className="text-xl md:text-3xl opacity-70"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Choose your weapon of communication
            </motion.p>
          </motion.div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.type}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredMethod(method.type)}
                onHoverEnd={() => setHoveredMethod(null)}
              >
                <motion.div
                  className="p-8 rounded-2xl border-2 transition-all duration-300"
                  style={{
                    borderColor: hoveredMethod === method.type ? method.color : 'rgba(255,255,255,0.2)',
                    background: hoveredMethod === method.type
                      ? `linear-gradient(135deg, ${method.color}20, transparent)`
                      : 'rgba(255,255,255,0.05)'
                  }}
                  whileHover={{ scale: 1.05, rotate: [-2, 2, -2] }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(method.value, method.type)}
                >
                  <motion.span
                    className="text-5xl mb-4 block"
                    animate={{
                      rotate: hoveredMethod === method.type ? [0, -10, 10, 0] : 0
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {method.emoji}
                  </motion.span>

                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: hoveredMethod === method.type ? method.color : '#fff' }}
                  >
                    {method.type}
                  </h3>

                  <p className="text-sm opacity-70 mb-4">
                    {method.value}
                  </p>

                  <AnimatePresence>
                    {copiedItem === method.type && (
                      <motion.div
                        className="absolute top-4 right-4 px-3 py-1 bg-white text-black text-xs font-bold rounded-full"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                      >
                        COPIED!
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="text-xs uppercase tracking-widest opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredMethod === method.type ? 1 : 0 }}
                  >
                    Click to copy
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="max-w-3xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-black text-center mb-12">
              <span className="text-stroke">OR JUST SCREAM AT US</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <input
                  type="text"
                  placeholder="YOUR NAME (OR ALIAS)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-all"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <input
                  type="email"
                  placeholder="YOUR EMAIL (WE WON'T SPAM)"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-all"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <textarea
                  placeholder="YOUR MESSAGE (MAKE IT INTERESTING)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-all min-h-[150px] resize-none"
                  required
                />
              </motion.div>

              <motion.button
                type="submit"
                className="w-full py-6 font-black text-xl rounded-xl transition-all relative overflow-hidden group"
                style={{
                  background: formStatus === 'sent'
                    ? '#00ff00'
                    : formStatus === 'error'
                    ? '#ff0000'
                    : 'linear-gradient(135deg, #ff006e, #00f5ff)'
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={formStatus === 'sending'}
              >
                <AnimatePresence mode="wait">
                  {formStatus === 'idle' && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      SEND IT 🚀
                    </motion.span>
                  )}
                  {formStatus === 'sending' && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      SENDING...
                    </motion.span>
                  )}
                  {formStatus === 'sent' && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      SENT! WE'LL HIT YOU BACK ✅
                    </motion.span>
                  )}
                </AnimatePresence>

                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
              </motion.button>
            </form>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl md:text-5xl font-black text-center mb-12">
              <span className="holographic">FAQ</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faq.map((item, index) => (
                <motion.div
                  key={item.q}
                  className="p-6 rounded-xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  <span className="text-3xl mb-3 block">{item.emoji}</span>
                  <h4 className="font-bold mb-2">{item.q}</h4>
                  <p className="opacity-70">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.p
            className="text-sm tracking-[0.3em] opacity-50"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            CINCH LAB × ALWAYS ONLINE × NO SLEEP
          </motion.p>
        </div>
      </footer>
    </div>
  )
}