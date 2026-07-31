// ===============================
// SALMOS 105
// Constantes generales
// ===============================

// Cantidad de acordes que se mostrarán
export const TOTAL_ACORDES = 6;

// Notas musicales
export const NOTAS = [

    "Do",
    "Do#",
    "Re",
    "Re#",
    "Mi",
    "Fa",
    "Fa#",
    "Sol",
    "Sol#",
    "La",
    "La#",
    "Si"

];

// Conversión de nombres
// Se usa "S" para los sostenidos
// para evitar problemas en las rutas.

export const CODIGOS = {

    "Do": "Do",
    "Do#": "DoS",

    "Re": "Re",
    "Re#": "ReS",

    "Mi": "Mi",

    "Fa": "Fa",
    "Fa#": "FaS",

    "Sol": "Sol",
    "Sol#": "SolS",

    "La": "La",
    "La#": "LaS",

    "Si": "Si"

};

// Instrumento actual

export const INSTRUMENTO = "guitarra";

// Ruta donde estarán las imágenes

export const RUTA_ACORDES =
    `assets/acordes/${INSTRUMENTO}/`;

// Nombre del caché

export const CACHE_NAME = "salmos105-v2";
