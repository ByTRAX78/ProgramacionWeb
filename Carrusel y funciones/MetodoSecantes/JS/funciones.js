
function resolverEcuacion(xInput, ecuacion) {
    var x = parseFloat(xInput);
    var ecu = ecuacion;

    var ecuacionConParéntesis = ecu.replace(/x\^(\d+)/g, "(x)**$1");
    var resultado = eval(ecuacionConParéntesis);
    return resultado;
}
export { resolverEcuacion };

//var result = resolverEcuacion(x.value, ecuacion.value);

//console.log(x.value + ' ' + ecuacion.value);



//console.log(result);

