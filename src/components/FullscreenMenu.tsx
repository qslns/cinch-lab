'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface FullscreenMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { href: '/', label: 'Home', labelKo: '홈', num: '00' },
  { href: '/collections', label: 'Collections', labelKo: '컬렉션', num: '01' },
  { href: '/process', label: 'Process', labelKo: '프로세스', num: '02' },
  { href: '/archive', label: 'Archive', labelKo: '아카이브', num: '03' },
  { href: '/about', label: 'About', labelKo: '소개', num: '04' },
  { href: '/contact', label: 'Contact', labelKo: '연락', num: '05' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/theyon_studio' },
  { label: 'Email', href: 'mailto:hello@theyon.com' },
]

// Custom easing - deconstructivist feel
const yonEase = [0.22, 1, 0.36, 1] as const

// Overlay animation - asymmetric reveal
const overlayVariants = {
  closed: {
    clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    transition: {
      duration: 0.6,
      ease: yonEase,
      delay: 0.2,
    },
  },
  open: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    transition: {
      duration: 0.8,
      ease: yonEase,
    },
  },
}

// Secondary layer - offset timing
const secondLayerVariants = {
  closed: {
    clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    transition: {
      duration: 0.5,
      ease: yonEase,
      delay: 0.1,
    },
  },
  open: {
    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    transition: {
      duration: 0.7,
      ease: yonEase,
      delay: 0.1,
    },
  },
}

// Menu item animation - scattered entrance
const itemVariants = {
  closed: {
    opacity: 0,
    x: 60,
    rotate: 3,
  },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    rotate: (i % 2 === 0 ? -0.5 : 0.5),
    transition: {
      duration: 0.5,
      delay: 0.3 + i * 0.06,
      ease: yonEase,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.2,
      delay: i * 0.02,
    },
  }),
}

// Footer animation
const footerVariants = {
  closed: { opacity: 0, y: 30 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.7, ease: yonEase },
  },
}

// Background text animation
const bgTextVariants = {
  closed: { opacity: 0, scale: 0.9, rotate: -15 },
  open: {
    opacity: 1,
    scale: 1,
    rotate: -8,
    transition: { duration: 1.2, delay: 0.2, ease: yonEase },
  },
}

