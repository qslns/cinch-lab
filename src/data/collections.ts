// THE YON Collections - 순수 룩북 갤러리 (판매 없음)

export interface Look {
  id: string
  title: string
  description: string
  imageUrl?: string
}

export interface Collection {
  id: string
  code: string
  title: string
  subtitle: string
  year: number
  season: 'SPRING' | 'FALL' | 'ANNUAL'
  status: 'CURRENT' | 'ARCHIVED' | 'UPCOMING'
  description: string
  philosophy: string
  lookbook: Look[]
  techniques: string[]
  materials: string[]
  releaseDate: string
}

export const collections: Collection[] = [
  {
    id: 'COL_001',
    code: 'SS25',
    title: 'DECONSTRUCTED_REALITY',
    subtitle: 'SPRING SUMMER 2025',
    year: 2025,
    season: 'SPRING',
    status: 'UPCOMING',
    description: 'Reality bent through the lens of deconstruction. Each piece exists between structure and chaos.',
    philosophy: 'Fashion is not about selling. It is about creating moments that transcend commerce.',
    lookbook: [
      {
        id: 'LOOK_001',
        title: 'OPENING_CEREMONY',
        description: 'The beginning of deconstruction'
      },
      {
        id: 'LOOK_002',
        title: 'STRUCTURAL_COLLAPSE',
        description: 'When form meets formlessness'
      },
      {
        id: 'LOOK_003',
        title: 'VOID_MANIFESTATION',
        description: 'Negative space as protagonist'
      }
    ],
    techniques: ['Pattern deconstruction', 'Raw edge finishing', 'Asymmetric cutting'],
    materials: ['Raw canvas', 'Industrial mesh', 'Recycled synthetics'],
    releaseDate: '2025-03-01'
  },
  {
    id: 'COL_002',
    code: 'FW24',
    title: 'TEMPORAL_DISTORTION',
    subtitle: 'FALL WINTER 2024',
    year: 2024,
    season: 'FALL',
    status: 'CURRENT',
    description: 'Time folded onto itself. Past and future collapsed into singular moments of creation.',
    philosophy: 'Each garment is a timestamp of experimental research, not a commodity.',
    lookbook: [
      {
        id: 'LOOK_004',
        title: 'TIME_ZERO',
        description: 'The moment before creation'
      },
      {
        id: 'LOOK_005',
        title: 'CHRONOLOGICAL_CHAOS',
        description: 'When timelines intersect'
      }
    ],
    techniques: ['Temporal layering', 'Phase shifting', 'Memory forming'],
    materials: ['Memory fabric', 'Shape-retaining alloys', 'Thermal-reactive fibers'],
    releaseDate: '2024-09-01'
  },
  {
    id: 'COL_003',
    code: 'ARCHIVE',
    title: 'GENESIS_EXPERIMENTS',
    subtitle: 'ONGOING RESEARCH',
    year: 2024,
    season: 'ANNUAL',
    status: 'ARCHIVED',
    description: 'The beginning. Raw experiments that birthed the laboratory.',
    philosophy: 'Before commerce, there was pure creation.',
    lookbook: [
      {
        id: 'LOOK_ARCHIVE_001',
        title: 'FIRST_EXPERIMENT',
        description: 'Where it all began'
      }
    ],
    techniques: ['Experimental', 'Undefined', 'Evolving'],
    materials: ['Everything', 'Nothing', 'In-between'],
    releaseDate: 'TIMELESS'
  }
]

// 컬렉션 조회 함수들 (판매 관련 없음)
export function getCollectionByCode(code: string): Collection | undefined {
  return collections.find(c => c.code.toLowerCase() === code.toLowerCase())
}

export function getCurrentCollections(): Collection[] {
  return collections.filter(c => c.status === 'CURRENT')
}

export function getArchivedCollections(): Collection[] {
  return collections.filter(c => c.status === 'ARCHIVED')
}