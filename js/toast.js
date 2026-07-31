// =====================================
// TOAST
// SALMOS 105
// =====================================

let temporizador = null;

export function mostrarToast(

    mensaje,

    tipo = "exito"

){

    const toast =
        document.getElementById("toast");

    const texto =
        document.getElementById("toastTexto");

    const icono =
        document.getElementById("toastIcono");

    toast.classList.remove(

        "exito",

        "error",

        "advertencia",

        "oculto"

    );

    toast.classList.add(tipo);

    texto.textContent = mensaje;

    switch(tipo){

        case "error":

            icono.textContent = "✖";

            break;

        case "advertencia":

            icono.textContent = "⚠";

            break;

        default:

            icono.textContent = "✔";

    }

    clearTimeout(temporizador);

    temporizador = setTimeout(()=>{

        toast.classList.add("oculto");

    },1800);

}
