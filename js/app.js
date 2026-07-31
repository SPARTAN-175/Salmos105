import { crearAcordes } from "./acordes.js";
import "./transponer.js";
import { guardarConfiguracion } from "./guardar.js";
import { actualizarLista } from "./lista.js";

document.addEventListener("DOMContentLoaded", () => {

    crearAcordes();
    actualizarLista();

    document
    .getElementById("btnGuardar")
    .addEventListener(
        "click",
        guardarConfiguracion
    );

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
