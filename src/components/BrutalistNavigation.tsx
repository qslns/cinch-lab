'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import KineticText from '@/components/KineticText'
import { ExposedStructure } from '@/components/DeconstructedHover'
import { useResponsive } from '@/hooks/useResponsive'
import { MobileMenu } from '@/components/ResponsiveWrapper'

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
  const { isMobile, isTablet, isSmallScreen } = useResponsive()

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

      {/* Main Navigation Header - Deconstructed */}
      <header className="experimental-nav border-decon shadow-layer-2" role="banner">
        <div className={`asymmetric-container h-20 items-center ${isSmallScreen ? 'px-4' : 'px-8'} texture-raw-canvas`}>
          {/* System Status */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${systemStatus === 'OPERATIONAL' ? 'bg-green-500' : 'bg-red-500'} ${isGlitching ? 'flicker' : ''}`} />
            <span className="text-[10px] font-mono tracking-wider opacity-60">
              SYS_{systemStatus}
            </span>
          </div>

          {/* Logo with Kinetic Typography */}
          <Link href="/" className="flex items-center gap-4 group" aria-label="CINCH LAB Home">
            <ExposedStructure className="inline-block">
              <div className={`${isSmallScreen ? 'text-lg' : 'text-2xl'} font-black tracking-tighter`}>
                <KineticText text="CINCH" mode="morph" className="inline" />
                <span className="text-medical-red mx-1">{'//'}</span>
                <KineticText text="LAB" mode="distort" className="inline" />
              </div>
            </ExposedStructure>
            {!isMobile && (
              <div className="text-[10px] font-mono opacity-60 chemical-formula group-hover:text-acid-yellow transition-colors">
                C₆H₅NO₂ <span className="text-medical-red">→</span> FASHION
              </div>
            )}
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
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

                  {/* Link Content with Deconstrueted Typography */}
                  <div className={`relative z-10 flex items-center gap-2 ${isActive || hoveredLink === link.href ? 'text-white' : 'text-charcoal'} transition-all`}>
                    <span className="text-[10px] font-mono opacity-60 pattern-marks">{link.code}</span>
                    <span className={`text-xs font-bold tracking-wider ${hoveredLink === link.href ? 'kinetic-morph' : ''}`}>
                      {hoveredLink === link.href ? (
                        <KineticText text={link.label} mode="split" />
                      ) : (
                        link.label
                      )}
                    </span>
                    {isActive && (
                      <div className="absolute -bottom-1 left-0 right-0 h-px bg-medical-red" />
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

        {/* Error Bar - Laboratory Warning */}
        {isGlitching && (
          <div className="lab-warning absolute bottom-0 left-0 right-0 h-6 flex items-center px-8">
            <span className="text-[10px] font-mono text-charcoal flicker">
              DECONSTRUCTION IN PROGRESS // REASSEMBLY IMMINENT...
            </span>
          </div>
        )}
      </header>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-6 right-4 z-[1001] lg:hidden flex items-center justify-center w-10 h-10 focus:outline-none focus:ring-2 focus:ring-safety-orange"
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

      {/* Mobile Menu - Using Responsive Component */}
      {isSmallScreen && (
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Experimental Circular Menu - Margiela Inspired */}
      <div className="fixed bottom-8 left-8 hidden lg:block hover-explode">
        <div className="relative w-32 h-32 pattern-marks">
          <svg className="w-full h-full animate-spin-slow" style={{ animationDuration: '60s' }}>
            <circle
              cx="64"
              cy="64"
              r="60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="opacity-20"
              strokeDasharray="5 10"
            />
            <text
              fill="currentColor"
              fontSize="8"
              fontFamily="monospace"
              className="opacity-40 text-vertical"
            >
              <textPath href="#circle-path">
                DECONSTRUCT • RECONSTRUCT • CINCH • RELEASE • REPEAT •
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
            <div className="text-2xl font-black opacity-20 kinetic-morph">∞</div>
          </div>
        </div>
      </div>
    </>
  )
}