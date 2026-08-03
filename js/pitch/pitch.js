// =====================================
// SALMOS 115
// Detector de nota
// =====================================

import { obtenerExtractor } from "./essentia.js";

export function mostrarAlgoritmosPitch(){

    const extractor = obtenerExtractor();

    console.log("🎤 Buscando algoritmos de Pitch...");

    console.log(

        Object.keys(extractor)

            .filter(nombre =>

                nombre.toLowerCase()

                .includes("pitch")

            )

    );

}
