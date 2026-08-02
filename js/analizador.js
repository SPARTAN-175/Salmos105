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
// PRIMERA PRUEBA CON HPCP
// =====================================

const frameSize = 4096;

// Tomamos un fragmento del centro de la grabación
const inicio = Math.floor((audio.length - frameSize) / 2);

const frame = audio.slice(

    inicio,

    inicio + frameSize

);

console.log("🎵 Analizando frame:", frame.length);

const hpcp = extractor.hpcpExtractor(

    frame,

    sampleRate

);

console.log("🎼 HPCP obtenido:");

console.log(hpcp);

return hpcp;

}
