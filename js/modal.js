// =====================================
// MODAL SALMOS 105
// =====================================

let aceptar = null;

const modal = document.getElementById("modal");
const titulo = document.getElementById("modalTitulo");
const mensaje = document.getElementById("modalMensaje");
const input = document.getElementById("modalInput");

const btnAceptar =
    document.getElementById("btnAceptarModal");

const btnCancelar =
    document.getElementById("btnCancelarModal");

/**
 * Modal con campo de texto
 */
export function abrirModal({

    tituloTexto = "",

    mensajeTexto = "",

    placeholder = "",

    valor = "",

    textoBoton = "Aceptar",

    onAceptar

}){

    titulo.textContent = tituloTexto;

    mensaje.textContent = mensajeTexto;

    input.style.display = "block";

    input.placeholder = placeholder;

    input.value = valor;

    btnAceptar.textContent = textoBoton;

    aceptar = onAceptar;

    modal.classList.remove("oculto");

    input.focus();

}

/**
 * Modal de confirmación
 */
export function abrirConfirmacion({

    tituloTexto = "",

    mensajeTexto = "",

    textoBoton = "Aceptar",

    onAceptar

}){

    titulo.textContent = tituloTexto;

    mensaje.textContent = mensajeTexto;

    // Ocultar el input
    input.style.display = "none";

    btnAceptar.textContent = textoBoton;

    aceptar = onAceptar;

    modal.classList.remove("oculto");

}

/**
 * Cerrar modal
 */
export function cerrarModal(){

    modal.classList.add("oculto");

    input.style.display = "block";

    input.value = "";

}

btnCancelar.onclick = cerrarModal;

modal.onclick = e=>{

    if(e.target===modal){

        cerrarModal();

    }

};

btnAceptar.onclick=()=>{

    if(aceptar){

        if(input.style.display==="none"){

            aceptar();

        }else{

            aceptar(

                input.value.trim()

            );

        }

    }

};
