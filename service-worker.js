var cacheName = "afterschool-v1";
var cacheFiles = [
    "index.html",
];

// Install event
self.addEventListener('install', function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles)
            .catch(function(error) {
                console.error('Failed to cache files:', error);
            });
        })
    );
});

// Activate event
self.addEventListener('activate', function(event) {
    console.log('Service worker activated');
});

// Fetch event
self.addEventListener('fetch', function(event) {
    if (event.request.url.startsWith('https://') 
    && !event.request.url.includes('/api/')) {
        event.respondWith(
            caches.match(event.request).then(function(cachedResponse) {
                if (cachedResponse) {
                    console.log("[Service Worker] Resource fetched from the cache for: " + event.request.url);
                    return cachedResponse;
                } else {
                    return fetch(event.request).then(function(response) {
                        // Clone the response before caching
                        var responseToCache = response.clone();
                        caches.open(cacheName).then(function(cache) {
                            cache.put(event.request, responseToCache);
                            console.log("[Service Worker] Resource fetched and saved in the cache for: " + event.request.url);
                        });
                        return response;
                    });
                }
            })
        );
    } 
});