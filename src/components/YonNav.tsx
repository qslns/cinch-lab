'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

// Dynamic import for FullscreenMenu (client-only)
const FullscreenMenu = dynamic(() => import('./FullscreenMenu'), { ssr: false })

// Type definitions for nav items
interface SubItem {
  href: string
  label: string
  season?: string
}

interface NavItem {
  id: string
  href: string
  label: string
  num: string
  subItems?: readonly SubItem[]
}

// Frozen navigation structure - no re-creation on render
const NAV_ITEMS: readonly NavItem[] = Object.freeze([
  {
    id: 'nav-collections',
    href: '/collections',
    label: 'Collections',
    num: '01',
    subItems: Object.freeze([
      { href: '/collections/deconstruction', label: 'Deconstruction', season: 'AW25' },
      { href: '/collections/fragments', label: 'Fragments', season: 'SS25' },
      { href: '/collections/void', label: 'Void', season: 'AW24' },
      { href: '/collections/origin', label: 'Origin', season: 'SS24' },
    ]),
  },
  { id: 'nav-process', href: '/process', label: 'Process', num: '02' },
  {
    id: 'nav-archive',
    href: '/archive',
    label: 'Archive',
    num: '03',
    subItems: Object.freeze([
      { href: '/archive#aw25', label: 'AW25 Research' },
      { href: '/archive#ss25', label: 'SS25 Research' },
      { href: '/archive#aw24', label: 'AW24 Research' },
    ]),
  },
  { id: 'nav-about', href: '/about', label: 'About', num: '04' },
  { id: 'nav-contact', href: '/contact', label: 'Contact', num: '05' },
])

// Pre-computed rotations - frozen
const DESKTOP_ROTATIONS: readonly number[] = Object.freeze([-0.8, 0.5, -0.3, 0.7, -0.5])
const MOBILE_ROTATIONS: readonly number[] = Object.freeze([-0.3, 0.5, -0.5, 0.3, -0.4])

