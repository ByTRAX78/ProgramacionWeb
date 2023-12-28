import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
//import { db } from '../JS/Authentication.js';
import { addDoc, collection, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { querySnapshot } from "./RecuperarPosts.js";



const auth = window.firebaseAuth;
const db = window.firebaseAuth;
const user = JSON.parse(localStorage.getItem('user'));

var imgPerfil = document.querySelectorAll('.perfil');

var btnResponder = document.querySelectorAll('.responder');
var txtResp = document.querySelectorAll('.resp');

for (let i = 0; i < imgPerfil.length; i++) {
    imgPerfil[i].src = user.photoURL;
    
}
imgPerfil.src = user.photoURL;

let date = new Date();  

var pregunta = document.querySelector('.pre')
var btnEnviar = document.querySelector('.enviar');

btnEnviar.addEventListener('click', async function name() {

    console.log('Empecemos a postear');
    
    try {
        const docRef = await addDoc(collection(db, 'posts'), {
            fecha: date.toISOString() ,
            nombreUsuario: user.displayName,
            imgUsuario: user.photoURL,
            pregunta: pregunta.value
        });
    } catch (error) {
        console.log(error);
    }
    
});



export { imgPerfil };