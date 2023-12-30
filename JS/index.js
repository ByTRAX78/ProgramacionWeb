import { initAuthStateListener } from "./app/auth.js";
import { Out } from "./app/logout.js";

var aOtherFunctions = document.getElementsByClassName('separacion');

var contenedorIframe = document.getElementById('frame');

var iframe = document.createElement('iframe');

//Preparamos el frame para mostrar la pagian web correspondiente
iframe.src = '../HTML/index.html';
//La ponemos el tamaño requerido
iframe.width = '100%';
iframe.height = '100%';
iframe.frameBorder = '0';
//Vaciamos el anterior frame
contenedorIframe.innerHTML = '';
//Ponemos el nuevo frame
contenedorIframe.appendChild(iframe);
var btnLogin = document.querySelector('.Login');
var overlay = document.getElementById('overlay');
//Preparamos el frame  para mostrar la pagina web de inicio de sesión y registro de usuario
var frameLogin = document.createElement('iframe');
//Lo ocultamos para que quede en espera de que el usuario lo requiera
overlay.style.visibility = 'hidden';

//Evento en espera del click del boton de login
btnLogin.addEventListener('click', function name() {

    //Creamos un boton para que el usuario pueda salir
    var btnSalir = document.createElement('button');
    btnSalir.textContent = 'X'
    //Ponemos la pagina en el frama para que se muestre al usuarios
    frameLogin.src = '../HTML/Authentication.html';
    //La configuramos
    frameLogin.width = '100%';
    frameLogin.height = '100%';
    frameLogin.frameBorder = '0';
    //Panemos los elementos dentro del overlay para que el ussuaior pueda verlos
    overlay.innerHTML = '';
    overlay.appendChild(btnSalir);
    overlay.appendChild(frameLogin);
    //Y lo volvemos visible
    overlay.style.visibility = 'visible'

    
    //Ponemos un evento en espera de que el usuaior quiera cerra la ventana
    btnSalir.addEventListener('click', function name() {

        console.log(document.querySelector('.Google'));
        //Vaciamos el overlay y lo volvemos invisible
        overlay.innerHTML = '';
        overlay.style.visibility = 'hidden';

        var btnGoogle = frameLogin
    })
});


//Evento para los botones de la navbar y poner la pagian web requerida
for (let i = 0; i < aOtherFunctions.length; i++) {
    aOtherFunctions[i].addEventListener('click', function name(params) {
        
        if (i == 0) {
            iframe.src = '../HTML/index.html';
        } else if (i == 1) {
            iframe.src = '../HTML/Abautus.html';
        } else if (i == 2) {
            iframe.src = '../HTML/foro.html';
        }
        //Vaciamos el frame para que no de errores y lo agregamos al html
        contenedorIframe.innerHTML = '';
        contenedorIframe.appendChild(iframe);
    });
}

initAuthStateListener(user => {
    if (user) {
        var imgUser = document.createElement('img');
        imgUser.src = user.photoURL;
        console.log(user.photoURL);

        btnLogin.classList.remove('Login');
        btnLogin.classList.add('imgUsuario');
        imgUser.classList.add('imgUsuario');

        btnLogin.textContent = '';
        btnLogin.appendChild(imgUser);

        var btnSalir = document.createElement('button');
        btnSalir.textContent = 'Salir';

        var navBar = document.querySelector('.BarraNav');
        navBar.appendChild(btnSalir);

        btnSalir.addEventListener('click', function name() {
            Out();
        })
    } else {

    }
});

