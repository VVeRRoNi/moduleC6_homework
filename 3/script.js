const btn = document.querySelector('#btn_echo');
const btngeo = document.querySelector('#btn_geo');
const inputWind = document.querySelector('#input')
const wsUrl ="wss://echo-ws-service.herokuapp.com/";
let websocket;
let row;

// Открываем соединение
// Надо подумать чтобы соединение открывалось при нажатии кнопки
websocket = new WebSocket(wsUrl);
    websocket.onopen =function(evt){
        console.log('открыли соединение')
    };

websocket.onmessage = function(evt){
    insertMessage('start', evt.data, 'outmess')

};


websocket.onclose = function(evt){
    console.log("Конец")
};



// Отправки сообщения на сервер и обработка ответа
btn.addEventListener('click', ()=>{
    message = document.querySelector('#input').value;
    if (message){
        insertMessage('end', message, 'ourmess');
        websocket.send(message)
    }
});

inputWind.addEventListener('keydown', function(event){
    if (event.code == 'Enter'){
        message = inputWind.value;
    if (message){
        insertMessage('end', message, 'ourmess');
        websocket.send(message)
    }
    }
})


// Создаем div с сообщением и вставлем в текст
function insertMessage(column, message, clas){
    let capt = document.createElement('div');
    capt.width = 500;
    capt.style.display = 'flex';
    capt.style.justifyContent = column;
    let captin = document.createElement('div');
    captin.textContent = message;
    captin.style.display = 'flex';
    captin.style.flexWrap = 'wrap';
    captin.className = clas;
    capt.append(captin);
    document.getElementById('wind').insertAdjacentElement("beforeend", capt);
    document.getElementById('input').value = ""
    document.getElementById('wind').style.bottom = '0px'
}
// Блок по геолокации
const error = () => {
    status.textContent('Невозможно получить геолокацию')
}

const success = (position) => {
    insertMessage('end', 'Гео-локация', 'ourmess')
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapLink = document.createElement('a');
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Ваша гео-локация';
    geocapt = document.createElement('div');
    geocapt.className = 'geo';
    geocapt.append(mapLink)
    document.getElementById('wind').insertAdjacentElement("beforeend", geocapt);
}

btngeo.addEventListener('click', ()=>{
    if (!navigator.geolocation) {
        status.textContent='Геолокация не поддерживается браузером'
    } else {
        status.textContent='Определение местоположения';
        navigator.geolocation.getCurrentPosition(success, error);
    }

});


// Отображение отправленных сообщений
function displayOurMess(message){
    win = document.createElement('div');
    win.className = '.ourmess';
    win.textContent = message;
    document.getElementById('output').append(win);
};


// Отобразить ЭХО
function displayEcho(message){
    console.log('Эхо')
};

// Отобразить геолокацию
function displayGeo(){
    console.log('геолокация')
}


// Добавлям прокрутку чата
document.getElementById('wind_vision').onwheel = function (event) {
    var line = event.deltaY;
    bottom = Number(document.getElementById('wind').style.bottom.slice(0, -2)) + line
    document.getElementById('wind').style.bottom = bottom + 'px';
    if(Number(document.getElementById('wind').style.bottom.slice(0, -2)) > 0){
        document.getElementById('wind').style.bottom = 0 + 'px';
        console.log('1');
    }
    if(Number(document.getElementById('wind').style.bottom.slice(0, -2)) < (450  - document.getElementById('wind').clientHeight)){
            document.getElementById('wind').style.bottom = (450 - document.getElementById('wind').clientHeight) + 'px';
            console.log('2');
    }
    if (Number(document.getElementById('wind').clientHeight) < 450){
        document.getElementById('wind').style.bottom = 0 + 'px';
        console.log('3');
    }
    return false;
}


