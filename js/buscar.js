// =====================================
// SALMOS 105
// Buscar alabanzas
// =====================================

import { obtenerAlabanzas } from "./storage.js";
import { cargarConfiguracion } from "./cargar.js";

export function iniciarBuscador() {

    const input =
        document.getElementById("buscarConfiguracion");

    input.addEventListener("input", filtrar);

}

function filtrar() {

    const texto =
        document
            .getElementById("buscarConfiguracion")
            .value
            .trim()
            .toLowerCase();

    const contenedor =
        document.getElementById("listaConfiguraciones");

    contenedor.innerHTML = "";

    const biblioteca =
        obtenerAlabanzas();

    const resultados =
        biblioteca.filter(alabanza =>

            alabanza.nombre
                .toLowerCase()
                .includes(texto)

        );

    if (resultados.length === 0) {

        contenedor.innerHTML = `

            <div class="sinDatos">

                No se encontraron resultados.

            </div>

        `;

        return;

    }

    resultados.forEach(alabanza => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className =
            "tarjetaAlabanza";

        const ultima =
            alabanza.configuraciones[
                alabanza.configuraciones.length - 1
            ];

        tarjeta.innerHTML = `

            <div class="tarjetaTitulo">

                🎵 ${alabanza.nombre}

                <span>

                    (${alabanza.configuraciones.length})

                </span>

            </div>

            <div class="tarjetaSubtitulo">

                Última tonalidad:

                <strong>

                    ${ultima?.tono ?? "-"}

                </strong>

            </div>

        `;

        tarjeta.onclick = () => {

            cargarConfiguracion(alabanza);

        };

        contenedor.appendChild(tarjeta);

    });

}
