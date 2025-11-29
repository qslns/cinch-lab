'use client'

import { Component, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-yon-white flex items-center justify-center px-6">
          <motion.div
            className="max-w-lg w-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Error indicator */}
            <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
              System Error
            </span>

            {/* Title */}
            <h1 className="mt-4 font-serif text-4xl md:text-5xl text-yon-black">
              <span className="block transform rotate-[-0.5deg]">An error</span>
              <span className="block transform rotate-[0.3deg] ml-[5%]">occurred</span>
            </h1>

            {/* Description */}
            <p className="mt-8 text-yon-steel text-lg leading-relaxed">
              Something unexpected happened. Please refresh the page or return home.
            </p>

            {/* Error message */}
            {this.state.error?.message && (
              <div className="mt-6 p-4 bg-yon-ivory text-left">
                <p className="font-mono text-xs text-yon-grey mb-2">Details:</p>
                <p className="font-mono text-sm text-yon-steel break-words">
                  {this.state.error.message}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-yon-black text-yon-white font-mono text-sm tracking-wider uppercase hover:bg-yon-charcoal transition-colors duration-300"
              >
                Reload page
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-4 border border-yon-black text-yon-black font-mono text-sm tracking-wider uppercase hover:bg-yon-black hover:text-yon-white transition-colors duration-300"
              >
                Go home
              </button>
            </div>

            {/* Footer */}
            <p className="mt-16 font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
              THE YON — Beyond Fashion
            </p>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
