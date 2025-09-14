'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(
  () => import('@/components/effects/ParticleBackground'),
  { ssr: false }
)

const emojis = ['✨', '🔥', '💫', '⚡', '🌟', '💎', '🚀', '🎨', '🌈', '💥']
const words = ['EXTREME', 'CHAOS', 'FUTURE', 'VISION', 'DIGITAL', 'INFINITY']

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [currentWord, setCurrentWord] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [randomEmojis, setRandomEmojis] = useState<{x: number, y: number, emoji: string}[]>([])

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  // Word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      // Random emoji spawn
      if (Math.random() > 0.98) {
        setRandomEmojis(prev => [...prev, {
          x: e.clientX,
          y: e.clientY,
          emoji: emojis[Math.floor(Math.random() * emojis.length)]
        }])

        setTimeout(() => {
          setRandomEmojis(prev => prev.slice(1))
        }, 3000)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const menuItems = [
    { name: 'LAB', path: '/lab', color: '#ff006e' },
    { name: 'MOOD', path: '/mood', color: '#00f5ff' },
    { name: 'COLLECTIONS', path: '/collections', color: '#bfff00' },
    { name: 'ARCHIVE', path: '/archive', color: '#8b00ff' },
    { name: 'ABOUT', path: '/about', color: '#ff6b00' },
    { name: 'CONTACT', path: '/contact', color: '#ffef00' }
  ]

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden min-h-screen">
      {/* Dynamic Background */}
      <div className="fixed inset-0 mesh-gradient" />
      <ParticleBackground count={50} />

      {/* Noise & Effects */}
      <div className="noise-overlay" />
      <div className="scan-lines" />

      {/* Cursor Follower */}
      <motion.div
        className="cursor-follower"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Random Floating Emojis */}
      <AnimatePresence>
        {randomEmojis.map((item, index) => (
          <motion.div
            key={`${item.x}-${item.y}-${index}`}
            className="fixed text-4xl pointer-events-none z-50"
            initial={{ x: item.x - 20, y: item.y - 20, scale: 0, rotate: 0 }}
            animate={{
              y: item.y - 200,
              scale: [0, 1.5, 1],
              rotate: 360,
              opacity: [0, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center">
        <motion.div
          style={{ y, scale }}
          className="relative z-10 text-center"
        >
          {/* Main Title with Dynamic Effects */}
          <motion.div className="relative">
            <motion.h1
              className="text-[10rem] md:text-[15rem] lg:text-[20rem] font-black leading-none"
              animate={{ rotateY: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-stroke">C</span>
              <span className="gradient-text-animated">I</span>
              <span className="text-stroke">N</span>
              <span className="gradient-text-animated">C</span>
              <span className="text-stroke">H</span>
            </motion.h1>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-10 -right-10 text-6xl"
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              ✦
            </motion.div>

            <motion.div
              className="absolute -bottom-10 -left-10 text-6xl"
              animate={{
                rotate: -360,
                y: [0, -20, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ◈
            </motion.div>
          </motion.div>

          {/* Animated Subtitle */}
          <div className="mt-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentWord}
                className="text-4xl md:text-6xl font-bold tracking-[0.3em]"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ color: menuItems[currentWord % menuItems.length].color }}
              >
                {words[currentWord]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Interactive Menu Grid */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto px-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
          >
            {menuItems.map((item, index) => (
              <Link key={item.name} href={item.path}>
                <motion.div
                  className="relative group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="p-8 border-2 rounded-2xl transition-all duration-300 overflow-hidden"
                    style={{
                      borderColor: hoveredItem === item.name ? item.color : 'rgba(255,255,255,0.2)',
                      background: hoveredItem === item.name
                        ? `linear-gradient(135deg, ${item.color}20, transparent)`
                        : 'rgba(255,255,255,0.05)'
                    }}
                  >
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>

                    {/* Animated underline */}
                    <motion.div
                      className="h-1 rounded-full"
                      style={{ backgroundColor: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: hoveredItem === item.name ? '100%' : '30%' }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Hover reveal text */}
                    <AnimatePresence>
                      {hoveredItem === item.name && (
                        <motion.p
                          className="mt-4 text-sm opacity-70"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                        >
                          EXPLORE →
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Corner decorations */}
                  <span
                    className="absolute -top-2 -left-2 text-2xl"
                    style={{ color: item.color }}
                  >
                    ◆
                  </span>
                  <span
                    className="absolute -bottom-2 -right-2 text-2xl"
                    style={{ color: item.color }}
                  >
                    ◇
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest opacity-50">SCROLL</span>
            <div className="w-px h-20 bg-gradient-to-b from-white via-white to-transparent opacity-30" />
          </div>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="py-32 px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {/* Marquee Text */}
          <div className="marquee mb-20">
            <div className="marquee-content">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="text-6xl md:text-8xl font-black whitespace-nowrap">
                  CINCH LAB × EXPERIMENTAL × FUTURE ×
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '475', label: 'VISUALS', emoji: '🎨' },
              { number: '∞', label: 'POSSIBILITIES', emoji: '✨' },
              { number: '24/7', label: 'ONLINE', emoji: '🌐' },
              { number: '001', label: 'LABORATORY', emoji: '🔬' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              >
                <div className="relative">
                  <h3 className="text-5xl md:text-7xl font-black gradient-text-animated">
                    {stat.number}
                  </h3>
                  <span className="absolute -top-4 -right-4 text-3xl group-hover:animate-bounce">
                    {stat.emoji}
                  </span>
                </div>
                <p className="mt-2 text-sm tracking-widest opacity-70">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive Quote */}
      <section className="py-20 px-8 relative">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            <span className="holographic">FASHION IS</span>
            <br />
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWord}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="text-stroke"
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
          </h2>

          <p className="text-xl opacity-70">
            Where creativity meets chaos ⚡
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="flex justify-center gap-8 mb-8">
            {['Instagram', 'TikTok', 'Twitter', 'Discord'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="text-sm uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social}
              </motion.a>
            ))}
          </div>
          <p className="text-xs tracking-[0.3em] opacity-30">
            © 2024 CINCH LAB — EXPERIMENTAL FASHION LABORATORY
          </p>
        </div>
      </footer>
    </div>
  )
}