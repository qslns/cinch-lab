'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import CipherText from '@/components/CipherText'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [currentTime, setCurrentTime] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth mouse tracking
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '15%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.6])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  useEffect(() => {
    setIsLoaded(true)
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Generate floating particles for background
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }))

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Subtle grid overlay */}
      <div className="grid-overlay" />

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-black/5"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="relative z-10"
          style={{
            y: heroY,
            opacity: heroOpacity,
            scale: heroScale,
            x: springX,
            rotateX: springY
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-[clamp(60px,10vw,160px)] text-center leading-[0.9] font-thin tracking-tight">
              <CipherText text="FASHION" as="div" className="mb-2" />
              <CipherText text="EXTREME" as="div" className="mb-2 font-extralight italic opacity-70" delay={100} />
              <CipherText text="TECHNICAL" as="div" className="mb-2" delay={200} />
              <motion.div
                className="relative inline-block"
                whileHover={{ scale: 1.02 }}
              >
                <CipherText text="LABORATORY" as="div" className="outline-text" delay={300} />
              </motion.div>
            </h2>

            {/* Floating markers */}
            <motion.span
              className="absolute -top-8 -left-8 text-[10px] tracking-widest opacity-40"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <CipherText text="[ 01 ]" />
            </motion.span>
            <motion.span
              className="absolute -bottom-8 -right-8 text-[10px] tracking-widest opacity-40"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <CipherText text="[ EXPERIMENTAL ]" />
            </motion.span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-16 text-center text-xs tracking-[0.3em] text-gray-600 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <CipherText text="CINCH × RELEASE × REPEAT" delay={400} />
          </motion.p>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        </motion.div>
      </section>

      {/* Navigation Cards */}
      <section className="py-24 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {/* LAB Card */}
            <Link href="/lab">
              <motion.div
                className="h-[450px] p-12 border border-black/10 hover:border-black/30 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col justify-between h-full relative z-10">
                  <div>
                    <span className="text-[10px] tracking-widest opacity-40">
                      <CipherText text="002" />
                    </span>
                    <h3 className="text-5xl font-thin mt-6 tracking-tight">
                      <CipherText text="LAB" />
                    </h3>
                    <p className="text-xs text-gray-600 mt-3 tracking-wider">
                      <CipherText text="Experimental Zone" />
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-[10px] tracking-widest opacity-60">
                      <CipherText text="ENTER →" />
                    </span>
                    <motion.div
                      className="w-12 h-12 border border-black/20"
                      animate={{ rotate: 45 }}
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>

            {/* COLLECTIONS Card */}
            <Link href="/collections">
              <motion.div
                className="h-[450px] p-12 border border-black/10 hover:border-black/30 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col justify-between h-full relative z-10">
                  <div>
                    <span className="text-[10px] tracking-widest opacity-40">
                      <CipherText text="003" />
                    </span>
                    <h3 className="text-5xl font-thin mt-6 tracking-tight">
                      <CipherText text="COLLECTIONS" />
                    </h3>
                    <p className="text-xs text-gray-600 mt-3 tracking-wider">
                      <CipherText text="Complete Archive" />
                    </p>
                  </div>

                  <span className="text-[10px] tracking-widest opacity-60">
                    <CipherText text="VIEW ALL →" />
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>

            {/* ARCHIVE Card */}
            <Link href="/archive">
              <motion.div
                className="h-[450px] p-12 border border-black/10 hover:border-black/30 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col justify-between h-full relative z-10">
                  <div>
                    <span className="text-[10px] tracking-widest opacity-40">
                      <CipherText text="004" />
                    </span>
                    <h3 className="text-5xl font-thin mt-6 tracking-tight">
                      <CipherText text="ARCHIVE" />
                    </h3>
                    <p className="text-xs text-gray-600 mt-3 tracking-wider">
                      <CipherText text="Complete History" />
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <span className="text-[10px] tracking-widest opacity-60">
                      <CipherText text="EXPLORE →" />
                    </span>
                    <div className="w-20 h-[1px] bg-black/20 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </Link>
          </motion.div>

          {/* About & Contact Section */}
          <motion.div
            className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:col-span-8">
              <Link href="/about">
                <motion.div
                  className="p-16 h-[300px] bg-black text-white flex flex-col justify-between hover:bg-gray-900 transition-colors"
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <span className="text-[10px] tracking-widest opacity-40">
                      <CipherText text="005" />
                    </span>
                    <h3 className="text-4xl font-thin mt-4 tracking-tight">
                      <CipherText text="ABOUT" />
                    </h3>
                  </div>
                  <p className="text-xs opacity-70 max-w-md tracking-wide leading-relaxed">
                    <CipherText text="Fashion's extreme limits. Technical experimentation. Challenging conventions since 2019." />
                  </p>
                </motion.div>
              </Link>
            </div>

            <div className="md:col-span-4">
              <Link href="/contact">
                <motion.div
                  className="p-12 h-[300px] border border-black/10 hover:border-black/30 transition-all duration-300 flex flex-col justify-between"
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <span className="text-[10px] tracking-widest opacity-40">
                      <CipherText text="006" />
                    </span>
                    <h3 className="text-3xl font-thin mt-4 tracking-tight">
                      <CipherText text="CONTACT" />
                    </h3>
                  </div>
                  <span className="text-[10px] tracking-widest opacity-60">
                    <CipherText text="GET IN TOUCH →" />
                  </span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-24 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:col-span-2">
              <p className="text-[10px] tracking-widest opacity-40 writing-vertical">
                <CipherText text="STATEMENT" />
              </p>
            </div>

            <div className="md:col-span-7">
              <h3 className="text-[clamp(32px,4vw,64px)] leading-tight font-thin tracking-tight">
                <CipherText text="We don't create fashion." as="span" />
                <br />
                <CipherText text="We engineer" as="span" delay={50} />
                <span className="italic opacity-70"> <CipherText text="experiences" delay={100} /></span>
                <CipherText text="." as="span" delay={150} />
              </h3>
              <p className="mt-12 text-sm text-gray-600 max-w-2xl leading-relaxed">
                <CipherText text="CINCH LAB operates at the intersection of fashion and technology, pushing boundaries through experimental design and technical innovation. Our approach challenges conventional aesthetics, creating pieces that exist beyond traditional fashion paradigms." />
              </p>
            </div>

            <div className="md:col-span-3">
              <div className="sticky top-32">
                <p className="text-[10px] tracking-widest opacity-40 mb-8">
                  <CipherText text="STATISTICS" />
                </p>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-4xl font-thin">
                      <CipherText text="475" />
                    </p>
                    <p className="text-[10px] text-gray-600 tracking-widest">
                      <CipherText text="Experiments" />
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-4xl font-thin">
                      <CipherText text="∞" />
                    </p>
                    <p className="text-[10px] text-gray-600 tracking-widest">
                      <CipherText text="Possibilities" />
                    </p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-4xl font-thin">
                      <CipherText text="001" />
                    </p>
                    <p className="text-[10px] text-gray-600 tracking-widest">
                      <CipherText text="Laboratory" />
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <motion.p
            className="text-[10px] tracking-widest opacity-40 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CipherText text="RECENT EXPERIMENTS" />
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-50 relative group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-[10px] tracking-widest">
                    <CipherText text="VIEW" />
                  </p>
                </div>
                <span className="absolute top-4 left-4 text-[10px] tracking-widest text-white mix-blend-difference">
                  <CipherText text={String(i).padStart(3, '0')} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="overflow-hidden py-16 border-t border-b border-black/5">
        <div className="marquee-container">
          <motion.div
            className="marquee-content flex gap-20 text-sm tracking-[0.3em] opacity-40 uppercase"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <span><CipherText text="FASHION EXTREME" /></span>
            <span><CipherText text="TECHNICAL LABORATORY" /></span>
            <span><CipherText text="EXPERIMENTAL DESIGN" /></span>
            <span><CipherText text="CINCH LAB" /></span>
            <span><CipherText text="FASHION EXTREME" /></span>
            <span><CipherText text="TECHNICAL LABORATORY" /></span>
            <span><CipherText text="EXPERIMENTAL DESIGN" /></span>
            <span><CipherText text="CINCH LAB" /></span>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-sm font-thin">
                <CipherText text="© 2025 CINCH LAB" />
              </p>
              <p className="text-[10px] text-gray-600 mt-1 tracking-wider">
                <CipherText text="Experimental Fashion Laboratory" />
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-widest opacity-60">
                <CipherText text="SEOUL — NEW YORK — TOKYO" />
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-black/20 z-50"
        style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
      />

      {/* Time Display - Fixed */}
      <div className="fixed bottom-8 right-8 text-[10px] tracking-widest opacity-40 font-mono">
        {currentTime}
      </div>
    </div>
  )
}