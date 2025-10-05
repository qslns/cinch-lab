// GROQ queries for Sanity CMS

export const collectionsQuery = `
  *[_type == "collection"] | order(year desc, season desc) {
    _id,
    title,
    "slug": slug.current,
    season,
    year,
    status,
    mainImage,
    gallery,
    description,
    concept,
    techniques,
    materials,
    featured,
    publishedAt,
    order
  }
`

export const collectionBySlugQuery = `
  *[_type == "collection" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    season,
    year,
    status,
    mainImage,
    gallery,
    description,
    concept,
    techniques,
    materials,
    featured,
    publishedAt
  }
`

export const experimentsQuery = `
  *[_type == "experiment"] | order(startDate desc) {
    _id,
    id,
    title,
    "slug": slug.current,
    category,
    status,
    startDate,
    completionDate,
    description,
    techniques,
    materials,
    mainImage,
    result,
    progressPercentage,
    order
  }
`

export const experimentBySlugQuery = `
  *[_type == "experiment" && slug.current == $slug][0] {
    _id,
    id,
    title,
    "slug": slug.current,
    category,
    status,
    startDate,
    completionDate,
    description,
    objective,
    techniques,
    materials,
    mainImage,
    processImages,
    result,
    learnings,
    progressPercentage,
    relatedExperiments[]-> {
      _id,
      id,
      title,
      "slug": slug.current,
      category,
      status
    }
  }
`

export const archiveEntriesQuery = `
  *[_type == "archive"] | order(date desc) {
    _id,
    id,
    title,
    "slug": slug.current,
    type,
    date,
    content,
    images,
    tags,
    "relatedCollection": relatedCollection-> {
      _id,
      title,
      "slug": slug.current,
      season,
      year
    },
    "relatedExperiment": relatedExperiment-> {
      _id,
      id,
      title,
      "slug": slug.current
    },
    featured,
    order
  }
`

export const archiveBySlugQuery = `
  *[_type == "archive" && slug.current == $slug][0] {
    _id,
    id,
    title,
    "slug": slug.current,
    type,
    date,
    content,
    images,
    tags,
    "relatedCollection": relatedCollection-> {
      _id,
      title,
      "slug": slug.current,
      season,
      year,
      mainImage
    },
    "relatedExperiment": relatedExperiment-> {
      _id,
      id,
      title,
      "slug": slug.current,
      category,
      status
    },
    featured
  }
`

export const analysesQuery = `
  *[_type == "analysis"] | order(publishedAt desc) {
    _id,
    id,
    brandName,
    "slug": slug.current,
    collectionName,
    year,
    verdict,
    overallRating,
    ratings,
    mainImage,
    summary,
    techniques,
    influences,
    featured,
    publishedAt,
    order
  }
`

export const analysisBySlugQuery = `
  *[_type == "analysis" && slug.current == $slug][0] {
    _id,
    id,
    brandName,
    "slug": slug.current,
    collectionName,
    year,
    verdict,
    overallRating,
    ratings,
    mainImage,
    referenceImages,
    summary,
    detailedAnalysis,
    strengths,
    weaknesses,
    techniques,
    influences,
    publishedAt
  }
`

// Featured content queries
export const featuredCollectionQuery = `
  *[_type == "collection" && featured == true][0] {
    _id,
    title,
    "slug": slug.current,
    season,
    year,
    mainImage,
    description
  }
`

export const featuredExperimentQuery = `
  *[_type == "experiment" && status == "in_progress"] | order(startDate desc)[0] {
    _id,
    id,
    title,
    "slug": slug.current,
    category,
    status,
    description,
    progressPercentage,
    mainImage
  }
`

export const recentArchiveEntriesQuery = `
  *[_type == "archive"] | order(date desc)[0...3] {
    _id,
    id,
    title,
    "slug": slug.current,
    type,
    date,
    images
  }
`
