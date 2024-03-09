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
