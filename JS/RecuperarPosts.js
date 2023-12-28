import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";    
import { auth } from "./Authentication.js"
import { imgPerfil } from "./foro.js";
const db = window.firebaseAuth;

var posts = document.querySelector("#posts");

const querySnapshot = await getDocs(collection(db, "posts"));
const user = JSON.parse(localStorage.getItem('user'));

var j = 0;
var idPost = [];

querySnapshot.forEach((doc) => {

  console.log(doc);
  idPost.push(doc.id);

  var usuarioPost = document.createElement('div');
  usuarioPost.classList.add("usuario");
  var postsPregunta = document.createElement('div');
  postsPregunta.classList.add("pregunta");
  var dRespuestas = document.createElement('div');
  dRespuestas.classList.add('respuestas');
  var postsRespuesta = document.createElement('div');
  postsRespuesta.classList.add("respuesta");
  var secionRespuesta = document.createElement('div');
  secionRespuesta.classList.add('escribirRespuesta');
  var usuarioResp = document.createElement('div');
  usuarioResp.classList.add('usuario')
  secionRespuesta.appendChild(usuarioResp)
  var secRespuesta = document.createElement('div');
  secRespuesta.classList.add('pregunta');
  var txtRespuesta = document.createElement('textarea');
  txtRespuesta.classList.add('resp');
  secRespuesta.appendChild(txtRespuesta);
  secionRespuesta.appendChild(secRespuesta);
  var enviarResponder = document.createElement('div')
  enviarResponder.classList.add('postear');
  var btnResponder = document.createElement('button');
  btnResponder.textContent = 'Responder';
  btnResponder.classList.add('responder');
  enviarResponder.appendChild(btnResponder);
  secionRespuesta.appendChild(enviarResponder);

  var imgUser = document.createElement('img');
    var pUsuario = document.createElement('p');

    imgUser.src = doc.data().imgUsuario;
    usuarioPost.appendChild(imgUser);

    pUsuario.textContent = doc.data().nombreUsuario;
    usuarioPost.appendChild(pUsuario);

    var pPregunta = document.createElement('p');
    pPregunta.textContent = doc.data().pregunta;
    postsPregunta.appendChild(pPregunta);

  if (j % 2 == 0) {
    var postsLeft = document.createElement('div');
    postsLeft.classList.add("post");
    postsLeft.classList.add("left");
   
    
  
    postsLeft.appendChild(usuarioPost);
    postsLeft.appendChild(postsPregunta);
    dRespuestas.appendChild(secionRespuesta);
    dRespuestas.appendChild(postsRespuesta);
    postsLeft.appendChild(dRespuestas);
    posts.appendChild(postsLeft);
  } else if (j % 2 != 0) {
    var postsRight = document.createElement('div');
    postsRight.classList.add("post");
    postsRight.classList.add("right");

    
    postsRight.appendChild(usuarioPost);
    postsRight.appendChild(postsPregunta);
    dRespuestas.appendChild(secionRespuesta);
    dRespuestas.appendChild(postsRespuesta);
    postsRight.appendChild(dRespuestas);
    posts.appendChild(postsRight);
  }
  j++;
});
console.log(idPost);
let date = new Date();
var btnResponder = document.querySelectorAll('.responder');
var txtResp = document.querySelectorAll('.resp')
var j = 0;
for (let i = 0; i  < btnResponder.length;i++) {
  btnResponder[i].addEventListener('click', async function name() {
      
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
  });
  
}

export { querySnapshot };