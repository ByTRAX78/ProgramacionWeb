import { resolverEcuacion } from "./funciones.js";
import { convergencia } from "./convergencia.js";
import { mostrando } from "./mostrar.js";

var ecuacion = document.querySelector('.ecuacion');

    var x = [];
    var f = [];
    var xe = [];

ecuacion.addEventListener('input', function name() {
    
    var i = 2;
    x=[];
    f=[];
    x[0] = 0;
    f[0] = resolverEcuacion(x[0], ecuacion.value);
    x[1] = 1;
    f[1] = resolverEcuacion(x[1], ecuacion.value);

    //Ciclo donde repetimos la formula hasta obtner el resultado deseado
    do {
       
        //Formula del metodo de la secante
        x[i] = x[i-1] - (((x[i-1]-x[i-2])*(f[i-1]))/(f[i-1]-(f[i-2])))
        //Aqui obtenemos la funcion de x
        f[i] = resolverEcuacion(x[i], ecuacion.value);
        
        i++;
    } while ((f[i-1].toFixed(6) != 0) && i != 50);

    //Aqui hacemos pruebas de convergencia
    xe = convergencia(x);
    //Aqui mostramos los resultados en el navegador
    mostrando(x,f,xe)
});
