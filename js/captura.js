// =====================================
// SALMOS 115
// Captura de audio desde el micrófono
// =====================================

let audioContext = null;
let mediaStream = null;
let source = null;
let processor = null;

// =====================================
// CAPTURAR AUDIO
// =====================================

export async function capturarAudio(segundos = 5) {

    return new Promise(async (resolve, reject) => {

        try {

            console.log("🎤 Solicitando acceso al micrófono...");

            mediaStream = await navigator.mediaDevices.getUserMedia({

                audio: {

                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false

                }

            });

            audioContext = new AudioContext();

            source = audioContext.createMediaStreamSource(mediaStream);

            processor = audioContext.createScriptProcessor(

                4096,
                1,
                1

            );

            const muestras = [];

            processor.onaudioprocess = (evento) => {

                const input = evento.inputBuffer.getChannelData(0);

                muestras.push(

                    new Float32Array(input)

                );

            };

            source.connect(processor);

            processor.connect(audioContext.destination);

            console.log("🎤 Escuchando...");

            setTimeout(() => {

                processor.disconnect();

                source.disconnect();

                mediaStream.getTracks().forEach(track => {

                    track.stop();

                });

                audioContext.close();

                const total = muestras.reduce(

                    (suma, bloque) => suma + bloque.length,

                    0

                );

                const audio = new Float32Array(total);

                let posicion = 0;

                muestras.forEach(bloque => {

                    audio.set(

                        bloque,

                        posicion

                    );

                    posicion += bloque.length;

                });

                console.log("✅ Audio capturado");

                console.log(

                    "Muestras:",

                    audio.length

                );

               resolve({

    audio,

    sampleRate: audioContext.sampleRate

});

            }, segundos * 1000);

        }

        catch (error) {

            console.error(error);

            reject(error);

        }

    });

}
