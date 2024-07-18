const addSubjectButton = document.querySelector('#container.timer .subject:last-child');
const modal = document.getElementById('addSubjectModal');
const closeButton = document.querySelector('#container.timer .close');
const addSubjectForm = document.getElementById('addSubjectForm');
const subjectsContainer = document.querySelector('#container.timer .subjects');
const prevButton = document.querySelector('#container.timer .prev');
const nextButton = document.querySelector('#container.timer .next');
let subjects;

//// 슬라이더
function updateSubjects() {
    // 기존 과목 모두 제거
    while (subjectsContainer.firstChild) {
        subjectsContainer.removeChild(subjectsContainer.firstChild);
    }

    const localSubjects = getSubjectsLocalStorage().reverse();
    if (localSubjects.length === 0) {
        const defaultSubject = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Java', 'DB', 'Spring', 'Cloud'];
        localStorage.setItem('subjects', JSON.stringify(defaultSubject));
        defaultSubject.forEach(addSubject);
    } else {
        localSubjects.forEach(addSubject);
    }

    // '+ 과목 추가' 버튼 다시 추가
    subjectsContainer.appendChild(addSubjectButton);

    subjects = document.querySelectorAll('#container.timer .subject');

    subjects.forEach((subject, index) => {
        if (index !== subjects.length - 1) {
            subject.onclick = (e) => e.target.classList.toggle('selected');
            subject.ondblclick = (e) => {
                e.target.remove();
                const newSubject = Array.from(getSubjectsLocalStorage()).filter((s) => s !== e.target.textContent);
                localStorage.setItem('subjects', JSON.stringify(newSubject));
                updateSubjects();
                updatePosition();
            };
        }
    });
}

let currentTranslateX = 0;
let moveDistance = 0;
let subjectCount = 0;
const gap = 6.5;
const subjectsContainerWidth = subjectsContainer.offsetWidth;

function calculateSubjectsWidth() {
    return Array.from(subjects).reduce((acc, subject) => acc + subject.offsetWidth + gap, 0);
}

function nextMoveDistance() {
    let count = 0;
    const slicedSubjects = Array.from(subjects).slice(subjectCount);
    const subjectWidth = slicedSubjects.reduce((acc, subject) => {
        if (acc + subject.offsetWidth > subjectsContainerWidth) {
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

nextButton.addEventListener('click', () => {
    if (calculateSubjectsWidth() > subjectsContainerWidth) {
        nextMoveDistance();
        currentTranslateX += moveDistance;
        updatePosition();
    }
});

prevButton.addEventListener('click', () => {
    if (currentTranslateX < 0) {
        prevMoveDistance();
        currentTranslateX -= moveDistance;
        updatePosition();
    }
});

//// 과목 추가

function getSubjectsLocalStorage() {
    const newSubjectsString = localStorage.getItem('subjects');
    const newSubjects = newSubjectsString ? JSON.parse(newSubjectsString) : [];
    return newSubjects;
}

function setSubjectsLocalStorage(subject) {
    const subjects = getSubjectsLocalStorage();
    const newSubjects = [subject, ...subjects];
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
        modal.style.display = 'none';
        // setSubjectsLocalStorage(subjectName);
        addSubjectForm.reset();
    }
});

function addSubject(subject) {
    const newSubject = document.createElement('li');
    newSubject.className = 'subject';
    newSubject.textContent = subject;
    subjectsContainer.appendChild(newSubject);
}

function addNewSubject(subjectName) {
    setSubjectsLocalStorage(subjectName);
    updateSubjects();
    updatePosition();
}

updateSubjects();
