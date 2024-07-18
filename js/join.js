import { db, collection, doc } from './firebaseConfig.js';

const buttonDom = document.getElementById('joinBtn');
const userName = document.getElementById('user_name');
const password = document.getElementById('user_pw');
const radioButtons = document.querySelectorAll('input[name="user_cls"]');

let selectedLabel = 'AI 엔지니어링';

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', handleRadioButtonChange);
});


function handleRadioButtonChange() {
  // 선택된 라디오버튼의 label 텍스트 가져오기
  selectedLabel = document.querySelector(`label[for="${this.id}"]`).textContent;
}


buttonDom.addEventListener('click', (event) => {
    event.preventDefault();
    let isJoinSuccess = false;

    // 사용자 이름과 비밀번호 검증
    if (userName.value.trim() === '' || password.value.trim() === '') {
        alert('사용자 이름과 비밀번호를 입력해주세요.');
        return;
    }

    // 사용자 정보 가져오기
    db.collection("user")
        .get()
        .then((result) => {
            // console.log("Documents count:", result.size);
            let isDuplicateUser = false;
            result.docs.forEach((doc) => {
                // console.log("Document data:", doc.data());
                if (userName.value === doc.data().name) {
                    isDuplicateUser = true;
                    return;
                }
            });


            if (!isDuplicateUser) {
                // 새로운 사용자 등록
                db.collection("user").add({
                    name: userName.value,
                    password: password.value,
                    class: selectedLabel
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

            // if (!isJoinSuccess) {
            //     alert('회원가입 실패');
            // }
        });
});
