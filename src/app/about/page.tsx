'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// Story chapters
const chapters = [
  {
    id: 'genesis',
    title: 'GENESIS',
    subtitle: '시작',
    year: '2020',
    content: 'Born from chaos, raised in pixels. We didn\'t start a brand, we started a revolution.',
    emoji: '🌱',
    color: '#ff006e'
  },
  {
    id: 'evolution',
    title: 'EVOLUTION',
    subtitle: '진화',
    year: '2021',
    content: 'Breaking every rule we could find. Fashion became our playground, code became our canvas.',
    emoji: '🦋',
    color: '#00f5ff'
  },
  {
    id: 'explosion',
    title: 'EXPLOSION',
    subtitle: '폭발',
    year: '2022',
    content: '475 visuals later, we realized we weren\'t creating fashion. We were creating futures.',
    emoji: '💥',
    color: '#bfff00'
  },
  {
    id: 'dimension',
    title: 'DIMENSION',
    subtitle: '차원',
    year: '2023',
    content: 'Reality is overrated. We built our own universe where fashion meets digital dreams.',
    emoji: '🌌',
    color: '#8b00ff'
  },
  {
    id: 'infinity',
    title: 'INFINITY',
    subtitle: '무한',
    year: '2024',
    content: 'No limits, no boundaries, no apologies. This is CINCH LAB.',
    emoji: '♾️',
    color: '#ff6b00'
  }
]

// Team members with Gen-Z vibes
const team = [
  { name: 'CHAOS', role: 'Creative Destroyer', emoji: '🎭' },
  { name: 'PIXEL', role: 'Digital Alchemist', emoji: '🎨' },
  { name: 'VOID', role: 'Reality Bender', emoji: '🕳️' },
  { name: 'NEON', role: 'Color Terrorist', emoji: '💡' },
  { name: 'GLITCH', role: 'System Breaker', emoji: '⚡' },
  { name: 'WAVE', role: 'Frequency Master', emoji: '🌊' }
]

// Philosophy statements
const philosophy = [
  'FASHION IS DEAD. LONG LIVE FASHION.',
  'WE DON\'T FOLLOW TRENDS. WE DELETE THEM.',
  'YOUR GRANDMA WOULDN\'T UNDERSTAND.',
  'CTRL+ALT+DELETE THE FASHION INDUSTRY.',
  'NOT YOUR AVERAGE FASHION LAB.',
  'WE\'RE NOT SORRY.'
]

