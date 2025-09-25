'use client'

import { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstaller() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('[PWA] Service Worker registered:', registration)

          // Check for updates
          registration.addEventListener('updatefound', () => {
            console.log('[PWA] New service worker found')
          })
        })
        .catch((error) => {
          console.error('[PWA] Service Worker registration failed:', error)
        })
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    // Handle app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setIsInstallable(false)
      setInstallPrompt(null)
    }

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return

    try {
      await installPrompt.prompt()
      const choiceResult = await installPrompt.userChoice

      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] User accepted install prompt')
      } else {
        console.log('[PWA] User dismissed install prompt')
      }

      setInstallPrompt(null)
      setIsInstallable(false)
    } catch (error) {
      console.error('[PWA] Install failed:', error)
    }
  }

  if (isInstalled || !isInstallable) return null

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={handleInstall}
        className="bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium flex items-center gap-3"
        aria-label="Install CINCH LAB app"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,13H13V19H11V13H5L12,6L19,13Z" />
        </svg>
        INSTALL LAB
      </button>
    </div>
  )
}

// PWA Update Notification Component
export function PWAUpdateNotification() {
  const [showUpdate, setShowUpdate] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker)
                setShowUpdate(true)
              }
            })
          }
        })
      })
    }
  }, [])

  const handleUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ action: 'skipWaiting' })
      setShowUpdate(false)
      window.location.reload()
    }
  }

  if (!showUpdate) return null

  return (
    <div className="fixed top-8 right-8 z-50 max-w-sm">
      <div className="bg-black border border-white/20 text-white p-4 rounded-lg shadow-xl">
        <h3 className="font-bold text-sm mb-2">LAB UPDATE AVAILABLE</h3>
        <p className="text-xs text-gray-400 mb-4">
          A new version of CINCH LAB is ready to install.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-white text-black px-4 py-2 text-xs font-medium rounded hover:bg-gray-200 transition-colors"
          >
            UPDATE NOW
          </button>
          <button
            onClick={() => setShowUpdate(false)}
            className="border border-white/20 px-4 py-2 text-xs font-medium rounded hover:border-white/40 transition-colors"
          >
            LATER
          </button>
        </div>
      </div>
    </div>
  )
}