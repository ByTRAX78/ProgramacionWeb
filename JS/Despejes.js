<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Despeje de Ecuaciones</title>
  <script src="https://algebrite.org/dist/algebrite.bundle-for-browser.js"></script>
</head>
<body>
  <label for="ecuacionInput">Ingrese la ecuación: </label>
  <input type="text" id="ecuacionInput" placeholder="ej. 4*(x)**3 - 2*(x)**2 + 3*(x) - 5">
  <button onclick="despejarEcuacion()">Despejar</button>

  <script>
    function despejarEcuacion() {
      const ecuacionInput = document.getElementById('ecuacionInput').value;

      try {
        // Utilizar Algebrite para despejar la variable
        const resultado = Algebrite.run(`solve(${ecuacionInput}, x)`);

        console.log(`La solución para la ecuación ${ecuacionInput} es x = ${resultado}`);
      } catch (error) {
        console.error("Error al despejar la ecuación:", error);
      }
    }
  </script>
</body>
</html>