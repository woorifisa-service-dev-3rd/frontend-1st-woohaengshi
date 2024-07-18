const [startBtn, stopBtn] = document.querySelectorAll(
    '#container.timer .timer-box .study-btn'
);
const timer = document.querySelector('#container.timer .timer-box .time');

let startTime,
    updatedTime,
    difference = 0,
    tInterval;
let running = false;

startBtn.onclick = () => {
    startBtn.classList.add('none');
    stopBtn.classList.remove('none');
    startStopwatch();
};

stopBtn.onclick = () => {
    stopBtn.classList.add('none');
    startBtn.classList.remove('none');
    stopStopwatch();
};

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateStopwatch, 100);
        running = true;
    }
}

function stopStopwatch() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function updateStopwatch() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    timer.textContent = hours + ':' + minutes + ':' + seconds;
}
