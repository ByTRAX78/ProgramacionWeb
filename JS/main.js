import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDocs, collecion } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

import "./app/firebase.js";
import "./app/googleLogin.js";
import "./app/logout.js";

onAuthStateChanged(auth, (user) => {

    /*if (user) {
        
    } else {
        const querySnapshot = await getDocs()
    }*/
});