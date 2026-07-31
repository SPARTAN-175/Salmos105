
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

    input.placeholder = placeholder;

    input.value = valor;

    btnAceptar.textContent = textoBoton;

    aceptar = onAceptar;

    modal.classList.remove("oculto");

    input.focus();

}

export function cerrarModal(){

    modal.classList.add("oculto");

}

btnCancelar.onclick = cerrarModal;

modal.onclick = e=>{

    if(e.target===modal){

        cerrarModal();

    }

};

btnAceptar.onclick=()=>{

    if(aceptar){

        aceptar(input.value.trim());

    }

};
