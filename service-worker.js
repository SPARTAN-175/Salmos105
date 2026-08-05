// ================================
// SALMOS 115
// Service Worker
// ================================

const CACHE_NAME = "salmos115-v4.0.1";

// Archivos disponibles sin internet
const ARCHIVOS = [

    // Principal

    "./",
    "./index.html",
    "./manifest.json",
    "./version.json",

    // Estilos

    "./css/style.css",

    // Datos

    "./data/acordes.json",

    // JavaScript

    "./js/acordes.js",
    "./js/actualizador.js",
    "./js/analizador.js",
    "./js/app.js",
    "./js/biblioteca.js",
    "./js/buscar.js",
    "./js/captura.js",
    "./js/cargar.js",
    "./js/constantes.js",
    "./js/detector.js",
    "./js/eliminar.js",
    "./js/essentia.js",
    "./js/guardar.js",
    "./js/lista.js",
    "./js/menu.js",
    "./js/modal.js",
    "./js/serviceWorker.js",
    "./js/storage.js",
    "./js/toast.js",
    "./js/tonalidad.js",
    "./js/transponer.js",
    "./js/ui.js",
    "./js/version.js",

    // Pitch

    "./pitch/acordes.js",
    "./pitch/appPitch.js",
    "./pitch/capturaPitch.js",
    "./pitch/estabilidad.js",
    "./pitch/frecuencia.js",
    "./pitch/notas.js",
    "./pitch/pitch.js",

    // Librerías que realmente usas

    "./libs/essentia-wasm.web.js",
    "./libs/essentia-wasm.web.wasm",
    "./libs/essentia.js-core.umd.js",
    "./libs/essentia.js-extractor.umd.js",

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

    if(event.request.method !== "GET"){

        return;

    }

    event.respondWith(

        caches.match(event.request)

            .then(cache => {

                if(cache){

                    return cache;

                }

                return fetch(event.request)

                    .then(network => {

                        const copia = network.clone();

                        caches.open(CACHE_NAME)

                            .then(cache => {

                                cache.put(event.request,copia);

                            });

                        return network;

                    })

                    .catch(() => {

                        if(event.request.destination==="document"){

                            return caches.match("./index.html");

                        }

                    });

            })

    );

});

// ================================
// MENSAJES DESDE LA APLICACIÓN
// ================================

self.addEventListener("message", event => {

    console.log("📨 Mensaje recibido:", event.data);

});
