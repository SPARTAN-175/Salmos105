// =====================================
// SALMOS 105
// Eliminar configuraciones
// =====================================

import {
    eliminarConfiguracion
} from "./storage.js";

import {
    actualizarLista
} from "./lista.js";

import {
    mostrarToast
} from "./toast.js";

import {
    cerrarModal
} from "./modal.js";

import {
    cargarConfiguracion
} from "./cargar.js";

// Estos datos los actualizará cargar.js
let alabanzaActual = null;
let indiceActual = 0;

/**
 * Guarda la alabanza actualmente cargada
 */
export function establecerActual(

    alabanza,

    indice

){

    alabanzaActual = alabanza;

    indiceActual = indice;

}

/**
 * Elimina la configuración actual
 */
export function eliminarActual(){

    if(!alabanzaActual) return;

    const resultado = eliminarConfiguracion(

        alabanzaActual.nombre,

        indiceActual

    );

    actualizarLista();

    cerrarModal();

    if(resultado==="alabanza"){

        document.getElementById(

            "nombreAlabanza"

        ).textContent="Sin alabanza seleccionada";

        document.getElementById(

            "tonoActual"

        ).textContent="";

        document.getElementById(

            "selectorVersion"

        ).classList.add("oculto");

        document.getElementById(

            "btnEliminarConfiguracion"

        ).classList.add("oculto");

        mostrarToast(

            "Alabanza eliminada."

        );

        return;

    }

    mostrarToast(

        "Configuración eliminada."

    );

}
