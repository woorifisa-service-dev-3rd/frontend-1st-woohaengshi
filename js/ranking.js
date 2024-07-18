import { db, collection, doc } from './firebaseConfig.js';

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const topRanker = document.getElementById("topRanker");
const lowRanker = document.getElementById("lowRanker");
const search = document.getElementById("search");

const handleSearch = () => {
  topRanker.style.display = 'none';
  lowRanker.style.display = 'none';
  search.style.display = 'block';

  db.collection("study")
    .get()
    .then((result) => {
      const scrollList = document.querySelector('.searchUl');
      scrollList.innerHTML = '';
      const dataMap = new Map();

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

      const dataArray = Array.from(dataMap.values());
      dataArray.sort((a, b) => b.totalTime - a.totalTime);

      dataArray.forEach((data) => {
        if (data.userName === searchInput.value) {
          const listItem = createListItem(data, dataArray.indexOf(data) + 1);
          scrollList.appendChild(listItem);
        }
      });
    });
};

const createListItem = (data, rank) => {
  const listItem = document.createElement('li');
  const scoreElement = document.createElement('p');
  const profileImage = document.createElement('img');
  const nameElement = document.createElement('p');
  const timeElement = document.createElement('p');

  scoreElement.textContent = rank;
  scoreElement.classList.add('score');
  profileImage.src = 'img/profile.png';
  nameElement.textContent = data.userName;
  const hours = Math.floor(data.totalTime / 3600);
  const minutes = Math.floor((data.totalTime % 3600) / 60);
  timeElement.textContent = `${hours}시간 ${minutes}분`;

  listItem.appendChild(scoreElement);
  listItem.appendChild(profileImage);
  listItem.appendChild(nameElement);
  listItem.appendChild(timeElement);

  return listItem;
};

const loadData = () => {
  db.collection("study")
    .get()
    .then((result) => {
      console.log("Documents count:", result.size);

      const scrollList = document.querySelector('.scroll');
      const topRankerList = document.querySelector('.topRanker ul');
      const dataMap = new Map();

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

      const dataArray = Array.from(dataMap.values());
      dataArray.sort((a, b) => b.totalTime - a.totalTime);

      for (let i = 0; i < 3 && i < dataArray.length; i++) {
        const data = dataArray[i];
        const listItem = createTopRankerListItem(data, i + 1);
        topRankerList.appendChild(listItem);
      }

      for (let i = 3; i < dataArray.length; i++) {
        const data = dataArray[i];
        const listItem = createListItem(data, i + 1);
        scrollList.appendChild(listItem);
      }
    });
};

const createTopRankerListItem = (data, rank) => {
  const listItem = document.createElement('li');
  const medalImage = document.createElement('img');
  const profileContainer = document.createElement('div');
  const profileImage = document.createElement('img');
  const nameElement = document.createElement('p');
  const timeElement = document.createElement('p');

  medalImage.src = `img/medal_${rank}.png`;
  profileImage.src = 'img/profile.png';
  nameElement.textContent = data.userName;
  const hours = Math.floor(data.totalTime / 3600);
  const minutes = Math.floor((data.totalTime % 3600) / 60);
  timeElement.textContent = `${hours}시간 ${minutes}분`;

  profileContainer.appendChild(profileImage);
  profileContainer.appendChild(nameElement);
  listItem.appendChild(medalImage);
  listItem.appendChild(profileContainer);
  listItem.appendChild(timeElement);

  return listItem;
};

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (event)=>{
    if(event.keyCode == 13){
        event.preventDefault();
        searchBtn.click();
    }
});
loadData();
