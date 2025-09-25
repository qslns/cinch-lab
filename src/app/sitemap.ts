import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cinchlab.vercel.app'

  const routes = [
    '/',
    '/lab',
    '/collections',
    '/archive',
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
    changeFrequency: 'monthly',
    priority: route === '/' ? 1 : 0.8,
  }))
}