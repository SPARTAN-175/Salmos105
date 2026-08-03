// =====================================
// SALMOS 115
// Detector de nota
// =====================================

import { frecuenciaANota } from "./frecuencia.js";

/*=====================================
    PRUEBA
=====================================*/

export function probarFrecuencias(){

    const pruebas = [

        440,
        261.63,
        329.63,
        392.00

    ];

    console.log("🎵 Prueba de conversión Hz → Nota");

    for(const frecuencia of pruebas){

        console.table(

            frecuenciaANota(

                frecuencia

            )

        );

    }

}
