import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

const btnGoogle = document.querySelector('.Google');
export let globalCredential;

btnGoogle.addEventListener('click', async function name(e) {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    try {
        const credentials = await signInWithPopup(auth, provider);
        
    } catch (error) {
        console.log(error);
    }
})