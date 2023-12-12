var ecuacion1 = document.querySelector('.ecuacion');
var caja_ecuacion = document.getElementById('caja-ecuacion');

ecuacion1.addEventListener('input', function name() {
    
    var otraEcuacion = document.createElement('input');
    otraEcuacion.classList.add('ecuacion');
    caja_ecuacion.appendChild(otraEcuacion);
    
    
});