export default function YonNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
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
    setIsFullscreenMenuOpen(false)
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

  const handleMouseEnter = useCallback((href: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setActiveDropdown(href)
  }, [])

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }, [])

  // Keyboard navigation handlers
  const handleKeyDown = useCallback((e: React.KeyboardEvent, href: string, hasSubItems: boolean) => {
    if (!hasSubItems) return

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        setActiveDropdown(prev => prev === href ? null : href)
        break
      case 'Escape':
        setActiveDropdown(null)
        break
      case 'ArrowDown':
        e.preventDefault()
        const firstItem = document.querySelector(`[data-dropdown="${href}"] a`) as HTMLElement
        firstItem?.focus()
        break
    }
  }, [])

  const handleDropdownKeyDown = useCallback((e: React.KeyboardEvent, itemHref: string) => {
    const dropdown = document.querySelector(`[data-dropdown="${itemHref}"]`)
    if (!dropdown) return

    const links = Array.from(dropdown.querySelectorAll('a')) as HTMLElement[]
    const currentIndex = links.indexOf(document.activeElement as HTMLElement)

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        const nextIndex = currentIndex + 1 < links.length ? currentIndex + 1 : 0
        links[nextIndex]?.focus()
        break
      case 'ArrowUp':
        e.preventDefault()
        const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : links.length - 1
        links[prevIndex]?.focus()
        break
      case 'Escape':
        e.preventDefault()
        setActiveDropdown(null)
        const trigger = document.querySelector(`[aria-controls="dropdown-${itemHref.replace('/', '')}"]`) as HTMLElement
        trigger?.focus()
        break
    }
  }, [])

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
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            height: '42px',
          }}
        >
          <div style={{
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '42px',
          }}>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: '26px',
              color: '#0A0A0A',
              letterSpacing: '-0.03em',
            }}>
              THE YON
            </span>
          </div>
        </header>
        <div style={{ height: '42px' }} />
      </>
    )
  }

  return (
    <>
      {/* COMPACT DECONSTRUCTIVIST NAVIGATION BAR */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: scrolled ? 'rgba(250,250,250,0.95)' : '#FAFAFA',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          borderBottom: `1px solid rgba(0,0,0,${scrolled ? 0.08 : 0.04})`,
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {/* Decorative accent line - asymmetric */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '15%',
            width: scrolled ? '35%' : '0%',
            height: '1px',
            backgroundColor: '#8B7355',
            transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />

        <div
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            height: '42px',
            position: 'relative',
          }}
        >
          {/* Logo - compact deconstructed style */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              zIndex: 10000,
              transform: 'rotate(-0.3deg)',
            }}
          >
            <span
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '18px',
                fontWeight: 400,
                color: '#0A0A0A',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              THE YON
            </span>
            <span
              style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '6px',
                color: '#8B7355',
                letterSpacing: '0.2em',
                opacity: 0.7,
              }}
            >
              Beyond
            </span>
          </Link>

          {/* Desktop Navigation - deconstructed */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            className="desktop-nav"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              const hasSubItems = item.subItems && item.subItems.length > 0
              const dropdownId = `dropdown-${item.href.replace('/', '')}`
              const isHovered = hoveredItem === item.href
              const rotation = DESKTOP_ROTATIONS[index % DESKTOP_ROTATIONS.length]

              return (
                <div
                  key={item.href}
                  style={{
                    position: 'relative',
                    transform: isHovered ? `rotate(${rotation * 2}deg)` : `rotate(${rotation}deg)`,
                    transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  onMouseEnter={() => {
                    setHoveredItem(item.href)
                    hasSubItems && handleMouseEnter(item.href)
                  }}
                  onMouseLeave={() => {
                    setHoveredItem(null)
                    handleMouseLeave()
                  }}
                >
                  <Link
                    href={item.href}
                    style={{
                      fontFamily: 'Consolas, monospace',
                      fontSize: '9px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#0A0A0A' : isHovered ? '#0A0A0A' : '#4A4A4A',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      padding: '10px 12px',
                      display: 'block',
                      position: 'relative',
                      transition: 'color 0.3s ease',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    aria-expanded={hasSubItems ? activeDropdown === item.href : undefined}
                    aria-controls={hasSubItems ? dropdownId : undefined}
                    aria-haspopup={hasSubItems ? 'menu' : undefined}
                    onKeyDown={(e) => handleKeyDown(e, item.href, hasSubItems ?? false)}
                  >
                    {item.label}
                    {hasSubItems && (
                      <span aria-hidden="true" style={{ marginLeft: '4px', fontSize: '6px', opacity: 0.5 }}>
                        {activeDropdown === item.href ? '▲' : '▼'}
                      </span>
                    )}

                    {/* Active indicator - simple underline */}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '6px',
                          left: '12px',
                          right: '12px',
                          height: '1px',
                          backgroundColor: '#8B7355',
                        }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu - Deconstructed */}
                  {hasSubItems && activeDropdown === item.href && (
                    <div
                      id={dropdownId}
                      role="menu"
                      aria-label={`${item.label} submenu`}
                      data-dropdown={item.href}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-8px',
                        marginTop: '4px',
                        padding: '12px 0',
                        backgroundColor: '#FAFAFA',
                        border: '1px solid rgba(0,0,0,0.06)',
                        minWidth: '200px',
                        zIndex: 10001,
                        transform: 'rotate(0.5deg)',
                        boxShadow: '4px 8px 24px rgba(0,0,0,0.08)',
                      }}
                      onMouseEnter={() => handleMouseEnter(item.href)}
                      onMouseLeave={handleMouseLeave}
                      onKeyDown={(e) => handleDropdownKeyDown(e, item.href)}
                    >
                      {/* Dropdown decoration */}
                      <span
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          fontFamily: 'Consolas, monospace',
                          fontSize: '6px',
                          color: 'rgba(74, 74, 74, 0.2)',
                          letterSpacing: '0.1em',
                        }}
                      >
                        SUB
                      </span>

                      {item.subItems?.map((subItem, subIndex) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          role="menuitem"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '10px 16px',
                            fontFamily: 'Consolas, monospace',
                            fontSize: '9px',
                            color: '#7A7A7A',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            transition: 'all 0.2s ease',
                            transform: `rotate(${(subIndex % 2 === 0 ? -0.3 : 0.3)}deg)`,
                            borderLeft: '2px solid transparent',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#0A0A0A'
                            e.currentTarget.style.backgroundColor = 'rgba(139, 115, 85, 0.05)'
                            e.currentTarget.style.borderLeftColor = '#8B7355'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#7A7A7A'
                            e.currentTarget.style.backgroundColor = 'transparent'
                            e.currentTarget.style.borderLeftColor = 'transparent'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.color = '#0A0A0A'
                            e.currentTarget.style.borderLeftColor = '#8B7355'
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.color = '#7A7A7A'
                            e.currentTarget.style.borderLeftColor = 'transparent'
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '6px', opacity: 0.4 }}>→</span>
                            {subItem.label}
                          </span>
                          {'season' in subItem && (
                            <span style={{
                              color: '#8B7355',
                              fontSize: '8px',
                              fontWeight: 500,
                              padding: '2px 6px',
                              backgroundColor: 'rgba(139, 115, 85, 0.1)',
                            }}>
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

            {/* Divider - compact */}
            <span
              style={{
                width: '1px',
                height: '16px',
                backgroundColor: 'rgba(0,0,0,0.08)',
                margin: '0 8px',
              }}
            />

            {/* Fullscreen Menu Button - compact */}
            <button
              onClick={() => setIsFullscreenMenuOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'Consolas, monospace',
                fontSize: '8px',
                fontWeight: 400,
                color: '#4A4A4A',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '8px 10px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0A0A0A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#4A4A4A'
              }}
              aria-label="Open fullscreen menu"
            >
              <span style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                width: '12px',
              }}>
                <span style={{
                  width: '12px',
                  height: '1px',
                  backgroundColor: 'currentColor',
                }} />
                <span style={{
                  width: '8px',
                  height: '1px',
                  backgroundColor: 'currentColor',
                }} />
              </span>
              <span>Menu</span>
            </button>
          </nav>

          {/* Mobile Hamburger Button - deconstructed */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              zIndex: 10000,
              transform: 'rotate(1deg)',
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              style={{
                display: 'block',
                width: '26px',
                height: '2px',
                backgroundColor: '#0A0A0A',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                transform: isOpen ? 'rotate(45deg) translateY(5px)' : 'rotate(-2deg)',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '18px',
                height: '2px',
                backgroundColor: '#0A0A0A',
                marginTop: isOpen ? '-2px' : '6px',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                transform: isOpen ? 'rotate(-45deg) translateY(-5px)' : 'rotate(1deg)',
                marginLeft: isOpen ? '0' : '8px',
              }}
            />
          </button>
        </div>
      </header>

      {/* Spacer to prevent content overlap */}
      <div style={{ height: '42px' }} aria-hidden="true" />

      {/* Mobile Menu Overlay - deconstructed */}
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
            paddingTop: '88px',
            overflowY: 'auto',
          }}
        >
          {/* Background decorations */}
          <span
            style={{
              position: 'absolute',
              top: '15%',
              right: '-5%',
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(8rem, 25vw, 15rem)',
              fontWeight: 100,
              color: 'rgba(10, 10, 10, 0.02)',
              transform: 'rotate(-8deg)',
              pointerEvents: 'none',
            }}
          >
            M
          </span>

          <span
            style={{
              position: 'absolute',
              bottom: '20%',
              left: '5%',
              fontFamily: 'Consolas, monospace',
              fontSize: '8px',
              color: 'rgba(139, 115, 85, 0.2)',
              letterSpacing: '0.3em',
              transform: 'rotate(-90deg)',
              transformOrigin: 'left bottom',
              pointerEvents: 'none',
            }}
          >
            NAVIGATION
          </span>

          <nav style={{ padding: '24px 32px' }}>
            {/* Home */}
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px',
                fontFamily: 'Georgia, serif',
                fontSize: '32px',
                color: pathname === '/' ? '#0A0A0A' : '#7A7A7A',
                textDecoration: 'none',
                padding: '20px 0',
                borderBottom: '1px solid rgba(0,0,0,0.06)',
                transform: 'rotate(-0.5deg)',
              }}
            >
              <span style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '10px',
                color: '#8B7355',
                opacity: 0.6,
              }}>00</span>
              Home
            </Link>

            {NAV_ITEMS.map((item, index) => {
              const isActive = pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href))
              const hasSubItems = item.subItems && item.subItems.length > 0

              return (
                <div key={item.href} style={{ transform: `rotate(${MOBILE_ROTATIONS[index % MOBILE_ROTATIONS.length]}deg)` }}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '16px',
                      fontFamily: 'Georgia, serif',
                      fontSize: '32px',
                      color: isActive ? '#0A0A0A' : '#7A7A7A',
                      textDecoration: 'none',
                      padding: '20px 0',
                      borderBottom: '1px solid rgba(0,0,0,0.06)',
                      position: 'relative',
                    }}
                  >
                    <span style={{
                      fontFamily: 'Consolas, monospace',
                      fontSize: '10px',
                      color: '#8B7355',
                      opacity: 0.6,
                    }}>{item.num}</span>
                    {item.label}

                    {isActive && (
                      <span style={{
                        position: 'absolute',
                        right: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '18px',
                        color: '#8B7355',
                      }}>→</span>
                    )}
                  </Link>

                  {hasSubItems && (
                    <div style={{ paddingLeft: '36px', paddingBottom: '16px' }}>
                      {item.subItems?.map((subItem, subIndex) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setIsOpen(false)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontFamily: 'Consolas, monospace',
                            fontSize: '11px',
                            color: '#4A4A4A',
                            textDecoration: 'none',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            padding: '12px 0',
                            transform: `rotate(${(subIndex % 2 === 0 ? 0.3 : -0.3)}deg)`,
                          }}
                        >
                          <span style={{
                            width: '12px',
                            height: '1px',
                            backgroundColor: '#8B7355',
                            opacity: 0.5,
                          }} />
                          <span>{subItem.label}</span>
                          {'season' in subItem && (
                            <span style={{
                              color: '#8B7355',
                              fontSize: '9px',
                              marginLeft: 'auto',
                              padding: '2px 8px',
                              backgroundColor: 'rgba(139, 115, 85, 0.1)',
                            }}>
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

            {/* Footer - deconstructed */}
            <div style={{
              marginTop: '48px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              transform: 'rotate(0.3deg)',
            }}>
              <p style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '9px',
                color: '#7A7A7A',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
              }}>
                Experimental Fashion Portfolio
              </p>
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: '14px',
                color: '#4A4A4A',
                letterSpacing: '0.02em',
                marginTop: '12px',
              }}>
                By Taehyun Lee
              </p>
              <p style={{
                fontFamily: 'Consolas, monospace',
                fontSize: '8px',
                color: '#8B7355',
                letterSpacing: '0.15em',
                marginTop: '8px',
                opacity: 0.6,
              }}>
                뒤틀렸지만 조화로운
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

        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>

      {/* Fullscreen Menu */}
      <FullscreenMenu
        isOpen={isFullscreenMenuOpen}
        onClose={() => setIsFullscreenMenuOpen(false)}
      />
    </>
  )
}
