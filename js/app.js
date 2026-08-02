import { inicializarDetector } from "./detector.js";
import { iniciarBuscador } from "./buscar.js";
import { crearAcordes } from "./acordes.js";
import "./transponer.js";
import { guardarConfiguracion } from "./guardar.js";
import { actualizarLista } from "./lista.js";
import {
    siguienteConfiguracion,
    anteriorConfiguracion
} from "./cargar.js";
import {eliminarActual} from "./eliminar.js";

document.addEventListener("DOMContentLoaded", async () => {

    await inicializarDetector();

    crearAcordes();
    actualizarLista();
    iniciarBuscador();

    document
    .getElementById("btnGuardar")
    .addEventListener(
        "click",
        guardarConfiguracion
    );

    document
    .getElementById("btnSiguienteVersion")
    .addEventListener(
        "click",
        siguienteConfiguracion
    );

document
    .getElementById("btnAnteriorVersion")
    .addEventListener(
        "click",
        anteriorConfiguracion
    );

document

    .getElementById(

        "btnEliminarConfiguracion"

    )

    .addEventListener(

        "click",

        eliminarActual

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
