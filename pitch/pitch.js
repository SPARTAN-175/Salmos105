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

        "Total de métodos:",

        unicos.length

    );

    console.log(

        unicos.filter(

            nombre =>

                nombre.toLowerCase().includes(

                    "pitch"

                )

        )

    );

console.log("================================");

console.log(

    extractor.PitchYin.toString()

);

console.log(

    extractor.PitchYin

);

console.log("================================");

console.log("PitchYinFFT:");

console.log(

    extractor.PitchYinFFT.toString()

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


/*=====================================
    DETECTAR FRECUENCIA
=====================================*/

export function detectarFrecuencia(

    audio,

    sampleRate

){

    const extractor =

        obtenerExtractor();

    // Tomamos un frame de 2048 muestras

    const frame =

    extractor.arrayToVector(

        audio.slice(

            0,

            2048

        )

    );

    const resultado =

        extractor.PitchYin(

            frame,

            2048,

            true,

            22050,

            20,

            sampleRate,

            0.15

        );

    console.log(

        "🎵 Resultado PitchYin:"

    );

    console.log(

        resultado

    );

    return resultado;

}
