'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50" />

        <div className={`text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-4">
            <span className="block bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              CINCH
            </span>
            <span className="block text-3xl md:text-5xl tracking-[0.5em] text-gray-400">
              LAB
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mt-8">
            EXPERIMENTAL FASHION LABORATORY
          </p>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center"
              style={{ opacity: Math.max(0, 1 - scrollY * 0.001) }}>
            EXPLORE THE EXTREME
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { href: '/extreme', title: 'EXTREME', desc: 'Maximum Visual Chaos' },
              { href: '/runway', title: 'RUNWAY', desc: 'Fashion Show Experience' },
              { href: '/chaos', title: 'CHAOS', desc: 'Product Collection' },
              { href: '/void', title: 'VOID', desc: 'Enter The Nothingness' },
              { href: '/distortion', title: 'DISTORTION', desc: 'Optimized Experiments' },
              { href: '/lab', title: 'LABORATORY', desc: 'Visual Experiments' },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative border border-gray-800 p-8 hover:border-white transition-all duration-500"
                style={{
                  transform: `translateY(${Math.sin(scrollY * 0.001 + index) * 10}px)`,
                  opacity: Math.max(0.5, 1 - scrollY * 0.0005)
                }}
              >
                <h3 className="text-2xl font-bold mb-2 group-hover:text-gray-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 group-hover:text-gray-400 transition-colors">
                  {item.desc}
                </p>
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="py-32 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            PUSH THE BOUNDARIES
          </h2>
          <p className="text-xl text-gray-400 mb-4">
            Where fashion meets digital experimentation
          </p>
          <p className="text-xl text-gray-400">
            Creating tomorrow's aesthetic today
          </p>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="space-y-4">
            {[
              { href: '/collections', label: 'COLLECTIONS' },
              { href: '/archive', label: 'ARCHIVE' },
              { href: '/about', label: 'ABOUT' },
              { href: '/contact', label: 'CONTACT' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block group py-6 px-8 border border-gray-800 hover:border-white transition-all duration-300"
              >
                <span className="text-2xl font-bold group-hover:translate-x-4 inline-block transition-transform">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-gray-500">© 2024 CINCH LAB</p>
          <p className="text-gray-500">EXTREME FASHION LABORATORY</p>
        </div>
      </footer>
    </main>
  )
}