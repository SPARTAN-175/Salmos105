// =====================================
// SALMOS 115
// Detector de tono
// =====================================

const NOTAS = [

    "Do",
    "Do#",
    "Re",
    "Re#",
    "Mi",
    "Fa",
    "Fa#",
    "Sol",
    "Sol#",
    "La",
    "La#",
    "Si"

];

const A4 = 440;

/**
 * Convierte una frecuencia a nota
 */
function frecuenciaANota(frecuencia){

    const numeroMidi = Math.round(

        69 +

        12 *

        Math.log2(

            frecuencia / A4

        )

    );

    const indice =

        ((numeroMidi % 12) + 12) % 12;

    return NOTAS[indice];

}

/**
 * Detectar tono
 */
export async function detectarTono(){

    const estado =

        document.getElementById(

            "estadoDetector"

        );

    estado.textContent =

        "🎤 Escuchando...";

    try{

        const stream =

            await navigator.mediaDevices

            .getUserMedia({

                audio:true

            });

        const contexto =

            new AudioContext();

        const fuente =

            contexto.createMediaStreamSource(

                stream

            );

        const analizador =

            contexto.createAnalyser();

        analizador.fftSize = 2048;

        fuente.connect(

            analizador

        );

        const datos =

            new Float32Array(

                analizador.fftSize

            );

        setTimeout(()=>{

            analizador.getFloatTimeDomainData(

                datos

            );

            const frecuencia =

                detectarFrecuencia(

                    datos,

                    contexto.sampleRate

                );

            stream

                .getTracks()

                .forEach(

                    t=>t.stop()

                );

            contexto.close();

            if(!frecuencia){

                estado.textContent =

                    "No se detectó tono.";

                return;

            }

            const nota =

                frecuenciaANota(

                    frecuencia

                );

            estado.textContent =

                `Tono detectado: ${nota}`;

        },2000);

    }

    catch{

        estado.textContent =

            "Permiso denegado.";

    }

}

/**
 * Detector sencillo
 * por autocorrelación
 */

function detectarFrecuencia(

    buffer,

    sampleRate

){

    let mejorOffset = -1;

    let mejorCorrelacion = 0;

    for(

        let offset=20;

        offset<1000;

        offset++

    ){

        let correlacion = 0;

        for(

            let i=0;

            i<1000;

            i++

        ){

            correlacion +=

                Math.abs(

                    buffer[i]-

                    buffer[i+offset]

                );

        }

        correlacion =

            1 -

            correlacion/1000;

        if(

            correlacion>

            mejorCorrelacion

        ){

            mejorCorrelacion=

                correlacion;

            mejorOffset=

                offset;

        }

    }

    if(

        mejorCorrelacion<0.85

    ){

        return null;

    }

    return sampleRate/

        mejorOffset;

}
