'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ParticleBackground = dynamic(
  () => import('@/components/effects/ParticleBackground'),
  { ssr: false }
)

export default function UltraModernPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5])

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Track mouse for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="bg-black text-white overflow-hidden">
      {/* Particle Effect */}
      <ParticleBackground count={100} />

      {/* Noise & Scan Overlays */}
      <div className="noise-overlay" />
      <div className="scan-lines" />

      {/* ASCII Background */}
      <div className="ascii-overlay">
        {`█▀▀ █ █▄░█ █▀▀ █░█   █░░ ▄▀█ █▄▄
█▄▄ █ █░▀█ █▄▄ █▀█   █▄▄ █▀█ █▄█`}
      </div>

      {/* Hero */}
      <section className="min-h-screen relative flex items-center justify-center">
        <motion.div
          style={{ y, scale }}
          className="relative z-10 text-center"
        >
          {/* Glitch Title */}
          <h1
            className="text-[8rem] md:text-[12rem] font-black leading-none distort-text"
            data-text="CINCH"
          >
            CINCH
          </h1>

          {/* Japanese Subtitle */}
          <p className="text-2xl md:text-4xl mt-4 liquid-metal font-bold tracking-[0.5em]">
            実験的ファッション研究所
          </p>

          {/* Time Display */}
          <div className="mt-8 font-mono text-sm tracking-widest opacity-50">
            {currentTime.toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex gap-8 justify-center">
            <Link href="/extreme">
              <motion.button
                className="px-12 py-6 bg-transparent border-2 border-white font-black text-xl tracking-widest relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 mix-blend-difference">EXTREME</span>
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>

            <Link href="/lab">
              <motion.button
                className="px-12 py-6 brutal-shadow font-black text-xl tracking-widest bg-black border-2 border-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                LAB →
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Floating Blobs */}
        <div className="absolute top-20 left-20 w-96 h-96 blob" />
        <div className="absolute bottom-20 right-20 w-80 h-80 blob animation-delay-2000" />

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-24 bg-gradient-to-b from-white via-white to-transparent opacity-30" />
        </motion.div>
      </section>

      {/* Collections Grid */}
      <section className="py-32 px-8">
        <motion.h2
          className="text-6xl md:text-8xl font-black text-center mb-20 holographic"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          COLLECTIONS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {['VOID', 'CHAOS', 'EXTREME'].map((title, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer"
            >
              <Link href={`/${title.toLowerCase()}`}>
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-none border-2 border-white/20 overflow-hidden perspective-card">
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-500" />

                  {/* Title */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-4xl md:text-5xl font-black tracking-widest chromatic" data-text={title}>
                      {title}
                    </h3>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-sm tracking-widest font-bold">ENTER →</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Left Content */}
            <div>
              <h2 className="text-6xl md:text-8xl font-black mb-8">
                <span className="neon-glow">475</span>
                <br />
                <span className="text-3xl md:text-5xl liquid-metal">EXPERIMENTAL VISUALS</span>
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed mb-8">
                押し込む • 解放する • 繰り返す
              </p>
              <Link href="/gallery">
                <button className="liquid-button">
                  VIEW GALLERY
                </button>
              </Link>
            </div>

            {/* Right Visual */}
            <div className="relative h-[600px]">
              <div className="absolute inset-0 warped-grid opacity-20" />
              <motion.div
                className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500 to-purple-500 blur-3xl opacity-30"
                animate={{
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-pink-500 to-yellow-500 blur-3xl opacity-30"
                animate={{
                  x: [0, -30, 0],
                  y: [0, 50, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm tracking-[0.3em] text-gray-500 font-mono">
            © 2024 CINCH LAB — EXPERIMENTAL FASHION LABORATORY
          </p>
        </div>
      </footer>
    </div>
  )
}