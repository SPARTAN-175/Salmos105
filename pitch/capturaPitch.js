// =====================================
// SALMOS 115
// Captura de audio para Detector de Nota
// =====================================

/*=====================================
    CAPTURAR AUDIO
=====================================*/

export async function capturarAudioPitch(

    segundos = 2

){

    console.log(

        "🎤 Solicitando acceso al micrófono..."

    );

    const stream =

        await navigator.mediaDevices.getUserMedia({

            audio: true

        });

    const contexto =

        new AudioContext();

    const fuente =

        contexto.createMediaStreamSource(

            stream

        );

    const procesador =

        contexto.createScriptProcessor(

            4096,

            1,

            1

        );

    const muestras = [];

    fuente.connect(

        procesador

    );

    procesador.connect(

        contexto.destination

    );

    return new Promise(resolve => {

        procesador.onaudioprocess = evento => {

            muestras.push(

                ...evento.inputBuffer
                    .getChannelData(0)

            );

        };

        console.log(

            "🎤 Escuchando..."

        );

        setTimeout(() => {

            procesador.disconnect();

            fuente.disconnect();

            stream.getTracks()

                .forEach(

                    track => track.stop()

                );

            console.log(

                "✅ Audio capturado"

            );

            resolve({

                audio: new Float32Array(

                    muestras

                ),

                sampleRate:

                    contexto.sampleRate

            });

        },

        segundos * 1000);

    });

}
