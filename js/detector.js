/*
=========================================================
 Salmos 115
 detector.js

 Módulo 1
 - Inicialización
 - Micrófono
 - AudioContext
 - Ring Buffer
=========================================================
*/

class DetectorTonalidad {

    constructor() {

        //-------------------------------------------------
        // Estado
        //-------------------------------------------------

        this.iniciado = false;
        this.escuchando = false;

        //-------------------------------------------------
        // Audio
        //-------------------------------------------------

        this.audioContext = null;
        this.stream = null;
        this.source = null;
        this.processor = null;

        //-------------------------------------------------
        // Essentia
        //-------------------------------------------------

        this.wasm = null;
        this.essentia = null;
        this.extractor = null;

        //-------------------------------------------------
        // Configuración
        //-------------------------------------------------

        this.sampleRate = 44100;

        this.bufferSize = 4096;

        this.frameSize = 4096;

        this.hopSize = 2048;

        //-------------------------------------------------
        // Buffer circular
        //-------------------------------------------------

        this.audioBuffer = [];

        this.maxSamples = this.sampleRate * 20;

        //-------------------------------------------------
        // Historial
        //-------------------------------------------------

        this.historial = [];

        this.ultimaTonalidad = null;

        this.confianza = 0;

    }

    //-----------------------------------------------------
    // Inicializar Essentia
    //-----------------------------------------------------

    async init(){

        if(this.iniciado){
            return;
        }

        console.log("Inicializando Essentia...");

        this.wasm = await EssentiaWASM();

        this.essentia = new Essentia(this.wasm);

        this.extractor = new EssentiaExtractor(this.essentia);

        this.iniciado = true;

        console.log("Essentia inicializado");

    }

    //-----------------------------------------------------
    // Iniciar micrófono
    //-----------------------------------------------------

    async start(){

        if(!this.iniciado){

            await this.init();

        }

        if(this.escuchando){

            return;

        }

        console.log("Solicitando micrófono...");

        this.stream =
            await navigator.mediaDevices.getUserMedia({

                audio:{

                    echoCancellation:false,

                    noiseSuppression:false,

                    autoGainControl:false

                }

            });

        //-------------------------------------------------

        this.audioContext =
            new AudioContext({

                sampleRate:this.sampleRate

            });

        //-------------------------------------------------

        this.source =
            this.audioContext.createMediaStreamSource(

                this.stream

            );

        //-------------------------------------------------

        this.processor =
            this.audioContext.createScriptProcessor(

                this.bufferSize,

                1,

                1

            );

        //-------------------------------------------------

        this.processor.onaudioprocess =
            (event)=>{

                const canal =
                    event.inputBuffer.getChannelData(0);

                this.recibirAudio(canal);

            };

        //-------------------------------------------------

        this.source.connect(this.processor);

        this.processor.connect(

            this.audioContext.destination

        );

        this.escuchando = true;

        console.log("Micrófono iniciado");

    }

    //-----------------------------------------------------
    // Detener
    //-----------------------------------------------------

    stop(){

        if(!this.escuchando){

            return;

        }

        this.escuchando = false;

        if(this.processor){

            this.processor.disconnect();

            this.processor = null;

        }

        if(this.source){

            this.source.disconnect();

            this.source = null;

        }

        if(this.stream){

            this.stream.getTracks()

                .forEach(track=>track.stop());

            this.stream = null;

        }

        if(this.audioContext){

            this.audioContext.close();

            this.audioContext = null;

        }

        console.log("Detector detenido");

    }

    //-----------------------------------------------------
    // Recibir audio
    //-----------------------------------------------------

    recibirAudio(data){

        for(let i=0;i<data.length;i++){

            this.audioBuffer.push(data[i]);

        }

        //-------------------------------------------------

        while(

            this.audioBuffer.length >

            this.maxSamples

        ){

            this.audioBuffer.shift();

        }

        //-------------------------------------------------

        if(

            this.audioBuffer.length >=

            this.frameSize

        ){

            this.procesar();

        }

    }

    //-----------------------------------------------------
    // Procesamiento
    //-----------------------------------------------------

    procesar(){

        // Módulo 2

    }

}

window.detector =
    new DetectorTonalidad();
