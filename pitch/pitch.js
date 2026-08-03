// =====================================
// SALMOS 115
// Detector de Nota
// =====================================

import { frecuenciaANota } from "./frecuencia.js";
import { obtenerWASM } from "../js/essentia.js";

/*=====================================
    INSPECCIONAR WASM
=====================================*/

export function inspeccionarWASM(){

    const wasm = obtenerWASM();

    console.log("🎼 WASM:");

    console.log(wasm);

    console.log("🎼 Métodos relacionados con Pitch:");

    console.log(

        Object.keys(wasm)

            .filter(nombre =>

                nombre.toLowerCase().includes("pitch")

            )

    );

}

/*=====================================
    DETECTAR NOTA
=====================================*/

export function detectarNotaDesdeFrecuencia(

    frecuencia

){

    console.log(

        "🎵 Frecuencia recibida:",

        frecuencia

    );

    const resultado =

        frecuenciaANota(

            frecuencia

        );

    console.table(

        resultado

    );

    return resultado;

}
