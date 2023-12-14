const nerdamer = require('nerdamer/all');

// Función que representa la ecuación
function ecuacion(x) {
    return Math.pow(x, 4) - 3 * Math.pow(x, 3) + Math.pow(x, 2) - 5 * x + 2;
}

// Resolver la ecuación por el método de la falsa posición
function resolverEcuacion(a, b, tolerancia, maxIteraciones) {
    let iteracion = 0;
    let xn = 0;

    do {
        // Evaluar la ecuación en los extremos del intervalo
        const fa = ecuacion(a);
        const fb = ecuacion(b);

        // Calcular el nuevo valor de x usando la fórmula de la falsa posición
        xn = b - (fb * (b - a)) / (fb - fa);

        // Calcular el valor de la función en el nuevo xn
        const fxn = ecuacion(xn);

        // Verificar el cambio de signo y actualizar el intervalo
        if (fa * fxn < 0) {
            b = xn;
        } else {
            a = xn;
        }

        iteracion++;

        // Mostrar información sobre cada iteración
        console.log(`Iteración ${iteracion}: xn = ${xn}, f(xn) = ${fxn}, a = ${a}, b = ${b}`);

    } while (Math.abs(ecuacion(xn)) > tolerancia && iteracion < maxIteraciones);

    return xn;
}

// Intervalo inicial
const a = 0;
const b = 1;
const tolerancia = 1e-6;
const maxIteraciones = 100;

// Llamar a la función para resolver la ecuación por el método de la falsa posición
const valorDeX = resolverEcuacion(a, b, tolerancia, maxIteraciones);

// Mostrar el resultado
console.log("El valor de x1 aproximado es:", valorDeX);

