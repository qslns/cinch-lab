'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-yon-white flex items-center justify-center relative overflow-hidden px-6">
      {/* Decorative background element */}
      <span
        className="absolute top-[-10%] right-[-5%] font-serif text-[40vw] text-yon-platinum/20 leading-none select-none pointer-events-none"
        aria-hidden="true"
      >
        4
      </span>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Label */}
        <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
          Error 404
        </span>

        {/* Title - THE YON asymmetric style */}
        <h1 className="mt-6 font-serif text-6xl md:text-7xl lg:text-8xl text-yon-black leading-[0.9]">
          <span className="block transform rotate-[-0.5deg]">Page</span>
          <span className="block transform rotate-[0.3deg] ml-[8%]">Not Found</span>
        </h1>

        {/* Divider */}
        <div className="w-12 h-px bg-yon-platinum mx-auto my-8" />

        {/* Description */}
        <p className="text-yon-steel text-lg leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-yon-black text-yon-white font-mono text-xs tracking-[0.15em] uppercase hover:bg-yon-charcoal transition-colors duration-300"
          >
            Go Home
          </Link>
          <Link
            href="/collections"
            className="inline-flex items-center justify-center px-8 py-4 border border-yon-black text-yon-black font-mono text-xs tracking-[0.15em] uppercase hover:bg-yon-black hover:text-yon-white transition-colors duration-300"
          >
            View Collections
          </Link>
        </div>

        {/* Navigation suggestions */}
        <div className="mt-16 pt-8 border-t border-yon-platinum">
          <p className="font-mono text-xs text-yon-grey tracking-wider uppercase mb-6">
            Or explore
          </p>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {[
              { label: 'Archive', href: '/archive' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-sm text-yon-steel hover:text-yon-black transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <p className="mt-16 font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
          THE YON — Beyond Fashion
        </p>
      </motion.div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 hidden md:block" aria-hidden="true">
        <div className="w-8 h-px bg-yon-platinum" />
        <div className="w-px h-8 bg-yon-platinum" />
      </div>
      <div className="absolute bottom-8 right-8 hidden md:block" aria-hidden="true">
        <div className="w-8 h-px bg-yon-platinum ml-auto" />
        <div className="w-px h-8 bg-yon-platinum ml-auto -mt-8" />
      </div>
    </div>
  )
}
