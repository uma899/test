const CACHE_NAME = 'my-pwa-cache-v1'; // Increment cache version on updates
const urlsToCache = [
  '/', // Cache the root URL (your index.html)
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icons/Untitled.png', // Add all critical assets here
  '/icons/Untitled.png',
  '/icons/Untitled.png'
  // Add other HTML, CSS, JS, images, fonts, etc.
];

// Install event: Caches all static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting()) // Activates the service worker immediately
  );
});

// Activate event: Cleans up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Makes the service worker control clients immediately
  );
});

// Fetch event: Intercepts network requests
self.addEventListener('fetch', (event) => {
  // We only want to handle requests that are for our origin
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Cache hit - return response
          if (response) {
            return response;
          }

          // No cache hit - fetch from network and cache it
          return fetch(event.request)
            .then((res) => {
              // Check if we received a valid response
              if (!res || res.status !== 200 || res.type !== 'basic') {
                return res;
              }

              // IMPORTANT: Clone the response. A response is a stream
              // and can only be consumed once. We must clone it so that
              // both the cache and the browser can consume it.
              const responseToCache = res.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return res;
            })
            .catch(() => {
              // Optional: Serve an offline page if fetching fails and no cache exists
              // return caches.match('/offline.html');
            });
        })
    );
  }
});