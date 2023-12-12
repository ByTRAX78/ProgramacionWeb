

var terminos = [], terminos2 = [];
var h1, h2;
var ultCoe, ultCoe2;
var ecuDeri = '', ecuDeri2 = '';
var ecuacion = document.querySelector('.ecuacion');
var ecuacion2 = document.querySelector('.ecuacion2');

var v1 = parseFloat(ecuacion.value);
var v2 = parseFloat(ecuacion2.value);

//Obtenemos la ecuacion del primer input
ecuacion.addEventListener('input', function name() {
    
    var ecuacion1 = ecuacion.value;
    //Dividimos la ecuacion por coeficientes
    var coeficientes = ecuacion1.split(/(\+|-|=)/);

    //Pues llamamos a la funcion para guardar bien los terminos
    terminos = ObtenerTerminos(coeficientes);
    //Llamamos a la funcion para derivar la ecuacion
    ecuDeri = ObtenerDerivadas(terminos)


    Funcion();
})

ecuacion2.addEventListener('input', function name() {
    
    var ecuacion3 = ecuacion2.value;
    var coeficientes2 = ecuacion3.split(/(\+|-|=)/);

    terminos2 = ObtenerTerminos(coeficientes2);
    ecuDeri2 = ObtenerDerivadas(terminos2);


    Funcion();
})



function ObtenerTerminos(coeficientess) {

    var terminos = [];

    for (let i = 0; i <= coeficientess.length; i++) {
    
        //Si existe algun signo se concatena con el termino al que pertenece
        if (coeficientess[i] == '+' || coeficientess[i] == '-') {
            terminos[i] = coeficientess[i] + coeficientess[i+1];
            i++;
            //Evitamos guardar el signo = por que da problemas despues para
            //derivar pero guardamos el coeficiente que esta despues de el
        } else if (coeficientess[i] == '=') {
            ultCoe = coeficientess[i+1];
        } else {
            terminos[i] = coeficientess[i];
        } 
    }
    return terminos;
}

function ObtenerDerivadas(terminos) {

    var terminos = terminos;
    var ecuDeris = '';
    var derivaciones = [];

    for (let i = 0; i < terminos.length; i++) {
        
        //Cuando guardamos los coeficientes se quedan espacios vacios por ende usamos
        //un if para saltarnos estos espacios y cuando queramos derivar no de errores
        if (terminos[i] == isNaN || !terminos[i] || !terminos[i].includes('x')) {
            
        } else {
            //En un array guardamos las derovadas de los coeficientes de la ecuacion
            //que introducimos
            derivaciones[i] = math.derivative(terminos[i], 'x');
            //De una ves obtenemos h1 y h2 y para ello debemos clasificar 
            if (derivaciones[i].toString().includes('-')) {
                if (derivaciones[i].toString().includes('x')) {
                } else if (i == 1) {
                    /*Retomando el ultimo coeficciente haciendo un despeje divimos el valor
                    que no cuenta con para realizar la op y obtener h1 o h2 dependiendo su 
                    lugar dentro del array*/
                    h1 = ultCoe / derivaciones[i].toString();
                } else if (i != 0 || i != 1) {
                    h2 = ultCoe / derivaciones[i].toString();
                }
                //Aqui conquetamos las derivadas en una solo ecuacion
                ecuDeris += derivaciones[i];
                //Esta parte nos sirve para agregar el signo + a la ecuacion
            } else if (i != 0) {
                if (derivaciones[i].toString().includes('x')) {

                } else if (i == 0) {
                    h1 = ultCoe / derivaciones[i].toString();
                } else if (i != 0 || i != 1) {
                    h2 = ultCoe / derivaciones[i].toString();
                }
                ecuDeris = ecuDeris + ' + ' + derivaciones[i];
            } else {
                ecuDeris += derivaciones[i];
                h1 = ultCoe / derivaciones[i].toString();
            }
        }
    }

    return ecuDeris;
}

