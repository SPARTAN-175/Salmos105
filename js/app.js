import { inicializarDetector } from "./detector.js";
import { capturarAudio } from "./captura.js";

import { iniciarBuscador } from "./buscar.js";
import { crearAcordes } from "./acordes.js";
import "./transponer.js";
import { guardarConfiguracion } from "./guardar.js";
import { actualizarLista } from "./lista.js";

import {
    siguienteConfiguracion,
    anteriorConfiguracion
} from "./cargar.js";

import { eliminarActual } from "./eliminar.js";

document.addEventListener("DOMContentLoaded", async () => {

    // Inicializar el motor musical
    await inicializarDetector();

    // Inicializar la aplicación
    crearAcordes();
    actualizarLista();
    iniciarBuscador();

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
        .getElementById("btnDetectarTono")
        .addEventListener(
            "click",
            async () => {

                try {

                    const resultado =
                        await capturarAudio(5);

                    console.log(resultado);

                }

                catch (error) {

                    console.error(error);

                }

            }
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
