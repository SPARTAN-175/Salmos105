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

        // ==========================
        // CAPTURAR AUDIO
        // ==========================

        const audioCapturado = await capturarAudio(5);

        // ==========================
        // OBTENER TODOS LOS HPCP
        // ==========================

        const listaHPCP = await analizarAudio(

            audioCapturado.audio,

            audioCapturado.sampleRate

        );

        if(!listaHPCP || listaHPCP.length === 0){

            alert("No fue posible analizar el audio.");

            return;

        }

        // ==========================
        // DETECTAR TONALIDAD
        // ==========================

        const detector = new DetectorTonalidad();

        const resultado = detector.analizar(

            listaHPCP

        );

        console.log("🎼 RESULTADO FINAL");

        console.table(resultado);

        // ==========================
        // MOSTRAR RESULTADO
        // ==========================

        alert(

            "🎼 Tonalidad detectada\n\n" +

            resultado.nota +

            " " +

            resultado.escala +

            "\n\nConfianza: " +

            resultado.confianza.toFixed(1) +

            "%"

        );

        // ==================================================
        // AQUÍ DESPUÉS CONECTAREMOS LA TRANSPOSICIÓN
        // transponerATono(resultado.nota);
        // ==================================================

    }

    catch(error){

        console.error(error);

        alert("No fue posible acceder al micrófono.");

    }

}
