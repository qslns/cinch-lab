'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'

// Navigation structure - Margiela's numerical system inspired
const navigationLines = [
  { line: '0', label: 'CINCH', href: '/', type: 'artisanal' },
  { line: '1', label: 'LAB', href: '/lab', type: 'ready-to-wear' },
  { line: '3', label: 'COLLECTIONS', href: '/collections', type: 'fragrances' },
  { line: '10', label: 'ARCHIVE', href: '/archive', type: 'mens' },
  { line: '11', label: 'ANALYSIS', href: '/analysis', type: 'accessories' },
  { line: '13', label: 'ABOUT', href: '/about', type: 'objects' },
  { line: '22', label: 'CONTACT', href: '/contact', type: 'shoes' },
]

export default function MargielaSacaiNav() {
  const pathname = usePathname()
  const [isDeconstructed, setIsDeconstructed] = useState(false)
  const [hoveredLine, setHoveredLine] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)

  // Transform for subtle movement
  const navX = useTransform(xSpring, [0, 1], [0, 10])
  const navY = useTransform(ySpring, [0, 1], [0, 5])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = navRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      mouseX.set(x)
      mouseY.set(y)
    }

    const nav = navRef.current
    if (nav) {
      nav.addEventListener('mousemove', handleMouseMove)
      return () => nav.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Random deconstruction interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsDeconstructed(true)
        setTimeout(() => setIsDeconstructed(false), 300)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Background Pattern Layer - Sacai inspired */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 overlay-grid" />
        <div className="absolute inset-0 overlay-muslin" />
      </div>

      {/* Main Navigation */}
      <motion.nav
        ref={navRef}
        className={`
          fixed top-0 left-0 right-0 z-[100]
          bg-white/95 backdrop-blur-sm
          border-b border-gray-plaster
          ${isDeconstructed ? 'seam-exposed' : ''}
        `}
        style={{ x: navX, y: navY }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Layer 1: Base Structure */}
        <div className="relative">
          {/* Pattern Marks - Margiela inspired */}
          <div className="absolute top-0 left-0 text-micro font-mono text-hybrid-red opacity-30 p-2">
            PATTERN № 001
          </div>
          <div className="absolute top-0 right-0 text-micro font-mono text-hybrid-red opacity-30 p-2">
            CUT HERE ✂
          </div>

          {/* Main Container */}
          <div className="container-wide py-4">
            <div className="flex items-center justify-between">

              {/* Logo Section - Deconstructed */}
              <Link href="/" className="group relative">
                <motion.div
                  className="flex items-baseline gap-2"
                  whileHover={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Line Number */}
                  <span className="text-micro font-mono text-gray-steel">
                    LINE_0
                  </span>

                  {/* Main Logo */}
                  <div className="relative">
                    <h1 className="text-2xl font-black tracking-tighter text-black-100">
                      CINCH
                    </h1>

                    {/* Sacai Layer Effect */}
                    <div className="absolute inset-0 -z-10 transform translate-x-0.5 translate-y-0.5">
                      <h1 className="text-2xl font-black tracking-tighter text-hybrid-blue opacity-20">
                        CINCH
                      </h1>
                    </div>
                    <div className="absolute inset-0 -z-20 transform -translate-x-0.5 -translate-y-0.5">
                      <h1 className="text-2xl font-black tracking-tighter text-hybrid-red opacity-20">
                        CINCH
                      </h1>
                    </div>
                  </div>

                  {/* Laboratory Tag */}
                  <span className="text-micro font-mono text-gray-steel self-end pb-1">
                    /LABORATORY
                  </span>
                </motion.div>

                {/* Hover Seam */}
                <div className="absolute -bottom-1 left-0 right-0 h-px bg-hybrid-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>

              {/* Desktop Navigation Lines */}
              <div className="hidden lg:flex items-center gap-0">
                {navigationLines.map((item, index) => {
                  const isActive = pathname === item.href
                  const isHovered = hoveredLine === item.line

                  return (
                    <Link
                      key={item.line}
                      href={item.href}
                      className="relative group"
                      onMouseEnter={() => setHoveredLine(item.line)}
                      onMouseLeave={() => setHoveredLine(null)}
                    >
                      <motion.div
                        className={`
                          px-6 py-3 relative
                          ${isActive ? 'bg-black-100 text-white-0' : 'text-black-100'}
                        `}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Line Number - Top */}
                        <div className="absolute top-0 left-2 text-micro font-mono opacity-40">
                          {item.line}
                        </div>

                        {/* Label */}
                        <span className={`
                          text-xs font-medium tracking-wider
                          ${isHovered ? 'text-deconstructed' : ''}
                        `}>
                          {item.label}
                        </span>

                        {/* Active Indicator - Exposed Seam */}
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-px left-0 right-0 h-0.5 bg-hybrid-red"
                            layoutId="activeIndicator"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                          />
                        )}

                        {/* Hover Layer - Sacai Style */}
                        <AnimatePresence>
                          {isHovered && !isActive && (
                            <motion.div
                              className="absolute inset-0 bg-gray-plaster/20 -z-10"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Stitch Marks */}
                        {index < navigationLines.length - 1 && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-gray-steel/30" />
                        )}
                      </motion.div>
                    </Link>
                  )
                })}
              </div>

              {/* Status Indicator - Laboratory Style */}
              <div className="hidden sm:flex items-center gap-3">
                {/* Experiment Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isDeconstructed ? 'bg-hybrid-red' : 'bg-hybrid-blue'} animate-pulse`} />
                  <span className="text-micro font-mono text-gray-steel">
                    {isDeconstructed ? 'DECONSTRUCTING' : 'OPERATIONAL'}
                  </span>
                </div>

                {/* Slogan Ticker */}
                <div className="overflow-hidden w-32">
                  <motion.div
                    className="text-micro font-mono text-gray-steel whitespace-nowrap"
                    animate={{ x: ['0%', '-100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    CINCH • RELEASE • REPEAT • CINCH • RELEASE • REPEAT •
                  </motion.div>
                </div>
              </div>

              {/* Mobile Menu Button - Deconstructed */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden relative w-8 h-8 flex items-center justify-center group"
                aria-label="Menu"
              >
                <div className="relative">
                  {/* Hamburger Lines - Asymmetric */}
                  <motion.span
                    className="absolute h-px w-6 bg-black-100"
                    style={{ top: isMobileOpen ? 0 : -4 }}
                    animate={{
                      rotate: isMobileOpen ? 45 : 0,
                      width: isMobileOpen ? 24 : 18,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute h-px w-6 bg-black-100"
                    animate={{
                      opacity: isMobileOpen ? 0 : 1,
                      width: 24,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="absolute h-px w-6 bg-black-100"
                    style={{ bottom: isMobileOpen ? 0 : -4 }}
                    animate={{
                      rotate: isMobileOpen ? -45 : 0,
                      width: isMobileOpen ? 24 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Pattern Mark */}
                <span className="absolute -top-3 left-0 text-micro font-mono text-hybrid-red opacity-30">
                  ×
                </span>
              </button>
            </div>
          </div>

          {/* Exposed Construction Lines */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-plaster to-transparent" />
        </div>
      </motion.nav>

      {/* Mobile Menu - Full Screen Takeover */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-white-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-6 right-6 text-2xl font-mono"
              aria-label="Close menu"
            >
              ×
            </button>

            {/* Mobile Navigation */}
            <div className="h-full flex flex-col justify-center items-center">
              {navigationLines.map((item, index) => {
                const isActive = pathname === item.href

                return (
                  <motion.div
                    key={item.line}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={`
                        block py-4 px-8 text-center
                        ${isActive ? 'bg-black-100 text-white-0' : ''}
                      `}
                    >
                      <div className="text-micro font-mono opacity-40 mb-1">
                        LINE {item.line}
                      </div>
                      <div className="text-xl font-medium tracking-wider">
                        {item.label}
                      </div>
                    </Link>
                  </motion.div>
                )
              })}

              {/* Mobile Footer */}
              <motion.div
                className="absolute bottom-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="text-micro font-mono text-gray-steel">
                  EXPERIMENTAL FASHION LABORATORY
                </div>
                <div className="text-micro font-mono text-gray-steel mt-2">
                  NO SALES • ONLY CREATION
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}