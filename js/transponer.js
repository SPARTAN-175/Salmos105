import { NOTAS } from "./constantes.js";
import { actualizarTodos } from "./ui.js";

let semitonos = 0;

const valor = document.getElementById("valorSemitono");
const btnMas = document.getElementById("btnMas");
const btnMenos = document.getElementById("btnMenos");

/*=====================================
    CAMBIAR UNA NOTA
=====================================*/

function transponerNota(nota, pasos){

    let indice = NOTAS.indexOf(nota);

    if(indice === -1) return nota;

    indice = (indice + pasos) % NOTAS.length;

    if(indice < 0){

        indice += NOTAS.length;

    }

    return NOTAS[indice];

}

/*=====================================
    TRANSPONER TODOS LOS ACORDES
=====================================*/

function aplicarCambio(pasos){

    const selects =
        document.querySelectorAll(".acorde select");

    selects.forEach(select=>{

        select.value =
            transponerNota(select.value,pasos);

    });

    actualizarTodos();

}

/*=====================================
    SUBIR
=====================================*/

function subir(){

    semitonos++;

    valor.textContent = semitonos;

    aplicarCambio(1);

}

/*=====================================
    BAJAR
=====================================*/

function bajar(){

    semitonos--;

    valor.textContent = semitonos;

    aplicarCambio(-1);

}

/*=====================================
    EVENTOS
=====================================*/

btnMas.addEventListener("click",subir);

btnMenos.addEventListener("click",bajar);
