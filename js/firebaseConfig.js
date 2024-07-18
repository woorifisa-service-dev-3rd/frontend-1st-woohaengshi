// firebase.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js';
import { getFirestore, collection, doc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const firebaseConfig = {
    apiKey: 'AIzaSyCf9ttqBTXBf_e4AHASQaK6-LlQ4FQJcuM',
    authDomain: 'test-94c7d.firebaseapp.com',
    projectId: 'test-94c7d',
    storageBucket: 'test-94c7d.appspot.com',
    messagingSenderId: '169749339570',
    appId: '1:169749339570:web:d2faf9a789e06a442758ab'
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db, collection, doc };
