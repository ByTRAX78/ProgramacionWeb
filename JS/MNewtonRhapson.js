
import {mostrando} from './mostrar.js';

//Donde guardaremos las ecuaciones que ingresa el usuario
var ecuacion = document.querySelector('.ecuacion');
var ecuacion2 = document.querySelector('.ecuacion2');

/*
    separadas es donde guardaremos la ecuacion dividida en columnas
    derivada es donde guardaremos la derivada de los coeficientes obtenido
    al separar las columnas
*/
var derivadas1, derivadas2, separadas1, separadas2;
var X1 =[], X2=[];

ecuacion.addEventListener('input', function name() {


    //Reseteamos los valores cada vez que se meten mas valores
    X1 = [];
    X2 = [];
    derivadas1 = [];
    separadas1 = [];

    //Obtnemos el valor de la ecuacio
    var ecuacion1 = ecuacion.value;
    //Dividmos la ecuacion por columnas y las almacenamos en arrya
    var separadas = ObtenerTerminos(ecuacion1);
    console.log(separadas);
    //Derivamos cada columna
    var derivadas = ObtenerDerivadas(separadas);
    console.log(derivadas);

    //Guardamos la ecuacion dividida por columnas y las derivadas
    //en variables globales
    separadas1 = separadas;
    derivadas1 = derivadas;

    //Funcion para obtener h1 y h2
    Obtenerh1x1h2x2();
})

ecuacion2.addEventListener('input', function name() {

    //Se resetena los valores cada que se ingresan datos
    X1 = [];
    X2 = [];
    derivadas2 = [];
    separadas2 = [];
    
    //Se separan las ecuacione en variables y luego son derivadas
    var ecuacion3 = ecuacion2.value;
    var separadas = ObtenerTerminos(ecuacion3);
    var derivadas = ObtenerDerivadas(separadas);

    //Se almacenan en varaibles globales
    separadas2 = separadas;
    derivadas2 = derivadas;

    Obtenerh1x1h2x2();
})


//En esta funcion separaremos la ecuacion por columnas
function ObtenerTerminos(coeficientes) {

    //Dividimos la ecuacion por a partir de los signos mas y =
    var ecuacionSeparada = coeficientes.split(/\+|\=/);
    var separadas = [];

    //ciclo para separar los coeficientes donde exista un menos
    for (let i = 0; i < ecuacionSeparada.length; i++) {
        
        if (ecuacionSeparada[i].includes('-')) {
            //Separa la ecuacion donde exista un -
            ecuacionSeparada[i] = ecuacionSeparada[i].split(/(?=\-)/);
            //Filtramos para quitar espacios
            ecuacionSeparada[i] = ecuacionSeparada[i].filter(element => element !== '' && element !== ' - ' && element !== ' ');
            for (let j = 0; j < ecuacionSeparada[i].length; j++) {
                separadas.push(ecuacionSeparada[i][j]);
                
            }
        } else {
            separadas.push(ecuacionSeparada[i]);
        }
    }
    return separadas;
}

//En esta funcion derivaremos los coeficientes 
function ObtenerDerivadas(ecu) {

    var derivadas = ecu.slice(0,-1).map(expresion => math.derivative(expresion, 'x').toString());
    derivadas.push(ecu[ecu.length - 1]);
    return derivadas;
}

function Obtenerh1x1h2x2() {
    
    try {
        //Obtenemos los coeficientes que no tengan x para ser despejados y obtener alguna x
        var datos1 = derivadas1.findIndex(elemento => !elemento.includes('x'));
        var datos2 = derivadas2.findIndex(elemento => !elemento.includes('x'));

        //Aqui se decide si es h1 o h2 dependiendo de la columna a la que pertenece
        if (datos1 == 0) {
            //Sera h1
            var operandos = derivadas1.filter(elemento => !elemento.includes('x'));
            var h1 = operandos[1]/operandos[0];
        } else {
            //Sera h2
            var operandos = derivadas1.filter(elemento => !elemento.includes('x'));
            var h2 = operandos[1]/operandos[0];
        }
        
        if (datos2 == 0) {
            //Sera h1
            var operandos = derivadas2.filter(elemento => !elemento.includes('x'));
            var h1 = operandos[1]/operandos[0];
        } else {
            //Sera h2
            var operandos = derivadas2.filter(elemento => !elemento.includes('x'));
            var h2 = operandos[1]/operandos[0];
        }
        
        //Ingresmos las h1 a unos array que serian las x que mostraremos como
        //resultados
        X1.push(h1);
        X2.push(h2);
        //Vamos a la funcion de x para obtener los valores que usaremos para igualar
        //el sistema de cuaciones
        Funcion(h1,h2);
    } catch (error) {
        console.log(error);
    }
        
}

