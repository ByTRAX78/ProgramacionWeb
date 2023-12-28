import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
        import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyBVUYFFYDL1SS1b1v-WOcxf4rqPnyJWxu8",
          authDomain: "waaaaghammer-f5fc4.firebaseapp.com",
          projectId: "waaaaghammer-f5fc4",
          storageBucket: "waaaaghammer-f5fc4.appspot.com",
          messagingSenderId: "1087839271573",
          appId: "1:1087839271573:web:b638a36ba56787cf07f99c",
          measurementId: "G-W1YMYPBP0G"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider(app);
        const db = getFirestore(app);

        window.firebaseAuth = auth;
        window.firebaseAuth = db;
        var buttonGoogle = document.querySelector('.Google');

        try {
            buttonGoogle.addEventListener('click', async () => {

                signInWithPopup(auth, provider)
                .then((result) => {
                    
                    window.firebaseAuth = result.user;
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    localStorage.setItem('user',JSON.stringify(user));
                    
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                    window.firebaseAuth = user;
                    window.location.href = '../HTML/frame.html?user';
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
            });
        } catch (error) {
            
        }
        
        

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

try {
    buttonEnter.addEventListener('click', function() {
        console.log(buttonStatus);
        if (buttonStatus == 'login') {
            
            LoginAccount(email.value, pass.value);
    
        } else {
    
            RegisterAcount(email.value, pass.value);
        }
    });
} catch (error) {
    
}


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

export { auth };