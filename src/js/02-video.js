import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
    
//5.Сохраняeм время воспроизведения в локальное хранилище.
const CURRENT_TIME_KEY = 'videoplayer-current-time';
const currentTimePlayerStorage = JSON.parse(localStorage.getItem(CURRENT_TIME_KEY));
console.log(currentTimePlayerStorage);

// const currentTimeStorage = JSON.parse(localStorage.getItem(CURRENT_TIME_KEY)) || '';
// console.log(currentTimeStorage);

//3. Инициализируем плеер 
const iframe = document.querySelector('#vimeo-player');    
const player = new Player(iframe);

    player.on('play', function() {
        console.log('played the video!');
    });
    

//4. отслеживаем событие timeupdate - обновление времени воспроизведения.
const onTimeUpdate = function (data) {
    localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(data));
       // data is an object containing properties specific to that event
};
player.on('timeupdate', throttle(onTimeUpdate, 1000));

//6.для того чтобы возобновить воспроизведение с сохраненной позиции при перезагрузке страницы
player.setCurrentTime(currentTimePlayerStorage.seconds)
    .then(function (seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});

// тест - получаем заголовок видео 
    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
    });