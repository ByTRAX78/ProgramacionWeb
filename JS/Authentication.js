import { SignInUsers, CreateUser } from "./app/EmailProvider.js";
        
//Obtener elementos para el inicio de sesión con correo
var buttonStatus = 'login';
var buttonsLoginAndSign = document.getElementsByClassName('a');
var email = document.querySelector('.email');
var pass = document.querySelector('.pass');
var name = document.querySelector('.name');
var forms = document.querySelector('.forms');

forms.removeChild(name);

//Evento para iniciar sesión o para registrar un correo electronico
for (let i=0; i<buttonsLoginAndSign.length; i++) {

    document.getElementsByClassName('a')[i].addEventListener('click', function () {

        var buttonInnerHTML = this.classList[1];
        buttonStatus = buttonInnerHTML;
        buttonAnimation(buttonInnerHTML);
    });
}

//Animacion para los botones 
function buttonAnimation(button) {
    
    var login = document.querySelector('.login');
    var sign = document.querySelector('.sign');

    var buttonChange = document.querySelector('.' + button);
    
    if (buttonChange.classList[1] == 'login') {

        login.classList.remove('buttonTransparent');
        forms.removeChild(name);
        sign.classList.add('buttonTransparent');
     } else {
        
        sign.classList.remove('buttonTransparent');
        forms.appendChild(name);
        login.classList.add('buttonTransparent');
    }
    buttonChange.classList.add('buttonColor');

}

var buttonEnter = document.querySelector('.validate');
//En esta parte decidimos si el usuarios quiere un inicio de sesion o rehistrar un usuario
try {
    buttonEnter.addEventListener('click', function() {
        console.log(buttonStatus);
        if (buttonStatus == 'login') {
            
            SignInUsers(email.value, pass.value);
    
        } else {
    
            CreateUser(name.value, email.value, pass.value);
        }
    });
} catch (error) {
    console.log(error);
}