// =====================================
// SALMOS 115
// Menú principal
// =====================================

import {

    obtenerVersion

} from "./version.js";

export function iniciarMenu(){

    const boton =

        document.getElementById(

            "btnMenu"

        );

    const fondo =

        document.getElementById(

            "menuFondo"

        );

    const menu =

        document.getElementById(

            "menuApp"

        );

    const version =

        document.getElementById(

            "menuVersion"

        );

    if(

        !boton ||

        !fondo ||

        !menu

    ){

        return;

    }

    const datos =

        obtenerVersion();

    if(datos){

        version.textContent =

            `Versión ${datos.version}`;

    }

    boton.onclick = ()=>{

        fondo.classList.remove(

            "oculto"

        );

    };

    fondo.onclick = ()=>{

        fondo.classList.add(

            "oculto"

        );

    };

    menu.onclick = e=>{

        e.stopPropagation();

    };

}
