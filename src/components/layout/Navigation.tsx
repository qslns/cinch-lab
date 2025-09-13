'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/collections', label: 'COLLECTIONS' },
    { href: '/lab', label: 'LAB' },
    { href: '/archive', label: 'ARCHIVE' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100">
      <div className="flex justify-between items-center px-4 md:px-8 py-4">
        <Link href="/" className="text-lg md:text-xl font-light tracking-[0.2em]">
          CINCH LAB
        </Link>
        
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs tracking-[0.15em] transition-all ${
                pathname === item.href 
                  ? 'text-black border-b border-black' 
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-6 h-6 flex flex-col justify-center gap-1"
        >
          <motion.span 
            animate={{ 
              rotate: mobileMenuOpen ? 45 : 0, 
              y: mobileMenuOpen ? 4 : 0 
            }}
            className="w-full h-[1px] bg-black origin-center"
          />
          <motion.span 
            animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            className="w-full h-[1px] bg-black"
          />
          <motion.span 
            animate={{ 
              rotate: mobileMenuOpen ? -45 : 0, 
              y: mobileMenuOpen ? -4 : 0 
            }}
            className="w-full h-[1px] bg-black origin-center"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="py-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 text-xs tracking-[0.15em] ${
                    pathname === item.href 
                      ? 'text-black bg-gray-50' 
                      : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}