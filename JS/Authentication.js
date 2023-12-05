import { createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { signInWithEmailAndPassword } from'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
const auth =     window.firebaseAuth;
const provider = window.firebaseAuth;

var buttonStatus = 'login';

var buttonsLoginAndSign = document.getElementsByClassName('a');

var email = document.querySelector('.email');
var pass = document.querySelector('.pass');



for (let i=0; i<buttonsLoginAndSign.length; i++) {

    document.getElementsByClassName('a')[i].addEventListener('click', function () {

        var buttonInnerHTML = this.classList[1];
        buttonStatus = buttonInnerHTML;
        buttonAnimation(buttonInnerHTML);
    });
}

function buttonAnimation(button) {
    
    var login = document.querySelector('.login');
    var sign = document.querySelector('.sign');

    var buttonChange = document.querySelector('.' + button);
    
    if (buttonChange.classList[1] == 'login') {

        login.classList.remove('buttonTransparent');
        sign.classList.add('buttonTransparent');
     } else {
        
        sign.classList.remove('buttonTransparent');
        login.classList.add('buttonTransparent');
    }
    buttonChange.classList.add('buttonColor');

}

var buttonEnter = document.querySelector('.validate');

buttonEnter.addEventListener('click', function() {
    console.log(buttonStatus);
    if (buttonStatus == 'login') {
        
        LoginAccount(email.value, pass.value);

    } else {

        RegisterAcount(email.value, pass.value);
    }
});

async function LoginAccount(email, pass) {
    try {
        signInWithEmailAndPassword(auth,email,pass);
    } catch (error) {
        alert(error);
    }
}

async function RegisterAcount(email, pass) {
    console.log(email);
    try {
        const regi = await createUserWithEmailAndPassword(auth, email, pass);
        console.log(regi.user);
    } catch (error) {
        console.log(error);
    }
}

