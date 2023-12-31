import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";    
import { auth, db } from './app/firebase.js';
import { borrarPregunta, borrarRespuesta } from "./BorrarModificarPostRespuesta.js";

  export function mostrarPosts(posts) {

    var post = document.createElement('div');
    post.classList.add('post');

    post.appendChild(SeccionUsuario(posts[0]));
    post.appendChild(SeccionPregunta(posts[0]));
    post.appendChild(SeccionRespuestas(posts));

    
    return post;
  }
      
  function SeccionUsuario(doc) {

    var usuarioPost = document.createElement('div');
    var imgUser = document.createElement('img');
    var pUsuario = document.createElement('p');
  
    usuarioPost.classList.add("usuario");
  
    imgUser.src = doc.data().imgUser;
    pUsuario.textContent = doc.data().nombreUser;
  
    usuarioPost.appendChild(pUsuario);
    usuarioPost.appendChild(imgUser);
  
    return usuarioPost;
  }

  function SeccionPregunta(doc) {
  
    var postsPregunta = document.createElement('div');
    var pPregunta = document.createElement('p');
  
    postsPregunta.classList.add("pregunta");
  
    pPregunta.textContent = doc.data().pregunta;
    postsPregunta.appendChild(pPregunta);
    
    return postsPregunta;
  }

  function SeccionRespuestas(doc) {
    
    //Este sera la seccion de respuestas del post
    var dRespuestas = document.createElement('div');
    /**
     * postsRespuesta contendra las respuestas que ya fueron respondidas
     * secionRespuesta es la seccion donde el usuario podra escribir una 
     * nueva respuesta
     */
    var postsRespuesta = document.createElement('div');
    var secionRespuesta = document.createElement('div');
    //usuarioResp es donde saldra la info del usuario que respondio el post
    var usuarioResp = document.createElement('div');
    //secRespuesta es la seccion que contendra la el txtArea para responder
    var secRespuesta = document.createElement('div');
    var txtRespuesta = document.createElement('textarea');
    //Seccion donde se podran econtrara el boton para enviar la respuesta
    var enviarResponder = document.createElement('div')
    var btnResponder = document.createElement('button');
    btnResponder.value = doc[0].id;
    
    dRespuestas.classList.add('respuestas');
  
    postsRespuesta.classList.add("respuesta");
    secionRespuesta.classList.add('escribirRespuesta');
  
  
    secRespuesta.classList.add('pregunta');
    txtRespuesta.classList.add('resp');
    enviarResponder.classList.add('postear');
    btnResponder.classList.add('responder');
  
    //Funcion para obtener las respuestas que esten asociadas al post
    ObtenerRespuestas(doc, postsRespuesta);
    //ObtenerRespuestas(doc, postsRespuesta);
    
    secRespuesta.appendChild(txtRespuesta);
    secionRespuesta.appendChild(secRespuesta);
    
    if (doc[0].data().nombreUser == auth.currentUser.displayName) {
      
      var btnBorrarPregunta = document.createElement('button');
      btnBorrarPregunta.classList.add('bPregunta');
      btnBorrarPregunta.value = doc[0].id;
      btnBorrarPregunta.textContent = 'Borrar'
      enviarResponder.appendChild(btnBorrarPregunta);
    }
  
  
    btnResponder.textContent = 'Responder';
    enviarResponder.appendChild(btnResponder);
    secionRespuesta.appendChild(enviarResponder);
  
    dRespuestas.appendChild(secionRespuesta);
    dRespuestas.appendChild(postsRespuesta);
  
    return dRespuestas;
  }

  async function ObtenerRespuestas(doc, usuarioResp) {


    var lon = doc.length - 1;

      for (let i = lon; i >= 1; i--) {

          console.log(doc[i]  );
          var datosUsuario = document.createElement('div');
          datosUsuario.classList.add('usuario');

          var nombreUsuario = document.createElement('p');
          var imgUsuario = document.createElement('img');
          var respuesta = document.createElement('p');

          nombreUsuario.textContent = doc[i].data().nombreUser;
          imgUsuario.src = doc[i].data().imgUser;
          respuesta.textContent = doc[i].data().respuesta;

          

          datosUsuario.appendChild(imgUsuario);
          datosUsuario.appendChild(nombreUsuario);
          datosUsuario.appendChild(respuesta);

          if (auth.currentUser.displayName == doc[i].data().nombreUser) {
            
            var btnErase = document.createElement('button');
            btnErase.textContent = 'Borrar';
            btnErase.classList.add('borrar');
            btnErase.value = doc[i].id;
            datosUsuario.appendChild(btnErase);
          }

          usuarioResp.appendChild(datosUsuario);
          
      }

    return usuarioResp;
    }

