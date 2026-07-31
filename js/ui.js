import {
    CODIGOS,
    RUTA_ACORDES
} from "./constantes.js";

/**
 * Construye el nombre del archivo de la imagen
 * Ejemplos:
 * C.png
 * Cm.png
 * C7.png
 * Cm7.png
 */
function obtenerRutaImagen(nota, menor, septima) {

    let nombre = CODIGOS[nota];

    if (menor) {
        nombre += "m";
    }

    if (septima) {
        nombre += "7";
    }

    return `${RUTA_ACORDES}${nombre}.png`;

}

/**
 * Actualiza la imagen de un acorde
 */
export function actualizarImagen(indice) {

    const nota = document.getElementById(`nota${indice}`);
    const menor = document.getElementById(`menor${indice}`);
    const septima = document.getElementById(`septima${indice}`);
    const imagen = document.getElementById(`img${indice}`);

    if (!nota || !menor || !septima || !imagen) return;

    imagen.src = obtenerRutaImagen(
        nota.value,
        menor.checked,
        septima.checked
    );

    imagen.alt = nota.value;

}

/**
 * Actualiza todos los acordes
 */
export function actualizarTodos() {

    const total = document.querySelectorAll(".acorde").length;

    for (let i = 1; i <= total; i++) {

        actualizarImagen(i);

    }

}
