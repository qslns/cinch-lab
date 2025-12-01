'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import BackToTop from './BackToTop'

const navItems = [
  { href: '/collections', label: 'Collections' },
  { href: '/archive', label: 'Archive' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const socialItems = [
  { href: 'mailto:hello@theyon.com', label: 'Email', external: false },
  { href: 'https://instagram.com/theyon_studio', label: 'Instagram', external: true },
]

export default function Footer() {
  return (
    <>
    <BackToTop />
    <footer className="py-20 md:py-28 px-6 md:px-12 bg-yon-charcoal text-yon-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block group focus-ring">
              <span className="font-serif text-3xl md:text-4xl text-yon-white group-hover:text-yon-platinum transition-colors duration-300">
                THE YON
              </span>
            </Link>
            <p className="mt-6 text-base text-yon-silver leading-relaxed max-w-sm">
              Experimental fashion that transcends time and space.
              Every element twisted, yet perfectly harmonious.
            </p>
          </div>

          {/* Navigation */}
          <nav className="md:col-span-3 md:col-start-7" aria-label="Footer navigation">
            <h4 className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-base text-yon-silver hover:text-yon-white focus-visible:text-yon-white transition-colors duration-300 focus-ring"
                  >
                    <span>{item.label}</span>
                    <motion.span
                      className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                      initial={{ x: -4 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connect */}
          <nav className="md:col-span-3" aria-label="Social links">
            <h4 className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
              {socialItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.external ? `${item.label} (opens in new tab)` : item.label}
                    className="group inline-flex items-center gap-2 text-base text-yon-silver hover:text-yon-white focus-visible:text-yon-white transition-colors duration-300 focus-ring"
                  >
                    <span>{item.label}</span>
                    {item.external && (
                      <>
                        <svg
                          className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                        <span className="sr-only">(opens in new tab)</span>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            {/* Location */}
            <div className="mt-8">
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase block mb-2">
                Based in
              </span>
              <span className="text-base text-yon-silver">Seoul & Tokyo</span>
            </div>
          </nav>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-yon-graphite flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-yon-grey">
            &copy; {new Date().getFullYear()} THE YON. All rights reserved.
          </p>
          <p className="font-mono text-xs text-yon-grey">
            Designed by Taehyun Lee
          </p>
        </div>
      </div>
    </footer>
    </>
  )
}
