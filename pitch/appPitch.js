// =====================================
// SALMOS 115
// Controlador Detector de Nota
// =====================================

/*=====================================
    INICIAR
=====================================*/
import { detectarNotaDesdeFrecuencia } from "./pitch.js";
import { frecuenciaANota } from "./frecuencia.js";

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

function detectarNota(){

    console.log(

        "🎤 Botón Detectar Nota presionado."

    );

    const estado =

        document.getElementById(

            "estadoPitch"

        );

    estado.textContent =

        "🎤 Probando detector...";

    const resultado =

        detectarNotaDesdeFrecuencia(

            329.63

        );

    estado.textContent =

        "Nota detectada: " +

        resultado.nota;

}
