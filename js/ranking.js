import { db, collection, doc } from './firebaseConfig.js';

// 데이터 불러오기
db.collection("study")
.get()
.then((result) => {
    console.log("Documents count:", result.size);

    const scrollList = document.querySelector('.scroll');
    const topRankerList = document.querySelector('.topRanker ul');
    // 데이터 객체 생성
    let dataMap = new Map();

    // 데이터 추가 및 합산
    result.docs.forEach((doc) => {
    const userId = doc.data().userId;
    const userName = doc.data().name;
    const time = parseInt(doc.data().time);

    if (dataMap.has(userId)) {
        dataMap.get(userId).totalTime += time;
    } else {
        dataMap.set(userId, { userId, userName, totalTime: time });
    }
    });

    // 데이터 배열로 변환 및 정렬
    const dataArray = Array.from(dataMap.values());
    dataArray.sort((a, b) => b.totalTime - a.totalTime);


    // 상위 3명 처리
    for (let i = 0; i < 3 && i < dataArray.length; i++) {
        const data = dataArray[i];
        const listItem = document.createElement('li');
        const medalImage = document.createElement('img');
        const profileContainer = document.createElement('div');
        const profileImage = document.createElement('img');
        const nameElement = document.createElement('p');
        const timeElement = document.createElement('p');
      
        // 메달 이미지 할당
        medalImage.src = `img/medal_${i + 1}.png`;
      
        // 데이터 할당
        profileImage.src = 'img/profile.png';
        nameElement.textContent = data.userName;
        const hours = Math.floor(data.totalTime / 3600);
        const minutes = Math.floor((data.totalTime % 3600) / 60);
        timeElement.textContent = `${hours}시간 ${minutes}분`;

      
        // 태그 구조 생성
        profileContainer.appendChild(profileImage);
        profileContainer.appendChild(nameElement);
        listItem.appendChild(medalImage);
        listItem.appendChild(profileContainer);
        listItem.appendChild(timeElement);
      
        // 상위 3명 리스트에 추가
        topRankerList.appendChild(listItem);
      }
      
      
    // 나머지 데이터 처리
    for (let i = 3; i < dataArray.length; i++) {
        const data = dataArray[i];
        const listItem = document.createElement('li');
        const scoreElement = document.createElement('p');
        const profileImage = document.createElement('img');
        const nameElement = document.createElement('p');
        const timeElement = document.createElement('p');
        
        // 데이터 할당
        scoreElement.textContent = i + 1;
        scoreElement.classList.add('score');
        profileImage.src = 'img/profile.png';
        nameElement.textContent = data.userName;
        const hours = Math.floor(data.totalTime / 3600);
        const minutes = Math.floor((data.totalTime % 3600) / 60);
        timeElement.textContent = `${hours}시간 ${minutes}분`;

        // 태그 구조 생성
        listItem.appendChild(scoreElement);
        listItem.appendChild(profileImage);
        listItem.appendChild(nameElement);
        listItem.appendChild(timeElement);

        // 리스트에 추가
        scrollList.appendChild(listItem);
    }
});

// db.collection('study').add({
//     userId: 'hLgvmCYb4JiuyevHiHwe',
//     name: '강재필',
//     subject: 'React',
//     date: new Date(),
//     time: '321123'
// })
// .then(() => {
//     console.log('Document successfully written!');
// })
// .catch((error) => {
//     console.error('Error writing document: ', error);
// });