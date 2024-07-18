if(window.localStorage.getItem('userId') === null){
    window.location.href = 'login.html';
    console.log(window.localStorage.getItem('userId'));
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href = 'login.html';
    }
});