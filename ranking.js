import { db, collection, doc } from './firebaseConfig.js';

//데이터 불러오기
// db.collection("user")
// .get()
// .then((result) => {
//     console.log("Documents count:", result.size);

//     result.docs.forEach((doc) => {
//     console.log("Document data:", doc.data());
//     });
// });

//데이터 추가하기
// const newUserData = {
//     name: 'John Doe',
//     email: 'john@example.com',
//     age: 30
//   };
  
// // Firestore에 데이터 추가
// db.collection('user').doc('newUser').set(newUserData)
// .then(() => {
//     console.log('Document successfully written!');
// })
// .catch((error) => {
//     console.error('Error writing document: ', error);
// });
