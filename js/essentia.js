// =====================================
// SALMOS 115
// Motor Essentia
// =====================================

let wasm = null;
let extractor = null;
let inicializado = false;

/*=====================================
    INICIALIZAR
=====================================*/

export async function iniciarEssentia(){

    if(inicializado){

        return extractor;

    }

    console.log("🎵 Iniciando Essentia...");

    try{

        wasm = await EssentiaWASM();

        extractor = new EssentiaExtractor(wasm);

        inicializado = true;

        console.log("✅ Essentia lista");

        return extractor;

    }

    catch(error){

        console.error(

            "❌ Error iniciando Essentia"

        );

        console.error(error);

        throw error;

    }

}

/*=====================================
    OBTENER EXTRACTOR
=====================================*/

export function obtenerExtractor(){

    if(!inicializado){

        throw new Error(

            "Essentia aún no ha sido inicializada."

        );

    }

    return extractor;

}

/*=====================================
    ESTADO
=====================================*/

export function estaLista(){

    return inicializado;

}
