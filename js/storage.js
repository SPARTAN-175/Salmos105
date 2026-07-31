// =====================================
// SALMOS 105
// Biblioteca Musical
// =====================================

const CLAVE = "salmos105_biblioteca";

/**
 * Obtiene toda la biblioteca
 */
export function obtenerBiblioteca() {

    const datos = localStorage.getItem(CLAVE);

    if (!datos) {

        return [];

    }

    try {

        return JSON.parse(datos);

    } catch {

        return [];

    }

}

/**
 * Guarda toda la biblioteca
 */
export function guardarBiblioteca(biblioteca) {

    localStorage.setItem(

        CLAVE,

        JSON.stringify(biblioteca)

    );

}

/**
 * Busca una alabanza por nombre
 */
export function buscarAlabanza(nombre) {

    const biblioteca = obtenerBiblioteca();

    return biblioteca.find(

        a =>

        a.nombre.toLowerCase() ===

        nombre.toLowerCase()

    );

}

/**
 * Agrega una nueva alabanza
 */
export function agregarAlabanza(nombre) {

    const biblioteca = obtenerBiblioteca();

    const existe = buscarAlabanza(nombre);

    if (existe) {

        return false;

    }

    biblioteca.push({

        nombre,

        configuraciones: []

    });

    guardarBiblioteca(biblioteca);

    return true;

}

/**
 * Agrega una configuración
 */
export function agregarConfiguracion(

    nombre,

    configuracion

) {

    const biblioteca = obtenerBiblioteca();

    const alabanza = biblioteca.find(

        a =>

        a.nombre.toLowerCase() ===

        nombre.toLowerCase()

    );

    if (!alabanza) return false;

    alabanza.configuraciones.push(

        configuracion

    );

    guardarBiblioteca(biblioteca);

    return true;

}

/**
 * Elimina una alabanza completa
 */
export function eliminarAlabanza(nombre) {

    let biblioteca = obtenerBiblioteca();

    biblioteca = biblioteca.filter(

        a =>

        a.nombre.toLowerCase() !==

        nombre.toLowerCase()

    );

    guardarBiblioteca(biblioteca);

}

/**
 * Devuelve todas las alabanzas
 */
export function obtenerAlabanzas() {

    return obtenerBiblioteca();

}
