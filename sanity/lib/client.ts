import { createClient, type QueryParams } from 'next-sanity'

// Use placeholder to prevent build errors when Sanity is not configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const isProduction = process.env.NODE_ENV === 'production'

// Singleton client instance
export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: isProduction,
  perspective: 'published',
  // Stale-while-revalidate for better performance
  stega: { enabled: false },
})

// Simple in-memory cache for SSR (cleared on each request in production)
const cache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = isProduction ? 60 * 1000 : 5 * 1000 // 60s in prod, 5s in dev

/**
 * Cached fetch wrapper for Sanity queries
 * Uses in-memory cache to reduce API calls during static generation
 */
export async function cachedFetch<T>(
  query: string,
  params: QueryParams = {},
  ttl: number = CACHE_TTL
): Promise<T> {
  const cacheKey = JSON.stringify({ query, params })
  const now = Date.now()
  const cached = cache.get(cacheKey)

  if (cached && now - cached.timestamp < ttl) {
    return cached.data as T
  }

  const data = await client.fetch<T>(query, params)
  cache.set(cacheKey, { data, timestamp: now })

  // Cleanup old entries periodically (max 100 entries)
  if (cache.size > 100) {
    const oldestKey = cache.keys().next().value
    if (oldestKey) cache.delete(oldestKey)
  }

  return data
}

// Clear cache utility (useful for revalidation)
export function clearCache(): void {
  cache.clear()
}
