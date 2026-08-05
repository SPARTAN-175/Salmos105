// =====================================
// SALMOS 115
// Actualizador
// =====================================

import { obtenerVersion } from "./version.js";

/*=====================================
    BUSCAR ACTUALIZACIÓN
=====================================*/

export async function buscarActualizacion(){

    try{

        // Versión instalada

        const local = obtenerVersion();

        // Versión publicada (ignora caché)

        const respuesta = await fetch(

            `version.json?t=${Date.now()}`,

            {

                cache: "no-store"

            }

        );

        const servidor = await respuesta.json();

        console.log("📦 Local:", local);

        console.log("🌎 Servidor:", servidor);

        if(

            local.version === servidor.version &&

            local.build === servidor.build

        ){

            alert("✅ Ya tienes la última versión.");

            return;

        }

        alert(

            `Nueva versión disponible\n\n` +

            `${servidor.version}`

        );

    }

    catch(error){

        console.error(error);

        alert(

            "No fue posible buscar actualizaciones."

        );

    }

}
