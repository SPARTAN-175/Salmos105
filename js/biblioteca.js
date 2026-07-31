// =====================================
// SALMOS 105
// Biblioteca Musical
// Tecnología de MOTI
// =====================================

import {
    buscarAlabanza,
    agregarAlabanza,
    agregarConfiguracion,
    obtenerAlabanzas,
    guardarBiblioteca
} from "./storage.js";

import { actualizarLista } from "./lista.js";
import { cargarConfiguracion } from "./cargar.js";
import { mostrarToast } from "./toast.js";

/**
 * Guarda una configuración
 */
export function guardar(nombre, configuracion){

    let alabanza = buscarAlabanza(nombre);

    // Crear alabanza nueva
    if(!alabanza){

        agregarAlabanza(nombre);

        agregarConfiguracion(
            nombre,
            configuracion
        );

        actualizarLista();

        alabanza = buscarAlabanza(nombre);

        cargarConfiguracion(alabanza);

        mostrarToast(
            "Alabanza guardada."
        );

        return;

    }

    // Verificar si ya existe la tonalidad
    const existe = alabanza.configuraciones.find(

        c => c.tono === configuracion.tono

    );

    if(existe){

        mostrarToast(

            "Ya existe esa tonalidad.",

            "advertencia"

        );

        return;

    }

    agregarConfiguracion(
        nombre,
        configuracion
    );

    actualizarLista();

    alabanza = buscarAlabanza(nombre);

    cargarConfiguracion(

        alabanza,

        alabanza.configuraciones.length-1

    );

    mostrarToast(
        "Configuración agregada."
    );

}

/**
 * Devuelve toda la biblioteca
 */
export function obtenerBiblioteca(){

    return obtenerAlabanzas();

}

/**
 * Elimina una alabanza completa
 * (Todavía no se usa)
 */
export function eliminarAlabanza(nombre){

    const biblioteca =
        obtenerAlabanzas().filter(

            a=>a.nombre!==nombre

        );

    guardarBiblioteca(biblioteca);

    actualizarLista();

}

/**
 * Eliminar configuración
 * (Pendiente)
 */
export function eliminarConfiguracion(){

    console.log(
        "Pendiente..."
    );

}
