// Gallery Images Data - Expanded Collection
export const galleryImages = [
  // Original experimental images
  { id: '1', src: '/gallery/img1.png', alt: 'Abandoned Subway', title: 'VOID TUNNEL', category: 'experimental' },
  { id: '2', src: '/gallery/img2.png', alt: 'Abstract Composition', title: 'GRAIN STUDY', category: 'abstract' },
  { id: '3', src: '/gallery/img3.png', alt: 'Arctic Melt', title: 'ICE FORMATION', category: 'nature' },
  { id: '4', src: '/gallery/img4.png', alt: 'Airport Terminal', title: 'LIMINAL SPACE', category: 'architecture' },
  { id: '5', src: '/gallery/img5.png', alt: 'Body Horror', title: 'METAMORPHOSIS', category: 'surreal' },
  { id: '6', src: '/gallery/img6.png', alt: 'Botanical Study', title: 'ORGANIC RENDER', category: 'nature' },

  // Extended collection
  { id: '7', src: '/gallery/img7.png', alt: 'Abstract Macro', title: 'TEXTURE CONTRAST', category: 'abstract' },
  { id: '8', src: '/gallery/img8.png', alt: 'Anatomical Study', title: 'HYBRID BIOLOGY', category: 'experimental' },
  { id: '9', src: '/gallery/img9.png', alt: 'Bridge Suspension', title: 'TENSION VOID', category: 'architecture' },
  { id: '10', src: '/gallery/img10.png', alt: 'Broken Mirror', title: 'TIME FRACTURE', category: 'surreal' },
  { id: '11', src: '/gallery/img11.png', alt: 'Brownian Motion', title: 'CRYSTALLINE CHAOS', category: 'physics' },
  { id: '12', src: '/gallery/img12.png', alt: 'Canyon Walls', title: 'TIME LAYERS', category: 'nature' },
  { id: '13', src: '/gallery/img13.png', alt: 'Cave System', title: 'DARK LIGHT', category: 'experimental' },
  { id: '14', src: '/gallery/img14.png', alt: 'Cellular Automata', title: 'EMERGENT PATTERNS', category: 'digital' },
  { id: '15', src: '/gallery/img15.png', alt: 'Cosmetic Melt', title: 'ABSTRACT BEAUTY', category: 'fashion' },
  { id: '16', src: '/gallery/img16.png', alt: 'Crystal Formation', title: 'ELECTRONIC GROWTH', category: 'tech' },
  { id: '17', src: '/gallery/img17.png', alt: 'Crystal Lattice', title: 'IMPOSSIBLE DIRECTIONS', category: 'physics' },
  { id: '18', src: '/gallery/img18.png', alt: 'Desert Flow', title: 'REVERSE HOURGLASS', category: 'nature' },
  { id: '19', src: '/gallery/img19.png', alt: 'Distorted Portrait', title: 'LENS MELT I', category: 'portrait' },
  { id: '20', src: '/gallery/img20.png', alt: 'Distorted Portrait', title: 'LENS MELT II', category: 'portrait' },
  { id: '21', src: '/gallery/img21.png', alt: 'Double Exposure', title: 'TIME OVERLAP', category: 'experimental' },
  { id: '22', src: '/gallery/img22.png', alt: 'Electronic Waste', title: 'DIGITAL AFTERLIFE', category: 'tech' },
  { id: '23', src: '/gallery/img23.png', alt: 'Emotional Portrait', title: 'TEAR UNIVERSE', category: 'portrait' },
  { id: '24', src: '/gallery/img24.png', alt: 'Fibonacci Spiral', title: 'NATURAL SEQUENCE', category: 'mathematics' },
  { id: '25', src: '/gallery/img25.png', alt: 'Geometric Pattern', title: 'SACRED GEOMETRY', category: 'abstract' },
  { id: '26', src: '/gallery/img26.png', alt: 'Neural Network', title: 'AI DREAMS', category: 'digital' },
  { id: '27', src: '/gallery/img27.png', alt: 'Particle System', title: 'QUANTUM DANCE', category: 'physics' },
  { id: '28', src: '/gallery/img28.png', alt: 'Frequency Wave', title: 'SOUND VISIBLE', category: 'experimental' },
  { id: '29', src: '/gallery/img29.png', alt: 'Morphing Shape', title: 'FORM EVOLUTION', category: 'abstract' },
  { id: '30', src: '/gallery/img30.png', alt: 'Void Space', title: 'NEGATIVE POSITIVE', category: 'conceptual' },
]

