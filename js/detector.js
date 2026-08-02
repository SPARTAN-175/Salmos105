// detector.js
// Detección de tonalidad usando Essentia + HPCP
// Compatible con essentia.js-extractor.umd.js

class KeyDetector {

    constructor() {

        this.audioCtx = null;
        this.essentia = null;
        this.extractor = null;

        // Perfiles de Krumhansl
        this.majorProfile = [
            6.35,
            2.23,
            3.48,
            2.33,
            4.38,
            4.09,
            2.52,
            5.19,
            2.39,
            3.66,
            2.29,
            2.88
        ];

        this.minorProfile = [
            6.33,
            2.68,
            3.52,
            5.38,
            2.60,
            3.53,
            2.54,
            4.75,
            3.98,
            2.69,
            3.34,
            3.17
        ];

        this.noteNames = [
            "C",
            "C#",
            "D",
            "D#",
            "E",
            "F",
            "F#",
            "G",
            "G#",
            "A",
            "A#",
            "B"
        ];
    }

    async init() {

        if (this.extractor) return;

        this.audioCtx = new AudioContext();

        const wasm = await EssentiaWASM();

        this.extractor = new EssentiaExtractor(wasm);

    }

    async detect(file) {

        await this.init();

        const arrayBuffer = await file.arrayBuffer();

        const audioBuffer =
            await this.audioCtx.decodeAudioData(arrayBuffer);

        const signal =
            this.extractor.audioBufferToMonoSignal(audioBuffer);

        const frameSize = 4096;
        const hopSize = 2048;

        const chroma = new Array(12).fill(0);

        let frames = 0;

        for (
            let i = 0;
            i + frameSize < signal.length;
            i += hopSize
        ) {

            const frame = signal.slice(i, i + frameSize);

            try {

                const hpcp =
                    this.extractor.hpcpExtractor(
                        frame,
                        audioBuffer.sampleRate
                    );

                for (let j = 0; j < 12; j++) {
                    chroma[j] += hpcp[j];
                }

                frames++;

            } catch (e) {

                // Ignorar cuadros problemáticos

            }

        }

        if (frames === 0) {

            throw new Error("No fue posible analizar el audio.");

        }

        for (let i = 0; i < 12; i++) {

            chroma[i] /= frames;

        }

        return this.detectKey(chroma);

    }

    detectKey(chroma) {

        let bestKey = 0;
        let bestMode = "major";
        let bestScore = -Infinity;

        for (let shift = 0; shift < 12; shift++) {

            const majorScore =
                this.correlation(
                    chroma,
                    this.rotate(this.majorProfile, shift)
                );

            if (majorScore > bestScore) {

                bestScore = majorScore;
                bestKey = shift;
                bestMode = "major";

            }

            const minorScore =
                this.correlation(
                    chroma,
                    this.rotate(this.minorProfile, shift)
                );

            if (minorScore > bestScore) {

                bestScore = minorScore;
                bestKey = shift;
                bestMode = "minor";

            }

        }

        let confidence = (bestScore + 1) / 2;

        confidence = Math.max(0, Math.min(1, confidence));

        return {

            key: this.noteNames[bestKey],

            scale: bestMode,

            confidence: Number(confidence.toFixed(2))

        };

    }

    rotate(arr, shift) {

        const out = [];

        for (let i = 0; i < arr.length; i++) {

            out.push(arr[(i + shift) % arr.length]);

        }

        return out;

    }

    correlation(a, b) {

        let meanA = 0;
        let meanB = 0;

        for (let i = 0; i < a.length; i++) {

            meanA += a[i];
            meanB += b[i];

        }

        meanA /= a.length;
        meanB /= b.length;

        let num = 0;
        let denA = 0;
        let denB = 0;

        for (let i = 0; i < a.length; i++) {

            const x = a[i] - meanA;
            const y = b[i] - meanB;

            num += x * y;
            denA += x * x;
            denB += y * y;

        }

        return num / Math.sqrt(denA * denB);

    }

}

window.keyDetector = new KeyDetector();
