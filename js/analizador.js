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
    NORMALIZAR VECTOR
=====================================*/

function normalizar(vector){

    let maximo = 0;

    for(let i = 0; i < vector.length; i++){

        if(vector[i] > maximo){

            maximo = vector[i];

        }

    }

    if(maximo === 0){

        return vector;

    }

    for(let i = 0; i < vector.length; i++){

        vector[i] /= maximo;

    }

    return vector;

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
    // ==========================

    const promedio = new Float32Array(12);

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

            for(

                let i = 0;

                i < 12;

                i++

            ){

                promedio[i] += hpcp[i];

            }

            framesUtiles++;

        }

        catch(error){

            console.warn(error);

        }

    }

    console.log(

        "🎵 Frames útiles:",

        framesUtiles,

        "de",

        listaFrames.length

    );

    // ==========================
    // PROMEDIO
    // ==========================

    if(framesUtiles === 0){

        console.warn(

            "No hubo suficiente audio."

        );

        return null;

    }

    for(

        let i = 0;

        i < 12;

        i++

    ){

        promedio[i] /= framesUtiles;

    }

    normalizar(promedio);

    console.log("🎼 HPCP Final:");

    console.table(

        {

            C: promedio[0],

            "C#": promedio[1],

            D: promedio[2],

            "D#": promedio[3],

            E: promedio[4],

            F: promedio[5],

            "F#": promedio[6],

            G: promedio[7],

            "G#": promedio[8],

            A: promedio[9],

            "A#": promedio[10],

            B: promedio[11]

        }

    );

    return promedio;

}
