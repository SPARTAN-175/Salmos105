// =====================================
// SALMOS 115
// Conversión Hz -> Nota
// =====================================

import { NOTAS } from "./notas.js";

/*=====================================
    FRECUENCIA A NOTA
=====================================*/

export function frecuenciaANota(frecuencia){

    if(

        frecuencia <= 0 ||

        !isFinite(frecuencia)

    ){

        return null;

    }

    // --------------------------
    // MIDI
    // --------------------------

    const midi = Math.round(

        69 +

        12 *

        Math.log2(

            frecuencia / 440

        )

    );

    // --------------------------
    // NOTA
    // --------------------------

    const indice =

        ((midi % 12) + 12) % 12;

    const nota =

        NOTAS[indice];

    // --------------------------
    // OCTAVA
    // --------------------------

    const octava =

        Math.floor(

            midi / 12

        ) - 1;

    return {

        frecuencia,

        midi,

        nota,

        octava

    };

}
