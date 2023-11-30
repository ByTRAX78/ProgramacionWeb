import { resolverEcuacion } from "./funciones.js";
import { convergencia } from "./convergencia.js";
import { mostrando } from "./mostrar.js";

var ecuacion = document.querySelector('.ecuacion');

    var x = [];
    var f = [];
    var xe = [];

ecuacion.addEventListener('input', function name() {
    
    var i = 2;
    
    x[0] = 0;
    f[0] = resolverEcuacion(x[0], ecuacion.value);
    x[1] = 1git add
    f[1] = resolverEcuacion(x[1], ecuacion.value);

    do {

        x[i] = x[i-1] - (((x[i-1]-x[i-2])*(f[i-1]))/(f[i-1]-(f[i-2])))
        f[i] = resolverEcuacion(x[i], ecuacion.value);
        
        i++;
    } while ((f[i-1].toFixed(6) != 0) && i != 50);

    xe = convergencia(x);
    mostrando(x,f,xe)
});
