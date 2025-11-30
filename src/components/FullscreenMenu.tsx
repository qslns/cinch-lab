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
  { href: '/', label: 'Home', labelKo: '홈', num: '01' },
  { href: '/collections', label: 'Collections', labelKo: '컬렉션', num: '02' },
  { href: '/process', label: 'Process', labelKo: '프로세스', num: '03' },
  { href: '/archive', label: 'Archive', labelKo: '아카이브', num: '04' },
  { href: '/about', label: 'About', labelKo: '소개', num: '05' },
  { href: '/contact', label: 'Contact', labelKo: '연락', num: '06' },
]

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com/theyon_studio' },
  { label: 'Email', href: 'mailto:hello@theyon.com' },
]

// Custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

// Overlay animation
const overlayVariants = {
  closed: {
    clipPath: 'circle(0% at calc(100% - 40px) 40px)',
    transition: {
      duration: 0.8,
      ease: yonEase,
      delay: 0.3,
    },
  },
  open: {
    clipPath: 'circle(150% at calc(100% - 40px) 40px)',
    transition: {
      duration: 0.8,
      ease: yonEase,
    },
  },
}

// Menu item animation
const itemVariants = {
  closed: {
    opacity: 0,
    y: 40,
    rotate: 3,
  },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: 0.2 + i * 0.08,
      ease: yonEase,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      delay: i * 0.03,
    },
  }),
}

// Footer animation
const footerVariants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.6, ease: yonEase },
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
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-[9990] bg-yon-charcoal"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          />

          {/* Menu Content */}
          <motion.div
            className="fixed inset-0 z-[9991] flex flex-col justify-between px-6 md:px-12 lg:px-20 py-24 md:py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-6 right-6 md:top-8 md:right-12 w-12 h-12 flex items-center justify-center group"
              onClick={onClose}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              aria-label="Close menu"
            >
              <span className="relative w-8 h-8">
                <span className="absolute top-1/2 left-0 w-full h-px bg-yon-white rotate-45 group-hover:bg-yon-accent transition-colors" />
                <span className="absolute top-1/2 left-0 w-full h-px bg-yon-white -rotate-45 group-hover:bg-yon-accent transition-colors" />
              </span>
            </motion.button>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href="/"
                onClick={onClose}
                className="font-serif text-2xl text-yon-white hover:text-yon-accent transition-colors"
              >
                THE YON
              </Link>
            </motion.div>

            {/* Navigation */}
            <nav className="flex-1 flex items-center" aria-label="Main menu">
              <ul className="space-y-2 md:space-y-4">
                {menuItems.map((item, i) => {
                  const isActive = pathname === item.href
                  const isHovered = hoveredItem === item.href

                  return (
                    <motion.li
                      key={item.href}
                      custom={i}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="exit"
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-center gap-6"
                        onMouseEnter={() => setHoveredItem(item.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {/* Number */}
                        <motion.span
                          className="hidden md:block font-mono text-xs text-yon-grey/50 tracking-wider w-8"
                          animate={{
                            color: isHovered ? 'rgba(139, 115, 85, 0.8)' : 'rgba(122, 122, 122, 0.5)',
                          }}
                        >
                          {item.num}
                        </motion.span>

                        {/* Label */}
                        <motion.span
                          className={`relative font-serif text-[12vw] md:text-[8vw] lg:text-[6vw] leading-[0.9] ${
                            isActive ? 'text-yon-accent' : 'text-yon-white'
                          }`}
                          animate={{
                            x: isHovered ? 16 : 0,
                            fontStyle: isHovered ? 'italic' : 'normal',
                          }}
                          transition={{ duration: 0.3, ease: yonEase }}
                        >
                          {item.label}

                          {/* Underline */}
                          <motion.span
                            className="absolute bottom-2 left-0 h-0.5 bg-yon-accent origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isHovered || isActive ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: yonEase }}
                          />
                        </motion.span>

                        {/* Korean label */}
                        <motion.span
                          className="hidden lg:block font-mono text-sm text-yon-grey/40 tracking-wider"
                          animate={{
                            opacity: isHovered ? 1 : 0.4,
                            x: isHovered ? 8 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.labelKo}
                        </motion.span>

                        {/* Arrow */}
                        <motion.span
                          className="text-yon-accent text-2xl"
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

            {/* Footer */}
            <motion.div
              className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
              variants={footerVariants}
              initial="closed"
              animate="open"
            >
              {/* Social Links */}
              <div className="flex gap-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-2 font-mono text-sm text-yon-silver hover:text-yon-white transition-colors"
                  >
                    <span className="w-4 h-px bg-yon-grey/50 group-hover:w-6 group-hover:bg-yon-accent transition-all" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-right">
                <p className="font-mono text-[10px] text-yon-grey/40 tracking-wider">
                  © {new Date().getFullYear()} THE YON
                </p>
                <p className="font-mono text-[10px] text-yon-grey/30 tracking-wider mt-1">
                  Beyond Fashion
                </p>
              </div>
            </motion.div>

            {/* Decorative background number */}
            <motion.span
              className="absolute bottom-[10%] right-[-5%] font-serif text-[40vw] text-yon-graphite/5 leading-none select-none pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              M
            </motion.span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
