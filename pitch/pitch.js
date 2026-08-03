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

    const nombres = [];

let proto = extractor;

while(proto){

    nombres.push(

        ...Object.getOwnPropertyNames(proto)

    );

    proto = Object.getPrototypeOf(proto);

}

const unicos = [...new Set(nombres)];

console.log(

    "Total:",

    unicos.length

);

console.log(

    unicos.filter(

        nombre =>

            nombre.toLowerCase().includes("pitch")

    )

);

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
