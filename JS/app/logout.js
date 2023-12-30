import { signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

export function Out() {
    signOut(auth).then(() => {
        console.log('Te saliste');
    }).catch((error) => {
        console.log(error);
    });
}

