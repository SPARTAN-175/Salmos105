// =====================================
// SALMOS 115
// Comunicación con Service Worker
// =====================================

export function enviarMensajeSW(mensaje){

    if(!navigator.serviceWorker.controller){

        console.warn("No hay Service Worker activo.");

        return;

    }

    navigator.serviceWorker.controller.postMessage(mensaje);

}
