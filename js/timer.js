import { db } from './firebaseConfig.js';

// 이름 불러오기
const nameElement = document.querySelector('#container.timer .title .name');
const username = localStorage.getItem('userName');
const userId = localStorage.getItem('userId');

nameElement.textContent = username;

// 년, 월, 일 불러오기
const dateElement = document.querySelector('#container.timer .date');
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

dateElement.textContent = `${year}년 ${month}월 ${date}일`;

// 타이머
const [startBtn, stopBtn] = document.querySelectorAll('#container.timer .timer-box .study-btn');
const timer = document.querySelector('#container.timer .timer-box .time');

let startTime,
  updatedTime,
  difference = 0,
  tInterval;
let running = false;

startBtn.onclick = () => {
  startStopwatch();
};

stopBtn.onclick = () => {
  stopStopwatch();
};

function startStopwatch() {
  const selectedSubjectsElements = document.querySelectorAll('#container.timer .subjects .subject.selected');
  if (selectedSubjectsElements.length === 0) {
    alert('과목을 선택해주세요!');
    return;
  }
  if (!running) {
    startBtn.classList.add('none');
    stopBtn.classList.remove('none');

    startTime = new Date().getTime() - difference;
    tInterval = setInterval(updateStopwatch, 100);
    running = true;
  }
}

function stopStopwatch() {
  if (running) {
    stopBtn.classList.add('none');
    startBtn.classList.remove('none');

    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;

    const selectedSubjectsElements = document.querySelectorAll('#container.timer .subjects .subject.selected');

    const selectedSubjects = Array.from(selectedSubjectsElements).map((subjectElement) => subjectElement.textContent);

    console.log(selectedSubjects);

    const newStudyData = {
      date: new Date(),
      name: username,
      subject: selectedSubjects.join(', '),
      time: Math.floor((difference % (1000 * 60)) / 1000).toString(),
      userId: userId,
    };

    db.collection('study')
      .add(newStudyData)
      .then(() => {
        console.log('성공!');
      })
      .catch((error) => {
        console.log('실패: ' + error.message);
      });
  }
}

function updateStopwatch() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  timer.textContent = hours + ':' + minutes + ':' + seconds;
}
