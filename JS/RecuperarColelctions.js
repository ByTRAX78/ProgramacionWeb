import { collection, getDocs, doc, getDoc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { auth, db } from './app/firebase.js';
import { mostrarPosts } from "./RecuperarPosts.js";
import { initAuthStateListener } from "./app/auth.js";

console.log(db);

var idsRespuestas = [];
var idsPreguntas = [];

const obtenerRespuestas = async (docFather) => {
    const collectionRespuestas = await getDocs(collection(db, 'posts', docFather.id, 'respuestas'));
    const postWithAnswer = [docFather];

    collectionRespuestas.forEach(docs => {
        postWithAnswer.push(docs);
    });

    return postWithAnswer;
};

const obtenerDatos = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const post = [];

    for (const doc of querySnapshot.docs) {
        post.push(await obtenerRespuestas(doc));
    }

    return post;
};


var posts = document.querySelector("#posts");
  
const post = await obtenerDatos();

for (let i = 0; i < post.length; i++) {
    
    var divpost = mostrarPosts(post[i]);

    if (i % 2 == 0) {
        divpost.classList.add('left')
    } else {
        divpost.classList.add('right')
    }

    posts.appendChild(divpost);
}

import('./foro.js').then(module => {

});

var btnBorrarPregunta = document.querySelectorAll('.bPregunta');

for (let i = 0; i < btnBorrarPregunta.length; i++) {
    
    btnBorrarPregunta[i].addEventListener('click', function name() {
        borrarPregunta(btnBorrarPregunta[i].value);
    })
}

var btnBorrarRespuesta = document.querySelectorAll('.borrar');

for (let i = 0; i < btnBorrarRespuesta.length; i++) {
    
    btnBorrarRespuesta[i].addEventListener('click', function name() {
        
        borrarRespuesta(btnBorrarRespuesta[i].value);
    })
}