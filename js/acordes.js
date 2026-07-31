import { actualizarImagen } from "./ui.js";
import { TOTAL_ACORDES, NOTAS } from "./constantes.js";

export function crearAcordes() {

    const contenedor = document.getElementById("contenedorAcordes");

    contenedor.innerHTML = "";

    for (let i = 1; i <= TOTAL_ACORDES; i++) {

        const acorde = document.createElement("div");
        acorde.className = "acorde";

        acorde.innerHTML = `

            <select id="nota${i}">

                ${NOTAS.map(nota =>
                    `<option value="${nota}">${nota}</option>`
                ).join("")}

            </select>

            <label>

                <input
                    type="checkbox"
                    id="menor${i}"
                >

                Men

            </label>

            <label>

                <input
                    type="checkbox"
                    id="septima${i}"
                >

                7

            </label>

            <div class="imagenAcorde">

                <img
                    id="img${i}"
                    src=""
                    alt="Acorde ${i}"
                >

            </div>

        `;

        contenedor.appendChild(acorde);

        document
            .getElementById(`nota${i}`)
            .addEventListener("change", () => actualizarImagen(i));

        document
            .getElementById(`menor${i}`)
            .addEventListener("change", () => actualizarImagen(i));

        document
            .getElementById(`septima${i}`)
            .addEventListener("change", () => actualizarImagen(i));

        actualizarImagen(i);

    }

}
