// =====================================
// SALMOS 115
// Motor de detección de tonalidad
// =====================================

/*=====================================
    NOTAS MUSICALES
=====================================*/

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

/*=====================================
    PERFILES KRUMHANSL
=====================================*/

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

/*=====================================
    ROTAR PERFIL
=====================================*/

function rotarPerfil(perfil, desplazamiento){

    const nuevo = [];

    for(

        let i = 0;

        i < 12;

        i++

    ){

        nuevo.push(

            perfil[(i + desplazamiento) % 12]

        );

    }

    return nuevo;

}

/*=====================================
    CORRELACIÓN DE PEARSON
=====================================*/

function correlacionPearson(

    vector1,

    vector2

){

    let sumaX = 0;

    let sumaY = 0;

    for(

        let i = 0;

        i < 12;

        i++

    ){

        sumaX += vector1[i];

        sumaY += vector2[i];

    }

    const mediaX =

        sumaX / 12;

    const mediaY =

        sumaY / 12;

    let numerador = 0;

    let denominadorX = 0;

    let denominadorY = 0;

    for(

        let i = 0;

        i < 12;

        i++

    ){

        const dx =

            vector1[i] - mediaX;

        const dy =

            vector2[i] - mediaY;

        numerador +=

            dx * dy;

        denominadorX +=

            dx * dx;

        denominadorY +=

            dy * dy;

    }

    const denominador =

        Math.sqrt(

            denominadorX *

            denominadorY

        );

    if(

        denominador === 0

    ){

        return 0;

    }

    return numerador /

        denominador;

}

/*=====================================
    BUSCAR MEJOR COINCIDENCIA
=====================================*/

function buscarMejorCoincidencia(hpcp){

    let mejor = null;

    // --------------------------
    // MAYORES
    // --------------------------

    for(

        let i = 0;

        i < 12;

        i++

    ){

        const valor =

            correlacionPearson(

                hpcp,

                rotarPerfil(

                    PERFIL_MAYOR,

                    i

                )

            );

        if(

            mejor === null ||

            valor >

            mejor.correlacion

        ){

            mejor = {

                nota:

                    NOTAS[i],

                escala:

                    "Mayor",

                correlacion:

                    valor

            };

        }

    }

    // --------------------------
    // MENORES
    // --------------------------

    for(

        let i = 0;

        i < 12;

        i++

    ){

        const valor =

            correlacionPearson(

                hpcp,

                rotarPerfil(

                    PERFIL_MENOR,

                    i

                )

            );

        if(

            valor >

            mejor.correlacion

        ){

            mejor = {

                nota:

                    NOTAS[i],

                escala:

                    "Menor",

                correlacion:

                    valor

            };

        }

    }

    return mejor;

}


/*=====================================
    DETECTOR DE TONALIDAD
=====================================*/

export class DetectorTonalidad{

    analizar(listaHPCP){

        console.log("🎼 Analizando tonalidad...");

        const votos = {};

        // ==========================
        // ANALIZAR CADA HPCP
        // ==========================

        for(const hpcp of listaHPCP){

            const resultado =

                buscarMejorCoincidencia(hpcp);

            // Ignorar resultados muy débiles

            if(resultado.correlacion < 0.45){

                continue;

            }

            const clave =

                resultado.nota +

                "_" +

                resultado.escala;

            if(!votos[clave]){

                votos[clave] = {

                    nota: resultado.nota,

                    escala: resultado.escala,

                    votos: 0,

                    sumaCorrelacion: 0

                };

            }

            votos[clave].votos++;

            votos[clave].sumaCorrelacion +=

                resultado.correlacion;

        }

        // ==========================
        // SI NO HUBO VOTOS
        // ==========================

        if(

            Object.keys(votos).length === 0

        ){

            return {

                nota: "-",

                escala: "-",

                correlacion: 0,

                confianza: 0,

                votos: 0

            };

        }

        // ==========================
        // BUSCAR GANADOR
        // ==========================

        let ganador = null;

        let mejorPuntaje = -Infinity;

        for(const clave in votos){

            const actual = votos[clave];

            const promedio =

                actual.sumaCorrelacion /

                actual.votos;

            // Puntaje ponderado

            const puntaje =

                promedio *

                actual.votos;

            actual.correlacion = promedio;

            actual.puntaje = puntaje;

            if(

                puntaje >

                mejorPuntaje

            ){

                mejorPuntaje = puntaje;

                ganador = actual;

            }

        }

        // ==========================
        // CALCULAR CONFIANZA
        // ==========================

        ganador.confianza =

            ganador.correlacion * 100;

        console.log("🗳️ Votación");

        console.table(votos);

        console.log("🏆 Ganador");

        console.table(ganador);

        return ganador;

    }

}



