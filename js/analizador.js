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

  
    
    
    
    
    
    console.log("Métodos disponibles:");

console.log(

    Object.getOwnPropertyNames(

        Object.getPrototypeOf(extractor)

    )

);




    

    console.log("SampleRate:", sampleRate);

    console.log("Muestras:", audio.length);

    return true;

}
