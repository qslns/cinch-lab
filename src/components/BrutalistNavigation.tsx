'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'HOME', code: '001' },
  { href: '/lab', label: 'LAB', code: '002' },
  { href: '/collections', label: 'COLLECTIONS', code: '003' },
  { href: '/archive', label: 'ARCHIVE', code: '004' },
  { href: '/analysis', label: 'ANALYSIS', code: '005' },
  { href: '/about', label: 'ABOUT', code: '006' },
  { href: '/contact', label: 'CONTACT', code: '007' },
]

export default function BrutalistNavigation() {
  const pathname = usePathname()
  const [isGlitching, setIsGlitching] = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [systemStatus, setSystemStatus] = useState('OPERATIONAL')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsGlitching(true)
        setSystemStatus(['ERROR', 'MALFUNCTION', 'CORRUPTED', 'UNSTABLE'][Math.floor(Math.random() * 4)])
        setTimeout(() => {
          setIsGlitching(false)
          setSystemStatus('OPERATIONAL')
        }, 200)
      }
    }, 3000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <>
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Main Navigation Header */}
      <header className="experimental-nav" role="banner">
        <div className="brutalist-grid h-16 items-center px-8">
          {/* System Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${systemStatus === 'OPERATIONAL' ? 'bg-green-500' : 'bg-red-500'} ${isGlitching ? 'flicker' : ''}`} />
            <span className="text-[10px] font-mono tracking-wider opacity-60">
              SYS_{systemStatus}
            </span>
          </div>

          {/* Logo with Glitch */}
          <Link href="/" className="flex items-center gap-4" aria-label="CINCH LAB Home">
            <div className={`text-2xl font-black tracking-tighter ${isGlitching ? 'glitch-text' : 'subtle-glitch'}`} data-text="CINCH//LAB">
              CINCH<span className="text-safety-orange">{'//'}</span>LAB
            </div>
            <div className="text-[10px] font-mono opacity-60 chemical-formula">
              C₆H₅NO₂ <span className="text-safety-orange">→</span> FASHION
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link, index) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group px-4 py-2 focus:outline-none focus:ring-2 focus:ring-safety-orange focus:ring-offset-2 focus:ring-offset-white"
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Background Animation */}
                  <AnimatePresence>
                    {(isActive || hoveredLink === link.href) && (
                      <motion.div
                        className="absolute inset-0 bg-carbon-black"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        exit={{ scaleX: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={{ originX: 0 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Link Content */}
                  <div className={`relative z-10 flex items-center gap-2 ${isActive || hoveredLink === link.href ? 'text-white' : 'text-carbon-black'} transition-colors`}>
                    <span className="text-[10px] font-mono opacity-60">{link.code}</span>
                    <span className={`text-xs font-bold tracking-wider ${hoveredLink === link.href ? 'distort-hover' : ''}`}>
                      {link.label}
                    </span>
                    {isActive && (
                      <div className="w-1 h-1 bg-current rounded-full animate-pulse" />
                    )}
                  </div>
                </Link>
              )
            })}
          </nav>

          {/* Time/Date Display */}
          <div className="text-right hidden sm:block" aria-live="polite" aria-atomic="true">
            <div className="text-[10px] font-mono tracking-wider opacity-60">
              {new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="text-[9px] font-mono opacity-40">
              LAB_SESSION_ACTIVE
            </div>
          </div>
        </div>

        {/* Error Bar (appears randomly) */}
        {isGlitching && (
          <div className="error-box absolute bottom-0 left-0 right-0 h-6 flex items-center px-8">
            <span className="text-[10px] font-mono">
              SYSTEM CORRUPTION DETECTED // ATTEMPTING RECOVERY...
            </span>
          </div>
        )}
      </header>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-4 z-[1001] md:hidden brutalist-btn p-2 focus:outline-none focus:ring-2 focus:ring-safety-orange"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <div className="w-6 h-4 flex flex-col justify-between">
          <span className={`w-full h-0.5 bg-carbon-black transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-full h-0.5 bg-carbon-black transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-full h-0.5 bg-carbon-black transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-64 bg-white border-l-3 border-carbon-black z-[1000] transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="p-8 pt-20">
          <div className="space-y-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block ${isActive ? 'font-black' : 'font-bold'} focus:outline-none focus:ring-2 focus:ring-safety-orange focus:ring-inset p-2 -m-2`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono opacity-60">{link.code}</span>
                    <span className="text-lg tracking-wider">{link.label}</span>
                  </div>
                  {isActive && (
                    <div className="mt-2 h-0.5 bg-safety-orange" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Experimental Circular Menu (Desktop Only) */}
      <div className="fixed bottom-8 left-8 hidden lg:block">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full animate-spin-slow" style={{ animationDuration: '30s' }}>
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="opacity-20"
            />
            <text
              fill="currentColor"
              fontSize="8"
              fontFamily="monospace"
              className="opacity-40"
            >
              <textPath href="#circle-path">
                EXPERIMENTAL • LABORATORY • CINCH • FASHION • TECHNICAL •
              </textPath>
            </text>
            <defs>
              <path
                id="circle-path"
                d="M 64, 64 m -50, 0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
              />
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-2xl font-black opacity-20">∞</div>
          </div>
        </div>
      </div>
    </>
  )
}