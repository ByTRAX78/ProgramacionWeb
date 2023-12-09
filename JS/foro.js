import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
//import { db } from '../JS/Authentication.js';
import { addDoc, collection, Timestamp} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const auth = window.firebaseAuth;
const db = window.firebaseAuth;
const user = JSON.parse(localStorage.getItem('user'));

var imgPerfil = document.querySelector('.perfil');
imgPerfil.src = user.photoURL;

let date = new Date();
console.log(date.toISOString());

//console.log(auth);
console.log(user);
console.log(db);

var pregunta = document.querySelector('.pre')
var btnEnviar = document.querySelector('.enviar');

btnEnviar.addEventListener('click', async function name() {

    console.log('Empecemos a postear');
    
    try {
        const docRef = await addDoc(collection(db, 'posts'), {
            fecha: date.toISOString() ,
            nombreUsuario: user.displayName,
            pregunta: pregunta.value
        });
    } catch (error) {
        console.log(error);
    }
    
});