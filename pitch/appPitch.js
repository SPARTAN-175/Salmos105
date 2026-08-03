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
import { inspeccionarWASM } from "./pitch.js";

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

            await capturarAudioPitch(2);

        console.log(

            resultado

        );

        estado.textContent =

            "✅ Audio capturado";

    }

    catch(error){

        console.error(error);

        estado.textContent =

            "❌ Error al capturar audio";

    }

}
