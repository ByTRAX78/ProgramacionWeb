import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { addDoc, collection, Timestamp, getDocs , doc} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { initAuthStateListener } from "./app/auth.js";
import { db } from "./app/firebase.js";
import { borrarPregunta, borrarRespuesta } from "./BorrarModificarPostRespuesta.js";

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
                    });
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
                        const docRes = await addDoc(collection(doc(db, 'posts', btnResponder[i].value), 'respuestas'), {
                            fecha: date.toISOString(),
                            nombreUser: user.displayName,
                            imgUser: user.photoURL,
                            respuesta: txtResp[i].value
                        });

                        txtResp[i].value = '';

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

