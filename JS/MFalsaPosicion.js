import { resolverEcuacion } from "./funciones.js";
import { mostrando } from './mostrar.js';
import { convergencia } from './convergencia.js';

var ecuacion = document.querySelector('.ecuacion');
var x = [];
var f = [];

ecuacion.addEventListener('input', function name() {

    x = [];
    f = [];
    var l=1;
    var xp, xn, fn, fp;
    x[0] = 0;
    f[0] = resolverEcuacion(x[0],ecuacion.value);

    if (f[0] > 0) {
        xp = x[0];
        fp = f[0];
    } else {
        xn = x[0];
        fn = f[0];
    }
    x[1] = 0;


    do {
        x[1]++;
        f[1] = resolverEcuacion(x[1],ecuacion.value);
        /*Si xn esta vacia, nos dara true, por ende x = 0 es xp
          si obtenemos false la x es xp
        */
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
                xn = x[1];
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

    formula(xn, xp, fn, fp)

})

function formula(xn, xp, fn, fp) {
    
    var xe = [];
    var i = 2, xi;

    do {
        console.log(xp + ' ' + xn + ' ' + fn + ' ' + fp);
        xi = ((xp*fn)-(xn*fp));
        x[i] = xi/(fn-fp);
        console.log(i);
        f[i] = resolverEcuacion(x[i], ecuacion.value);
        console.log(f[i]);
        if (f[i] < 0) {
            xn = x[i];
            fn = f[i];
        } else {
            xp = x[i];
            fp = f[i];
        }
        i++;
    } while ((f[i-1].toFixed(6) != 0 ) && i!=500);

    xe = convergencia(x);
    mostrando(x, f, xe);
}