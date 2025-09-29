// CINCH LAB Archive - 정신세계와 철학의 기록

export interface Philosophy {
  id: string
  title: string
  content: string
  date: string
  category: 'MANIFESTO' | 'THOUGHT' | 'PROCESS' | 'REFLECTION'
}

export interface ArchiveEntry {
  id: string
  year: number
  month: string
  day?: number
  title: string
  subtitle: string
  type: 'PHILOSOPHY' | 'EXPERIMENT' | 'COLLECTION' | 'EVENT' | 'FAILURE' | 'DISCOVERY'
  category: 'CREATION' | 'DESTRUCTION' | 'TRANSFORMATION' | 'REVELATION'
  content: string
  thoughts: string[]
  tags: string[]
  significance: number // 1-5
  isPublic: boolean
  relatedExperiments?: string[]
  relatedCollections?: string[]
}

export const philosophies: Philosophy[] = [
  {
    id: 'PHIL_001',
    title: 'THE LABORATORY MANIFESTO',
    content: `Fashion is not commerce. Fashion is experiment. Fashion is the physical manifestation of creative research.

    We don't sell clothes. We create moments of transformation. Each piece is a timestamp of creative evolution, not a product.

    CINCH LAB is an experimental fashion laboratory. We pursue the limits of fashion through rigorous research and uncompromising methodology.

    The laboratory is where fashion meets science, where fabric meets philosophy, where destruction creates beauty.`,
    date: '2024-01-01',
    category: 'MANIFESTO'
  },
  {
    id: 'PHIL_002',
    title: 'ON DESTRUCTION AS CREATION',
    content: `Every act of creation requires destruction. To make something new, something old must die.

    In the laboratory, we embrace failure as a teacher. Each failed experiment brings us closer to revelation.

    Pattern deconstruction is not about breaking things - it's about finding the beauty in broken things.`,
    date: '2024-03-15',
    category: 'THOUGHT'
  },
  {
    id: 'PHIL_003',
    title: 'TIME AS MATERIAL',
    content: `Time is not linear in fashion. A garment can exist in multiple temporal states simultaneously.

    We design for the future while honoring the destruction of the past. Each collection is a time capsule of NOW.

    Fashion that changes over time, that degrades beautifully, that evolves with wear - this is living fashion.`,
    date: '2024-06-20',
    category: 'PROCESS'
  },
  {
    id: 'PHIL_004',
    title: 'THE VOID PHILOSOPHY',
    content: `Negative space is not empty space. It is potential space. It is the space where imagination lives.

    In fashion, what we don't create is as important as what we do create. The absence defines the presence.

    CINCH • RELEASE • REPEAT - The cinch creates tension, the release creates relief, the repeat creates rhythm.`,
    date: '2024-09-10',
    category: 'REFLECTION'
  },
  {
    id: 'PHIL_005',
    title: 'COMMERCE IS DEATH',
    content: `The moment fashion becomes commerce, it dies. Price tags are tombstones.

    We don't sell because selling diminishes the work. Each piece exists as art, as experiment, as statement.

    After exhibitions, after documentation, maybe one piece finds an owner. Not through transaction, but through understanding.`,
    date: '2024-12-01',
    category: 'MANIFESTO'
  }
]

