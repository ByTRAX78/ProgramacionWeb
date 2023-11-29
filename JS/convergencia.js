function convergencia(x) {

    var xe = [];
    
    for (let i=0; i<x.length; i++ ) {

        xe[i] = ((x[i+1] + x[i])/x[i+1]);
    }
    return xe;
}

export {convergencia};