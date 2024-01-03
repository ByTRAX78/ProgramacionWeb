import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { db } from "./firebase.js";


export function escuchaPosts(idPregunta, i) {

    const unsub = onSnapshot(doc(db, 'posts' , idPregunta), (doc) => {
        
        
    });
}

