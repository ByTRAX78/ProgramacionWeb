import { createUserWithEmailAndPassword, signInWithEmailAndPassword , updateProfile} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

function CreateUser(name, email, password) {
    
    createUserWithEmailAndPassword(auth, email, password)
        .then((useCredential) => {
            const user = useCredential.user;
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
            console.log(useCredential);
        })
        .catch((error) => {
            console.log(error.code);
            console.log(error.message);
        });
}

export { CreateUser, SignInUsers}