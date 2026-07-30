// ================================
// SALMOS 105
// Service Worker
// ================================

const CACHE_NAME = "salmos105-v1";

// Archivos que siempre estarán disponibles offline
const ARCHIVOS = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./js/app.js",
    "./js/acordes.js",
    "./js/transponer.js",
    "./js/storage.js",
    "./js/ui.js",

    "./assets/icon-192.png",
    "./assets/icon-512.png"

];

// ================================
// INSTALACIÓN
// ================================

self.addEventListener("install", event => {

    console.log("📦 Instalando Salmos 105...");

    event.waitUntil(

        caches.open(CACHE_NAME)

        .then(cache => cache.addAll(ARCHIVOS))

    );

    self.skipWaiting();

});

// ================================
// ACTIVACIÓN
// ================================

self.addEventListener("activate", event => {

    console.log("✅ Service Worker activo");

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            )

        )

    );

    self.clients.claim();

});

// ================================
// FETCH
// ================================

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

        .then(response => {

            if (response) {

                return response;

            }

            return fetch(event.request);

        })

    );

});
