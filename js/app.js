import { cargarVersion } from "./version.js";
import {detectarTono, inicializarDetector} from "./detector.js";
import { capturarAudio } from "./captura.js";
import { iniciarMenu } from "./menu.js";
import { iniciarBuscador } from "./buscar.js";
import { crearAcordes } from "./acordes.js";
import "./transponer.js";
import { guardarConfiguracion } from "./guardar.js";
import { actualizarLista } from "./lista.js";
import { iniciarPitch } from "../pitch/appPitch.js";

import {
    siguienteConfiguracion,
    anteriorConfiguracion
} from "./cargar.js";

import { eliminarActual } from "./eliminar.js";

document.addEventListener("DOMContentLoaded", async () => {

    // Inicializar el motor musical
    await cargarVersion();

iniciarMenu();

    
    await inicializarDetector();

    // Inicializar la aplicación
    crearAcordes();
    actualizarLista();
    iniciarBuscador();
    // Inicializar detector de nota
iniciarPitch();

    // Guardar configuración
    document
        .getElementById("btnGuardar")
        .addEventListener(
            "click",
            guardarConfiguracion
        );

    // Configuración siguiente
    document
        .getElementById("btnSiguienteVersion")
        .addEventListener(
            "click",
            siguienteConfiguracion
        );

    // Configuración anterior
    document
        .getElementById("btnAnteriorVersion")
        .addEventListener(
            "click",
            anteriorConfiguracion
        );

    // Eliminar configuración
    document
        .getElementById("btnEliminarConfiguracion")
        .addEventListener(
            "click",
            eliminarActual
        );

    // ==========================
    // DETECTAR TONO
    // ==========================

    document

.getElementById(

    "btnDetectarTono"

)

.addEventListener(

    "click",

    detectarTono

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
