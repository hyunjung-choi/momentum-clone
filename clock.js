const clockContainer = document.querySelector(".js-clock"),
colockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    colockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds 
    }`;
    
}

function init(){
    getTime();
    setInterval(getTime, 1000); // 1000 = 1sec
}

init();