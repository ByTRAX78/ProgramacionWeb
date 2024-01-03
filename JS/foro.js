import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { addDoc, collection, Timestamp, getDocs , doc, getDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { initAuthStateListener } from "./app/auth.js";
import { db, auth } from "./app/firebase.js";
import { borrarPregunta, borrarRespuesta } from "./BorrarModificarPostRespuesta.js";
import { idsPreguntas, idsRespuestas } from "./RecuperarColelctions.js";
import {  mostrarPosts } from "./RecuperarPosts.js";

//Datos del logeo y de la base de datos de firebase

var btnEnviar = document.querySelector('.enviar');
var btnResponder = document.querySelectorAll('.responder'); 
var txtResp = document.querySelectorAll('.resp');

let date = new Date();  
var pregunta = document.querySelector('.pre')

initAuthStateListener(user => {

    if (user) {

        

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
                        
                        var datosUsuario = document.createElement('div');
                        datosUsuario.classList.add('usuario', 'answer');

                        var nombreUsuario = document.createElement('p');
                        var imgUsuario = document.createElement('img');
                        var respuesta = document.createElement('p');

                        nombreUsuario.textContent = user.displayName;
                        imgUsuario.src = user.photoURL;
                        respuesta.textContent = txtResp[i].value;

                        datosUsuario.appendChild(imgUsuario);
                        datosUsuario.appendChild(nombreUsuario);
                        datosUsuario.appendChild(respuesta);

                        if (auth.currentUser.displayName == user.currentUser) {
                            
                            var btnErase = document.createElement('button');
                            btnErase.textContent = 'Borrar';
                            btnErase.classList.add('borrar');
                            datosUsuario.appendChild(btnErase);
                        }
                        answer[i].appendChild(datosUsuario);

                    } catch (error) {
                        console.log(error);
                    }

                } 
            });
        }   

    } else {
        
        alert('No puedes postear y responder no estas logeado')
    }
});

 //Imagen de perfil del usuario actual
 var imgPerfil = document.querySelector('.perfil');

initAuthStateListener(user => {

    if (user) {
        console.log(imgPerfil);
        imgPerfil.src = user.photoURL;
    } else {
        alert('No puedes postear y responder no estas logeado')
    }
});

