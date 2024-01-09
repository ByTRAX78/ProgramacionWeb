import { initAuthStateListener } from "./app/auth.js";
import { Out } from "./app/logout.js";
var over = document.getElementById('over');

over.style.visibility = 'visible'

initAuthStateListener(user => {
    if (user) {
        over.style.visibility = 'hidden'
        console.log(user);
        btnMenu.style.visibility = 'visible'
        imgUsuario[1].src = user.photoURL;
       

        btnSalir.addEventListener('click', function name() {
            var MenuWithLogin = document.querySelector('.MenuWithLogin');
            MenuWithLogin.classList.add('hidden');
            btnMenu.style.visibility = 'hidden'
            conterLogin.appendChild(btnLogin)
            over.style.visibility = 'visible'
            Out();
        });
     


    } else {

    }
});