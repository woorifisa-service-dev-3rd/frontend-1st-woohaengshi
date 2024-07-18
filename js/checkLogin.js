if(window.localStorage.getItem('userId') === null){
    window.location.href = 'login.html';
    console.log(window.localStorage.getItem('userId'));
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      localStorage.clear();
      window.location.href = 'login.html';
    }
});