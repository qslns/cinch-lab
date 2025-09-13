'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      id: 1,
      title: 'Spring Summer 2025',
      subtitle: 'The New Collection',
      cta: 'Discover Now',
      link: '/collections/ss25',
      video: true
    },
    {
      id: 2,
      title: 'Architectural Forms',
      subtitle: 'Editorial',
      cta: 'View Editorial',
      link: '/editorial/architectural-forms'
    },
    {
      id: 3,
      title: 'CINCH Essentials',
      subtitle: 'Timeless Pieces',
      cta: 'Shop Essentials',
      link: '/collections/essentials'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const featuredProducts = [
    { id: 1, name: 'Structured Blazer', price: '$2,450', tag: 'New' },
    { id: 2, name: 'Wide Leg Trouser', price: '$1,280' },
    { id: 3, name: 'Asymmetric Dress', price: '$3,200', tag: 'Bestseller' },
    { id: 4, name: 'Oversized Coat', price: '$4,500' },
  ]

  return (
    <>
      {/* Hero Carousel */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          {heroSlides.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {slide.video ? (
                  <div className="absolute inset-0 bg-gray-900" />
                ) : (
                  <div className="absolute inset-0 bg-gray-100" />
                )}
                
                <div className="relative h-full flex items-center justify-center text-center z-10">
                  <div>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-xs tracking-luxury uppercase mb-4"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h1
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      <Link href={slide.link} className="btn btn-secondary">
                        {slide.cta}
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-12 h-[2px] transition-all ${
                index === currentSlide ? 'bg-black' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-wide py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-light mb-2">New Arrivals</h2>
            <p className="text-sm text-gray-600">Discover the latest pieces from SS25</p>
          </div>
          <Link href="/collections/new-arrivals" className="link-underline text-sm">
            View All
          </Link>
        </div>
        
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`} className="group">
              <div className="relative aspect-product bg-gray-100 mb-4 overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                {product.tag && (
                  <span className="absolute top-4 left-4 bg-white px-2 py-1 text-[10px] tracking-wider uppercase">
                    {product.tag}
                  </span>
                )}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
              <h3 className="text-sm mb-1 group-hover:underline">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Editorial Feature */}
      <section className="bg-gray-50">
        <div className="container-wide py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-luxury uppercase mb-4">Editorial</p>
              <h2 className="text-4xl font-light mb-6">The Art of Minimalism</h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Exploring the intersection of fashion and architecture through our 
                latest collection. Each piece is a study in form, function, and the 
                beauty of restraint.
              </p>
              <Link href="/editorial/art-of-minimalism" className="btn btn-secondary">
                Read More
              </Link>
            </div>
            <div className="aspect-[4/5] bg-gray-200" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-wide py-20">
        <h2 className="text-3xl font-light mb-12 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Ready-to-Wear', 'Bags', 'Shoes', 'Accessories'].map((category) => (
            <Link key={category} href={`/shop/${category.toLowerCase().replace(' ', '-')}`} className="group">
              <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
              <h3 className="text-sm text-center group-hover:underline">{category}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-black text-white">
        <div className="container-wide py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-light mb-6">CINCH LAB</h2>
            <p className="text-sm leading-relaxed mb-8 text-gray-300">
              Founded in 2022, CINCH LAB represents a new vision in luxury fashion. 
              Our collections merge architectural precision with fluid forms, creating 
              pieces that transcend seasons and trends. Each garment is meticulously 
              crafted in limited quantities, ensuring exclusivity and attention to detail.
            </p>
            <Link href="/about" className="btn btn-secondary" style={{ borderColor: 'white', color: 'white' }}>
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-wide py-20">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-light mb-4">Stay Connected</h2>
          <p className="text-sm text-gray-600 mb-8">
            Be the first to know about new collections, exclusive events, and special offers.
          </p>
          <form className="flex gap-0">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-r-0 border-gray-300 text-sm focus:outline-none focus:border-black"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </section>
    </>
  )
}

