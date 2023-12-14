
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
    
    X1 = [];
    X2 = [];
    derivadas1 = [];
    separadas1 = [];

    var ecuacion1 = ecuacion.value;
    var separadas = ObtenerTerminos(ecuacion1);
    var derivadas = ObtenerDerivadas(separadas);

    separadas1 = separadas;
    derivadas1 = derivadas;

    Obtenerh1x1h2x2();
})

ecuacion2.addEventListener('input', function name() {

    X1 = [];
    X2 = [];
    derivadas2 = [];
    separadas2 = [];
    
    var ecuacion3 = ecuacion2.value;
    var separadas = ObtenerTerminos(ecuacion3);
    var derivadas = ObtenerDerivadas(separadas);

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
        var datos1 = derivadas1.findIndex(elemento => !elemento.includes('x'));
        var datos2 = derivadas2.findIndex(elemento => !elemento.includes('x'));

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
        
        X1.push(h1);
        X2.push(h2);
        Funcion(h1,h2);
    } catch (error) {
        console.log(error);
    }
        
}

//Aqui obtenemos la funcion de nuestras x
function Funcion(x1, x2) {

        console.log(x1,x2);

        let sep1 = [];
        let sep2 = [];

        sep1 = separadas1;
        sep2 = separadas2;
    
        var f = 0;
        var f1 = 0;

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
        SistemaEcuaciones(x1, x2, f, f1,);
   
}

function SistemaEcuaciones(h1, h2, f, f1) {
    

    var sustituto1 = [...derivadas1];
    var sustituto2 = [...derivadas2];

    
    var index = sustituto1.findIndex(elemento => elemento.includes('x'));
    var index2 = sustituto2.findIndex(elemento => elemento.includes('x'));

    var x = math.compile(sustituto1[index]);
    var x2 = math.compile(sustituto2[index2]);

    sustituto1[index] = x.evaluate({ x:h1 });
    sustituto2[index2] = x2.evaluate({ x:h2 });


    const a = [
        [sustituto1[0], sustituto1[1]], 
        [sustituto2[0], sustituto2[1]]
    ];
    var b = [-f, -f1];
    var xx = numeric.solve(a, b); // [[-5.5], [20]]

    sacarXs(xx, h1, h2);
}

function sacarXs(xx, h1, h2) {
    

    X1.push(h1 + xx[0]);
    X2.push(h2 + xx[1]);

    var valor = X1[X1.length - 1];

    if (valor != 4 && X1.length < 50) {
        Funcion(X1[X1.length - 1], X2[X2.length - 1]);
    } else {
        mostrando(X1,X2, X1);
    }
}