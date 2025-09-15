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
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
      <nav className="flex justify-between items-center h-14 px-8 md:px-20">
        {/* Logo */}
        <Link href="/" className="text-xl font-light tracking-tight hover:opacity-70 transition-opacity">
          <CipherText text="CINCH LAB" />
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10">
          {navLinks.slice(1).map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[11px] sm:text-xs md:text-sm tracking-[0.12em] font-light transition-all duration-300 ${
                pathname === link.href ? 'opacity-100 font-normal' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <CipherText text={link.label} delay={index * 30} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}