export const archiveEntries: ArchiveEntry[] = [
  // 2025 Entries
  {
    id: 'ARCHIVE_2025_001',
    year: 2025,
    month: 'JANUARY',
    day: 15,
    title: 'THE BEGINNING OF CHAOS',
    subtitle: 'First experiment of the new cycle',
    type: 'EXPERIMENT',
    category: 'CREATION',
    content: 'Initiated the pattern deconstruction series. Traditional pattern blocks subjected to mathematical chaos theory. Results: unexpected beauty in disorder.',
    thoughts: [
      'Patterns want to be broken',
      'Mathematics is the language of fashion',
      'Chaos is just unrecognized order'
    ],
    tags: ['PATTERN', 'CHAOS', 'MATHEMATICS', 'DECONSTRUCTION'],
    significance: 5,
    isPublic: true,
    relatedExperiments: ['EXP_001']
  },
  {
    id: 'ARCHIVE_2025_002',
    year: 2025,
    month: 'FEBRUARY',
    day: 3,
    title: 'FAILURE AS TEACHER',
    subtitle: 'Complete structural collapse in test 3',
    type: 'FAILURE',
    category: 'DESTRUCTION',
    content: 'The garment collapsed under its own conceptual weight. The structure could not support the idea. But in collapse, we found new form.',
    thoughts: [
      'Failure is data',
      'Collapse creates new structures',
      'The garment rejected our vision - it had its own'
    ],
    tags: ['FAILURE', 'STRUCTURE', 'LEARNING'],
    significance: 4,
    isPublic: true,
    relatedExperiments: ['EXP_001']
  },
  {
    id: 'ARCHIVE_2025_003',
    year: 2025,
    month: 'MARCH',
    day: 1,
    title: 'DECONSTRUCTED REALITY',
    subtitle: 'Spring Summer 2025 Collection Launch',
    type: 'COLLECTION',
    category: 'REVELATION',
    content: 'Reality bent through the lens of deconstruction. Each piece exists between structure and chaos. No sales, only exhibition.',
    thoughts: [
      'Fashion is not about selling',
      'It is about creating moments that transcend commerce',
      'SS25 is not a collection, it is a statement'
    ],
    tags: ['COLLECTION', 'SS25', 'NO_SALES'],
    significance: 5,
    isPublic: true,
    relatedCollections: ['COL_001']
  },

  // 2024 Entries
  {
    id: 'ARCHIVE_2024_001',
    year: 2024,
    month: 'MARCH',
    day: 15,
    title: 'MATERIAL ALCHEMY BEGINS',
    subtitle: 'Chemical manipulation of textiles',
    type: 'EXPERIMENT',
    category: 'TRANSFORMATION',
    content: 'Started thermal restructuring experiments. Synthetic polymers subjected to 800°C heat, then rapid cooling in nitrogen. Fabric developed memory.',
    thoughts: [
      'Heat creates memory in fabrics',
      'Destruction is a form of creation',
      'Chemistry is fashion'
    ],
    tags: ['MATERIAL', 'ALCHEMY', 'HEAT', 'TRANSFORMATION'],
    significance: 5,
    isPublic: true,
    relatedExperiments: ['EXP_002']
  },
  {
    id: 'ARCHIVE_2024_002',
    year: 2024,
    month: 'MAY',
    day: 7,
    title: 'TOXIC FUME GENERATION',
    subtitle: 'Uncontrolled chemical reaction',
    type: 'FAILURE',
    category: 'DESTRUCTION',
    content: 'Acid erosion experiment went wrong. Complete dissolution of sample 7. Lab evacuated. But we learned about material limits.',
    thoughts: [
      'Chemistry has its own agenda',
      'Respect the materials',
      'Danger is part of experimentation'
    ],
    tags: ['FAILURE', 'DANGER', 'CHEMISTRY'],
    significance: 3,
    isPublic: true,
    relatedExperiments: ['EXP_002']
  },
  {
    id: 'ARCHIVE_2024_003',
    year: 2024,
    month: 'SEPTEMBER',
    day: 1,
    title: 'TEMPORAL DISTORTION',
    subtitle: 'Fall Winter 2024 Collection',
    type: 'COLLECTION',
    category: 'REVELATION',
    content: 'Time folded onto itself. Past and future collapsed into singular moments of creation. Each garment is a timestamp of experimental research.',
    thoughts: [
      'Time is not linear',
      'Fashion exists in multiple dimensions',
      'FW24 breaks temporal boundaries'
    ],
    tags: ['COLLECTION', 'FW24', 'TIME'],
    significance: 5,
    isPublic: true,
    relatedCollections: ['COL_002']
  },
  {
    id: 'ARCHIVE_2024_004',
    year: 2024,
    month: 'NOVEMBER',
    day: 20,
    title: 'DIMENSIONAL BREAKTHROUGH',
    subtitle: 'Möbius strip integration success',
    type: 'DISCOVERY',
    category: 'CREATION',
    content: 'Successfully created garments with no beginning or end. The wearer becomes part of an infinite loop. Fashion can be non-Euclidean.',
    thoughts: [
      'Geometry is wearable',
      'Infinity fits the human form',
      'Breaking dimensional boundaries'
    ],
    tags: ['DISCOVERY', 'DIMENSION', 'MÖBIUS'],
    significance: 5,
    isPublic: true,
    relatedExperiments: ['EXP_003']
  },

  // 2023 Entries
  {
    id: 'ARCHIVE_2023_001',
    year: 2023,
    month: 'JUNE',
    day: 15,
    title: 'THE LABORATORY OPENS',
    subtitle: 'CINCH LAB is born',
    type: 'EVENT',
    category: 'CREATION',
    content: 'Today marks the beginning. No more commerce. No more compromise. Only pure creation. The laboratory is open.',
    thoughts: [
      'This is day zero',
      'Fashion dies when it becomes product',
      'We choose experiment over profit'
    ],
    tags: ['BEGINNING', 'LABORATORY', 'MANIFESTO'],
    significance: 5,
    isPublic: true
  },
  {
    id: 'ARCHIVE_2023_002',
    year: 2023,
    month: 'AUGUST',
    day: 30,
    title: 'WEARER TRAPPED IN LOOP',
    subtitle: 'Möbius experiment gone wrong',
    type: 'FAILURE',
    category: 'DESTRUCTION',
    content: 'Test subject could not exit the garment. The Möbius design worked too well. Emergency scissors required. Back to drawing board.',
    thoughts: [
      'Success and failure are perspectives',
      'The garment was perfect, the human was not',
      'We must design for human limitations'
    ],
    tags: ['FAILURE', 'MÖBIUS', 'HUMAN_ERROR'],
    significance: 4,
    isPublic: true,
    relatedExperiments: ['EXP_003']
  },
  {
    id: 'ARCHIVE_2023_003',
    year: 2023,
    month: 'DECEMBER',
    day: 25,
    title: 'GENIUS RECOGNITION',
    subtitle: 'The world begins to understand',
    type: 'EVENT',
    category: 'REVELATION',
    content: 'First major exhibition. No sales booth. No price tags. Just pure fashion experiment. The audience was confused, then amazed.',
    thoughts: [
      'Confusion precedes understanding',
      'Experimental work is often misunderstood initially',
      'We are not here to be understood, we are here to create'
    ],
    tags: ['EXHIBITION', 'RECOGNITION', 'NO_SALES'],
    significance: 5,
    isPublic: true
  }
]

