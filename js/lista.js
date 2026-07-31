// =====================================
// SALMOS 105
// Lista de alabanzas
// =====================================

import { obtenerAlabanzas } from "./storage.js";

/**
 * Dibuja toda la biblioteca
 */
export function actualizarLista() {

    const contenedor =
        document.getElementById("listaConfiguraciones");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    const biblioteca = obtenerAlabanzas();

    if (biblioteca.length === 0) {

        contenedor.innerHTML = `

            <div class="sinDatos">

                No hay alabanzas guardadas.

            </div>

        `;

        return;

    }

    biblioteca.forEach(alabanza => {

        const tarjeta =
            document.createElement("div");

        tarjeta.className = "tarjetaAlabanza";

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

        tarjeta.addEventListener("click", () => {

            console.log(
                "Abrir:",
                alabanza.nombre
            );

            // Aquí después cargaremos
            // automáticamente la alabanza.

        });

        contenedor.appendChild(tarjeta);

    });

}
