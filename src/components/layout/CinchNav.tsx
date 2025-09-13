'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function CinchNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'LAB', glitch: 'LAB' },
    { href: '/collections', label: 'COLLECTIONS', glitch: 'CLLCTNS' },
    { href: '/laboratory', label: 'EXPERIMENTS', glitch: 'XPRMNT' },
    { href: '/archive', label: 'ARCHIVE', glitch: 'ARCHV' },
    { href: '/manifesto', label: 'MANIFESTO', glitch: 'MNFST' },
  ]

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="flex justify-between items-center px-4 md:px-8 py-4">
          {/* Logo */}
          <Link href="/" className="relative group">
            <span 
              className="glitch text-xl md:text-2xl font-bold tracking-wider"
              data-text="CINCH"
            >
              CINCH
            </span>
            <span className="text-xs tracking-[0.3em] absolute -bottom-4 left-0 opacity-50 group-hover:opacity-100 transition-opacity">
              LAB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="morph-nav group relative"
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.glitch}
                  </span>
                </span>
                {pathname === item.href && (
                  <span className="absolute -bottom-2 left-0 right-0 h-[1px] bg-white" />
                )}
              </Link>
            ))}
          </div>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center group"
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-[1px] bg-white transition-all duration-300 ${
                isOpen ? 'rotate-45 translate-y-[1px]' : '-translate-y-1'
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-white transition-all duration-300 ${
                isOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-white transition-all duration-300 ${
                isOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-1'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[99] flex items-center justify-center"
          >
            <motion.nav className="text-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 group"
                  >
                    <span 
                      className="glitch text-3xl md:text-5xl font-bold tracking-wider hover:tracking-[0.3em] transition-all"
                      data-text={item.label}
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              
              {/* Footer Info in Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 text-xs tracking-[0.3em] opacity-50"
              >
                CINCH • RELEASE • REPEAT
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}