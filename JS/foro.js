import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
//import { db } from '../JS/Authentication.js';
import { addDoc, collection, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

//Datos del logeo y de la base de datos de firebase
const auth = window.firebaseAuth;
const db = window.firebaseAuth;
const user = JSON.parse(localStorage.getItem('user'));

//Imagen de perfil del usuario actual
var imgPerfil = document.querySelectorAll('.perfil');

//Elementos para que el usuario publique o responde post
var btnResponder = document.querySelectorAll('.responder');
var txtResp = document.querySelectorAll('.resp');

for (let i = 0; i < imgPerfil.length; i++) {
    //POnemos  la foto de perfil del usuario en donde corresponda
    imgPerfil[i].src = user.photoURL;
}
imgPerfil.src = user.photoURL;

let date = new Date();  
var pregunta = document.querySelector('.pre')
var btnEnviar = document.querySelector('.enviar');

btnEnviar.addEventListener('click', async function name() {

    if (pregunta.value.trim() !== '') {
        
        try {
            //Guardamos los post generados por el usuario en la base de datos
            const docRef = await addDoc(collection(db, 'posts'), {
                fecha: date.toISOString() ,
                nombreUsuario: user.displayName,
                imgUsuario: user.photoURL,
                pregunta: pregunta.value
            });
        } catch (error) {
            console.log(error);
        }
        //Reseteamos el txtArea para el usuario
        pregunta.value = '';
        alert('Tu pregunta se envio');
    }
});

export { imgPerfil };