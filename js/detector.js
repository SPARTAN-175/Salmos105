//====================================================
// detector.js
// Salmos 115
// MÓDULO 1
//====================================================

let audioContext = null;
let mediaStream = null;
let sourceNode = null;
let processorNode = null;

let wasm = null;
let essentia = null;
let extractor = null;

let iniciado = false;
let escuchando = false;

//-------------------------------------------
// Configuración
//-------------------------------------------

const SAMPLE_RATE = 44100;

const BUFFER_SIZE = 4096;

const FRAME_SIZE = 4096;

const HOP_SIZE = 2048;

//-------------------------------------------
// Buffer de audio
//-------------------------------------------

let audioBuffer = [];

const MAX_BUFFER = SAMPLE_RATE * 20;

//====================================================
// Inicialización pública
//====================================================

export async function inicializarDetector() {

    if (iniciado) return;

    console.log("==================================");
    console.log("Inicializando detector...");
    console.log("==================================");

    try {

        //-----------------------------------
        // Cargar WASM
        //-----------------------------------

        wasm = await EssentiaWASM();

        //-----------------------------------
        // Crear instancia Essentia
        //-----------------------------------

        essentia = new Essentia(wasm);

        //-----------------------------------
        // Crear extractor
        //-----------------------------------

        extractor = new EssentiaExtractor(essentia);

        iniciado = true;

        console.log("✓ Essentia cargado");

        //-----------------------------------
        // Iniciar micrófono
        //-----------------------------------

        await iniciarMicrofono();

    }
    catch (error) {

        console.error(error);

    }

}

//====================================================
// Micrófono
//====================================================

async function iniciarMicrofono() {

    if (escuchando) return;

    mediaStream =
        await navigator.mediaDevices.getUserMedia({

            audio: {

                echoCancellation: false,

                noiseSuppression: false,

                autoGainControl: false

            }

        });

    audioContext =
        new AudioContext({

            sampleRate: SAMPLE_RATE

        });

    sourceNode =
        audioContext.createMediaStreamSource(

            mediaStream

        );

    processorNode =
        audioContext.createScriptProcessor(

            BUFFER_SIZE,

            1,

            1

        );

    processorNode.onaudioprocess = procesarEntrada;

    sourceNode.connect(processorNode);

    processorNode.connect(audioContext.destination);

    escuchando = true;

    console.log("✓ Micrófono iniciado");

}

//====================================================
// Audio
//====================================================

function procesarEntrada(event) {

    const input =
        event.inputBuffer.getChannelData(0);

    for (let i = 0; i < input.length; i++) {

        audioBuffer.push(input[i]);

    }

    //---------------------------------------

    while (audioBuffer.length > MAX_BUFFER) {

        audioBuffer.shift();

    }

    //---------------------------------------

    if (audioBuffer.length >= FRAME_SIZE) {

        procesarFrame();

    }

}

//====================================================
// Próximo módulo
//====================================================

function procesarFrame() {

    // Aquí irá FFT

}

//====================================================
// API pública
//====================================================

export function detenerDetector() {

    escuchando = false;

    if (processorNode) {

        processorNode.disconnect();

        processorNode = null;

    }

    if (sourceNode) {

        sourceNode.disconnect();

        sourceNode = null;

    }

    if (mediaStream) {

        mediaStream
            .getTracks()
            .forEach(track => track.stop());

        mediaStream = null;

    }

    if (audioContext) {

        audioContext.close();

        audioContext = null;

    }

    console.log("Detector detenido");

}
