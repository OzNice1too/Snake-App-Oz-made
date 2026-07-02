const CACHE_NAME = "snake-game-v1";

const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",

    "./Assests/Background_snake.png",

    "./Assests/eat.mp3",
    "./Assests/end.mp3",
    "./Assests/loop3.mp3",

    "./Assests/favicon.ico",
    "./Assests/favicon.svg",
    "./Assests/favicon-96x96.png",
    "./Assests/apple-touch-icon.png",

    "./Assests/site.json"
];

// Install
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );

    self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.map(key => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});