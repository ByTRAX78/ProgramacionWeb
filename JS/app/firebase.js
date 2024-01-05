import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBVUYFFYDL1SS1b1v-WOcxf4rqPnyJWxu8",
    authDomain: "waaaaghammer-f5fc4.firebaseapp.com",
    databaseURL: "https://waaaaghammer-f5fc4-default-rtdb.firebaseio.com",
    projectId: "waaaaghammer-f5fc4",
    storageBucket: "waaaaghammer-f5fc4.appspot.com",
    messagingSenderId: "1087839271573",
    appId: "1:1087839271573:web:b638a36ba56787cf07f99c",
    measurementId: "G-W1YMYPBP0G"
  };

  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);

  console.log(auth);