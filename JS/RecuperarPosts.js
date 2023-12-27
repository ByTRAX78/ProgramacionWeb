import { collection, getDocs } from "firebase/firestore"; 

for (let i = 0; i < 100; i++) {
    
    var arearPots = document.createElement('div');
    var postsLeft = document.createElement('div');
    var postsRight = document.createElement('div');
    var usuarioPost = document.createElement('div');
    var postsPregunta = document.createElement('div');
    var postsRespuesta = document.createElement('div');
}

const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});