export default function AboutPage() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [floatingText, setFloatingText] = useState<{text: string, x: number, y: number}[]>([])
  const [glitchActive, setGlitchActive] = useState(false)
  const { scrollYProgress } = useScroll()

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ['#000000', '#0a0a0a', '#111111', '#0a0a0a', '#050505', '#000000']
  )

  // Auto-advance chapters
  useEffect(() => {
    const interval = setInterval(() => {
      if (!glitchActive) {
        setActiveChapter(prev => (prev + 1) % chapters.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [glitchActive])

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Generate floating text on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.97) {
        const randomPhilosophy = philosophy[Math.floor(Math.random() * philosophy.length)]
        setFloatingText(prev => [...prev, {
          text: randomPhilosophy,
          x: e.clientX,
          y: e.clientY
        }])

        setTimeout(() => {
          setFloatingText(prev => prev.slice(1))
        }, 4000)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className="min-h-screen text-white overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Animated background gradient */}
      <motion.div
        className="fixed inset-0 opacity-30"
        animate={{
          background: [
            `radial-gradient(circle at 20% 50%, ${chapters[activeChapter].color}40 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 50%, ${chapters[activeChapter].color}40 0%, transparent 50%)`,
            `radial-gradient(circle at 50% 20%, ${chapters[activeChapter].color}40 0%, transparent 50%)`,
          ]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Floating philosophy text */}
      <AnimatePresence>
        {floatingText.map((item, index) => (
          <motion.div
            key={`${item.x}-${item.y}-${index}`}
            className="fixed text-xs font-bold tracking-widest pointer-events-none z-20 whitespace-nowrap"
            style={{ color: chapters[activeChapter].color }}
            initial={{ x: item.x - 100, y: item.y - 10, opacity: 0, scale: 0 }}
            animate={{
              y: item.y - 100,
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              rotate: [0, -5, 5, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4 }}
          >
            {item.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 p-8"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black tracking-widest">ABOUT</h1>
          <div className="text-sm tracking-widest opacity-50">
            CINCH LAB STORY
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <section className="min-h-screen pt-32 px-8">
        {/* Hero Statement */}
        <motion.div
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className={`text-6xl md:text-9xl font-black text-center mb-8 ${glitchActive ? 'distort-text' : ''}`}
            data-text="WE ARE CINCH"
            animate={{
              color: chapters[activeChapter].color,
              textShadow: glitchActive
                ? `0 0 20px ${chapters[activeChapter].color}`
                : 'none'
            }}
          >
            WE ARE CINCH
          </motion.h2>

          <motion.p
            className="text-xl md:text-3xl text-center opacity-70"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Not a brand. A dimension.
          </motion.p>
        </motion.div>

        {/* Timeline / Chapters */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="flex justify-center gap-4 mb-12">
            {chapters.map((chapter, index) => (
              <motion.button
                key={chapter.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeChapter === index ? 'w-12' : ''
                }`}
                style={{
                  backgroundColor: activeChapter === index ? chapter.color : 'rgba(255,255,255,0.3)'
                }}
                onClick={() => setActiveChapter(index)}
                whileHover={{ scale: 1.5 }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={chapters[activeChapter].id}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.span
                className="text-6xl mb-4 block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {chapters[activeChapter].emoji}
              </motion.span>

              <h3
                className="text-4xl md:text-6xl font-black mb-2"
                style={{ color: chapters[activeChapter].color }}
              >
                {chapters[activeChapter].title}
              </h3>

              <p className="text-lg opacity-50 mb-2">
                {chapters[activeChapter].subtitle} • {chapters[activeChapter].year}
              </p>

              <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-6 leading-relaxed">
                {chapters[activeChapter].content}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Team Grid */}
        <motion.div
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-5xl font-black text-center mb-12">
            <span className="gradient-text-animated">THE CREATORS</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: [-5, 5, -5] }}
              >
                <motion.div
                  className="text-5xl mb-3"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, delay: index * 0.2, repeat: Infinity }}
                >
                  {member.emoji}
                </motion.div>
                <h4 className="font-bold text-lg mb-1">{member.name}</h4>
                <p className="text-xs opacity-50">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-5xl font-black text-center mb-12">
            <span className="text-stroke">OUR PHILOSOPHY</span>
          </h3>

          <div className="space-y-6">
            {philosophy.map((statement, index) => (
              <motion.div
                key={statement}
                className="text-xl md:text-3xl font-bold text-center"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  color: chapters[index % chapters.length].color
                }}
              >
                {statement}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats/Numbers */}
        <motion.div
          className="max-w-6xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '475+', label: 'VISUALS CREATED', color: '#ff006e' },
              { number: '∞', label: 'RULES BROKEN', color: '#00f5ff' },
              { number: '0', label: 'APOLOGIES', color: '#bfff00' },
              { number: '24/7', label: 'CREATING CHAOS', color: '#8b00ff' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                <h4
                  className="text-5xl md:text-7xl font-black mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.number}
                </h4>
                <p className="text-sm opacity-50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="max-w-4xl mx-auto text-center pb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-4xl md:text-6xl font-black mb-8"
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
            JOIN THE REVOLUTION
          </motion.h3>

          <p className="text-xl mb-8 opacity-70">
            Or don't. We're not your mom.
          </p>

          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="/contact"
              className="px-12 py-6 bg-white text-black font-black text-xl rounded-full inline-block"
            >
              GET WEIRD WITH US →
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm tracking-[0.3em] opacity-50">
            CINCH LAB × BREAKING FASHION SINCE 2020
          </p>
        </div>
      </footer>
    </motion.div>
  )
}