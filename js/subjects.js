//// 슬라이더
const subjectsContainer = document.querySelector('#container.timer .subjects');
const prevButton = document.querySelector('#container.timer .prev');
const nextButton = document.querySelector('#container.timer .next');
let subjects;

function updateSubjects() {
  subjects = document.querySelectorAll('#container.timer .subjects .subject');

  subjects.forEach((subject, index) => {
    if (index !== subjects.length - 1) {
      subject.onclick = (e) => e.target.classList.toggle('selected');
      subject.ondblclick = (e) => {
        e.target.remove();
        const newSubject = Array.from(getSubjectsLocalStorage()).filter((s) => s !== e.target.textContent);
        localStorage.setItem('subjects', JSON.stringify(newSubject));
        updateSubjects();
        updatePosition();
        updateButtonVisibility();
      };
    }
  });
}

let currentTranslateX = 0;
let moveDistance = 0;
let subjectCount = 0;
const gap = 6.5;

function nextMoveDistance() {
  let count = 0;
  const slicedSubjects = Array.from(subjects).slice(subjectCount);
  const subjectWidth = slicedSubjects.reduce((acc, subject) => {
    if (acc + subject.offsetWidth > subjectsContainer.offsetWidth) {
      return acc;
    }
    count++;
    return acc + subject.offsetWidth;
  }, 0);

  subjectCount += count;

  moveDistance = -(subjectWidth + (count - 1) * gap + 6.5);
}

function prevMoveDistance() {
  let count = 0;
  const slicedSubjects = Array.from(subjects).slice(0, subjectCount).reverse();
  const subjectWidth = slicedSubjects.reduce((acc, subject) => {
    if (acc + subject.offsetWidth > subjectsContainer.offsetWidth) {
      return acc;
    }
    count++;
    return acc + subject.offsetWidth;
  }, 0);

  subjectCount -= count;

  moveDistance = -(subjectWidth + (count - 1) * gap + 6.5);
}

function updatePosition() {
  subjectsContainer.style.transform = `translateX(${currentTranslateX}px)`;
}

function updateButtonVisibility() {
  prevButton.style.visibility = currentTranslateX < 0 ? 'visible' : 'hidden';
  nextButton.style.visibility = subjectCount < subjects.length - 1 ? 'visible' : 'hidden';
}

nextButton.addEventListener('click', () => {
  nextMoveDistance();
  currentTranslateX += moveDistance;
  updatePosition();
  updateButtonVisibility();
});

prevButton.addEventListener('click', () => {
  if (currentTranslateX < 0) {
    prevMoveDistance();
    currentTranslateX -= moveDistance;
    updatePosition();
    updateButtonVisibility();
  }
});

//// 과목 추가
const addSubjectButton = document.querySelector('#container.timer .subject:last-child');
const modal = document.getElementById('addSubjectModal');
const closeButton = document.querySelector('#container.timer .close');
const addSubjectForm = document.getElementById('addSubjectForm');

function getSubjectsLocalStorage() {
  const newSubjectsString = localStorage.getItem('subjects');
  const newSubjects = newSubjectsString ? JSON.parse(newSubjectsString) : [];
  return newSubjects;
}

function setSubjectsLocalStorage(subject) {
  const subjects = getSubjectsLocalStorage();
  const newSubjects = [...subjects, subject];
  localStorage.setItem('subjects', JSON.stringify(newSubjects));
}

addSubjectButton.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

addSubjectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const subjectName = document.getElementById('subjectName').value;
  if (subjectName) {
    addNewSubject(subjectName);
    setSubjectsLocalStorage(subjectName);
    modal.style.display = 'none';
    addSubjectForm.reset();
  }
});

function addNewSubject(subjectName) {
  const newSubject = document.createElement('li');
  newSubject.className = 'subject';
  newSubject.textContent = subjectName;

  // '+ 과목 추가' 버튼 앞에 새 과목 추가
  subjectsContainer.insertBefore(newSubject, addSubjectButton);

  // subjects 업데이트
  updateSubjects();

  // 새 과목이 보이도록 스크롤 조정
  updatePosition();
  updateButtonVisibility();
}

updateSubjects();
getSubjectsLocalStorage().forEach((subject) => addNewSubject(subject));
