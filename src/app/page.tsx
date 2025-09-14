'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [currentTime, setCurrentTime] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  // Parallax transforms
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

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

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      {/* Grid overlay */}
      <div className="grid-overlay" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/10">
        <div className="flex justify-between items-center px-8 py-6">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-light tracking-tight">CINCH—LAB</h1>
            <span className="technical-text text-gray-400">001</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="technical-text">{currentTime}</span>
            <button className="w-8 h-8 flex flex-col justify-center gap-1.5">
              <span className="w-full h-[1px] bg-black"></span>
              <span className="w-full h-[1px] bg-black"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          {/* Main Title */}
          <motion.div
            className="relative"
            style={{ y, opacity }}
          >
            <h2 className="text-[8vw] leading-none font-light tracking-tight">
              FASHION
              <br />
              <span className="font-thin italic">EXTREME</span>
              <br />
              TECHNICAL
              <br />
              <span className="text-stroke" style={{ WebkitTextStroke: '1px black', WebkitTextFillColor: 'transparent' }}>
                LABORATORY
              </span>
            </h2>

            {/* Corner markers */}
            <span className="absolute top-0 left-0 technical-text">[ 01 ]</span>
            <span className="absolute bottom-0 right-0 technical-text">[ EXPERIMENTAL ]</span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="mt-12 text-sm tracking-widest text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            CINCH × RELEASE × REPEAT
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-16 bg-black/20" />
        </motion.div>
      </section>

      {/* Navigation Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-12 gap-4">
            {/* Lab */}
            <Link href="/lab" className="col-span-12 md:col-span-6 group">
              <motion.div
                className="border border-black/10 p-8 h-[400px] flex flex-col justify-between relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <span className="technical-text">002</span>
                  <h3 className="text-5xl font-light mt-4">LAB</h3>
                  <p className="text-sm text-gray-600 mt-2">Experimental Zone</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs">ENTER →</span>
                  <div className="w-20 h-20 border border-black/20 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                </div>
                <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </motion.div>
            </Link>

            {/* Mood */}
            <Link href="/mood" className="col-span-12 md:col-span-6 group">
              <motion.div
                className="border border-black/10 p-8 h-[400px] flex flex-col justify-between relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div>
                  <span className="technical-text">003</span>
                  <h3 className="text-5xl font-light mt-4">MOOD</h3>
                  <p className="text-sm text-gray-600 mt-2">Visual Inspiration</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xs">EXPLORE →</span>
                  <div className="w-20 h-[1px] bg-black group-hover:w-full transition-all duration-500" />
                </div>
              </motion.div>
            </Link>

            {/* Collections */}
            <Link href="/collections" className="col-span-12 md:col-span-4 group">
              <motion.div
                className="border border-black/10 p-8 h-[300px] flex flex-col justify-between diagonal-cut"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <span className="technical-text">004</span>
                  <h3 className="text-3xl font-light mt-4">COLLECTIONS</h3>
                </div>
                <span className="text-xs">VIEW ALL →</span>
              </motion.div>
            </Link>

            {/* Archive */}
            <Link href="/archive" className="col-span-12 md:col-span-4 group">
              <motion.div
                className="border border-black/10 p-8 h-[300px] flex flex-col justify-between"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <span className="technical-text">005</span>
                  <h3 className="text-3xl font-light mt-4">ARCHIVE</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-10 bg-black/5" />
                  <div className="h-10 bg-black/10" />
                  <div className="h-10 bg-black/10" />
                  <div className="h-10 bg-black/5" />
                </div>
              </motion.div>
            </Link>

            {/* About */}
            <Link href="/about" className="col-span-12 md:col-span-4 group">
              <motion.div
                className="border border-black/10 p-8 h-[300px] flex flex-col justify-between inverted"
                whileHover={{ scale: 1.01 }}
              >
                <div>
                  <span className="technical-text text-gray-400">006</span>
                  <h3 className="text-3xl font-light mt-4">ABOUT</h3>
                </div>
                <p className="text-xs opacity-60">
                  Fashion's extreme limits.<br />
                  Technical experimentation.
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-32 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-2">
              <p className="technical-text vertical-text">STATEMENT</p>
            </div>
            <div className="col-span-12 md:col-span-7">
              <h3 className="text-6xl font-light leading-tight">
                We don't create fashion.
                <br />
                We engineer
                <span className="italic"> experiences</span>.
              </h3>
              <p className="mt-8 text-gray-600 max-w-2xl">
                CINCH LAB operates at the intersection of fashion and technology,
                pushing boundaries through experimental design and technical innovation.
                Our approach challenges conventional aesthetics, creating pieces that
                exist beyond traditional fashion paradigms.
              </p>
            </div>
            <div className="col-span-12 md:col-span-3">
              <div className="sticky top-32">
                <p className="technical-text mb-4">STATISTICS</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-3xl font-light">475</p>
                    <p className="text-xs text-gray-600">Experiments</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">∞</p>
                    <p className="text-xs text-gray-600">Possibilities</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light">001</p>
                    <p className="text-xs text-gray-600">Laboratory</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Grid */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-12 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="col-span-6 md:col-span-4 aspect-[3/4] bg-gray-100 relative group overflow-hidden"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={`/웹 꾸미기 사진/image-${i}.png`}
                  alt=""
                  fill
                  className="object-cover img-grayscale"
                />
                <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="technical-text">VIEW</p>
                </div>
                <span className="absolute top-4 left-4 technical-text">{String(i).padStart(3, '0')}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="border-t border-black/10">
        <Link href="/contact">
          <motion.div
            className="py-8 px-8 flex justify-between items-center group"
            whileHover={{ backgroundColor: 'rgb(0, 0, 0)', color: 'rgb(255, 255, 255)' }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-4xl font-light">GET IN TOUCH</h3>
            <span className="text-xl">→</span>
          </motion.div>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm">© 2024 CINCH LAB</p>
              <p className="text-xs text-gray-600 mt-1">Experimental Fashion Laboratory</p>
            </div>
            <div className="text-right">
              <p className="technical-text">SEOUL — NEW YORK — TOKYO</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}