import { db } from '../firebaseConfig.js';

db.collection('study')
    .get()
    .then((result) =>{

        // 데이터 배열 선언    
        const dataMap = new Map();
        result.docs.forEach((doc) => {
            const studySubject = doc.data().subject;
            dataMap.set(studySubject, 1);
        });

        const dataArray = Array.from(dataMap.keys());

        dataArray.forEach((data)=>{
            const filterBox = document.querySelector('.filter_box ul');
            const subjectButton = `<button>${data}</button>`;
            filterBox.insertAdjacentHTML('beforeend', subjectButton);
        });
    });

const filterBox = document.querySelector('.filter_box');
filterBox.addEventListener('click', (event)=>{
    if(event.target.tagName == 'BUTTON'){
        if(event.target.classList.contains('on')){
            event.target.classList='';
        }else{
            event.target.classList='on';
        }
    }
});