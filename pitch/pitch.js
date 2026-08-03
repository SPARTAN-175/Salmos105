// =====================================
// SALMOS 115
// Detector de Nota
// =====================================

import { frecuenciaANota } from "./frecuencia.js";

/*=====================================
    DETECTAR NOTA
=====================================*/

export function detectarNotaDesdeFrecuencia(

    frecuencia

){

    console.log(

        "🎵 Frecuencia recibida:",

        frecuencia

    );

    const resultado =

        frecuenciaANota(

            frecuencia

        );

    console.table(

        resultado

    );

    return resultado;

}
