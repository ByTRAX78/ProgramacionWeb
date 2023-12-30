import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
//import { db } from '../JS/Authentication.js';
import { addDoc, collection, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { log } from "mathjs";
import { initAuthStateListener } from "./app/auth.js";

//Datos del logeo y de la base de datos de firebase

initAuthStateListener(user => {
    if (user) {
        var photo = user.photoURL;
    } else {

    }
});

//Imagen de perfil del usuario actual
var imgPerfil = document.querySelectorAll('.perfil');

//Elementos para que el usuario publique o responde post
var btnResponder = document.querySelectorAll('.responder');
var txtResp = document.querySelectorAll('.resp');

for (let i = 0; i < imgPerfil.length; i++) {
    //POnemos  la foto de perfil del usuario en donde corresponda
    imgPerfil[i].src = photo;
}
imgPerfil.src = photo;

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

