'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CipherText from './CipherText'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/lab', label: 'LAB' },
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5">
      <nav className="flex justify-between items-center h-16 px-6 md:px-12 lg:px-20">
        {/* Logo - Left Side */}
        <Link
          href="/"
          className="text-xl font-light tracking-tight hover:opacity-70 transition-opacity"
        >
          <CipherText text="CINCH LAB" autoReveal={true} />
        </Link>

        {/* Navigation Links - Right Side with proper spacing */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.slice(1).map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-xs tracking-[0.15em] font-light transition-all duration-300 py-2 ${
                pathname === link.href
                  ? 'opacity-100 font-medium text-black border-b border-black'
                  : 'opacity-60 hover:opacity-100 text-gray-700 hover:text-black'
              }`}
            >
              <CipherText text={link.label} delay={index * 30} speed={2} />
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-sm">
          <CipherText text="MENU" />
        </button>
      </nav>
    </header>
  )
}