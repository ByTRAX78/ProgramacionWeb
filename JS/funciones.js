
//Script para hallar la funcion de x
function resolverEcuacion(xInput, ecuacion) {
    //Este es el valor de x
    var x = parseFloat(xInput);
    //La funcion
    var ecu = ecuacion;

    try {
        //Aqui la compilamos para que la libreria la entienda
        var ecuacionCompilada = math.compile(ecu);
        //Aqui sustituimos la x por el valor de la varaible x
        var resultado = ecuacionCompilada.evaluate({ x:x });
    } catch (error) {
        
    }
    //Retornamos el valor de la funcion 
    return resultado;
}
export { resolverEcuacion };

//var result = resolverEcuacion(x.value, ecuacion.value);

//console.log(x.value + ' ' + ecuacion.value);



//console.log(result);

