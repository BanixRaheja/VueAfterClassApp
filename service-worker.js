var cacheName = "afterschool-v1";
var cacheFiles = [
    "index.html",
    "Images/badminton.png",
    "Images/dance.png",
    "Images/drama1.png",
    "Images/drawing1.jpg",
    "Images/english1.png",
    "Images/football.png",
    "Images/gymnastic.png",
    "Images/icon-32.png",
    "Images/icon-512.png",
    "Images/karate.png",
    "Images/math1.jpeg",
    "Images/music.jpg",
    "Images/science1.png",
    "Images/social1.gif",
    "javascript/app.js",
    "lessons.js"
];

self.addEventListener("install", function(e) {
    console.log("[Service Worker] Install");
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            console.log("[Service Worker] Caching files");
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener("fetch", function (e){
    e.respondWith(
        caches.match(e.request).then(function (cachedFile) {
            // if the file is in cache, retrieve it from there
            if(cachedFile){
                console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
                return cachedFile;
            } else {
                // if the file is not in the cache, download the file
                return fetch(e.request).then(function (response) {
                    return caches.open(cacheName).then(function (cache) {
                        // add new file to the cache
                        cache.put(e.request, response.clone());

                        console.log("[Service Worker] Resource fetched and saved in the cache for: " +
                        e.request.url);
                        return response;
                    });
                });
            }
        })
    );
});
