'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import SearchModal from './SearchModal'

interface NavSection {
  title: string
  links: {
    href: string
    label: string
    desc?: string
  }[]
}

const megaMenuSections: NavSection[] = [
  {
    title: 'RESEARCH',
    links: [
      { href: '/lab', label: 'Laboratory', desc: 'Pattern deconstruction experiments' },
      { href: '/collections', label: 'Collections', desc: 'Seasonal experiments' },
      { href: '/archive', label: 'Archive', desc: 'Documentation & process' },
    ]
  },
  {
    title: 'ANALYSIS',
    links: [
      { href: '/analysis', label: 'Critical Study', desc: 'Fashion brand analysis' },
      { href: '/about', label: 'Philosophy', desc: 'Design manifesto' },
    ]
  },
  {
    title: 'CONNECT',
    links: [
      { href: '/contact', label: 'Collaboration', desc: 'Partnership gateway' },
    ]
  }
]

const quickLinks = [
  { href: '/', label: 'HOME', number: '00' },
  { href: '/lab', label: 'LAB', number: '01' },
  { href: '/collections', label: 'COLLECTIONS', number: '02' },
  { href: '/archive', label: 'ARCHIVE', number: '03' },
  { href: '/analysis', label: 'ANALYSIS', number: '04' },
  { href: '/about', label: 'PHILOSOPHY', number: '05' },
  { href: '/contact', label: 'CONTACT', number: '06' }
]

