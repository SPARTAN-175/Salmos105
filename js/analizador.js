// =====================================
// SALMOS 115
// Analizador musical
// =====================================

import { obtenerExtractor } from "./essentia.js";

/*=====================================
    ANALIZAR AUDIO
=====================================*/

export async function analizarAudio(audio, sampleRate){

    console.log("🎼 Iniciando análisis...");

    const extractor = obtenerExtractor();

    console.log("✅ Extractor obtenido");

    console.log(extractor);

  
    console.log(extractor.hpcpExtractor.toString());
    
    
    
    
    console.log("Métodos disponibles:");

console.log(

    Object.getOwnPropertyNames(

        Object.getPrototypeOf(extractor)

    )

);




    

    console.log("SampleRate:", sampleRate);

console.log("Muestras:", audio.length);

// =====================================
// ANALIZAR TODA LA CAPTURA
// =====================================

const frameSize = 4096;
const hopSize = 2048;

const promedio = new Float32Array(12);

let cantidadFrames = 0;

for (

    let inicio = 0;

    inicio + frameSize <= audio.length;

    inicio += hopSize

){

    const frame = audio.slice(

        inicio,

        inicio + frameSize

    );

    try{

        const hpcp = extractor.hpcpExtractor(

            frame,

            sampleRate

        );

        for(

            let i=0;

            i<12;

            i++

        ){

            promedio[i] += hpcp[i];

        }

        cantidadFrames++;

    }

    catch(error){

        console.warn(

            "Frame ignorado",

            error

        );

    }

}

console.log(

    "Frames analizados:",

    cantidadFrames

);

// Promedio

for(

    let i=0;

    i<12;

    i++

){

    promedio[i] /= cantidadFrames;

}

console.log("🎼 HPCP Promedio:");

console.log(promedio);

return promedio;

}
