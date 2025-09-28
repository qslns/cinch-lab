// ==========================================================================
// SOPHISTICATED IMAGE PLACEHOLDER SYSTEM
// Margiela × Sacai inspired dynamic placeholders
// ==========================================================================

export interface PlaceholderOptions {
  width: number
  height: number
  text?: string
  backgroundColor?: string
  textColor?: string
  category?: 'fashion' | 'lab' | 'archive' | 'collection' | 'experiment'
}

// Generate SVG placeholder with sophisticated design
export function generatePlaceholder({
  width,
  height,
  text = '',
  backgroundColor = '#F7F5F2',
  textColor = '#0A0908',
  category = 'fashion'
}: PlaceholderOptions): string {
  const aspectRatio = width / height
  const fontSize = Math.min(width, height) * 0.08

  // Category-specific patterns
  const patterns = {
    fashion: generateFashionPattern(),
    lab: generateLabPattern(),
    archive: generateArchivePattern(),
    collection: generateCollectionPattern(),
    experiment: generateExperimentPattern()
  }

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${patterns[category]}
        <filter id="noise">
          <feTurbulence baseFrequency="0.9" numOctaves="4" seed="5"/>
          <feColorMatrix type="saturate" values="0"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="${backgroundColor}"/>

      <!-- Pattern Overlay -->
      <rect width="${width}" height="${height}" fill="url(#${category}Pattern)" opacity="0.1"/>

      <!-- Noise Texture -->
      <rect width="${width}" height="${height}" filter="url(#noise)" opacity="0.02"/>

      <!-- Grid Lines - Margiela style -->
      <line x1="0" y1="${height/2}" x2="${width}" y2="${height/2}" stroke="${textColor}" stroke-width="0.5" opacity="0.1"/>
      <line x1="${width/2}" y1="0" x2="${width/2}" y2="${height}" stroke="${textColor}" stroke-width="0.5" opacity="0.1"/>

      <!-- Corner Markers -->
      <g stroke="${textColor}" stroke-width="1" fill="none" opacity="0.2">
        <path d="M 10 10 L 30 10 M 10 10 L 10 30"/>
        <path d="M ${width-30} 10 L ${width-10} 10 M ${width-10} 10 L ${width-10} 30"/>
        <path d="M 10 ${height-30} L 10 ${height-10} M 10 ${height-10} L 30 ${height-10}"/>
        <path d="M ${width-30} ${height-10} L ${width-10} ${height-10} M ${width-10} ${height-30} L ${width-10} ${height-10}"/>
      </g>

      <!-- Text Label -->
      ${text ? `
        <text
          x="${width/2}"
          y="${height/2}"
          font-family="'Space Grotesk', system-ui, sans-serif"
          font-size="${fontSize}"
          font-weight="300"
          fill="${textColor}"
          text-anchor="middle"
          dominant-baseline="middle"
          letter-spacing="0.05em"
          opacity="0.3"
        >
          ${text.toUpperCase()}
        </text>
      ` : ''}

      <!-- Dimension Indicator -->
      <text
        x="${width-10}"
        y="${height-10}"
        font-family="'JetBrains Mono', monospace"
        font-size="10"
        fill="${textColor}"
        text-anchor="end"
        opacity="0.2"
      >
        ${width}×${height}
      </text>
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

// Pattern generators for different categories
function generateFashionPattern(): string {
  return `
    <pattern id="fashionPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <circle cx="50" cy="50" r="1" fill="currentColor"/>
      <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="0.5"/>
      <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" stroke-width="0.5"/>
    </pattern>
  `
}

function generateLabPattern(): string {
  return `
    <pattern id="labPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="20" height="20" fill="none" stroke="currentColor" stroke-width="0.5"/>
      <rect x="20" y="20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="0.5"/>
    </pattern>
  `
}

function generateArchivePattern(): string {
  return `
    <pattern id="archivePattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 0 30 Q 15 15 30 30 T 60 30" stroke="currentColor" fill="none" stroke-width="0.5"/>
      <path d="M 30 0 Q 45 15 30 30 T 30 60" stroke="currentColor" fill="none" stroke-width="0.5"/>
    </pattern>
  `
}

function generateCollectionPattern(): string {
  return `
    <pattern id="collectionPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
      <polygon points="40,10 70,30 70,50 40,70 10,50 10,30" fill="none" stroke="currentColor" stroke-width="0.5"/>
    </pattern>
  `
}

function generateExperimentPattern(): string {
  return `
    <pattern id="experimentPattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="0.5"/>
      <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" stroke-width="0.5"/>
      <circle cx="25" cy="25" r="2" fill="currentColor"/>
    </pattern>
  `
}

// Generate placeholder URL for Next.js Image component
export function getPlaceholderUrl(options: PlaceholderOptions): string {
  return generatePlaceholder(options)
}

// Preset placeholders for common use cases
export const placeholders = {
  // Collection images
  collectionHero: (text = 'Collection') => getPlaceholderUrl({
    width: 1920,
    height: 1080,
    text,
    category: 'collection'
  }),
  collectionThumb: (text = 'Look') => getPlaceholderUrl({
    width: 600,
    height: 800,
    text,
    category: 'collection'
  }),

  // Lab images
  labExperiment: (text = 'Experiment') => getPlaceholderUrl({
    width: 800,
    height: 600,
    text,
    category: 'lab'
  }),
  labProcess: (text = 'Process') => getPlaceholderUrl({
    width: 1200,
    height: 800,
    text,
    category: 'lab'
  }),

  // Archive images
  archiveItem: (text = 'Archive') => getPlaceholderUrl({
    width: 600,
    height: 600,
    text,
    category: 'archive'
  }),
  archiveDetail: (text = 'Detail') => getPlaceholderUrl({
    width: 1000,
    height: 750,
    text,
    category: 'archive'
  }),

  // Fashion images
  fashionLook: (text = 'Look') => getPlaceholderUrl({
    width: 800,
    height: 1200,
    text,
    category: 'fashion'
  }),
  fashionDetail: (text = 'Detail') => getPlaceholderUrl({
    width: 1000,
    height: 1000,
    text,
    category: 'fashion'
  }),

  // General purpose
  square: (size = 600, text = '') => getPlaceholderUrl({
    width: size,
    height: size,
    text,
    category: 'experiment'
  }),
  landscape: (text = '') => getPlaceholderUrl({
    width: 1600,
    height: 900,
    text,
    category: 'experiment'
  }),
  portrait: (text = '') => getPlaceholderUrl({
    width: 900,
    height: 1600,
    text,
    category: 'fashion'
  })
}