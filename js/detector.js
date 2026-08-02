import { iniciarEssentia } from "./essentia.js";
import { capturarAudio } from "./captura.js";


export async function inicializarDetector(){

    console.log("🎵 Inicializando detector...");

    await iniciarEssentia();

    console.log("✅ Detector listo");

}



export async function detectarTono() {

    console.log("🎤 Iniciando captura...");

    try {

        const resultado =
            await capturarAudio(5);

        console.log(resultado);

        alert(

            "Audio capturado correctamente.\n\n" +

            "Muestras: " +

            resultado.audio.length

        );

    }

    catch(error){

        console.error(error);

        alert("No fue posible acceder al micrófono.");

    }

}

export async function inicializarDetector(){

    console.log("🎵 Detector inicializado");

}
