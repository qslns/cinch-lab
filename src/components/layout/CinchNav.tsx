'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/lab', label: 'LAB' },
    { href: '/collections', label: 'COLLECTIONS' },
    { href: '/archive', label: 'ARCHIVE' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="flex justify-between items-center px-4 md:px-8 py-4">
          {/* Logo */}
          <Link href="/" className="relative group">
            <span className="text-xl md:text-2xl font-light tracking-wider hover:tracking-[0.3em] transition-all duration-300">
              CINCH LAB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wider transition-all duration-300 hover:opacity-100 ${
                  pathname === item.href ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="block h-[1px] bg-white mt-1" />
                )}
              </Link>
            ))}
          </div>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center md:hidden"
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

      {/* Fullscreen Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black z-40 flex items-center justify-center transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="text-center">
          {navItems.map((item, index) => (
            <div
              key={item.href}
              className="fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-4 text-2xl md:text-4xl font-light tracking-wider hover:tracking-[0.4em] transition-all duration-300"
              >
                {item.label}
              </Link>
            </div>
          ))}

          {/* Footer Info in Menu */}
          <div className="mt-12 text-xs tracking-[0.3em] opacity-50">
            CINCH • RELEASE • REPEAT
          </div>
        </nav>
      </div>
    </>
  )
}