'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl mb-4 tracking-wider">CONTACT</h1>
          <p className="text-sm tracking-[0.2em] opacity-70">
            GET IN TOUCH
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            {/* Email */}
            <div className="fade-in">
              <h2 className="text-xs tracking-[0.2em] opacity-50 mb-6">EMAIL</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-xs opacity-50 mb-2">General Inquiries</p>
                  <button
                    onClick={() => handleCopy('hello@cinchlab.com')}
                    className="text-xl hover:translate-x-2 transition-transform duration-300 relative"
                  >
                    hello@cinchlab.com
                    {copied && (
                      <span className="absolute -top-6 left-0 text-xs opacity-70">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>
                <div>
                  <p className="text-xs opacity-50 mb-2">Press & Media</p>
                  <button
                    onClick={() => handleCopy('press@cinchlab.com')}
                    className="text-xl hover:translate-x-2 transition-transform duration-300"
                  >
                    press@cinchlab.com
                  </button>
                </div>
                <div>
                  <p className="text-xs opacity-50 mb-2">Collaborations</p>
                  <button
                    onClick={() => handleCopy('collab@cinchlab.com')}
                    className="text-xl hover:translate-x-2 transition-transform duration-300"
                  >
                    collab@cinchlab.com
                  </button>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="fade-in" style={{ animationDelay: '100ms' }}>
              <h2 className="text-xs tracking-[0.2em] opacity-50 mb-6">LOCATION</h2>
              <div className="space-y-2">
                <p className="text-lg">Los Angeles, California</p>
                <p className="text-sm opacity-70">Showroom by appointment only</p>
                <p className="text-sm opacity-50">Monday - Friday, 10:00 - 18:00 PST</p>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="fade-in" style={{ animationDelay: '200ms' }}>
            <div className="aspect-square border border-white/20 relative overflow-hidden grid-background">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl md:text-8xl mb-4 opacity-10">@</p>
                  <p className="text-xs tracking-[0.3em] opacity-30">
                    DIGITAL PRESENCE
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h2 className="text-xs tracking-[0.2em] opacity-50 mb-4">SOCIAL</h2>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="text-sm hover:translate-x-1 transition-transform duration-300"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-sm hover:translate-x-1 transition-transform duration-300"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-sm hover:translate-x-1 transition-transform duration-300"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-32 text-center">
          <p className="text-lg font-thin opacity-70">
            "Connection through simplicity"
          </p>
        </div>
      </div>
    </main>
  )
}