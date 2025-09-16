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

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Subtle grid overlay */}
      <div className="grid-overlay" />

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
            <div className="text-center space-y-4">
              <h2 className="text-[clamp(60px,8vw,140px)] font-extralight tracking-tight leading-none">
                <CipherText text="FASHION" as="div" className="mb-2" />
                <span className="italic font-thin opacity-70">
                  <CipherText text="EXTREME" as="div" className="mb-2" delay={100} />
                </span>
              </h2>
              <h2 className="text-[clamp(50px,7vw,120px)] font-light tracking-wide leading-none mt-8">
                <CipherText text="TECHNICAL" as="div" className="mb-2" delay={200} />
              </h2>
              <h2 className="text-[clamp(40px,6vw,100px)] font-normal tracking-wider leading-none mt-8">
                <CipherText text="LABORATORY" as="div" className="text-outline" delay={300} />
              </h2>
            </div>

            {/* Floating markers */}
            <motion.span
              className="absolute -top-8 -left-8 text-label"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <CipherText text="[ 01 ]" />
            </motion.span>
            <motion.span
              className="absolute -bottom-8 -right-8 text-label"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <CipherText text="[ EXPERIMENTAL ]" />
            </motion.span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-16 text-center text-sm tracking-[0.3em] text-gray-600"
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
      <section className="py-8 px-8 md:px-20">
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
                className="card card-minimal h-[400px] flex flex-col justify-between p-12 group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <span className="text-label marker"><CipherText text="002" /></span>
                  <h3 className="text-5xl font-light mt-6"><CipherText text="LAB" /></h3>
                  <p className="text-sm text-gray-600 mt-3"><CipherText text="Experimental Zone" /></p>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-xs tracking-widest"><CipherText text="ENTER →" /></span>
                  <motion.div
                    className="w-16 h-16 border border-black/20"
                    animate={{ rotate: 45 }}
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.div>
            </Link>

            {/* MOOD Card */}
            <Link href="/mood">
              <motion.div
                className="card card-minimal h-[400px] flex flex-col justify-between p-12 group relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <span className="text-label marker"><CipherText text="003" /></span>
                  <h3 className="text-5xl font-light mt-6"><CipherText text="MOOD" /></h3>
                  <p className="text-sm text-gray-600 mt-3"><CipherText text="Visual Inspiration" /></p>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-xs tracking-widest"><CipherText text="EXPLORE →" /></span>
                  <div className="w-20 h-[1px] bg-black group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            </Link>

            {/* COLLECTIONS Card */}
            <Link href="/collections">
              <motion.div
                className="card card-minimal h-[400px] flex flex-col justify-between p-12 diagonal-cut"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <span className="text-label marker"><CipherText text="004" /></span>
                  <h3 className="text-5xl font-light mt-6"><CipherText text="ARCHIVE" /></h3>
                  <p className="text-sm text-gray-600 mt-3"><CipherText text="Complete History" /></p>
                </div>

                <span className="text-xs tracking-widest"><CipherText text="VIEW ALL →" /></span>
              </motion.div>
            </Link>
          </motion.div>

          {/* About Section */}
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
                  className="card theme-dark p-16 h-[300px] flex flex-col justify-between"
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <span className="text-label text-gray-400"><CipherText text="005" /></span>
                    <h3 className="text-4xl font-light mt-4"><CipherText text="ABOUT" /></h3>
                  </div>
                  <p className="text-sm opacity-70 max-w-md">
                    <CipherText text="Fashion's extreme limits. Technical experimentation. Challenging conventions since 2019." />
                  </p>
                </motion.div>
              </Link>
            </div>

            <div className="md:col-span-4">
              <Link href="/contact">
                <motion.div
                  className="card card-minimal p-12 h-[300px] flex flex-col justify-between"
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <span className="text-label marker"><CipherText text="006" /></span>
                    <h3 className="text-3xl font-light mt-4"><CipherText text="CONTACT" /></h3>
                  </div>
                  <span className="text-xs tracking-widest"><CipherText text="GET IN TOUCH →" /></span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-8 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="md:col-span-2">
              <p className="text-label text-vertical"><CipherText text="STATEMENT" /></p>
            </div>

            <div className="md:col-span-7">
              <h3 className="text-display leading-tight">
                <CipherText text="We don't create fashion." as="span" />
                <br />
                <CipherText text="We engineer" as="span" delay={50} />
                <span className="text-italic"> <CipherText text="experiences" delay={100} /></span>
                <CipherText text="." as="span" delay={150} />
              </h3>
              <p className="mt-12 text-body-large text-gray-600 max-w-2xl">
                <CipherText text="CINCH LAB operates at the intersection of fashion and technology, pushing boundaries through experimental design and technical innovation. Our approach challenges conventional aesthetics, creating pieces that exist beyond traditional fashion paradigms." />
              </p>
            </div>

            <div className="md:col-span-3">
              <div className="sticky top-32">
                <p className="text-label mb-8"><CipherText text="STATISTICS" /></p>
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <p className="text-4xl font-light"><CipherText text="475" /></p>
                    <p className="text-xs text-gray-600"><CipherText text="Experiments" /></p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <p className="text-4xl font-light"><CipherText text="∞" /></p>
                    <p className="text-xs text-gray-600"><CipherText text="Possibilities" /></p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-4xl font-light"><CipherText text="001" /></p>
                    <p className="text-xs text-gray-600"><CipherText text="Laboratory" /></p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Gallery */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <motion.p
            className="text-label mb-12"
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
                className="aspect-[3/4] bg-gray-100 relative group overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 0.98 }}
              >
                <Image
                  src={`/placeholder-${i}.jpg`}
                  alt={`Experiment ${i}`}
                  fill
                  className="object-cover img-grayscale"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-label"><CipherText text="VIEW" /></p>
                </div>
                <span className="absolute top-4 left-4 text-label text-white mix-blend-difference">
                  <CipherText text={String(i).padStart(3, '0')} />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="marquee">
        <div className="marquee-content">
          <span><CipherText text="FASHION EXTREME" /></span>
          <span><CipherText text="TECHNICAL LABORATORY" /></span>
          <span><CipherText text="EXPERIMENTAL DESIGN" /></span>
          <span><CipherText text="CINCH LAB" /></span>
          <span><CipherText text="FASHION EXTREME" /></span>
          <span><CipherText text="TECHNICAL LABORATORY" /></span>
          <span><CipherText text="EXPERIMENTAL DESIGN" /></span>
          <span><CipherText text="CINCH LAB" /></span>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-6">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="text-sm"><CipherText text="© 2025 CINCH LAB" /></p>
              <p className="text-xs text-gray-600 mt-1"><CipherText text="Experimental Fashion Laboratory" /></p>
            </div>
            <div className="text-right">
              <p className="text-label"><CipherText text="SEOUL — NEW YORK — TOKYO" /></p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll Progress */}
      <motion.div
        className="scroll-progress"
        style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
      />
    </div>
  )
}