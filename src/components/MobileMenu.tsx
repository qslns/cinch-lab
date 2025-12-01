'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { href: '/', label: 'Home', labelKo: '홈' },
  { href: '/collections', label: 'Collections', labelKo: '컬렉션' },
  { href: '/process', label: 'Process', labelKo: '프로세스' },
  { href: '/archive', label: 'Archive', labelKo: '아카이브' },
  { href: '/about', label: 'About', labelKo: '소개' },
  { href: '/contact', label: 'Contact', labelKo: '연락' },
]

const yonEase = [0.22, 1, 0.36, 1] as const

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-yon-black/50 backdrop-blur-sm z-[998]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: yonEase }}
            className="fixed top-0 right-0 h-full w-[85vw] max-w-[400px] bg-yon-white z-[999] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center touch-target"
              aria-label="Close menu"
            >
              <span className="relative w-6 h-6">
                <span className="absolute top-1/2 left-0 w-full h-px bg-yon-black rotate-45" />
                <span className="absolute top-1/2 left-0 w-full h-px bg-yon-black -rotate-45" />
              </span>
            </button>

            {/* Brand */}
            <div className="pt-24 px-8">
              <span className="font-serif text-2xl text-yon-black">THE YON</span>
            </div>

            {/* Navigation Links */}
            <ul className="mt-12 px-8 space-y-1">
              {menuItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, ease: yonEase }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`
                        flex items-center justify-between py-4 border-b border-yon-platinum
                        touch-target transition-colors
                        ${isActive ? 'text-yon-accent' : 'text-yon-black'}
                      `}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="font-serif text-xl">{item.label}</span>
                      <span className="font-mono text-xs text-yon-grey">{item.labelKo}</span>
                    </Link>
                  </motion.li>
                )
              })}
            </ul>

            {/* Footer */}
            <div className="mt-auto pt-12 pb-8 px-8">
              <div className="space-y-4">
                <a
                  href="https://instagram.com/theyon_studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-mono text-xs text-yon-grey hover:text-yon-black transition-colors touch-target py-2"
                >
                  Instagram →
                </a>
                <a
                  href="mailto:hello@theyon.com"
                  className="block font-mono text-xs text-yon-grey hover:text-yon-black transition-colors touch-target py-2"
                >
                  hello@theyon.com
                </a>
              </div>
              <p className="mt-8 font-mono text-[10px] text-yon-grey tracking-wider">
                © 2024 THE YON. ALL RIGHTS RESERVED.
              </p>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
