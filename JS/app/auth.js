import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { auth } from "./firebase.js";

export function initAuthStateListener(callback) {
    onAuthStateChanged(auth, (user) => {
        
      try {
        const uid = user.uid;
        if (user) {
        } else {
        }
      } catch (error) {
        
      }
        
      
      callback(user);
    });
  }

