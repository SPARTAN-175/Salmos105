// =====================================
// SALMOS 115
// Motor de análisis musical
// =====================================

let essentia = null;
let wasm = null;

/**
 * Inicializa Essentia
 */
export async function inicializarDetector() {

    try {

        console.log("🎵 Inicializando motor musical...");

        // Cargar WASM
        wasm = await EssentiaWASM();

        // Crear instancia
        essentia = new Essentia(wasm);

        console.log("✅ Motor musical listo");

        return true;

    } catch (error) {

        console.error("❌ Error al iniciar Essentia");

        console.error(error);

        return false;

    }

}

/**
 * Devuelve la instancia
 */
export function obtenerEssentia() {

    return essentia;

}
