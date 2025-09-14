'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/lab', label: 'LAB' },
  { href: '/mood', label: 'MOOD' },
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/about', label: 'ABOUT' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [shouldShowNav, setShouldShowNav] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShouldShowNav(false)
      } else {
        setShouldShowNav(true)
      }

      // Add background on scroll
      setIsScrolled(currentScrollY > 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Main Navigation */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md' : 'bg-transparent'
        }`}
        initial={{ y: 0 }}
        animate={{ y: shouldShowNav ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <nav className="flex justify-between items-center h-14 px-8 md:px-20">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <motion.h1
              className="text-xl font-light tracking-tight hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.02 }}
            >
              CINCH—LAB
            </motion.h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group"
              >
                <span className={`text-xs tracking-[0.15em] transition-opacity ${
                  pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}>
                  {link.label}
                </span>
                {pathname === link.href && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-black"
                    layoutId="nav-underline"
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Contact Link - Desktop */}
            <Link
              href="/contact"
              className="hidden md:block text-xs tracking-[0.15em] opacity-60 hover:opacity-100 transition-opacity"
            >
              CONTACT
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-6 h-6 md:hidden"
              aria-label="Menu"
            >
              <motion.span
                className="absolute left-0 w-full h-[1px] bg-black"
                style={{ top: '25%' }}
                animate={isMenuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 w-full h-[1px] bg-black"
                style={{ top: '75%' }}
                animate={isMenuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </nav>

        {/* Subtle border */}
        <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-300 ${
          isScrolled ? 'bg-black/5' : 'bg-transparent'
        }`} />
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-white z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full px-8">
              {/* Mobile Navigation Links */}
              <motion.div
                className="space-y-8 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-3xl font-light tracking-wide ${
                        pathname === link.href ? 'opacity-100' : 'opacity-60'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="pt-8 border-t border-black/10"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-3xl font-light tracking-wide opacity-60"
                  >
                    CONTACT
                  </Link>
                </motion.div>
              </motion.div>

              {/* Mobile Menu Footer */}
              <motion.div
                className="absolute bottom-12 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-xs tracking-[0.2em] opacity-40">
                  FASHION EXTREME TECHNICAL LABORATORY
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}