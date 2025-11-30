'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Hydration fix
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setActiveDropdown(null)
  }, [pathname])

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

  // SSR guard
  if (!isMounted) {
    return (
      <>
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: '#FAFAFA',
            borderBottom: '1px solid #D4D4D4',
            height: '64px',
          }}
        >
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '64px',
          }}>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: '24px',
              color: '#0A0A0A',
            }}>
              THE YON
            </span>
          </div>
        </header>
        <div style={{ height: '64px' }} />
      </>
    )
  }

  return (
    <>
      {/* NAVIGATION BAR - 100% Inline Styles */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: '#FAFAFA',
          borderBottom: '1px solid #D4D4D4',
          boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.08)' : 'none',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '64px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '24px',
              fontWeight: 400,
              color: '#0A0A0A',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              zIndex: 10000,
            }}
          >
            THE YON
          </Link>

          {/* Desktop Navigation - hidden on mobile via media query */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              const hasSubItems = item.subItems && item.subItems.length > 0

              return (
                <div
                  key={item.href}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => hasSubItems && handleMouseEnter(item.href)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: 'Consolas, monospace',
                      fontSize: '11px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#0A0A0A' : '#4A4A4A',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      padding: '8px 0',
                      display: 'block',
                      position: 'relative',
                    }}
                  >
                    {item.label}
                    {/* Active underline */}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: isActive ? '100%' : '0%',
                        height: '1px',
                        backgroundColor: '#0A0A0A',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {hasSubItems && activeDropdown === item.href && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        marginTop: '8px',
                        padding: '12px 0',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid #D4D4D4',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                        minWidth: '220px',
                        zIndex: 10001,
                      }}
                      onMouseEnter={() => handleMouseEnter(item.href)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 16px',
                            fontFamily: 'Consolas, monospace',
                            fontSize: '10px',
                            color: '#4A4A4A',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#F0F0F0'
                            e.currentTarget.style.color = '#0A0A0A'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.color = '#4A4A4A'
                          }}
                        >
                          <span>{subItem.label}</span>
                          {'season' in subItem && (
                            <span style={{ color: '#7A7A7A', fontSize: '9px' }}>
                              {subItem.season}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              zIndex: 10000,
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#0A0A0A',
                transition: 'transform 0.3s ease',
                transform: isOpen ? 'rotate(45deg) translateY(4px)' : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '24px',
                height: '2px',
                backgroundColor: '#0A0A0A',
                marginTop: isOpen ? '-2px' : '6px',
                transition: 'transform 0.3s ease',
                transform: isOpen ? 'rotate(-45deg) translateY(-4px)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* Spacer to prevent content overlap */}
      <div style={{ height: '64px' }} aria-hidden="true" />

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            backgroundColor: '#FAFAFA',
            paddingTop: '80px',
            overflowY: 'auto',
          }}
        >
          <nav style={{ padding: '24px 32px' }}>
            {/* Home */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'Georgia, serif',
                fontSize: '28px',
                color: pathname === '/' ? '#0A0A0A' : '#7A7A7A',
                textDecoration: 'none',
                padding: '16px 0',
                borderBottom: '1px solid #E0E0E0',
              }}
            >
              Home
            </Link>

            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              const hasSubItems = item.subItems && item.subItems.length > 0

              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: 'Georgia, serif',
                      fontSize: '28px',
                      color: isActive ? '#0A0A0A' : '#7A7A7A',
                      textDecoration: 'none',
                      padding: '16px 0',
                      borderBottom: '1px solid #E0E0E0',
                    }}
                  >
                    {item.label}
                  </Link>

                  {hasSubItems && (
                    <div style={{ paddingLeft: '20px', paddingBottom: '16px' }}>
                      {item.subItems?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontFamily: 'Consolas, monospace',
                            fontSize: '12px',
                            color: '#4A4A4A',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            padding: '10px 0',
                          }}
                        >
                          <span style={{
                            width: '16px',
                            height: '1px',
                            backgroundColor: '#D4D4D4',
                          }} />
                          <span>{subItem.label}</span>
                          {'season' in subItem && (
                            <span style={{ color: '#7A7A7A', fontSize: '10px', marginLeft: 'auto' }}>
                              {subItem.season}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Footer */}
            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #D4D4D4' }}>
              <p style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '10px',
                color: '#7A7A7A',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
              }}>
                Experimental Fashion Portfolio
              </p>
              <p style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '10px',
                color: '#7A7A7A',
                letterSpacing: '0.15em',
                marginTop: '8px',
              }}>
                By Taehyun Lee
              </p>
            </div>
          </nav>
        </div>
      )}

      {/* Responsive Styles */}
      <style jsx global>{`
        .desktop-nav {
          display: flex !important;
        }
        .mobile-menu-btn {
          display: none !important;
        }

        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </>
  )
}
