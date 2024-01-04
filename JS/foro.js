import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { addDoc, collection, Timestamp, getDocs , doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { initAuthStateListener } from "./app/auth.js";
import { db, auth } from "./app/firebase.js";
import { borrarPregunta, borrarRespuesta } from "./BorrarModificarPostRespuesta.js";
import { idsPreguntas, idsRespuestas } from "./RecuperarColelctions.js";
import {  ObtenerRespuestas, mostrarPosts } from "./RecuperarPosts.js";

//Datos del logeo y de la base de datos de firebase

var btnEnviar = document.querySelector('.enviar');
var btnResponder = document.querySelectorAll('.responder'); 
var txtResp = document.querySelectorAll('.resp');
let date = new Date();  
var pregunta = document.querySelector('.pre');

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

            
    console.log(txtResp);

        var photo = user.photoURL;
        btnEnviar.addEventListener('click', async function name() {

            if (pregunta.value.trim() !== '') {
                
                try {
                    //Guardamos los post generados por el usuario en la base de datos
                    const docRef = await addDoc(collection(db, 'posts'), {
                        fecha: date.toISOString() ,
                        nombreUser: user.displayName,
                        imgUser: user.photoURL,
                        pregunta: pregunta.value
                    })
                    const docSnap = [];
                    docSnap.push(await getDoc(doc(db,'posts',docRef._key.path.segments[1]))); 
                    var postNuevo = mostrarPosts(docSnap);

                    /*if (i % 2 == 0) {
                        postNuevo.classList.add('left')
                    } else {
                        postNuevo.classList.add('right')
                    }*/
                    var posts = document.querySelector("#posts");
                    posts.appendChild(postNuevo );
                } catch (error) {
                    console.log(error);
                }
                //Reseteamos el txtArea para el usuario
                pregunta.value = '';
                alert('Tu pregunta se envio');
            }
        });

        //Elementos para que el usuario publique o responde post
       

       for (let i = 0; i < btnResponder.length; i++) {
            btnResponder[i].addEventListener('click', async function name() {

                if (txtResp[i].value.trim() !== '') {
                    
                    try {
                        var answer = document.querySelectorAll('.respuesta');

                        const docRes = await addDoc(collection(doc(db, 'posts', idsPreguntas[i]), 'respuestas'), {
                            fecha: date.toISOString(),
                            nombreUser: user.displayName,
                            imgUser: user.photoURL,
                            respuesta: txtResp[i].value
                        });

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

                        answer[i].appendChild(datosUsuario);

                    } catch (error) {
                        console.log(error);
                    }

                } 
            });
        }   

    } else {
        
       
    }
});

 //Imagen de perfil del usuario actual
 var imgPerfil = document.querySelector('.perfil');

initAuthStateListener(user => {

    if (user) {
        imgPerfil.src = user.photoURL;
    } else {
    }
});

