'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// Navigation structure with sub-items
const navItems = [
  {
    href: '/collections',
    label: 'Collections',
    subItems: [
      { href: '/collections/deconstruction', label: 'Deconstruction', season: 'AW25' },
      { href: '/collections/fragments', label: 'Fragments', season: 'SS25' },
      { href: '/collections/void', label: 'Void', season: 'AW24' },
      { href: '/collections/origin', label: 'Origin', season: 'SS24' },
    ],
  },
  {
    href: '/archive',
    label: 'Archive',
    subItems: [
      { href: '/archive#aw25', label: 'AW25 Research' },
      { href: '/archive#ss25', label: 'SS25 Research' },
      { href: '/archive#aw24', label: 'AW24 Research' },
    ],
  },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function YonNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

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
    setActiveDropdown(null)
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

  const handleMouseEnter = (href: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(href)
  }

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  return (
    <>
      {/* Navigation Bar - Solid background, always visible */}
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md'
            : 'bg-white'
        }`}
        style={{ backgroundColor: '#FAFAFA' }}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between px-6 md:px-8 lg:px-12 h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="relative z-[1100] group outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
              onClick={() => setIsOpen(false)}
              aria-label="THE YON - Home"
            >
              <span className="font-serif text-xl md:text-2xl tracking-tight text-yon-black group-hover:text-yon-accent transition-colors duration-300">
                THE YON
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))
                const hasSubItems = item.subItems && item.subItems.length > 0

                return (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={() => hasSubItems && handleMouseEnter(item.href)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className="group relative py-2 outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4 rounded"
                      aria-current={isActive ? 'page' : undefined}
                      aria-haspopup={hasSubItems ? 'true' : undefined}
                      aria-expanded={hasSubItems ? activeDropdown === item.href : undefined}
                    >
                      <span
                        className={`font-mono text-[11px] tracking-[0.12em] uppercase transition-colors duration-300 ${
                          isActive
                            ? 'text-yon-black font-medium'
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

                    {/* Dropdown Menu */}
                    {hasSubItems && (
                      <AnimatePresence>
                        {activeDropdown === item.href && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute top-full left-0 mt-2 py-3 bg-white border border-yon-platinum shadow-lg min-w-[200px]"
                            style={{ backgroundColor: '#FAFAFA' }}
                            onMouseEnter={() => handleMouseEnter(item.href)}
                            onMouseLeave={handleMouseLeave}
                          >
                            {item.subItems?.map((subItem, index) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="group flex items-center justify-between px-4 py-2.5 hover:bg-yon-platinum/50 transition-colors outline-none focus-visible:bg-yon-platinum/50"
                              >
                                <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-yon-steel group-hover:text-yon-black transition-colors">
                                  {subItem.label}
                                </span>
                                {'season' in subItem && (
                                  <span className="font-mono text-[9px] text-yon-grey/60 tracking-wider">
                                    {subItem.season}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[1100] w-12 h-12 flex md:hidden flex-col items-center justify-center gap-1.5 -mr-3 rounded focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-2"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <motion.span
                className="block w-6 h-[2px] bg-yon-black origin-center"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 4 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="block w-6 h-[2px] bg-yon-black origin-center"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -4 : 0,
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </button>
          </div>
        </nav>

        {/* Bottom border */}
        <div className="h-px bg-yon-platinum" />
      </header>

      {/* Spacer to prevent content from going under fixed nav */}
      <div className="h-16 md:h-20" aria-hidden="true" />

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[900] bg-white flex flex-col md:hidden pt-20"
            style={{ backgroundColor: '#FAFAFA' }}
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <nav className="flex-1 flex flex-col justify-start px-8 pt-8 overflow-y-auto">
              <ul className="space-y-6" role="menu">
                {/* Home link */}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  role="none"
                >
                  <Link
                    href="/"
                    className="group inline-block py-2 outline-none focus-visible:ring-2 focus-visible:ring-yon-black rounded"
                    onClick={() => setIsOpen(false)}
                    role="menuitem"
                  >
                    <span
                      className={`font-serif text-2xl tracking-tight transition-colors duration-300 ${
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
                  const hasSubItems = item.subItems && item.subItems.length > 0

                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                      role="none"
                    >
                      <Link
                        href={item.href}
                        className="group inline-block py-2 outline-none focus-visible:ring-2 focus-visible:ring-yon-black rounded"
                        onClick={() => setIsOpen(false)}
                        role="menuitem"
                      >
                        <span
                          className={`font-serif text-2xl tracking-tight transition-colors duration-300 ${
                            isActive
                              ? 'text-yon-black'
                              : 'text-yon-grey group-hover:text-yon-black'
                          }`}
                        >
                          {item.label}
                        </span>
                      </Link>

                      {/* Sub-items in mobile */}
                      {hasSubItems && (
                        <ul className="mt-3 ml-4 space-y-2" role="menu">
                          {item.subItems?.map((subItem) => (
                            <li key={subItem.href} role="none">
                              <Link
                                href={subItem.href}
                                className="group flex items-center gap-3 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-yon-black rounded"
                                onClick={() => setIsOpen(false)}
                                role="menuitem"
                              >
                                <span className="w-4 h-px bg-yon-grey/30" />
                                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-yon-steel group-hover:text-yon-black transition-colors">
                                  {subItem.label}
                                </span>
                                {'season' in subItem && (
                                  <span className="font-mono text-[9px] text-yon-grey/50">
                                    {subItem.season}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  )
                })}
              </ul>

              {/* Footer info */}
              <motion.div
                className="mt-auto py-8 border-t border-yon-platinum"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
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
