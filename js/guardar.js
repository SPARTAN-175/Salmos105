// =====================================
// SALMOS 105
// Guardar configuraciones
// =====================================

import {
    buscarAlabanza,
    agregarAlabanza,
    agregarConfiguracion
} from "./storage.js";

import {
    abrirModal,
    cerrarModal
} from "./modal.js";

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
 * Guarda utilizando el modal
 */
export function guardarConfiguracion() {

    abrirModal({

        tituloTexto: "Guardar alabanza",

        mensajeTexto:
            "Escribe el nombre de la alabanza.",

        placeholder:
            "Ejemplo: Porque Él Vive",

        textoBoton: "Guardar",

        onAceptar: guardar

    });

}

/**
 * Procesa el guardado
 */
function guardar(nombre) {

    if (!nombre) return;

    const configuracion =
        obtenerConfiguracionActual();

    const alabanza =
        buscarAlabanza(nombre);

    // ==========================
    // NUEVA ALABANZA
    // ==========================

    if (!alabanza) {

        agregarAlabanza(nombre);

        agregarConfiguracion(
            nombre,
            configuracion
        );

        cerrarModal();

        alert("✅ Alabanza guardada.");

        return;

    }

    // ==========================
    // EXISTE
    // ==========================

    const repetida =
        alabanza.configuraciones.find(

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

    cerrarModal();

    alert("✅ Configuración agregada.");

}
