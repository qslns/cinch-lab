import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/../../sanity/lib/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import type { SanityImage } from '@/types/sanity'

// Get image URL builder instance
const builder = imageUrlBuilder(client)

/**
 * Generate optimized image URL from Sanity image
 * @param source - Sanity image object or asset reference
 * @returns URL builder instance for chaining
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Get optimized image URL with default settings
 * @param source - Sanity image object
 * @param width - Desired width
 * @param height - Desired height (optional)
 * @param quality - Image quality 1-100 (default: 85)
 * @returns Optimized image URL
 */
export function getImageUrl(
  source: SanityImageSource | undefined | null,
  width: number = 800,
  height?: number,
  quality: number = 85
): string {
  if (!source) {
    return '/placeholder-image.jpg'
  }

  try {
    let url = urlFor(source)
      .width(width)
      .quality(quality)
      .auto('format')
      .fit('max')

    if (height) {
      url = url.height(height)
    }

    return url.url()
  } catch (error) {
    console.error('Error generating image URL:', error)
    return '/placeholder-image.jpg'
  }
}

/**
 * Get blur placeholder data URL for progressive image loading
 * @param source - Sanity image object
 * @returns Base64 blur placeholder URL
 */
export function getBlurDataUrl(source: SanityImageSource | undefined | null): string {
  if (!source) {
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0Y3RjVGMiIvPjwvc3ZnPg=='
  }

  try {
    return urlFor(source)
      .width(20)
      .height(20)
      .quality(20)
      .blur(50)
      .url()
  } catch (error) {
    console.error('Error generating blur URL:', error)
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI0Y3RjVGMiIvPjwvc3ZnPg=='
  }
}

/**
 * Get image alt text from Sanity image
 * @param image - Sanity image object with alt field
 * @param fallback - Fallback text if alt is not available
 * @returns Alt text string
 */
export function getImageAlt(image: SanityImage | undefined | null, fallback: string = 'CINCH LAB Image'): string {
  return image?.alt || fallback
}

/**
 * Get responsive srcset for Sanity image
 * @param source - Sanity image object
 * @param widths - Array of widths for srcset
 * @returns srcset string
 */
export function getResponsiveSrcSet(
  source: SanityImageSource | undefined | null,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]
): string {
  if (!source) return ''

  try {
    return widths
      .map(width => {
        const url = urlFor(source)
          .width(width)
          .quality(85)
          .auto('format')
          .fit('max')
          .url()
        return `${url} ${width}w`
      })
      .join(', ')
  } catch (error) {
    console.error('Error generating srcset:', error)
    return ''
  }
}

/**
 * Get hotspot/crop aware image URL
 * @param source - Sanity image with hotspot data
 * @param width - Width
 * @param height - Height
 * @param crop - Enable crop to dimensions
 * @returns Cropped/focused image URL
 */
export function getCroppedImageUrl(
  source: SanityImageSource | undefined | null,
  width: number,
  height: number,
  crop: boolean = true
): string {
  if (!source) {
    return '/placeholder-image.jpg'
  }

  try {
    let url = urlFor(source)
      .width(width)
      .height(height)
      .quality(90)
      .auto('format')

    if (crop) {
      url = url.fit('crop').crop('focalpoint')
    } else {
      url = url.fit('max')
    }

    return url.url()
  } catch (error) {
    console.error('Error generating cropped URL:', error)
    return '/placeholder-image.jpg'
  }
}

/**
 * Generate Open Graph image URL
 * @param source - Sanity image
 * @returns OG-optimized image URL (1200x630)
 */
export function getOgImageUrl(source: SanityImageSource | undefined | null): string {
  return getCroppedImageUrl(source, 1200, 630, true)
}

/**
 * Generate Twitter Card image URL
 * @param source - Sanity image
 * @returns Twitter-optimized image URL (1200x600)
 */
export function getTwitterImageUrl(source: SanityImageSource | undefined | null): string {
  return getCroppedImageUrl(source, 1200, 600, true)
}

/**
 * Check if image source is valid
 * @param source - Image source to validate
 * @returns boolean
 */
export function isValidImageSource(source: any): source is SanityImageSource {
  return source && (source._ref || source.asset?._ref)
}
