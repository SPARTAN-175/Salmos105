// =====================================
// SALMOS 115
// Menú principal
// =====================================

import { obtenerVersion } from "./version.js";

import { buscarActualizacion } from "./actualizador.js";

export function iniciarMenu(){

    const boton = document.getElementById("btnMenu");
    const fondo = document.getElementById("menuFondo");
    const menu = document.getElementById("menuApp");
    const version = document.getElementById("menuVersion");

    if(!boton || !fondo || !menu){

        return;

    }

    const datos = obtenerVersion();

    if(datos){

        version.textContent = `Versión ${datos.version}`;

    }
    const btnBuscarActualizacion =
    document.getElementById(
        "btnBuscarActualizacion"
    );

    // ==========================
// NUESTRA MISIÓN
// ==========================

const btnAcerca =
document.getElementById(
    "btnAcerca"
);

const modalAcerca =
document.getElementById(
    "modalAcerca"
);

const btnCerrarAcerca =
document.getElementById(
    "btnCerrarAcerca"
);
    
    btnBuscarActualizacion.addEventListener(

    "click",

    buscarActualizacion

);

    // Abrir "Nuestra misión"

btnAcerca.addEventListener(

    "click",

    ()=>{

        fondo.classList.add("oculto");

        modalAcerca.classList.remove(

            "oculto"

        );

    }

);

// Cerrar

btnCerrarAcerca.addEventListener(

    "click",

    ()=>{

        modalAcerca.classList.add(

            "oculto"

        );

    }

);

// Cerrar tocando fuera

modalAcerca.addEventListener(

    "click",

    (e)=>{

        if(

            e.target === modalAcerca

        ){

            modalAcerca.classList.add(

                "oculto"

            );

        }

    }

);

    // Abrir / cerrar con el botón
    boton.addEventListener("click",(e)=>{

        e.stopPropagation();

        fondo.classList.toggle("oculto");

    });

    // Evitar que se cierre al hacer clic dentro
    menu.addEventListener("click",(e)=>{

        e.stopPropagation();

    });

    // Cerrar al hacer clic en cualquier parte
    document.addEventListener("click",()=>{

        fondo.classList.add("oculto");

    });

    document.getElementById("btnAnalizarCancion")
    .addEventListener("click", () => {

        mostrarToast(

            "Próximamente disponible",

            "advertencia"

        );

    });

}
