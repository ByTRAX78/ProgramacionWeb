import { initAuthStateListener } from "./app/auth.js";
import { ModificarPost, ModificarRespuesta } from "./BorrarModificarPostRespuesta.js";
import { idsPreguntas, idsRespuestas } from "./RecuperarColelctions.js";
import { borrarPregunta, borrarRespuesta } from "./BorrarModificarPostRespuesta.js";

    var btnModificar = document.querySelectorAll('.modificar');
    var btnModificarRespuesta = document.querySelectorAll('.modRespuesta')

    initAuthStateListener(user => {
    
        if (user) {
            for (let i = 0; i < btnModificar.length; i++) {
                
                btnModificar[i].addEventListener('click', function name() {
                    var postModificado = prompt('Escribe el post modificado' );
                    ModificarPost(idsPreguntas[i], postModificado);
                    var pPregunta = document.querySelectorAll('.preguntaPost');
                    pPregunta[i].textContent = '';
                    pPregunta[i].textContent = postModificado
                  })  
            }

            for (let j = 0; j < btnModificarRespuesta.length; j++) {
                
                btnModificarRespuesta[j].addEventListener('click', function name() {
                    var respModificada = prompt('Escribe la respuesta modificada');
                    ModificarRespuesta(idsRespuestas[j], respModificada);
                })
            }
         
        } 
    });
  
    var btnBorrarPregunta = document.querySelectorAll('.bPregunta');

for (let i = 0; i < btnBorrarPregunta.length; i++) {
    btnBorrarPregunta[i].addEventListener('click', function name() {
        borrarPregunta(idsPreguntas[i], i);
        var padre = btnBorrarPregunta[i].closest('.post');
        padre.remove()
    })
}

       var btnBorrarRespuesta = document.getElementById('posts')

    btnBorrarRespuesta.addEventListener('click', function(event) {
        
        /*console.log(i, cantidadRespuestas, btnBorrarRespuesta, padre);
        borrarRespuesta(idsRespuestas[i], i);
        console.log(btnBorrarRespuesta[i].parentNode, btnBorrarRespuesta[i]);
        var padre = btnBorrarRespuesta[i].parentNode;
        padre.remove()
        console.log(i, cantidadRespuestas, btnBorrarRespuesta, padre);*/
        const btn = event.target;

        if (btn.classList.contains('borrar')) {
            var padre = btn.parentNode;
            padre.remove();
            borrarRespuesta(btn.getAttribute('id-father'), btn.getAttribute('id-document'));
        } else if (btn.classList.contains('modRespuesta')) {
            var padre = btn.parentNode;
            var p = padre.querySelector('.textRespuesta');
            var respuestaModificado = prompt('Escribe la respuesta modificado' );
            p.textContent = respuestaModificado

            ModificarRespuesta(btn.getAttribute('id-father'), btn.getAttribute('id-document'), respuestaModificado)
        }
    })

  

