// =====================================
// SALMOS 115
// Controlador Detector de Nota
// =====================================

/*=====================================
    INICIAR
=====================================*/
import { detectarNotaDesdeFrecuencia } from "./pitch.js";
import { frecuenciaANota } from "./frecuencia.js";
import { capturarAudioPitch } from "./capturaPitch.js";
import { inspeccionarExtractor } from "./pitch.js";
import { detectarFrecuencia } from "./pitch.js";
import { obtenerCircul } from "./acordes.js";

export function iniciarPitch(){

    console.log(

        "🎤 Detector de nota listo."

    );

    const boton =

        document.getElementById(

            "btnDetectarNota"

        );

    if(!boton){

        console.error(

            "No existe el botón del detector."

        );

        return;

    }

    boton.addEventListener(

        "click",

        detectarNota

    );

}

/*=====================================
    DETECTAR NOTA
=====================================*/

async function detectarNota(){

    console.log(

        "🎤 Botón Detectar Nota presionado."

    );

    inspeccionarExtractor();

    const estado =

        document.getElementById(

            "estadoPitch"

        );

    estado.textContent =

        "🎤 Escuchando...";

    try{

        const resultado =

            await capturarAudioPitch(4);

        console.log(

            resultado

        );
        const pitch =

    detectarFrecuencia(

        resultado.audio,

        resultado.sampleRate

    );

console.log(pitch);

        

        if(pitch){

    estado.textContent =

        `🎵 Nota detectada: ${pitch}`;

    const acordes =

    obtenerCirculo(

        pitch

    );

console.log(

    acordes

);

}

else{

    estado.textContent =

        "❌ No se pudo detectar la nota";

}

    }

    catch(error){

        console.error(error);

        estado.textContent =

            "❌ Error al capturar audio";

    }

}
