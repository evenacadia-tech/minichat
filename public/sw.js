const CACHE_NAME = 'matrix-v1'
const SUPABASE_HOST = 'bbmqnharshychpcekgea.supabase.co'

self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url)

  // Network-first for Supabase API calls
  if (url.hostname === SUPABASE_HOST) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    )
    return
  }

  // Cache-first for static assets
  if (e.request.destination === 'image' || e.request.destination === 'font') {
    e.respondWith(
      caches.open(CACHE_NAME).then(async cache => {
        const cached = await cache.match(e.request)
        if (cached) return cached
        const response = await fetch(e.request)
        cache.put(e.request, response.clone())
        return response
      })
    )
    return
  }

  // Default: network
  e.respondWith(fetch(e.request))
})
