import {
    CODIGOS,
    RUTA_ACORDES
} from "./constantes.js";

function obtenerRutaImagen(nota, menor, septima){

    let nombre = CODIGOS[nota];

    if(menor){

        nombre += "m";

    }

    if(septima){

        nombre += "7";

    }

    return `${RUTA_ACORDES}${nombre}.png`;

}

export function actualizarImagen(i){

    const nota = document.getElementById(`nota${i}`);
    const menor = document.getElementById(`menor${i}`);
    const septima = document.getElementById(`septima${i}`);
    const imagen = document.getElementById(`img${i}`);

    if(!nota || !imagen) return;

    const ruta = obtenerRutaImagen(
        nota.value,
        menor.checked,
        septima.checked
    );

    imagen.src = ruta;

    imagen.alt = nota.value;

    imagen.onclick = () => abrirVisor(
        ruta,
        nota.value +
        (menor.checked ? "m" : "") +
        (septima.checked ? "7" : "")
    );

}

export function actualizarTodos(){

    const total =
        document.querySelectorAll(".acorde").length;

    for(let i=1;i<=total;i++){

        actualizarImagen(i);

    }

}

function abrirVisor(imagen,nombre){

    document
        .getElementById("tituloVisor")
        .textContent = nombre;

    document
        .getElementById("imagenVisor")
        .src = imagen;

    document
        .getElementById("visorAcorde")
        .classList.remove("oculto");

}

document.addEventListener("DOMContentLoaded",()=>{

    const visor =
        document.getElementById("visorAcorde");

    visor.addEventListener("click",()=>{

        visor.classList.add("oculto");

    });

});
