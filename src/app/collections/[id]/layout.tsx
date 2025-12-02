import type { Metadata } from 'next'

// Collection data for metadata generation
const collectionsData: Record<string, {
  title: string
  season: string
  year: number
  description: string
  concept: string
}> = {
  'deconstruction': {
    title: 'DECONSTRUCTION',
    season: 'FW',
    year: 2025,
    description: 'Exploring pattern deconstruction through experimental tailoring techniques. Every seam exposed, every structure questioned.',
    concept: 'This collection questions the fundamental assumptions of garment construction.',
  },
  'fragments': {
    title: 'FRAGMENTS',
    season: 'SS',
    year: 2025,
    description: 'Hybrid material construction with contrasting textures. Beauty in the broken pieces.',
    concept: 'Fragments explores the poetry of incompleteness.',
  },
  'void': {
    title: 'VOID',
    season: 'FW',
    year: 2024,
    description: 'Architectural volume exploration. The space between defines the form.',
    concept: 'VOID investigates negative space as a design element.',
  },
  'origin': {
    title: 'ORIGIN',
    season: 'SS',
    year: 2024,
    description: 'Return to fundamental shapes. Where every collection begins.',
    concept: 'ORIGIN strips away complexity to find the essential.',
  },
}

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const collection = collectionsData[id]

  if (!collection) {
    return {
      title: 'Collection Not Found',
      description: 'The requested collection could not be found.',
    }
  }

  const title = `${collection.title} ${collection.season} ${collection.year}`
  const description = collection.description

  return {
    title,
    description,
    openGraph: {
      title: `${title} | THE YON`,
      description,
      type: 'article',
      images: [
        {
          url: `/images/collections/${id}/hero.jpg`,
          width: 1200,
          height: 630,
          alt: `${collection.title} Collection`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | THE YON`,
      description,
    },
  }
}

export default function CollectionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
