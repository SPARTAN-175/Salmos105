// ================================
// SALMOS 115
// Service Worker
// ================================

const CACHE_NAME = "salmos115-v3.9";

// Archivos disponibles sin internet
const ARCHIVOS = [

    // Principal

    "./",
    "./index.html",
    "./manifest.json",

    // CSS

    "./css/style.css",

    // JavaScript

    "./js/app.js",
    "./js/acordes.js",
    "./js/biblioteca.js",
    "./js/buscar.js",
    "./js/cargar.js",
    "./js/constantes.js",
    "./js/eliminar.js",
    "./js/guardar.js",
    "./js/lista.js",
    "./js/modal.js",
    "./js/storage.js",
    "./js/toast.js",
    "./js/transponer.js",
    "./js/ui.js",

    // Iconos

    "./assets/icon-192.png",
    "./assets/icon-512.png"

];

// ================================
// INSTALACIÓN
// ================================

self.addEventListener("install", event => {

    console.log("📦 Instalando Salmos 115...");

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

                return fetch(event.request)

                    .then(networkResponse => {

    return networkResponse;

})

                    .catch(() => {

                        return response;

                    });

            })

    );

});
