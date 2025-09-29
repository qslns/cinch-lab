'use client'

import { useState, useEffect } from 'react'
import { imageDB, ImageMetadata } from '@/lib/imageDatabase'

const generateMockImages = (): ImageMetadata[] => {
  const categories = ['abstract', 'architectural', 'organic', 'surreal', 'tech-digital']
  const moods = ['dark', 'vibrant', 'mysterious', 'energetic', 'calm']

  return Array.from({ length: 50 }, (_, i) => ({
    id: `img-${i}`,
    filename: `image-${i}.png`,
    path: `/웹 꾸미기 사진/image-${i}.png`,
    hash: Math.random().toString(36),
    fileSize: Math.floor(Math.random() * 5000000),
    dimensions: {
      width: 1920,
      height: 1080
    },
    aspectRatio: 1.77,
    format: 'png',
    dominantColor: {
      r: Math.floor(Math.random() * 255),
      g: Math.floor(Math.random() * 255),
      b: Math.floor(Math.random() * 255)
    },
    brightness: Math.random() * 255,
    contrast: Math.random() * 2,
    saturation: Math.random() * 2,
    category: categories[Math.floor(Math.random() * categories.length)],
    tags: ['experimental', 'cinch', 'lab'].slice(0, Math.floor(Math.random() * 3) + 1),
    semantic: {
      themes: ['abstract', 'geometric'].slice(0, Math.floor(Math.random() * 2) + 1),
      mood: moods[Math.floor(Math.random() * moods.length)],
      style: 'experimental'
    },
    visualFeatures: {
      hasText: false,
      hasFaces: false,
      isMonochrome: false,
      complexity: 'moderate',
      composition: 'rule-of-thirds'
    },
    relatedImages: [],
    score: Math.random() * 100,
    views: Math.floor(Math.random() * 1000),
    likes: Math.floor(Math.random() * 100),
    createdAt: new Date(),
    processedAt: new Date()
  }))
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageMetadata[]>([])
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const mockImages = generateMockImages()
    setImages(mockImages)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--margiela-carbon)' }}>
        <div style={{ color: 'var(--white-label)' }} className="text-center">
          <h2 className="text-heading-3 font-bold mb-4">INITIALIZING GALLERY</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--margiela-concrete)' }}>
      {/* Header */}
      <header className="py-16 px-8 border-b-3" style={{ backgroundColor: 'var(--white-label)', borderColor: 'var(--margiela-carbon)' }}>
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-display-1 font-black tracking-tightest mb-4" style={{ color: 'var(--margiela-carbon)', rotate: '-1deg' }}>
            GALLERY
          </h1>
          <p className="text-heading-6 tracking-widest" style={{ color: 'var(--margiela-ink)' }}>
            EXPERIMENTAL VISUAL ARCHIVE
          </p>
        </div>
      </header>

      {/* Masonry Grid */}
      <main className="p-8">
        <div className="max-w-screen-2xl mx-auto masonry-grid">
          {images.map((image, index) => {
            const rotation = ['-2deg', '-1deg', '0deg', '1deg', '2deg'][index % 5]
            const size = index % 3 === 0 ? 'large' : index % 2 === 0 ? 'medium' : 'small'

            return (
              <div
                key={image.id}
                className="masonry-item cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  rotate: rotation,
                  gridRowEnd: size === 'large' ? 'span 2' : size === 'medium' ? 'span 1' : 'span 1'
                }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative overflow-hidden"
                     style={{
                       backgroundColor: `rgb(${image.dominantColor.r}, ${image.dominantColor.g}, ${image.dominantColor.b})`,
                       aspectRatio: size === 'large' ? '3/4' : size === 'medium' ? '4/3' : '1/1'
                     }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-display-3 font-black opacity-10" style={{ color: 'var(--white-label)' }}>
                      {image.id.split('-')[1]}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4"
                       style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                    <p className="text-label" style={{ color: 'var(--white-label)' }}>{image.category}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-8"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl w-full p-8"
            style={{ backgroundColor: 'var(--margiela-concrete)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-heading-3 font-bold">{selectedImage.filename}</h2>
                <p className="text-body" style={{ color: 'var(--margiela-ink)' }}>{selectedImage.category}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-heading-3 hover:opacity-60 transition-opacity"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div
                className="aspect-video flex items-center justify-center"
                style={{
                  backgroundColor: `rgb(${selectedImage.dominantColor.r}, ${selectedImage.dominantColor.g}, ${selectedImage.dominantColor.b})`
                }}
              >
                <span className="text-display-2 font-black opacity-20" style={{ color: 'var(--white-label)' }}>
                  {selectedImage.id.split('-')[1]}
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-heading-6 font-bold mb-2">PROPERTIES</h3>
                  <div className="space-y-1 text-body">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--margiela-ink)' }}>Dimensions:</span>
                      <span>{selectedImage.dimensions.width}×{selectedImage.dimensions.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--margiela-ink)' }}>Views:</span>
                      <span>{selectedImage.views}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--margiela-ink)' }}>Likes:</span>
                      <span>{selectedImage.likes}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-heading-6 font-bold mb-2">SEMANTIC</h3>
                  <div className="space-y-1 text-body">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--margiela-ink)' }}>Mood:</span>
                      <span>{selectedImage.semantic.mood}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--margiela-ink)' }}>Style:</span>
                      <span>{selectedImage.semantic.style}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .masonry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-auto-rows: 300px;
          gap: 2rem;
        }

        .masonry-item {
          transition: transform 0.3s ease;
        }

        .masonry-item:hover {
          z-index: 10;
        }
      `}</style>
    </div>
  )
}