'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { href: '/collections', label: 'Collections' },
  { href: '/archive', label: 'Archive' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function YonNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
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
      {/* Navigation Bar - Always visible with clear background */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[500] transition-all duration-300 ${
          scrolled
            ? 'bg-yon-white/98 backdrop-blur-md shadow-sm'
            : 'bg-yon-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between px-6 md:px-8 lg:px-12 h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-[600] group outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4"
              onClick={() => setIsOpen(false)}
            >
              <span className="font-serif text-xl md:text-2xl tracking-tight text-yon-black group-hover:text-yon-accent transition-colors duration-300">
                THE YON
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative py-2 outline-none"
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span
                      className={`font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                        isActive
                          ? 'text-yon-black'
                          : 'text-yon-steel hover:text-yon-black'
                      }`}
                    >
                      {item.label}
                    </span>
                    {/* Active/Hover underline */}
                    <span
                      className={`absolute left-0 bottom-0 h-[1px] bg-yon-black transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[600] w-10 h-10 flex md:hidden flex-col items-center justify-center gap-1.5 -mr-2"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <motion.span
                className="block w-5 h-[1.5px] bg-yon-black origin-center"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 3.5 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="block w-5 h-[1.5px] bg-yon-black origin-center"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -3.5 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          </div>
        </div>

        {/* Subtle bottom border */}
        <div className={`h-px bg-yon-platinum transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-50'}`} />
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[400] bg-yon-white flex flex-col md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="flex-1 flex flex-col justify-center px-8">
              <ul className="space-y-8">
                {/* Home link */}
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href="/"
                    className="group inline-block"
                    onClick={() => setIsOpen(false)}
                  >
                    <span
                      className={`font-serif text-3xl tracking-tight transition-colors duration-300 ${
                        pathname === '/'
                          ? 'text-yon-black'
                          : 'text-yon-grey group-hover:text-yon-black'
                      }`}
                    >
                      Home
                    </span>
                  </Link>
                </motion.li>

                {navItems.map((item, index) => {
                  const isActive = pathname === item.href ||
                    (item.href !== '/' && pathname.startsWith(item.href))

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.3,
                        delay: (index + 1) * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        className="group inline-block"
                        onClick={() => setIsOpen(false)}
                      >
                        <span
                          className={`font-serif text-3xl tracking-tight transition-colors duration-300 ${
                            isActive
                              ? 'text-yon-black'
                              : 'text-yon-grey group-hover:text-yon-black'
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Footer info */}
              <motion.div
                className="mt-16 pt-8 border-t border-yon-platinum"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                  Experimental Fashion Portfolio
                </p>
                <p className="mt-2 font-mono text-[10px] text-yon-grey tracking-[0.15em]">
                  By Taehyun Lee
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
