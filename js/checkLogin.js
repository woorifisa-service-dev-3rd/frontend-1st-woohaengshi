if(window.localStorage.getItem('userId') === null){
    window.location.href = 'login.html';
    console.log(window.localStorage.getItem('userId'));
}