// Archive Statistics
export interface ArchiveStats {
  year: number
  experiments: number
  collections: number
  events: number
  failures: number
  discoveries: number
  totalEntries: number
}

export function getArchiveStats(): ArchiveStats[] {
  const years = [...new Set(archiveEntries.map(e => e.year))].sort((a, b) => b - a)

  return years.map(year => {
    const yearEntries = archiveEntries.filter(e => e.year === year)
    return {
      year,
      experiments: yearEntries.filter(e => e.type === 'EXPERIMENT').length,
      collections: yearEntries.filter(e => e.type === 'COLLECTION').length,
      events: yearEntries.filter(e => e.type === 'EVENT').length,
      failures: yearEntries.filter(e => e.type === 'FAILURE').length,
      discoveries: yearEntries.filter(e => e.type === 'DISCOVERY').length,
      totalEntries: yearEntries.length
    }
  })
}

export function getPhilosophyById(id: string): Philosophy | undefined {
  return philosophies.find(p => p.id === id)
}

export function getArchiveEntryById(id: string): ArchiveEntry | undefined {
  return archiveEntries.find(e => e.id === id)
}

export function getEntriesByYear(year: number): ArchiveEntry[] {
  return archiveEntries.filter(e => e.year === year)
}

export function getEntriesByType(type: ArchiveEntry['type']): ArchiveEntry[] {
  return archiveEntries.filter(e => e.type === type)
}

export function getPublicEntries(): ArchiveEntry[] {
  return archiveEntries.filter(e => e.isPublic)
}

export function getSignificantEntries(minSignificance: number = 4): ArchiveEntry[] {
  return archiveEntries.filter(e => e.significance >= minSignificance)
}