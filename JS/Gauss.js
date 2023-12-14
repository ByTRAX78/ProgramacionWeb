// Función que se llama cuando se hace clic en el botón de cálculo
function calculate() {
    // Inicializa la matriz y los valores a partir de los campos de entrada en el HTML
    let matrix = [];
    let values = [];
    let inputs = document.getElementsByClassName('matrixInput');
    let valueInputs = document.getElementsByClassName('valuesInput');
 
    for (let i = 0; i < 3; i++) {
        matrix[i] = [];
        for (let j = 0; j < 3; j++) {
            matrix[i][j] = inputs[i*3 + j].value;
        }
        values[i] = valueInputs[i].value;
    }
 
    // Calcula la solución usando el método de Gauss-Seidel
    let solution = gaussSeidel(matrix, values);
 
    // Muestra la solución final en la tabla de resultados en el HTML
    let resultsTable = document.getElementById('resultsTable');

 
    for (let i = 0; i < solution.length; i++) {
        let row = resultsTable.insertRow();
        let cell = row.insertCell();
        cell.textContent = solution[i];
    }
 }
 
 // Función que implementa el método de Gauss-Seidel para resolver el sistema de ecuaciones
 function gaussSeidel(matrix, values) {
    // Inicializa la solución y los parámetros del método
    let size = matrix.length;
    let solution = Array(size).fill(0);
    let EPSILON = 0.00001;
    let MAX_ITERATIONS = 10000;
 
    // Realiza las iteraciones del método de Gauss-Seidel
    for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
        let continueIterating = false;
 
        for (let i = 0; i < size; i++) {
            let sum1 = 0;
            let sum2 = matrix[i][size - 1] * solution[i];
 
            // Suma los términos que no dependen de la variable actual
            for (let j = 0; j < size; j++) {
                if (i != j) {
                   sum1 += matrix[i][j] * solution[j];
                }
            }
 
            // Calcula el nuevo valor de la variable actual
            let newValue = (values[i] - sum1) / matrix[i][i];
 
            // Si el nuevo valor es diferente al valor actual con un margen de error,
            // actualiza el valor y establece la bandera para continuar iterando
            if (Math.abs(newValue - solution[i]) > EPSILON) {
                solution[i] = newValue;
                continueIterating = true;
 
                // Muestra la solución actual en la tabla de resultados en el HTML
                let resultsTable = document.getElementById('resultsTable');
                let row = resultsTable.insertRow();
                for (let j = 0; j < size; j++) {
                   let cell = row.insertCell();
                   cell.textContent = solution[j];
                }
            }
        }
 
        // Si no hay ninguna actualización en la iteración actual, detiene las iteraciones
        if (!continueIterating) {
            break;
        }
    }
 
    // Devuelve la solución final
    return solution;
 }
 