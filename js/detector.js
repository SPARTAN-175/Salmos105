// =====================================
// SALMOS 115
// Detector principal
// =====================================

import { iniciarEssentia } from "./essentia.js";
import { capturarAudio } from "./captura.js";
import { analizarAudio } from "./analizador.js";
import { DetectorTonalidad } from "./tonalidad.js";
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

        // ==========================
        // ANALIZAR AUDIO
        // ==========================

        const hpcp =

            await analizarAudio(

                resultado.audio,

                resultado.sampleRate

            );

        // ==========================
        // DETECTOR DE TONALIDAD
        // ==========================

        const detector =

            new DetectorTonalidad();

        detector.analizar(

            hpcp

        );

        const tonalidad =

            detector.obtenerResultado();

        console.log(

            "🎼 TONALIDAD FINAL"

        );

        console.table(

            tonalidad

        );

        alert(

            "Tonalidad detectada:\n\n" +

            tonalidad.nota +

            " " +

            tonalidad.escala +

            "\n\nCorrelación: " +

            tonalidad.correlacion.toFixed(4)

        );

    }

    catch(error){

        console.error(error);

        alert(

            "No fue posible acceder al micrófono."

        );

    }

}
