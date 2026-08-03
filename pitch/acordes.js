// =====================================
// SALMOS 115
// Círculos armónicos
// =====================================

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

export function obtenerCirculo(

    nota

){

    return CIRCULOS[nota] ?? [];

}








/*=====================================
    MOSTRAR CÍRCULO ARMÓNICO
=====================================*/

export function mostrarCirculo(

    acordes

){

    const contenedor =

        document.getElementById(

            "contenedorAcordes"

        );

    contenedor.innerHTML = "";

    const grados = [

        "I",

        "V",

        "IV",

        "iii",

        "vi",

        "ii"

    ];

    for(

        let i = 0;

        i < acordes.length;

        i++

    ){

        const tarjeta =

            document.createElement(

                "div"

            );

        tarjeta.className =

            "acorde";

        tarjeta.innerHTML =

            `
                <span class="grado">

                    ${grados[i]}

                </span>

                <span class="nombre">

                    ${acordes[i]}

                </span>
            `;

        contenedor.appendChild(

            tarjeta

        );

    }

}
