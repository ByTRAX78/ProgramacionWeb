var i = 0;



function mostrando(xInput, fInput, xe) {

    var tabla = document.createElement('table');
    var caja = document.querySelector('.box-resultados');

    try {
        
        caja.removeChild(caja.firstChild);
    } catch (error) {
        console.log(error);
    }

    caja.appendChild(tabla)


    for (let j=0; j<fInput.length; j++) {

        var fila = document.createElement('thead');
        var celda1 = document.createElement('td');
        var celda2 = document.createElement('td');
        var celda3 = document.createElement('td');
        var celda4 = document.createElement('td');

        var celda = document.createElement('td'); 
        celda1.textContent = j;
        celda2.textContent = xInput[j].toFixed(6);
        celda3.textContent = fInput[j].toFixed(6);
        celda4.textContent = xe[j].toFixed(6);

        fila.appendChild(celda1);
        fila.appendChild(celda2);
        fila.appendChild(celda3);
        fila.appendChild(celda4);

        tabla.appendChild(fila);
        
    }

    
    
    /*if (xInput == 0) {
        var fila = document.createElement('thead');
        var encabezados = ['Iteracion', 'x', 'f(x)', 'Convergencia'];

        for (let j=0; j<4; j++) {
            
            var celda = document.createElement('td');
            celda.textContent = encabezados[j];

            fila.appendChild(celda);
            tablaResultado.appendChild(fila);
        }
        i++;
        console.log(i);

    }
        fila = document.createElement('thead');
        var celda = [];
        celda[0] = document.createElement('td');
        celda[0].textContent = xInput;
        fila.appendChild(celda[0]);

        celda[1] = document.createElement('td');
        celda[1].textContent = fInput;
        fila.appendChild(celda[1]);
        tablaResultado.appendChild(fila);

    


    i++;*/
    
}


export {mostrando};