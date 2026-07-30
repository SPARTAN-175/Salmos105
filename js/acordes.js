// =====================================
// SALMOS 105
// Gestión de acordes
// =====================================

import { actualizarImagen } from "./ui.js";

const notas = [
    "Do",
    "Do#",
    "Re",
    "Re#",
    "Mi",
    "Fa",
    "Fa#",
    "Sol",
    "Sol#",
    "La",
    "La#",
    "Si"
];

const TOTAL_ACORDES = 6;

export function crearAcordes() {

    const contenedor = document.getElementById("contenedorAcordes");
    const resultado = document.getElementById("resultado");

    contenedor.innerHTML = "";
    resultado.innerHTML = "";

    for (let i = 1; i <= TOTAL_ACORDES; i++) {

        // ==========================
        // SELECTOR
        // ==========================

        const acorde = document.createElement("div");

        acorde.className = "acorde";

        acorde.innerHTML = `
            <select id="nota${i}">
                ${notas.map(n => `<option value="${n}">${n}</option>`).join("")}
            </select>

            <label>
                <input type="checkbox" id="menor${i}">
                Menor
            </label>

            <label>
                <input type="checkbox" id="septima${i}">
                Séptima
            </label>
        `;

        contenedor.appendChild(acorde);

        // ==========================
        // IMAGEN
        // ==========================

        const imagen = document.createElement("div");

        imagen.className = "imagenAcorde";

        imagen.innerHTML = `
            <img
                id="img${i}"
                src="assets/acordes/guitarra/C.png"
                alt="Acorde">

            <span id="txt${i}">
                Do
            </span>
        `;

        resultado.appendChild(imagen);

        // ==========================
        // EVENTOS
        // ==========================

        document
            .getElementById(`nota${i}`)
            .addEventListener("change", () => actualizarImagen(i));

        document
            .getElementById(`menor${i}`)
            .addEventListener("change", () => actualizarImagen(i));

        document
            .getElementById(`septima${i}`)
            .addEventListener("change", () => actualizarImagen(i));

        // Imagen inicial
        actualizarImagen(i);

    }

}