//Aqui obtenemos la funcion de nuestras x
function Funcion(x1, x2) {

        console.log(x1,x2);

        //variables locales para guardar la ecuacion separadad por columnas o coeficientes
        let sep1 = [];
        let sep2 = [];

        sep1 = separadas1;
        sep2 = separadas2;

        //Variables locales para el valor de las funciones de x1 y x2
        var f = 0;
        var f1 = 0;


        //En este for solo se recorre en busca de un coneficiente con para
        //depues sustituir los valores de sus x por x1 y x2 
        for (let i = 0; i < sep1.length; i++) {
            
            if (sep1[i].includes('x') && i == 0) {
                var funcion = math.compile(sep1[i]);
                f += funcion.evaluate({ x:x1});
            } else if (sep1[i].includes('x') && i != 0) {
                var funcion = math.compile(sep1[i]);
                f += funcion.evaluate({ x:x2 });
            } else {
                f += -sep1[i];
            }


            if (sep2[i].includes('x') && i == 0) {
                var funcion = math.compile(sep2[i]);
                f1 += funcion.evaluate({ x:x1 });
            } else if (sep2[i].includes('x') && i != 0) {
                var funcion = math.compile(sep2[i]);
                f1 += funcion.evaluate({ x:x2 });
            } else {
                f1 += -sep2[i];
            }

            
            
        }
        console.log(f, f1);
        //Vamos a la funcion que nos creara y resoverla el sistema de ecuaicones
        SistemaEcuaciones(x1, x2, f, f1,);
   
}

//Funcion para resover el sistema de ecuaciones
function SistemaEcuaciones(h1, h2, f, f1) {
    
    //Varaibles locales que representaran las ecuaciones del sistema
    var sustituto1 = [...derivadas1];
    var sustituto2 = [...derivadas2];

    //En esta parte buscamos a las x nuevamente para sustituir por los valores de h1 y h2
    var index = sustituto1.findIndex(elemento => elemento.includes('x'));
    var index2 = sustituto2.findIndex(elemento => elemento.includes('x'));

    var x = math.compile(sustituto1[index]);
    console.log(sustituto2);
    var x2 = math.compile(sustituto2[index2]);

    

    //Una ves se sustituyen sus valores se agregan al respectivo lugar de sus ecuaciones
    //para formar el sistema de ecuaciones
    if (index == 0) {
        sustituto1[index] = x.evaluate({ x:h1 });
    } else if (index >= 0) {
        sustituto1[index] = x.evaluate({ x:h2 });
    }

    if (index2 == 0) {
        sustituto2[index2] = x2.evaluate({ x:h1 });
    } else if (index2) {
        sustituto2[index2] = x2.evaluate({ x:h2 });
    }
    

    console.log(sustituto1[index]);

    //Se resuleve el sistema de ecuaciones y se guardan en una variable local
    const a = [
        [sustituto1[0], sustituto1[1]], 
        [sustituto2[0], sustituto2[1]]
    ];
    var b = [-f, -f1];
    var xx = numeric.solve(a, b); // [[-5.5], [20]]

    //Funcion donde guardaremos todos los valores de x1 y x2
    sacarXs(xx, h1, h2);
}

function sacarXs(xx, h1, h2) {
    
    //Aqui guardamos los valores de x1 y x2 en sus respectivas varaibles
    X1.push(h1 + xx[0]);
    X2.push(h2 + xx[1]);

    var valor = X1[X1.length - 1];

    //Una condicional para saber cuando ya se llego a un resoltado deseado o cuando ya
    //fueron mas de 50 iteraciones
    if (valor.toFixed(6) != X1[X1.length - 2].toFixed(6) && X1.length < 50) {
        //Funciona para repetir el proceso cuantas veces sean necesarias
        Funcion(X1[X1.length - 1], X2[X2.length - 1]);
    } else {
        //Aqui mostramos los resultados en ordenador
        mostrando(X1,X2, X2);
    }
}