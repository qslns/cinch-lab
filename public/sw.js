// CINCH LAB Service Worker - Advanced Caching Strategy

const CACHE_NAME = 'cinch-lab-v1.0.0';
const RUNTIME_CACHE = 'cinch-lab-runtime';
const IMAGE_CACHE = 'cinch-lab-images';

// Files to cache immediately
const STATIC_CACHE_URLS = [
  '/',
  '/gallery',
  '/manifest.json',
  '/offline.html'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Pre-caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME &&
                   cacheName !== RUNTIME_CACHE &&
                   cacheName !== IMAGE_CACHE;
          })
          .map((cacheName) => {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // HTML requests - Network First, fallback to cache
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before using it
          const responseToCache = response.clone();

          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return response || caches.match('/offline.html');
          });
        })
    );
    return;
  }

  // Image requests - Cache First, network fallback
  if (request.destination === 'image' || url.pathname.includes('/images/')) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }

          return fetch(request).then((networkResponse) => {
            // Only cache successful responses
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
    return;
  }

  // API requests - Network First with timeout
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      Promise.race([
        fetch(request),
        new Promise((resolve) => setTimeout(() => resolve(null), 5000))
      ]).then((response) => {
        if (response) {
          const responseToCache = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        }

        // Timeout occurred, try cache
        return caches.match(request);
      }).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // Default strategy - Cache First
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(request).then((networkResponse) => {
        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();

          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
        }

        return networkResponse;
      });
    }).catch(() => {
      // Return offline page for navigation requests
      if (request.mode === 'navigate') {
        return caches.match('/offline.html');
      }
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Sync event:', event.tag);

  if (event.tag === 'sync-images') {
    event.waitUntil(syncImages());
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-gallery') {
    event.waitUntil(updateGalleryCache());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New content available',
    icon: '/icon-192.png',
    badge: '/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification('CINCH LAB Update', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification click');
  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handler for client communication
self.addEventListener('message', (event) => {
  console.log('[ServiceWorker] Message received:', event.data);

  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }

  if (event.data.action === 'clearCache') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        event.ports[0].postMessage({ status: 'Cache cleared' });
      })
    );
  }

  if (event.data.action === 'getCacheSize') {
    event.waitUntil(
      calculateCacheSize().then((size) => {
        event.ports[0].postMessage({ cacheSize: size });
      })
    );
  }
});

// Helper functions
async function syncImages() {
  // Sync offline changes with server
  console.log('[ServiceWorker] Syncing images...');
  // Implementation would sync any offline changes
}

async function updateGalleryCache() {
  // Update gallery cache in background
  console.log('[ServiceWorker] Updating gallery cache...');

  const cache = await caches.open(IMAGE_CACHE);
  const images = await getLatestImages();

  for (const imageUrl of images) {
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        await cache.put(imageUrl, response);
      }
    } catch (error) {
      console.error('Failed to cache image:', imageUrl, error);
    }
  }
}

async function getLatestImages() {
  // Fetch list of latest images to cache
  try {
    const response = await fetch('/api/images/latest');
    if (response.ok) {
      const data = await response.json();
      return data.urls || [];
    }
  } catch (error) {
    console.error('Failed to fetch latest images:', error);
  }
  return [];
}

async function calculateCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }

  return totalSize;
}

// Cache management - limit cache size
async function trimCache(cacheName, maxItems) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();

  if (requests.length > maxItems) {
    const toDelete = requests.slice(0, requests.length - maxItems);
    for (const request of toDelete) {
      await cache.delete(request);
    }
  }
}

// Periodic cache cleanup
setInterval(() => {
  trimCache(IMAGE_CACHE, 100); // Keep only 100 most recent images
  trimCache(RUNTIME_CACHE, 50); // Keep only 50 runtime cache entries
}, 60000); // Run every minute