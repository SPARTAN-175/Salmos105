// =====================================
// SALMOS 105
// UI
// =====================================

const CODIGOS = {
    "Do": "C",
    "Do#": "C#",
    "Re": "D",
    "Re#": "D#",
    "Mi": "E",
    "Fa": "F",
    "Fa#": "F#",
    "Sol": "G",
    "Sol#": "G#",
    "La": "A",
    "La#": "A#",
    "Si": "B"
};

/**
 * Obtiene el nombre del archivo
 */
export function obtenerImagen(nota, menor, septima){

    let archivo = CODIGOS[nota];

    if(menor){

        archivo += "m";

    }

    if(septima){

        archivo += "7";

    }

    return `assets/acordes/guitarra/${archivo}.png`;

}

/**
 * Actualiza una imagen
 */
export function actualizarImagen(indice){

    const nota = document.getElementById(`nota${indice}`).value;

    const menor = document.getElementById(`menor${indice}`).checked;

    const septima = document.getElementById(`septima${indice}`).checked;

    const imagen = document.getElementById(`img${indice}`);

    const texto = document.getElementById(`txt${indice}`);

    imagen.src = obtenerImagen(nota, menor, septima);

    let nombre = nota;

    if(menor){

        nombre += "m";

    }

    if(septima){

        nombre += "7";

    }

    texto.textContent = nombre;

}
