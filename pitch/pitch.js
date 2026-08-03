// =====================================
// SALMOS 115
// Detector de Nota
// =====================================

import { frecuenciaANota } from "./frecuencia.js";
import { obtenerWASM } from "../js/essentia.js";

import { obtenerExtractor } from "../js/essentia.js";

/*=====================================
    INSPECCIONAR EXTRACTOR
=====================================*/

export function inspeccionarExtractor(){

    const extractor = obtenerExtractor();

    console.log("🎼 Extractor:");

    console.log(extractor);

    let proto = extractor;

    while(proto){

        console.log(

            Object.getOwnPropertyNames(proto)

        );

        proto = Object.getPrototypeOf(proto);

    }

}
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
