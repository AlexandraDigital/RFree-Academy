// RFree Academy Service Worker
const CACHE_NAME = 'rfree-academy-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.log('Cache addAll error:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  // Don't cache external API calls or non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        // Don't cache external API responses
        if (!response || response.type === 'error' || response.status !== 200) {
          return response;
        }

        // Clone the response
        const responseClone = response.clone();
        
        // Cache successful responses to documents and assets
        if (event.request.destination === 'document' || 
            event.request.destination === 'style' || 
            event.request.destination === 'script' ||
            event.request.destination === 'font') {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }

        return response;
      }).catch(() => {
        // Return offline page or fallback
        return caches.match('/index.html');
      });
    })
  );
});

// Background sync for data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-user-data') {
    event.waitUntil(
      // Sync logic here
      Promise.resolve()
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from RFree Academy',
    icon: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 192 192%22%3E%3Crect width=%22192%22 height=%22192%22 fill=%22%231a0a2e%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%22120%22 font-weight=%22bold%22 fill=%22%23a855f7%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-family=%22Arial Black%22%3ER%3C/text%3E%3C/svg%3E',
    badge: 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 96 96%22%3E%3Crect width=%2296%22 height=%2296%22 fill=%22%231a0a2e%22/%3E%3Ctext x=%2248%22 y=%2248%22 font-size=%2260%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E🎓%3C/text%3E%3C/svg%3E',
    vibrate: [200, 100, 200],
    tag: 'rfree-notification',
    requireInteraction: false
  };

  event.waitUntil(
    self.registration.showNotification('RFree Academy', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
