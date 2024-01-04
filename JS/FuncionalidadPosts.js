import { addDoc, collection, Timestamp, getDocs , doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { initAuthStateListener } from "./app/auth.js";
import { db } from "./app/firebase.js";
import { ModificarPost, ModificarRespuesta } from "./BorrarModificarPostRespuesta.js";
import { idsPreguntas, idsRespuestas } from "./RecuperarColelctions.js";
import { borrarPregunta, borrarRespuesta } from "./BorrarModificarPostRespuesta.js";

    var btnModificar = document.querySelectorAll('.modificar');
    var btnModificarRespuesta = document.querySelectorAll('.modRespuesta')
    let date = new Date();  
    var cla = [
        'text-white', 
        'bg-gradient-to-r',
        'from-cyan-500', 
        'to-blue-500',
        'hover:bg-gradient-to-bl', 
        'focus:ring-4',
        'focus:outline-none',
        'focus:ring-cyan-300', 
        'dark:focus:ring-cyan-800',
        'font-medium',
        'rounded-lg', 
        'text-sm', 
        'px-5',
        'py-2.5', 
        'text-center', 
        'me-2', 
        'mb-2'];

    initAuthStateListener(user => {

        
    
        if (user) {

            var btnsPost = document.querySelectorAll('.postear');
        
            for (let i = 0; i < btnsPost.length; i++) {
                btnsPost[i].addEventListener('click', async function (event) {
                    var btn = event.target;

                    if (btn.classList.contains('responder')) {
                        var padre = btn.closest('.respuestas')
                        
                        var txtArea = padre.querySelector('.resp')
                

                        if (txtArea.value.trim() !== '') {
                            try {
                                var seccionRespuesta = padre.querySelector('.respuesta');
                                
                                
                                const docRes = await addDoc(collection(doc(db, 'posts', btn.getAttribute('id-document')), 'respuestas'), {
                                    fecha: date.toISOString(),
                                    nombreUser: user.displayName,
                                    imgUser: user.photoURL,
                                    respuesta: txtArea.value
                                });

                                txtArea.value = '';

                                const docSnap = await getDoc(docRes);
                            
                                var datosUsuario = document.createElement('div');
                                datosUsuario.classList.add('usuario', 'answer');

                                var nombreUsuario = document.createElement('p');
                                var imgUsuario = document.createElement('img');
                                var respuesta = document.createElement('p');

                                nombreUsuario.textContent = docSnap.data().nombreUser;
                                imgUsuario.src = docSnap.data().imgUser;
                                respuesta.textContent = docSnap.data().respuesta;
                                respuesta.classList.add('textRespuesta');

                                datosUsuario.appendChild(imgUsuario);
                                datosUsuario.appendChild(nombreUsuario);
                                datosUsuario.appendChild(respuesta);

                                var btnErase = document.createElement('button');
                                btnErase.textContent = 'Borrar';
                                btnErase.classList.add(
                                'borrar',
                                ...cla
                                );
                                btnErase.setAttribute('id-document', docSnap.id)
                                btnErase.setAttribute('id-father', idsPreguntas[i])
                                var btnMod = document.createElement('button');
                                btnMod.textContent = 'Modificar';
                                btnMod.classList.add(
                                'modRespuesta',
                                ...cla
                                );
                                btnMod.setAttribute('id-document', docSnap.id)
                                btnMod.setAttribute('id-father', idsPreguntas[i])
                                datosUsuario.appendChild(btnMod);
                                datosUsuario.appendChild(btnErase);

                                seccionRespuesta.appendChild(datosUsuario);

                            } catch (error) {
                                console.log(error);
                            }
                        }

                    } else if (btn.classList.contains('modificar')) {
                        var postModificado = prompt('Escribe el post modificado' );
                        ModificarPost(btn.getAttribute('id-document'), postModificado);
                        var padre = btn.closest('.post');
                        var pregunta = padre.querySelector('.preguntaPost');
                        pregunta.textContent = '';
                        pregunta.textContent = postModificado;
                    } else if (btn.classList.contains('bPregunta')) {
                        borrarPregunta(btn.getAttribute('id-document'));
                        var padre = btn.closest('.post');
                        padre.remove()
                    }
                })
            }

        var btnRespuestas = document.querySelectorAll('.usuario');

        for (let i = 0; i < btnRespuestas.length; i++) {
            btnRespuestas[i].addEventListener('click', function (event) {
                var btn = event.target;

                if (btn.classList.contains('modRespuesta')) {
                    
                    var respModificada = prompt('Escribe la respuesta modificada');
                    ModificarRespuesta(btn.getAttribute('id-father'),btn.getAttribute('id-document'), respModificada);
                    var textArea = btnRespuestas[i].querySelector('.textRespuestas');
                    textArea.value = respModificada;
                } 
            })
            
        }
        } 
    });

       var btnBorrarRespuesta = document.getElementById('posts')
       console.log(btnBorrarRespuesta);

    btnBorrarRespuesta.addEventListener('click', function(event) {
        
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

  

