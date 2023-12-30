import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";    7
import { user } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./Authentication.js"
import { borrarPregunta, borrarRespuesta } from "./BorrarModificarPostRespuesta.js";
//Varaibles con datos de la base de datos de firebas
const db = window.firebaseAuth;

var posts = document.querySelector("#posts");
var cResp = [];

const querySnapshot = await getDocs(collection(db, "posts"));
//const user = JSON.parse(localStorage.getItem('user'));

console.log(user);

var j = 0;
var idPost = [];
//en este ciclo obtnemos los posts de la base de datos
querySnapshot.forEach((doc) => {

  console.log(doc);
  idPost.push(doc.id);
  //Funcion para obtener los datos del usuario y mostrarlos 
  var usuarioPost = SeccionUsuario(doc);
  //Funcion para obtner la pregnta y mostrarlos
  var postsPregunta = SeccionPregunta(doc);
  //Seccion para prepara la seccion de preguntas y mostrarlas
  var dRespuestas = SeccionRespuestas(doc);

  //La condicional para saber si se mostrara en la izquierda o en la derecha
  if (j % 2 == 0) {
    var postsLeft = document.createElement('div');
    postsLeft.classList.add("post");
    postsLeft.classList.add("left");
   
    
  
    postsLeft.appendChild(usuarioPost);
    postsLeft.appendChild(postsPregunta);
    postsLeft.appendChild(dRespuestas);
    posts.appendChild(postsLeft);
  } else if (j % 2 != 0) {
    var postsRight = document.createElement('div');
    postsRight.classList.add("post");
    postsRight.classList.add("right");

    
    postsRight.appendChild(usuarioPost);
    postsRight.appendChild(postsPregunta);
    postsRight.appendChild(dRespuestas);
    posts.appendChild(postsRight);
  }
  j++;
});

//Elementos para que el usuario pueda responder posts
let date = new Date();
var btnResponder = document.querySelectorAll('.responder');
var txtResp = document.querySelectorAll('.resp')
var j = 0;

//Aqui obtnemos el post la seccion donde el usuario quiere responder
for (let i = 0; i  < btnResponder.length;i++) {
  btnResponder[i].addEventListener('click', async function name() {
      
    if (txtResp[i].value.trim() !== '') {
      try {
        const docRes = await addDoc(collection(db, 'respuestas'), {
          fecha: date.toISOString(),
          nombreUsuario: user.displayName,
          imgUsuario: user.photoURL,
          respuesta: txtResp[i].value,
          idPregunta: idPost[i]
        });
      } catch (error) {
        console.log(error);
      }
      txtResp[i].value = '';
      alert('Tu respuesta se envio');
    }
    
  });
}

//Obtenemos los datos del ususaior para mostrarlos en pantalla y se muestran
function SeccionUsuario(doc) {
  
  var usuarioPost = document.createElement('div');
  var imgUser = document.createElement('img');
  var pUsuario = document.createElement('p');

  usuarioPost.classList.add("usuario");

  imgUser.src = doc.data().imgUsuario;
  pUsuario.textContent = doc.data().nombreUsuario;

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
//Creamos los elemetos para mostrar la respuesta y los mostramos 
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

  
  dRespuestas.classList.add('respuestas');

  postsRespuesta.classList.add("respuesta");
  secionRespuesta.classList.add('escribirRespuesta');


  secRespuesta.classList.add('pregunta');
  txtRespuesta.classList.add('resp');
  enviarResponder.classList.add('postear');
  btnResponder.classList.add('responder');

  //Funcion para obtener las respuestas que esten asociadas al post
  ObtenerRespuestas(doc, postsRespuesta);
  
  secRespuesta.appendChild(txtRespuesta);
  secionRespuesta.appendChild(secRespuesta);
  
  if (doc.data().nombreUsuario == user.displayName) {
    
    var btnBorrarPregunta = document.createElement('button');
    btnBorrarPregunta.classList.add('bPregunta');
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

  //Obtnemos la collecion de respuestas 
  const queryResults = await getDocs(collection(db,'respuestas'));

  queryResults.forEach(answers => {

    //Con el id del post vamos verificando que respuestas tiene asociadas
    if (answers.data().idPregunta == doc.id) {

      //Creamos los elementos para mostrar las respuestas
      cResp.push(answers.id);
      var datosUsuario = document.createElement('div');

      var nombreUsuario = document.createElement('p');
      var imgUsuario = document.createElement('img');
      var respuesta = document.createElement('p');
      
      datosUsuario.classList.add('usuario');

      //Ponemos los datos de la sesion existente
      nombreUsuario.textContent = answers.data().nombreUsuario;
      imgUsuario.src = answers.data().imgUsuario;
      respuesta.textContent = answers.data().respuesta;

      datosUsuario.appendChild(imgUsuario);
      datosUsuario.appendChild(nombreUsuario);
      datosUsuario.appendChild(respuesta);
      
      //Verificamos con el id del post que las respuestas que estan asociadas a el
      if (user.displayName == answers.data().nombreUsuario) {
        console.log('Aqui si');
        var btnErase = document.createElement('button');
        btnErase.textContent = 'Borrar';
        btnErase.classList.add('borrar');
        datosUsuario.appendChild(btnErase);

        btnErase.addEventListener('click', function name(params) {
          console.log('Vamo a borrar ' + answers.id);
          borrarRespuesta(answers.id);
        });
      }

      usuarioResp.appendChild(datosUsuario);
    }
    return usuarioResp;
  });
}


var btnsBorrarPregunta = document.querySelectorAll('.bPregunta');

//Evento para borrar una pregunta
for (let i = 0; i < btnsBorrarPregunta.length; i++) {
  
  btnsBorrarPregunta[i].addEventListener('click', function name() {
    borrarPregunta(idPost[i]);
  });
}