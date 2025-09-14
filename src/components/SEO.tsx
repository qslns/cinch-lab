import React from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  canonicalUrl?: string
  noindex?: boolean
  nofollow?: boolean
  jsonLd?: object
}

export function SEO({
  title = 'CINCH LAB | Experimental Fashion Laboratory',
  description = 'Cinch • Release • Repeat. Enter the digital fashion laboratory where chaos meets control.',
  keywords = 'experimental fashion, digital art, avant-garde, fashion laboratory, CINCH LAB',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  noindex = false,
  nofollow = false,
  jsonLd
}: SEOProps) {
  const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  )
}

// Structured data for organization
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CINCH LAB',
  description: 'Experimental Fashion Laboratory',
  url: 'https://cinch-lab.com',
  logo: 'https://cinch-lab.com/logo.png',
  sameAs: [
    'https://instagram.com/cinchlab',
    'https://twitter.com/cinchlab'
  ]
}

// Structured data for website
export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CINCH LAB',
  description: 'Experimental Fashion Laboratory',
  url: 'https://cinch-lab.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://cinch-lab.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

// Breadcrumb component
interface BreadcrumbItem {
  name: string
  url?: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-500">/</span>}
              {item.url ? (
                <a href={item.url} className="text-gray-400 hover:text-white">
                  {item.name}
                </a>
              ) : (
                <span className="text-white">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

// Product schema for collections
export function generateProductSchema(product: {
  name: string
  description: string
  image: string
  price?: number
  currency?: string
  availability?: string
  brand?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'CINCH LAB'
    },
    offers: product.price ? {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'USD',
      availability: product.availability || 'https://schema.org/InStock'
    } : undefined
  }
}

// Article schema for blog posts
export function generateArticleSchema(article: {
  title: string
  description: string
  image: string
  author: string
  datePublished: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'CINCH LAB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cinch-lab.com/logo.png'
      }
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished
  }
}

// FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Local business schema (if applicable)
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'CINCH LAB',
  description: 'Experimental Fashion Laboratory',
  image: 'https://cinch-lab.com/storefront.jpg',
  '@id': 'https://cinch-lab.com',
  url: 'https://cinch-lab.com',
  telephone: '+1-XXX-XXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Fashion Street',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10001',
    addressCountry: 'US'
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  }
}