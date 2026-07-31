import { crearAcordes } from "./acordes.js";
import "./transponer.js";

document.addEventListener("DOMContentLoaded", () => {

    crearAcordes();

});

// ==========================
// REGISTRAR SERVICE WORKER
// ==========================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker

            .register("./service-worker.js")

            .then(() => {

                console.log("✅ PWA lista");

            })

            .catch(error => {

                console.error(error);

            });

    });

}
