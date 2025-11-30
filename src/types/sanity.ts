import { PortableTextBlock } from '@portabletext/types'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Collection {
  _id: string
  title: string
  slug: string
  season: 'fw25' | 'ss25' | 'fw24' | 'ss24' | 'aw25' | 'aw24'
  year: number
  status: 'in_progress' | 'testing' | 'complete'
  mainImage: SanityImage
  gallery?: SanityImage[]
  description?: string
  concept?: PortableTextBlock[]
  techniques?: string[]
  materials?: string[]
  featured: boolean
  publishedAt: string
  order?: number
}

export interface Experiment {
  _id: string
  id: string // EXP_001 format
  title: string
  slug: string
  category: 'deconstruction' | 'material' | 'hybrid' | 'process' | 'volume' | 'technique'
  status: 'in_progress' | 'testing' | 'complete' | 'failed'
  startDate: string
  completionDate?: string
  description: string
  objective?: PortableTextBlock[]
  techniques: string[]
  materials: string[]
  mainImage?: SanityImage
  processImages?: SanityImage[]
  result?: string
  learnings?: PortableTextBlock[]
  progressPercentage: number
  relatedExperiments?: Experiment[]
  order?: number
}

export interface ArchiveEntry {
  _id: string
  id: string // ARC_001 format
  title: string
  slug: string
  type: 'inspiration' | 'iteration' | 'failure' | 'breakthrough' | 'process' | 'philosophy'
  date: string
  content: PortableTextBlock[]
  images?: SanityImage[]
  tags?: string[]
  relatedCollection?: {
    _id: string
    title: string
    slug: string
    season: string
    year: number
    mainImage?: SanityImage
  }
  relatedExperiment?: {
    _id: string
    id: string
    title: string
    slug: string
    category: string
    status: string
  }
  featured: boolean
  order?: number
}

export interface Analysis {
  _id: string
  id: string // ANALYSIS_001 format
  brandName: string
  slug: string
  collectionName: string
  year: number
  verdict: 'genius' | 'progressive' | 'competent' | 'commercial' | 'derivative'
  overallRating: number // 0-10
  ratings: {
    innovation: number
    execution: number
    concept: number
    technique: number
  }
  mainImage?: SanityImage
  referenceImages?: SanityImage[]
  summary: string
  detailedAnalysis: PortableTextBlock[]
  strengths?: string[]
  weaknesses?: string[]
  techniques?: string[]
  influences?: string[]
  featured: boolean
  publishedAt: string
  order?: number
}

// Helper type for image URL builder
export type ImageSource = SanityImageSource
