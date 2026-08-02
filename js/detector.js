// =====================================
// SALMOS 115
// Detector principal
// =====================================

import { iniciarEssentia } from "./essentia.js";
import { capturarAudio } from "./captura.js";

/*=====================================
    INICIALIZAR
=====================================*/

export async function inicializarDetector(){

    console.log("🎵 Inicializando detector...");

    await iniciarEssentia();

    console.log("✅ Detector listo");

}

/*=====================================
    DETECTAR TONO
=====================================*/

export async function detectarTono(){

    console.log("🎤 Iniciando captura...");

    try{

        const resultado =
            await capturarAudio(5);

        console.log(resultado);

        alert(

            "Audio capturado correctamente.\n\n" +

            "Muestras: " +

            resultado.audio.length +

            "\n\nSampleRate: " +

            resultado.sampleRate

        );

    }

    catch(error){

        console.error(error);

        alert("No fue posible acceder al micrófono.");

    }

}
