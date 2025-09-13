'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function LuxuryNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const collections = [
    { id: 'new-arrivals', name: 'New Arrivals', tag: 'NEW' },
    { id: 'ss25', name: 'Spring Summer 2025' },
    { id: 'fw24', name: 'Fall Winter 2024' },
    { id: 'essentials', name: 'Essentials' },
  ]

  const categories = [
    { name: 'Ready-to-Wear', count: 156 },
    { name: 'Bags', count: 42 },
    { name: 'Shoes', count: 38 },
    { name: 'Accessories', count: 67 },
  ]

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white">
        <div className="container-wide flex justify-between items-center py-2 text-xs">
          <div className="flex gap-6">
            <button className="hover:opacity-70">USD $</button>
            <button className="hover:opacity-70">English</button>
          </div>
          <p className="hidden md:block">Complimentary shipping on all orders</p>
          <div className="flex gap-6">
            <Link href="/stores" className="hover:opacity-70">Store Locator</Link>
            <Link href="/customer-care" className="hover:opacity-70">Customer Care</Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}>
        <div className="container-wide">
          {/* Primary Nav */}
          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            {/* Logo */}
            <Link href="/" className="text-lg tracking-widest font-light">
              CINCH LAB
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex gap-8">
                {/* Collections Dropdown */}
                <div 
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen('collections')}
                  onMouseLeave={() => setMegaMenuOpen(null)}
                >
                  <button className="text-xs tracking-wider uppercase py-2">
                    Collections
                  </button>
                </div>

                {/* Shop Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setMegaMenuOpen('shop')}
                  onMouseLeave={() => setMegaMenuOpen(null)}
                >
                  <button className="text-xs tracking-wider uppercase py-2">
                    Shop
                  </button>
                </div>

                <Link href="/editorial" className="text-xs tracking-wider uppercase py-2">
                  Editorial
                </Link>

                <Link href="/world-of-cinch" className="text-xs tracking-wider uppercase py-2">
                  World of Cinch
                </Link>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2"
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </button>

              {/* Account */}
              <Link href="/account" className="p-2" aria-label="Account">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="p-2" aria-label="Wishlist">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="p-2 relative" aria-label="Cart">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 2 5 9v13h14V9l-4-7H9Z"/>
                  <path d="M9 2v7h6V2"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[9px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2"
                aria-label="Menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`block h-[1px] bg-black transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                  <span className={`block h-[1px] bg-black transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-[1px] bg-black transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mega Menu - Collections */}
          <AnimatePresence>
            {megaMenuOpen === 'collections' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg"
                onMouseEnter={() => setMegaMenuOpen('collections')}
                onMouseLeave={() => setMegaMenuOpen(null)}
              >
                <div className="container-wide py-8">
                  <div className="grid grid-cols-4 gap-8">
                    <div>
                      <h3 className="text-xs tracking-wider uppercase mb-4 text-gray-500">Collections</h3>
                      <ul className="space-y-3">
                        {collections.map((collection) => (
                          <li key={collection.id}>
                            <Link 
                              href={`/collections/${collection.id}`}
                              className="text-sm hover:underline flex items-center gap-2"
                            >
                              {collection.name}
                              {collection.tag && (
                                <span className="text-[9px] bg-black text-white px-1.5 py-0.5 tracking-wider">
                                  {collection.tag}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs tracking-wider uppercase mb-4 text-gray-500">Featured</h3>
                      <Link href="/collections/ss25/campaign" className="block group">
                        <div className="aspect-[3/4] bg-gray-100 mb-3" />
                        <p className="text-sm group-hover:underline">SS25 Campaign</p>
                        <p className="text-xs text-gray-500">Discover the collection</p>
                      </Link>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-xs tracking-wider uppercase mb-4 text-gray-500">Latest Arrivals</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                          <Link key={i} href={`/product/${i}`} className="group">
                            <div className="aspect-[2/3] bg-gray-100 mb-2" />
                            <p className="text-xs">Product Name</p>
                            <p className="text-xs text-gray-500">$1,250</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mega Menu - Shop */}
          <AnimatePresence>
            {megaMenuOpen === 'shop' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg"
                onMouseEnter={() => setMegaMenuOpen('shop')}
                onMouseLeave={() => setMegaMenuOpen(null)}
              >
                <div className="container-wide py-8">
                  <div className="grid grid-cols-5 gap-8">
                    {categories.map((category) => (
                      <div key={category.name}>
                        <Link 
                          href={`/shop/${category.name.toLowerCase().replace(' ', '-')}`}
                          className="block mb-2 font-medium hover:underline"
                        >
                          {category.name}
                        </Link>
                        <p className="text-xs text-gray-500">{category.count} items</p>
                      </div>
                    ))}
                    <div>
                      <Link href="/shop/sale" className="block mb-2 font-medium text-red-600 hover:underline">
                        Sale
                      </Link>
                      <p className="text-xs text-gray-500">Up to 50% off</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-modal"
          >
            <div className="container-wide py-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg">Search</h2>
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="p-2"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div className="max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for products, collections..."
                  className="w-full py-4 border-b border-gray-200 text-2xl font-light focus:outline-none focus:border-black"
                  autoFocus
                />
                <div className="mt-8">
                  <h3 className="text-xs tracking-wider uppercase text-gray-500 mb-4">Popular Searches</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Coats', 'Dresses', 'New Arrivals', 'Sale', 'Bags'].map((term) => (
                      <button 
                        key={term}
                        className="px-4 py-2 border border-gray-200 text-sm hover:border-black transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full md:w-96 bg-white z-modal overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-lg">Menu</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <nav className="space-y-6">
                <Link href="/collections" className="block text-lg">Collections</Link>
                <Link href="/shop" className="block text-lg">Shop</Link>
                <Link href="/editorial" className="block text-lg">Editorial</Link>
                <Link href="/world-of-cinch" className="block text-lg">World of Cinch</Link>
                <hr className="border-gray-200" />
                <Link href="/account" className="block text-sm">My Account</Link>
                <Link href="/wishlist" className="block text-sm">Wishlist</Link>
                <Link href="/stores" className="block text-sm">Store Locator</Link>
                <Link href="/customer-care" className="block text-sm">Customer Care</Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}