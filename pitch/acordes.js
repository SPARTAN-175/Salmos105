// =====================================
// SALMOS 115
// Círculos armónicos
// =====================================

import { actualizarTodos } from "../js/ui.js";

const CIRCULOS = {

    "C":  ["C","G","F","Em","Am","Dm"],
    "C#": ["C#","G#","F#","Fm","A#m","D#m"],
    "D":  ["D","A","G","F#m","Bm","Em"],
    "D#": ["D#","A#","G#","Gm","Cm","Fm"],
    "E":  ["E","B","A","G#m","C#m","F#m"],
    "F":  ["F","C","A#","Am","Dm","Gm"],
    "F#": ["F#","C#","B","A#m","D#m","G#m"],
    "G":  ["G","D","C","Bm","Em","Am"],
    "G#": ["G#","D#","C#","Cm","Fm","A#m"],
    "A":  ["A","E","D","C#m","F#m","Bm"],
    "A#": ["A#","F","D#","Dm","Gm","Cm"],
    "B":  ["B","F#","E","D#m","G#m","C#m"]

};

const MAPA_NOTAS = {

    "C": "Do",
    "C#": "Do#",

    "D": "Re",
    "D#": "Re#",

    "E": "Mi",

    "F": "Fa",
    "F#": "Fa#",

    "G": "Sol",
    "G#": "Sol#",

    "A": "La",
    "A#": "La#",

    "B": "Si"

};

export function obtenerCirculo(nota){

    return CIRCULOS[nota] ?? [];

}

/*=====================================
    APLICAR CÍRCULO ARMÓNICO
=====================================*/

export function aplicarCirculo(acordes){

    for(let i = 0; i < acordes.length; i++){

        const acorde = acordes[i];

        const menor = acorde.endsWith("m");

        const notaIngles = menor
            ? acorde.slice(0, -1)
            : acorde;

        const nota = MAPA_NOTAS[notaIngles];

        document.getElementById(`nota${i+1}`).value = nota;

        document.getElementById(`menor${i+1}`).checked = menor;

        document.getElementById(`septima${i+1}`).checked = false;

    }

    actualizarTodos();

}
