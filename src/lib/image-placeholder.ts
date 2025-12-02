/**
 * Image placeholder utilities for blur effect
 * Uses lightweight SVG-based placeholders for better performance
 */

// Shimmer effect SVG placeholder (animated gradient)
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#E8E8E8" offset="20%" />
      <stop stop-color="#F5F5F5" offset="50%" />
      <stop stop-color="#E8E8E8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#E8E8E8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

// Convert SVG to base64 data URL
const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

/**
 * Generate shimmer placeholder data URL
 */
export const getShimmerPlaceholder = (width: number, height: number): string =>
  `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`

/**
 * Simple solid color placeholder
 */
export const getSolidPlaceholder = (color: string = '#E8E8E8'): string =>
  `data:image/svg+xml;base64,${toBase64(
    `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="${color}"/></svg>`
  )}`

/**
 * Blur placeholder with gradient (for fashion images)
 */
export const getBlurPlaceholder = (
  variant: 'light' | 'medium' | 'dark' = 'light'
): string => {
  const colors = {
    light: { from: '#F5F5F5', to: '#E8E8E8' },
    medium: { from: '#D1D5DB', to: '#9CA3AF' },
    dark: { from: '#374151', to: '#1F2937' },
  }

  const { from, to } = colors[variant]

  return `data:image/svg+xml;base64,${toBase64(
    `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${from};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${to};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#grad)"/>
    </svg>`
  )}`
}

/**
 * Default placeholder for THE YON images
 * Matches the yon-platinum color scheme
 */
export const YON_PLACEHOLDER = getBlurPlaceholder('light')

/**
 * Placeholder variants matching THE YON design system
 */
export const placeholders = {
  light: getBlurPlaceholder('light'),
  medium: getBlurPlaceholder('medium'),
  dark: getBlurPlaceholder('dark'),
  shimmer: getShimmerPlaceholder(700, 475),
} as const