// Grid items for asymmetric layout
export const gridItems = [
  { id: '1', image: '/gallery/img1.png', title: 'VOID', subtitle: 'Experimental', size: 'large' as const },
  { id: '2', image: '/gallery/img2.png', title: 'GRAIN', subtitle: 'Abstract', size: 'medium' as const },
  { id: '3', image: '/gallery/img3.png', title: 'ICE', subtitle: 'Nature', size: 'tall' as const },
  { id: '4', image: '/gallery/img4.png', title: 'LIMINAL', subtitle: 'Architecture', size: 'wide' as const },
  { id: '5', image: '/gallery/img5.png', title: 'MORPH', subtitle: 'Surreal', size: 'medium' as const },
  { id: '6', image: '/gallery/img6.png', title: 'ORGANIC', subtitle: 'Nature', size: 'small' as const },
  { id: '7', image: '/gallery/img7.png', title: 'TEXTURE', subtitle: 'Abstract', size: 'medium' as const },
  { id: '8', image: '/gallery/img8.png', title: 'HYBRID', subtitle: 'Experimental', size: 'tall' as const },
  { id: '9', image: '/gallery/img9.png', title: 'TENSION', subtitle: 'Architecture', size: 'wide' as const },
  { id: '10', image: '/gallery/img10.png', title: 'FRACTURE', subtitle: 'Surreal', size: 'small' as const },
  { id: '11', image: '/gallery/img11.png', title: 'CHAOS', subtitle: 'Physics', size: 'medium' as const },
  { id: '12', image: '/gallery/img12.png', title: 'LAYERS', subtitle: 'Nature', size: 'large' as const },
]

// Collections images
export const collectionImages = {
  'ss25': [
    '/gallery/img15.png',
    '/gallery/img16.png',
    '/gallery/img17.png',
    '/gallery/img18.png',
  ],
  'fw25': [
    '/gallery/img19.png',
    '/gallery/img20.png',
    '/gallery/img21.png',
    '/gallery/img22.png',
  ],
  'ss24': [
    '/gallery/img23.png',
    '/gallery/img24.png',
    '/gallery/img25.png',
    '/gallery/img26.png',
  ],
  'fw24': [
    '/gallery/img27.png',
    '/gallery/img28.png',
    '/gallery/img29.png',
    '/gallery/img30.png',
  ],
}

// Mood categories
export const moodImages = {
  minimal: [1, 2, 4, 7, 9, 12, 15, 18, 21, 24],
  chaos: [3, 5, 8, 11, 14, 17, 20, 23, 26, 29],
  dream: [6, 10, 13, 16, 19, 22, 25, 27, 28, 30],
  electric: [2, 7, 11, 14, 16, 22, 26, 27, 28, 29],
  cosmic: [1, 3, 10, 12, 17, 18, 24, 25, 29, 30],
}

// Lab experiments data
export const experiments = {
  '001': {
    title: 'DISTORTION',
    description: 'Spatial manipulation through warped perspectives',
    images: ['/gallery/img19.png', '/gallery/img20.png'],
  },
  '002': {
    title: 'FREQUENCY',
    description: 'Wave dynamics and resonance patterns',
    images: ['/gallery/img28.png', '/gallery/img11.png'],
  },
  '003': {
    title: 'PARTICLE',
    description: 'Chaos systems and emergent behaviors',
    images: ['/gallery/img27.png', '/gallery/img14.png'],
  },
  '004': {
    title: 'MORPH',
    description: 'Shape evolution and transformation',
    images: ['/gallery/img5.png', '/gallery/img29.png'],
  },
  '005': {
    title: 'NEURAL',
    description: 'Pattern recognition and AI aesthetics',
    images: ['/gallery/img26.png', '/gallery/img22.png'],
  },
  '006': {
    title: 'VOID',
    description: 'Negative space as primary element',
    images: ['/gallery/img1.png', '/gallery/img30.png'],
  },
}

export default {
  galleryImages,
  gridItems,
  collectionImages,
  moodImages,
  experiments,
}