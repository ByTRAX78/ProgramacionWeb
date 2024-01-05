import { resolverEcuacion } from "./funciones.js";
import { mostrando } from './mostrar.js';
import { convergencia } from './convergencia.js';

var ecuacion = document.querySelector('.ecuacion');
var x = [];
var f = [];

ecuacion.addEventListener('input', function name() {

    try {
        //Reseteamos los valores cada vez que ingresamos un nuevo caracter a la
    //ecuacion
    x = [];
    f = [];
    var l=1;
    //Variables para distinguir entre el tipo de X de acuerdo al signo de su
    // f
    var xp, xn, fn, fp;
    //Primer valor de rango para obtener la raiz
    x[0] = 3;
    //Aqui obtenemos el valor de la funcion de x
    f[0] = resolverEcuacion(x[0],ecuacion.value);
    //Verificamos si la funcion de x debe de ser xn o xp y guardamos los valores
    //en un array para que despues sean mostrados
    if (f[0] > 0) {
        xp = x[0];
        fp = f[0];
    } else {
        xn = x[0];
        fn = f[0];
    }
    //Ponemos el segundo valor para obtener la raiz
    x[1] = 4;


    do {
        x[1]++;
        f[1] = resolverEcuacion(x[1],ecuacion.value);
        /*Si xn esta vacia, nos dara true, por ende x = 0 es xp
          si obtenemos false la x es xp
        */

          //En esta seccion verificamos cual es el valor del siguiente rango
          //en caso de querer que el programa lo hago
        if (isNaN(xn)) {
            if (f[1] > 0) {
                x[1] = -x[1];
                f[1] = resolverEcuacion(x[1], ecuacion.value);
                if (f[1] < 0) {
                    xn = x[1];
                    fn = f[1];
                } else {
                    x[1] = -x[1];
                }
            } else {
                xn = 3;
                fn = f[1];
            }
        } else {
            
            if (f[1] > 0) {
                xp = x[1];
                fp = f[1];
            } else {
                x[1] = -x[1];
                f[1] = resolverEcuacion(x[1], ecuacion.value);
                if (f[1] < 0) {
                    x[1] = -x[1];
                } else {
                    xp = x[1];
                    fp = f[1];
                }
            }
        }
        l++;
    } while ((isNaN(xp) || isNaN(xn)) && l!=50);

    //Mandamos los valores de xp, xn y sus funciones a la formula
    formula(xn, xp, fn, fp)
    } catch (error) {
        
    }

    

})

function formula(xn, xp, fn, fp) {
    
    var xe = [];
    var i = 2, xi;

    do {
        //Numerador de la formula
        xi = ((xp*fn)-(xn*fp));
        //Numerado entre el denominador de la formula
        x[i] = xi/(fn-fp);
        //Mandamos el valor de la nueva x para obtener el valor de la 
        //funcion de esta
        f[i] = resolverEcuacion(x[i], ecuacion.value);
        //Verificamos si esta es xn o xp
        if (f[i] < 0) {
            xn = x[i];
            fn = f[i];
        } else {
            xp = x[i];
            fp = f[i];
        }
        i++;
    } while ((f[i-1].toFixed(6) != 0 ) && i!=500);

    //Obtenemos la comprobacion por convergencia
    xe = convergencia(x);
    //Funcion para mostrar los resultados en pagina web
    mostrando(x, f, xe);
}