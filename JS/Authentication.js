import { SignInUsers, CreateUser, ResetPassword } from "./app/EmailProvider.js";
        
//Obtener elementos para el inicio de sesión con correo
var buttonStatus = 'login';
var buttonsLoginAndSign = document.getElementsByClassName('a');
var email = document.querySelector('.email');
var pass = document.querySelector('.pass');
var name = document.querySelector('.name');

//Evento para iniciar sesión o para registrar un correo electronico
for (let i=0; i<buttonsLoginAndSign.length; i++) {

    document.getElementsByClassName('a')[i].addEventListener('click', function () {

        var buttonInnerHTML = this.classList[1];
        buttonStatus = buttonInnerHTML;
    });
}

var buttonEnter = document.querySelector('.validate');
//En esta parte decidimos si el usuarios quiere un inicio de sesion o rehistrar un usuario
try {
    buttonEnter.addEventListener('click', function() {
        console.log(buttonStatus);
        if (buttonStatus == 'login') {
            console.log('vamos a iniciar sesion');
            SignInUsers( email.value, pass.value);
    
        } else {
            console.log('vamos a crear usuarios');
            CreateUser(name.value, email.value, pass.value);
        }
    });
} catch (error) {
    console.log(error);
}

var btnRecuperar = document.querySelector('.recuperar');

btnRecuperar.addEventListener('click', function name() {
    ResetPassword(prompt('Dame el email'));
})