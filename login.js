import { db, collection, doc } from './firebaseConfig.js';

const buttonDom = document.getElementById('loginBtn');
const userName = document.getElementById('user_name');
const password = document.getElementById('user_pw');

buttonDom.addEventListener('click', (event)=>{
    event.preventDefault();
    let isLoginSuccess = false; 

    db.collection("user")
    .get()
    .then((result) => {
        console.log("Documents count:", result.size);
        result.docs.forEach((doc) => {
            console.log("Document data:", doc.data());
            if(userName.value === doc.data().name && password.value == doc.data().password){
                alert('로그인 성공');
                isLoginSuccess = true; 
                console.log(doc.id);
                window.localStorage.setItem('userId',  doc.id);
                window.localStorage.setItem('userName',  doc.data().name);
                window.location.href = 'index.html';
                return;
            }
        });

        if(!isLoginSuccess) { // 로그인이 실패한 경우
            alert('로그인 실패');
        }
    });
});
