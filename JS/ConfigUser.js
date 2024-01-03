import { updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { auth } from './app/firebase.js';
import { initAuthStateListener } from './app/auth.js';

var txtCorreo = document.querySelector('.txtCorreo');
var txtNombre = document.querySelector('.txtNombre');
var txtContraseña = document.querySelector('.txtContrasena');
var txtValidar = document.querySelector('.txtValidar');

var btnValidar = document.querySelectorAll('.validar');

var imgUser = document.querySelector('.imgUser');
var txtNombre = document.querySelector('.nombre');
var txtCorreo = document.querySelector('.correo');

for (let i = 0; i < btnValidar.length; i++) {
    btnValidar[i].addEventListener('click', async function() {
        console.log('Mete la contra');
        if (await validarUsuario()) {
            if (i == 0) {
                updateEmail(auth.currentUser, txtCorreo.value).then (() => {
    
                }).catch (() => {
                    console.log(error);
                });
            } else if (i == 1) {
                updatePassword(auth.currentUser, txtContraseña.value).then (() => {
    
                }).catch (()  => {
                    console.log(error);
                });
            } else if (i == 2) {
                updateProfile(auth.currentUser, {
                    displayName: txtNombre.value
                }).then(() => {
                    console.log('Nombre de usuario cambiado');
                }).catch(() => {
                    console.log(error);
                });
            } 
        } else {
            console.log('Contraseña incorrecta');
        }
    });   
}

function validarUsuario() {
    var user = auth.currentUser;
    console.log(txtValidar);
    
    return new Promise((resolve, reject) =>{
        btnValidar[3].addEventListener('click', function name() {
            user.reauthenticateWithCredential(user ,(user.email, txtValidar.value))

            .then (() => {
                resolve(true);
            }).catch((error) => {
                console.log(error);
                reject(false);
            });
        })
    });
    
}

initAuthStateListener(user => {

    console.log(txtCorreo);
    imgUser.src = user.photoURL;
    txtNombre.textContent = user.displayName;
    txtCorreo.textContent = user.email
});
    
    


