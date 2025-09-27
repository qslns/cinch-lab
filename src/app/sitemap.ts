import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cinchlab.vercel.app'

  const routes = [
    '/',
    '/lab',
    '/collections',
    '/archive',
    '/analysis',
    '/about',
    '/contact',
    '/chaos',
    '/distortion',
    '/extreme',
    '/gallery',
    '/mood',
    '/runway',
    '/void',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/' ? 'daily' : 'weekly' as const,
    priority: route === '/' ? 1.0 : route.startsWith('/lab') || route.startsWith('/collections') ? 0.9 : 0.8,
  }))
}