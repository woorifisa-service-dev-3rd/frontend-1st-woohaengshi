import { db, collection, doc } from './firebaseConfig.js';

const buttonDom = document.getElementById('joinBtn');
const userName = document.getElementById('user_name');
const password = document.getElementById('user_pw');
const selectedRadio = document.querySelector('input[name="user_cls"]:checked');
const selectedLabel = document.querySelector('input[name="user_cls"]:checked + label');

buttonDom.addEventListener('click', (event)=>{
    event.preventDefault();
    let isJoinSuccess = false; 

    // 사용자 정보 가져오기
    db.collection("user")
    .get()
    .then((result) => {
        console.log("Documents count:", result.size);
        let isDuplicateUser = false;
        result.docs.forEach((doc) => {
            console.log("Document data:", doc.data());
            if(userName.value === doc.data().name) {
                isDuplicateUser = true;
                return;
            }
        });

        if(!isDuplicateUser) {
            // 새로운 사용자 등록
            db.collection("user").add({
                name: userName.value,
                password: password.value,
                class: selectedLabel.textContent
            })
            .then(() => {
                alert('회원가입 성공!');
                isJoinSuccess = true;
                window.location.href = 'login.html';
            })
            .catch((error) => {
                alert('회원가입 실패: ' + error.message);
            });
        } else {
            alert('이미 존재하는 사용자 이름입니다.');
        }

        // if(!isJoinSuccess) { // 회원가입이 실패한 경우
        //     alert('회원가입 실패');
        // }
    });
});
