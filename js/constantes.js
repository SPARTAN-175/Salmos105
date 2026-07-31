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

// Conversión de notas (Español -> Internacional)
export const CODIGOS = {
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

// Instrumento soportado
export const INSTRUMENTO = "guitarra";

// Ruta base de las imágenes
export const RUTA_ACORDES = `assets/acordes/${INSTRUMENTO}/`;

// Nombre del caché del Service Worker
export const CACHE_NAME = "salmos105-v2";
