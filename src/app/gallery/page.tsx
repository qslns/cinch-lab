'use client'

import { useState, useEffect, useCallback, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { imageDB, ImageMetadata } from '@/lib/imageDatabase'
import CipherText from '@/components/CipherText'

// Dynamic imports for heavy components
const Gallery3D = dynamic(() => import('@/components/Gallery3D'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black flex items-center justify-center">
    <div className="text-white text-2xl">Loading 3D Gallery...</div>
  </div>
})

// Mock data generator (in production, this would come from the analyzed images)
const generateMockImages = (): ImageMetadata[] => {
  const categories = ['abstract', 'architectural', 'organic', 'surreal', 'tech-digital']
  const moods = ['dark', 'vibrant', 'mysterious', 'energetic', 'calm']
  const styles = ['minimalist', 'complex', 'geometric', 'fluid', 'chaotic']

  return Array.from({ length: 475 }, (_, i) => ({
    id: `img-${i}`,
    filename: `image-${i}.png`,
    path: `/웹 꾸미기 사진/image-${i}.png`,
    hash: Math.random().toString(36),
    fileSize: Math.floor(Math.random() * 5000000),
    dimensions: {
      width: 1920 + Math.floor(Math.random() * 1000),
      height: 1080 + Math.floor(Math.random() * 1000)
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
    tags: ['experimental', 'cinch', 'lab', 'fashion', 'art'].slice(0, Math.floor(Math.random() * 5) + 1),
    semantic: {
      themes: ['abstract', 'geometric', 'organic'].slice(0, Math.floor(Math.random() * 3) + 1),
      mood: moods[Math.floor(Math.random() * moods.length)],
      style: styles[Math.floor(Math.random() * styles.length)]
    },
    visualFeatures: {
      hasText: Math.random() > 0.7,
      hasFaces: Math.random() > 0.8,
      isMonochrome: Math.random() > 0.9,
      complexity: ['simple', 'moderate', 'complex'][Math.floor(Math.random() * 3)] as any,
      composition: 'rule-of-thirds'
    },
    relatedImages: [],
    score: Math.random() * 100,
    views: Math.floor(Math.random() * 10000),
    likes: Math.floor(Math.random() * 1000),
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    processedAt: new Date()
  }))
}

export default function GalleryPage() {
  const [images, setImages] = useState<ImageMetadata[]>([])
  const [filteredImages, setFilteredImages] = useState<ImageMetadata[]>([])
  const [viewMode, setViewMode] = useState<'grid' | '3d' | 'masonry' | 'timeline' | 'map'>('grid')
  const [layout3D, setLayout3D] = useState<'helix' | 'grid' | 'sphere' | 'spiral' | 'wave'>('helix')
  const [selectedImage, setSelectedImage] = useState<ImageMetadata | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes' | 'random'>('date')
  const [isProcessing, setIsProcessing] = useState(false)
  const [processedImage, setProcessedImage] = useState<ImageData | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [recommendations, setRecommendations] = useState<ImageMetadata[]>([])
  const [similarImages, setSimilarImages] = useState<ImageMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [viewedImages, setViewedImages] = useState<string[]>([])
  const [likedImages, setLikedImages] = useState<string[]>([])

  // Initialize gallery
  useEffect(() => {
    const initGallery = async () => {
      setLoading(true)

      // Generate mock images (in production, load from database)
      const mockImages = generateMockImages()

      // Add to database
      mockImages.forEach(img => imageDB.addImage(img))

      setImages(mockImages)
      setFilteredImages(mockImages.slice(0, 50)) // Start with first 50

      // Get statistics
      const statistics = imageDB.getStatistics()
      setStats(statistics)

      // Get initial recommendations
      const recs = imageDB.getTrending(10)
      setRecommendations(recs)

      setLoading(false)
    }

    initGallery()
  }, [])

  // Search and filter
  useEffect(() => {
    const filtered = imageDB.search({
      text: searchQuery,
      category: selectedCategory || undefined,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      sortBy: sortBy as any,
      limit: 100
    })

    setFilteredImages(filtered)
  }, [searchQuery, selectedCategory, selectedTags, sortBy])

  // Track viewed images
  const handleImageView = useCallback((image: ImageMetadata) => {
    setSelectedImage(image)
    setViewedImages(prev => [...new Set([...prev, image.id])])

    // Find similar images
    const similar = imageDB.findSimilar(image.id, 8)
    setSimilarImages(similar)

    // Update recommendations based on viewing history
    const newRecs = imageDB.getRecommendations(
      [...viewedImages, image.id],
      likedImages,
      12
    )
    setRecommendations(newRecs)
  }, [viewedImages, likedImages])

  // Handle image like
  const handleImageLike = useCallback((imageId: string) => {
    setLikedImages(prev => {
      const newLikes = prev.includes(imageId)
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]

      // Update recommendations
      const newRecs = imageDB.getRecommendations(viewedImages, newLikes, 12)
      setRecommendations(newRecs)

      return newLikes
    })
  }, [viewedImages])

  // Process image with effects
  const processImage = async (image: ImageMetadata) => {
    if (!canvasRef.current) return

    setIsProcessing(true)

    try {
      // Load image
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = image.path

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      // Apply random effects for demo
      const { imageProcessor } = await import('@/lib/imageProcessor')
      const processed = await imageProcessor.processImage(img, {
        filters: {
          brightness: 1.2,
          contrast: 1.1,
          saturation: 1.3
        },
        effects: {
          glitch: Math.random() > 0.5,
          noise: 0.1,
          vignette: 0.3
        },
        advanced: {
          crystallize: 10
        }
      })

      setProcessedImage(processed)

      // Display on canvas
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        canvasRef.current.width = processed.width
        canvasRef.current.height = processed.height
        ctx.putImageData(processed, 0, 0)
      }
    } catch (error) {
      console.error('Error processing image:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Create collection from current filter
  const createCollection = () => {
    const collection = imageDB.createAutoCollection(
      `Collection ${Date.now()}`,
      {
        text: searchQuery,
        category: selectedCategory,
        tags: selectedTags
      }
    )
    console.log('Created collection:', collection)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-4">INITIALIZING GALLERY</h2>
          <p className="text-gray-400">Analyzing 475 images...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Controls */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              {(['grid', '3d', 'masonry', 'timeline', 'map'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded ${
                    viewMode === mode
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded"
            >
              <option value="date">Date</option>
              <option value="views">Views</option>
              <option value="likes">Likes</option>
              <option value="random">Random</option>
            </select>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1 rounded text-sm ${
                !selectedCategory ? 'bg-blue-600' : 'bg-gray-800'
              }`}
            >
              All
            </button>
            {stats?.categories && Object.keys(stats.categories).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded text-sm ${
                  selectedCategory === cat ? 'bg-blue-600' : 'bg-gray-800'
                }`}
              >
                {cat} ({stats.categories[cat]})
              </button>
            ))}
          </div>

          {/* Tags */}
          {stats?.topTags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {stats.topTags.slice(0, 10).map((tag: any) => (
                <button
                  key={tag.tag}
                  onClick={() => {
                    setSelectedTags(prev =>
                      prev.includes(tag.tag)
                        ? prev.filter(t => t !== tag.tag)
                        : [...prev, tag.tag]
                    )
                  }}
                  className={`px-2 py-1 rounded text-xs ${
                    selectedTags.includes(tag.tag)
                      ? 'bg-green-600'
                      : 'bg-gray-700'
                  }`}
                >
                  #{tag.tag} ({tag.count})
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto p-4">
        {/* Statistics Bar */}
        {stats && (
          <div className="mb-8 p-4 bg-gray-900 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-400">{stats.totalImages}</div>
                <div className="text-sm text-gray-400">Total Images</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{stats.totalCollections}</div>
                <div className="text-sm text-gray-400">Collections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {Math.round(stats.averageBrightness)}
                </div>
                <div className="text-sm text-gray-400">Avg Brightness</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {(stats.averageFileSize / 1024 / 1024).toFixed(1)}MB
                </div>
                <div className="text-sm text-gray-400">Avg Size</div>
              </div>
            </div>
          </div>
        )}

        {/* Gallery View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => handleImageView(image)}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg,
                      rgb(${image.dominantColor.r}, ${image.dominantColor.g}, ${image.dominantColor.b}),
                      rgba(0,0,0,0.5))`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold opacity-20">
                    {image.id.split('-')[1]}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-xs truncate">{image.category}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs opacity-50">{image.views} views</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleImageLike(image.id)
                      }}
                      className={`text-xs ${
                        likedImages.includes(image.id) ? 'text-red-500' : 'text-gray-400'
                      }`}
                    >
                      ♥ {image.likes}
                    </button>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        )}

        {viewMode === '3d' && (
          <div className="h-[80vh]">
            <div className="mb-4 flex gap-2">
              {(['helix', 'grid', 'sphere', 'spiral', 'wave'] as const).map(layout => (
                <button
                  key={layout}
                  onClick={() => setLayout3D(layout)}
                  className={`px-3 py-1 rounded text-sm ${
                    layout3D === layout ? 'bg-blue-600' : 'bg-gray-800'
                  }`}
                >
                  {layout.toUpperCase()}
                </button>
              ))}
            </div>
            <Suspense fallback={<div>Loading 3D View...</div>}>
              <Gallery3D
                images={filteredImages}
                layout={layout3D}
                interactive={true}
                autoRotate={true}
                effects={true}
              />
            </Suspense>
          </div>
        )}

        {viewMode === 'masonry' && (
          <div className="columns-2 md:columns-4 lg:columns-6 gap-4">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="break-inside-avoid mb-4 relative rounded-lg overflow-hidden cursor-pointer group"
                style={{ height: `${150 + (index % 3) * 100}px` }}
                onClick={() => handleImageView(image)}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${index * 30}deg,
                      rgb(${image.dominantColor.r}, ${image.dominantColor.g}, ${image.dominantColor.b}),
                      rgba(0,0,0,0.7))`
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                  <p className="text-sm font-bold">{image.semantic.mood}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'timeline' && (
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-700" />
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className={`flex items-center mb-8 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="w-1/2" />
                <div className="relative z-10 w-4 h-4 bg-blue-500 rounded-full border-2 border-black" />
                <div className="w-1/2 px-8">
                  <div
                    className="p-4 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800"
                    onClick={() => handleImageView(image)}
                  >
                    <p className="text-sm text-gray-400">
                      {image.createdAt.toLocaleDateString()}
                    </p>
                    <h3 className="font-bold">{image.category}</h3>
                    <p className="text-sm text-gray-500">{image.semantic.style}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'map' && (
          <div className="relative h-[80vh] bg-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0">
              {filteredImages.map((image, index) => {
                const x = (index % 10) * 10
                const y = Math.floor(index / 10) * 10
                return (
                  <div
                    key={image.id}
                    className="absolute w-20 h-20 cursor-pointer group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: `translate(-50%, -50%) rotate(${index * 5}deg)`
                    }}
                    onClick={() => handleImageView(image)}
                  >
                    <div
                      className="w-full h-full rounded-lg"
                      style={{
                        background: `radial-gradient(circle,
                          rgb(${image.dominantColor.r}, ${image.dominantColor.g}, ${image.dominantColor.b}),
                          transparent)`
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-xs bg-black/80 px-2 py-1 rounded">
                        {image.category}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recommendations.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => handleImageView(image)}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold opacity-30"><CipherText text="REC" /></span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60">
                    <p className="text-xs">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Images */}
        {selectedImage && similarImages.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Similar to {selectedImage.category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
              {similarImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square bg-gray-800 rounded overflow-hidden cursor-pointer"
                  onClick={() => handleImageView(image)}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg,
                        rgb(${image.dominantColor.r}, ${image.dominantColor.g}, ${image.dominantColor.b}),
                        transparent)`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedImage.filename}</h2>
                  <p className="text-gray-400">{selectedImage.category}</p>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Preview */}
                <div>
                  <div
                    className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg,
                        rgb(${selectedImage.dominantColor.r}, ${selectedImage.dominantColor.g}, ${selectedImage.dominantColor.b}),
                        rgba(0,0,0,0.5))`
                    }}
                  >
                    <span className="text-6xl font-bold opacity-20">
                      {selectedImage.id.split('-')[1]}
                    </span>
                  </div>

                  {/* Process Image Button */}
                  <button
                    onClick={() => processImage(selectedImage)}
                    disabled={isProcessing}
                    className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 rounded"
                  >
                    {isProcessing ? 'Processing...' : 'Apply Effects'}
                  </button>

                  {/* Processed Image Canvas */}
                  {processedImage && (
                    <div className="mt-4">
                      <h3 className="text-sm font-bold mb-2">Processed Result</h3>
                      <canvas
                        ref={canvasRef}
                        className="w-full rounded border border-gray-700"
                      />
                    </div>
                  )}
                </div>

                {/* Metadata */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Properties</h3>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Dimensions:</dt>
                        <dd>{selectedImage.dimensions.width}×{selectedImage.dimensions.height}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-400">File Size:</dt>
                        <dd>{(selectedImage.fileSize / 1024 / 1024).toFixed(2)} MB</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Format:</dt>
                        <dd>{selectedImage.format.toUpperCase()}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Brightness:</dt>
                        <dd>{Math.round(selectedImage.brightness)}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Views:</dt>
                        <dd>{selectedImage.views.toLocaleString()}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Likes:</dt>
                        <dd>{selectedImage.likes.toLocaleString()}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Semantic Data</h3>
                    <dl className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Mood:</dt>
                        <dd>{selectedImage.semantic.mood}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Style:</dt>
                        <dd>{selectedImage.semantic.style}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-400">Complexity:</dt>
                        <dd>{selectedImage.visualFeatures.complexity}</dd>
                      </div>
                    </dl>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.semantic.themes.map(theme => (
                        <span
                          key={theme}
                          className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded text-xs"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Dominant Color</h3>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-12 h-12 rounded"
                        style={{
                          backgroundColor: `rgb(${selectedImage.dominantColor.r}, ${selectedImage.dominantColor.g}, ${selectedImage.dominantColor.b})`
                        }}
                      />
                      <code className="text-xs">
                        RGB({selectedImage.dominantColor.r}, {selectedImage.dominantColor.g}, {selectedImage.dominantColor.b})
                      </code>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleImageLike(selectedImage.id)}
                      className={`flex-1 px-4 py-2 rounded ${
                        likedImages.includes(selectedImage.id)
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {likedImages.includes(selectedImage.id) ? '♥ Liked' : '♡ Like'}
                    </button>
                    <button
                      onClick={createCollection}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                    >
                      Create Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}