//Aqui obtenemos la funcion de nuestras x
function Funcion() {

    //Evitamos los espacios dentro de la derivada
    if (ecuDeri != isNaN && ecuDeri2 != isNaN) {

        //Aqui se va a guardar el resultado de la funcion
        var funcion1 = 0 , funcion2 = 0 ;
    
        //En el ciclo for repasamos la ecuacion
        for (let i = 0; i < terminos.length; i++) {
            //En busca de una x para sustituir por un valor
            if (terminos[i] && terminos[i].includes('x') && isNaN(Number(terminos[i]))) {
                
                //Aqui solo preparamos el coeficiente al formato admisible por la libreriar mathjs
                //o tambien podemos decir que la transformamos en una funcion
                var funcion = math.compile(terminos[i]);
                
                //Aqui solo devidimos si sus valores seran sustituidos por h1 o h2
                if (i==0) {
                    //Sustituimos los valores y obtenemos los resultados
                    var resultado = funcion.evaluate({ x:h1});
                    
                } else {
                    var resultado = funcion.evaluate({ x:h2});
                   
                } 
                //El resultado se va sumando para obtener el valor de funcion y despues
                //poder usarlo despues en el sistema de ecuaciones
                funcion1 += resultado;
            } else if (terminos[i] && !(terminos[i].includes('x'))) {
                funcion1 -= parseFloat(terminos[i]);
                ultCoe = terminos[i];
            }
        }

        //En esta seccion ocurre lo mismo pero para la segunda ecuacion divida en termino
        for (let i = 0; i < terminos2.length; i++) {
            if (terminos2[i] && terminos2[i].includes('x') && isNaN(Number(terminos2[i]))) {
                
                var funcions = math.compile(terminos2[i]);
                if (i==0) {
                    var resultados = funcions.evaluate({ x:h1});
                    
                    
                } else {
                    var resultados = funcions.evaluate({ x:h2});
                }
                funcion2 += resultados;
            } else if (terminos2[i] && !(terminos2[i].includes('x'))) {
                funcion2 -= parseFloat(terminos2[i]);
                ultCoe2 = terminos2[i];
            }
        }

        console.log(funcion1);
        console.log(funcion2);
    
    } else {
    }
    //Llamamos a la funcion que nos resuleve el sistema de ecuacion y mandamos el valor de las 
    //funciones obtenidas
    SistemaEcuaciones(funcion1, funcion2)
}

//En esta funcion resolvemos el sistema de ecuacion
function SistemaEcuaciones(x1, x2) {

    //En estos array guardaremos las ecuaciones por coeficiente listas para ser
    //resueltas en el sitema de ecuaciones
    var termEcuH = [];
    var termEcuH2 = [];
    
    //Retomamos nuestra ecuacion derivadad y las vovlemos a separar por termino para facilitar
    //su proecsamiento
    termEcuH = ecuDeri.split(/(\+|-|=)/)
    termEcuH2 = ecuDeri2.split(/(\+|-|=)/);

    //Llamamos a las siguientes funciones para dejar a cada termino o coeficiente en el formato que 
    //requiere la libreria
    termEcuH = ObtenerTerminos(termEcuH);
    termEcuH2 = ObtenerTerminos(termEcuH2);

    //En este ciclo sustituimos para obtener las ecuaciones necesarias para el sistema de ecuaciones
    for (let i = 0; i < termEcuH.length; i++) {
        if (termEcuH[i] && termEcuH[i].includes('x')) {
            //Dejamos preparados el coeficiente en el formato requerido en la libreria
            var fH = math.compile(termEcuH[i]);
            //Sustituimos por h1 o h2 o x1 y x2
            if (i==0) {
                termEcuH[i] = fH.evaluate({ x:h1 });
            } else {
                termEcuH[i] = fH.evaluate({ x:h2 });
            }
        }  
        //Esta seccion es igual pero para la segunda ecuacion
        if (termEcuH2[i] && termEcuH2[i].includes('x')) {
            var fH2 = math.compile(termEcuH2[i]);
            if (i==0) {
                termEcuH2[i] = fH2.evaluate({ x:h1});
            } else {
                termEcuH2[i] = fH2.evaluate({ x:h2 });
            }
        } 
    }

    termEcuH = termEcuH.filter(element => element !== undefined && element !== null);
    termEcuH2 = termEcuH2.filter(element => element !== undefined && element !== null);

    termEcuH = termEcuH.map(element => {
        if (typeof element === 'string' || element instanceof String) {
            //Verifica si existe un + y lo elimina para eviar problemas con la libreria
            if (element.charAt(0) === '+') {
                return element.substring(2);
            }
            return element;
        } else {
            return element;
        }
    });

    const coefficients = [
        [termEcuH[0], termEcuH[1]],
        [termEcuH2[0], termEcuH2[1]]
      ];

      const constants = [x1, x2];

  
      const solution = math.lusolve(coefficients, constants);
  
}

console.log(ecuDeri);
console.log(ecuDeri2);