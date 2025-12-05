'use client'

import { memo } from 'react'
import Link from 'next/link'
import BackToTop from './BackToTop'

const navItems = [
  { href: '/collections', label: 'Collections' },
  { href: '/process', label: 'Process' },
  { href: '/archive', label: 'Archive' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const

const socialItems = [
  { href: 'mailto:hello@theyon.com', label: 'Email', external: false },
  { href: 'https://instagram.com/theyon_studio', label: 'Instagram', external: true },
] as const

const Footer = memo(function Footer() {
  return (
    <>
      <BackToTop />
      <footer className="relative py-24 md:py-32 px-6 md:px-12 bg-yon-charcoal text-yon-white overflow-hidden">
        {/* Background typography - deconstructivist style */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '5%',
            left: '-10%',
            fontSize: 'clamp(10rem, 25vw, 40rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-serif), Georgia, serif',
            opacity: 0.03,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: '#FAFAFA',
            transform: 'rotate(-4deg)',
          }}
          aria-hidden="true"
        >
          YON
        </span>

        {/* Secondary background - vertical */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            bottom: '10%',
            right: '3%',
            fontSize: 'clamp(4rem, 10vw, 12rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.02,
            letterSpacing: '0.3em',
            color: '#FAFAFA',
            writingMode: 'vertical-rl',
          }}
          aria-hidden="true"
        >
          2024
        </span>

        {/* Third layer */}
        <span
          className="absolute pointer-events-none select-none"
          style={{
            top: '40%',
            right: '-8%',
            fontSize: 'clamp(8rem, 18vw, 25rem)',
            fontWeight: 100,
            fontFamily: 'var(--font-mono), monospace',
            opacity: 0.015,
            color: '#8B7355',
            transform: 'rotate(8deg)',
          }}
          aria-hidden="true"
        >
          →
        </span>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
            {/* Brand - deconstructed layout */}
            <div className="md:col-span-5">
              <Link href="/" className="inline-block group focus-ring">
                <span
                  className="font-serif text-yon-white group-hover:text-yon-platinum transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    letterSpacing: '-0.02em',
                    transform: 'rotate(-1deg)',
                    display: 'inline-block',
                  }}
                >
                  THE YON
                </span>
              </Link>

              <p
                className="mt-8 text-yon-silver leading-relaxed max-w-sm"
                style={{
                  fontSize: '0.9rem',
                  transform: 'rotate(0.5deg)',
                  marginLeft: '1rem',
                }}
              >
                Experimental fashion that transcends time and space.
                Every element twisted, yet perfectly harmonious.
              </p>

              <span
                className="block font-mono text-yon-grey/50 mt-4"
                style={{
                  fontSize: '0.55rem',
                  letterSpacing: '0.2em',
                  marginLeft: '1rem',
                }}
              >
                뒤틀렸지만 조화로운
              </span>
            </div>

            {/* Navigation - scattered style */}
            <nav className="md:col-span-3 md:col-start-7" aria-label="Footer navigation">
              <h4
                className="font-mono text-yon-grey tracking-[0.25em] uppercase mb-8"
                style={{
                  fontSize: '0.55rem',
                  transform: 'rotate(-0.5deg)',
                }}
              >
                Navigate
              </h4>
              <ul className="space-y-4">
                {navItems.map((item, index) => (
                  <li
                    key={item.href}
                    style={{ transform: `rotate(${(index % 2 === 0 ? -0.5 : 0.5) * 0.5}deg)` }}
                  >
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-yon-silver hover:text-yon-white focus-visible:text-yon-white transition-colors duration-300 focus-ring py-1"
                      style={{ fontSize: '0.9rem' }}
                    >
                      <span className="font-mono text-yon-grey/40" style={{ fontSize: '0.5rem' }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span>{item.label}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-yon-accent">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Connect - asymmetric */}
            <nav className="md:col-span-3" aria-label="Social links">
              <h4
                className="font-mono text-yon-grey tracking-[0.25em] uppercase mb-8"
                style={{
                  fontSize: '0.55rem',
                  transform: 'rotate(0.5deg)',
                }}
              >
                Connect
              </h4>
              <ul className="space-y-4">
                {socialItems.map((item, index) => (
                  <li
                    key={item.href}
                    style={{ transform: `rotate(${index % 2 === 0 ? 0.3 : -0.3}deg)` }}
                  >
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      aria-label={item.external ? `${item.label} (opens in new tab)` : item.label}
                      className="group inline-flex items-center gap-2 text-yon-silver hover:text-yon-white focus-visible:text-yon-white transition-colors duration-300 focus-ring py-1"
                      style={{ fontSize: '0.9rem' }}
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

              {/* Location - rotated */}
              <div className="mt-10" style={{ transform: 'rotate(-0.5deg)' }}>
                <span
                  className="font-mono text-yon-grey tracking-[0.15em] uppercase block mb-2"
                  style={{ fontSize: '0.5rem' }}
                >
                  Based in
                </span>
                <span className="text-yon-silver" style={{ fontSize: '0.85rem' }}>
                  Seoul & Tokyo
                </span>
              </div>
            </nav>
          </div>

          {/* Bottom - deconstructed divider */}
          <div
            className="mt-20 pt-10 flex flex-col md:flex-row justify-between items-center gap-6"
            style={{
              borderTop: '1px solid rgba(250,250,250,0.08)',
            }}
          >
            {/* Designer credit - prominent */}
            <div style={{ transform: 'rotate(-0.5deg)' }}>
              <span
                className="font-mono text-yon-grey/40 uppercase tracking-[0.2em]"
                style={{ fontSize: '0.5rem' }}
              >
                Designed by
              </span>
              <span
                className="block font-serif text-yon-silver mt-1"
                style={{ fontSize: '0.9rem' }}
              >
                Taehyun Lee
              </span>
            </div>

            {/* Copyright */}
            <p
              className="font-mono text-yon-grey/40"
              style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
            >
              &copy; {new Date().getFullYear()} THE YON
            </p>

            {/* Tagline */}
            <p
              className="font-mono text-yon-grey/30 italic"
              style={{ fontSize: '0.5rem', transform: 'rotate(0.5deg)' }}
            >
              Beyond Fashion
            </p>
          </div>

          {/* Scattered accent marks */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: '25%',
              left: '5%',
              transform: 'rotate(-15deg)',
            }}
          >
            <span className="font-mono text-yon-grey/10" style={{ fontSize: '0.6rem' }}>
              001
            </span>
          </div>

          <div
            className="absolute pointer-events-none"
            style={{
              top: '30%',
              right: '15%',
              transform: 'rotate(10deg)',
            }}
          >
            <span className="font-mono text-yon-grey/10" style={{ fontSize: '0.5rem' }}>
              EXP
            </span>
          </div>
        </div>
      </footer>
    </>
  )
})

export default Footer
