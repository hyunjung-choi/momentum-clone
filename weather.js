const weather = document.querySelector(".js-weather");

const API_KEY = "d48bc856d494cb35736d6d6909e2a81c";
const COORDS = 'coords'; // 좌표

function getWeather(lat, lon){
    // network패널로 가면 내가 request한 내용을 볼 수 있다.
    // then은 데이터가 완전히 들어온 다음(fetch 후) 호출하는 함수.
    // 서버로부터 데이터가 들어올 때 까지 기다려야 오류가 발생하지 않으므로.
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        // json = 자바스크립트 object
        // response를 출력했을 때 (볼 수 없었던) body부분. 
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        //const weather = json.weather[0].main;

        weather.innerText = `오늘의 온도는 ${temperature}도\n @ ${place}`;
        //console.log(temperature, place);
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표를 가져오는데 성공했을 때 처리하는 함수
function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Can't access geo location.")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);

    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();