// =====================================
// SALMOS 105
// Guardar configuraciones
// =====================================

import {

    agregarAlabanza,
    agregarConfiguracion,
    buscarAlabanza

} from "./storage.js";

/**
 * Obtiene la configuración actual
 */
function obtenerConfiguracionActual() {

    const acordes = [];

    const total =
        document.querySelectorAll(".acorde").length;

    for (let i = 1; i <= total; i++) {

        acordes.push({

            nota:
                document.getElementById(`nota${i}`).value,

            menor:
                document.getElementById(`menor${i}`).checked,

            septima:
                document.getElementById(`septima${i}`).checked

        });

    }

    return {

        tono: acordes[0].nota,

        fecha: Date.now(),

        acordes

    };

}

/**
 * Guarda la configuración
 */
export function guardarConfiguracion() {

    const nombre = prompt(

        "Nombre de la alabanza"

    );

    if (!nombre) return;

    const configuracion =
        obtenerConfiguracionActual();

    const existe =
        buscarAlabanza(nombre);

    if (!existe) {

        agregarAlabanza(nombre);

        agregarConfiguracion(

            nombre,

            configuracion

        );

        alert("✅ Alabanza guardada.");

        return;

    }

    const agregar = confirm(

        `La alabanza "${nombre}" ya existe.\n\n` +

        "¿Deseas agregar esta nueva configuración?"

    );

    if (!agregar) return;

    // Evitar guardar dos veces la misma tonalidad
    const repetida = existe.configuraciones.find(

        c => c.tono === configuracion.tono

    );

    if (repetida) {

        alert(

            "Ya existe una configuración en " +

            configuracion.tono

        );

        return;

    }

    agregarConfiguracion(

        nombre,

        configuracion

    );

    alert("✅ Configuración agregada.");

}
