import { doc, deleteDoc,collection,getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";  
import { db } from "./app/firebase.js";  
import { escuchaPosts } from "./app/EscuchaCollections.js";

//Funcion para borrar tus respuestas
async function borrarRespuesta(idFather, idRespuesta) {
console.log(idRespuesta);
    try {
        //LLamamos una funcion de firebase para borrar la respuesta,
        //db es para info de la base, 
        //respuestas es para seleccionar el conjunto
        //idRespuesta es el idRespuesta para saber cual es la que debe ser borrada
        await deleteDoc(doc(db, 'posts', idFather, 'respuestas', idRespuesta));
        
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
        
        const subCollection = await getDocs(collection(db,'posts',idPregunta,'respuestas'));

        subCollection.forEach(async element => {
            await deleteDoc(doc(db, 'posts', idPregunta, 'respuestas', element.id));
        });
    

    } catch (error) {
        console.log(error);
    }
}

async function ModificarPost(idPost, pregunta) {
    try {
        
        console.log(idPost, pregunta);
        const docModificar = doc(db, 'posts' , idPost);
        await updateDoc(docModificar, {
            pregunta: pregunta
        });
    } catch (error) {
        
    }
}

async function ModificarRespuesta(idPregunta, idRespuesta, respuesta) {
    try {
        const docModRespuesta = doc(db, 'posts', idPregunta, 'respuestas', idRespuesta);

        await updateDoc(docModRespuesta, {
            respuesta : respuesta
        });
    } catch (error) {
        
    }
}

export { borrarPregunta, borrarRespuesta, ModificarPost, ModificarRespuesta };
