// =====================================
// SALMOS 115
// Información de la versión
// =====================================

let informacionVersion = null;

/*=====================================
    CARGAR VERSIÓN
=====================================*/

export async function cargarVersion(){

    try{

        const respuesta = await fetch(

            "version.json",

            {

                cache:"no-store"

            }

        );

        informacionVersion =

            await respuesta.json();

        console.log(

            "📦 Versión instalada:",

            informacionVersion

        );

    }

    catch(error){

        console.error(

            "No fue posible leer version.json",

            error

        );

    }

}

/*=====================================
    OBTENER INFORMACIÓN
=====================================*/

export function obtenerVersion(){

    return informacionVersion;

}
