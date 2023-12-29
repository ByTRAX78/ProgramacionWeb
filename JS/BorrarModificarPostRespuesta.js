import { doc, deleteDoc,collection } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";    

const db = window.firebaseAuth;

//Funcion para borrar tus respuestas
async function borrarRespuesta(idRespuesta) {
    try {
        //LLamamos una funcion de firebase para borrar la respuesta,
        //db es para info de la base, 
        //respuestas es para seleccionar el conjunto
        //idRespuesta es el idRespuesta para saber cual es la que debe ser borrada
        await deleteDoc(doc(db, 'respuestas', idRespuesta));
    } catch (error) {
        console.log(error);
    }
}
//Funcion para borrar tus preguntas
async function borrarPregunta(idPregunta) {
    try {
        //Borramos una pregunta con la funcion
        /*
        db info de la base
        posts es la collecion de posts
        idPregunta es el id de la pregunta a borrar
        */
        await deleteDoc(doc(db, 'posts', idPregunta));
    } catch (error) {
        console.log(error);
    }
}

export { borrarPregunta, borrarRespuesta };
