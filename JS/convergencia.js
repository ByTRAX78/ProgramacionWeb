function convergencia(x) {

    var xe = [];
    
    //Pues es un bucle donde pasamos cada una de las x de las iteraciones
    //guardadas en un array para obtenerles
    for (let i=0; i<x.length; i++ ) {

        xe[i] = ((x[i+1] + x[i])/x[i+1]);
    }
    return xe;
}

export {convergencia};