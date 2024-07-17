import { db, collection, doc } from './firebaseConfig.js';
    
db.collection("user")
.get()
.then((result) => {
    console.log("Documents count:", result.size);

    result.docs.forEach((doc) => {
    console.log("Document data:", doc.data());
    });
});