export default function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  const pathname = usePathname()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Close on route change
  useEffect(() => {
    onClose()
  }, [pathname, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Secondary Layer - accent color */}
          <motion.div
            className="fixed inset-0 z-[9989]"
            style={{ backgroundColor: '#8B7355' }}
            variants={secondLayerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          />

          {/* Primary Overlay */}
          <motion.div
            className="fixed inset-0 z-[9990] bg-yon-charcoal"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          />

          {/* Menu Content */}
          <motion.div
            className="fixed inset-0 z-[9991] flex flex-col justify-between px-8 md:px-16 lg:px-24 py-24 md:py-32 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background decorations - deconstructed typography */}
            <motion.span
              className="absolute select-none pointer-events-none"
              style={{
                top: '5%',
                right: '-8%',
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(15rem, 35vw, 50rem)',
                fontWeight: 100,
                color: 'rgba(250, 250, 250, 0.02)',
                lineHeight: 0.8,
              }}
              variants={bgTextVariants}
              initial="closed"
              animate="open"
            >
              M
            </motion.span>

            <motion.span
              className="absolute select-none pointer-events-none"
              style={{
                bottom: '15%',
                left: '-5%',
                fontFamily: 'Georgia, serif',
                fontSize: 'clamp(8rem, 20vw, 25rem)',
                fontWeight: 100,
                color: 'rgba(139, 115, 85, 0.03)',
                transform: 'rotate(12deg)',
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              E
            </motion.span>

            <motion.span
              className="absolute select-none pointer-events-none"
              style={{
                top: '40%',
                right: '5%',
                fontFamily: 'Consolas, monospace',
                fontSize: '10px',
                color: 'rgba(250, 250, 250, 0.1)',
                letterSpacing: '0.4em',
                writingMode: 'vertical-rl',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              NAVIGATION
            </motion.span>

            <motion.span
              className="absolute select-none pointer-events-none"
              style={{
                bottom: '8%',
                right: '12%',
                fontFamily: 'Consolas, monospace',
                fontSize: '8px',
                color: 'rgba(139, 115, 85, 0.3)',
                letterSpacing: '0.2em',
                transform: 'rotate(-3deg)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              2024
            </motion.span>

            {/* Scattered accent marks */}
            <motion.span
              className="absolute select-none pointer-events-none"
              style={{
                top: '25%',
                left: '8%',
                width: '40px',
                height: '1px',
                backgroundColor: 'rgba(139, 115, 85, 0.3)',
                transform: 'rotate(-30deg)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            />

            <motion.span
              className="absolute select-none pointer-events-none"
              style={{
                bottom: '35%',
                right: '15%',
                width: '60px',
                height: '1px',
                backgroundColor: 'rgba(250, 250, 250, 0.1)',
                transform: 'rotate(15deg)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            />

            {/* Close Button - deconstructed */}
            <motion.button
              className="absolute top-6 right-6 md:top-10 md:right-12 w-14 h-14 flex items-center justify-center group"
              onClick={onClose}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              aria-label="Close menu"
              style={{ transform: 'rotate(2deg)' }}
            >
              <span className="relative w-8 h-8">
                <span
                  className="absolute top-1/2 left-0 w-full h-px bg-yon-white group-hover:bg-yon-accent transition-colors duration-300"
                  style={{ transform: 'rotate(45deg)' }}
                />
                <span
                  className="absolute top-1/2 left-0 w-full h-px bg-yon-white group-hover:bg-yon-accent transition-colors duration-300"
                  style={{ transform: 'rotate(-45deg)' }}
                />
              </span>
              {/* Corner decoration */}
              <span
                className="absolute top-0 right-0 w-3 h-3 border-t border-r opacity-30 group-hover:opacity-60 transition-opacity"
                style={{ borderColor: '#8B7355' }}
              />
            </motion.button>

            {/* Brand - deconstructed */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ transform: 'rotate(-1deg)' }}
            >
              <Link
                href="/"
                onClick={onClose}
                className="group inline-flex flex-col"
              >
                <span
                  className="font-serif text-yon-white group-hover:text-yon-accent transition-colors duration-300"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}
                >
                  THE YON
                </span>
                <span
                  className="font-mono text-yon-grey/40 mt-1"
                  style={{ fontSize: '8px', letterSpacing: '0.25em' }}
                >
                  BEYOND FASHION
                </span>
              </Link>
            </motion.div>

            {/* Navigation - deconstructed layout */}
            <nav className="flex-1 flex items-center py-8" aria-label="Main menu">
              <ul className="space-y-1 md:space-y-2">
                {menuItems.map((item, i) => {
                  const isActive = pathname === item.href
                  const isHovered = hoveredItem === item.href
                  const rotations = [-0.8, 0.6, -0.4, 0.7, -0.5, 0.3]

                  return (
                    <motion.li
                      key={item.href}
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="exit"
                      style={{ transform: `rotate(${rotations[i % rotations.length]}deg)` }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-center gap-4 md:gap-8 py-2"
                        onMouseEnter={() => setHoveredItem(item.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {/* Number - exposed structure */}
                        <motion.span
                          className="hidden md:block font-mono tracking-wider"
                          style={{
                            fontSize: '10px',
                            width: '24px',
                            color: isHovered ? '#8B7355' : 'rgba(122, 122, 122, 0.4)',
                          }}
                          animate={{
                            x: isHovered ? 4 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.num}
                        </motion.span>

                        {/* Accent line */}
                        <motion.span
                          className="hidden md:block"
                          style={{
                            width: isHovered ? '40px' : '20px',
                            height: '1px',
                            backgroundColor: isHovered ? '#8B7355' : 'rgba(122, 122, 122, 0.2)',
                            transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                            transform: `rotate(${isHovered ? -2 : 0}deg)`,
                          }}
                        />

                        {/* Label - large typography */}
                        <motion.span
                          className="relative font-serif leading-[0.85]"
                          style={{
                            fontSize: 'clamp(2.5rem, 10vw, 6rem)',
                            color: isActive ? '#8B7355' : '#FAFAFA',
                          }}
                          animate={{
                            x: isHovered ? 12 : 0,
                            fontStyle: isHovered ? 'italic' : 'normal',
                            color: isHovered ? '#8B7355' : (isActive ? '#8B7355' : '#FAFAFA'),
                          }}
                          transition={{ duration: 0.3, ease: yonEase }}
                        >
                          {item.label}

                          {/* Underline - asymmetric */}
                          <motion.span
                            className="absolute -bottom-1 left-0 h-px origin-left"
                            style={{
                              backgroundColor: '#8B7355',
                              transform: 'rotate(-0.5deg)',
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isHovered || isActive ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: yonEase }}
                          />

                          {/* Active indicator dot */}
                          {isActive && (
                            <motion.span
                              className="absolute -right-4 top-1/2 w-2 h-2 rounded-full"
                              style={{ backgroundColor: '#8B7355' }}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.5 }}
                            />
                          )}
                        </motion.span>

                        {/* Korean label - secondary */}
                        <motion.span
                          className="hidden lg:block font-mono tracking-wider"
                          style={{
                            fontSize: '11px',
                            color: isHovered ? 'rgba(139, 115, 85, 0.8)' : 'rgba(122, 122, 122, 0.3)',
                            marginLeft: '16px',
                          }}
                          animate={{
                            opacity: isHovered ? 1 : 0.5,
                            x: isHovered ? 8 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.labelKo}
                        </motion.span>

                        {/* Arrow - appears on hover */}
                        <motion.span
                          className="font-serif"
                          style={{ fontSize: '1.5rem', color: '#8B7355' }}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 0 : -10,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>
            </nav>

            {/* Footer - deconstructed layout */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
              variants={footerVariants}
              initial="closed"
              animate="open"
            >
              {/* Social Links - scattered */}
              <div className="flex gap-10">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 font-mono text-yon-silver hover:text-yon-white transition-colors duration-300"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.1em',
                      transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)`,
                    }}
                  >
                    <span
                      className="w-3 h-px group-hover:w-6 transition-all duration-300"
                      style={{ backgroundColor: '#8B7355' }}
                    />
                    <span className="uppercase">{link.label}</span>
                    {link.href.startsWith('http') && (
                      <span className="text-yon-grey/40 text-[8px]">↗</span>
                    )}
                  </a>
                ))}
              </div>

              {/* Copyright & Tagline - asymmetric */}
              <div className="text-right" style={{ transform: 'rotate(0.5deg)' }}>
                <p
                  className="font-mono tracking-wider"
                  style={{ fontSize: '9px', color: 'rgba(122, 122, 122, 0.4)' }}
                >
                  © {new Date().getFullYear()} THE YON
                </p>
                <p
                  className="font-mono mt-2"
                  style={{ fontSize: '8px', color: 'rgba(139, 115, 85, 0.4)', letterSpacing: '0.15em' }}
                >
                  뒤틀렸지만 조화로운
                </p>
                <p
                  className="font-serif italic mt-1"
                  style={{ fontSize: '10px', color: 'rgba(122, 122, 122, 0.3)' }}
                >
                  Beyond Fashion
                </p>
              </div>
            </motion.div>

            {/* Edge accent */}
            <motion.div
              className="absolute bottom-0 left-0 h-1"
              style={{ backgroundColor: '#8B7355', width: '30%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: yonEase }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
