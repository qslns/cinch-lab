'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import ImageWithLoading from '@/components/ImageWithLoading'
import CollectionDetail from '@/components/CollectionDetail'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const collectionsData = {
    'ss25': {
      id: 'ss25',
      title: 'SS25',
      subtitle: 'SPRING SUMMER 2025',
      description: 'A exploration of architectural minimalism and fluid forms, drawing inspiration from brutalist structures and organic movement.',
      lookbookImages: [
        '/collections/ss25/hero.jpg',
        '/collections/ss25/look-1.jpg',
        '/collections/ss25/look-2.jpg',
        '/collections/ss25/look-3.jpg',
        '/collections/ss25/look-4.jpg',
      ],
      products: [
        { id: 'ss25-01', name: 'STRUCTURED BLAZER', price: '$2,450', images: ['/products/ss25/blazer-1.jpg', '/products/ss25/blazer-2.jpg'] },
        { id: 'ss25-02', name: 'WIDE LEG TROUSER', price: '$1,280', images: ['/products/ss25/trouser-1.jpg', '/products/ss25/trouser-2.jpg'] },
        { id: 'ss25-03', name: 'ASYMMETRIC DRESS', price: '$3,200', images: ['/products/ss25/dress-1.jpg', '/products/ss25/dress-2.jpg'] },
        { id: 'ss25-04', name: 'OVERSIZED COAT', price: '$4,500', images: ['/products/ss25/coat-1.jpg', '/products/ss25/coat-2.jpg'] },
        { id: 'ss25-05', name: 'MINIMAL SHIRT', price: '$980', images: ['/products/ss25/shirt-1.jpg', '/products/ss25/shirt-2.jpg'] },
        { id: 'ss25-06', name: 'LAYERED SKIRT', price: '$1,650', images: ['/products/ss25/skirt-1.jpg', '/products/ss25/skirt-2.jpg'] },
      ]
    },
    'fw24': {
      id: 'fw24',
      title: 'FW24',
      subtitle: 'FALL WINTER 2024',
      description: 'Embracing the void through monochromatic palettes and deconstructed silhouettes that challenge traditional form.',
      lookbookImages: [
        '/collections/fw24/hero.jpg',
        '/collections/fw24/look-1.jpg',
        '/collections/fw24/look-2.jpg',
        '/collections/fw24/look-3.jpg',
        '/collections/fw24/look-4.jpg',
      ],
      products: [
        { id: 'fw24-01', name: 'DECONSTRUCTED JACKET', price: '$3,200', images: ['/products/fw24/jacket-1.jpg', '/products/fw24/jacket-2.jpg'] },
        { id: 'fw24-02', name: 'LAYERED KNIT', price: '$1,450', images: ['/products/fw24/knit-1.jpg', '/products/fw24/knit-2.jpg'] },
        { id: 'fw24-03', name: 'DRAPED COAT', price: '$5,800', images: ['/products/fw24/coat-1.jpg', '/products/fw24/coat-2.jpg'] },
        { id: 'fw24-04', name: 'WIDE PANTS', price: '$1,680', images: ['/products/fw24/pants-1.jpg', '/products/fw24/pants-2.jpg'] },
        { id: 'fw24-05', name: 'STRUCTURED TOP', price: '$1,200', images: ['/products/fw24/top-1.jpg', '/products/fw24/top-2.jpg'] },
        { id: 'fw24-06', name: 'LONG DRESS', price: '$3,900', images: ['/products/fw24/dress-1.jpg', '/products/fw24/dress-2.jpg'] },
      ]
    },
    'ss24': {
      id: 'ss24',
      title: 'SS24',
      subtitle: 'SPRING SUMMER 2024',
      description: 'Light as absence, form as presence. A meditation on negative space and the beauty of restraint.',
      lookbookImages: [
        '/collections/ss24/hero.jpg',
        '/collections/ss24/look-1.jpg',
        '/collections/ss24/look-2.jpg',
        '/collections/ss24/look-3.jpg',
        '/collections/ss24/look-4.jpg',
      ],
      products: [
        { id: 'ss24-01', name: 'SILK BLAZER', price: '$2,200', images: ['/products/ss24/blazer-1.jpg', '/products/ss24/blazer-2.jpg'] },
        { id: 'ss24-02', name: 'FLOWING PANTS', price: '$1,380', images: ['/products/ss24/pants-1.jpg', '/products/ss24/pants-2.jpg'] },
        { id: 'ss24-03', name: 'MINIMAL DRESS', price: '$2,800', images: ['/products/ss24/dress-1.jpg', '/products/ss24/dress-2.jpg'] },
        { id: 'ss24-04', name: 'LIGHT COAT', price: '$3,600', images: ['/products/ss24/coat-1.jpg', '/products/ss24/coat-2.jpg'] },
        { id: 'ss24-05', name: 'SHEER TOP', price: '$880', images: ['/products/ss24/top-1.jpg', '/products/ss24/top-2.jpg'] },
        { id: 'ss24-06', name: 'PLEATED SKIRT', price: '$1,450', images: ['/products/ss24/skirt-1.jpg', '/products/ss24/skirt-2.jpg'] },
      ]
    },
    'fw23': {
      id: 'fw23',
      title: 'FW23',
      subtitle: 'FALL WINTER 2023',
      description: 'The inaugural collection. Where silence speaks louder than words and emptiness becomes fullness.',
      lookbookImages: [
        '/collections/fw23/hero.jpg',
        '/collections/fw23/look-1.jpg',
        '/collections/fw23/look-2.jpg',
        '/collections/fw23/look-3.jpg',
        '/collections/fw23/look-4.jpg',
      ],
      products: [
        { id: 'fw23-01', name: 'ORIGIN JACKET', price: '$2,900', images: ['/products/fw23/jacket-1.jpg', '/products/fw23/jacket-2.jpg'] },
        { id: 'fw23-02', name: 'FOUNDATION KNIT', price: '$1,250', images: ['/products/fw23/knit-1.jpg', '/products/fw23/knit-2.jpg'] },
        { id: 'fw23-03', name: 'ESSENTIAL COAT', price: '$4,200', images: ['/products/fw23/coat-1.jpg', '/products/fw23/coat-2.jpg'] },
        { id: 'fw23-04', name: 'BASE TROUSER', price: '$1,480', images: ['/products/fw23/trouser-1.jpg', '/products/fw23/trouser-2.jpg'] },
        { id: 'fw23-05', name: 'PURE SHIRT', price: '$980', images: ['/products/fw23/shirt-1.jpg', '/products/fw23/shirt-2.jpg'] },
        { id: 'fw23-06', name: 'FORM DRESS', price: '$3,400', images: ['/products/fw23/dress-1.jpg', '/products/fw23/dress-2.jpg'] },
      ]
    }
  }

  const collections = [
    { id: 'ss25', title: 'SS25', subtitle: 'SPRING SUMMER', image: '/collections/ss25/cover.jpg' },
    { id: 'fw24', title: 'FW24', subtitle: 'FALL WINTER', image: '/collections/fw24/cover.jpg' },
    { id: 'ss24', title: 'SS24', subtitle: 'SPRING SUMMER', image: '/collections/ss24/cover.jpg' },
    { id: 'fw23', title: 'FW23', subtitle: 'FALL WINTER', image: '/collections/fw23/cover.jpg' },
  ]

  const handleCollectionClick = (collectionId: string) => {
    setSelectedCollection(collectionId)
  }

  const handleBackToCollections = () => {
    setSelectedCollection(null)
  }

  if (selectedCollection && collectionsData[selectedCollection as keyof typeof collectionsData]) {
    return (
      <CollectionDetail
        collection={collectionsData[selectedCollection as keyof typeof collectionsData]}
        onBack={handleBackToCollections}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex justify-between items-center px-6 md:px-12 py-4 md:py-6">
          <h1 className="text-xl md:text-2xl font-light tracking-wider">CINCH LAB</h1>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-12">
            <button 
              onClick={() => setActiveSection('home')}
              className="text-sm tracking-wider hover:opacity-60 transition-opacity"
            >
              HOME
            </button>
            <button 
              onClick={() => setActiveSection('collections')}
              className="text-sm tracking-wider hover:opacity-60 transition-opacity"
            >
              COLLECTIONS
            </button>
            <button 
              onClick={() => setActiveSection('about')}
              className="text-sm tracking-wider hover:opacity-60 transition-opacity"
            >
              ABOUT
            </button>
            <button 
              onClick={() => setActiveSection('contact')}
              className="text-sm tracking-wider hover:opacity-60 transition-opacity"
            >
              CONTACT
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span 
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 6 : 0 }}
              className="w-6 h-0.5 bg-black transition-all"
            />
            <motion.span 
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              className="w-6 h-0.5 bg-black transition-all"
            />
            <motion.span 
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -6 : 0 }}
              className="w-6 h-0.5 bg-black transition-all"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="flex flex-col py-4">
                <button 
                  onClick={() => {
                    setActiveSection('home')
                    setMobileMenuOpen(false)
                  }}
                  className="px-6 py-3 text-left text-sm tracking-wider hover:bg-gray-50"
                >
                  HOME
                </button>
                <button 
                  onClick={() => {
                    setActiveSection('collections')
                    setMobileMenuOpen(false)
                  }}
                  className="px-6 py-3 text-left text-sm tracking-wider hover:bg-gray-50"
                >
                  COLLECTIONS
                </button>
                <button 
                  onClick={() => {
                    setActiveSection('about')
                    setMobileMenuOpen(false)
                  }}
                  className="px-6 py-3 text-left text-sm tracking-wider hover:bg-gray-50"
                >
                  ABOUT
                </button>
                <button 
                  onClick={() => {
                    setActiveSection('contact')
                    setMobileMenuOpen(false)
                  }}
                  className="px-6 py-3 text-left text-sm tracking-wider hover:bg-gray-50"
                >
                  CONTACT
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        {activeSection === 'home' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center px-8"
          >
            <div className="text-center max-w-4xl mx-auto">
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-6xl md:text-8xl font-thin mb-8"
              >
                CINCH LAB
              </motion.h2>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-600 mb-12"
              >
                Experimental Fashion House
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <button 
                  onClick={() => setActiveSection('collections')}
                  className="px-8 py-3 border border-black text-sm tracking-wider hover:bg-black hover:text-white transition-all duration-300"
                >
                  VIEW COLLECTIONS
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* Collections Section */}
        {activeSection === 'collections' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen px-8 md:px-12 py-20"
          >
            <h2 className="text-4xl md:text-6xl font-thin mb-16">Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {collections.map((collection) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group cursor-pointer"
                  onClick={() => handleCollectionClick(collection.id)}
                >
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                    <ImageWithLoading
                      src={collection.image}
                      alt={`${collection.title} Collection`}
                      fill
                      objectFit="cover"
                      className="group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-2xl font-light mb-1 group-hover:opacity-70 transition-opacity">{collection.title}</h3>
                  <p className="text-sm text-gray-600">{collection.subtitle}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* About Section */}
        {activeSection === 'about' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen px-8 md:px-12 py-20 flex items-center"
          >
            <div className="max-w-4xl">
              <h2 className="text-4xl md:text-6xl font-thin mb-12">About</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  CINCH LAB is an experimental fashion house founded in 2022, 
                  dedicated to pushing the boundaries of contemporary design 
                  through innovative construction and minimalist aesthetics.
                </p>
                <p>
                  Our collections explore the intersection of art and wearability, 
                  creating pieces that challenge conventional notions of fashion 
                  while maintaining a commitment to quality and craftsmanship.
                </p>
                <p>
                  Each garment is thoughtfully designed and produced in limited 
                  quantities, ensuring exclusivity and attention to detail that 
                  defines modern luxury.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen px-8 md:px-12 py-20 flex items-center"
          >
            <div className="max-w-4xl w-full">
              <h2 className="text-4xl md:text-6xl font-thin mb-12">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-sm tracking-wider text-gray-600 mb-4">GENERAL INQUIRIES</h3>
                  <p className="text-xl mb-8">hello@cinchlab.com</p>
                  
                  <h3 className="text-sm tracking-wider text-gray-600 mb-4">PRESS</h3>
                  <p className="text-xl mb-8">press@cinchlab.com</p>
                </div>
                <div>
                  <h3 className="text-sm tracking-wider text-gray-600 mb-4">SHOWROOM</h3>
                  <p className="text-lg mb-2">Los Angeles, California</p>
                  <p className="text-sm text-gray-600">By appointment only</p>
                  
                  <h3 className="text-sm tracking-wider text-gray-600 mb-4 mt-8">SOCIAL</h3>
                  <div className="space-y-2">
                    <p className="text-sm">Instagram: @cinchlab</p>
                    <p className="text-sm">Twitter: @cinchlab</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  )
}