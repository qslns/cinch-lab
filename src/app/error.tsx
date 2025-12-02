'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  // Error is already logged by Next.js error boundary
  // Keep error in dependency for potential future error tracking service
  useEffect(() => {
    // Optional: Send to error tracking service (Sentry, etc.)
    // errorTrackingService.captureException(error)
  }, [error])

  return (
    <div className="min-h-screen bg-yon-white flex items-center justify-center px-6">
      <motion.div
        className="max-w-lg w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        {/* Error indicator */}
        <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
          Error
        </span>

        {/* Title */}
        <h1 className="mt-4 font-serif text-5xl md:text-6xl text-yon-black">
          <span className="block transform rotate-[-0.5deg]">Something</span>
          <span className="block transform rotate-[0.3deg] ml-[5%]">went wrong</span>
        </h1>

        {/* Description */}
        <p className="mt-8 text-yon-steel text-lg leading-relaxed">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>

        {/* Error details (dev mode) */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-6 p-4 bg-yon-ivory text-left">
            <p className="font-mono text-xs text-yon-grey mb-2">Error details:</p>
            <p className="font-mono text-sm text-yon-steel break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-yon-black text-yon-white font-mono text-sm tracking-wider uppercase hover:bg-yon-charcoal transition-colors duration-300 focus-ring"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-8 py-4 border border-yon-black text-yon-black font-mono text-sm tracking-wider uppercase hover:bg-yon-black hover:text-yon-white transition-colors duration-300 focus-ring"
          >
            Go home
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-16 font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
          THE YON — Beyond Fashion
        </p>
      </motion.div>
    </div>
  )
}
