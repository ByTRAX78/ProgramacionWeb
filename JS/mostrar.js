var i = 0;
//Funcion para mostrar la ecuaciones
/*
xInput, fInput y xe son los conjuntos de datos para mostrar en pantalla
*/
function mostrando(xInput, fInput, xe) {

    //Son los elementos que usaremos para mostrar los datos
    var tabla = document.createElement('table');
    var caja = document.querySelector('.box-resultados');

    try {
        //Quitamos los datos anteriores para mostrar los nuevos y no se amontonen
        caja.removeChild(caja.firstChild);
    } catch (error) {
        console.log(error);
    }

    caja.appendChild(tabla)

    //Ciclo donde crearemos los elementos de la tabla y los llenaremos con los conjuntos
    for (let j=0; j<fInput.length; j++) {

        var fila = document.createElement('thead');
        var celda1 = document.createElement('td');
        var celda2 = document.createElement('td');
        var celda3 = document.createElement('td');
        var celda4 = document.createElement('td');

        var celda = document.createElement('td'); 
        celda1.textContent = j;
        //Metemos los datos con 6 decimas
        celda2.textContent = xInput[j].toFixed(6);
        celda3.textContent = fInput[j].toFixed(6);
        celda4.textContent = xe[j].toFixed(6);

        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);
        fila.appendChild(celda4);

        tabla.appendChild(fila);
        
    }
}


export {mostrando};