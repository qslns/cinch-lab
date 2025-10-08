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
        <div className="min-h-screen bg-margiela-raw-canvas flex items-center justify-center p-8">
          <motion.div
            className="max-w-2xl w-full bg-white border-2 border-cdg-blood-red transform -rotate-1 exposed-seam"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-12">
              <div className="margiela-number-tag absolute top-4 left-4 text-cdg-blood-red">
                ERROR_001
              </div>

              <div className="mb-8">
                <h1 className="text-display-2 font-black text-cdg-blood-red mb-4">
                  SYSTEM
                  <br />
                  FAILURE
                </h1>
                <p className="text-margiela-steel text-lg">
                  An unexpected error occurred in the laboratory.
                </p>
              </div>

              <div className="bg-margiela-paper p-6 mb-8 font-mono text-sm text-margiela-carbon">
                <div className="text-xs text-margiela-aluminum mb-2">ERROR_TRACE:</div>
                <div className="break-words">
                  {this.state.error?.message || 'Unknown error'}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 px-6 py-3 bg-margiela-carbon text-white border-2 border-margiela-carbon
                    hover:bg-white hover:text-margiela-carbon transition-colors duration-300
                    uppercase tracking-widest text-sm font-semibold"
                >
                  Reload
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 px-6 py-3 bg-white text-margiela-carbon border-2 border-margiela-carbon
                    hover:bg-margiela-carbon hover:text-white transition-colors duration-300
                    uppercase tracking-widest text-sm font-semibold"
                >
                  Return Home
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-margiela-exposed-seam">
                <p className="text-xs text-margiela-aluminum uppercase tracking-wider">
                  CINCH LAB • EXPERIMENTAL FAILURE PROTOCOL
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )
    }

    return this.props.children
  }
}
