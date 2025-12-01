'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'

// Google Analytics ID - Replace with your actual GA4 ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

// Track page views
export function usePageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    // Send pageview to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])
}

// Track custom events
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// Common tracking functions
export const analytics = {
  // Track navigation clicks
  trackNavClick: (destination: string) => {
    trackEvent('navigation_click', 'navigation', destination)
  },

  // Track collection views
  trackCollectionView: (collectionId: string, collectionTitle: string) => {
    trackEvent('view_item', 'collection', collectionTitle)
  },

  // Track CTA clicks
  trackCTAClick: (ctaName: string, location: string) => {
    trackEvent('cta_click', 'engagement', `${ctaName}_${location}`)
  },

  // Track scroll depth
  trackScrollDepth: (depth: number) => {
    trackEvent('scroll', 'engagement', `${depth}%`, depth)
  },

  // Track time on page
  trackTimeOnPage: (seconds: number) => {
    trackEvent('time_on_page', 'engagement', undefined, seconds)
  },

  // Track social clicks
  trackSocialClick: (platform: string) => {
    trackEvent('social_click', 'social', platform)
  },

  // Track form submissions
  trackFormSubmit: (formName: string) => {
    trackEvent('form_submit', 'lead', formName)
  },

  // Track image gallery interactions
  trackGalleryInteraction: (action: 'open' | 'close' | 'navigate', imageIndex?: number) => {
    trackEvent(`gallery_${action}`, 'gallery', imageIndex?.toString())
  },

  // Track search (if implemented)
  trackSearch: (query: string, resultsCount: number) => {
    trackEvent('search', 'search', query, resultsCount)
  },
}

// Google Analytics Script Component
export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Analytics Provider Component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  usePageView()

  return <>{children}</>
}

// Scroll depth tracking hook
export function useScrollDepthTracking() {
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return

    const thresholds = [25, 50, 75, 90, 100]
    const tracked = new Set<number>()

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)

      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !tracked.has(threshold)) {
          tracked.add(threshold)
          analytics.trackScrollDepth(threshold)
        }
      })
    }

    // Throttle scroll events
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [])
}

// Type declarations for window.gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}
