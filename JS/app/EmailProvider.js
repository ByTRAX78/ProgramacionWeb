import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword , 
    updateProfile} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

function CreateUser(name, email, password) {
    console.log('vamos a crear usuarios');
    createUserWithEmailAndPassword(auth, email, password)
        .then((useCredential) => {
            const user = useCredential.user;
            console.log(user);
            updateProfile(auth.currentUser, {
                displayName: name
            })
            .then(() => {

            })
            .catch(() => {

            });
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
}

function SignInUsers(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((useCredential) => {
            const user = useCredential.user;
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
}

function ResetPassword(email) {
    /*sendPasswordResetEmail(auth, email)
    .then(() => {
        console.log('listo');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
    });*/
}

export { CreateUser, SignInUsers, ResetPassword}