export default function DeconstructivistNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)
  const { scrollY } = useScroll()

  // Navigation bar with glassmorphism
  const navOpacity = useTransform(scrollY, [0, 100], [0, 0.98])
  const navBlur = useTransform(scrollY, [0, 100], [0, 16])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setIsMegaMenuOpen(false)
    setIsMobileMenuOpen(false)
    setIsSearchOpen(false)
  }, [pathname])

  // Keyboard shortcut for search (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      {/* Main Navigation Bar - Deconstructivist Design */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isScrolled
            ? 'border-b-2 border-margiela-exposed-seam'
            : 'border-b border-transparent'
        }`}
        style={{
          backgroundColor: isScrolled ? 'rgba(247, 245, 242, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
        }}
      >
        <nav className="relative px-6 md:px-12 lg:px-20 py-5">
          <div className="flex items-center justify-between">

            {/* Logo - Margiela White Label Style */}
            <Link href="/" className="relative group z-10">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Margiela Number Tag */}
                <div className="font-mono text-[10px] tracking-wider text-margiela-aluminum">
                  00-23
                </div>

                {/* Main Logo */}
                <div className="relative">
                  <h1 className="text-xl md:text-2xl font-light tracking-[0.25em] text-margiela-carbon uppercase">
                    CINCH LAB
                  </h1>

                  {/* Exposed Seam Effect */}
                  <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-margiela-exposed-seam opacity-30" />
                </div>

                {/* Status Indicator */}
                <div className="w-[6px] h-[6px] rounded-full bg-lab-warning-orange animate-pulse" />
              </motion.div>
            </Link>

            {/* Desktop Navigation - Deconstructed Links */}
            <div className="hidden lg:flex items-center gap-8">
              {/* Main Menu Button */}
              <motion.button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className="relative group"
                whileHover={{ scale: 1.02 }}
              >
                <span className={`
                  text-xs uppercase tracking-[0.3em] font-medium transition-all duration-300
                  ${isMegaMenuOpen ? 'text-margiela-carbon' : 'text-margiela-steel hover:text-margiela-carbon'}
                `}>
                  {isMegaMenuOpen ? 'CLOSE' : 'MENU'}
                </span>

                {/* Underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-margiela-carbon"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isMegaMenuOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              {/* Quick Links - Rotated for Asymmetry */}
              {quickLinks.slice(1, 4).map((link, index) => {
                const isActive = pathname === link.href
                const rotations = ['-rotate-1', 'rotate-1', '-rotate-1']
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative group ${rotations[index]} hover:rotate-0 transition-all duration-300`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Margiela Number */}
                      <span className="font-mono text-[9px] text-margiela-aluminum">
                        {link.number}
                      </span>

                      <span className={`
                        text-xs uppercase tracking-[0.25em] transition-colors duration-300
                        ${isActive ? 'text-margiela-carbon font-medium' : 'text-margiela-steel hover:text-margiela-carbon'}
                      `}>
                        {link.label}
                      </span>
                    </div>

                    {/* Active Indicator - Exposed Stitch */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cdg-blood-red"
                        layoutId="desktopActiveIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}

              {/* Search Button */}
              <motion.button
                onClick={() => setIsSearchOpen(true)}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                aria-label="Open search"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-margiela-steel group-hover:text-margiela-carbon transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-xs text-margiela-aluminum group-hover:text-margiela-steel transition-colors">⌘K</span>
                </div>
              </motion.button>

              {/* Contact - Sacai Orange Accent */}
              <Link
                href="/contact"
                className="relative group"
              >
                <motion.div
                  className="px-4 py-2 border-2 border-margiela-steel text-margiela-carbon
                    hover:border-sacai-burnt-orange hover:bg-sacai-burnt-orange hover:text-white
                    transition-all duration-300 transform -rotate-1 hover:rotate-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-xs uppercase tracking-[0.3em] font-medium">
                    CONTACT
                  </span>
                </motion.div>
              </Link>
            </div>

            {/* Mobile Menu Hamburger - Deconstructed */}
            <button
              className="lg:hidden relative w-8 h-8 z-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <motion.span
                className="absolute left-0 w-full h-[2px] bg-margiela-carbon"
                animate={{
                  top: isMobileMenuOpen ? '50%' : '30%',
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? '-50%' : 0
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              />
              <motion.span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-margiela-carbon"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scaleX: isMobileMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 w-full h-[2px] bg-margiela-carbon"
                animate={{
                  bottom: isMobileMenuOpen ? '50%' : '30%',
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? '50%' : 0
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mega Menu - Sacai Layered Grid Inspired */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <>
            {/* Backdrop with Exposed Grid */}
            <motion.div
              className="fixed inset-0 bg-margiela-carbon/40 backdrop-blur-md z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMegaMenuOpen(false)}
            />

            {/* Mega Menu Panel - Asymmetric Layout */}
            <motion.div
              className="fixed top-20 left-0 right-0 bg-margiela-raw-canvas border-y-2 border-margiela-exposed-seam z-40 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
                {/* Margiela Grid - Broken Symmetry */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                  {/* Left Section - Main Navigation (Rotated) */}
                  <motion.div
                    className="md:col-span-8 transform -rotate-1"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                      {megaMenuSections.map((section, sectionIndex) => (
                        <div
                          key={section.title}
                          className="space-y-6"
                          onMouseEnter={() => setHoveredSection(sectionIndex)}
                          onMouseLeave={() => setHoveredSection(null)}
                        >
                          {/* Section Title - CDG Bold */}
                          <div className="border-l-4 border-cdg-blood-red pl-4">
                            <h3 className="text-xs uppercase tracking-[0.4em] font-bold text-cdg-blood-red">
                              {section.title}
                            </h3>
                          </div>

                          {/* Links */}
                          <nav className="space-y-4">
                            {section.links.map((link, linkIndex) => {
                              const isActive = pathname === link.href
                              return (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="block group"
                                >
                                  <motion.div
                                    className="relative"
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <h4 className={`
                                      text-2xl font-light tracking-tight transition-colors duration-300
                                      ${isActive ? 'text-margiela-carbon' : 'text-margiela-steel group-hover:text-margiela-carbon'}
                                    `}>
                                      {link.label}
                                    </h4>

                                    {link.desc && (
                                      <p className="text-xs mt-1 text-margiela-aluminum tracking-wide">
                                        {link.desc}
                                      </p>
                                    )}

                                    {/* Hover Underline - Sacai Splice */}
                                    <motion.div
                                      className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-sacai-burnt-orange to-sacai-deep-navy"
                                      initial={{ width: 0 }}
                                      whileHover={{ width: '100%' }}
                                      transition={{ duration: 0.3 }}
                                    />
                                  </motion.div>
                                </Link>
                              )
                            })}
                          </nav>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Right Section - Featured Content (Rotated Opposite) */}
                  <motion.div
                    className="md:col-span-4 transform rotate-1"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-sacai-layer-navy text-margiela-paper p-8 border-2 border-sacai-burnt-orange">
                      {/* Margiela Number Tag */}
                      <div className="font-mono text-[10px] tracking-wider text-margiela-silver mb-4">
                        FEATURED • 2024-25
                      </div>

                      <h3 className="text-xl font-light mb-3">
                        Latest Research
                      </h3>

                      <p className="text-sm leading-relaxed opacity-80 mb-6">
                        Exploring pattern deconstruction through experimental methodologies.
                        Laboratory brutalism meets fashion innovation.
                      </p>

                      <Link
                        href="/lab"
                        className="inline-block text-xs uppercase tracking-[0.3em] border-b-2 border-sacai-burnt-orange
                          hover:text-sacai-burnt-orange transition-colors duration-300"
                      >
                        View Research
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu - Full Screen CDG Minimal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-cdg-absolute-black z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel - Asymmetric Slide */}
            <motion.div
              className="fixed inset-y-0 right-0 w-full max-w-md bg-margiela-raw-canvas z-50 lg:hidden overflow-y-auto"
              initial={{ x: '100%', rotate: 2 }}
              animate={{ x: 0, rotate: 0 }}
              exit={{ x: '100%', rotate: 2 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col min-h-full pt-24 px-8 pb-12">
                {/* Mobile Navigation Links - Numbered */}
                <nav className="flex-1 space-y-6">
                  {quickLinks.map((link, index) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="transform -rotate-1 hover:rotate-0 transition-transform"
                      >
                        <Link
                          href={link.href}
                          className="block group"
                        >
                          <div className="flex items-baseline gap-4">
                            {/* Number Tag */}
                            <span className="font-mono text-xs text-margiela-aluminum w-8">
                              {link.number}
                            </span>

                            {/* Label */}
                            <span className={`
                              text-2xl md:text-3xl font-light tracking-tight transition-colors duration-300
                              ${isActive ? 'text-cdg-blood-red' : 'text-margiela-carbon group-hover:text-cdg-blood-red'}
                            `}>
                              {link.label}
                            </span>
                          </div>

                          {/* Active/Hover Indicator */}
                          {isActive && (
                            <div className="mt-2 ml-12 w-12 h-[2px] bg-cdg-blood-red" />
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* Mobile Footer - Margiela Label Style */}
                <div className="border-t-2 border-margiela-exposed-seam pt-8 mt-12 transform rotate-1">
                  <div className="font-mono text-[10px] tracking-wider text-margiela-aluminum mb-2">
                    CINCH LAB © 2024-25
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-margiela-steel">
                    Experimental Fashion Laboratory
                  </p>
                  <p className="text-xs text-margiela-aluminum mt-2">
                    No Sales • Only Creation
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
