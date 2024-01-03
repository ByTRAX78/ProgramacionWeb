import { doc, deleteDoc,collection,getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";  
import { db } from "./app/firebase.js";  
import { escuchaPosts } from "./app/EscuchaCollections.js";




//Funcion para borrar tus respuestas
async function borrarRespuesta(idRespuesta, i) {

    try {
        //LLamamos una funcion de firebase para borrar la respuesta,
        //db es para info de la base, 
        //respuestas es para seleccionar el conjunto
        //idRespuesta es el idRespuesta para saber cual es la que debe ser borrada
        await deleteDoc(doc(db, 'posts', idRespuesta[0], 'respuestas', idRespuesta[1]));
        
        
        
    } catch (error) {
        console.log(error);
    }
}
//Funcion para borrar tus preguntas
async function borrarPregunta(idPregunta, i) {
    try {
        //Borramos una pregunta con la funcion
        /*
        db info de la base
        posts es la collecion de posts
        idPregunta es el id de la pregunta a borrar
        */
       console.log('Se borrara ' + idPregunta);
        await deleteDoc(doc(db, 'posts', idPregunta));
        
        const subCollection = await getDocs(collection(db,'posts',idPregunta,'respuestas'));

        subCollection.forEach(async element => {
            await deleteDoc(doc(db, 'posts', idPregunta, 'respuestas', element.id));
        });
        escuchaPosts(idPregunta, i);
        var posts = document.querySelectorAll('.post');
        var seccionPosts = document.getElementById('posts');

        seccionPosts.removeChild(posts[i]);

    } catch (error) {
        console.log(error);
    }
}

export { borrarPregunta, borrarRespuesta };
