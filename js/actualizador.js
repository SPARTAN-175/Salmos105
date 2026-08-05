// =====================================
// SALMOS 115
// Actualizador
// =====================================

import { mostrarToast } from "./toast.js";

export async function buscarActualizacion(){

    if(!("serviceWorker" in navigator)){

        mostrarToast(

            "Este navegador no soporta PWA.",

            "error"

        );

        return;

    }

    try{

        mostrarToast(

            "🔄 Buscando actualización...",

            "advertencia"

        );

        const registro =

            await navigator.serviceWorker.getRegistration();

        if(!registro){

            mostrarToast(

                "No hay Service Worker instalado.",

                "error"

            );

            return;

        }

        // Fuerza al navegador a revisar si existe una nueva versión

        await registro.update();

        console.log(

            "🔄 Revisión de actualización solicitada."

        );

        mostrarToast(

            "✔ Revisión completada.",

            "exito"

        );

    }

    catch(error){

        console.error(error);

        mostrarToast(

            "No fue posible buscar actualizaciones.",

            "error"

        );

    }

}
