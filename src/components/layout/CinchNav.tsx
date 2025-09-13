'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function CinchNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/extreme', label: 'EXTREME' },
    { href: '/runway', label: 'RUNWAY' },
    { href: '/chaos', label: 'CHAOS' },
    { href: '/lab', label: 'LAB' },
    { href: '/collections', label: 'COLLECTIONS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <nav className="flex justify-between items-center px-4 md:px-8 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            CINCH LAB
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-10 h-10 flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 w-full bg-white transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-full bg-white transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-white transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black z-[9998] transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-bold py-4 transition-colors ${
                pathname === item.href ? 'text-white' : 'text-gray-500 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  )
}