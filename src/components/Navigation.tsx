'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
          CINCH LAB
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 md:gap-10">
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[10px] md:text-xs tracking-[0.15em] transition-opacity ${
                pathname === link.href ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}