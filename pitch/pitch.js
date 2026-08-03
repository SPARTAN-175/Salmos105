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

    const frameSize = 2048;

    const hopSize = 1024;

    console.log(

        "🎤 Recorriendo audio..."

    );

    for(

        let inicio = 0;

        inicio + frameSize <= audio.length;

        inicio += hopSize

    ){

        const frame =

            extractor.arrayToVector(

                audio.slice(

                    inicio,

                    inicio + frameSize

                )

            );

       const resultado =

    extractor.PitchYin(

        frame,

        frameSize,

        true,

        1000,

        60,

        sampleRate,

        0.15

    );

// Ignorar resultados poco confiables

if(

    resultado.pitchConfidence < 0.90

){

    continue;

}

const nota =

    frecuenciaANota(

        resultado.pitch

    );

console.log(

    nota

);
    }

    return null;

}
