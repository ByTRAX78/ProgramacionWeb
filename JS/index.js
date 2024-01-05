import { initAuthStateListener } from "./app/auth.js";
import { Out } from "./app/logout.js";

function Salir() {
    
    Out()
}

var imgUsuario = document.querySelectorAll('.imgUsuario');
var btnMenu = document.querySelector('.btnMenu');

btnMenu.style.visibility = 'hidden'
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
    btnSalir.appendChild
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
            iframe.src = '../HTML/Index.html';
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
        console.log(user);
        btnMenu.style.visibility = 'visible'
        imgUsuario[1].src = user.photoURL;

        var conterLogin = document.querySelector('.ConterLogin');
        conterLogin.removeChild(btnLogin);    

        overlay.style.visibility = 'hidden';

        var btnSalir = document.querySelector('.opcions');

        btnSalir.addEventListener('click', function name() {
            var MenuWithLogin = document.querySelector('.MenuWithLogin');
            MenuWithLogin.classList.add('hidden');
            btnMenu.style.visibility = 'hidden'
            conterLogin.appendChild(btnLogin)
            Out();
        });

        var btnConfig = document.querySelector('.configuracion')

        btnConfig.addEventListener('click', function name() {
            if (user.providerData[0].providerId !== 'password') {
                console.log('No se polli');
            } else {
                window.location.href = '../HTML/ConfigUser.html';
            }
        })

    } else {

    }
});
