'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/lab', label: 'LAB' },
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/analysis', label: 'ANALYSIS' },
  { href: '/about', label: 'PHILOSOPHY' },
  { href: '/contact', label: 'CONTACT' }
]

export default function SophisticatedNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  // Navigation bar background opacity based on scroll
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(247, 245, 242, 0)', 'rgba(247, 245, 242, 0.95)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Main Navigation - Fixed, Minimal */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'backdrop-blur-md' : ''
        }`}
        style={{ backgroundColor: navBackground }}
      >
        <nav className="px-8 md:px-16 lg:px-24 py-6">
          <div className="flex items-center justify-between">

            {/* Logo - Refined Typography */}
            <Link href="/" className="relative group">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg md:text-xl font-light tracking-wider text-carbon">
                  CINCH LAB
                </span>
                {/* Subtle Accent */}
                <div className="w-1 h-4 bg-specimen-red opacity-60" />
              </motion.div>

              {/* Underline on hover */}
              <motion.div
                className="absolute -bottom-1 left-0 h-px bg-carbon origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              {navLinks.slice(1).map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group"
                  >
                    <span className={`
                      text-xs uppercase tracking-[0.2em] transition-colors duration-300
                      ${isActive ? 'text-carbon' : 'text-concrete hover:text-carbon'}
                    `}>
                      {link.label}
                    </span>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-px bg-carbon"
                        layoutId="activeIndicator"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}

                    {/* Hover Indicator */}
                    {!isActive && (
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-px bg-concrete origin-center"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                )
              })}

              {/* Search Icon - Minimal */}
              <button
                className="text-concrete hover:text-carbon transition-colors duration-300"
                aria-label="Search"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="8" cy="8" r="6" />
                  <path d="M12 12l4 4" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden relative w-6 h-6"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="absolute left-0 w-full h-px bg-carbon"
                animate={{
                  top: isMobileMenuOpen ? '50%' : '25%',
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? '-50%' : 0
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-carbon"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 w-full h-px bg-carbon"
                animate={{
                  bottom: isMobileMenuOpen ? '50%' : '25%',
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? '50%' : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-carbon/20 backdrop-blur-sm z-30 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-raw-canvas z-40 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex flex-col h-full pt-24 px-8">
                {/* Mobile Navigation Links */}
                <nav className="flex-1 space-y-8">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          className={`
                            block text-2xl font-light transition-colors duration-300
                            ${isActive ? 'text-carbon' : 'text-concrete'}
                          `}
                        >
                          <span className="flex items-center justify-between">
                            {link.label}
                            {isActive && (
                              <div className="w-2 h-2 bg-specimen-red rounded-full" />
                            )}
                          </span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* Mobile Footer Info */}
                <div className="py-8 border-t border-graphite/20">
                  <p className="text-xs uppercase tracking-wider text-concrete">
                    Experimental Fashion Laboratory
                  </p>
                  <p className="text-xs text-concrete mt-2">
                    © 2024 CINCH LAB
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className="h-20" />
    </>
  )
}