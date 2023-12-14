
import { resolverEcuacion } from './funciones.js';
import { mostrando } from './mostrar.js';
import { convergencia } from './convergencia.js';

var f,x;
var xi = [], fi = [];
var ecuacion = document.querySelector('.ecuacion');


ecuacion.addEventListener('input', function Inicio() {

    xi = [];
    fi = [];
    var xn, xp;
    x = 0;
    var resultados = document.getElementById('resultados');
    var i = 1;
    var l = 1;

    xi.length = 0;
    fi.length = 0;
    //Aqui obtenemos el valor de funcion de x1 igual a 0
    f = resolverEcuacion(x,ecuacion.value);
    //mostramos el resultado
    mostrando(x,f);
    xi[0] = x;
    fi[0] = f;
    //Decidimos si es xn o xp
    if (f < 0) {
        xn = x;
    } else {
        xp = x;
    }
    

    //Bucle donde obtenemos el siguiente valor de ya sea de xp o xn
    do {
        x++;
        f = resolverEcuacion(x,ecuacion.value);
        if (isNaN(xn)) {
            console.log('xn esta vacio');
            if (f > 0) {
                x = -x;
                f = resolverEcuacion(x,ecuacion.value);
                console.log('Es nan');
                if (f < 0) {
                    xn = x;
                } else {
                    x = -x;
                }
            } else {
                x = -x;
            }
        } else {
            
            console.log('xn tiene');
            if (f > 0) {
                xp = x;
            } else {
                console.log('Pol dios');
                x = -x;
                f = resolverEcuacion(x,ecuacion.value);
                if (f > 0) {
                    xp = x;
                } else {
                    x = -x;
                }
            }
        }
        console.log(l);
        l++;
    } while ((isNaN(xn) || isNaN(xp)) && l!=50);
    
    var seccionResultados = document.querySelector('resultados');
    xi[1] = x;
    fi[1] = f;
    //Mandamos los valors de xn y xp a su formula y obtener los siguientes
    //iteraciones
    formula(xn,xp);
})

function formula(xn, xp) {
    
    var j=2;
    var xe = [];

    //Bucle que se repite hasta que los valores de x se repiten
    do {
        //La formaila del metodo de la biseccion
        xi[j] = xn + ((xp-xn)/2);
        //Aqui obtenemos la funcion de la x correspondiente
        fi[j] = resolverEcuacion(xi[j],ecuacion.value);

        console.log('tenemos a ' + xn + ' y ' + xp + ' lo que nos da ' + xn + ((xp-xn)/2));
        console.log(xi[j] + ' || ' + fi[j]);

        //Decidimos si es xn o xp
        if (fi[j] < 0) {
            xn = xi[j];
            console.log(xn);
        } else {
            xp = xi[j];
        }
        j++;
    } while ((fi[j-1].toFixed(6) != 0) && j!=50);
    
    //Pruebas de convergencia
    xe = convergencia(xi);
    //MOstramos los valores en el navegador
    mostrando(xi,fi,xe);
}

