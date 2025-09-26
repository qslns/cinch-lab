'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CipherText from './CipherText'

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/lab', label: 'LAB' },
  { href: '/collections', label: 'COLLECTIONS' },
  { href: '/archive', label: 'ARCHIVE' },
  { href: '/analysis', label: 'ANALYSIS' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 right-0 z-50 w-full md:w-auto">
      <nav className="flex md:flex-col items-end md:items-start gap-3 md:gap-4 p-4 md:p-6 bg-white/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none">
        {/* Logo - Top for desktop, left for mobile */}
        <Link
          href="/"
          className="text-lg md:text-xl font-light tracking-tight hover:opacity-70 transition-opacity mb-0 md:mb-6 mr-auto md:mr-0"
        >
          <CipherText text="CINCH LAB" autoReveal={true} />
        </Link>

        {/* Navigation Links with improved spacing */}
        <div className="flex md:flex-col items-center md:items-start gap-8 md:gap-6">
          {navLinks.slice(1).map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] md:text-xs tracking-[0.12em] font-light transition-all duration-300 px-2 md:px-0 ${
                pathname === link.href
                  ? 'opacity-100 font-medium text-black'
                  : 'opacity-60 hover:opacity-100 text-gray-800'
              }`}
            >
              <CipherText text={link.label} delay={index * 50} speed={2} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}