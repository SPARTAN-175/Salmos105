// =====================================
// SALMOS 115
// Analizador musical
// =====================================

import { obtenerExtractor } from "./essentia.js";

/*=====================================
    ENERGÍA RMS
=====================================*/

function calcularRMS(frame){

    let suma = 0;

    for(let i = 0; i < frame.length; i++){

        suma += frame[i] * frame[i];

    }

    return Math.sqrt(

        suma / frame.length

    );

}

/*=====================================
    ANALIZAR AUDIO
=====================================*/

export async function analizarAudio(audio, sampleRate){

    console.log("🎼 Iniciando análisis...");

    const extractor = obtenerExtractor();

    const frameSize = 4096;

    const hopSize = 2048;

    // ==========================
    // PRIMERA PASADA
    // Calcular RMS
    // ==========================

    const listaFrames = [];

    let maxRMS = 0;

    for(

        let inicio = 0;

        inicio + frameSize <= audio.length;

        inicio += hopSize

    ){

        const frame = audio.slice(

            inicio,

            inicio + frameSize

        );

        const rms = calcularRMS(frame);

        if(rms > maxRMS){

            maxRMS = rms;

        }

        listaFrames.push({

            frame,

            rms

        });

    }

    console.log("🎤 RMS máximo:", maxRMS);

    // ==========================
    // UMBRAL DINÁMICO
    // ==========================

    const umbral = maxRMS * 0.30;

    console.log("🎯 Umbral:", umbral);

    // ==========================
    // SEGUNDA PASADA
    // EXTRAER HPCP
    // ==========================

    const listaHPCP = [];

    let framesUtiles = 0;

    for(const item of listaFrames){

        if(item.rms < umbral){

            continue;

        }

        try{

            const hpcp = extractor.hpcpExtractor(

                item.frame,

                sampleRate

            );

            listaHPCP.push(hpcp);

            framesUtiles++;

        }

        catch(error){

            console.warn(

                "Error analizando frame:",

                error

            );

        }

    }

    console.log(

        "🎵 Frames útiles:",

        framesUtiles,

        "de",

        listaFrames.length

    );

    // ==========================
    // DEVOLVER RESULTADO
    // ==========================

    if(listaHPCP.length === 0){

        console.warn(

            "⚠ No se encontró audio válido."

        );

        return [];

    }

    console.log(

        "🎼 HPCP válidos:",

        listaHPCP.length

    );

    return listaHPCP;

}
