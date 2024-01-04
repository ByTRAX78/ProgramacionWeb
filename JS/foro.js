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
                    
                    var posts = document.querySelector("#posts");
                    posts.appendChild(postNuevo );
                } catch (error) {
                    console.log(error);
                }
                //Reseteamos el txtArea para el usuario
                pregunta.value = '';
            }
        });

        //Elementos para que el usuario publique o responde post
       

      

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

import('./FuncionalidadPosts.js').then(module => {

});

