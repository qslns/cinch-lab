'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/process', label: 'PROCESS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
]

export default function YonNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent scroll when menu is open
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

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-500 ease-out-expo ${
          scrolled || isOpen
            ? 'bg-yon-white/95 backdrop-blur-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 h-20">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-[600] group"
            onClick={() => setIsOpen(false)}
          >
            <motion.span
              className="font-serif text-2xl md:text-3xl tracking-tight text-yon-black"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              THE YON
            </motion.span>
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[600] w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <motion.span
              className="block w-6 h-[2px] bg-yon-black origin-center"
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 4 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block w-6 h-[2px] bg-yon-black origin-center"
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -4 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[400] bg-yon-white flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Asymmetric Navigation Links */}
            <nav className="relative w-full max-w-4xl px-8">
              <ul className="space-y-4 md:space-y-6">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href
                  // Asymmetric positioning
                  const offsets = [
                    'ml-0',
                    'ml-8 md:ml-16',
                    'ml-4 md:ml-8',
                    'ml-12 md:ml-24',
                    'ml-2 md:ml-4',
                  ]
                  const rotations = [
                    'rotate-[-0.5deg]',
                    'rotate-[1deg]',
                    'rotate-[-1deg]',
                    'rotate-[0.5deg]',
                    'rotate-[-0.3deg]',
                  ]

                  return (
                    <motion.li
                      key={item.href}
                      className={`${offsets[index]} ${rotations[index]}`}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        className="group inline-block"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="relative">
                          {/* Index number */}
                          <span className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 font-mono text-xs text-yon-grey">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          {/* Link text */}
                          <span
                            className={`font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight transition-colors duration-300 ${
                              isActive
                                ? 'text-yon-black'
                                : 'text-yon-grey group-hover:text-yon-black'
                            }`}
                          >
                            {item.label}
                          </span>

                          {/* Active indicator */}
                          {isActive && (
                            <motion.span
                              className="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 w-2 h-2 bg-yon-black rounded-full"
                              layoutId="activeIndicator"
                              transition={{ duration: 0.3 }}
                            />
                          )}

                          {/* Hover underline */}
                          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yon-black transition-all duration-500 ease-out-expo group-hover:w-full" />
                        </span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Footer info in menu */}
              <motion.div
                className="absolute bottom-0 left-8 right-8 flex justify-between items-end text-xs text-yon-grey font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{ bottom: '-20vh' }}
              >
                <span>EXPERIMENTAL FASHION</span>
                <span>BEYOND THE HORIZON</span>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
