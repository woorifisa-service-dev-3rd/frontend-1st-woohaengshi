// 슬라이더
const subjectsContainer = document.querySelector('#container.timer .subjects');
const prevButton = document.querySelector('#container.timer .prev');
const nextButton = document.querySelector('#container.timer .next');
let subjects;

let currentIndex = 0;
const visibleSubjects = 9;
const gap = 7;

function updateSubjects() {
    subjects = document.querySelectorAll('#container.timer .subjects .subject');

    // 과목 클릭 이벤트 리스너 추가
    subjects.forEach((subject, index) =>
        index !== subjects.length - 1
            ? (subject.onclick = (e) => e.target.classList.toggle('selected'))
            : null
    );
}

updateSubjects();

function updatePosition() {
    if (currentIndex > 0) {
        const nextElement = subjects[currentIndex + visibleSubjects - 1];
        const translateX = nextElement
            ? -(nextElement.offsetWidth + gap) * currentIndex
            : 0;
        subjectsContainer.style.transform = `translateX(${translateX}px)`;
    } else {
        subjectsContainer.style.transform = 'translateX(0)';
    }
}

function updateButtonVisibility() {
    prevButton.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
    nextButton.style.visibility =
    currentIndex + visibleSubjects >= subjects.length ? 'hidden' : 'visible';
}

nextButton.addEventListener('click', () => {
    if (currentIndex + visibleSubjects < subjects.length) {
        currentIndex++;
        updatePosition();
        updateButtonVisibility();
    }
});

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updatePosition();
        updateButtonVisibility();
    }
});

// 과목 추가
const addSubjectButton = document.querySelector(
    '#container.timer .subject:last-child'
);
const modal = document.getElementById('addSubjectModal');
const closeButton = document.querySelector('#container.timer .close');
const addSubjectForm = document.getElementById('addSubjectForm');

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
    currentIndex = 0;
    updatePosition();
    updateButtonVisibility();
}
