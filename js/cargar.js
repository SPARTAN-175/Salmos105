// =====================================
// SALMOS 105
// Cargar configuraciones
// =====================================

import { actualizarTodos } from "./ui.js";

let alabanzaActual = null;
let indiceConfiguracion = 0;

/**
 * Carga una configuración
 */
export function cargarConfiguracion(alabanza, indice = 0) {

    if (!alabanza) return;

    alabanzaActual = alabanza;
    indiceConfiguracion = indice;

    const configuracion =
        alabanza.configuraciones[indice];

    if (!configuracion) return;

    // Nombre de la alabanza
    document.getElementById("nombreAlabanza").textContent =
        alabanza.nombre;

    // Tonalidad
    document.getElementById("tonoActual").textContent =
        configuracion.tono;

    // Mostrar u ocultar flechas
    const selector =
        document.getElementById("selectorVersion");

    const btnEliminar =
    document.getElementById("btnEliminarConfiguracion");

btnEliminar.classList.remove("oculto");

    if (alabanza.configuraciones.length > 1) {

        selector.classList.remove("oculto");

    } else {

        selector.classList.add("oculto");

    }

    // Cargar acordes
    configuracion.acordes.forEach((acorde, i) => {

        const n = i + 1;

        document.getElementById(`nota${n}`).value =
            acorde.nota;

        document.getElementById(`menor${n}`).checked =
            acorde.menor;

        document.getElementById(`septima${n}`).checked =
            acorde.septima;

    });

    actualizarTodos();

    // Reiniciar transposición
    document.getElementById("valorSemitono").textContent = "0";

}

/**
 * Configuración siguiente
 */
export function siguienteConfiguracion() {

    if (!alabanzaActual) return;

    indiceConfiguracion++;

    if (indiceConfiguracion >= alabanzaActual.configuraciones.length) {

        indiceConfiguracion = 0;

    }

    cargarConfiguracion(
        alabanzaActual,
        indiceConfiguracion
    );

}

/**
 * Configuración anterior
 */
export function anteriorConfiguracion() {

    if (!alabanzaActual) return;

    indiceConfiguracion--;

    if (indiceConfiguracion < 0) {

        indiceConfiguracion =
            alabanzaActual.configuraciones.length - 1;

    }

    cargarConfiguracion(
        alabanzaActual,
        indiceConfiguracion
    );

}
