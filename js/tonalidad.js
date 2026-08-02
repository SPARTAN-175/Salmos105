// =====================================
// SALMOS 115
// Detector de tonalidad
// =====================================

const NOTAS = [

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

// =====================================
// PERFILES KRUMHANSL
// =====================================

const PERFIL_MAYOR = [

    6.35,
    2.23,
    3.48,
    2.33,
    4.38,
    4.09,
    2.52,
    5.19,
    2.39,
    3.66,
    2.29,
    2.88

];

const PERFIL_MENOR = [

    6.33,
    2.68,
    3.52,
    5.38,
    2.60,
    3.53,
    2.54,
    4.75,
    3.98,
    2.69,
    3.34,
    3.17

];

// =====================================
// ROTAR PERFIL
// =====================================

function rotarPerfil(perfil, desplazamiento){

    const nuevo = [];

    for(let i = 0; i < 12; i++){

        nuevo.push(

            perfil[(i + desplazamiento) % 12]

        );

    }

    return nuevo;

}

// =====================================
// CORRELACIÓN DE PEARSON
// =====================================

function correlacion(vector1, vector2){

    let sumaX = 0;
    let sumaY = 0;

    for(let i = 0; i < 12; i++){

        sumaX += vector1[i];
        sumaY += vector2[i];

    }

    const mediaX = sumaX / 12;
    const mediaY = sumaY / 12;

    let numerador = 0;
    let denominadorX = 0;
    let denominadorY = 0;

    for(let i = 0; i < 12; i++){

        const dx = vector1[i] - mediaX;
        const dy = vector2[i] - mediaY;

        numerador += dx * dy;

        denominadorX += dx * dx;

        denominadorY += dy * dy;

    }

    const denominador = Math.sqrt(

        denominadorX * denominadorY

    );

    if(denominador === 0){

        return 0;

    }

    return numerador / denominador;

}


// =====================================
// BUSCAR MEJOR COINCIDENCIA
// =====================================

function buscarMejorCoincidencia(hpcp){

    let mejor = {

        nota: "",

        escala: "",

        correlacion: -Infinity

    };

    // ==========================
    // TONALIDADES MAYORES
    // ==========================

    for(let i = 0; i < 12; i++){

        const perfil = rotarPerfil(

            PERFIL_MAYOR,

            i

        );

        const valor = correlacion(

            hpcp,

            perfil

        );

        console.log(

            `${NOTAS[i]} Mayor -> ${valor.toFixed(4)}`

        );

        if(valor > mejor.correlacion){

            mejor = {

                nota: NOTAS[i],

                escala: "Mayor",

                correlacion: valor

            };

        }

    }

    // ==========================
    // TONALIDADES MENORES
    // ==========================

    for(let i = 0; i < 12; i++){

        const perfil = rotarPerfil(

            PERFIL_MENOR,

            i

        );

        const valor = correlacion(

            hpcp,

            perfil

        );

        console.log(

            `${NOTAS[i]} menor -> ${valor.toFixed(4)}`

        );

        if(valor > mejor.correlacion){

            mejor = {

                nota: NOTAS[i],

                escala: "Menor",

                correlacion: valor

            };

        }

    }

    return mejor;

}

// =====================================
// CLASE PRINCIPAL
// =====================================

export class DetectorTonalidad{

    constructor(){

        this.reiniciar();

    }

    // ==========================

    reiniciar(){

        this.historial = [];

        this.resultado = null;

    }

    // ==========================

    agregarHPCP(hpcp){

        this.historial.push(

            hpcp

        );

    }

    // ==========================

    obtenerResultado(){

        return this.resultado;

    }

}
