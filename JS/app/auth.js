import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

export function initAuthStateListener(callback) {
    onAuthStateChanged(auth, (user) => {
        
        const uid = user.uid;
        if (user) {
            
        } else {
            console.log('Se salio');
        }
      
      callback(user);
    });
  }

